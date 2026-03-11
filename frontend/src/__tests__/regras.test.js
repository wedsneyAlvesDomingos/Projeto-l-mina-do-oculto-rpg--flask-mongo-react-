/**
 * Testes unitários — regras.js
 * TODO-TST-002 · Fase 5
 *
 * Cobertura: Defesa, Velocidade, Acerto, Dano, Elemental, Vantagem/Desvantagem,
 * Cansaço, Descanso, Dinheiro, Iniciativa.
 */
import {
    // Defesa
    calcularBonusDefesaAgilidade,
    calcularDefesaTotal,
    BONUS_DEFESA_AGILIDADE,
    // Velocidade
    calcularVelocidadeMovimento,
    PENALIDADE_VELOCIDADE_ARMADURA_PESADA,
    // Acerto
    calcularResultadoAtaque,
    // Dano
    calcularDanoFinal,
    // Elemental
    calcularDanoElemental,
    INTERACOES_ELEMENTAIS,
    // Vantagem / Desvantagem
    calcularVantagemDesvantagem,
    // Cansaço
    NIVEIS_CANSACO,
    getPenalidadesCansaco,
    // Descanso
    calcularDescansosCurto,
    calcularDescansoLongo,
    verificarPodeDescansar,
    verificarRequisitosDescansoLongo,
    processarDescanso,
    INTERVALO_DESCANSO_CURTO,
    INTERVALO_DESCANSO_LONGO,
    // Dinheiro
    cobreParaMoedas,
    moedasParaCobre,
    formatarMoedas,
    // Iniciativa
    calcularBonusIniciativa,
    ordenarPorIniciativa,
    // Constantes
    DURACAO_RODADA_SEGUNDOS,
    ACOES_POR_TURNO,
    CAMPO_VISAO_GRAUS,
    ALCANCE_AMEACA_PADRAO,
} from '../data/constants/regras';

// ============================================================================
// DEFESA
// ============================================================================
describe('calcularBonusDefesaAgilidade', () => {
    test.each([
        [0, 3], [1, 3], [2, 3],
        [3, 4], [4, 4], [5, 4],
        [6, 5], [7, 5], [8, 5],
        [9, 6], [10, 6], [11, 6],
        [12, 7], [15, 7],
    ])('agilidade %i → bônus %i', (agi, expected) => {
        expect(calcularBonusDefesaAgilidade(agi)).toBe(expected);
    });
});

describe('calcularDefesaTotal', () => {
    test('armadura leve: 7 + bonusAgilidade + armadura + escudo', () => {
        const r = calcularDefesaTotal({
            agilidade: 6, defesaArmadura: 2, defesaEscudo: 1,
            armaduraPesada: false
        });
        // 7 + 5 (agilidade 6) + 2 + 1 = 15
        expect(r.defesaTotal).toBe(15);
        expect(r.componentes.base).toBe(7);
        expect(r.componentes.agilidade).toBe(5);
        expect(r.armaduraPesada).toBe(false);
    });

    test('armadura pesada: armadura + escudo (sem base 7 nem agilidade)', () => {
        const r = calcularDefesaTotal({
            agilidade: 12, defesaArmadura: 14, defesaEscudo: 2,
            armaduraPesada: true
        });
        // 14 + 2 = 16 (sem base 7, sem agilidade)
        expect(r.defesaTotal).toBe(16);
        expect(r.componentes.base).toBe(0);
        expect(r.componentes.agilidade).toBe(0);
    });

    test('sem proficiência de escudo ignora escudo', () => {
        const r = calcularDefesaTotal({
            agilidade: 0, defesaArmadura: 0, defesaEscudo: 3,
            armaduraPesada: false, temProficienciaEscudo: false
        });
        // 7 + 3 (agi 0) + 0 + 0 (escudo ignorado) = 10
        expect(r.defesaTotal).toBe(10);
        expect(r.componentes.escudo).toBe(0);
    });

    test('bônus adicional soma normalmente', () => {
        const r = calcularDefesaTotal({
            agilidade: 0, defesaArmadura: 0, defesaEscudo: 0,
            armaduraPesada: false, bonusAdicional: 3
        });
        // 7 + 3 + 0 + 0 + 3 = 13
        expect(r.defesaTotal).toBe(13);
    });
});

// ============================================================================
// VELOCIDADE
// ============================================================================
describe('calcularVelocidadeMovimento', () => {
    test('humano base 9, agilidade 0 → 9m', () => {
        const r = calcularVelocidadeMovimento(9, 0);
        expect(r.velocidadeTotal).toBe(9);
    });

    test('humano base 9, agilidade 9 → 13.5m', () => {
        const r = calcularVelocidadeMovimento(9, 9);
        expect(r.velocidadeTotal).toBe(13.5);
    });

    test('armadura pesada: -1.5m', () => {
        const r = calcularVelocidadeMovimento(9, 6, true);
        // 9 + 3 - 1.5 = 10.5
        expect(r.velocidadeTotal).toBe(10.5);
        expect(r.penalidadeArmadura).toBe(PENALIDADE_VELOCIDADE_ARMADURA_PESADA);
    });

    test('velocidade mínima 0m', () => {
        const r = calcularVelocidadeMovimento(0, 0, true);
        expect(r.velocidadeTotal).toBe(0);
    });

    test('bônus adicional soma', () => {
        const r = calcularVelocidadeMovimento(9, 0, false, 3);
        expect(r.velocidadeTotal).toBe(12);
    });

    test('velocidadeEsgueirar = total - 1.5', () => {
        const r = calcularVelocidadeMovimento(9, 0);
        expect(r.velocidadeEsgueirar).toBe(7.5);
    });

    test('velocidadeDispara = total × 4', () => {
        const r = calcularVelocidadeMovimento(9, 0);
        expect(r.velocidadeDispara).toBe(36);
    });
});

// ============================================================================
// ACERTO
// ============================================================================
describe('calcularResultadoAtaque', () => {
    test('nat 1 → falha_critica (multiplicador 0)', () => {
        const r = calcularResultadoAtaque(1, 20, 10);
        expect(r.resultado).toBe('falha_critica');
        expect(r.multiplicadorDano).toBe(0);
        expect(r.isFalhaCritica).toBe(true);
    });

    test('nat 20 → acerto_critico (multiplicador 2)', () => {
        const r = calcularResultadoAtaque(20, 0, 50);
        expect(r.resultado).toBe('acerto_critico');
        expect(r.multiplicadorDano).toBe(2);
        expect(r.isCriticoNatural).toBe(true);
    });

    test('total > defesa → acerto (multiplicador 1)', () => {
        const r = calcularResultadoAtaque(15, 5, 18); // 20 > 18
        expect(r.resultado).toBe('acerto');
        expect(r.multiplicadorDano).toBe(1);
    });

    test('total === defesa → acerto_parcial (multiplicador 0.5)', () => {
        const r = calcularResultadoAtaque(10, 5, 15); // 15 == 15
        expect(r.resultado).toBe('acerto_parcial');
        expect(r.multiplicadorDano).toBe(0.5);
    });

    test('total < defesa → erro (multiplicador 0)', () => {
        const r = calcularResultadoAtaque(5, 2, 20); // 7 < 20
        expect(r.resultado).toBe('erro');
        expect(r.multiplicadorDano).toBe(0);
    });

    test('overshoot +15 → bonusDano 2', () => {
        // total = 10 + 10 = 20, defesa = 5, dif = 15
        const r = calcularResultadoAtaque(10, 10, 5);
        expect(r.resultado).toBe('acerto');
        expect(r.bonusDanoPorDiferenca).toBe(2);
    });

    test('overshoot +20 → bonusDano 3', () => {
        // total = 15 + 10 = 25, defesa = 5, dif = 20
        const r = calcularResultadoAtaque(15, 10, 5);
        expect(r.resultado).toBe('acerto');
        expect(r.bonusDanoPorDiferenca).toBe(3);
    });

    test('overshoot +10 → bonusDano 1d4 (1-4)', () => {
        // total = 10 + 5 = 15, defesa = 5, dif = 10
        const r = calcularResultadoAtaque(10, 5, 5);
        expect(r.resultado).toBe('acerto');
        expect(r.bonusDanoPorDiferenca).toBeGreaterThanOrEqual(1);
        expect(r.bonusDanoPorDiferenca).toBeLessThanOrEqual(4);
    });

    test('margem de crítico customizada', () => {
        const r = calcularResultadoAtaque(18, 0, 5, 18); // nat 18 com margem 18
        expect(r.resultado).toBe('acerto_critico');
        expect(r.margemCritico).toBe(18);
    });

    test('totalAcerto e diferença calculados corretamente', () => {
        const r = calcularResultadoAtaque(12, 3, 10);
        expect(r.totalAcerto).toBe(15);
        expect(r.diferenca).toBe(5);
    });
});

// ============================================================================
// DANO FINAL
// ============================================================================
describe('calcularDanoFinal', () => {
    test('acerto normal: dano base + atributo + bônus', () => {
        const ataque = { multiplicadorDano: 1, bonusDanoPorDiferenca: 0, isCriticoNatural: false };
        const r = calcularDanoFinal(6, ataque, 3, 1);
        // floor((6+3+1)*1) + 0 = 10
        expect(r.danoFinal).toBe(10);
    });

    test('crítico: dano × 2', () => {
        const ataque = { multiplicadorDano: 2, bonusDanoPorDiferenca: 0, isCriticoNatural: true };
        const r = calcularDanoFinal(5, ataque, 2, 0);
        // floor((5+2)*2) + 0 = 14
        expect(r.danoFinal).toBe(14);
        expect(r.isCritico).toBe(true);
    });

    test('acerto parcial: dano ÷ 2 (floor)', () => {
        const ataque = { multiplicadorDano: 0.5, bonusDanoPorDiferenca: 0, isCriticoNatural: false };
        const r = calcularDanoFinal(7, ataque, 0, 0);
        // floor(7*0.5) = 3
        expect(r.danoFinal).toBe(3);
    });

    test('erro/falha crítica: dano 0', () => {
        const ataque = { multiplicadorDano: 0, bonusDanoPorDiferenca: 0, isCriticoNatural: false };
        const r = calcularDanoFinal(10, ataque, 5, 3);
        expect(r.danoFinal).toBe(0);
        expect(r.descricao).toContain('Sem dano');
    });

    test('dano mínimo 1 (quando multiplicador > 0)', () => {
        const ataque = { multiplicadorDano: 0.5, bonusDanoPorDiferenca: 0, isCriticoNatural: false };
        const r = calcularDanoFinal(1, ataque, 0, 0);
        // floor(1*0.5)=0 → min 1
        expect(r.danoFinal).toBe(1);
    });

    test('overshoot bonus soma ao resultado', () => {
        const ataque = { multiplicadorDano: 1, bonusDanoPorDiferenca: 3, isCriticoNatural: false };
        const r = calcularDanoFinal(4, ataque, 2, 0);
        // floor((4+2)*1) + 3 = 9
        expect(r.danoFinal).toBe(9);
    });
});

// ============================================================================
// DANO ELEMENTAL
// ============================================================================
describe('calcularDanoElemental', () => {
    test('sem elemento alvo → normal', () => {
        const r = calcularDanoElemental(10, 'fogo', null);
        expect(r.danoFinal).toBe(10);
        expect(r.modificador).toBe('normal');
    });

    test('forte: fogo vs terra → ×2', () => {
        const r = calcularDanoElemental(10, 'fogo', 'terra');
        expect(r.danoFinal).toBe(20);
        expect(r.modificador).toBe('forte');
        expect(r.multiplicador).toBe(2);
    });

    test('fraco: fogo vs gelo → ÷2', () => {
        const r = calcularDanoElemental(10, 'fogo', 'gelo');
        expect(r.danoFinal).toBe(5);
        expect(r.modificador).toBe('fraco');
        expect(r.multiplicador).toBe(0.5);
    });

    test('imune: sagrado vs sagrado → 0', () => {
        const r = calcularDanoElemental(10, 'sagrado', 'sagrado');
        expect(r.danoFinal).toBe(0);
        expect(r.modificador).toBe('imune');
    });

    test('cura: necrótico vs necrótico → dano negativo', () => {
        const r = calcularDanoElemental(10, 'necrotico', 'necrotico');
        expect(r.danoFinal).toBe(-10);
        expect(r.modificador).toBe('cura');
    });

    test('tipo arcano é sempre neutro', () => {
        const r = calcularDanoElemental(8, 'arcano', 'fogo');
        expect(r.danoFinal).toBe(8);
        expect(r.modificador).toBe('normal');
    });

    test('tipo físico (cortante) é neutro', () => {
        const r = calcularDanoElemental(6, 'cortante', 'terra');
        expect(r.danoFinal).toBe(6);
    });

    test('sombrio vs fogo → forte (×2)', () => {
        const r = calcularDanoElemental(8, 'sombrio', 'fogo');
        expect(r.danoFinal).toBe(16);
        expect(r.modificador).toBe('forte');
    });

    test('sagrado vs sombrio → forte (×2)', () => {
        const r = calcularDanoElemental(10, 'sagrado', 'sombrio');
        expect(r.danoFinal).toBe(20);
    });

    test('gelo vs gelo → neutro (sem penalidade)', () => {
        const r = calcularDanoElemental(10, 'gelo', 'gelo');
        expect(r.danoFinal).toBe(10);
        expect(r.modificador).toBe('neutro');
    });

    test('fraqueza arredonda pra baixo', () => {
        const r = calcularDanoElemental(7, 'fogo', 'fogo'); // fogo fraco vs fogo
        expect(r.danoFinal).toBe(3); // floor(7/2)
    });
});

// ============================================================================
// VANTAGEM / DESVANTAGEM
// ============================================================================
describe('calcularVantagemDesvantagem', () => {
    test('0 vant, 0 desv → normal (1d20)', () => {
        const r = calcularVantagemDesvantagem(0, 0);
        expect(r.dados).toBe(1);
        expect(r.tipo).toBe('normal');
    });

    test('1 vant, 0 desv → vantagem (2d20)', () => {
        const r = calcularVantagemDesvantagem(1, 0);
        expect(r.dados).toBe(2);
        expect(r.tipo).toBe('vantagem');
    });

    test('3 vant, 1 desv → vantagem dupla (3d20)', () => {
        // diferença = 2 → 1+2 = 3 dados
        const r = calcularVantagemDesvantagem(3, 1);
        expect(r.dados).toBe(3);
        expect(r.tipo).toBe('vantagem');
    });

    test('0 vant, 1 desv → desvantagem (2d20)', () => {
        const r = calcularVantagemDesvantagem(0, 1);
        expect(r.dados).toBe(2);
        expect(r.tipo).toBe('desvantagem');
    });

    test('0 vant, 5 desv → desvantagem NÃO acumula (2d20)', () => {
        const r = calcularVantagemDesvantagem(0, 5);
        expect(r.dados).toBe(2);
        expect(r.tipo).toBe('desvantagem');
    });

    test('1 vant, 1 desv → normal (cancelam)', () => {
        const r = calcularVantagemDesvantagem(1, 1);
        expect(r.dados).toBe(1);
        expect(r.tipo).toBe('normal');
    });

    test('2 vant, 1 desv → vantagem simples (2d20)', () => {
        const r = calcularVantagemDesvantagem(2, 1);
        expect(r.dados).toBe(2);
        expect(r.tipo).toBe('vantagem');
    });
});

// ============================================================================
// CANSAÇO
// ============================================================================
describe('NIVEIS_CANSACO e getPenalidadesCansaco', () => {
    test('8 níveis de cansaço (0 a 7)', () => {
        expect(NIVEIS_CANSACO).toHaveLength(8);
    });

    test('nível 0: sem penalidades', () => {
        const n = getPenalidadesCansaco(0);
        expect(n.penalidades.ataques).toBe(0);
        expect(n.penalidades.testes).toBe(0);
        expect(n.penalidades.velocidade).toBe(0);
        expect(n.flags.desmaiado).toBe(false);
    });

    test('nível 3: -3 ataques/testes, -3m velocidade', () => {
        const n = getPenalidadesCansaco(3);
        expect(n.penalidades.ataques).toBe(-3);
        expect(n.penalidades.testes).toBe(-3);
        expect(n.penalidades.velocidade).toBe(-3);
    });

    test('nível 5: desmaiado', () => {
        const n = getPenalidadesCansaco(5);
        expect(n.flags.desmaiado).toBe(true);
        expect(n.flags.morte).toBe(false);
    });

    test('nível 7: morte', () => {
        const n = getPenalidadesCansaco(7);
        expect(n.flags.morte).toBe(true);
    });

    test('nível inválido (acima de 7) → cap no nível 7', () => {
        const n = getPenalidadesCansaco(10);
        expect(n.nivel).toBe(7);
    });

    test('nível negativo → cap no nível 0', () => {
        const n = getPenalidadesCansaco(-3);
        expect(n.nivel).toBe(0);
    });
});

// ============================================================================
// DESCANSO — funções auxiliares
// ============================================================================
describe('calcularDescansosCurto', () => {
    test('recupera 1/3 PV, 1/2 Estamina, 1/2 Magia', () => {
        const r = calcularDescansosCurto({
            vidaMax: 30, vidaAtual: 10,
            estaminaMax: 20, estaminaAtual: 5,
            magiaMax: 10, magiaAtual: 2
        });
        expect(r.vidaRecuperada).toBe(10);       // floor(30/3)
        expect(r.estaminaRecuperada).toBe(10);    // floor(20/2)
        expect(r.magiaRecuperada).toBe(5);        // floor(10/2)
        expect(r.novaVida).toBe(20);
        expect(r.novaEstamina).toBe(15);
        expect(r.novaMagia).toBe(7);
    });

    test('não excede máximo', () => {
        const r = calcularDescansosCurto({
            vidaMax: 30, vidaAtual: 28, // faltam só 2 PV
            estaminaMax: 20, estaminaAtual: 20,
            magiaMax: 10, magiaAtual: 10
        });
        expect(r.vidaRecuperada).toBe(2);
        expect(r.estaminaRecuperada).toBe(0);
        expect(r.magiaRecuperada).toBe(0);
    });
});

describe('calcularDescansoLongo', () => {
    test('recuperação total + reduz cansaço', () => {
        const r = calcularDescansoLongo({
            vidaMax: 30, estaminaMax: 20, magiaMax: 15, nivelCansaco: 3
        });
        expect(r.novaVida).toBe(30);
        expect(r.novaEstamina).toBe(20);
        expect(r.novaMagia).toBe(15);
        expect(r.novoNivelCansaco).toBe(2);
        expect(r.cansacoRemovido).toBe(1);
    });

    test('cansaço 0 permanece 0', () => {
        const r = calcularDescansoLongo({ vidaMax: 30, estaminaMax: 20, magiaMax: 10, nivelCansaco: 0 });
        expect(r.novoNivelCansaco).toBe(0);
        expect(r.cansacoRemovido).toBe(0);
    });
});

describe('verificarPodeDescansar', () => {
    test('descanso curto: 6h necessárias', () => {
        expect(verificarPodeDescansar(7, 'curto').podeDescansar).toBe(true);
        expect(verificarPodeDescansar(5, 'curto').podeDescansar).toBe(false);
        expect(verificarPodeDescansar(5, 'curto').horasRestantes).toBe(1);
    });

    test('descanso longo: 20h necessárias', () => {
        expect(verificarPodeDescansar(20, 'longo').podeDescansar).toBe(true);
        expect(verificarPodeDescansar(10, 'longo').podeDescansar).toBe(false);
    });
});

describe('verificarRequisitosDescansoLongo', () => {
    test('todos requisitos atendidos', () => {
        const r = verificarRequisitosDescansoLongo({
            temEquipamentoAcampamento: true,
            racoes: 2, aguaLitros: 1
        });
        expect(r.podeDescansar).toBe(true);
        expect(r.requisitosNaoAtendidos).toHaveLength(0);
    });

    test('ambiente seguro substitui equipamento', () => {
        const r = verificarRequisitosDescansoLongo({
            temEquipamentoAcampamento: false,
            racoes: 1, aguaLitros: 1, emAmbienteSeguro: true
        });
        expect(r.podeDescansar).toBe(true);
    });

    test('sem equipamento nem ambiente seguro → não pode', () => {
        const r = verificarRequisitosDescansoLongo({
            temEquipamentoAcampamento: false,
            racoes: 1, aguaLitros: 1, emAmbienteSeguro: false
        });
        expect(r.podeDescansar).toBe(false);
    });

    test('sem ração → não pode', () => {
        const r = verificarRequisitosDescansoLongo({
            temEquipamentoAcampamento: true,
            racoes: 0, aguaLitros: 1
        });
        expect(r.podeDescansar).toBe(false);
    });
});

// ============================================================================
// DESCANSO — processamento completo
// ============================================================================
describe('processarDescanso', () => {
    const fichaBase = {
        vidaAtual: 10, vidaMax: 30,
        estaminaAtual: 5, estaminaMax: 20,
        magiaAtual: 2, magiaMax: 10,
        nivelCansaco: 2,
        condicoesAtivas: [
            { nome: 'Fadiga', id: 'fadiga', cura: 'descanso_curto' },
            { nome: 'Veneno', id: 'veneno', cura: 'descanso_longo' },
            { nome: 'Maldição', id: 'maldicao', cura: 'magia' } // não remove por descanso
        ],
        recursos: { racoes: 3, aguaLitros: 5, temEquipamentoAcampamento: true },
        timestamps: {
            ultimoDescansoCurto: 0,
            ultimoDescansoLongo: 0
        },
        emAmbienteSeguro: false
    };

    const horaAtual = Date.now();

    test('descanso curto: recupera parcial, remove condições curtas', () => {
        const r = processarDescanso(fichaBase, 'curto', { horaAtualMs: horaAtual });
        expect(r.sucesso).toBe(true);
        expect(r.resumo.vidaRecuperada).toBe(10);       // floor(30/3)
        expect(r.resumo.estaminaRecuperada).toBe(10);    // floor(20/2)
        // Fadiga removida (cura: descanso_curto)
        expect(r.resumo.condicoesRemovidas).toContain('Fadiga');
        // Veneno e Maldição permanecem
        expect(r.novoState.condicoesAtivas).toHaveLength(2);
    });

    test('descanso longo: recuperação total + -1 cansaço + remove condições curtas e longas', () => {
        const r = processarDescanso(fichaBase, 'longo', { horaAtualMs: horaAtual });
        expect(r.sucesso).toBe(true);
        expect(r.novoState.vidaAtual).toBe(30);
        expect(r.novoState.estaminaAtual).toBe(20);
        expect(r.novoState.magiaAtual).toBe(10);
        expect(r.novoState.nivelCansaco).toBe(1); // 2 - 1
        // Fadiga e Veneno removidas; Maldição permanece
        expect(r.resumo.condicoesRemovidas).toContain('Fadiga');
        expect(r.resumo.condicoesRemovidas).toContain('Veneno');
        expect(r.novoState.condicoesAtivas).toHaveLength(1);
    });

    test('descanso longo consome ração e água', () => {
        const r = processarDescanso(fichaBase, 'longo', { horaAtualMs: horaAtual });
        expect(r.novoState.recursos.racoes).toBe(2);     // 3 - 1
        expect(r.novoState.recursos.aguaLitros).toBe(4);  // 5 - 1
    });

    test('descanso longo sem requisitos → falha', () => {
        const fichaSemRecursos = {
            ...fichaBase,
            recursos: { racoes: 0, aguaLitros: 0, temEquipamentoAcampamento: false }
        };
        const r = processarDescanso(fichaSemRecursos, 'longo', { horaAtualMs: horaAtual });
        expect(r.sucesso).toBe(false);
        expect(r.motivo).toContain('Requisitos');
    });

    test('descanso longo com ignorarRequisitos → sucesso sem recursos', () => {
        const fichaSemRecursos = {
            ...fichaBase,
            recursos: { racoes: 0, aguaLitros: 0, temEquipamentoAcampamento: false }
        };
        const r = processarDescanso(fichaSemRecursos, 'longo', {
            horaAtualMs: horaAtual,
            ignorarRequisitos: true
        });
        expect(r.sucesso).toBe(true);
    });

    test('cooldown não atingido → falha', () => {
        const fichaRecente = {
            ...fichaBase,
            timestamps: { ultimoDescansoCurto: horaAtual - (1000 * 60 * 60 * 2) } // 2h atrás
        };
        const r = processarDescanso(fichaRecente, 'curto', { horaAtualMs: horaAtual });
        expect(r.sucesso).toBe(false);
        expect(r.motivo).toContain('Faltam');
    });

    test('cooldown com ignorarCooldown → sucesso', () => {
        const fichaRecente = {
            ...fichaBase,
            timestamps: { ultimoDescansoCurto: horaAtual - (1000 * 60 * 60 * 2) }
        };
        const r = processarDescanso(fichaRecente, 'curto', {
            horaAtualMs: horaAtual,
            ignorarCooldown: true
        });
        expect(r.sucesso).toBe(true);
    });

    test('descanso longo reseta vida temporária a 0', () => {
        const fichaComVidaTemp = { ...fichaBase, vidaTemporaria: 10 };
        const r = processarDescanso(fichaComVidaTemp, 'longo', { horaAtualMs: horaAtual });
        expect(r.novoState.vidaTemporaria).toBe(0);
    });

    test('timestamps atualizados', () => {
        const r = processarDescanso(fichaBase, 'curto', { horaAtualMs: horaAtual });
        expect(r.novoState.timestamps.ultimoDescansoCurto).toBe(horaAtual);
    });
});

// ============================================================================
// DINHEIRO
// ============================================================================
describe('Sistema monetário', () => {
    test('cobreParaMoedas: 2345 cobre → otimizado', () => {
        const r = cobreParaMoedas(2345);
        expect(r.platina).toBe(2);
        expect(r.ouro).toBe(3);
        expect(r.prata).toBe(4);
        expect(r.cobre).toBe(5);
    });

    test('moedasParaCobre: ida e volta', () => {
        const moedas = { platina: 2, ouro: 3, prata: 4, cobre: 5 };
        expect(moedasParaCobre(moedas)).toBe(2345);
    });

    test('formatarMoedas: exibe apenas moedas > 0', () => {
        const r = formatarMoedas({ platina: 0, ouro: 1, prata: 0, cobre: 5 });
        expect(r).toContain('1 M.O.');
        expect(r).toContain('5 M.C.');
        expect(r).not.toContain('M.P.');
    });

    test('formatarMoedas: 0 total → "0 M.C."', () => {
        expect(formatarMoedas({})).toBe('0 M.C.');
    });
});

// ============================================================================
// INICIATIVA
// ============================================================================
describe('calcularBonusIniciativa', () => {
    test('agi + perc', () => {
        expect(calcularBonusIniciativa(5, 3)).toBe(8);
    });

    test('default 0', () => {
        expect(calcularBonusIniciativa()).toBe(0);
    });
});

describe('ordenarPorIniciativa', () => {
    test('ordena do maior para o menor', () => {
        const participantes = [
            { id: 'a', nome: 'A', total: 10, bonus: 5 },
            { id: 'b', nome: 'B', total: 18, bonus: 3 },
            { id: 'c', nome: 'C', total: 14, bonus: 7 }
        ];
        const sorted = ordenarPorIniciativa(participantes);
        expect(sorted[0].id).toBe('b');
        expect(sorted[1].id).toBe('c');
        expect(sorted[2].id).toBe('a');
    });

    test('empate: maior bônus vai primeiro', () => {
        const participantes = [
            { id: 'a', total: 15, bonus: 3 },
            { id: 'b', total: 15, bonus: 8 }
        ];
        const sorted = ordenarPorIniciativa(participantes);
        expect(sorted[0].id).toBe('b');
    });
});

// ============================================================================
// CONSTANTES FUNDAMENTAIS
// ============================================================================
describe('Constantes fundamentais', () => {
    test('rodada = 6s', () => expect(DURACAO_RODADA_SEGUNDOS).toBe(6));
    test('ações por turno = 3', () => expect(ACOES_POR_TURNO).toBe(3));
    test('campo visão = 100°', () => expect(CAMPO_VISAO_GRAUS).toBe(100));
    test('alcance ameaça padrão = 1.5m', () => expect(ALCANCE_AMEACA_PADRAO).toBe(1.5));
    test('intervalo descanso curto = 6h', () => expect(INTERVALO_DESCANSO_CURTO).toBe(6));
    test('intervalo descanso longo = 20h', () => expect(INTERVALO_DESCANSO_LONGO).toBe(20));
});
