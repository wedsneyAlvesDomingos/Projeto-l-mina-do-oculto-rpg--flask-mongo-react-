from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Boolean, DateTime, ForeignKey,
    Text, UniqueConstraint, Numeric, ARRAY
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

# =============================================================================
# CATÁLOGO — tabelas imutáveis de regras (v2, schema_v2.sql)
# =============================================================================

class CatalogSkill(Base):
    """35 habilidades do sistema (slugs canônicos)."""
    __tablename__ = 'catalog_skills'

    id              = Column(Integer, primary_key=True, autoincrement=True)
    slug            = Column(String, nullable=False, unique=True)
    display_name    = Column(String, nullable=False)
    categoria       = Column(String, nullable=False)
    descricao       = Column(Text)
    formula_calculo = Column(Text)
    marcos          = Column(JSONB, default=list)
    rule_version    = Column(String, nullable=False, default='0.5')

    def to_dict(self):
        return {
            'id': self.id, 'slug': self.slug,
            'nome': self.display_name, 'categoria': self.categoria,
            'descricao': self.descricao, 'marcos': self.marcos or [],
        }


class CatalogProficiencia(Base):
    """15 proficiências canônicas."""
    __tablename__ = 'catalog_proficiencias'

    id              = Column(Integer, primary_key=True, autoincrement=True)
    slug            = Column(String, nullable=False, unique=True)
    display_name    = Column(String, nullable=False)
    categoria       = Column(String)
    descricao       = Column(Text)
    rule_version    = Column(String, nullable=False, default='0.5')

    def to_dict(self):
        return {'id': self.id, 'slug': self.slug, 'nome': self.display_name, 'categoria': self.categoria}


class CatalogEspecie(Base):
    """14 espécies jogáveis."""
    __tablename__ = 'catalog_especies'

    id                  = Column(Integer, primary_key=True, autoincrement=True)
    slug                = Column(String, nullable=False, unique=True)
    display_name        = Column(String, nullable=False)
    pv_base             = Column(Integer, nullable=False, default=10)
    velocidade_base     = Column(Numeric(4, 1), nullable=False, default=6.0)
    tamanho             = Column(String, nullable=False, default='medio')
    resistencias        = Column(JSONB, default=list)
    vulnerabilidades    = Column(JSONB, default=list)
    imunidades          = Column(JSONB, default=list)
    descricao           = Column(Text)
    rule_version        = Column(String, nullable=False, default='0.5')

    subespecies         = relationship('CatalogSubespecie', back_populates='especie', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id, 'slug': self.slug, 'nome': self.display_name,
            'pvBase': self.pv_base, 'velocidadeBase': float(self.velocidade_base),
            'tamanho': self.tamanho,
            'resistencias': self.resistencias or [],
            'vulnerabilidades': self.vulnerabilidades or [],
            'imunidades': self.imunidades or [],
            'subespecies': [s.to_dict() for s in self.subespecies],
        }


class CatalogSubespecie(Base):
    """Sub-raças obrigatórias de cada espécie."""
    __tablename__ = 'catalog_subespecies'

    id                  = Column(Integer, primary_key=True, autoincrement=True)
    especie_id          = Column(Integer, ForeignKey('catalog_especies.id', ondelete='CASCADE'), nullable=False)
    slug                = Column(String, nullable=False)
    display_name        = Column(String, nullable=False)
    descricao           = Column(Text)
    visao_no_escuro_m   = Column(Integer)
    velocidade_override = Column(Numeric(4, 1))
    velocidade_voo_m    = Column(Numeric(4, 1))
    defesa_base_override = Column(Integer)
    resistencias        = Column(JSONB, default=list)
    vulnerabilidades    = Column(JSONB, default=list)
    imunidades          = Column(JSONB, default=list)
    armas_naturais      = Column(JSONB, default=list)
    flags               = Column(JSONB, default=dict)
    bonus_habilidades   = Column(JSONB, default=dict)
    proficiencias_ganhas = Column(JSONB, default=list)
    rule_version        = Column(String, nullable=False, default='0.5')

    especie             = relationship('CatalogEspecie', back_populates='subespecies')
    __table_args__      = (UniqueConstraint('especie_id', 'slug', name='uq_subesp_slug'),)

    def to_dict(self):
        return {
            'id': self.id, 'slug': self.slug, 'nome': self.display_name,
            'visaoNoEscuro': self.visao_no_escuro_m,
            'bonusHabilidades': self.bonus_habilidades or {},
            'proficienciasGanhas': self.proficiencias_ganhas or [],
            'flags': self.flags or {},
        }


class CatalogAntecedente(Base):
    """Antecedentes (backgrounds)."""
    __tablename__ = 'catalog_antecedentes'

    id                      = Column(Integer, primary_key=True, autoincrement=True)
    slug                    = Column(String, nullable=False, unique=True)
    display_name            = Column(String, nullable=False)
    descricao               = Column(Text)
    bonus_habilidades       = Column(JSONB, default=list)   # [{habilidade, pontos}]
    escolhas_habilidades    = Column(JSONB, default=list)   # [{grupo, pontos}]
    proficiencias_ganhas    = Column(JSONB, default=list)   # [{proficiencia, pontos}]
    escolhas_proficiencias  = Column(JSONB, default=list)
    itens_iniciais          = Column(JSONB, default=list)
    moedas_extra            = Column(Integer, nullable=False, default=0)
    escolhas_livres         = Column(Integer, nullable=False, default=0)
    rule_version            = Column(String, nullable=False, default='0.5')

    def to_dict(self):
        return {
            'id': self.id, 'slug': self.slug, 'nome': self.display_name,
            'bonusHabilidades': self.bonus_habilidades or [],
            'escolhasHabilidades': self.escolhas_habilidades or [],
            'proficienciasGanhas': self.proficiencias_ganhas or [],
            'itensIniciais': self.itens_iniciais or [],
            'moedasExtra': self.moedas_extra,
        }


class CatalogCondicao(Base):
    """Condições de status com flags mecânicos completos."""
    __tablename__ = 'catalog_condicoes'

    id                  = Column(Integer, primary_key=True, autoincrement=True)
    slug                = Column(String, nullable=False, unique=True)
    display_name        = Column(String, nullable=False)
    categoria           = Column(String, nullable=False)
    cor_hex             = Column(String)
    descricao           = Column(Text)
    duracao_padrao      = Column(Text)
    penalidades         = Column(JSONB, default=dict)
    flags               = Column(JSONB, default=dict)
    dano_recorrente     = Column(JSONB, default=dict)
    stack_regra         = Column(String)
    cura                = Column(Text)
    condicoes_implicitas = Column(JSONB, default=list)
    niveis_detalhes     = Column(JSONB, default=list)
    niveis_total        = Column(Integer, default=1)
    rule_version        = Column(String, nullable=False, default='0.5')

    def to_dict(self):
        return {
            'id': self.id, 'slug': self.slug, 'nome': self.display_name,
            'categoria': self.categoria, 'cor': self.cor_hex,
            'descricao': self.descricao,
            'penalidades': self.penalidades or {},
            'flags': self.flags or {},
            'danoRecorrente': self.dano_recorrente or {},
            'stackRegra': self.stack_regra,
            'cura': self.cura,
            'niveisDetalhes': self.niveis_detalhes or [],
        }


class CatalogItem(Base):
    """Catálogo de equipamentos: armas, armaduras, itens."""
    __tablename__ = 'catalog_items'

    id              = Column(Integer, primary_key=True, autoincrement=True)
    slug            = Column(String, nullable=False, unique=True)
    display_name    = Column(String, nullable=False)
    categoria       = Column(String, nullable=False)
    subcategoria    = Column(String)
    descricao       = Column(Text)
    peso_kg         = Column(Numeric(6, 2), default=0)
    preco_mo        = Column(Integer, default=0)
    rule_version    = Column(String, nullable=False, default='0.5')
    # armas
    dano            = Column(String)
    dano_secundario = Column(String)
    tipo_dano       = Column(String)
    critico_margem  = Column(Integer, default=20)
    alcance_texto   = Column(String)
    maos            = Column(String)
    prof_requerida  = Column(String)
    propriedades    = Column(JSONB, default=list)
    efeitos_especiais = Column(JSONB, default=list)
    # armaduras/escudos
    defesa          = Column(Integer)
    bonus_defesa    = Column(Integer)
    forca_minima    = Column(Integer)
    penalidade      = Column(JSONB, default=dict)

    def to_dict(self):
        return {
            'id': self.id, 'slug': self.slug, 'nome': self.display_name,
            'categoria': self.categoria, 'descricao': self.descricao,
            'pesoKg': float(self.peso_kg or 0), 'precoMO': self.preco_mo,
            'dano': self.dano, 'tipoDano': self.tipo_dano,
            'criticoMargem': self.critico_margem,
            'defesa': self.defesa, 'bonusDefesa': self.bonus_defesa,
            'forcaMinima': self.forca_minima,
            'penalidade': self.penalidade or {},
            'propriedades': self.propriedades or [],
            'efeitosEspeciais': self.efeitos_especiais or [],
        }


class CatalogAbility(Base):
    """Motor de abilities: passivas, ativas, escaláveis."""
    __tablename__ = 'catalog_abilities'

    id              = Column(Integer, primary_key=True, autoincrement=True)
    slug            = Column(String, nullable=False, unique=True)
    display_name    = Column(String, nullable=False)
    descricao       = Column(Text)
    tipo            = Column(String, nullable=False, default='ativa')
    subtipo         = Column(String)
    rule_version    = Column(String, nullable=False, default='0.5')
    # custo
    custo_acoes     = Column(Integer)
    custo_magia     = Column(Integer, default=0)
    custo_estamina  = Column(Integer, default=0)
    custo_pv        = Column(Integer, default=0)
    tempo_execucao  = Column(String)
    requer_foco     = Column(Boolean, default=False)
    # alcance/area
    alcance_m       = Column(Numeric(6, 1))
    area            = Column(JSONB, default=dict)
    # duração
    duracao_texto   = Column(String)
    duracao_tipo    = Column(String)
    duracao_valor   = Column(Integer)
    # cooldown
    cooldown_tipo   = Column(String)
    cooldown_valor  = Column(Integer, default=1)
    # efeitos
    efeito          = Column(JSONB, default=dict)
    efeito_opcional = Column(JSONB, default=dict)
    escalamento     = Column(JSONB, default=dict)
    # restrições
    limite_acumulo  = Column(Integer)
    restricao_texto = Column(String)
    passivos        = Column(JSONB, default=dict)

    def to_dict(self):
        return {
            'id': self.id, 'slug': self.slug, 'nome': self.display_name,
            'tipo': self.tipo, 'descricao': self.descricao,
            'custoAcoes': self.custo_acoes, 'custoMagia': self.custo_magia,
            'custoEstamina': self.custo_estamina,
            'alcance': float(self.alcance_m) if self.alcance_m else None,
            'duracao': self.duracao_texto, 'cooldown': self.cooldown_tipo,
            'efeito': self.efeito or {}, 'efeitoOpcional': self.efeito_opcional or {},
            'escalamento': self.escalamento or {}, 'passivos': self.passivos or {},
        }


class CatalogClasse(Base):
    """Classes aprendiz, primárias e especializações."""
    __tablename__ = 'catalog_classes'

    id                          = Column(Integer, primary_key=True, autoincrement=True)
    slug                        = Column(String, nullable=False, unique=True)
    display_name                = Column(String, nullable=False)
    tipo                        = Column(String, nullable=False)   # aprendiz|primaria|especializacao
    aprendiz_slug               = Column(String)
    descricao                   = Column(Text)
    descricao_curta             = Column(Text)
    bonus_por_regalia           = Column(JSONB, default=dict)
    habilidade_classe_nome      = Column(String)
    habilidade_classe_descricao = Column(Text)
    habilidade_classe_efeito    = Column(JSONB, default=dict)
    rule_version                = Column(String, nullable=False, default='0.5')

    def to_dict(self):
        return {
            'id': self.id, 'slug': self.slug, 'nome': self.display_name,
            'tipo': self.tipo, 'aprendizSlug': self.aprendiz_slug,
            'bonusPorRegalia': self.bonus_por_regalia or {},
            'habilidadeClasse': {
                'nome': self.habilidade_classe_nome,
                'descricao': self.habilidade_classe_descricao,
                'efeito': self.habilidade_classe_efeito or {},
            } if self.habilidade_classe_nome else None,
        }


class CatalogClasseEspecializacao(Base):
    """Requisitos para especialização (pura ou mista)."""
    __tablename__ = 'catalog_classe_especializacoes'

    id                      = Column(Integer, primary_key=True, autoincrement=True)
    classe_id               = Column(Integer, ForeignKey('catalog_classes.id', ondelete='CASCADE'), nullable=False)
    especializacao_id       = Column(Integer, ForeignKey('catalog_classes.id', ondelete='CASCADE'), nullable=False)
    min_regalias_propria    = Column(Integer, nullable=False, default=10)
    outras_classes_req      = Column(JSONB, default=list)
    __table_args__          = (UniqueConstraint('classe_id', 'especializacao_id', name='uq_classe_espec'),)


class CatalogArvoreRegalia(Base):
    """Árvores de regalia das classes primárias."""
    __tablename__ = 'catalog_arvores_regalia'

    id              = Column(Integer, primary_key=True, autoincrement=True)
    slug            = Column(String, nullable=False, unique=True)
    display_name    = Column(String, nullable=False)
    classe_id       = Column(Integer, ForeignKey('catalog_classes.id', ondelete='CASCADE'), nullable=False)
    rule_version    = Column(String, nullable=False, default='0.5')

    niveis          = relationship('CatalogArvoreNivel', back_populates='arvore', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id, 'slug': self.slug, 'nome': self.display_name,
            'classe_id': self.classe_id,
        }


class CatalogArvoreNivel(Base):
    """Cada nível (1/2/3) de uma árvore de regalia."""
    __tablename__ = 'catalog_arvore_niveis'

    id          = Column(Integer, primary_key=True, autoincrement=True)
    arvore_id   = Column(Integer, ForeignKey('catalog_arvores_regalia.id', ondelete='CASCADE'), nullable=False)
    nivel       = Column(Integer, nullable=False, default=1)
    regalia_id  = Column(Integer, ForeignKey('catalog_regalias.id', ondelete='CASCADE'), nullable=False)
    __table_args__ = (UniqueConstraint('arvore_id', 'nivel', name='uq_arvore_nivel'),)

    arvore      = relationship('CatalogArvoreRegalia', back_populates='niveis')

    def to_dict(self):
        return {
            'id': self.id, 'arvore_id': self.arvore_id,
            'nivel': self.nivel, 'regalia_id': self.regalia_id,
        }


class CatalogRegalia(Base):
    """Regalias: passivas simples a complexas com scaling e opções."""
    __tablename__ = 'catalog_regalias'

    id                  = Column(Integer, primary_key=True, autoincrement=True)
    slug                = Column(String, nullable=False, unique=True)
    display_name        = Column(String, nullable=False)
    descricao           = Column(Text)
    regalia_tipo        = Column(String, nullable=False)
    rule_version        = Column(String, nullable=False, default='0.5')
    custo               = Column(Integer, nullable=False, default=1)
    especie_id          = Column(Integer, ForeignKey('catalog_especies.id', ondelete='SET NULL'))
    classe_id           = Column(Integer)   # FK adicionada via ALTER TABLE após catalog_classes
    profissao_id        = Column(Integer, ForeignKey('catalog_profissoes.id', ondelete='SET NULL'))
    bonus_habilidades   = Column(JSONB, default=dict)
    escolhas_habilidades = Column(JSONB, default=list)
    proficiencias_ganhas = Column(JSONB, default=list)
    bonus_recursos      = Column(JSONB, default=dict)
    bonus_por_regalia   = Column(JSONB, default=dict)
    pre_requisitos      = Column(JSONB, default=dict)
    flags               = Column(JSONB, default=dict)
    opcoes_exclusivas   = Column(JSONB, default=list)
    passivos            = Column(JSONB, default=dict)

    abilities           = relationship('CatalogRegaliaAbility', back_populates='regalia', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id, 'slug': self.slug, 'nome': self.display_name,
            'tipo': self.regalia_tipo, 'custo': self.custo,
            'descricao': self.descricao,
            'bonusHabilidades': self.bonus_habilidades or {},
            'escolhasHabilidades': self.escolhas_habilidades or [],
            'proficienciasGanhas': self.proficiencias_ganhas or [],
            'bonusRecursos': self.bonus_recursos or {},
            'bonusPorRegalia': self.bonus_por_regalia or {},
            'preRequisitos': self.pre_requisitos or {},
            'opcoesExclusivas': self.opcoes_exclusivas or [],
            'passivos': self.passivos or {},
            'abilities': [ra.ability_id for ra in self.abilities],
        }


class CatalogRegaliaAbility(Base):
    """Relação N-N entre regalias e abilities."""
    __tablename__ = 'catalog_regalia_abilities'

    id          = Column(Integer, primary_key=True, autoincrement=True)
    regalia_id  = Column(Integer, ForeignKey('catalog_regalias.id', ondelete='CASCADE'), nullable=False)
    ability_id  = Column(Integer, ForeignKey('catalog_abilities.id', ondelete='CASCADE'), nullable=False)
    condicional = Column(String)
    __table_args__ = (UniqueConstraint('regalia_id', 'ability_id', name='uq_regalia_ability'),)

    regalia     = relationship('CatalogRegalia', back_populates='abilities')
    ability     = relationship('CatalogAbility')


class CatalogProfissao(Base):
    """Profissões com habilidades em árvore."""
    __tablename__ = 'catalog_profissoes'

    id                  = Column(Integer, primary_key=True, autoincrement=True)
    slug                = Column(String, nullable=False, unique=True)
    display_name        = Column(String, nullable=False)
    descricao           = Column(Text)
    renda_por_dia_mo    = Column(Integer, default=0)
    sistemas_especiais  = Column(JSONB, default=dict)
    rule_version        = Column(String, nullable=False, default='0.5')

    habilidades         = relationship('CatalogProfissaoHabilidade', back_populates='profissao', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id, 'slug': self.slug, 'nome': self.display_name,
            'descricao': self.descricao, 'rendaPorDia': self.renda_por_dia_mo,
            'sistemasEspeciais': self.sistemas_especiais or {},
            'habilidades': [h.to_dict() for h in self.habilidades],
        }


class CatalogProfissaoHabilidade(Base):
    """Habilidades de nível de profissão."""
    __tablename__ = 'catalog_profissao_habilidades'

    id              = Column(Integer, primary_key=True, autoincrement=True)
    profissao_id    = Column(Integer, ForeignKey('catalog_profissoes.id', ondelete='CASCADE'), nullable=False)
    ordem           = Column(Integer, nullable=False, default=1)
    custo_regalia   = Column(Integer, nullable=False, default=1)
    display_name    = Column(String, nullable=False)
    descricao       = Column(Text)
    efeitos_texto   = Column(JSONB, default=list)
    ability_id      = Column(Integer, ForeignKey('catalog_abilities.id', ondelete='SET NULL'))
    rule_version    = Column(String, nullable=False, default='0.5')

    profissao       = relationship('CatalogProfissao', back_populates='habilidades')

    def to_dict(self):
        return {
            'id': self.id, 'ordem': self.ordem, 'custo': self.custo_regalia,
            'nome': self.display_name, 'descricao': self.descricao,
            'efeitos': self.efeitos_texto or [],
        }



class User(Base):
    __tablename__ = 'users'

    id                  = Column(Integer, primary_key=True, autoincrement=True)
    name                = Column(String, unique=True, nullable=False)
    email               = Column(String, unique=True, nullable=False)
    password            = Column(String, nullable=False)
    email_confirmed     = Column(Boolean, default=False, nullable=False)
    confirmation_token  = Column(String, nullable=True)
    avatar              = Column(Text, nullable=True)
    created_at          = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at          = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    personagens = relationship('Personagem', back_populates='user', cascade='all, delete-orphan')


class Personagem(Base):
    __tablename__ = 'characters'

    id                  = Column(Integer, primary_key=True, autoincrement=True)
    user_id             = Column(Integer, ForeignKey('users.id'), nullable=False)
    rule_version        = Column(String, nullable=False, default='0.5', server_default='0.5')
    name                = Column(String, nullable=False)
    gender              = Column(String, nullable=True)
    age                 = Column(Integer, nullable=True)
    description         = Column(Text, nullable=True)
    image               = Column(String, nullable=True)
    created_at          = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at          = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # ── campos legados (mantidos para retrocompatibilidade) ─────────────────
    race                = Column(String, nullable=True)
    character_class     = Column(String, nullable=True)
    level               = Column(Integer, nullable=True)
    experience          = Column(Integer, default=0, nullable=True)
    regalia_points      = Column(Integer, nullable=True)

    # ── v2: FKs para catálogos (nullable — migração incremental) ─────────────
    especie_id          = Column(Integer, ForeignKey('catalog_especies.id',    ondelete='SET NULL'), nullable=True)
    subespecie_id       = Column(Integer, ForeignKey('catalog_subespecies.id', ondelete='SET NULL'), nullable=True)
    antecedente_id      = Column(Integer, ForeignKey('catalog_antecedentes.id',ondelete='SET NULL'), nullable=True)
    classe_aprendiz_id  = Column(Integer, ForeignKey('catalog_classes.id',     ondelete='SET NULL'), nullable=True)
    classe_primaria_id  = Column(Integer, ForeignKey('catalog_classes.id',     ondelete='SET NULL'), nullable=True)
    especializacao_id   = Column(Integer, ForeignKey('catalog_classes.id',     ondelete='SET NULL'), nullable=True)

    # ── v2: recursos ─────────────────────────────────────────────────────────
    pv_atual            = Column(Integer, nullable=True)
    pm_atual            = Column(Integer, nullable=True)
    pe_atual            = Column(Integer, nullable=True)
    pv_bonus_regalias   = Column(Integer, nullable=False, default=0, server_default='0')
    pm_bonus_regalias   = Column(Integer, nullable=False, default=0, server_default='0')
    pe_bonus_regalias   = Column(Integer, nullable=False, default=0, server_default='0')
    nivel_cansaco       = Column(Integer, nullable=False, default=0, server_default='0')
    regalia_points_total = Column(Integer, nullable=True)
    regalia_points_spent = Column(Integer, nullable=False, default=0, server_default='0')

    # ── v2: derivados cacheados (calculados pelo rule_engine) ─────────────────
    derivados           = Column(JSONB, default=dict)

    user        = relationship('User', back_populates='personagens')
    sections    = relationship('CharacterSection',   back_populates='character', cascade='all, delete-orphan')
    attributes  = relationship('CharacterAttribute', back_populates='character', cascade='all, delete-orphan')
    inventory   = relationship('CharacterInventory', back_populates='character', cascade='all, delete-orphan')
    skills      = relationship('CharacterSkill',     back_populates='character', cascade='all, delete-orphan')
    conditions  = relationship('CharacterCondition', back_populates='character', cascade='all, delete-orphan')
    proficiencies = relationship('CharacterProficiency', back_populates='character', cascade='all, delete-orphan')
    regalias    = relationship('CharacterRegalia',   back_populates='character', cascade='all, delete-orphan')
    effects     = relationship('CharacterEffect',    back_populates='character', cascade='all, delete-orphan')
    audit_logs  = relationship('CharacterAuditLog',  back_populates='character', cascade='all, delete-orphan')
    # v2 relationships
    char_skills_v2      = relationship('CharacterSkillV2',       back_populates='character', cascade='all, delete-orphan')
    char_proficiencias  = relationship('CharacterProficienciaV2', back_populates='character', cascade='all, delete-orphan')
    char_regalias_v2    = relationship('CharacterRegaliaV2',     back_populates='character', cascade='all, delete-orphan')
    char_abilities      = relationship('CharacterAbilityV2',     back_populates='character', cascade='all, delete-orphan')
    char_effects_v2     = relationship('CharacterEffectV2',      back_populates='character', cascade='all, delete-orphan')
    level_snapshots     = relationship('CharacterLevelSnapshot', back_populates='character', cascade='all, delete-orphan')

    def to_dict(self):
        data = {
            "id": self.id,
            "user_id": self.user_id,
            "nome_personagem": self.name,
            "pontos_de_regalia": self.regalia_points,
            "image": self.image,
            "genero": self.gender,
            "idade": self.age,
            "descricao": self.description,
            "classe": self.character_class,
            "nivel": self.level,
            "especie": self.race,
            "rule_version": self.rule_version or '0.5',
            "criado_em": self.created_at.isoformat() if isinstance(self.created_at, datetime) else self.created_at,
            "atualizado_em": self.updated_at.isoformat() if isinstance(self.updated_at, datetime) else self.updated_at,
            # v2 campos
            "especie_id": self.especie_id,
            "subespecie_id": self.subespecie_id,
            "antecedente_id": self.antecedente_id,
            "classe_aprendiz_id": self.classe_aprendiz_id,
            "classe_primaria_id": self.classe_primaria_id,
            "especializacao_id": self.especializacao_id,
            "pv_atual": self.pv_atual,
            "pm_atual": self.pm_atual,
            "pe_atual": self.pe_atual,
            "pv_bonus_regalias": self.pv_bonus_regalias or 0,
            "pm_bonus_regalias": self.pm_bonus_regalias or 0,
            "pe_bonus_regalias": self.pe_bonus_regalias or 0,
            "nivel_cansaco": self.nivel_cansaco or 0,
            "derivados": self.derivados or {},
        }
        for section in self.sections:
            data[section.section_key] = section.data
        return data




class AttributeDefinition(Base):
    __tablename__ = 'attribute_definitions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    slug = Column(String, nullable=False, unique=True)
    type = Column(String, nullable=False)
    extra_data = Column(JSONB, default={})

    attributes = relationship('CharacterAttribute', back_populates='definition', cascade='all, delete-orphan')


class CharacterAttribute(Base):
    __tablename__ = 'character_attributes'
    __table_args__ = (UniqueConstraint('character_id', 'attribute_id', name='uq_character_attribute'),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id'), nullable=False)
    attribute_id = Column(Integer, ForeignKey('attribute_definitions.id'), nullable=False)
    current_value = Column(Integer, nullable=True)
    max_value = Column(Integer, nullable=True)

    character = relationship('Personagem', back_populates='attributes')
    definition = relationship('AttributeDefinition', back_populates='attributes')


class Item(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=True)
    extra_data = Column(JSONB, default={})

    inventories = relationship('CharacterInventory', back_populates='item', cascade='all, delete-orphan')


class CharacterInventory(Base):
    __tablename__ = 'character_inventory'

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id'), nullable=False)
    item_id = Column(Integer, ForeignKey('items.id'), nullable=True)
    quantity = Column(Integer, default=1, nullable=False)
    equipped = Column(Boolean, default=False, nullable=False)
    slot = Column(String, nullable=True)
    extra_data = Column(JSONB, default={})

    character = relationship('Personagem', back_populates='inventory')
    item = relationship('Item', back_populates='inventories')


class Skill(Base):
    __tablename__ = 'skills'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    extra_data = Column(JSONB, default={})

    characters = relationship('CharacterSkill', back_populates='skill', cascade='all, delete-orphan')


class CharacterSkill(Base):
    __tablename__ = 'character_skills'

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id'), nullable=False)
    skill_id = Column(Integer, ForeignKey('skills.id'), nullable=True)
    level = Column(Integer, nullable=True)
    extra_data = Column(JSONB, default={})

    character = relationship('Personagem', back_populates='skills')
    skill = relationship('Skill', back_populates='characters')


class Condition(Base):
    __tablename__ = 'conditions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    extra_data = Column(JSONB, default={})

    characters = relationship('CharacterCondition', back_populates='condition', cascade='all, delete-orphan')


class CharacterCondition(Base):
    __tablename__ = 'character_conditions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id'), nullable=False)
    condition_id = Column(Integer, ForeignKey('conditions.id'), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    extra_data = Column(JSONB, default={})

    character = relationship('Personagem', back_populates='conditions')
    condition = relationship('Condition', back_populates='characters')


class Proficiency(Base):
    __tablename__ = 'proficiencies'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    extra_data = Column(JSONB, default={})

    characters = relationship('CharacterProficiency', back_populates='proficiency', cascade='all, delete-orphan')


class CharacterProficiency(Base):
    __tablename__ = 'character_proficiencies'

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id'), nullable=False)
    proficiency_id = Column(Integer, ForeignKey('proficiencies.id'), nullable=True)
    level = Column(Integer, nullable=True)
    extra_data = Column(JSONB, default={})

    character = relationship('Personagem', back_populates='proficiencies')
    proficiency = relationship('Proficiency', back_populates='characters')


class Regalia(Base):
    __tablename__ = 'regalias'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    extra_data = Column(JSONB, default={})

    characters = relationship('CharacterRegalia', back_populates='regalia', cascade='all, delete-orphan')


class CharacterRegalia(Base):
    __tablename__ = 'character_regalias'

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id'), nullable=False)
    regalia_id = Column(Integer, ForeignKey('regalias.id'), nullable=True)
    source_type = Column(String, nullable=True)
    extra_data = Column(JSONB, default={})

    character = relationship('Personagem', back_populates='regalias')
    regalia = relationship('Regalia', back_populates='characters')


class CharacterSection(Base):
    __tablename__ = 'character_sections'
    __table_args__ = (UniqueConstraint('character_id', 'section_key', name='uq_character_section'),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id'), nullable=False)
    section_key = Column(String, nullable=False)
    data = Column(JSONB, default={})

    character = relationship('Personagem', back_populates='sections')


class CharacterEffect(Base):
    """
    Efeitos ativos sobre o personagem (poções, venenos, regalias, condições, kits, materiais).
    Cada efeito rastreia sua origem, dados mecânicos (JSONB), duração por rodadas/usos,
    e se expira em descanso curto/longo.

    Ref: schema-ficha.json → efeitos_ativos, LDO 0.5 seções "Poções", "Venenos", "Condições"
    """
    __tablename__ = 'character_effects'

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id'), nullable=False)
    effect_type = Column(String, nullable=False)       # 'pocao', 'veneno', 'regalia', 'condicao', 'kit', 'material', 'outro'
    source = Column(String, nullable=True)              # nome/id da origem
    data = Column(JSONB, default={})                    # dados mecânicos livres
    remaining_rounds = Column(Integer, nullable=True)   # rodadas restantes (NULL = sem duração)
    remaining_uses = Column(Integer, nullable=True)     # usos restantes (NULL = sem limite)
    expires_on_rest = Column(String, nullable=True)     # 'curto', 'longo', 'ambos', NULL
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    character = relationship('Personagem', back_populates='effects')

    def to_dict(self):
        return {
            'id': self.id,
            'character_id': self.character_id,
            'effect_type': self.effect_type,
            'source': self.source,
            'data': self.data or {},
            'remaining_rounds': self.remaining_rounds,
            'remaining_uses': self.remaining_uses,
            'expires_on_rest': self.expires_on_rest,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class CharacterAuditLog(Base):
    """
    Trilha de auditoria para toda mutação de personagem.
    Registra quem fez o quê, quando, e o estado antes/depois.

    Ref: TODO-BE-006 — Toda mutação de personagem gera registro no log.
    """
    __tablename__ = 'character_audit_log'

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id', ondelete='CASCADE'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    action = Column(Text, nullable=False)       # 'create', 'update', 'delete', 'rest', 'condition_add', etc.
    before_state = Column(JSONB, nullable=True)
    after_state = Column(JSONB, nullable=True)
    metadata_ = Column('metadata', JSONB, default={})  # 'metadata' é nome reservado em SQLAlchemy
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    character = relationship('Personagem', back_populates='audit_logs')
    user = relationship('User')

    def to_dict(self):
        return {
            'id': self.id,
            'character_id': self.character_id,
            'user_id': self.user_id,
            'action': self.action,
            'before_state': self.before_state,
            'after_state': self.after_state,
            'metadata': self.metadata_ or {},
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class CharacterLevelSnapshot(Base):
    """
    Snapshot de evolução: armazena o estado completo do personagem
    no momento em que subiu de nível. Permite regredir (desfazer evolução).

    - nivel: o nível PARA o qual o personagem evoluiu (2+)
    - snapshot_data: estado COMPLETO do personagem ANTES da evolução
    - Nível 1 (criação) nunca pode ser desfeito.
    """
    __tablename__ = 'character_level_snapshots'
    __table_args__ = (
        UniqueConstraint('character_id', 'nivel', name='uq_char_level_snapshot'),
    )

    id = Column(Integer, primary_key=True, autoincrement=True)
    character_id = Column(Integer, ForeignKey('characters.id', ondelete='CASCADE'), nullable=False)
    nivel = Column(Integer, nullable=False)
    snapshot_data = Column(JSONB, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    character = relationship('Personagem', back_populates='level_snapshots')

    def to_dict(self):
        return {
            'id': self.id,
            'character_id': self.character_id,
            'nivel': self.nivel,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


# =============================================================================
# TABELAS DE PERSONAGEM v2 — referenciam catálogos
# =============================================================================

class CharacterSkillV2(Base):
    """Valores de habilidade do personagem (35 skills)."""
    __tablename__ = 'character_skills_v2'
    __table_args__ = (UniqueConstraint('character_id', 'skill_id', name='uq_char_skill_v2'),)

    id              = Column(Integer, primary_key=True, autoincrement=True)
    character_id    = Column(Integer, ForeignKey('characters.id', ondelete='CASCADE'), nullable=False)
    skill_id        = Column(Integer, ForeignKey('catalog_skills.id', ondelete='CASCADE'), nullable=False)
    valor           = Column(Integer, nullable=False, default=0)

    character       = relationship('Personagem', back_populates='char_skills_v2')
    skill           = relationship('CatalogSkill')

    def to_dict(self):
        return {
            'skill_id': self.skill_id,
            'slug': self.skill.slug if self.skill else None,
            'nome': self.skill.display_name if self.skill else None,
            'valor': self.valor,
        }


class CharacterProficienciaV2(Base):
    """Proficiências do personagem com origem rastreada."""
    __tablename__ = 'character_proficiencias_v2'
    __table_args__ = (UniqueConstraint('character_id', 'proficiencia_id', name='uq_char_prof_v2'),)

    id              = Column(Integer, primary_key=True, autoincrement=True)
    character_id    = Column(Integer, ForeignKey('characters.id', ondelete='CASCADE'), nullable=False)
    proficiencia_id = Column(Integer, ForeignKey('catalog_proficiencias.id', ondelete='CASCADE'), nullable=False)
    nivel           = Column(Integer, nullable=False, default=0)
    origem          = Column(String)   # 'especie'|'antecedente'|'classe'|'regalia'|'manual'

    character       = relationship('Personagem', back_populates='char_proficiencias')
    proficiencia    = relationship('CatalogProficiencia')


class CharacterRegaliaV2(Base):
    """Regalias compradas pelo personagem (v2, com FK para catalog_regalias)."""
    __tablename__ = 'character_regalias_v2'
    __table_args__ = (UniqueConstraint('character_id', 'regalia_id', 'opcao_escolhida', name='uq_char_regalia_v2'),)

    id              = Column(Integer, primary_key=True, autoincrement=True)
    character_id    = Column(Integer, ForeignKey('characters.id', ondelete='CASCADE'), nullable=False)
    regalia_id      = Column(Integer, ForeignKey('catalog_regalias.id', ondelete='CASCADE'), nullable=False)
    opcao_escolhida = Column(String)      # para opcoes_exclusivas
    nivel_arvore    = Column(Integer)     # para regalias de árvore (1, 2, 3)
    quantidade      = Column(Integer, nullable=False, default=1)
    comprado_em     = Column(DateTime, default=datetime.utcnow, nullable=False)

    character       = relationship('Personagem', back_populates='char_regalias_v2')
    regalia         = relationship('CatalogRegalia')

    def to_dict(self):
        return {
            'id': self.id, 'regalia_id': self.regalia_id,
            'slug': self.regalia.slug if self.regalia else None,
            'nome': self.regalia.display_name if self.regalia else None,
            'opcaoEscolhida': self.opcao_escolhida,
            'nivelArvore': self.nivel_arvore,
            'quantidade': self.quantidade,
        }


class CharacterAbilityV2(Base):
    """Abilities ativas do personagem com controle de cooldown/usos."""
    __tablename__ = 'character_abilities_v2'
    __table_args__ = (UniqueConstraint('character_id', 'ability_id', name='uq_char_ability_v2'),)

    id              = Column(Integer, primary_key=True, autoincrement=True)
    character_id    = Column(Integer, ForeignKey('characters.id', ondelete='CASCADE'), nullable=False)
    ability_id      = Column(Integer, ForeignKey('catalog_abilities.id', ondelete='CASCADE'), nullable=False)
    usos_restantes  = Column(Integer)      # NULL = sem limite
    ultimo_uso_rodada = Column(Integer)
    ultimo_uso_at   = Column(DateTime)

    character       = relationship('Personagem', back_populates='char_abilities')
    ability         = relationship('CatalogAbility')

    def to_dict(self):
        return {
            'id': self.id, 'ability_id': self.ability_id,
            'slug': self.ability.slug if self.ability else None,
            'nome': self.ability.display_name if self.ability else None,
            'usosRestantes': self.usos_restantes,
        }


class CharacterEffectV2(Base):
    """Condições e efeitos ativos com FK para catalog_condicoes."""
    __tablename__ = 'character_effects_v2'

    id              = Column(Integer, primary_key=True, autoincrement=True)
    character_id    = Column(Integer, ForeignKey('characters.id', ondelete='CASCADE'), nullable=False)
    condicao_id     = Column(Integer, ForeignKey('catalog_condicoes.id', ondelete='SET NULL'))
    effect_slug     = Column(String)       # para efeitos sem catálogo
    display_name    = Column(String)
    nivel           = Column(Integer, nullable=False, default=1)
    fonte_tipo      = Column(String)       # 'habilidade'|'ataque'|'item'|'condicao'|'manual'
    fonte_slug      = Column(String)
    aplicada_em     = Column(DateTime, default=datetime.utcnow, nullable=False)
    expira_em       = Column(DateTime)
    duracao_tipo    = Column(String)       # 'rodadas'|'turnos'|'horas'|'ate_descanso_curto'|...
    duracao_valor   = Column(Integer)
    rodada_aplicacao = Column(Integer)
    snapshot        = Column(JSONB, default=dict)   # penalidades/flags no momento da aplicação

    character       = relationship('Personagem', back_populates='char_effects_v2')
    condicao        = relationship('CatalogCondicao')

    def to_dict(self):
        cond_data = self.condicao.to_dict() if self.condicao else {}
        return {
            'id': self.id, 'condicao_id': self.condicao_id,
            'slug': self.effect_slug or (self.condicao.slug if self.condicao else None),
            'nome': self.display_name or (self.condicao.display_name if self.condicao else None),
            'nivel': self.nivel, 'fonteTipo': self.fonte_tipo, 'fonteSlug': self.fonte_slug,
            'aplicadaEm': self.aplicada_em.isoformat() if self.aplicada_em else None,
            'expiraEm': self.expira_em.isoformat() if self.expira_em else None,
            'duracaoTipo': self.duracao_tipo, 'duracaoValor': self.duracao_valor,
            'snapshot': self.snapshot or cond_data,
        }
