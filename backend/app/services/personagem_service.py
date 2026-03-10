from datetime import datetime
from sqlalchemy.exc import SQLAlchemyError
from models.models import Personagem, CharacterSection
from services.rule_engine import validar_criacao, validar_evolucao, calcular_ficha_completa

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
}

IGNORE_SECTION_KEYS = {
    'id', 'user_id', 'criado_em', 'atualizado_em', 'created_at', 'updated_at'
}

class PersonagemService:
    def __init__(self, db):
        self.db = db

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
            **base_fields
        )

        try:
            self.db.session.add(personagem)
            self.db.session.flush()
            self._upsert_sections(personagem, data)
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

        base_fields = self._extract_base_fields(novos_dados)
        for attr, value in base_fields.items():
            setattr(personagem, attr, value)

        self._upsert_sections(personagem, novos_dados)
        personagem.updated_at = datetime.utcnow()
        try:
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

    def _upsert_sections(self, personagem, data):
        if not data:
            return

        existing = {s.section_key: s for s in personagem.sections}
        for key, value in data.items():
            if key in BASE_FIELD_MAP or key in IGNORE_SECTION_KEYS:
                continue

            section = existing.get(key)
            if section:
                section.data = value
            else:
                personagem.sections.append(CharacterSection(section_key=key, data=value))
        

