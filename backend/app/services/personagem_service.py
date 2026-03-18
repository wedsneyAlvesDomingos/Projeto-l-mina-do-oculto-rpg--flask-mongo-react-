from datetime import datetime
from sqlalchemy.exc import SQLAlchemyError
from models.models import (
    Personagem, CharacterSection, CharacterAuditLog, CharacterLevelSnapshot,
    CharacterRegaliaV2, CharacterAbilityV2, CharacterEffectV2,
    CharacterSkillV2, CatalogRegalia, CatalogArvoreNivel,
    CatalogAbility, CatalogCondicao,
)
from services.rule_engine import (
    validar_criacao, validar_evolucao, calcular_ficha_completa,
    calcular_ficha_v2, validar_compra_regalia,
    aplicar_condicao, remover_condicao, realizar_descanso_v2,
)

BASE_FIELD_MAP = {
    'nome_personagem': 'name',
    'name': 'name',
    'classe': 'character_class',
    'class': 'character_class',
    'especie': 'race',
    'race': 'race',
    'nivel': 'level',
    'nível': 'level',
    'level': 'level',
    'pontos_de_regalia': 'regalia_points',
    'regalia_points': 'regalia_points',
    'image': 'image',
    'genero': 'gender',
    'gender': 'gender',
    'idade': 'age',
    'age': 'age',
    'descricao': 'description',
    'description': 'description',
    'experience': 'experience',
    'xp': 'experience',
    'rule_version': 'rule_version',
}

IGNORE_SECTION_KEYS = {
    'id', 'user_id', 'criado_em', 'atualizado_em', 'created_at', 'updated_at'
}

class PersonagemService:
    def __init__(self, db):
        self.db = db

    def _registrar_auditoria(self, character_id, user_id, action, before_state=None, after_state=None, metadata=None):
        """Registra uma entrada na trilha de auditoria do personagem."""
        try:
            log = CharacterAuditLog(
                character_id=character_id,
                user_id=user_id,
                action=action,
                before_state=before_state,
                after_state=after_state,
                metadata_=metadata or {},
                created_at=datetime.utcnow(),
            )
            self.db.session.add(log)
        except Exception:
            pass  # Auditoria não deve quebrar a operação principal

    def criar_personagem(self, user_id, data):
        data = data or {}

        # --- Validação via rule_engine (TODO-BE-001) ---
        erros = validar_criacao(data)
        if erros:
            return {'erros': erros}, 400

        base_fields = self._extract_base_fields(data)
        personagem = Personagem(
            user_id=user_id,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            rule_version=data.get('rule_version', '0.5'),
            **base_fields
        )

        try:
            self.db.session.add(personagem)
            self.db.session.flush()
            self._upsert_sections(personagem, data)
            self._registrar_auditoria(
                character_id=personagem.id,
                user_id=user_id,
                action='create',
                after_state=personagem.to_dict(),
            )
            self.db.session.commit()
            return {'personagem_id': personagem.id}, 201
        except SQLAlchemyError:
            self.db.session.rollback()
            raise

    def obter_personagem_por_id(self, personagem_id):
        personagem = self.db.session.query(Personagem).get(personagem_id)
        if personagem:
            return personagem.to_dict()
        return None

    def atualizar_personagem(self, personagem_id, novos_dados):
        personagem = self.db.session.query(Personagem).get(personagem_id)
        if not personagem:
            return False

        # --- Validação via rule_engine (TODO-BE-001) ---
        personagem_atual = personagem.to_dict()
        erros = validar_evolucao(personagem_atual, novos_dados)
        if erros:
            return {'erros': erros}

        before_state = personagem.to_dict()
        nivel_anterior = personagem.level or 1

        base_fields = self._extract_base_fields(novos_dados)
        for attr, value in base_fields.items():
            setattr(personagem, attr, value)

        self._upsert_sections(personagem, novos_dados)
        personagem.updated_at = datetime.utcnow()

        # Detectar aumento de nível e criar snapshot automático
        nivel_novo = personagem.level or 1
        if nivel_novo > nivel_anterior and nivel_novo >= 2:
            self._criar_snapshot_nivel(personagem_id, nivel_novo, before_state)

        try:
            self._registrar_auditoria(
                character_id=personagem_id,
                user_id=personagem.user_id,
                action='update',
                before_state=before_state,
                after_state=personagem.to_dict(),
            )
            self.db.session.commit()
            return True
        except SQLAlchemyError:
            self.db.session.rollback()
            return False

    def deletar_personagem(self, personagem_id):
        personagem = self.db.session.query(Personagem).get(personagem_id)
        if not personagem:
            return False
        try:
            before_state = personagem.to_dict()
            self._registrar_auditoria(
                character_id=personagem_id,
                user_id=personagem.user_id,
                action='delete',
                before_state=before_state,
            )
            self.db.session.delete(personagem)
            self.db.session.commit()
            return True
        except SQLAlchemyError:
            self.db.session.rollback()
            return False
        
    def obter_personagens_por_user_id(self, user_id):
        try:
            personagens = self.db.session.query(Personagem).filter_by(user_id=user_id).all()
            return [p.to_dict() for p in personagens]
        except SQLAlchemyError:
            self.db.session.rollback()
            return []

    def _extract_base_fields(self, data):
        base_fields = {}
        for key, value in (data or {}).items():
            if key in BASE_FIELD_MAP:
                base_fields[BASE_FIELD_MAP[key]] = value

        if 'name' not in base_fields and 'nome_personagem' in data:
            base_fields['name'] = data.get('nome_personagem')

        return base_fields

    @staticmethod
    def _sanitize_section_data(key, value):
        """Remove chaves vazias de dicts (ex: habilidades com key '')."""
        if key == 'habilidades' and isinstance(value, dict):
            return {k: v for k, v in value.items() if k and str(k).strip()}
        return value

    def _upsert_sections(self, personagem, data):
        if not data:
            return

        existing = {s.section_key: s for s in personagem.sections}
        for key, value in data.items():
            if key in BASE_FIELD_MAP or key in IGNORE_SECTION_KEYS:
                continue

            value = self._sanitize_section_data(key, value)

            section = existing.get(key)
            if section:
                section.data = value
            else:
                personagem.sections.append(CharacterSection(section_key=key, data=value))

    # =========================================================================
    # MÉTODOS v2 — DB-backed
    # =========================================================================

    def obter_ficha_calculada(self, personagem_id: int) -> dict:
        """
        Retorna a ficha completa calculada pelo rule_engine v2.
        Atualiza o cache 'derivados' no banco.
        """
        personagem = self.db.session.query(Personagem).get(personagem_id)
        if not personagem:
            return None

        derivados = calcular_ficha_v2(personagem_id, self.db.session)
        self.db.session.commit()

        base = personagem.to_dict()
        base["derivados"] = derivados
        return base

    def comprar_regalia(self, personagem_id: int, user_id: int,
                        regalia_slug: str = None,
                        arvore_nivel_slug: str = None) -> tuple:
        """
        Compra uma regalia (catalog_regalias) ou um nível de árvore
        (catalog_arvores_nivel) para o personagem.
        Retorna (resultado_dict, status_code).
        """
        personagem = self.db.session.query(Personagem).get(personagem_id)
        if not personagem:
            return {"erro": "Personagem não encontrado."}, 404

        personagem_dict = personagem.to_dict()
        personagem_dict["id"] = personagem_id
        personagem_dict["regalia_points_total"] = personagem.regalia_points_total or 0
        personagem_dict["regalia_points_spent"] = personagem.regalia_points_spent or 0
        personagem_dict["xp"] = personagem.xp or 0

        if regalia_slug:
            regalia = self.db.session.query(CatalogRegalia).filter_by(slug=regalia_slug).first()
            if not regalia:
                return {"erro": f"Regalia '{regalia_slug}' não encontrada."}, 404
            regalia_dict = {
                "custo": regalia.custo,
                "pre_requisitos": regalia.pre_requisitos or {},
                "requer_nivel_personagem": 1,
            }
            validacao = validar_compra_regalia(personagem_dict, regalia_dict, self.db.session)
            if not validacao["ok"]:
                return {"erros": validacao["erros"]}, 400

            # Verificar se já possui
            existente = self.db.session.query(CharacterRegaliaV2).filter_by(
                personagem_id=personagem_id,
                regalia_id=regalia.id,
            ).first()
            if existente and existente.ativa:
                return {"erro": "Regalia já adquirida."}, 409

            entrada = existente or CharacterRegaliaV2(
                personagem_id=personagem_id, regalia_id=regalia.id
            )
            entrada.ativa = True
            if not existente:
                self.db.session.add(entrada)

            personagem.regalia_points_spent = (personagem.regalia_points_spent or 0) + regalia.custo

        elif arvore_nivel_slug:
            nivel = self.db.session.query(CatalogArvoreNivel).filter_by(slug=arvore_nivel_slug).first()
            if not nivel:
                return {"erro": f"Nível de árvore '{arvore_nivel_slug}' não encontrado."}, 404
            nivel_dict = {
                "custo": nivel.custo,
                "pre_requisitos": nivel.pre_requisitos or {},
                "requer_nivel_personagem": nivel.requer_nivel_personagem or 1,
            }
            validacao = validar_compra_regalia(personagem_dict, nivel_dict, self.db.session)
            if not validacao["ok"]:
                return {"erros": validacao["erros"]}, 400

            existente = self.db.session.query(CharacterRegaliaV2).filter_by(
                personagem_id=personagem_id,
                arvore_nivel_id=nivel.id,
            ).first()
            if existente and existente.ativa:
                return {"erro": "Nível de árvore já adquirido."}, 409

            entrada = existente or CharacterRegaliaV2(
                personagem_id=personagem_id, arvore_nivel_id=nivel.id
            )
            entrada.ativa = True
            if not existente:
                self.db.session.add(entrada)

            personagem.regalia_points_spent = (personagem.regalia_points_spent or 0) + nivel.custo
        else:
            return {"erro": "Forneça 'regalia_slug' ou 'arvore_nivel_slug'."}, 400

        try:
            # Recalcular derivados após compra
            calcular_ficha_v2(personagem_id, self.db.session)
            self._registrar_auditoria(
                character_id=personagem_id,
                user_id=user_id,
                action="comprar_regalia",
                metadata={"regalia_slug": regalia_slug, "arvore_nivel_slug": arvore_nivel_slug},
            )
            self.db.session.commit()
            return {"ok": True, "message": "Regalia adquirida com sucesso."}, 200
        except SQLAlchemyError:
            self.db.session.rollback()
            raise

    def usar_ability(self, personagem_id: int, user_id: int,
                     ability_slug: str, contexto: dict = None) -> tuple:
        """
        Executa uma ability: valida custo (PM/PE), aplica efeito se necessário.
        Retorna (resultado_dict, status_code).
        """
        personagem = self.db.session.query(Personagem).get(personagem_id)
        if not personagem:
            return {"erro": "Personagem não encontrado."}, 404

        ability = self.db.session.query(CatalogAbility).filter_by(slug=ability_slug).first()
        if not ability:
            return {"erro": f"Ability '{ability_slug}' não encontrada."}, 404

        custo = ability.custo or {}
        pm_custo = custo.get("pm", 0)
        pe_custo = custo.get("pe", 0)

        if (personagem.pm_atual or 0) < pm_custo:
            return {"erro": f"PM insuficiente (precisa {pm_custo}, tem {personagem.pm_atual or 0})."}, 400
        if (personagem.pe_atual or 0) < pe_custo:
            return {"erro": f"PE insuficiente (precisa {pe_custo}, tem {personagem.pe_atual or 0})."}, 400

        personagem.pm_atual = (personagem.pm_atual or 0) - pm_custo
        personagem.pe_atual = (personagem.pe_atual or 0) - pe_custo

        efeito = ability.efeito or {}
        resultado = {
            "ok": True,
            "ability": ability_slug,
            "nome": ability.nome,
            "tipo": ability.tipo,
            "custo_aplicado": {"pm": pm_custo, "pe": pe_custo},
            "efeito": efeito,
        }

        # Registrar uso
        uso = CharacterAbilityV2(
            personagem_id=personagem_id,
            ability_id=ability.id,
        )
        self.db.session.add(uso)

        # Se a ability aplica condição
        cond_slug = efeito.get("aplica_condicao")
        if cond_slug:
            res_cond = aplicar_condicao(personagem_id, cond_slug, self.db.session)
            resultado["condicao_aplicada"] = res_cond

        try:
            self._registrar_auditoria(
                character_id=personagem_id,
                user_id=user_id,
                action="usar_ability",
                metadata={"ability_slug": ability_slug, "contexto": contexto or {}},
            )
            self.db.session.commit()
            return resultado, 200
        except SQLAlchemyError:
            self.db.session.rollback()
            raise

    def realizar_descanso(self, personagem_id: int, user_id: int, tipo: str) -> tuple:
        """
        Executa descanso (curto/longo/pleno), recalcula ficha e retorna resultado.
        """
        personagem = self.db.session.query(Personagem).get(personagem_id)
        if not personagem:
            return {"erro": "Personagem não encontrado."}, 404

        # Recalcular derivados primeiro para garantir pv_max/pm_max/pe_max corretos
        calcular_ficha_v2(personagem_id, self.db.session)

        resultado = realizar_descanso_v2(personagem_id, tipo, self.db.session)
        if not resultado.get("ok"):
            return resultado, 400

        try:
            self._registrar_auditoria(
                character_id=personagem_id,
                user_id=user_id,
                action=f"descanso_{tipo}",
                metadata=resultado,
            )
            self.db.session.commit()
            return resultado, 200
        except SQLAlchemyError:
            self.db.session.rollback()
            raise

    def aplicar_condicao_ao_personagem(self, personagem_id: int, user_id: int,
                                        condicao_slug: str,
                                        duracao_turnos: int = None,
                                        fonte: str = None) -> tuple:
        personagem = self.db.session.query(Personagem).get(personagem_id)
        if not personagem:
            return {"erro": "Personagem não encontrado."}, 404

        resultado = aplicar_condicao(
            personagem_id, condicao_slug, self.db.session,
            duracao_turnos=duracao_turnos, fonte=fonte
        )
        if not resultado.get("ok"):
            return resultado, 400

        calcular_ficha_v2(personagem_id, self.db.session)

        try:
            self._registrar_auditoria(
                character_id=personagem_id,
                user_id=user_id,
                action="aplicar_condicao",
                metadata={"condicao_slug": condicao_slug, "duracao": duracao_turnos},
            )
            self.db.session.commit()
            return resultado, 200
        except SQLAlchemyError:
            self.db.session.rollback()
            raise

    def remover_condicao_do_personagem(self, personagem_id: int,
                                        user_id: int, condicao_slug: str) -> tuple:
        personagem = self.db.session.query(Personagem).get(personagem_id)
        if not personagem:
            return {"erro": "Personagem não encontrado."}, 404

        resultado = remover_condicao(personagem_id, condicao_slug, self.db.session)
        if not resultado.get("ok"):
            return resultado, 400

        calcular_ficha_v2(personagem_id, self.db.session)

        try:
            self._registrar_auditoria(
                character_id=personagem_id,
                user_id=user_id,
                action="remover_condicao",
                metadata={"condicao_slug": condicao_slug},
            )
            self.db.session.commit()
            return resultado, 200
        except SQLAlchemyError:
            self.db.session.rollback()
            raise

    # =========================================================================
    # SNAPSHOTS DE EVOLUÇÃO — pontos de restauração por nível
    # =========================================================================

    def _criar_snapshot_nivel(self, character_id, nivel, before_state):
        """Cria (ou sobrescreve) o snapshot para um dado nível."""
        existing = self.db.session.query(CharacterLevelSnapshot).filter_by(
            character_id=character_id, nivel=nivel
        ).first()
        if existing:
            existing.snapshot_data = before_state
            existing.created_at = datetime.utcnow()
        else:
            snap = CharacterLevelSnapshot(
                character_id=character_id,
                nivel=nivel,
                snapshot_data=before_state,
                created_at=datetime.utcnow(),
            )
            self.db.session.add(snap)

    def listar_snapshots(self, personagem_id):
        """Retorna a lista de snapshots de evolução de um personagem."""
        snapshots = (
            self.db.session.query(CharacterLevelSnapshot)
            .filter_by(character_id=personagem_id)
            .order_by(CharacterLevelSnapshot.nivel.asc())
            .all()
        )
        return [s.to_dict() for s in snapshots]

    def restaurar_snapshot(self, personagem_id, nivel_alvo, user_id=None):
        """
        Restaura o personagem ao estado pré-evolução do nível indicado.
        Isso efetivamente reverte para o nível anterior (nivel_alvo - 1).
        Não permite reverter para nível < 1 (criação).
        Remove todos os snapshots de nível >= nivel_alvo depois da restauração.
        """
        if nivel_alvo <= 1:
            return {"erro": "Não é possível desfazer a criação do personagem (nível 1)."}, 400

        personagem = self.db.session.query(Personagem).get(personagem_id)
        if not personagem:
            return {"erro": "Personagem não encontrado."}, 404

        snapshot = self.db.session.query(CharacterLevelSnapshot).filter_by(
            character_id=personagem_id, nivel=nivel_alvo
        ).first()
        if not snapshot:
            return {"erro": f"Nenhum snapshot encontrado para o nível {nivel_alvo}."}, 404

        before_state = personagem.to_dict()
        restored_data = snapshot.snapshot_data

        # Restaurar campos base
        base_fields = self._extract_base_fields(restored_data)
        for attr, value in base_fields.items():
            setattr(personagem, attr, value)

        # Restaurar sections (apagar existentes e recriar do snapshot)
        for section in list(personagem.sections):
            self.db.session.delete(section)
        self.db.session.flush()

        for key, value in restored_data.items():
            if key in BASE_FIELD_MAP or key in IGNORE_SECTION_KEYS:
                continue
            personagem.sections.append(CharacterSection(section_key=key, data=value))

        personagem.updated_at = datetime.utcnow()

        # Remover snapshots de nível >= nivel_alvo (ficam obsoletos)
        self.db.session.query(CharacterLevelSnapshot).filter(
            CharacterLevelSnapshot.character_id == personagem_id,
            CharacterLevelSnapshot.nivel >= nivel_alvo,
        ).delete(synchronize_session='fetch')

        try:
            self._registrar_auditoria(
                character_id=personagem_id,
                user_id=user_id or personagem.user_id,
                action='level_regression',
                before_state=before_state,
                after_state=personagem.to_dict(),
                metadata={"nivel_revertido": nivel_alvo, "nivel_restaurado": restored_data.get("nivel", nivel_alvo - 1)},
            )
            self.db.session.commit()
            return {"ok": True, "personagem": personagem.to_dict()}, 200
        except SQLAlchemyError:
            self.db.session.rollback()
            raise

    def criar_snapshot_manual(self, personagem_id, nivel):
        """
        Cria um snapshot manualmente para um nível (útil para personagens existentes
        que não tinham snapshots antes desta feature).
        """
        personagem = self.db.session.query(Personagem).get(personagem_id)
        if not personagem:
            return {"erro": "Personagem não encontrado."}, 404

        if nivel <= 1:
            return {"erro": "Não é possível criar snapshot para o nível 1 (criação)."}, 400

        current_state = personagem.to_dict()
        self._criar_snapshot_nivel(personagem_id, nivel, current_state)

        try:
            self.db.session.commit()
            return {"ok": True, "message": f"Snapshot para nível {nivel} criado com sucesso."}, 201
        except SQLAlchemyError:
            self.db.session.rollback()
            raise

