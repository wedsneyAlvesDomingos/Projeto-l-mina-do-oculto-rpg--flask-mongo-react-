"""
Catálogos do sistema Lâmina do Oculto v0.5
============================================
Funções DB-backed que consultam as tabelas catalog_* do banco.
Os dados estáticos legados (HABILIDADES, PROFICIENCIAS, etc.) são mantidos
como fallback para rotas v1.

Para popular o banco: docker exec -it backendLDO python scripts/seed_catalogs.py
"""
from __future__ import annotations
from typing import Any


# ============================================================================
# HELPERS
# ============================================================================

def _rows_to_list(rows) -> list[dict]:
    return [r.to_dict() for r in rows]


# ============================================================================
# FUNÇÕES DB-BACKED v2
# ============================================================================

def get_catalog_skills(session) -> list[dict]:
    from models.models import CatalogSkill
    return _rows_to_list(session.query(CatalogSkill).order_by(CatalogSkill.categoria, CatalogSkill.display_name).all())


def get_catalog_proficiencias(session) -> list[dict]:
    from models.models import CatalogProficiencia
    return _rows_to_list(session.query(CatalogProficiencia).order_by(CatalogProficiencia.display_name).all())


def get_catalog_especies(session, include_subespecies: bool = True) -> list[dict]:
    from models.models import CatalogEspecie, CatalogSubespecie
    especies = session.query(CatalogEspecie).order_by(CatalogEspecie.display_name).all()
    result = []
    for e in especies:
        d = e.to_dict()
        if include_subespecies:
            subs = session.query(CatalogSubespecie).filter_by(especie_id=e.id).all()
            d["subespecies"] = _rows_to_list(subs)
        else:
            d["subespecies"] = []
        result.append(d)
    return result


def get_catalog_condicoes(session, categoria: str | None = None) -> list[dict]:
    from models.models import CatalogCondicao
    q = session.query(CatalogCondicao)
    if categoria:
        q = q.filter_by(categoria=categoria)
    return _rows_to_list(q.order_by(CatalogCondicao.categoria, CatalogCondicao.display_name).all())


def get_catalog_items(session, categoria: str | None = None,
                      subcategoria: str | None = None) -> list[dict]:
    from models.models import CatalogItem
    q = session.query(CatalogItem)
    if categoria:
        q = q.filter_by(categoria=categoria)
    if subcategoria:
        q = q.filter_by(subcategoria=subcategoria)
    return _rows_to_list(q.order_by(CatalogItem.subcategoria, CatalogItem.display_name).all())


def get_catalog_abilities(session, tipo: str | None = None) -> list[dict]:
    from models.models import CatalogAbility
    q = session.query(CatalogAbility)
    if tipo:
        q = q.filter_by(tipo=tipo)
    return _rows_to_list(q.order_by(CatalogAbility.tipo, CatalogAbility.display_name).all())


def get_catalog_classes(session, tipo: str | None = None) -> list[dict]:
    from models.models import CatalogClasse
    q = session.query(CatalogClasse)
    if tipo:
        q = q.filter_by(tipo=tipo)
    return _rows_to_list(q.order_by(CatalogClasse.tipo, CatalogClasse.display_name).all())


def get_catalog_regalias(session, tipo: str | None = None,
                          classe_slug: str | None = None) -> list[dict]:
    from models.models import CatalogRegalia, CatalogClasse
    q = session.query(CatalogRegalia)
    if tipo:
        q = q.filter_by(regalia_tipo=tipo)
    if classe_slug:
        classe = session.query(CatalogClasse).filter_by(slug=classe_slug).first()
        if classe:
            q = q.filter_by(classe_id=classe.id)
    return _rows_to_list(q.order_by(CatalogRegalia.regalia_tipo, CatalogRegalia.display_name).all())


def get_catalog_arvores(session, classe_slug: str | None = None) -> list[dict]:
    from models.models import CatalogArvoreRegalia, CatalogArvoreNivel, CatalogClasse
    q = session.query(CatalogArvoreRegalia)
    if classe_slug:
        classe = session.query(CatalogClasse).filter_by(slug=classe_slug).first()
        if classe:
            q = q.filter_by(classe_id=classe.id)
    arvores = q.order_by(CatalogArvoreRegalia.display_name).all()
    result = []
    for arv in arvores:
        d = arv.to_dict()
        niveis = session.query(CatalogArvoreNivel).filter_by(
            arvore_id=arv.id
        ).order_by(CatalogArvoreNivel.nivel).all()
        d["niveis"] = _rows_to_list(niveis)
        result.append(d)
    return result


def get_catalog_profissoes(session) -> list[dict]:
    from models.models import CatalogProfissao
    return _rows_to_list(session.query(CatalogProfissao).order_by(CatalogProfissao.display_name).all())


def get_all_catalogs(session) -> dict:
    """Retorna todos os catálogos em uma única chamada (usado por GET /api/v2/catalogs)."""
    return {
        "skills":        get_catalog_skills(session),
        "proficiencias": get_catalog_proficiencias(session),
        "especies":      get_catalog_especies(session),
        "condicoes":     get_catalog_condicoes(session),
        "items":         get_catalog_items(session),
        "abilities":     get_catalog_abilities(session),
        "classes":       get_catalog_classes(session),
        "regalias":      get_catalog_regalias(session),
        "arvores":       get_catalog_arvores(session),
        "profissoes":    get_catalog_profissoes(session),
    }


# ============================================================================
# DADOS LEGADOS (fallback para rotas v1 — não remover)
# ============================================================================

HABILIDADES = [
    # Físico (8)
    {"slug": "fortitude",            "nome": "Fortitude",              "categoria": "fisico"},
    {"slug": "forca",                "nome": "Força",                  "categoria": "fisico"},
    {"slug": "agilidade",            "nome": "Agilidade",              "categoria": "fisico"},
    {"slug": "combate_corpo_a_corpo","nome": "Combate Corpo a Corpo",  "categoria": "fisico"},
    {"slug": "combate_a_distancia",  "nome": "Combate a Distância",    "categoria": "fisico"},
    {"slug": "atletismo",            "nome": "Atletismo",              "categoria": "fisico"},
    {"slug": "acrobacia",            "nome": "Acrobacia",              "categoria": "fisico"},
    {"slug": "destreza",             "nome": "Destreza",               "categoria": "fisico"},
    # Exploração (8)
    {"slug": "furtividade",          "nome": "Furtividade",            "categoria": "exploracao"},
    {"slug": "investigacao",         "nome": "Investigação",           "categoria": "exploracao"},
    {"slug": "rastreamento",         "nome": "Rastreamento",           "categoria": "exploracao"},
    {"slug": "percepcao",            "nome": "Percepção",              "categoria": "exploracao"},
    {"slug": "sobrevivencia",        "nome": "Sobrevivência",          "categoria": "exploracao"},
    {"slug": "lidar_com_animais",    "nome": "Lidar com animais",      "categoria": "exploracao"},
    {"slug": "navegacao",            "nome": "Navegação",              "categoria": "exploracao"},
    {"slug": "armadilhas",           "nome": "Armadilhas",             "categoria": "exploracao"},
    # Conhecimento (7)
    {"slug": "historia",             "nome": "História",               "categoria": "conhecimento"},
    {"slug": "intuicao",             "nome": "Intuição",               "categoria": "conhecimento"},
    {"slug": "natureza",             "nome": "Natureza",               "categoria": "conhecimento"},
    {"slug": "medicina",             "nome": "Medicina",               "categoria": "conhecimento"},
    {"slug": "jurisprudencia",       "nome": "Jurisprudência",         "categoria": "conhecimento"},
    {"slug": "teologia",             "nome": "Teologia",               "categoria": "conhecimento"},
    {"slug": "tecnologia",           "nome": "Tecnologia",             "categoria": "conhecimento"},
    # Arcana (6)
    {"slug": "arcanismo",            "nome": "Arcanismo",              "categoria": "arcana"},
    {"slug": "alquimia",             "nome": "Alquimia",               "categoria": "arcana"},
    {"slug": "ritualismo",           "nome": "Ritualismo",             "categoria": "arcana"},
    {"slug": "ocultismo",            "nome": "Ocultismo",              "categoria": "arcana"},
    {"slug": "arcanatec",            "nome": "Arcanatec",              "categoria": "arcana"},
    {"slug": "combate_arcano",       "nome": "Combate Arcano",         "categoria": "arcana"},
    # Social (6)
    {"slug": "enganacao",            "nome": "Enganação",              "categoria": "social"},
    {"slug": "persuasao",            "nome": "Persuasão",              "categoria": "social"},
    {"slug": "performance",          "nome": "Performance",            "categoria": "social"},
    {"slug": "intimidacao",          "nome": "Intimidação",            "categoria": "social"},
    {"slug": "seducao",              "nome": "Sedução",                "categoria": "social"},
    {"slug": "negociacao",           "nome": "Negociação",             "categoria": "social"},
]

PROFICIENCIAS = [
    {"id": "armas_armaduras",                "nome": "Maestria em Armaduras e Escudos"},
    {"id": "conducao_veiculos_terrestres",   "nome": "Condução de Veículos Terrestres"},
    {"id": "conducao_veiculos_aquaticos",    "nome": "Condução de Veículos Aquáticos"},
    {"id": "conducao_exotica",               "nome": "Condução Exótica"},
    {"id": "kit_arrombamento",               "nome": "Kit de Arrombamento"},
    {"id": "armas_de_fogo",                  "nome": "Armas de Fogo"},
    {"id": "linguas_antigas",                "nome": "Línguas Antigas"},
    {"id": "arqueologia",                    "nome": "Arqueologia"},
    {"id": "lideranca",                      "nome": "Liderança"},
    {"id": "armas_exoticas",                 "nome": "Armas Exóticas"},
    {"id": "esgrima",                        "nome": "Esgrima"},
    {"id": "arco_besta",                     "nome": "Arco e Besta"},
    {"id": "disfarce",                       "nome": "Disfarce"},
    {"id": "ataques_em_area",                "nome": "Ataques em Área"},
    {"id": "combate_anti_conjuradores",      "nome": "Combate Anti-Conjuradores"},
]

CONDICOES = [
    {"id": "agarrado",    "nome": "Agarrado",    "categoria": "controle"},
    {"id": "atordoado",   "nome": "Atordoado",   "categoria": "controle"},
    {"id": "cego",        "nome": "Cego",        "categoria": "controle"},
    {"id": "dominado",    "nome": "Dominado",    "categoria": "controle"},
    {"id": "incapacitado","nome": "Incapacitado","categoria": "controle"},
    {"id": "paralisado",  "nome": "Paralisado",  "categoria": "controle"},
    {"id": "petrificado", "nome": "Petrificado", "categoria": "controle"},
    {"id": "surdo",       "nome": "Surdo",       "categoria": "controle"},
    {"id": "envenenado",  "nome": "Envenenado",  "categoria": "dano"},
    {"id": "queimando",   "nome": "Queimando",   "categoria": "dano"},
    {"id": "sangrando",   "nome": "Sangrando",   "categoria": "dano"},
    {"id": "amedrontado", "nome": "Amedrontado", "categoria": "debuff"},
    {"id": "cansado",     "nome": "Cansado",     "categoria": "debuff"},
    {"id": "abencoado",   "nome": "Abençoado",   "categoria": "buff"},
    {"id": "inspirado",   "nome": "Inspirado",   "categoria": "buff"},
]

ESPECIES = [
    {"id": "humano",     "nome": "Humano",        "pvBase": 10, "velocidadeBase": 6},
    {"id": "elfo",       "nome": "Elfo",           "pvBase": 10, "velocidadeBase": 7.5},
    {"id": "anao",       "nome": "Anão",           "pvBase": 12, "velocidadeBase": 4.5},
    {"id": "halfling",   "nome": "Halfling",       "pvBase": 10, "velocidadeBase": 4.5},
    {"id": "tiefling",   "nome": "Tiefling",       "pvBase": 11, "velocidadeBase": 6},
    {"id": "draconato",  "nome": "Draconato",      "pvBase": 9,  "velocidadeBase": 4.5},
    {"id": "orc",        "nome": "Orc",            "pvBase": 12, "velocidadeBase": 6},
    {"id": "gnomo",      "nome": "Gnomo",          "pvBase": 10, "velocidadeBase": 6},
    {"id": "constructo", "nome": "Constructo",     "pvBase": 11, "velocidadeBase": 6},
]
