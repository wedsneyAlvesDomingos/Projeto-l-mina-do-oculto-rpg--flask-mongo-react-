/**
 * Testes unitários — condicoes.js
 * TODO-TST-003 · Fase 5
 *
 * Cobertura: lookup, aplicar/remover condições, processar efeitos de rodada,
 * teste de morte, helpers de flag e dano recorrente.
 */
import {
    condicoesDisponiveis,
    condicoesArray,
    CORES_CONDICOES,
    getCondicao,
    getCondicaoResumo,
    getCondicoesComFlag,
    getCondicoesComDanoRecorrente,
    isCondicaoIncapacitante,
    categoriasCondicoes,
    aplicarCondicao,
    removerCondicao,
    processarEfeitosDeRodada,
    processarTesteDeMorte,
} from '../data/constants/condicoes';

// ============================================================================
// Helpers de base
// ============================================================================

/** Cria um fichaState mínimo para testes */
const criarFichaBase = (extras = {}) => ({
    habilidades: { fortitude: 5 },
    recursos: { pvAtual: 20, pvMax: 30, estaminaAtual: 15, estaminaMax: 20 },
    condicoesAtivas: [],
    modificadores: { defesa: 0, ataques: 0, testes: 0, velocidade: 0, percepcao: 0 },
    flags: {},
    testeMorte: { sucessos: 0, falhas: 0 },
    ...extras,
});

// ============================================================================
// Dados estruturais
// ============================================================================
describe('Dados de condições', () => {
    test('condicoesDisponiveis é objeto com 28+ condições', () => {
        expect(typeof condicoesDisponiveis).toBe('object');
        expect(Object.keys(condicoesDisponiveis).length).toBeGreaterThanOrEqual(28);
    });

    test('condicoesArray é array', () => {
        expect(Array.isArray(condicoesArray)).toBe(true);
        expect(condicoesArray.length).toBeGreaterThanOrEqual(28);
    });

    test('CORES_CONDICOES tem 6 categorias', () => {
        expect(Object.keys(CORES_CONDICOES)).toHaveLength(6);
    });

    test('categoriasCondicoes tem 6 categorias', () => {
        expect(categoriasCondicoes).toHaveLength(6);
    });

    test('cada condição tem schema obrigatório', () => {
        for (const cond of condicoesArray) {
            expect(cond).toHaveProperty('id');
            expect(cond).toHaveProperty('descricao');
            expect(cond).toHaveProperty('categoria');
            expect(cond).toHaveProperty('penalidades');
            expect(cond).toHaveProperty('flags');
            expect(cond).toHaveProperty('stackRegra');
        }
    });
});

// ============================================================================
// Lookup
// ============================================================================
describe('getCondicao', () => {
    test('busca por id', () => {
        const c = getCondicao('atordoado');
        expect(c).not.toBeNull();
        expect(c.id).toBe('atordoado');
    });

    test('busca por nome', () => {
        const c = getCondicao('Atordoado');
        expect(c).not.toBeNull();
        expect(c.id).toBe('atordoado');
    });

    test('inexistente → null', () => {
        expect(getCondicao('inventado')).toBeNull();
    });
});

describe('getCondicaoResumo', () => {
    test('retorna nome, descrição e cor', () => {
        const r = getCondicaoResumo('atordoado');
        expect(r).not.toBeNull();
        expect(r).toHaveProperty('nome');
        expect(r).toHaveProperty('descricao');
        expect(r).toHaveProperty('cor');
    });

    test('inexistente → null', () => {
        expect(getCondicaoResumo('xyz')).toBeNull();
    });
});

describe('isCondicaoIncapacitante', () => {
    test('atordoado é incapacitante', () => {
        expect(isCondicaoIncapacitante('atordoado')).toBe(true);
    });

    test('amedrontado NÃO é incapacitante (semAcoes = false)', () => {
        expect(isCondicaoIncapacitante('amedrontado')).toBe(false);
    });
});

describe('getCondicoesComFlag', () => {
    test('semAcoes → pelo menos 4', () => {
        const r = getCondicoesComFlag('semAcoes');
        expect(r.length).toBeGreaterThanOrEqual(4);
    });

    test('vantagemContraAlvo → inclui atordoado', () => {
        const r = getCondicoesComFlag('vantagemContraAlvo');
        expect(r.some(c => c.id === 'atordoado')).toBe(true);
    });
});

describe('getCondicoesComDanoRecorrente', () => {
    test('retorna condições com dano recorrente', () => {
        const r = getCondicoesComDanoRecorrente();
        expect(r.length).toBeGreaterThanOrEqual(1);
        r.forEach(c => {
            expect(c.danoRecorrente.valor).not.toBeNull();
        });
    });
});

// ============================================================================
// aplicarCondicao
// ============================================================================
describe('aplicarCondicao', () => {
    test('aplica condição nova: modificadores recalculados', () => {
        const ficha = criarFichaBase();
        const novo = aplicarCondicao(ficha, 'atordoado', { fonte: 'teste', duracao: 2 });

        expect(novo.condicoesAtivas).toHaveLength(1);
        expect(novo.condicoesAtivas[0].condicaoId).toBe('atordoado');
        expect(novo.condicoesAtivas[0].duracaoRestante).toBe(2);
        expect(novo.modificadores.defesa).toBe(-2);
        expect(novo.flags.semAcoes).toBe(true);
        expect(novo.flags.vantagemContraAlvo).toBe(true);
    });

    test('stackRegra substitui: substitui existente', () => {
        let ficha = criarFichaBase();
        ficha = aplicarCondicao(ficha, 'atordoado', { duracao: 2 });
        ficha = aplicarCondicao(ficha, 'atordoado', { duracao: 5 });
        // Continua com 1 só
        expect(ficha.condicoesAtivas).toHaveLength(1);
        expect(ficha.condicoesAtivas[0].duracaoRestante).toBe(5);
    });

    test('stackRegra acumula: incrementa intensidade', () => {
        let ficha = criarFichaBase();
        // Precisamos de uma condição com stackRegra 'acumula'
        // Congelando tem acumula
        ficha = aplicarCondicao(ficha, 'congelando', { intensidade: 1 });
        ficha = aplicarCondicao(ficha, 'congelando', { intensidade: 1 });
        const cond = ficha.condicoesAtivas.find(c => c.condicaoId === 'congelando');
        expect(cond.intensidade).toBe(2);
    });

    test('stackRegra maiorValor: mantem maior intensidade', () => {
        let ficha = criarFichaBase();
        // Envenenado tem stackRegra 'maiorValor'
        ficha = aplicarCondicao(ficha, 'envenenado', { intensidade: 3 });
        ficha = aplicarCondicao(ficha, 'envenenado', { intensidade: 1 }); // menor → ignorado
        const cond = ficha.condicoesAtivas.find(c => c.condicaoId === 'envenenado');
        expect(cond.intensidade).toBe(3);
    });

    test('stackRegra maiorValor: substitui se novo for maior', () => {
        let ficha = criarFichaBase();
        ficha = aplicarCondicao(ficha, 'envenenado', { intensidade: 1 });
        ficha = aplicarCondicao(ficha, 'envenenado', { intensidade: 5 });
        const cond = ficha.condicoesAtivas.find(c => c.condicaoId === 'envenenado');
        expect(cond.intensidade).toBe(5);
    });

    test('condição inexistente retorna ficha inalterada', () => {
        const ficha = criarFichaBase();
        const novo = aplicarCondicao(ficha, 'naoexiste');
        expect(novo).toBe(ficha);
    });

    test('múltiplas condições: pior penalidade prevalece', () => {
        let ficha = criarFichaBase();
        ficha = aplicarCondicao(ficha, 'atordoado'); // defesa -2
        ficha = aplicarCondicao(ficha, 'paralisado'); // defesa -2
        // Pior (mais negativa) = -2
        expect(ficha.modificadores.defesa).toBe(-2);
        expect(ficha.condicoesAtivas).toHaveLength(2);
    });

    test('imutabilidade: fichaState original não é modificada', () => {
        const ficha = criarFichaBase();
        const copia = JSON.parse(JSON.stringify(ficha));
        aplicarCondicao(ficha, 'atordoado');
        expect(ficha.condicoesAtivas).toHaveLength(0);
        expect(ficha).toEqual(copia);
    });
});

// ============================================================================
// removerCondicao
// ============================================================================
describe('removerCondicao', () => {
    test('remove condição e recalcula modificadores', () => {
        let ficha = criarFichaBase();
        ficha = aplicarCondicao(ficha, 'atordoado', { duracao: 2 });
        expect(ficha.modificadores.defesa).toBe(-2);

        ficha = removerCondicao(ficha, 'atordoado');
        expect(ficha.condicoesAtivas).toHaveLength(0);
        expect(ficha.modificadores.defesa).toBe(0);
        expect(ficha.flags.semAcoes).toBeUndefined();
    });

    test('remover condição inexistente não causa erro', () => {
        const ficha = criarFichaBase();
        const novo = removerCondicao(ficha, 'naoexiste');
        expect(novo.condicoesAtivas).toHaveLength(0);
    });

    test('remover uma de várias condições: penalidade restante preservada', () => {
        let ficha = criarFichaBase();
        ficha = aplicarCondicao(ficha, 'atordoado');  // defesa -2
        ficha = aplicarCondicao(ficha, 'amedrontado'); // adiciona flag desvantagemAtaques
        ficha = removerCondicao(ficha, 'atordoado');
        expect(ficha.condicoesAtivas).toHaveLength(1);
        expect(ficha.condicoesAtivas[0].condicaoId).toBe('amedrontado');
    });
});

// ============================================================================
// processarEfeitosDeRodada
// ============================================================================
describe('processarEfeitosDeRodada', () => {
    test('decrementa duração e remove condições expiradas', () => {
        let ficha = criarFichaBase();
        ficha = aplicarCondicao(ficha, 'atordoado', { duracao: 1 }); // 1 rodada restante
        const { novoState, log } = processarEfeitosDeRodada(ficha, 'fimTurno');

        // duração 1 → 0 → removida
        expect(novoState.condicoesAtivas).toHaveLength(0);
        expect(log.some(l => l.includes('expirou'))).toBe(true);
    });

    test('condição com duração 2 decrementa para 1', () => {
        let ficha = criarFichaBase();
        ficha = aplicarCondicao(ficha, 'atordoado', { duracao: 2 });
        const { novoState } = processarEfeitosDeRodada(ficha, 'fimTurno');

        expect(novoState.condicoesAtivas).toHaveLength(1);
        expect(novoState.condicoesAtivas[0].duracaoRestante).toBe(1);
    });

    test('condição sem duração (null) permanece indefinidamente', () => {
        let ficha = criarFichaBase();
        ficha = aplicarCondicao(ficha, 'atordoado', { duracao: null });
        const { novoState } = processarEfeitosDeRodada(ficha, 'fimTurno');

        expect(novoState.condicoesAtivas).toHaveLength(1);
    });

    test('dano recorrente aplica no momento correto', () => {
        // Envenenado tem danoRecorrente: { valor: '1d4', tipo: 'veneno', momento: 'inicioTurno' }
        jest.spyOn(Math, 'random').mockReturnValue(0.5); // 1d4 → floor(0.5*4)+1 = 3
        const ficha = criarFichaBase({
            condicoesAtivas: [{
                condicaoId: 'envenenado',
                nome: 'Envenenado',
                fonte: 'teste',
                duracaoRestante: 3,
                intensidade: 1,
            }],
            recursos: { pvAtual: 20, pvMax: 30 }
        });

        const { novoState, log } = processarEfeitosDeRodada(ficha, 'inicioTurno');

        expect(novoState.recursos.pvAtual).toBeLessThan(20);
        expect(log.length).toBeGreaterThan(0);
        expect(log[0]).toContain('envenenado');
        jest.restoreAllMocks();
    });

    test('dano recorrente NÃO aplica no momento errado', () => {
        // Envenenado dano recorrente momento = 'inicioTurno' → fimTurno não deve causar dano
        const ficha = criarFichaBase({
            condicoesAtivas: [{
                condicaoId: 'envenenado',
                nome: 'Envenenado',
                fonte: 'teste',
                duracaoRestante: 3,
                intensidade: 1,
            }],
            recursos: { pvAtual: 20, pvMax: 30 }
        });

        const { novoState } = processarEfeitosDeRodada(ficha, 'fimTurno');
        // PV não deveria mudar (dano recorrente só aplica no momento certo)
        expect(novoState.recursos.pvAtual).toBe(20);
    });

    test('modificadores recalculados após remoção de condição', () => {
        let ficha = criarFichaBase();
        ficha = aplicarCondicao(ficha, 'atordoado', { duracao: 1 });
        expect(ficha.modificadores.defesa).toBe(-2);

        const { novoState } = processarEfeitosDeRodada(ficha, 'fimTurno');
        expect(novoState.modificadores.defesa).toBe(0);
    });
});

// ============================================================================
// processarTesteDeMorte
// ============================================================================
describe('processarTesteDeMorte', () => {
    // Como usa Math.random(), vamos mockar

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('nat 20 → estabiliza + cura fortitude PV', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.95); // → floor(0.95*20)+1 = 20
        const ficha = criarFichaBase({
            testeMorte: { sucessos: 0, falhas: 0 },
            habilidades: { fortitude: 5 },
            recursos: { pvAtual: 0, pvMax: 30 }
        });

        const { resultado, rolagemD20, novoState } = processarTesteDeMorte(ficha);
        expect(rolagemD20).toBe(20);
        expect(resultado).toBe('critico_estabilizado');
        expect(novoState.recursos.pvAtual).toBe(5); // 0 + fortitude(5)
    });

    test('nat 1 → 2 falhas', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0); // → floor(0*20)+1 = 1
        const ficha = criarFichaBase({
            testeMorte: { sucessos: 0, falhas: 0 }
        });

        const { resultado, rolagemD20, novoState } = processarTesteDeMorte(ficha);
        expect(rolagemD20).toBe(1);
        expect(novoState.testeMorte.falhas).toBe(2);
    });

    test('rolagem >= 10 → 1 sucesso', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.5); // → floor(0.5*20)+1 = 11
        const ficha = criarFichaBase({
            testeMorte: { sucessos: 2, falhas: 0 }
        });

        const { novoState, rolagemD20 } = processarTesteDeMorte(ficha);
        expect(rolagemD20).toBeGreaterThanOrEqual(10);
        expect(novoState.testeMorte.sucessos).toBe(3);
    });

    test('rolagem < 10 → 1 falha', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.2); // → floor(0.2*20)+1 = 5
        const ficha = criarFichaBase({
            testeMorte: { sucessos: 0, falhas: 1 }
        });

        const { novoState, rolagemD20 } = processarTesteDeMorte(ficha);
        expect(rolagemD20).toBeLessThan(10);
        expect(novoState.testeMorte.falhas).toBe(2);
    });

    test('5 sucessos → estabilizado', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.5); // → 11 (sucesso)
        const ficha = criarFichaBase({
            testeMorte: { sucessos: 4, falhas: 0 } // próximo sucesso = 5
        });

        const { resultado } = processarTesteDeMorte(ficha);
        expect(resultado).toBe('estabilizado');
    });

    test('3 falhas → morte', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.2); // → 5 (falha)
        const ficha = criarFichaBase({
            testeMorte: { sucessos: 0, falhas: 2 } // próxima falha = 3
        });

        const { resultado } = processarTesteDeMorte(ficha);
        expect(resultado).toBe('morte');
    });

    test('nat 1 com 2 falhas acumuladas → morte (2 + 2 = 4 ≥ 3)', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0); // → 1 (nat 1 = +2 falhas)
        const ficha = criarFichaBase({
            testeMorte: { sucessos: 0, falhas: 2 }
        });

        const { resultado, novoState } = processarTesteDeMorte(ficha);
        expect(novoState.testeMorte.falhas).toBe(4);
        expect(resultado).toBe('morte');
    });

    test('resultado continua enquanto abaixo dos limiares', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.5); // → 11 (sucesso)
        const ficha = criarFichaBase({
            testeMorte: { sucessos: 1, falhas: 1 }
        });

        const { resultado } = processarTesteDeMorte(ficha);
        expect(resultado).toBe('continua');
    });
});
