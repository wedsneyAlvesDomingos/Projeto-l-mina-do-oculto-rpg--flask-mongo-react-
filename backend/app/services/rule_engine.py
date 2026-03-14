"""
Motor de Regras — Lâmina do Oculto v0.5
=========================================
Server-side que espelha a lógica do frontend (habilidades.js, regras.js, etc.).
Valida toda mutação de personagem antes de persistir.

Ref: docs/schema-ficha.json  (formato canônico)
Ref: LDO 0.5               (livro de regras)

TODO-BE-001
"""

from __future__ import annotations
import math
from typing import Any

# ============================================================================
# CONSTANTES DO SISTEMA
# ============================================================================

RULE_VERSION = "0.5"
RULE_VERSIONS_SUPPORTED = ["0.5"]


def get_rule_version(personagem: dict) -> str:
    """Retorna a versão de regras do personagem (default: atual)."""
    version = personagem.get('rule_version', RULE_VERSION)
    if version not in RULE_VERSIONS_SUPPORTED:
        return RULE_VERSION  # fallback para versão atual
    return version


# --- Espécies: pvBase e velocidadeBase (Ref: especies.js) ---
ESPECIES: dict[str, dict[str, Any]] = {
    "humano":         {"pvBase": 10, "velocidadeBase": 6},
    "elfo":           {"pvBase": 10, "velocidadeBase": 7.5},
    "anao":           {"pvBase": 12, "velocidadeBase": 4.5},
    "feerico":        {"pvBase": 10, "velocidadeBase": 6},
    "draconiano":     {"pvBase": 9,  "velocidadeBase": 4.5},
    "meioElfo":       {"pvBase": 9,  "velocidadeBase": 6},
    "meioDemonio":    {"pvBase": 11, "velocidadeBase": 6},
    "meioCelestial":  {"pvBase": 9,  "velocidadeBase": 6},
    "meioGenio":      {"pvBase": 10, "velocidadeBase": 6},
    "meioTroll":      {"pvBase": 12, "velocidadeBase": 7.5},
    "bestial":        {"pvBase": 10, "velocidadeBase": 6},
    "halfling":       {"pvBase": 10, "velocidadeBase": 4.5},
    "troll":          {"pvBase": 15, "velocidadeBase": 4.5},
    "constructo":     {"pvBase": 11, "velocidadeBase": 6},
}

# --- 35 habilidades válidas (slug keys, Ref: habilidades.js) ---
HABILIDADES_VALIDAS: set[str] = {
    # Físico (8)
    "fortitude", "forca", "agilidade", "combate_corpo_a_corpo",
    "combate_a_distancia", "atletismo", "acrobacia", "destreza",
    # Exploração (8)
    "furtividade", "investigacao", "rastreamento", "percepcao",
    "sobrevivencia", "lidar_com_animais", "navegacao", "armadilhas",
    # Conhecimento (7)
    "historia", "intuicao", "natureza", "medicina",
    "jurisprudencia", "teologia", "tecnologia",
    # Arcana (6)
    "arcanismo", "alquimia", "ritualismo", "ocultismo",
    "arcanatec", "combate_arcano",
    # Social (6)
    "enganacao", "persuasao", "performance", "intimidacao",
    "seducao", "negociacao",
}

# Mapeamento display-name → slug (para aceitar ambos formatos)
# O frontend envia display names; o backend aceita ambos.
DISPLAY_TO_SLUG: dict[str, str] = {
    "Fortitude": "fortitude", "Força": "forca", "Agilidade": "agilidade",
    "Combate Corpo a Corpo": "combate_corpo_a_corpo",
    "Combate a Distância": "combate_a_distancia",
    "Atletismo": "atletismo", "Acrobacia": "acrobacia", "Destreza": "destreza",
    "Furtividade": "furtividade", "Investigação": "investigacao",
    "Rastreamento": "rastreamento", "Percepção": "percepcao",
    "Sobrevivência": "sobrevivencia", "Lidar com animais": "lidar_com_animais",
    "Navegação": "navegacao", "Armadilhas": "armadilhas",
    "História": "historia", "Intuição": "intuicao", "Natureza": "natureza",
    "Medicina": "medicina", "Jurisprudência": "jurisprudencia",
    "Teologia": "teologia", "Tecnologia": "tecnologia",
    "Arcanismo": "arcanismo", "Alquimia": "alquimia",
    "Ritualismo": "ritualismo", "Ocultismo": "ocultismo",
    "Arcanatec": "arcanatec", "Combate Arcano": "combate_arcano",
    "Enganação": "enganacao", "Persuasão": "persuasao",
    "Performance": "performance", "Intimidação": "intimidacao",
    "Sedução": "seducao", "Negociação": "negociacao",
}
SLUG_TO_DISPLAY = {v: k for k, v in DISPLAY_TO_SLUG.items()}

# --- 15 proficiências válidas (Ref: proficiencias.js) ---
PROFICIENCIAS_VALIDAS: set[str] = {
    "armas_armaduras", "conducao_veiculos_terrestres",
    "conducao_veiculos_aquaticos", "conducao_exotica",
    "kit_arrombamento", "armas_de_fogo", "linguas_antigas",
    "arqueologia", "lideranca", "armas_exoticas",
    "esgrima", "arco_besta", "disfarce",
    "ataques_em_area", "combate_anti_conjuradores",
}

# Mapeamento display-name → id (proficiências)
PROF_DISPLAY_TO_ID: dict[str, str] = {
    "Maestria em Armaduras e Escudos": "armas_armaduras",
    "Condução de Veículos Terrestres": "conducao_veiculos_terrestres",
    "Condução de Veículos Aquáticos": "conducao_veiculos_aquaticos",
    "Condução Exótica": "conducao_exotica",
    "Kit de Arrombamento": "kit_arrombamento",
    "Armas de Fogo": "armas_de_fogo",
    "Línguas Antigas": "linguas_antigas",
    "Arqueologia": "arqueologia",
    "Liderança": "lideranca",
    "Armas Exóticas": "armas_exoticas",
    "Esgrima": "esgrima",
    "Arco e Besta": "arco_besta",
    "Disfarce": "disfarce",
    "Ataques em Área": "ataques_em_area",
    "Combate Anti-Conjuradores": "combate_anti_conjuradores",
}

# --- Tabela XP por nível (Ref: habilidades.js, LDO 0.5) ---
TABELA_XP_POR_NIVEL: dict[int, int] = {
    1: 0, 2: 150, 3: 450, 4: 1000, 5: 1800,
    6: 2800, 7: 4000, 8: 5500, 9: 7500, 10: 10000,
    11: 13000, 12: 16500, 13: 20500, 14: 25000, 15: 30000,
    16: 33000, 17: 36000, 18: 39500, 19: 43000, 20: 46000,
}

NIVEL_MAXIMO = 20


# ============================================================================
# FUNÇÕES UTILITÁRIAS DE NORMALIZAÇÃO
# ============================================================================

def _normalizar_habilidades(habilidades_raw: dict) -> dict[str, int]:
    """
    Aceita habilidades por display name OU por slug e retorna
    sempre um dict slug → valor.
    """
    resultado: dict[str, int] = {}
    for key, valor in (habilidades_raw or {}).items():
        slug = DISPLAY_TO_SLUG.get(key, key)
        if slug in HABILIDADES_VALIDAS:
            resultado[slug] = int(valor) if valor else 0
    return resultado


def _normalizar_proficiencias(profs_raw: dict) -> dict[str, int]:
    """
    Aceita proficiências por display name OU por ID e retorna
    sempre um dict id → nível.
    """
    resultado: dict[str, int] = {}
    for key, valor in (profs_raw or {}).items():
        prof_id = PROF_DISPLAY_TO_ID.get(key, key)
        if prof_id in PROFICIENCIAS_VALIDAS:
            resultado[prof_id] = int(valor) if valor else 0
    return resultado


def _get_hab(habilidades: dict, slug: str) -> int:
    """Retorna valor de uma habilidade ou 0."""
    return habilidades.get(slug, 0)


# ============================================================================
# CÁLCULOS DERIVADOS (espelha frontend: habilidades.js, regras.js)
# ============================================================================

def calcular_pontos_de_vida(pv_base_especie: int, fortitude: int) -> int:
    """PV = base_espécie + fortitude × 2. Ref: LDO 0.5"""
    return pv_base_especie + (fortitude * 2)


def calcular_estamina(atletismo: int) -> int:
    """Estamina = 10 + atletismo (+5 se atletismo ≥ 10). Ref: LDO 0.5"""
    base = 10 + atletismo
    if atletismo >= 10:
        base += 5
    return base


def calcular_pontos_de_magia(arcanismo: int) -> int:
    """PM = arcanismo × 2 (+5 se arcanismo ≥ 10). Ref: LDO 0.5"""
    pm = arcanismo * 2
    if arcanismo >= 10:
        pm += 5
    return pm


def calcular_iniciativa(agilidade: int, percepcao: int) -> int:
    """Iniciativa = agilidade + percepção. Ref: LDO 0.5"""
    return agilidade + percepcao


def calcular_bonus_velocidade(agilidade: int) -> float:
    """
    Bônus de velocidade por agilidade (thresholds).
    Ref: LDO 0.5, habilidades.js calcularBonusVelocidade
    """
    if agilidade >= 12:
        return 6.0
    elif agilidade >= 9:
        return 4.5
    elif agilidade >= 6:
        return 3.0
    elif agilidade >= 3:
        return 1.5
    return 0.0


def calcular_bonus_defesa_agilidade(agilidade: int) -> int:
    """
    Bônus de defesa por agilidade (thresholds).
    Ref: LDO 0.5, regras.js calcularBonusDefesaAgilidade
    """
    if agilidade >= 12:
        return 7
    elif agilidade >= 9:
        return 6
    elif agilidade >= 6:
        return 5
    elif agilidade >= 3:
        return 4
    return 3


def calcular_defesa_total(bonus_agilidade: int, armadura_defesa: int = 0,
                          escudo_defesa: int = 0, is_armadura_pesada: bool = False,
                          outros: int = 0) -> int:
    """
    Defesa total.
    Sem armadura pesada: 7 + bonusAgilidade + armadura + escudo + outros
    Com armadura pesada: armadura.defesa + escudo + outros
    (armadura.defesa de pesada já inclui base 7).
    Ref: LDO 0.5, regras.js calcularDefesaTotal
    """
    if is_armadura_pesada:
        return armadura_defesa + escudo_defesa + outros
    return 7 + bonus_agilidade + armadura_defesa + escudo_defesa + outros


def calcular_capacidade_carga(forca: int, tamanho: str = "medio") -> float:
    """
    Capacidade de carga em kg.
    Ref: LDO 0.5, habilidades.js calcularCapacidadeDeCarga
    """
    multiplicadores = {
        "minusculo": 0.25, "pequeno": 0.5, "medio": 1,
        "grande": 2, "enorme": 4, "colossal": 8,
    }
    mult = multiplicadores.get(tamanho.lower(), 1)
    carga = forca * 5 * mult
    if forca >= 10:
        carga += forca * 3
    return carga


def calcular_cura_kit_medico(medicina: int) -> int:
    """Cura de kit médico = medicina se medicina ≥ 5, senão 0. Ref: LDO 0.5"""
    return medicina if medicina >= 5 else 0


def calcular_tempo_respiracao(fortitude: int) -> int:
    """Tempo de segurar respiração = fortitude minutos. Ref: LDO 0.5"""
    return fortitude


def calcular_nivel(xp: int) -> int:
    """Determina nível com base no XP. Ref: TABELA_XP_POR_NIVEL, habilidades.js"""
    nivel = 1
    for n in range(NIVEL_MAXIMO, 0, -1):
        if xp >= TABELA_XP_POR_NIVEL.get(n, 0):
            nivel = n
            break
    return nivel


def calcular_pontos_regalia_total(nivel: int) -> int:
    """
    Pontos de regalia cumulativos por nível.
    Lv1=4, Lv2=8, Lv3+=8+(nivel-2)×2
    Ref: LDO 0.5, habilidades.js calcularPontosRegaliaTotal
    """
    if nivel <= 0:
        return 0
    if nivel == 1:
        return 4
    if nivel == 2:
        return 8
    return 8 + (nivel - 2) * 2


# ============================================================================
# VALIDAÇÃO DE CRIAÇÃO (TODO-BE-001)
# ============================================================================

def validar_criacao(data: dict) -> list[str]:
    """
    Valida os dados de criação de um personagem.
    Retorna lista de erros (vazia = OK).

    Parâmetros:
        data: dict no formato do payload do frontend (schema-ficha.json)

    Validações:
        1. Campos obrigatórios (nome, espécie, nível)
        2. Espécie válida
        3. Nível = 1 na criação
        4. Habilidades não-negativas
        5. Pontos de regalia dentro do limite
    """
    erros: list[str] = []

    # --- 1. Campos obrigatórios ---
    nome = data.get("nome_personagem") or data.get("name")
    if not nome or not str(nome).strip():
        erros.append("Campo 'nome_personagem' é obrigatório.")

    nivel = data.get("nivel") or data.get("nível") or data.get("level")
    if nivel is None:
        erros.append("Campo 'nivel' é obrigatório.")
    else:
        nivel = int(nivel)

    especie = data.get("especie") or data.get("race")
    if not especie:
        erros.append("Campo 'especie' é obrigatório.")
    elif especie not in ESPECIES:
        erros.append(f"Espécie '{especie}' não é válida. Opções: {', '.join(sorted(ESPECIES.keys()))}")

    # --- 2. Nível na criação ---
    if nivel is not None:
        nivel = int(nivel)
        if nivel < 1 or nivel > NIVEL_MAXIMO:
            erros.append(f"Nível deve ser entre 1 e {NIVEL_MAXIMO}. Recebido: {nivel}")

    # --- 3. Habilidades ---
    habilidades_raw = data.get("habilidades", {})
    if habilidades_raw and isinstance(habilidades_raw, dict):
        habs = _normalizar_habilidades(habilidades_raw)

    # --- 4. Pontos de regalia ---
    pontos_gastos = data.get("pontos_de_regalia") or data.get("regalia_points") or 0
    if nivel is not None:
        pontos_max = calcular_pontos_regalia_total(int(nivel))
        if int(pontos_gastos) > pontos_max:
            erros.append(
                f"Pontos de regalia gastos ({pontos_gastos}) excedem o máximo "
                f"para nível {nivel} ({pontos_max})."
            )

    # --- 5. Idade ---
    idade = data.get("idade") or data.get("age")
    if idade is not None and int(idade) < 0:
        erros.append("Idade não pode ser negativa.")

    return erros


# ============================================================================
# VALIDAÇÃO DE EVOLUÇÃO (TODO-BE-001)
# ============================================================================

def validar_evolucao(personagem_atual: dict, mudancas: dict) -> list[str]:
    """
    Valida mudanças aplicadas a um personagem existente (subir de nível,
    comprar regalias, etc.).

    Parâmetros:
        personagem_atual: dict com estado atual do personagem (do banco)
        mudancas: dict com campos que estão sendo alterados

    Retorna lista de erros (vazia = OK).
    """
    erros: list[str] = []

    # --- 1. Nível não pode diminuir ---
    nivel_atual = personagem_atual.get("nivel") or personagem_atual.get("level") or 1
    novo_nivel = mudancas.get("nivel") or mudancas.get("nível") or mudancas.get("level")
    if novo_nivel is not None:
        novo_nivel = int(novo_nivel)
        if novo_nivel < int(nivel_atual):
            erros.append(
                f"Nível não pode diminuir de {nivel_atual} para {novo_nivel}."
            )
        if novo_nivel > NIVEL_MAXIMO:
            erros.append(f"Nível máximo é {NIVEL_MAXIMO}. Recebido: {novo_nivel}.")

    # --- 2. XP compatível com nível ---
    xp = mudancas.get("experience") or mudancas.get("xp")
    if xp is not None and novo_nivel is not None:
        xp = int(xp)
        xp_minimo = TABELA_XP_POR_NIVEL.get(int(novo_nivel), 0)
        if xp < xp_minimo:
            erros.append(
                f"XP ({xp}) insuficiente para nível {novo_nivel} "
                f"(mínimo: {xp_minimo})."
            )

    # --- 3. Habilidades (valores negativos são válidos — penalidades/condições) ---
    habilidades_raw = mudancas.get("habilidades")
    if habilidades_raw and isinstance(habilidades_raw, dict):
        habs = _normalizar_habilidades(habilidades_raw)

    # --- 4. Pontos de regalia ---
    pontos_gastos = mudancas.get("pontos_de_regalia") or mudancas.get("regalia_points")
    nivel_para_calculo = novo_nivel if novo_nivel is not None else nivel_atual
    if pontos_gastos is not None:
        pontos_max = calcular_pontos_regalia_total(int(nivel_para_calculo))
        if int(pontos_gastos) > pontos_max:
            erros.append(
                f"Pontos de regalia gastos ({pontos_gastos}) excedem o máximo "
                f"para nível {nivel_para_calculo} ({pontos_max})."
            )

    return erros


# ============================================================================
# CÁLCULO DE FICHA COMPLETA (TODO-BE-001)
# ============================================================================

def calcular_ficha_completa(personagem: dict) -> dict:
    """
    Recebe um dict de personagem e retorna um dict com todos os stats
    derivados calculados.

    Não modifica o dict original — retorna um novo com os campos derivados
    adicionados/atualizados.

    Parâmetros:
        personagem: dict no formato schema-ficha.json

    Retorna:
        dict com campos derivados preenchidos:
        - recursos (pv_max, pm_max, estamina_max)
        - defesa (base, armadura, escudo, agilidade, total)
        - velocidade (base_especie, bonus_agilidade, penalidade_armadura, total)
        - iniciativa (agilidade, percepcao, total)
        - carga (capacidade_max)
    """
    resultado = dict(personagem)

    # --- Versão de regras ---
    version = get_rule_version(personagem)
    resultado["rule_version"] = version

    # --- Espécie ---
    especie_key = personagem.get("especie") or personagem.get("race") or "humano"
    especie_data = ESPECIES.get(especie_key, ESPECIES["humano"])
    pv_base = especie_data["pvBase"]
    vel_base = especie_data["velocidadeBase"]

    # --- Habilidades normalizadas ---
    habilidades_raw = personagem.get("habilidades", {})
    habs = _normalizar_habilidades(habilidades_raw)

    fortitude = _get_hab(habs, "fortitude")
    forca = _get_hab(habs, "forca")
    agilidade = _get_hab(habs, "agilidade")
    atletismo = _get_hab(habs, "atletismo")
    arcanismo = _get_hab(habs, "arcanismo")
    percepcao = _get_hab(habs, "percepcao")
    medicina = _get_hab(habs, "medicina")

    # --- Recursos ---
    pv_max = calcular_pontos_de_vida(pv_base, fortitude)
    pm_max = calcular_pontos_de_magia(arcanismo)
    estamina_max = calcular_estamina(atletismo)

    # Preservar atuais se existirem, senão igual ao máximo
    recursos_atual = personagem.get("recursos", {})
    resultado["recursos"] = {
        "pv_max": pv_max,
        "pv_atual": recursos_atual.get("pv_atual", pv_max),
        "pm_max": pm_max,
        "pm_atual": recursos_atual.get("pm_atual", pm_max),
        "estamina_max": estamina_max,
        "estamina_atual": recursos_atual.get("estamina_atual", estamina_max),
    }

    # --- Defesa ---
    bonus_def_agi = calcular_bonus_defesa_agilidade(agilidade)

    # Detectar armadura equipada (verificar no inventário/equipamentos)
    armadura_defesa = 0
    escudo_defesa = 0
    is_pesada = False

    equipamentos = personagem.get("equipamentos", [])
    for item in equipamentos:
        if not isinstance(item, dict):
            continue
        if not item.get("equipado", False):
            continue
        slot = (item.get("slot") or "").lower()
        cat = (item.get("categoria") or "").lower()

        if slot == "armadura" or "armadura" in cat:
            armadura_defesa = item.get("defesa", item.get("bonusDefesa", 0)) or 0
            if "pesad" in cat:
                is_pesada = True
        elif slot == "escudo" or "escudo" in cat:
            escudo_defesa = item.get("defesa", item.get("bonusDefesa", 0)) or 0

    defesa_total = calcular_defesa_total(
        bonus_def_agi, armadura_defesa, escudo_defesa, is_pesada
    )

    resultado["defesa"] = {
        "base": 7,
        "armadura": armadura_defesa,
        "escudo": escudo_defesa,
        "agilidade": bonus_def_agi,
        "is_armadura_pesada": is_pesada,
        "outros": 0,
        "total": defesa_total,
    }

    # --- Velocidade ---
    bonus_vel = calcular_bonus_velocidade(agilidade)
    penalidade_armadura = 1.5 if is_pesada else 0.0
    vel_total = vel_base + bonus_vel - penalidade_armadura

    resultado["velocidade"] = {
        "base_especie": vel_base,
        "bonus_agilidade": bonus_vel,
        "penalidade_armadura": penalidade_armadura,
        "outros": 0,
        "total": vel_total,
    }

    # --- Iniciativa ---
    inic_total = calcular_iniciativa(agilidade, percepcao)
    resultado["iniciativa"] = {
        "agilidade": agilidade,
        "percepcao": percepcao,
        "outros": 0,
        "total": inic_total,
    }

    # --- Carga ---
    cap_max = calcular_capacidade_carga(forca)
    carga_atual = 0.0
    for item in equipamentos:
        if isinstance(item, dict):
            peso = item.get("peso", 0) or 0
            qtd = item.get("quantidade", 1) or 1
            carga_atual += peso * qtd

    if cap_max > 0:
        ratio = carga_atual / cap_max
    else:
        ratio = 0

    if ratio < 0.5:
        status_carga = "leve"
    elif ratio < 0.75:
        status_carga = "normal"
    elif ratio <= 1.0:
        status_carga = "pesado"
    else:
        status_carga = "sobrecarregado"

    resultado["carga"] = {
        "capacidade_max": cap_max,
        "carga_atual": round(carga_atual, 2),
        "status": status_carga,
    }

    # --- Nível (derivado do XP se presente) ---
    xp = personagem.get("experience") or personagem.get("xp") or 0
    nivel_calculado = calcular_nivel(int(xp))
    resultado["nivel_calculado"] = nivel_calculado
    resultado["pontos_regalia_disponiveis"] = calcular_pontos_regalia_total(nivel_calculado)

    # --- Cura Kit Médico ---
    resultado["cura_kit_medico"] = calcular_cura_kit_medico(medicina)

    # --- Tempo Respiração ---
    resultado["tempo_respiracao_minutos"] = calcular_tempo_respiracao(fortitude)

    # --- Rule version ---
    resultado["rule_version"] = RULE_VERSION

    return resultado


# ============================================================================
# VALIDAÇÃO DE REGALIAS (TODO-BE-002)
# ============================================================================

def validar_regalias(personagem: dict) -> list[str]:
    """
    Valida se as regalias do personagem são válidas:
    - Pontos gastos ≤ pontos disponíveis para o nível
    - Distribuição: nível 1 → 1 espécie + 1 classe + 1 profissão + 1 livre

    Parâmetros:
        personagem: dict do personagem

    Retorna lista de erros (vazia = OK).
    """
    erros: list[str] = []

    nivel = personagem.get("nivel") or personagem.get("level") or 1
    nivel = int(nivel)
    pontos_max = calcular_pontos_regalia_total(nivel)

    # Contar pontos gastos
    pontos_gastos = personagem.get("pontos_de_regalia") or personagem.get("regalia_points") or 0
    pontos_gastos = int(pontos_gastos)

    if pontos_gastos > pontos_max:
        erros.append(
            f"Pontos de regalia gastos ({pontos_gastos}) excedem "
            f"o máximo para nível {nivel} ({pontos_max})."
        )

    # Contar regalias de cada fonte
    regalias_especie = personagem.get("regalias_de_especie", [])
    regalias_aprendiz = personagem.get("regalias_de_aprendiz", {})
    regalias_classe = personagem.get("regalias_de_classe", {})
    regalias_profissao = personagem.get("regalias_de_profissao", [])

    # Nível 1: precisa ter pelo menos 1 regalia de espécie, 1 de aprendiz, 1 de profissão
    if nivel >= 1:
        if not regalias_especie or (isinstance(regalias_especie, list) and len(regalias_especie) == 0):
            pass  # Não obrigatório — pode ser escolhida depois
        if not regalias_aprendiz:
            pass  # Idem

    return erros


# ============================================================================
# FUNÇÃO AUXILIAR: Merge de personagem com mudanças
# ============================================================================

def merge_personagem(personagem_atual: dict, mudancas: dict) -> dict:
    """
    Combina estado atual com mudanças para produzir novo estado.
    Faz merge raso: campos de primeiro nível são substituídos.
    Para habilidades e proficiências, faz merge profundo.
    """
    resultado = dict(personagem_atual)

    for key, valor in mudancas.items():
        if key in ("habilidades", "proficiencias") and isinstance(valor, dict):
            existente = resultado.get(key, {})
            if isinstance(existente, dict):
                existente = dict(existente)
                existente.update(valor)
                # Clamp: habilidades e proficiências nunca abaixo de 0
                existente = {k: max(0, v) if isinstance(v, (int, float)) else v for k, v in existente.items()}
                resultado[key] = existente
            else:
                resultado[key] = valor
        elif key in ("condicoes",) and isinstance(valor, dict):
            existente = resultado.get(key, {})
            if isinstance(existente, dict):
                existente = dict(existente)
                existente.update(valor)
                resultado[key] = existente
            else:
                resultado[key] = valor
        else:
            resultado[key] = valor

    return resultado

# ============================================================================
# SIMULAÇÃO DE AÇÃO (BE-005)
# ============================================================================

import random

def _rolar_d20() -> int:
    return random.randint(1, 20)

def _rolar_dado(expressao: str) -> int:
    """
    Rola dados de expressão simples: '2d6', '1d20', '3d4', etc.
    Retorna a soma dos resultados.
    """
    expressao = expressao.strip().lower()
    if 'd' not in expressao:
        try:
            return int(expressao)
        except ValueError:
            return 0
    partes = expressao.split('d')
    try:
        qtd = int(partes[0]) if partes[0] else 1
        lados = int(partes[1])
    except (ValueError, IndexError):
        return 0
    return sum(random.randint(1, lados) for _ in range(qtd))


def simular_acao(personagem: dict, acao: dict) -> dict:
    """
    Simula uma ação no server-side e retorna o resultado.
    
    Tipos de ação suportados:
    - 'ataque': rola d20 + bônus acerto, calcula dano
    - 'teste': rola d20 + valor da habilidade
    - 'descanso_curto' / 'descanso_longo': calcula recuperação
    
    @param personagem: dict com dados da ficha (habilidades, nivel, especie, etc.)
    @param acao: dict com {tipo, habilidade?, alvo_defesa?, arma_dano?, ...}
    @returns: dict com resultado da simulação
    """
    tipo = acao.get('tipo', '')
    habilidades = _normalizar_habilidades(personagem.get('habilidades', {}))

    if tipo == 'teste':
        hab_slug = acao.get('habilidade', '')
        if hab_slug in DISPLAY_TO_SLUG:
            hab_slug = DISPLAY_TO_SLUG[hab_slug]
        valor_hab = _get_hab(habilidades, hab_slug)
        bonus_extra = acao.get('bonus', 0)
        
        d20 = _rolar_d20()
        total = d20 + valor_hab + bonus_extra
        critico = d20 == 20
        falha_critica = d20 == 1
        
        cd = acao.get('cd', None)
        sucesso = None
        if cd is not None:
            sucesso = total >= cd or critico
            if falha_critica:
                sucesso = False
        
        return {
            'tipo': 'teste',
            'habilidade': hab_slug,
            'd20': d20,
            'valorHabilidade': valor_hab,
            'bonus': bonus_extra,
            'total': total,
            'critico': critico,
            'falhaCritica': falha_critica,
            'cd': cd,
            'sucesso': sucesso,
            'descricao': f"Teste de {SLUG_TO_DISPLAY.get(hab_slug, hab_slug)}: d20({d20}) + {valor_hab} = {total}" +
                         (f" vs CD {cd} → {'Sucesso!' if sucesso else 'Falha.'}" if cd is not None else '')
        }

    elif tipo == 'ataque':
        hab_acerto_slug = acao.get('habilidade_acerto', 'combate_corpo_a_corpo')
        if hab_acerto_slug in DISPLAY_TO_SLUG:
            hab_acerto_slug = DISPLAY_TO_SLUG[hab_acerto_slug]
        valor_acerto = _get_hab(habilidades, hab_acerto_slug)
        
        hab_dano_slug = acao.get('habilidade_dano', 'forca')
        if hab_dano_slug in DISPLAY_TO_SLUG:
            hab_dano_slug = DISPLAY_TO_SLUG[hab_dano_slug]
        valor_dano_hab = _get_hab(habilidades, hab_dano_slug)
        
        # Rolar acerto
        d20 = _rolar_d20()
        total_acerto = d20 + valor_acerto
        critico = d20 == 20
        falha_critica = d20 == 1
        
        alvo_defesa = acao.get('alvo_defesa', 10)
        acertou = (total_acerto >= alvo_defesa or critico) and not falha_critica
        
        # Rolar dano
        dano_base_expr = acao.get('arma_dano', '1d6')
        dano_base = _rolar_dado(dano_base_expr)
        dano_total = dano_base + valor_dano_hab
        if critico:
            dano_critico_extra = _rolar_dado(dano_base_expr)
            dano_total += dano_critico_extra
        dano_total = max(0, dano_total)
        
        return {
            'tipo': 'ataque',
            'acerto': {
                'd20': d20,
                'bonus': valor_acerto,
                'total': total_acerto,
                'alvoDefesa': alvo_defesa,
                'acertou': acertou,
                'critico': critico,
                'falhaCritica': falha_critica
            },
            'dano': {
                'base': dano_base_expr,
                'rolado': dano_base,
                'bonusHabilidade': valor_dano_hab,
                'total': dano_total if acertou else 0,
                'critico': critico
            },
            'descricao': (
                f"Ataque: d20({d20}) + {valor_acerto} = {total_acerto} vs Defesa {alvo_defesa} → " +
                ("Acerto Crítico!" if critico else "Acertou!" if acertou else "Errou!" if not falha_critica else "Falha Crítica!") +
                (f" Dano: {dano_total}" if acertou else "")
            )
        }

    elif tipo in ('descanso_curto', 'descanso_longo'):
        especie_key = personagem.get('especie', personagem.get('race', 'humano'))
        especie_data = ESPECIES.get(especie_key, ESPECIES['humano'])
        pv_base = especie_data['pvBase']
        
        fortitude = _get_hab(habilidades, 'fortitude')
        atletismo = _get_hab(habilidades, 'atletismo')
        arcanismo = _get_hab(habilidades, 'arcanismo')
        
        pv_max = calcular_pontos_de_vida(pv_base, fortitude)
        est_max = calcular_estamina(atletismo)
        mag_max = calcular_pontos_de_magia(arcanismo)
        
        pv_atual = personagem.get('vidaAtual', pv_max)
        est_atual = personagem.get('estaminaAtual', est_max)
        mag_atual = personagem.get('magiaAtual', mag_max)
        nivel_cansaco = personagem.get('nivelCansaco', 0)
        
        if tipo == 'descanso_curto':
            vida_rec = min(math.floor(pv_max / 3), pv_max - pv_atual)
            est_rec = min(math.floor(est_max / 2), est_max - est_atual)
            mag_rec = min(math.floor(mag_max / 2), mag_max - mag_atual)
            return {
                'tipo': 'descanso_curto',
                'recuperacao': {
                    'vida': vida_rec,
                    'estamina': est_rec,
                    'magia': mag_rec,
                    'novaVida': pv_atual + vida_rec,
                    'novaEstamina': est_atual + est_rec,
                    'novaMagia': mag_atual + mag_rec
                },
                'descricao': f"Descanso curto: +{vida_rec} PV, +{est_rec} Estamina, +{mag_rec} Magia"
            }
        else:
            cansaco_reduzido = 1 if nivel_cansaco > 0 else 0
            return {
                'tipo': 'descanso_longo',
                'recuperacao': {
                    'vida': pv_max - pv_atual,
                    'estamina': est_max - est_atual,
                    'magia': mag_max - mag_atual,
                    'novaVida': pv_max,
                    'novaEstamina': est_max,
                    'novaMagia': mag_max,
                    'novoNivelCansaco': max(0, nivel_cansaco - 1),
                    'cansacoReduzido': cansaco_reduzido
                },
                'descricao': f"Descanso longo: recuperação total!" +
                             (f" Cansaço reduzido de {nivel_cansaco} para {nivel_cansaco - 1}." if cansaco_reduzido else "")
            }

    else:
        return {
            'tipo': tipo,
            'erro': f"Tipo de ação desconhecido: '{tipo}'. Tipos válidos: teste, ataque, descanso_curto, descanso_longo"
        }