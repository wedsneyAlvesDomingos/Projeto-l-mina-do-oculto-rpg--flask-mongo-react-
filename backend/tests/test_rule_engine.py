"""
test_rule_engine.py — Testes unitários do motor de regras
==========================================================
Cobre todas as funções puras de cálculo e validação.
Nenhum banco necessário — apenas lógica Python.
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'app'))

import pytest
from services.rule_engine import (
    # cálculos derivados
    calcular_pontos_de_vida,
    calcular_estamina,
    calcular_pontos_de_magia,
    calcular_iniciativa,
    calcular_bonus_velocidade,
    calcular_bonus_defesa_agilidade,
    calcular_defesa_total,
    calcular_capacidade_carga,
    calcular_cura_kit_medico,
    calcular_tempo_respiracao,
    calcular_nivel,
    calcular_pontos_regalia_total,
    # ficha completa
    calcular_ficha_completa,
    # validações
    validar_criacao,
    validar_evolucao,
    # merge
    merge_personagem,
    # constantes
    NIVEL_MAXIMO,
    TABELA_XP_POR_NIVEL,
    ESPECIES,
    HABILIDADES_VALIDAS,
)


# =============================================================================
# calcular_pontos_de_vida
# =============================================================================
class TestPontosDeVida:
    def test_humano_sem_fortitude(self):
        assert calcular_pontos_de_vida(10, 0) == 10

    def test_humano_fortitude_5(self):
        assert calcular_pontos_de_vida(10, 5) == 20

    def test_anao_fortitude_8(self):
        # pvBase anão=12  →  12 + 8*2 = 28
        assert calcular_pontos_de_vida(12, 8) == 28

    def test_troll_fortitude_15(self):
        # pvBase troll=15  →  15 + 15*2 = 45
        assert calcular_pontos_de_vida(15, 15) == 45

    def test_formula_generica(self):
        for base in range(8, 16):
            for fort in range(0, 16):
                assert calcular_pontos_de_vida(base, fort) == base + fort * 2


# =============================================================================
# calcular_estamina
# =============================================================================
class TestEstamina:
    def test_atletismo_zero(self):
        assert calcular_estamina(0) == 10

    def test_atletismo_5(self):
        assert calcular_estamina(5) == 15

    def test_atletismo_10_bonus(self):
        # atletismo ≥ 10 ganha +5 extra
        assert calcular_estamina(10) == 25   # 10 + 10 + 5

    def test_atletismo_12(self):
        assert calcular_estamina(12) == 27   # 10 + 12 + 5

    def test_atletismo_9_sem_bonus(self):
        assert calcular_estamina(9) == 19    # 10 + 9


# =============================================================================
# calcular_pontos_de_magia
# =============================================================================
class TestPontosDeMagia:
    def test_arcanismo_zero(self):
        assert calcular_pontos_de_magia(0) == 0

    def test_arcanismo_5(self):
        assert calcular_pontos_de_magia(5) == 10

    def test_arcanismo_10_bonus(self):
        # ≥ 10 → *2 + 5 extra
        assert calcular_pontos_de_magia(10) == 25  # 10*2 + 5

    def test_arcanismo_12(self):
        assert calcular_pontos_de_magia(12) == 29  # 12*2 + 5


# =============================================================================
# calcular_iniciativa
# =============================================================================
class TestIniciativa:
    def test_zero_zero(self):
        assert calcular_iniciativa(0, 0) == 0

    def test_agi5_perc3(self):
        assert calcular_iniciativa(5, 3) == 8

    def test_simetrico(self):
        assert calcular_iniciativa(7, 4) == calcular_iniciativa(4, 7)


# =============================================================================
# calcular_bonus_velocidade
# =============================================================================
class TestBonusVelocidade:
    @pytest.mark.parametrize("agi, expected", [
        (0, 0.0), (1, 0.0), (2, 0.0),
        (3, 1.5), (4, 1.5), (5, 1.5),
        (6, 3.0), (7, 3.0), (8, 3.0),
        (9, 4.5), (10, 4.5), (11, 4.5),
        (12, 6.0), (15, 6.0),
    ])
    def test_thresholds(self, agi, expected):
        assert calcular_bonus_velocidade(agi) == expected


# =============================================================================
# calcular_bonus_defesa_agilidade
# =============================================================================
class TestBonusDefesa:
    @pytest.mark.parametrize("agi, expected", [
        (0, 3), (1, 3), (2, 3),
        (3, 4), (4, 4), (5, 4),
        (6, 5), (7, 5), (8, 5),
        (9, 6), (10, 6), (11, 6),
        (12, 7), (15, 7),
    ])
    def test_thresholds(self, agi, expected):
        assert calcular_bonus_defesa_agilidade(agi) == expected


# =============================================================================
# calcular_defesa_total
# =============================================================================
class TestDefesaTotal:
    def test_sem_armadura(self):
        # 7 + bônus_agi(3) = 10
        assert calcular_defesa_total(bonus_agilidade=3) == 10

    def test_armadura_leve(self):
        # 7 + 3 + 1 (couro) = 11
        assert calcular_defesa_total(bonus_agilidade=3, armadura_defesa=1) == 11

    def test_com_escudo(self):
        assert calcular_defesa_total(bonus_agilidade=3, escudo_defesa=2) == 12

    def test_armadura_pesada_ignora_agi(self):
        # armadura pesada: placa_completa.defesa=8 (já inclui base 7)
        resultado = calcular_defesa_total(
            bonus_agilidade=5,
            armadura_defesa=8,
            escudo_defesa=0,
            is_armadura_pesada=True,
        )
        assert resultado == 8  # sem bonus de agilidade

    def test_armadura_pesada_com_escudo(self):
        resultado = calcular_defesa_total(
            bonus_agilidade=5,
            armadura_defesa=8,
            escudo_defesa=2,
            is_armadura_pesada=True,
        )
        assert resultado == 10


# =============================================================================
# calcular_capacidade_carga
# =============================================================================
class TestCapacidadeCarga:
    def test_forca_5_medio(self):
        # forca < 10: 5*5*1 = 25
        assert calcular_capacidade_carga(5) == 25.0

    def test_forca_10_bonus(self):
        # forca >= 10: 10*5 + 10*3 = 50 + 30 = 80
        assert calcular_capacidade_carga(10) == 80.0

    def test_tamanho_grande(self):
        # forca 5, grande (×2): 5*5*2 = 50
        assert calcular_capacidade_carga(5, 'grande') == 50.0

    def test_tamanho_pequeno(self):
        # forca=10, pequeno (×0.5): forca*5*0.5 + forca*3 = 25 + 30 = 55
        # o bônus +forca*3 (para forca>=10) NÃO é multiplicado pelo tamanho
        assert calcular_capacidade_carga(10, 'pequeno') == 55.0


# =============================================================================
# calcular_cura_kit_medico
# =============================================================================
class TestCuraKitMedico:
    @pytest.mark.parametrize("medicina, expected", [
        (0, 0), (4, 0), (5, 5), (10, 10), (15, 15),
    ])
    def test_threshold(self, medicina, expected):
        assert calcular_cura_kit_medico(medicina) == expected


# =============================================================================
# calcular_tempo_respiracao
# =============================================================================
class TestTempoRespiracao:
    def test_fortitude_zero(self):
        assert calcular_tempo_respiracao(0) == 0

    def test_fortitude_8(self):
        assert calcular_tempo_respiracao(8) == 8


# =============================================================================
# calcular_nivel
# =============================================================================
class TestCalcularNivel:
    @pytest.mark.parametrize("xp, expected_nivel", [
        (0,     1),
        (149,   1),
        (150,   2),
        (449,   2),
        (450,   3),
        (999,   3),
        (1000,  4),
        (10000, 10),
        (46000, 20),
        (99999, 20),  # XP acima do máximo → nível 20
    ])
    def test_xp_para_nivel(self, xp, expected_nivel):
        assert calcular_nivel(xp) == expected_nivel


# =============================================================================
# calcular_pontos_regalia_total
# =============================================================================
class TestPontosRegaliaTotal:
    @pytest.mark.parametrize("nivel, expected", [
        (0, 0),
        (1, 4),
        (2, 8),
        (3, 10),   # 8 + (3-2)*2
        (4, 12),
        (5, 14),
        (10, 24),  # 8 + 8*2
        (20, 44),  # 8 + 18*2
    ])
    def test_pontos_por_nivel(self, nivel, expected):
        assert calcular_pontos_regalia_total(nivel) == expected


# =============================================================================
# calcular_ficha_completa
# =============================================================================
class TestFichaCompleta:
    def _personagem_base(self):
        return {
            'nome_personagem': 'Teste',
            'especie': 'humano',
            'nivel': 1,
            'habilidades': {
                'fortitude': 5, 'forca': 4, 'agilidade': 6,
                'atletismo': 3, 'arcanismo': 0, 'percepcao': 2, 'medicina': 0,
            },
        }

    def test_retorna_recursos(self):
        ficha = calcular_ficha_completa(self._personagem_base())
        rec = ficha['recursos']
        assert rec['pv_max'] == 20      # 10 + 5*2
        assert rec['estamina_max'] == 13  # 10 + 3
        assert rec['pm_max'] == 0

    def test_defesa_total_agilidade_6(self):
        ficha = calcular_ficha_completa(self._personagem_base())
        defesa = ficha['defesa']
        assert defesa['agilidade'] == 5   # agilidade 6 → threshold 6 → bônus 5
        assert defesa['total'] == 7 + 5   # sem armadura

    def test_velocidade_humano_agi6(self):
        ficha = calcular_ficha_completa(self._personagem_base())
        vel = ficha['velocidade']
        assert vel['base_especie'] == 6.0
        assert vel['bonus_agilidade'] == 3.0   # agi 6 → 3.0
        assert vel['total'] == 9.0

    def test_iniciativa(self):
        ficha = calcular_ficha_completa(self._personagem_base())
        assert ficha['iniciativa']['total'] == 8   # agi=6 + perc=2

    def test_regra_version_preserved(self):
        ficha = calcular_ficha_completa(self._personagem_base())
        assert ficha['rule_version'] == '0.5'

    def test_nivel_calculado_do_xp(self):
        p = self._personagem_base()
        p['experience'] = 450     # XP para nível 3
        ficha = calcular_ficha_completa(p)
        assert ficha['nivel_calculado'] == 3

    def test_especie_anao(self):
        p = self._personagem_base()
        p['especie'] = 'anao'
        p['habilidades']['fortitude'] = 0
        ficha = calcular_ficha_completa(p)
        assert ficha['recursos']['pv_max'] == 12  # pvBase=12, fortitude=0

    def test_display_name_habilidades(self):
        """Frontend pode enviar nomes por display em vez de slug."""
        p = {
            'nome_personagem': 'Teste Display',
            'especie': 'humano',
            'nivel': 1,
            'habilidades': {
                'Fortitude': 5,
                'Agilidade': 6,
            },
        }
        ficha = calcular_ficha_completa(p)
        assert ficha['recursos']['pv_max'] == 20

    def test_armadura_pesada_desabilita_bonus_agi(self):
        p = self._personagem_base()
        p['equipamentos'] = [{
            'slot': 'armadura',
            'categoria': 'armadura_pesada',
            'defesa': 8,
            'equipado': True,
        }]
        ficha = calcular_ficha_completa(p)
        assert ficha['defesa']['is_armadura_pesada'] is True
        assert ficha['defesa']['total'] == 8  # sem bônus de agilidade


# =============================================================================
# validar_criacao
# =============================================================================
class TestValidarCriacao:
    def test_dados_validos(self):
        data = {'nome_personagem': 'Herói', 'especie': 'humano', 'nivel': 1}
        assert validar_criacao(data) == []

    def test_nome_obrigatorio(self):
        erros = validar_criacao({'especie': 'humano', 'nivel': 1})
        assert any('nome_personagem' in e for e in erros)

    def test_especie_invalida(self):
        erros = validar_criacao({'nome_personagem': 'X', 'especie': 'dragao', 'nivel': 1})
        assert any('dragao' in e for e in erros)

    def test_nivel_obrigatorio(self):
        erros = validar_criacao({'nome_personagem': 'X', 'especie': 'humano'})
        assert any('nivel' in e for e in erros)

    def test_nivel_acima_maximo(self):
        erros = validar_criacao({'nome_personagem': 'X', 'especie': 'humano', 'nivel': 99})
        assert len(erros) > 0

    def test_pontos_regalia_excedidos(self):
        erros = validar_criacao({
            'nome_personagem': 'X', 'especie': 'humano',
            'nivel': 1, 'pontos_de_regalia': 100,
        })
        assert any('regalia' in e.lower() for e in erros)

    def test_idade_negativa(self):
        erros = validar_criacao({
            'nome_personagem': 'X', 'especie': 'humano',
            'nivel': 1, 'idade': -5,
        })
        assert any('idade' in e.lower() for e in erros)

    def test_todas_especies_validas(self):
        for especie in ESPECIES:
            erros = validar_criacao({'nome_personagem': 'X', 'especie': especie, 'nivel': 1})
            assert not any(especie in e for e in erros), f"Espécie {especie} rejeitada: {erros}"


# =============================================================================
# validar_evolucao
# =============================================================================
class TestValidarEvolucao:
    def test_subir_nivel_valido(self):
        atual = {'nivel': 2, 'experience': 150}
        mudancas = {'nivel': 3, 'experience': 450}
        assert validar_evolucao(atual, mudancas) == []

    def test_nivel_nao_pode_diminuir(self):
        erros = validar_evolucao({'nivel': 5}, {'nivel': 3})
        assert any('nível' in e.lower() or 'nivel' in e.lower() for e in erros)

    def test_nivel_acima_maximo(self):
        erros = validar_evolucao({'nivel': 19}, {'nivel': 21})
        assert len(erros) > 0

    def test_xp_insuficiente_para_nivel(self):
        erros = validar_evolucao({'nivel': 1}, {'nivel': 5, 'experience': 100})
        assert any('xp' in e.lower() or 'insuficiente' in e.lower() for e in erros)

    def test_pontos_regalia_excedidos(self):
        erros = validar_evolucao({'nivel': 1}, {'nivel': 1, 'pontos_de_regalia': 100})
        assert any('regalia' in e.lower() for e in erros)


# =============================================================================
# merge_personagem
# =============================================================================
class TestMergePersonagem:
    def test_merge_simples(self):
        atual = {'nome': 'A', 'nivel': 1}
        mudancas = {'nivel': 2}
        resultado = merge_personagem(atual, mudancas)
        assert resultado['nivel'] == 2
        assert resultado['nome'] == 'A'

    def test_merge_habilidades_profundo(self):
        atual = {'habilidades': {'fortitude': 5, 'forca': 3}}
        mudancas = {'habilidades': {'forca': 7}}
        resultado = merge_personagem(atual, mudancas)
        assert resultado['habilidades']['fortitude'] == 5
        assert resultado['habilidades']['forca'] == 7

    def test_habilidades_clamp_minimo_zero(self):
        atual = {'habilidades': {'fortitude': 5}}
        mudancas = {'habilidades': {'fortitude': -10}}
        resultado = merge_personagem(atual, mudancas)
        assert resultado['habilidades']['fortitude'] == 0

    def test_nao_modifica_original(self):
        atual = {'nivel': 1, 'habilidades': {'fortitude': 5}}
        _ = merge_personagem(atual, {'nivel': 2})
        assert atual['nivel'] == 1


# =============================================================================
# Integridade das constantes
# =============================================================================
class TestConstantes:
    def test_nivel_maximo(self):
        assert NIVEL_MAXIMO == 20

    def test_tabela_xp_tem_20_niveis(self):
        assert len(TABELA_XP_POR_NIVEL) == 20
        assert TABELA_XP_POR_NIVEL[1] == 0
        assert TABELA_XP_POR_NIVEL[20] == 46000

    def test_xp_monotonicamente_crescente(self):
        niveis = sorted(TABELA_XP_POR_NIVEL.keys())
        for i in range(1, len(niveis)):
            assert TABELA_XP_POR_NIVEL[niveis[i]] > TABELA_XP_POR_NIVEL[niveis[i-1]]

    def test_14_especies(self):
        assert len(ESPECIES) == 14

    def test_35_habilidades(self):
        assert len(HABILIDADES_VALIDAS) == 35
