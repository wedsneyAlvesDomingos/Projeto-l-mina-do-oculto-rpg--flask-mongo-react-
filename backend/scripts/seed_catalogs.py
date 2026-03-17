#!/usr/bin/env python3
"""
Seed de Catálogos v2 — Lâmina do Oculto v0.5
==============================================
Popula TODAS as tabelas catalog_* do banco com os dados completos do jogo.
As tabelas legacy (skills, conditions, regalias, items) também são mantidas
para compatibilidade com o frontend v1.

Uso:
    docker exec -it backendLDO python scripts/seed_catalogs.py

Pré-requisito: execute migrate_to_v2.py antes deste script.
"""

import os
import sys
import json
import psycopg2
from psycopg2.extras import Json

RULE_VERSION = "0.5"


def get_conn():
    """Cria conexão com o PostgreSQL usando variáveis de ambiente."""
    return psycopg2.connect(
        host=os.getenv("POSTGRES_HOST", "localhost"),
        port=os.getenv("POSTGRES_PORT", "5433"),
        dbname=os.getenv("POSTGRES_DB", "your_database"),
        user=os.getenv("POSTGRES_USER", "your_user"),
        password=os.getenv("POSTGRES_PASSWORD", "your_password"),
    )


def upsert(cur, table, conflict_col, data: dict):
    """INSERT ... ON CONFLICT (conflict_col) DO UPDATE SET ..."""
    # Convert Python dicts/lists to Json() so psycopg2 serialises JSONB correctly
    processed = {
        k: (Json(v) if isinstance(v, (dict, list)) else v)
        for k, v in data.items()
    }
    cols = list(processed.keys())
    vals = [processed[c] for c in cols]
    placeholders = ", ".join(["%s"] * len(cols))
    col_names = ", ".join(cols)
    updates = ", ".join(f"{c} = EXCLUDED.{c}" for c in cols if c != conflict_col)
    sql = (
        f"INSERT INTO {table} ({col_names}) VALUES ({placeholders}) "
        f"ON CONFLICT ({conflict_col}) DO UPDATE SET {updates}"
    )
    cur.execute(sql, vals)


# ============================================================================
# DADOS v2
# ============================================================================

# (slug, nome, categoria, descricao)
SKILLS = [
    # fisico
    ("forca",        "Força",          "fisico",       "Força bruta, carregar peso e quebrar objetos."),
    ("destreza",     "Destreza",        "fisico",       "Precisão manual, equilíbrio e reflexos finos."),
    ("fortitude",    "Fortitude",       "fisico",       "Resistência física e saúde geral."),
    ("agilidade",    "Agilidade",       "fisico",       "Velocidade de movimento e esquiva."),
    ("furtividade",  "Furtividade",     "fisico",       "Mover-se sem ser percebido."),
    ("atletismo",    "Atletismo",       "fisico",       "Nadar, escalar, saltar e correr."),
    ("acrobacia",    "Acrobacia",       "fisico",       "Manobras complexas no corpo."),
    ("prestidigitacao","Prestidigitação","fisico",      "Truques de mão e manipulação furtiva."),
    # exploracao
    ("percepcao",    "Percepção",       "exploracao",   "Notar detalhes no ambiente."),
    ("sobrevivencia","Sobrevivência",   "exploracao",   "Rastrear, navegar e sobreviver na natureza."),
    ("investigacao", "Investigação",    "exploracao",   "Buscar pistas e analisar cenas."),
    ("medicina",     "Medicina",        "exploracao",   "Estabilizar ferimentos e diagnosticar."),
    ("natureza",     "Natureza",        "exploracao",   "Conhecer flora, fauna e clima."),
    ("lidar_animais","Lidar c/ Animais","exploracao",   "Acalmar, treinar e controlar animais."),
    ("percepcao_magica","Percepção Mágica","exploracao","Detectar e identificar magia."),
    ("navegacao",    "Navegação",       "exploracao",   "Orientar-se em terra ou mar."),
    # conhecimento
    ("historia",     "História",        "conhecimento", "Eventos passados e civilizações."),
    ("religiao",     "Religião",        "conhecimento", "Divindades, cultos e rituais."),
    ("arcana",       "Arcana",          "conhecimento", "Magia, runas e planos."),
    ("engenharia",   "Engenharia",      "conhecimento", "Construção, armadilhas e máquinas."),
    ("herbalismo",   "Herbalismo",      "conhecimento", "Ervas, poções e venenos naturais."),
    ("ocultismo",    "Ocultismo",       "conhecimento", "Segredos ocultos e entidades."),
    ("tatica",       "Tática",          "conhecimento", "Estratégia de combate e manobras."),
    # arcana
    ("magia",        "Magia",           "arcana",       "Conjurar e controlar magia arcana."),
    ("fe",           "Fé",              "arcana",       "Canalizar poder divino."),
    ("psionica",     "Psiônica",        "arcana",       "Poderes mentais e telepatia."),
    ("alquimia",     "Alquimia",        "arcana",       "Transformar substâncias e criar reagentes."),
    ("runas",        "Runas",           "arcana",       "Inscrever e ativar runas."),
    ("invocacao",    "Invocação",       "arcana",       "Invocar e controlar entidades."),
    # social
    ("persuasao",    "Persuasão",       "social",       "Convencer pelo argumento ou apelo emocional."),
    ("enganacao",    "Enganação",       "social",       "Mentir, disfarçar e iludir."),
    ("intimidacao",  "Intimidação",     "social",       "Coagir pelo medo."),
    ("intuicao",     "Intuição",        "social",       "Perceber intenções e emoções."),
    ("performances", "Performances",    "social",       "Atuar, cantar, dançar."),
    ("lideranca",    "Liderança",       "social",       "Inspirar e comandar aliados."),
]

# (slug, nome, categoria)
PROFS = [
    ("armas_simples",   "Armas Simples",          "combat"),
    ("armas_marciais",  "Armas Marciais",          "combat"),
    ("armas_exoticas",  "Armas Exóticas",          "combat"),
    ("armadura_leve",   "Armadura Leve",           "combat"),
    ("armadura_media",  "Armadura Média",          "combat"),
    ("armadura_pesada", "Armadura Pesada",         "combat"),
    ("escudos",         "Escudos",                 "combat"),
    ("veiculos_terra",  "Veículos Terrestres",     "vehicle"),
    ("veiculos_aquaticos","Veículos Aquáticos",    "vehicle"),
    ("ferramentas_ladrao","Ferramentas de Ladrão", "ferramenta"),
    ("kit_herbalismo",  "Kit de Herbalismo",       "ferramenta"),
    ("kit_medico",      "Kit Médico",              "ferramenta"),
    ("instrumentos_musicais","Instrumentos Musicais","ferramenta"),
    ("ferramentas_artesao","Ferramentas de Artesão","ferramenta"),
    ("kit_venenos",     "Kit de Venenos",          "ferramenta"),
]

# (slug, nome, tipo_visao, bonus_pv, bonus_pm, bonus_pe, velocidade_base, bonus_habilidades_json, flags_json, descricao)
ESPECIES = [
    ("humano",    "Humano",        "normal",    0,  0,  0, 9, '{}',                              '{"versatil": true}',          "Versáteis e adaptáveis."),
    ("anao",      "Anão",          "normal",    2,  0,  0, 7, '{"fortitude": 1}',                '{"resistencia_veneno": true}', "Robustos e obstinados."),
    ("elfo",      "Elfo",          "noturna",   0,  2,  0, 9, '{"percepcao": 1}',                '{"imune_sono_magico": true}',  "Graciosos e longevos."),
    ("meio_elfo", "Meio-Elfo",     "noturna",   0,  1,  1, 9, '{"carisma": 1}',                  '{}',                          "União de dois mundos."),
    ("halfling",  "Halfling",      "normal",    0,  0,  1, 7, '{"destreza": 1}',                 '{"sortudo": true}',           "Pequenos e ágeis."),
    ("tiefling",  "Tiefling",      "escuridao", 0,  2,  0, 9, '{"carisma": 1, "arcana": 1}',    '{"resistencia_fogo": true}',  "Descendentes infernais."),
    ("draconato", "Draconato",     "normal",    1,  0,  1, 9, '{"forca": 1, "carisma": 1}',     '{}',                          "Herdeiros dos dragões."),
    ("orc",       "Orc",           "noturna",   3,  0,  0, 9, '{"forca": 2}',                   '{"agressividade": true}',     "Guerreiros ferozes."),
    ("gnomo",     "Gnomo",         "noturna",   0,  2,  0, 7, '{"inteligencia": 1, "arcana": 1}','{}',                          "Curiosos e inventivos."),
    ("goblin",    "Goblin",        "noturna",   0,  0,  2, 7, '{"destreza": 1, "furtividade": 1}','{}',                         "Ágeis e oportunistas."),
    ("sirenio",   "Sirênio",       "aquatica",  0,  1,  1, 9, '{"percepcao": 1}',               '{"respirar_agua": true}',     "Criaturas aquáticas."),
    ("espectro",  "Espectro",      "escuridao", 0,  3,  0, 9, '{"magia": 1}',                   '{"incorpóreo": true}',        "Seres etéreos."),
    ("besta_menor","Besta Menor",  "normal",    2,  0,  1, 9, '{"forca": 1}',                   '{"sentidos_aguçados": true}', "Descendentes animalescos."),
    ("constructo","Constructo",    "normal",    2,  0,  2, 9, '{"fortitude": 2}',               '{"imune_veneno": true, "imune_doenca": true}', "Ser construído."),
]

# (slug, especie_slug, nome, bonus_habilidades_json, flags_json, descricao)
SUBESPECIES = [
    ("humano_nobre",     "humano",    "Nobre",          '{"carisma": 1, "persuasao": 1}',    '{}', "Criado na nobreza."),
    ("humano_plebeu",    "humano",    "Plebeu",          '{"fortitude": 1}',                 '{"trabalhador": true}', "Vida simples."),
    ("anao_montanha",    "anao",      "Anão das Montanhas",'{"fortitude": 1}',               '{}', "Mineiros e ferreiros."),
    ("anao_colina",      "anao",      "Anão das Colinas", '{"sabedoria": 1}',                '{}', "Sábios do clã."),
    ("elfo_alto",        "elfo",      "Elfo Alto",        '{"inteligencia": 1}',             '{}', "Magistas élficos."),
    ("elfo_silvano",     "elfo",      "Elfo Silvano",     '{"destreza": 1}',                 '{"velocidade": 1}', "Ágeis exploradores."),
    ("tiefling_asmodeus","tiefling",  "Tiefling de Asmodeus",'{"inteligencia": 1}',          '{}', "Linhagem do Lorde do Inferno."),
    ("tiefling_zariel",  "tiefling",  "Tiefling de Zariel",'{"forca": 1}',                  '{}', "Linhagem guerreira."),
    ("draconato_vermelho","draconato","Draconato Vermelho",'{"forca": 1}',                   '{"sopro_fogo": true}', "Sopro de fogo."),
    ("draconato_azul",   "draconato", "Draconato Azul",   '{"inteligencia": 1}',             '{"sopro_raio": true}', "Sopro de relâmpago."),
    ("gnomo_floresta",   "gnomo",     "Gnomo da Floresta",'{"destreza": 1}',                 '{"falar_animais": true}', "Encantadores naturais."),
    ("gnomo_pedra",      "gnomo",     "Gnomo das Pedras", '{"fortitude": 1}',                '{}', "Mestres artesãos."),
    ("orc_cinza",        "orc",       "Orc Cinzento",     '{"inteligencia": 1}',             '{}', "Orcs mais refinados."),
    ("halfling_pezudo",  "halfling",  "Halfling Pezudo",  '{"forca": 1}',                   '{"sortudo": true}', "Robusto e baixinho."),
    ("goblin_aranh",     "goblin",    "Goblin-Aranha",    '{"furtividade": 2}',              '{"trepar": true}', "Escalam paredes."),
]


def _flags(**kw):
    return json.dumps({k: v for k, v in kw.items() if v is not None})


# Condições v2: (slug, nome, categoria, cor, dano_rec, niveis, descricao, flags_json)
def _build_condicoes():
    rows = []

    def c(slug, nome, categoria, cor, descricao, dano_rec=None, niveis=1, **flags):
        rows.append((slug, nome, categoria, cor, dano_rec, niveis, descricao, _flags(**flags)))

    # Debilitação Física
    c("atordoado",    "Atordoado",    "debilitacao_fisica",  "#B22222",
      "Perde a ação e não pode reagir.", incapacita_acoes=True, perde_reacao=True)
    c("derrubado",    "Derrubado",    "debilitacao_fisica",  "#8B4513",
      "Ataques corpo-a-corpo têm vantagem contra o alvo.", desvantagem_defesa_corpo=True)
    c("incapacitado", "Incapacitado", "debilitacao_fisica",  "#8B0000",
      "Não pode tomar ações nem reações.", incapacita_acoes=True, perde_reacao=True)
    c("paralisado",   "Paralisado",   "debilitacao_fisica",  "#4B0082",
      "Não pode se mover, agir nem reagir.", incapacita_acoes=True, perde_reacao=True, sem_movimento=True)
    c("beira_morte",  "Beira da Morte","debilitacao_fisica", "#1A1A1A",
      "Incapacitado. Falha em 2+ salvamentos = morte.", incapacita_acoes=True, salvamentos_morte=True)
    c("agarrado",     "Agarrado",     "debilitacao_fisica",  "#A0522D",
      "Velocidade cai a 0.", velocidade_zero=True)
    c("contido",      "Contido",      "debilitacao_fisica",  "#6B3A2A",
      "Velocidade 0 e desvantagem em ataques.", velocidade_zero=True, desvantagem_ataques=True)

    # Controle & Incapacitação
    c("enfeiticado",  "Enfeitiçado",  "controle",            "#DA70D6",
      "Não pode atacar o encantador; vantagem em interações sociais com ele.")
    c("dominado",     "Dominado",     "controle",            "#9400D3",
      "Age conforme as ordens do dominador.", incapacita_acoes=True)
    c("petrificado",  "Petrificado",  "controle",            "#708090",
      "Transformado em pedra. Imune a dano e efeitos.", incapacita_acoes=True, imune_dano=True)

    # Dano Contínuo
    c("envenenado",   "Envenenado",   "dano_continuo",       "#228B22",
      "Desvantagem em testes de ataque e habilidade.", dano_rec="1d4 veneno", desvantagem_ataques=True)
    c("sangrando",    "Sangrando",    "dano_continuo",       "#DC143C",
      "Perde PV por turno até estabilizar.", dano_rec="1d4 fisico")

    for i in (1, 2, 3):
        c(f"queimando_{i}", f"Queimando {i}", "dano_continuo", "#FF4500",
          f"Nível {i} de queimadura.", niveis=3, dano_rec=f"{i}d4 fogo", empilhavel=True, max_niveis=3)

    for i in (1, 2, 3):
        c(f"congelando_{i}", f"Congelando {i}", "dano_continuo", "#4682B4",
          f"Nível {i} de congelamento. Velocidade reduzida.", niveis=3,
          dano_rec=f"{i}d4 frio", reduz_velocidade=True, empilhavel=True, max_niveis=3)

    # Mental & Sensorial
    c("amedrontado",  "Amedrontado",  "mental_sensorial",    "#8A2BE2",
      "Desvantagem em testes perto da fonte do medo.", desvantagem_perto_fonte=True)
    c("cego",         "Cego",         "mental_sensorial",    "#2F4F4F",
      "Não pode ver. Desvantagem em ataques, ataques contra têm vantagem.",
      desvantagem_ataques=True, vantagem_contra=True)
    c("surdo",        "Surdo",        "mental_sensorial",    "#556B2F",
      "Não pode ouvir. Falha automática em testes auditivos.")
    c("confuso",      "Confuso",      "mental_sensorial",    "#9932CC",
      "Ações aleatórias no turno.", acoes_aleatorias=True)

    # Ambiental
    c("sufocando",    "Sufocando",    "ambiental",           "#483D8B",
      "Perderá consciência sem oxigênio.", dano_rec="1d6 fisico")

    # Proteção & Bônus
    c("abencoado",    "Abençoado",    "protecao_bonus",      "#DAA520",
      "Bônus de +1d4 em ataques e salvamentos.", bonus_d4_ataques=True)
    c("inspirado",    "Inspirado",    "protecao_bonus",      "#FFD700",
      "Pode rolar dado bônus em habilidade.", dado_bonus_habilidade=True)

    # Cansaço (6 níveis)
    penalidades = [
        "Desvantagem em testes de habilidade.",
        "Velocidade reduzida pela metade.",
        "Desvantagem em ataques e salvamentos.",
        "Pontos de vida máximos reduzidos pela metade.",
        "Velocidade reduzida a 0.",
        "Morte.",
    ]
    for i in range(1, 7):
        c(f"cansado_{i}", f"Cansado {i}", "debilitacao_fisica", "#9E9E75",
          penalidades[i - 1], niveis=6, empilhavel=True, max_niveis=6, nivel_cansaco=i)

    return rows


CONDICOES = _build_condicoes()

# ---- Itens ----
# (slug, nome, categoria, subcategoria, descricao, propriedades_json)
ARMAS_SIMPLES = [
    ("adaga",         "Adaga",         "arma", "arma_simples", "Lâmina leve e rápida.",
     '{"dano":"1d4","tipoDano":"perfurante","alcance":1,"propriedades":["leve","acuidade","arremesso"]}'),
    ("cajado",        "Cajado",        "arma", "arma_simples", "Bastão mágico versátil.",
     '{"dano":"1d6","tipoDano":"contundente","alcance":1,"propriedades":["versatil"]}'),
    ("clava",         "Clava",         "arma", "arma_simples", "Arma primitiva contundente.",
     '{"dano":"1d4","tipoDano":"contundente","alcance":1,"propriedades":["leve"]}'),
    ("lanca",         "Lança",         "arma", "arma_simples", "Haste versátil de arremesso.",
     '{"dano":"1d6","tipoDano":"perfurante","alcance":1,"propriedades":["arremesso","versatil"]}'),
    ("funda",         "Funda",         "arma", "arma_simples", "Arma de arremesso simples.",
     '{"dano":"1d4","tipoDano":"contundente","alcance":9,"propriedades":["distancia"]}'),
    ("machadinha",    "Machadinha",    "arma", "arma_simples", "Machado leve de arremesso.",
     '{"dano":"1d6","tipoDano":"cortante","alcance":1,"propriedades":["leve","arremesso"]}'),
    ("bordao",        "Bordão",        "arma", "arma_simples", "Longo bastão de madeira.",
     '{"dano":"1d6","tipoDano":"contundente","alcance":1,"propriedades":["versatil"]}'),
    ("foice_curta",   "Foice Curta",   "arma", "arma_simples", "Lâmina curva leve.",
     '{"dano":"1d4","tipoDano":"cortante","alcance":1,"propriedades":["leve"]}'),
    ("azagaia",       "Azagaia",       "arma", "arma_simples", "Dardo de madeira.",
     '{"dano":"1d6","tipoDano":"perfurante","alcance":6,"propriedades":["arremesso"]}'),
    ("arco_curto",    "Arco Curto",    "arma", "arma_simples", "Arco de curto alcance.",
     '{"dano":"1d6","tipoDano":"perfurante","alcance":16,"propriedades":["distancia","duas_maos"]}'),
]

ARMAS_MARCIAIS = [
    ("espada_longa",  "Espada Longa",  "arma", "arma_marcial", "Espada versátil padrão.",
     '{"dano":"1d8","tipoDano":"cortante","alcance":1,"propriedades":["versatil"]}'),
    ("espada_grande", "Espada Grande", "arma", "arma_marcial", "Espada enorme de duas mãos.",
     '{"dano":"2d6","tipoDano":"cortante","alcance":1,"propriedades":["pesada","duas_maos"]}'),
    ("machado_batalha","Machado de Batalha","arma","arma_marcial","Machado versátil de guerra.",
     '{"dano":"1d8","tipoDano":"cortante","alcance":1,"propriedades":["versatil"]}'),
    ("machado_grande", "Machado Grande","arma","arma_marcial","Machado imenso.",
     '{"dano":"1d12","tipoDano":"cortante","alcance":1,"propriedades":["pesada","duas_maos"]}'),
    ("alabarda",      "Alabarda",      "arma", "arma_marcial", "Haste com lâmina.",
     '{"dano":"1d10","tipoDano":"cortante","alcance":2,"propriedades":["pesada","alcance","duas_maos"]}'),
    ("lanca_guerra",  "Lança de Guerra","arma","arma_marcial", "Lança robusta de cavalaria.",
     '{"dano":"1d10","tipoDano":"perfurante","alcance":2,"propriedades":["alcance"]}'),
    ("mangual",       "Mangual",       "arma", "arma_marcial", "Corrente com bola cravejada.",
     '{"dano":"1d8","tipoDano":"contundente","alcance":1,"propriedades":[]}'),
    ("martelo_guerra","Martelo de Guerra","arma","arma_marcial","Martelo versátil.",
     '{"dano":"1d8","tipoDano":"contundente","alcance":1,"propriedades":["versatil"]}'),
    ("tridente",      "Tridente",      "arma", "arma_marcial", "Três pontas ameaçadoras.",
     '{"dano":"1d6","tipoDano":"perfurante","alcance":1,"propriedades":["arremesso","versatil"]}'),
    ("rapieira",      "Rapieira",      "arma", "arma_marcial", "Lâmina de esgrima precisa.",
     '{"dano":"1d8","tipoDano":"perfurante","alcance":1,"propriedades":["acuidade","finura"]}'),
    ("cimitarra",     "Cimitarra",     "arma", "arma_marcial", "Lâmina curva leve.",
     '{"dano":"1d6","tipoDano":"cortante","alcance":1,"propriedades":["leve","acuidade"]}'),
    ("arco_longo",    "Arco Longo",    "arma", "arma_marcial", "Arco de longo alcance.",
     '{"dano":"1d8","tipoDano":"perfurante","alcance":30,"propriedades":["distancia","duas_maos"]}'),
    ("besta_leve",    "Besta Leve",    "arma", "arma_marcial", "Besta compacta.",
     '{"dano":"1d8","tipoDano":"perfurante","alcance":16,"propriedades":["distancia","carregamento"]}'),
    ("besta_pesada",  "Besta Pesada",  "arma", "arma_marcial", "Besta de alto dano.",
     '{"dano":"1d10","tipoDano":"perfurante","alcance":20,"propriedades":["distancia","pesada","carregamento","duas_maos"]}'),
    ("sabre",         "Sabre",         "arma", "arma_marcial", "Lâmina curva de cavalaria.",
     '{"dano":"1d6","tipoDano":"cortante","alcance":1,"propriedades":["leve","acuidade"]}'),
    ("picareta_guerra","Picareta de Guerra","arma","arma_marcial","Pico penetrante.",
     '{"dano":"1d8","tipoDano":"perfurante","alcance":1,"propriedades":[]}'),
    ("lança_tormenta","Lança da Tormenta","arma","arma_marcial","Lança imbuída de magia.",
     '{"dano":"1d8","tipoDano":"perfurante","alcance":1,"propriedades":["magica","versatil"]}'),
]

ARMADURAS = [
    ("couro",          "Armadura de Couro",     "armadura","armadura_leve",  "Couro simples.",
     '{"defesa":1,"iniciativa":0,"pesoTipo":"leve","requisito_forca":0}'),
    ("couro_batido",   "Couro Batido",          "armadura","armadura_leve",  "Couro reforçado.",
     '{"defesa":2,"iniciativa":0,"pesoTipo":"leve","requisito_forca":0}'),
    ("armadura_ossos", "Armadura de Ossos",     "armadura","armadura_leve",  "Ossos costurados.",
     '{"defesa":2,"iniciativa":-1,"pesoTipo":"leve","requisito_forca":0}'),
    ("cota_malha",     "Cota de Malha",         "armadura","armadura_media", "Anéis entrelacados.",
     '{"defesa":4,"iniciativa":-1,"pesoTipo":"media","requisito_forca":0}'),
    ("cota_escamas",   "Cota de Escamas",       "armadura","armadura_media", "Escamas sobrepostas.",
     '{"defesa":4,"iniciativa":-1,"pesoTipo":"media","requisito_forca":0}'),
    ("meia_placa",     "Meia Placa",            "armadura","armadura_media", "Placas parciais.",
     '{"defesa":5,"iniciativa":-2,"pesoTipo":"media","requisito_forca":13}'),
    ("placa_completa", "Placa Completa",        "armadura","armadura_pesada","Armadura total.",
     '{"defesa":8,"iniciativa":-3,"pesoTipo":"pesada","requisito_forca":15}'),
    ("placa_batalha",  "Placa de Batalha",      "armadura","armadura_pesada","Placa reforçada.",
     '{"defesa":9,"iniciativa":-3,"pesoTipo":"pesada","requisito_forca":17}'),
    ("escudo_leve",    "Escudo Leve",           "armadura","escudo",         "Escudo pequeno.",
     '{"defesa":1,"pesoTipo":"escudo"}'),
    ("escudo_medio",   "Escudo Médio",          "armadura","escudo",         "Escudo padrão.",
     '{"defesa":2,"pesoTipo":"escudo"}'),
    ("escudo_pesado",  "Escudo Pesado",         "armadura","escudo",         "Escudo de torre.",
     '{"defesa":3,"pesoTipo":"escudo","penalidade_furtividade":true}'),
    ("escudo_rodela",  "Escudo Rodela",         "armadura","escudo",         "Escudo circular leve.",
     '{"defesa":1,"pesoTipo":"escudo"}'),
    ("capuz_ferro",    "Capuz de Ferro",        "armadura","armadura_media", "Proteção para a cabeça.",
     '{"defesa":2,"iniciativa":0,"pesoTipo":"media","requisito_forca":0,"slot":"cabeca"}'),
]

ITENS_GERAIS = [
    ("corda_seda",   "Corda de Seda",  "equipamento","geral","15 metros de corda de seda.",  '{"peso":1}'),
    ("lanterna",     "Lanterna",       "equipamento","geral","Ilumina 9m por 6 horas.",       '{"peso":1}'),
    ("kit_escalada", "Kit de Escalada","equipamento","geral","Ganchos e corda para escalar.", '{"peso":5}'),
    ("bau_pequeno",  "Baú Pequeno",    "equipamento","geral","Armazena até 30kg.",            '{"peso":10,"capacidade":30}'),
    ("bolsa",        "Bolsa",          "equipamento","geral","Bolsa de couro padrão.",        '{"peso":0.5,"capacidade":5}'),
    ("pocao_cura_menor","Poção de Cura Menor","consumivel","pocao","Cura 2d4+2 PV.",         '{"cura":"2d4+2","usos":1}'),
    ("pocao_cura",   "Poção de Cura",  "consumivel","pocao","Cura 4d4+4 PV.",                '{"cura":"4d4+4","usos":1}'),
    ("torch",        "Tocha",          "equipamento","geral","Ilumina 6m por 1 hora.",        '{"peso":0.5}'),
]

# ---- Abilities ----
# (slug, nome, tipo, custo_json, efeito_json, escalamento_json, descricao, requer_magia, regra_versao)
ABILITIES = [
    # passivas de combate
    ("ataque_extra",        "Ataque Extra",         "passiva",
     '{}', '{"ataques_por_acao":2}', '{}',
     "Pode atacar duas vezes por ação de ataque.", False, "0.5"),
    ("combate_defensivo",   "Combate Defensivo",    "passiva",
     '{}', '{"bonus_defesa":2}', '{}',
     "+2 Defesa enquanto empunha arma.", False, "0.5"),
    ("furia",               "Fúria",                "acao",
     '{"pe":1}', '{"bonus_dano":2,"resistencia_fisico":true}', '{"nivel":{"bonus_dano":"+1a cada 3 niveis"}}',
     "Entra em fúria: +2 dano e resistência física por 1 minuto.", False, "0.5"),

    # milagres de cura
    ("curar_ferimentos",    "Curar Ferimentos",     "acao",
     '{"pm":2}', '{"cura":"2d8+fe"}', '{"nivel":{"cura":"+1d8 a cada 2 niveis"}}',
     "Cura 2d8 + modificador de Fé em PV.", True, "0.5"),
    ("luz_sagrada",         "Luz Sagrada",          "acao",
     '{"pm":1}', '{"dano":"1d8+fe","tipo_dano":"radiante","alcance":9}', '{}',
     "Raio de luz divina (1d8+Fé, radiante, 9m).", True, "0.5"),
    ("abencoa_arma",        "Abençoar Arma",        "acao_bonus",
     '{"pm":2}', '{"bonus_ataque":"1d4","duracao_turnos":10}', '{}',
     "A arma ganha +1d4 em jogadas de ataque por 1 minuto.", True, "0.5"),

    # magias arcanas
    ("missil_magico",       "Míssil Mágico",        "acao",
     '{"pm":1}', '{"dano":"3d4+3","tipo_dano":"forca","alcance":36}',
     '{"slot":{"dano":"+1d4+1 por slot extra"}}',
     "Três dardos de força (1d4+1 cada, alcance 36m).", True, "0.5"),
    ("bola_de_fogo",        "Bola de Fogo",         "acao",
     '{"pm":3}', '{"dano":"8d6","tipo_dano":"fogo","alcance":30,"raio":6,"salvamento":{"habilidade":"agilidade","cd":8,"dano_reduzido":"metade"}}',
     '{"slot":{"dano":"+1d6 por slot extra"}}',
     "Explosão de 6m de raio (8d6 fogo, CD Agilidade).", True, "0.5"),
    ("escudo_arcano",       "Escudo Arcano",        "reacao",
     '{"pm":1}', '{"bonus_defesa":5}', '{}',
     "+5 Defesa como reação até o próximo turno.", True, "0.5"),

    # mecânicas de descanso
    ("descanso_curto",      "Descanso Curto",       "especial",
     '{}', '{"recupera_pe":"total","recupera_pv_percent":25}', '{}',
     "1 hora de descanso leve. Recupera toda PE e 25% PV.", False, "0.5"),
    ("descanso_longo",      "Descanso Longo",       "especial",
     '{}', '{"recupera_pe":"total","recupera_pv":"total","recupera_pm_percent":50,"reduz_cansaco":1}', '{}',
     "8 horas de descanso. Recupera PV, PE totais, 50% PM e reduz 1 nível de cansaço.", False, "0.5"),
    ("descanso_pleno",      "Descanso Pleno",       "especial",
     '{}', '{"recupera_pe":"total","recupera_pv":"total","recupera_pm":"total","reduz_cansaco":2}', '{}',
     "24h de repouso total. Recupera tudo e reduz 2 níveis de cansaço.", False, "0.5"),

    # habilidades de classe
    ("segundo_folego",      "Segundo Fôlego",       "acao_bonus",
     '{}', '{"cura_pv":"1d10+nivel"}', '{}',
     "Recupera 1d10+nível PV como ação bônus (1/descanso curto).", False, "0.5"),
    ("surto_de_acao",       "Surto de Ação",        "especial",
     '{}', '{"acoes_bonus":1}', '{}',
     "Ganha 1 ação adicional neste turno (1/descanso curto).", False, "0.5"),
    ("furtada",             "Furtada",              "acao_bonus",
     '{}', '{"dano_extra":"1d6","tipo":"preciso","escala_nivel":true}', '{"nivel":{"dano_extra":"+1d6 a cada 2 niveis"}}',
     "Dano extra 1d6 em ataque com vantagem ou aliado adjacente.", False, "0.5"),
]

# ---- Classes ----
# (slug, nome, tipo, descricao, habilidade_classe_json)
CLASSES = [
    # Aprendiz
    ("combatente_aprendiz",  "Combatente Aprendiz",  "aprendiz",
     "Fundamentos do combate corpo-a-corpo e à distância.",
     '{"proficiencias":["armas_simples","armas_marciais","armadura_leve","armadura_media","escudos"],"habilidades_ganhas":["segundo_folego"]}'),
    ("novico_aprendiz",      "Noviço Aprendiz",      "aprendiz",
     "Primeiros passos na magia divina.",
     '{"proficiencias":["armas_simples","armadura_leve"],"habilidades_ganhas":["curar_ferimentos"]}'),
    ("arcanista_aprendiz",   "Arcanista Aprendiz",   "aprendiz",
     "Estudo inicial das artes arcanas.",
     '{"proficiencias":["adaga","cajado"],"habilidades_ganhas":["missil_magico"]}'),
    ("patrulheiro_aprendiz", "Patrulheiro Aprendiz", "aprendiz",
     "Habilidades de exploração e sobrevivência.",
     '{"proficiencias":["armas_simples","armas_marciais","armadura_leve","armadura_media"],"habilidades_ganhas":[]}'),
    ("furtivo_aprendiz",     "Furtivo Aprendiz",     "aprendiz",
     "Técnicas de furtividade e subterfúgio.",
     '{"proficiencias":["armas_simples","ferramentas_ladrao","armadura_leve"],"habilidades_ganhas":["furtada"]}'),
    ("socialista_aprendiz",  "Socialista Aprendiz",  "aprendiz",
     "Artes da persuasão e manipulação social.",
     '{"proficiencias":["armas_simples","armadura_leve"],"habilidades_ganhas":[]}'),
    ("psiquico_aprendiz",    "Psíquico Aprendiz",    "aprendiz",
     "Despertar dos poderes mentais.",
     '{"proficiencias":["armas_simples"],"habilidades_ganhas":[]}'),

    # Primárias
    ("combatente",   "Combatente",   "primaria",
     "Mestre das armas e do combate.",
     '{"proficiencias":["armas_exoticas","armadura_pesada"],"habilidades_ganhas":["ataque_extra","surto_de_acao"]}'),
    ("novico",       "Noviço",       "primaria",
     "Canal da graça divina.",
     '{"proficiencias":["armadura_media","escudos"],"habilidades_ganhas":["luz_sagrada","abencoa_arma"]}'),
    ("arcanista",    "Arcanista",    "primaria",
     "Dominador das energias arcanas.",
     '{"proficiencias":[],"habilidades_ganhas":["bola_de_fogo","escudo_arcano"]}'),
    ("patrulheiro",  "Patrulheiro",  "primaria",
     "Explorador e caçador habilidoso.",
     '{"proficiencias":["armas_marciais","armadura_pesada"],"habilidades_ganhas":[]}'),

    # Especializações
    ("guerreiro",      "Guerreiro",      "especializacao",
     "Especialista em combate frontal.",
     '{"habilidades_ganhas":["furia","combate_defensivo"]}'),
    ("paladino",       "Paladino",       "especializacao",
     "Guerreiro sagrado.",
     '{"habilidades_ganhas":["luz_sagrada","combate_defensivo"]}'),
    ("ladino",         "Ladino",         "especializacao",
     "Mestre das sombras e da astúcia.",
     '{"habilidades_ganhas":["furtada"]}'),
    ("mago",           "Mago",           "especializacao",
     "Estudioso da magia arcana.",
     '{"habilidades_ganhas":["missil_magico","bola_de_fogo"]}'),
    ("clerigo",        "Clérigo",        "especializacao",
     "Sacerdote e curador.",
     '{"habilidades_ganhas":["curar_ferimentos","abencoa_arma"]}'),
    ("bardo",          "Bardo",          "especializacao",
     "Artista e manipulador social.",
     '{"habilidades_ganhas":[]}'),
    ("druida",         "Druida",         "especializacao",
     "Guardião da natureza.",
     '{"habilidades_ganhas":[]}'),
]

# ---- Regalias de Aprendiz ----
# (slug, nome, classe_slug, bonus_por_regalia_json, bonus_habs_json, escolhas_json, descricao)
REGALIAS_APRENDIZ = [
    ("regalia_combatente_apr", "Regalia de Combatente Aprendiz", "combatente_aprendiz",
     '{"pv":2}', '{}',
     '{"escolha_1":{"tipo":"habilidade","opcoes":["forca","destreza","fortitude"]}}',
     "Cada regalia concede +2 PV."),
    ("regalia_novico_apr",     "Regalia de Noviço Aprendiz",     "novico_aprendiz",
     '{"pm":2}', '{"fe":1}',
     '{"escolha_1":{"tipo":"habilidade","opcoes":["fe","sabedoria","percepcao"]}}',
     "Cada regalia concede +2 PM e +1 Fé."),
    ("regalia_arcanista_apr",  "Regalia de Arcanista Aprendiz",  "arcanista_aprendiz",
     '{"pm":2}', '{"arcana":1}',
     '{"escolha_1":{"tipo":"habilidade","opcoes":["magia","inteligencia","arcana"]}}',
     "Cada regalia concede +2 PM e +1 Arcana."),
    ("regalia_patrulheiro_apr","Regalia de Patrulheiro Aprendiz","patrulheiro_aprendiz",
     '{"pe":2}', '{}',
     '{"escolha_1":{"tipo":"habilidade","opcoes":["percepcao","sobrevivencia","natureza"]}}',
     "Cada regalia concede +2 PE."),
    ("regalia_furtivo_apr",    "Regalia de Furtivo Aprendiz",    "furtivo_aprendiz",
     '{"pe":1}', '{"furtividade":1}',
     '{"escolha_1":{"tipo":"habilidade","opcoes":["furtividade","destreza","enganacao"]}}',
     "Cada regalia concede +1 PE e +1 Furtividade."),
    ("regalia_socialista_apr", "Regalia de Socialista Aprendiz", "socialista_aprendiz",
     '{}', '{"carisma":1}',
     '{"escolha_1":{"tipo":"habilidade","opcoes":["carisma","persuasao","intuicao"]}}',
     "Cada regalia concede +1 Carisma."),
    ("regalia_psiquico_apr",   "Regalia de Psíquico Aprendiz",   "psiquico_aprendiz",
     '{"pm":1}', '{"psionica":1}',
     '{}',
     "Cada regalia concede +1 PM e +1 Psiônica."),
]

# ---- Árvores de Regalia ----
# (slug_arvore, nome_arvore, classe_slug, descricao, niveis)
# niveis = lista de (slug_nivel, nome, custo, requer_nivel, efeito_json, prereq_json)

def _arvores():
    return [
        # COMBATENTE
        ("arvore_guerreiro_combate",  "Especialização em Combate",  "guerreiro",
         "Aumenta a eficácia em combate direto.",
         [
             ("combate_nivel_1", "Golpe Poderoso",        1, 1, '{"bonus_dano":2}',              '{}'),
             ("combate_nivel_2", "Ataque Implacável",     2, 3, '{"ataques_critico_extra":1}',   '{"requer":"combate_nivel_1"}'),
             ("combate_nivel_3", "Maestria das Armas",    3, 5, '{"bonus_ataque":2,"bonus_dano":2}','{"requer":"combate_nivel_2"}'),
         ]),
        ("arvore_guerreiro_defesa",   "Fortaleza do Guerreiro",     "guerreiro",
         "Aumenta a resistência e a capacidade defensiva.",
         [
             ("defesa_nivel_1", "Pele Grossa",            1, 1, '{"bonus_pv":5}',                '{}'),
             ("defesa_nivel_2", "Determinação",           2, 3, '{"bonus_pv":10,"recupera_pv_descanso_curto":"1d10"}','{"requer":"defesa_nivel_1"}'),
             ("defesa_nivel_3", "Inabalável",             3, 5, '{"resistencia_dano_fisico":true,"bonus_pv":5}','{"requer":"defesa_nivel_2"}'),
         ]),
        ("arvore_guerreiro_maestria", "Maestria Marcial",           "guerreiro",
         "Técnicas avançadas de esgrima e combate.",
         [
             ("maestria_nivel_1", "Estilo de Luta",       1, 1, '{"escolha_estilo":true}',       '{}'),
             ("maestria_nivel_2", "Manobra Especial",     2, 3, '{"manobras":1}',                '{"requer":"maestria_nivel_1"}'),
             ("maestria_nivel_3", "Mestre das Armas",     3, 5, '{"manobras":2,"dado_superioridade":"d10"}','{"requer":"maestria_nivel_2"}'),
         ]),
        # NOVIÇO
        ("arvore_novico_cura",        "Arte da Cura",               "clerigo",
         "Potencializa magias de cura e proteção.",
         [
             ("cura_nivel_1", "Toque Curativo",           1, 1, '{"bonus_cura_pm":2}',           '{}'),
             ("cura_nivel_2", "Cura em Massa",            2, 3, '{"cura_area":true}',            '{"requer":"cura_nivel_1"}'),
             ("cura_nivel_3", "Milagre Divino",           3, 5, '{"reviver_morte":true,"cura_total":true}','{"requer":"cura_nivel_2"}'),
         ]),
        # INICIADO
        ("arvore_arcanista_evocacao", "Evocação Arcana",            "mago",
         "Magias destrutivas potencializadas.",
         [
             ("evocacao_nivel_1", "Poder Elemental",      1, 1, '{"bonus_dano_magia":2}',        '{}'),
             ("evocacao_nivel_2", "Feitiço Empoderado",   2, 3, '{"re_rolar_dano":2}',           '{"requer":"evocacao_nivel_1"}'),
             ("evocacao_nivel_3", "Evocador Supremo",     3, 5, '{"dano_minimo_magia":true}',    '{"requer":"evocacao_nivel_2"}'),
         ]),
        ("arvore_arcanista_abjuracao","Abjuração Arcana",           "mago",
         "Magias de proteção e escudos arcanos.",
         [
             ("abjur_nivel_1", "Escudo Arcano+",          1, 1, '{"bonus_escudo_arcano":2}',     '{}'),
             ("abjur_nivel_2", "Resistência Mágica",      2, 3, '{"vantagem_salvamento_magia":true}','{"requer":"abjur_nivel_1"}'),
             ("abjur_nivel_3", "Proteção Adamantina",     3, 5, '{"imunidade_critico":true}',    '{"requer":"abjur_nivel_2"}'),
         ]),
        # FURTIVO
        ("arvore_ladino_assalto",     "Arte do Assalto",            "ladino",
         "Maximiza dano furtivo.",
         [
             ("assalto_nivel_1", "Emboscada",             1, 1, '{"dado_furtada_bonus":1}',      '{}'),
             ("assalto_nivel_2", "Ataque Cirúrgico",      2, 3, '{"critico_furtada":true}',      '{"requer":"assalto_nivel_1"}'),
             ("assalto_nivel_3", "Executioner",           3, 5, '{"dano_furtada_max":"dobro"}',  '{"requer":"assalto_nivel_2"}'),
         ]),
        # PALADINO
        ("arvore_paladino_sagrado",   "Juramento Sagrado",          "paladino",
         "Fortalece o vínculo divino do paladino.",
         [
             ("sagrado_nivel_1", "Smite Divino",          1, 1, '{"smite_dano":"2d8 radiante"}', '{}'),
             ("sagrado_nivel_2", "Aura de Proteção",      2, 3, '{"aura_bonus_salvamento":true}','{"requer":"sagrado_nivel_1"}'),
             ("sagrado_nivel_3", "Campeão Divino",        3, 5, '{"smite_area":true,"aura_raio":3}','{"requer":"sagrado_nivel_2"}'),
         ]),
    ]

ARVORES = _arvores()

# ---- Profissões (opcional) ----
# (slug, nome, descricao, habilidades_json)
PROFISSOES = [
    ("ferreiro",    "Ferreiro",     "Forja armas e armaduras.",          '["forca","fortitude"]'),
    ("herbalista",  "Herbalista",   "Prepara poções e remédios.",        '["herbalismo","medicina"]'),
    ("mercador",    "Mercador",     "Comércio e negociação.",             '["persuasao","inteligencia"]'),
    ("sabio",       "Sábio",        "Pesquisa e acumulação de conhecimento.",'["historia","arcana"]'),
    ("espiao",      "Espião",       "Coleta de informações e sabotagem.", '["enganacao","furtividade"]'),
]

# ============================================================================
# FUNÇÕES DE SEED v2  (nomes de colunas alinhados com migrate_to_v2.py)
# ============================================================================

def seed_catalog_skills(cur):
    # schema: slug, display_name, categoria, descricao, rule_version
    print(f"  📋 catalog_skills ({len(SKILLS)})...")
    for slug, nome, cat, desc in SKILLS:
        upsert(cur, "catalog_skills", "slug", {
            "slug": slug, "display_name": nome, "categoria": cat,
            "descricao": desc, "rule_version": RULE_VERSION,
        })
    print("     ✅ catalog_skills OK")


def seed_catalog_proficiencias(cur):
    # schema: slug, display_name, categoria, rule_version
    print(f"  📋 catalog_proficiencias ({len(PROFS)})...")
    for slug, nome, cat in PROFS:
        upsert(cur, "catalog_proficiencias", "slug", {
            "slug": slug, "display_name": nome, "categoria": cat,
            "rule_version": RULE_VERSION,
        })
    print("     ✅ catalog_proficiencias OK")


def seed_catalog_especies(cur):
    # catalog_especies:  slug, display_name, pv_base, velocidade_base, descricao, rule_version
    # catalog_subespecies: especie_id, slug, display_name, bonus_habilidades, flags, descricao, rule_version
    #   unique constraint: (especie_id, slug)
    print(f"  📋 catalog_especies ({len(ESPECIES)}) + subespecies ({len(SUBESPECIES)})...")
    for slug, nome, _visao, bpv, _bpm, _bpe, vel, _hab_j, _flags_j, desc in ESPECIES:
        # pv_base = 10 (base universal) + bonus da espécie
        upsert(cur, "catalog_especies", "slug", {
            "slug": slug, "display_name": nome,
            "pv_base": 10 + bpv,
            "velocidade_base": vel,
            "descricao": desc, "rule_version": RULE_VERSION,
        })

    for slug, esp_slug, nome, hab_j, flags_j, desc in SUBESPECIES:
        cur.execute("SELECT id FROM catalog_especies WHERE slug = %s", (esp_slug,))
        row = cur.fetchone()
        if not row:
            print(f"     ⚠ espécie '{esp_slug}' não encontrada para subespécie '{slug}'")
            continue
        # composite unique (especie_id, slug) — usar SQL direto
        cur.execute("""
            INSERT INTO catalog_subespecies
                (especie_id, slug, display_name, bonus_habilidades, flags, descricao, rule_version)
            VALUES (%s, %s, %s, %s::jsonb, %s::jsonb, %s, %s)
            ON CONFLICT (especie_id, slug) DO UPDATE SET
                display_name      = EXCLUDED.display_name,
                bonus_habilidades = EXCLUDED.bonus_habilidades,
                flags             = EXCLUDED.flags,
                descricao         = EXCLUDED.descricao,
                rule_version      = EXCLUDED.rule_version
        """, (row[0], slug, nome, hab_j, flags_j, desc, RULE_VERSION))

    print("     ✅ catalog_especies + subespecies OK")


def seed_catalog_condicoes(cur):
    # schema: slug, display_name, categoria, cor_hex, descricao,
    #         dano_recorrente (JSONB), niveis_total, flags (JSONB), rule_version
    print(f"  📋 catalog_condicoes ({len(CONDICOES)})...")
    for row in CONDICOES:
        slug, nome, cat, cor, dano_rec, niveis, desc, flags_j = row
        dano_rec_json = {"formula": dano_rec} if dano_rec else {}
        upsert(cur, "catalog_condicoes", "slug", {
            "slug": slug, "display_name": nome, "categoria": cat, "cor_hex": cor,
            "descricao": desc,
            "dano_recorrente": dano_rec_json,
            "niveis_total": niveis,
            "flags": json.loads(flags_j),
            "rule_version": RULE_VERSION,
        })
    print("     ✅ catalog_condicoes OK")


def seed_catalog_items(cur):
    # schema: slug, display_name, categoria, subcategoria, descricao,
    #         dano, tipo_dano, alcance_texto, defesa, forca_minima,
    #         propriedades (JSONB array), rule_version
    all_items = ARMAS_SIMPLES + ARMAS_MARCIAIS + ARMADURAS + ITENS_GERAIS
    print(f"  📋 catalog_items ({len(all_items)})...")
    for slug, nome, cat, subcat, desc, props_j in all_items:
        props = json.loads(props_j)
        row_data = {
            "slug": slug, "display_name": nome,
            "categoria": cat, "subcategoria": subcat,
            "descricao": desc, "rule_version": RULE_VERSION,
        }
        if "dano" in props:
            row_data["dano"] = props["dano"]
        td = props.get("tipoDano") or props.get("tipo_dano")
        if td:
            row_data["tipo_dano"] = td
        if "alcance" in props:
            row_data["alcance_texto"] = f"{props['alcance']}m"
        if "defesa" in props:
            row_data["defesa"] = props["defesa"]
        req_forca = props.get("requisito_forca") or props.get("forca_minima")
        if req_forca:
            row_data["forca_minima"] = req_forca
        # propriedades = lista de tags ("leve", "versatil", etc.)
        row_data["propriedades"] = props.get("propriedades", [])
        upsert(cur, "catalog_items", "slug", row_data)
    print("     ✅ catalog_items OK")


def seed_catalog_abilities(cur):
    # schema: slug, display_name, tipo, descricao,
    #         custo_magia (int), custo_estamina (int), custo_pv (int),
    #         efeito (JSONB), escalamento (JSONB), rule_version
    print(f"  📋 catalog_abilities ({len(ABILITIES)})...")
    for slug, nome, tipo, custo_j, efeito_j, esc_j, desc, _req_magia, rv in ABILITIES:
        custo = json.loads(custo_j)
        upsert(cur, "catalog_abilities", "slug", {
            "slug": slug, "display_name": nome, "tipo": tipo,
            "custo_magia":    custo.get("pm", 0),
            "custo_estamina": custo.get("pe", 0),
            "custo_pv":       custo.get("pv", 0),
            "efeito":     json.loads(efeito_j),
            "escalamento": json.loads(esc_j),
            "descricao": desc,
            "rule_version": rv,
        })
    print("     ✅ catalog_abilities OK")


def seed_catalog_classes(cur):
    # schema: slug, display_name, tipo, descricao, habilidade_classe_efeito (JSONB), rule_version
    print(f"  📋 catalog_classes ({len(CLASSES)})...")
    class_id_map = {}
    for slug, nome, tipo, desc, hab_j in CLASSES:
        upsert(cur, "catalog_classes", "slug", {
            "slug": slug, "display_name": nome, "tipo": tipo,
            "habilidade_classe_efeito": json.loads(hab_j),
            "descricao": desc, "rule_version": RULE_VERSION,
        })
        cur.execute("SELECT id FROM catalog_classes WHERE slug = %s", (slug,))
        row = cur.fetchone()
        if row:
            class_id_map[slug] = row[0]
    print("     ✅ catalog_classes OK")
    return class_id_map


def seed_catalog_regalias(cur, class_id_map):
    # catalog_regalias schema: slug, display_name, regalia_tipo, classe_id, custo,
    #   pre_requisitos (JSONB), bonus_por_regalia (JSONB), bonus_habilidades (JSONB),
    #   escolhas_habilidades (JSONB), rule_version
    print(f"  📋 catalog_regalias aprendiz ({len(REGALIAS_APRENDIZ)})...")
    for slug, nome, classe_slug, bonus_j, bonus_habs_j, escolhas_j, desc in REGALIAS_APRENDIZ:
        classe_id = class_id_map.get(classe_slug)
        upsert(cur, "catalog_regalias", "slug", {
            "slug": slug, "display_name": nome, "regalia_tipo": "aprendiz",
            "classe_id": classe_id,
            "custo": 1,
            "pre_requisitos": {},
            "bonus_por_regalia":   json.loads(bonus_j),
            "bonus_habilidades":   json.loads(bonus_habs_j),
            "escolhas_habilidades": json.loads(escolhas_j),
            "descricao": desc, "rule_version": RULE_VERSION,
        })
    print("     ✅ regalias aprendiz OK")

    # catalog_arvores_regalia: slug, display_name, classe_id, rule_version
    # catalog_arvore_niveis:   arvore_id, nivel (int), regalia_id
    #   → cada nível de árvore É uma regalia do tipo 'arvore'
    print(f"  📋 arvores de regalia ({len(ARVORES)})...")
    for slug_arv, nome_arv, classe_slug, _desc_arv, niveis in ARVORES:
        classe_id = class_id_map.get(classe_slug)
        upsert(cur, "catalog_arvores_regalia", "slug", {
            "slug": slug_arv, "display_name": nome_arv,
            "classe_id": classe_id,
            "rule_version": RULE_VERSION,
        })
        cur.execute("SELECT id FROM catalog_arvores_regalia WHERE slug = %s", (slug_arv,))
        arv_row = cur.fetchone()
        if not arv_row:
            continue
        arv_id = arv_row[0]

        for nivel_int, (slug_nv, nome_nv, custo, _req_nivel, efeito_j, prereq_j) in enumerate(niveis, start=1):
            # 1) Garantir que existe uma regalia para este nível
            upsert(cur, "catalog_regalias", "slug", {
                "slug": slug_nv, "display_name": nome_nv, "regalia_tipo": "arvore",
                "classe_id": classe_id,
                "custo": custo,
                "pre_requisitos": json.loads(prereq_j),
                "bonus_recursos":  json.loads(efeito_j),
                "rule_version": RULE_VERSION,
            })
            cur.execute("SELECT id FROM catalog_regalias WHERE slug = %s", (slug_nv,))
            reg_row = cur.fetchone()
            if not reg_row:
                continue
            reg_id = reg_row[0]

            # 2) Linkar no catalog_arvore_niveis (unique: arvore_id, nivel)
            cur.execute("""
                INSERT INTO catalog_arvore_niveis (arvore_id, nivel, regalia_id)
                VALUES (%s, %s, %s)
                ON CONFLICT (arvore_id, nivel) DO UPDATE SET regalia_id = EXCLUDED.regalia_id
            """, (arv_id, nivel_int, reg_id))

    print("     ✅ arvores + níveis OK")


def seed_catalog_profissoes(cur):
    # schema: slug, display_name, descricao, rule_version
    # catalog_profissao_habilidades não tem skill_id — apenas ability_id; pulamos vínculo por enquanto
    print(f"  📋 catalog_profissoes ({len(PROFISSOES)})...")
    for slug, nome, desc, _habs_j in PROFISSOES:
        upsert(cur, "catalog_profissoes", "slug", {
            "slug": slug, "display_name": nome, "descricao": desc,
            "rule_version": RULE_VERSION,
        })
    print("     ✅ catalog_profissoes OK")


# ============================================================================
# TABELAS LEGACY (compatibilidade frontend v1)
# ============================================================================

def seed_legacy_tables(cur):
    """Mantém as tabelas legacy sincronizadas para o frontend v1."""
    print("  📋 legacy: skills...")
    ensure_unique_index(cur, "skills")
    for slug, nome, cat, desc in SKILLS:
        cur.execute("""
            INSERT INTO skills (name, type, description, extra_data)
            VALUES (%s, %s, %s, %s::jsonb)
            ON CONFLICT (name) DO UPDATE SET
                type = EXCLUDED.type,
                description = EXCLUDED.description,
                extra_data = EXCLUDED.extra_data
        """, (nome, cat, desc, json.dumps({"slug": slug})))

    print("  📋 legacy: conditions...")
    ensure_unique_index(cur, "conditions")
    for row in CONDICOES:
        slug, nome, cat, cor, dano_rec, niveis, desc, flags_j = row
        cur.execute("""
            INSERT INTO conditions (name, description, extra_data)
            VALUES (%s, %s, %s::jsonb)
            ON CONFLICT (name) DO UPDATE SET
                description = EXCLUDED.description, extra_data = EXCLUDED.extra_data
        """, (nome, desc, json.dumps({"slug": slug, "categoria": cat, "cor": cor})))

    print("  📋 legacy: items...")
    ensure_unique_index(cur, "items")
    for slug, nome, cat, subcat, desc, props_j in (ARMAS_SIMPLES + ARMAS_MARCIAIS + ARMADURAS + ITENS_GERAIS):
        cur.execute("""
            INSERT INTO items (name, category, description, extra_data)
            VALUES (%s, %s, %s, %s::jsonb)
            ON CONFLICT (name) DO UPDATE SET
                category = EXCLUDED.category,
                description = EXCLUDED.description,
                extra_data = EXCLUDED.extra_data
        """, (nome, subcat, desc, props_j))

    print("     ✅ tabelas legacy OK")


def ensure_unique_index(cur, table, column="name"):
    idx_name = f"uq_{table}_{column}_seed"
    cur.execute(f"""
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM pg_indexes WHERE indexname = '{idx_name}'
            ) THEN
                CREATE UNIQUE INDEX {idx_name} ON {table} ({column});
            END IF;
        END $$;
    """)


def seed_audit_log_table(cur):
    print("  📋 character_audit_log (garantindo existência)...")
    cur.execute("""
        CREATE TABLE IF NOT EXISTS character_audit_log (
            id SERIAL PRIMARY KEY,
            character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            action TEXT NOT NULL,
            before_state JSONB,
            after_state JSONB,
            metadata JSONB DEFAULT '{}'::jsonb,
            created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    """)
    cur.execute("CREATE INDEX IF NOT EXISTS idx_audit_character_id ON character_audit_log(character_id)")
    cur.execute("CREATE INDEX IF NOT EXISTS idx_audit_action ON character_audit_log(action)")
    cur.execute("CREATE INDEX IF NOT EXISTS idx_audit_created_at ON character_audit_log(created_at)")
    print("     ✅ audit_log OK")


# ============================================================================
# MAIN
# ============================================================================

def main():
    print("=" * 60)
    print("  Seed de Catálogos v2 — Lâmina do Oculto v0.5")
    print("=" * 60)

    conn = get_conn()
    cur = conn.cursor()

    try:
        # 1. Catálogos v2
        seed_catalog_skills(cur)
        seed_catalog_proficiencias(cur)
        seed_catalog_especies(cur)          # espécies + subespécies
        seed_catalog_condicoes(cur)
        seed_catalog_items(cur)
        seed_catalog_abilities(cur)
        class_id_map = seed_catalog_classes(cur)
        seed_catalog_regalias(cur, class_id_map)
        seed_catalog_profissoes(cur)

        # 2. Tabelas legacy (retrocompatibilidade)
        seed_legacy_tables(cur)

        # 3. Infra
        seed_audit_log_table(cur)

        conn.commit()
        print(f"\n{'=' * 60}")
        print("  ✅ Seed v2 concluído com sucesso!")
        print(f"{'=' * 60}\n")

    except Exception as e:
        conn.rollback()
        print(f"\n❌ Erro ao executar seed: {e}")
        import traceback; traceback.print_exc()
        sys.exit(1)
    finally:
        cur.close()
        conn.close()


if __name__ == "__main__":
    main()

