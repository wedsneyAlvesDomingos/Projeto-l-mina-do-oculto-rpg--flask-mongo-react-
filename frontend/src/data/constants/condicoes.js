/**
 * Dados centralizados de Condições do sistema Lâmina do Oculto
 * Este arquivo contém todas as condições de status que afetam personagens.
 *
 * === SCHEMA POR CONDIÇÃO (TODO-CON-001) ===
 * id             — string identificador único
 * descricao      — texto para exibição
 * duracao        — duração padrão (string descritiva)
 * cor            — cor hex para UI
 * categoria      — 'incapacitante'|'mental'|'fisica'|'magica'|'ambiente'|'progressiva'
 * penalidades    — { defesa, ataques, testes, velocidade, percepcao }
 * flags          — { semAcoes, semReacoes, semMovimento, semConcentracao,
 *                    desvantagemAtaques, vantagemContraAlvo, vantagemAtaques,
 *                    desvantagemContraAlvo, imuneADano, criticoReduzido }
 * danoRecorrente — { valor, tipo, momento }
 * stackRegra     — 'substitui'|'acumula'|'maiorValor'|'maiorDuracao'|null
 * cura           — string descrevendo como remover
 * nivel          — int (apenas em condições progressivas com níveis)
 * niveis         — int (apenas Congelando — total de níveis possíveis)
 *
 * Usado em: characterSheet.js, Wiki/conditions
 */

// ============================================================================
// CORES PADRÃO POR CATEGORIA
// ============================================================================
export const CORES_CONDICOES = {
    incapacitante: '#931C4A',
    mental: '#162A22',
    fisica: '#7B3311',
    magica: '#454E30',
    ambiente: '#2F3C29',
    progressiva: '#5B1F0F',
};

// ============================================================================
// TODAS AS 32 CONDIÇÕES — DADOS COMPLETOS
// ============================================================================
export const condicoesDisponiveis = {

    // ── INCAPACITANTES ─────────────────────────────────────────────────

    'Atordoado': {
        id: 'atordoado',
        descricao: 'Não pode usar ações, reações e não pode se mover. Defesa -2. Ataques contra ele têm crítico em 1 número abaixo.',
        duracao: '2 rodadas',
        cor: '#931C4A',
        categoria: 'incapacitante',
        penalidades: { defesa: -2, ataques: null, testes: null, velocidade: 0, percepcao: null },
        flags: {
            semAcoes: true, semReacoes: true, semMovimento: true, semConcentracao: true,
            desvantagemAtaques: false, vantagemContraAlvo: true,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: 1
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'fim_duracao'
    },

    'Incapacitado': {
        id: 'incapacitado',
        descricao: 'Cai deitado e fica atordoado. Não pode usar ações, reações e não pode se mover. Defesa -2.',
        duracao: '2 rodadas',
        cor: '#931C4A',
        categoria: 'incapacitante',
        penalidades: { defesa: -2, ataques: null, testes: null, velocidade: 0, percepcao: null },
        flags: {
            semAcoes: true, semReacoes: true, semMovimento: true, semConcentracao: true,
            desvantagemAtaques: false, vantagemContraAlvo: true,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'fim_duracao'
    },

    'Paralisado': {
        id: 'paralisado',
        descricao: 'Atordoado + corpo travado. Ataques corpo a corpo contra o alvo têm vantagem.',
        duracao: '2 rodadas',
        cor: '#162A22',
        categoria: 'incapacitante',
        penalidades: { defesa: -2, ataques: null, testes: null, velocidade: 0, percepcao: null },
        flags: {
            semAcoes: true, semReacoes: true, semMovimento: true, semConcentracao: true,
            desvantagemAtaques: false, vantagemContraAlvo: true,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'fim_duracao_ou_magia'
    },

    'À Beira da Morte': {
        id: 'beira_morte',
        descricao: 'Incapacitado. Faz testes de morte a cada rodada (d20: 10+ sucesso, 9- falha). 3 sucessos estabiliza, 3 falhas morte. Dano recebido = falha automática. Cura tira do estado.',
        duracao: 'Até estabilizar ou morrer',
        cor: '#40150A',
        categoria: 'incapacitante',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: 0, percepcao: null },
        flags: {
            semAcoes: true, semReacoes: true, semMovimento: true, semConcentracao: true,
            desvantagemAtaques: false, vantagemContraAlvo: true,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'cura_hp_qualquer'
    },

    // ── FÍSICAS ────────────────────────────────────────────────────────

    'Cego': {
        id: 'cego',
        descricao: 'Desvantagem em percepção (visão). +2 dificuldade em ações que precisam de visão. Se também surdo: -10 adicional em habilidades.',
        duracao: 'Até curar',
        cor: '#162A22',
        categoria: 'fisica',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: null, percepcao: -5 },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: true, vantagemContraAlvo: true,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'magia_cura'
    },

    'Agarrado': {
        id: 'agarrado',
        descricao: 'Velocidade vira zero. Atacar é possível, mas com desvantagem. Pode tentar se soltar.',
        duracao: 'Até se soltar',
        cor: '#7B3311',
        categoria: 'fisica',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: 0, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: true, semConcentracao: false,
            desvantagemAtaques: true, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'teste_acrobacia_ou_forca'
    },

    'Imobilizado': {
        id: 'imobilizado',
        descricao: 'Velocidade vira zero. -2 em Defesa e sem bônus de Agilidade/Escudo.',
        duracao: '2 rodadas',
        cor: '#BB8130',
        categoria: 'fisica',
        penalidades: { defesa: -2, ataques: null, testes: null, velocidade: 0, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: true, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'fim_duracao'
    },

    'Atrofiado': {
        id: 'atrofiado',
        descricao: '-3 em todos os testes. Metade do movimento.',
        duracao: '2 rodadas',
        cor: '#424242',
        categoria: 'fisica',
        penalidades: { defesa: null, ataques: null, testes: -3, velocidade: 'metade', percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'fim_duracao'
    },

    'Restringido': {
        id: 'restringido',
        descricao: 'Movimento zero. Desvantagem em ataques. Perde 1 ação/turno.',
        duracao: '2 rodadas',
        cor: '#756A34',
        categoria: 'fisica',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: 0, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: true, semConcentracao: false,
            desvantagemAtaques: true, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'fim_duracao_ou_teste'
    },

    'Deitado': {
        id: 'deitado',
        descricao: '-1 acerto. Inimigos: +1 corpo a corpo, -1 à distância contra você.',
        duracao: 'Até levantar',
        cor: '#5B1F0F',
        categoria: 'fisica',
        penalidades: { defesa: null, ataques: -1, testes: null, velocidade: null, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'acao_levantar'
    },

    'Surdo': {
        id: 'surdo',
        descricao: '-5 em percepção (som). Se também cego: -10 adicional em habilidades.',
        duracao: 'Até curar',
        cor: '#2F3C29',
        categoria: 'fisica',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: null, percepcao: -5 },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'magia_cura'
    },

    'Sangrando': {
        id: 'sangrando',
        descricao: '2 dano no início do turno. Cura: Medicina CD 12 ou magia de cura.',
        duracao: 'Até curar',
        cor: '#931C4A',
        categoria: 'fisica',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: null, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: '2', tipo: 'sangramento', momento: 'inicioTurno' },
        stackRegra: 'substitui',
        cura: 'medicina_CD12_ou_magia'
    },

    'Envenenado': {
        id: 'envenenado',
        descricao: 'Sofre dano de veneno a cada turno. Efeitos dependem do tipo de veneno.',
        duracao: 'Variável',
        cor: '#454E30',
        categoria: 'fisica',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: null, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: '1d4', tipo: 'veneno', momento: 'inicioTurno' },
        stackRegra: 'maiorValor',
        cura: 'teste_fortitude_ou_medicina'
    },

    // ── MENTAIS ────────────────────────────────────────────────────────

    'Amedrontado': {
        id: 'amedrontado',
        descricao: '-2 em testes/ataques enquanto vê a fonte do medo. Não pode se aproximar voluntariamente.',
        duracao: '2 rodadas',
        cor: '#5B1F0F',
        categoria: 'mental',
        penalidades: { defesa: null, ataques: -2, testes: -2, velocidade: null, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'maiorDuracao',
        cura: 'fim_duracao_ou_distancia'
    },

    'Aterrorizado': {
        id: 'aterrorizado',
        descricao: '-1 em todos os testes. Deve fugir da fonte de terror.',
        duracao: '2 rodadas',
        cor: '#5B1F0F',
        categoria: 'mental',
        penalidades: { defesa: null, ataques: null, testes: -1, velocidade: null, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'maiorDuracao',
        cura: 'fim_duracao_ou_distancia'
    },

    'Surpreso': {
        id: 'surpreso',
        descricao: 'Não age/reage. Defesa -2. Crítico contra em 1 número abaixo.',
        duracao: '1 rodada',
        cor: '#756A34',
        categoria: 'mental',
        penalidades: { defesa: -2, ataques: null, testes: null, velocidade: null, percepcao: null },
        flags: {
            semAcoes: true, semReacoes: true, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: true,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: 1
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'fim_do_turno'
    },

    // ── MÁGICAS ────────────────────────────────────────────────────────

    'Encantado': {
        id: 'encantado',
        descricao: 'Não pode atacar o encantador. Encantador tem vantagem social. Quebra se sofrer dano ou aliado sofrer.',
        duracao: 'Até quebrar',
        cor: '#AB6422',
        categoria: 'magica',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: null, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'dano_ao_alvo_ou_aliado'
    },

    'Dominado': {
        id: 'dominado',
        descricao: 'Perde controle temporariamente. Obedece comandos básicos exceto suicídio/autolesão.',
        duracao: 'Até quebrar',
        cor: '#40150A',
        categoria: 'magica',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: null, percepcao: null },
        flags: {
            semAcoes: true, semReacoes: false, semMovimento: false, semConcentracao: true,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'dano_ou_teste_resistencia'
    },

    'Enfeitiçado': {
        id: 'enfeiticado',
        descricao: 'Não age. Só observa o encantador. Quebra com ação de aliado ou dano.',
        duracao: 'Até quebrar',
        cor: '#756A34',
        categoria: 'magica',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: null, percepcao: null },
        flags: {
            semAcoes: true, semReacoes: false, semMovimento: false, semConcentracao: true,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'acao_aliado_ou_dano'
    },

    'Invisível': {
        id: 'invisivel',
        descricao: 'Não pode ser visto. Ataques contra têm desvantagem. Ataques dele têm vantagem. Ainda faz barulho.',
        duracao: 'Variável',
        cor: '#454E30',
        categoria: 'magica',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: null, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: true, desvantagemContraAlvo: true,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'atacar_ou_conjurar'
    },

    'Petrificado': {
        id: 'petrificado',
        descricao: 'Vira pedra. Peso x10. Tempo não passa. Imune a dano (não-contundente) e veneno.',
        duracao: 'Até curar',
        cor: '#2F3C29',
        categoria: 'magica',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: 0, percepcao: null },
        flags: {
            semAcoes: true, semReacoes: true, semMovimento: true, semConcentracao: true,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: true, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'magia_especial'
    },

    'Devagar': {
        id: 'devagar',
        descricao: 'Metade do movimento. 1 ataque/ação. +1 ação de custo em tudo.',
        duracao: 'Variável',
        cor: '#454E30',
        categoria: 'magica',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: 'metade', percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'fim_duracao'
    },

    // ── PROGRESSIVAS ───────────────────────────────────────────────────

    'Cansado (Leve)': {
        id: 'cansado_1',
        descricao: '-1 em todas as jogadas de ataque e habilidade.',
        duracao: 'Até descansar',
        nivel: 1,
        cor: '#AB6422',
        categoria: 'progressiva',
        penalidades: { defesa: null, ataques: -1, testes: -1, velocidade: null, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'acumula',
        cura: 'descanso_longo'
    },

    'Cansado (Moderado)': {
        id: 'cansado_2',
        descricao: '-2 em ataques/habilidade. -1,5m velocidade.',
        duracao: 'Até descansar',
        nivel: 2,
        cor: '#7B3311',
        categoria: 'progressiva',
        penalidades: { defesa: null, ataques: -2, testes: -2, velocidade: -1.5, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'acumula',
        cura: 'descanso_longo'
    },

    'Cansado (Sufocante)': {
        id: 'cansado_3',
        descricao: '-3 em ataques/habilidade. -1,5m velocidade.',
        duracao: 'Até descansar',
        nivel: 3,
        cor: '#5B1F0F',
        categoria: 'progressiva',
        penalidades: { defesa: null, ataques: -3, testes: -3, velocidade: -1.5, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'acumula',
        cura: 'descanso_longo'
    },

    'Cansado (Avassalador)': {
        id: 'cansado_4',
        descricao: '-4 em ataques/habilidade. -1,5m velocidade.',
        duracao: 'Até descansar',
        nivel: 4,
        cor: '#40150A',
        categoria: 'progressiva',
        penalidades: { defesa: null, ataques: -4, testes: -4, velocidade: -1.5, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'acumula',
        cura: 'descanso_longo'
    },

    'Cansado (Esmagador)': {
        id: 'cansado_5',
        descricao: '-5 em ataques/habilidade. -3m velocidade.',
        duracao: 'Até descansar',
        nivel: 5,
        cor: '#2F3C29',
        categoria: 'progressiva',
        penalidades: { defesa: null, ataques: -5, testes: -5, velocidade: -3, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'acumula',
        cura: 'descanso_longo'
    },

    'Cansado (Exaustivo)': {
        id: 'cansado_6',
        descricao: '-6 em ataques/habilidade. -3m velocidade.',
        duracao: 'Até descansar',
        nivel: 6,
        cor: '#162A22',
        categoria: 'progressiva',
        penalidades: { defesa: null, ataques: -6, testes: -6, velocidade: -3, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'acumula',
        cura: 'descanso_longo'
    },

    'Cansado (Desesperador)': {
        id: 'cansado_7',
        descricao: '-7 em ataques/habilidade. -4,5m velocidade. 3 dano/rodada em combate.',
        duracao: 'Até descansar',
        nivel: 7,
        cor: '#931C4A',
        categoria: 'progressiva',
        penalidades: { defesa: null, ataques: -7, testes: -7, velocidade: -4.5, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: '3', tipo: 'exaustao', momento: 'inicioTurno' },
        stackRegra: 'acumula',
        cura: 'descanso_longo'
    },

    'Congelando': {
        id: 'congelando',
        descricao: 'Progressivo: -velocidade, desvantagem, -ações. 9ª rodada: Atordoado. 20ª rodada: Morte.',
        duracao: 'Progressivo',
        niveis: 20,
        cor: '#2F3C29',
        categoria: 'progressiva',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: 'progressivo', percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: 'frio', momento: null },
        stackRegra: 'acumula',
        cura: 'calor_ou_fogueira'
    },

    // ── AMBIENTE ───────────────────────────────────────────────────────

    'Queimando (Nível 1)': {
        id: 'queimando_1',
        descricao: '1d4 dano de fogo por rodada. Apagar: água ou rolar no chão.',
        duracao: 'Até apagar',
        nivel: 1,
        cor: '#7B3311',
        categoria: 'ambiente',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: null, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: '1d4', tipo: 'fogo', momento: 'inicioTurno' },
        stackRegra: 'maiorValor',
        cura: 'agua_ou_rolar_no_chao'
    },

    'Queimando (Nível 2)': {
        id: 'queimando_2',
        descricao: '1d6 dano de fogo por rodada. Maior área de fogo.',
        duracao: 'Até apagar',
        nivel: 2,
        cor: '#AB6422',
        categoria: 'ambiente',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: null, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: '1d6', tipo: 'fogo', momento: 'inicioTurno' },
        stackRegra: 'maiorValor',
        cura: 'agua_ou_rolar_no_chao'
    },

    'Queimando (Nível 3)': {
        id: 'queimando_3',
        descricao: '1d8 dano de fogo por rodada. Fogo intenso.',
        duracao: 'Até apagar',
        nivel: 3,
        cor: '#BB8130',
        categoria: 'ambiente',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: null, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: '1d8', tipo: 'fogo', momento: 'inicioTurno' },
        stackRegra: 'maiorValor',
        cura: 'agua_ou_rolar_no_chao'
    }
};

// ============================================================================
// DERIVADOS
// ============================================================================

/** Array com todas as condições (inclui nome como campo) */
export const condicoesArray = Object.entries(condicoesDisponiveis).map(([nome, dados]) => ({
    nome,
    ...dados
}));

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Busca condição pelo id ou nome (chave do objeto)
 * @param {string} idOuNome - Id interno ou nome de exibição
 * @returns {Object|null} Condição com campo `nome` adicionado, ou null
 */
export const getCondicao = (idOuNome) => {
    if (condicoesDisponiveis[idOuNome]) {
        return { nome: idOuNome, ...condicoesDisponiveis[idOuNome] };
    }
    const entry = Object.entries(condicoesDisponiveis).find(([_, d]) => d.id === idOuNome);
    if (entry) {
        return { nome: entry[0], ...entry[1] };
    }
    return null;
};

/**
 * Retorna condições filtradas por categoria
 * @param {string} categoria - 'incapacitante'|'mental'|'fisica'|'magica'|'ambiente'|'progressiva'
 * @returns {Array}
 */
export const getCondicoesPorCategoria = (categoria) => {
    return condicoesArray.filter(c => c.categoria === categoria);
};

/**
 * Retorna resumo (nome + descricao + cor) de uma condição
 * @param {string} idOuNome
 * @returns {Object|null}
 */
export const getCondicaoResumo = (idOuNome) => {
    const cond = getCondicao(idOuNome);
    if (!cond) return null;
    return { nome: cond.nome, descricao: cond.descricao, cor: cond.cor };
};

/**
 * Retorna todas as condições que possuem determinada flag ativa
 * @param {string} flagName - Nome da flag (ex: 'semAcoes', 'desvantagemAtaques')
 * @returns {Array}
 */
export const getCondicoesComFlag = (flagName) => {
    return condicoesArray.filter(c => c.flags && c.flags[flagName] === true);
};

/**
 * Retorna todas as condições que causam dano recorrente
 * @returns {Array}
 */
export const getCondicoesComDanoRecorrente = () => {
    return condicoesArray.filter(c =>
        c.danoRecorrente && c.danoRecorrente.valor !== null
    );
};

/**
 * Verifica se uma condição impede ações (semAcoes === true)
 * @param {string} idOuNome
 * @returns {boolean}
 */
export const isCondicaoIncapacitante = (idOuNome) => {
    const cond = getCondicao(idOuNome);
    return cond ? (cond.flags?.semAcoes === true) : false;
};

/** Lista de categorias para UI */
export const categoriasCondicoes = [
    { id: 'incapacitante', nome: 'Incapacitante', cor: CORES_CONDICOES.incapacitante },
    { id: 'mental', nome: 'Mental', cor: CORES_CONDICOES.mental },
    { id: 'fisica', nome: 'Física', cor: CORES_CONDICOES.fisica },
    { id: 'magica', nome: 'Mágica', cor: CORES_CONDICOES.magica },
    { id: 'ambiente', nome: 'Ambiente', cor: CORES_CONDICOES.ambiente },
    { id: 'progressiva', nome: 'Progressiva', cor: CORES_CONDICOES.progressiva },
];
