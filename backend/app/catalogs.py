"""
Catálogos do sistema Lâmina do Oculto v0.5
============================================
Dados extraídos do frontend (habilidades.js, proficiencias.js, condicoes.js,
equipamentos.js) em formato Python para uso pelo backend.

TODO-BE-003: Sincronizar catálogos do frontend com tabelas do banco.
Fonte de verdade: frontend/src/data/constants/
"""

# ============================================================================
# HABILIDADES — 35 habilidades organizadas por categoria
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

# ============================================================================
# PROFICIÊNCIAS — 15 proficiências
# ============================================================================

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

# ============================================================================
# CONDIÇÕES — 32 condições organizadas por categoria
# ============================================================================

CONDICOES = [
    # Efeitos de controle
    {"id": "agarrado",       "nome": "Agarrado",       "categoria": "controle"},
    {"id": "atordoado",      "nome": "Atordoado",      "categoria": "controle"},
    {"id": "caido",          "nome": "Caído",           "categoria": "controle"},
    {"id": "cego",           "nome": "Cego",            "categoria": "controle"},
    {"id": "dominado",       "nome": "Dominado",        "categoria": "controle"},
    {"id": "imobilizado",    "nome": "Imobilizado",     "categoria": "controle"},
    {"id": "incapacitado",   "nome": "Incapacitado",    "categoria": "controle"},
    {"id": "inconsciente",   "nome": "Inconsciente",    "categoria": "controle"},
    {"id": "paralisado",     "nome": "Paralisado",      "categoria": "controle"},
    {"id": "petrificado",    "nome": "Petrificado",     "categoria": "controle"},
    {"id": "surdo",          "nome": "Surdo",           "categoria": "controle"},
    {"id": "surpreso",       "nome": "Surpreso",        "categoria": "controle"},
    # Efeitos de dano
    {"id": "envenenado",     "nome": "Envenenado",      "categoria": "dano"},
    {"id": "queimando",      "nome": "Queimando",       "categoria": "dano"},
    {"id": "sangrando",      "nome": "Sangrando",       "categoria": "dano"},
    {"id": "congelado",      "nome": "Congelado",       "categoria": "dano"},
    {"id": "corroido",       "nome": "Corroído",        "categoria": "dano"},
    # Efeitos de debuff
    {"id": "amedrontado",    "nome": "Amedrontado",     "categoria": "debuff"},
    {"id": "cansado",        "nome": "Cansado",         "categoria": "debuff"},
    {"id": "enjoado",        "nome": "Enjoado",         "categoria": "debuff"},
    {"id": "exausto",        "nome": "Exausto",         "categoria": "debuff"},
    {"id": "faminto",        "nome": "Faminto",         "categoria": "debuff"},
    {"id": "desidratado",    "nome": "Desidratado",     "categoria": "debuff"},
    {"id": "sufocando",      "nome": "Sufocando",       "categoria": "debuff"},
    # Efeitos de buff
    {"id": "abencoado",      "nome": "Abençoado",       "categoria": "buff"},
    {"id": "inspirado",      "nome": "Inspirado",       "categoria": "buff"},
    {"id": "protetor",       "nome": "Protetor",        "categoria": "buff"},
    {"id": "acelerado",      "nome": "Acelerado",       "categoria": "buff"},
    # Efeitos especiais
    {"id": "invisivel",      "nome": "Invisível",       "categoria": "especial"},
    {"id": "morrendo",       "nome": "Morrendo",        "categoria": "especial"},
    {"id": "estabilizado",   "nome": "Estabilizado",    "categoria": "especial"},
    {"id": "concentrando",   "nome": "Concentrando",    "categoria": "especial"},
]

# ============================================================================
# ESPÉCIES — 14 espécies
# ============================================================================

ESPECIES = [
    {"id": "humano",        "nome": "Humano",         "pvBase": 10, "velocidadeBase": 6,   "tamanho": "medio"},
    {"id": "elfo",          "nome": "Elfo",            "pvBase": 10, "velocidadeBase": 7.5, "tamanho": "medio"},
    {"id": "anao",          "nome": "Anão",            "pvBase": 12, "velocidadeBase": 4.5, "tamanho": "medio"},
    {"id": "feerico",       "nome": "Feérico",         "pvBase": 10, "velocidadeBase": 6,   "tamanho": "medio"},
    {"id": "draconiano",    "nome": "Draconiano",      "pvBase": 9,  "velocidadeBase": 4.5, "tamanho": "medio"},
    {"id": "meioElfo",      "nome": "Meio-Elfo",       "pvBase": 9,  "velocidadeBase": 6,   "tamanho": "medio"},
    {"id": "meioDemonio",   "nome": "Meio-Demônio",    "pvBase": 11, "velocidadeBase": 6,   "tamanho": "medio"},
    {"id": "meioCelestial", "nome": "Meio-Celestial",  "pvBase": 9,  "velocidadeBase": 6,   "tamanho": "medio"},
    {"id": "meioGenio",     "nome": "Meio-Gênio",      "pvBase": 10, "velocidadeBase": 6,   "tamanho": "medio"},
    {"id": "meioTroll",     "nome": "Meio-Troll",      "pvBase": 12, "velocidadeBase": 7.5, "tamanho": "medio"},
    {"id": "bestial",       "nome": "Bestial",         "pvBase": 10, "velocidadeBase": 6,   "tamanho": "medio"},
    {"id": "halfling",      "nome": "Halfling",        "pvBase": 10, "velocidadeBase": 4.5, "tamanho": "pequeno"},
    {"id": "troll",         "nome": "Troll",           "pvBase": 15, "velocidadeBase": 4.5, "tamanho": "grande"},
    {"id": "constructo",    "nome": "Constructo",      "pvBase": 11, "velocidadeBase": 6,   "tamanho": "medio"},
]
