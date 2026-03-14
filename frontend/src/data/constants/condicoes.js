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
 * niveis         — int (total de níveis possíveis para condições progressivas)
 * niveisDetalhes — Array<{ nivel, nome?, descricao, penalidades?, flags?,
 *                    danoRecorrente?, condicaoAplicada?, acoesReduzidas? }>
 *                  (detalhes por nível para condições progressivas)
 * condicoesImplicitas — Array<string> (nomes de condições que esta aplica automaticamente;
 *                       ex: Escondido → ['Obscurecido'], Paralisado → ['Atordoado'])
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
// TODAS AS CONDIÇÕES — DADOS COMPLETOS (inclui progressivas com niveisDetalhes)
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
        cura: 'fim_duracao',
        condicoesImplicitas: ['Deitado', 'Atordoado'],
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
        cura: 'fim_duracao_ou_magia',
        condicoesImplicitas: ['Atordoado'],
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
        cura: 'cura_hp_qualquer',
        condicoesImplicitas: ['Incapacitado'],
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

    'Cansado': {
        id: 'cansado',
        descricao: 'Exaustão progressiva (7 níveis). Penalidades crescentes em ataques, habilidades e velocidade.',
        duracao: 'Até descansar',
        niveis: 7,
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
        cura: 'descanso_longo',
        niveisDetalhes: [
            {
                nivel: 1, nome: 'Leve',
                descricao: '-1 em todas as jogadas de ataque e habilidade.',
                penalidades: { defesa: null, ataques: -1, testes: -1, velocidade: null, percepcao: null },
                flags: { semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false, desvantagemAtaques: false, vantagemContraAlvo: false, vantagemAtaques: false, desvantagemContraAlvo: false, imuneADano: false, criticoReduzido: null },
                danoRecorrente: { valor: null, tipo: null, momento: null },
            },
            {
                nivel: 2, nome: 'Moderado',
                descricao: '-2 em ataques/habilidade. -1,5m velocidade.',
                penalidades: { defesa: null, ataques: -2, testes: -2, velocidade: -1.5, percepcao: null },
                flags: { semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false, desvantagemAtaques: false, vantagemContraAlvo: false, vantagemAtaques: false, desvantagemContraAlvo: false, imuneADano: false, criticoReduzido: null },
                danoRecorrente: { valor: null, tipo: null, momento: null },
            },
            {
                nivel: 3, nome: 'Sufocante',
                descricao: '-3 em ataques/habilidade. -1,5m velocidade.',
                penalidades: { defesa: null, ataques: -3, testes: -3, velocidade: -1.5, percepcao: null },
                flags: { semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false, desvantagemAtaques: false, vantagemContraAlvo: false, vantagemAtaques: false, desvantagemContraAlvo: false, imuneADano: false, criticoReduzido: null },
                danoRecorrente: { valor: null, tipo: null, momento: null },
            },
            {
                nivel: 4, nome: 'Avassalador',
                descricao: '-4 em ataques/habilidade. -1,5m velocidade.',
                penalidades: { defesa: null, ataques: -4, testes: -4, velocidade: -1.5, percepcao: null },
                flags: { semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false, desvantagemAtaques: false, vantagemContraAlvo: false, vantagemAtaques: false, desvantagemContraAlvo: false, imuneADano: false, criticoReduzido: null },
                danoRecorrente: { valor: null, tipo: null, momento: null },
            },
            {
                nivel: 5, nome: 'Esmagador',
                descricao: '-5 em ataques/habilidade. -3m velocidade.',
                penalidades: { defesa: null, ataques: -5, testes: -5, velocidade: -3, percepcao: null },
                flags: { semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false, desvantagemAtaques: false, vantagemContraAlvo: false, vantagemAtaques: false, desvantagemContraAlvo: false, imuneADano: false, criticoReduzido: null },
                danoRecorrente: { valor: null, tipo: null, momento: null },
            },
            {
                nivel: 6, nome: 'Exaustivo',
                descricao: '-6 em ataques/habilidade. -3m velocidade.',
                penalidades: { defesa: null, ataques: -6, testes: -6, velocidade: -3, percepcao: null },
                flags: { semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false, desvantagemAtaques: false, vantagemContraAlvo: false, vantagemAtaques: false, desvantagemContraAlvo: false, imuneADano: false, criticoReduzido: null },
                danoRecorrente: { valor: null, tipo: null, momento: null },
            },
            {
                nivel: 7, nome: 'Desesperador',
                descricao: '-7 em ataques/habilidade. -4,5m velocidade. 3 dano/rodada em combate.',
                penalidades: { defesa: null, ataques: -7, testes: -7, velocidade: -4.5, percepcao: null },
                flags: { semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false, desvantagemAtaques: false, vantagemContraAlvo: false, vantagemAtaques: false, desvantagemContraAlvo: false, imuneADano: false, criticoReduzido: null },
                danoRecorrente: { valor: '3', tipo: 'exaustao', momento: 'inicioTurno' },
            },
        ],
    },

    'Congelando': {
        id: 'congelando',
        descricao: 'Progressivo (20 rodadas): -velocidade, desvantagem, -ações. 9ª: Atordoado. 15ª: Paralisado. 20ª: À Beira da Morte.',
        duracao: 'Progressivo',
        niveis: 20,
        cor: '#2F3C29',
        categoria: 'progressiva',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: -1.5, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: 'frio', momento: null },
        stackRegra: 'acumula',
        cura: 'calor_ou_fogueira',
        niveisDetalhes: [
            { nivel: 1, descricao: '-1,5m velocidade.', penalidades: { defesa: null, ataques: null, testes: null, velocidade: -1.5, percepcao: null }, flags: { desvantagemAtaques: false }, acoesReduzidas: 0 },
            { nivel: 2, descricao: '-1,5m velocidade + desvantagem em ataques.', penalidades: { defesa: null, ataques: null, testes: null, velocidade: -1.5, percepcao: null }, flags: { desvantagemAtaques: true }, acoesReduzidas: 0 },
            { nivel: 3, descricao: '-3m velocidade + desvantagem em ataques.', penalidades: { defesa: null, ataques: null, testes: null, velocidade: -3, percepcao: null }, flags: { desvantagemAtaques: true }, acoesReduzidas: 0 },
            { nivel: 4, descricao: '-3m velocidade + desvantagem em ataques + 1 ação a menos.', penalidades: { defesa: null, ataques: null, testes: null, velocidade: -3, percepcao: null }, flags: { desvantagemAtaques: true }, acoesReduzidas: 1 },
            { nivel: 5, descricao: '-4,5m velocidade + desvantagem em ataques + 1 ação a menos.', penalidades: { defesa: null, ataques: null, testes: null, velocidade: -4.5, percepcao: null }, flags: { desvantagemAtaques: true }, acoesReduzidas: 1 },
            { nivel: 6, descricao: '-6m velocidade + desvantagem em ataques + 2 ações a menos.', penalidades: { defesa: null, ataques: null, testes: null, velocidade: -6, percepcao: null }, flags: { desvantagemAtaques: true }, acoesReduzidas: 2 },
            { nivel: 7, descricao: '-7,5m velocidade + desvantagem em ataques + 2 ações a menos.', penalidades: { defesa: null, ataques: null, testes: null, velocidade: -7.5, percepcao: null }, flags: { desvantagemAtaques: true }, acoesReduzidas: 2 },
            { nivel: 8, descricao: '-9m velocidade + desvantagem em ataques + 2 ações a menos.', penalidades: { defesa: null, ataques: null, testes: null, velocidade: -9, percepcao: null }, flags: { desvantagemAtaques: true }, acoesReduzidas: 2 },
            { nivel: 9, descricao: 'Atordoado.', condicaoAplicada: 'Atordoado' },
            { nivel: 10, descricao: 'Atordoado.', condicaoAplicada: 'Atordoado' },
            { nivel: 11, descricao: 'Atordoado.', condicaoAplicada: 'Atordoado' },
            { nivel: 12, descricao: 'Atordoado.', condicaoAplicada: 'Atordoado' },
            { nivel: 13, descricao: 'Atordoado.', condicaoAplicada: 'Atordoado' },
            { nivel: 14, descricao: 'Atordoado.', condicaoAplicada: 'Atordoado' },
            { nivel: 15, descricao: 'Paralisado.', condicaoAplicada: 'Paralisado' },
            { nivel: 16, descricao: 'Paralisado.', condicaoAplicada: 'Paralisado' },
            { nivel: 17, descricao: 'Paralisado.', condicaoAplicada: 'Paralisado' },
            { nivel: 18, descricao: 'Paralisado.', condicaoAplicada: 'Paralisado' },
            { nivel: 19, descricao: 'Paralisado.', condicaoAplicada: 'Paralisado' },
            { nivel: 20, descricao: 'À Beira da Morte.', condicaoAplicada: 'À Beira da Morte' },
        ],
    },

    // ── AMBIENTE ───────────────────────────────────────────────────────

    'Queimando': {
        id: 'queimando',
        descricao: 'Em chamas (3 níveis). Dano de fogo por rodada crescente.',
        duracao: 'Até apagar',
        niveis: 3,
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
        cura: 'agua_ou_rolar_no_chao',
        niveisDetalhes: [
            {
                nivel: 1, nome: 'Nível 1',
                descricao: '1d4 dano de fogo por rodada. Apagar: água ou rolar no chão.',
                danoRecorrente: { valor: '1d4', tipo: 'fogo', momento: 'inicioTurno' },
            },
            {
                nivel: 2, nome: 'Nível 2',
                descricao: '1d6 dano de fogo por rodada. Maior área de fogo.',
                danoRecorrente: { valor: '1d6', tipo: 'fogo', momento: 'inicioTurno' },
            },
            {
                nivel: 3, nome: 'Nível 3',
                descricao: '2d6 dano de fogo por rodada. Fogo intenso.',
                danoRecorrente: { valor: '2d6', tipo: 'fogo', momento: 'inicioTurno' },
            },
        ],
    },

    'Lava': {
        id: 'lava',
        descricao: 'Contato com lava (2 níveis). Dano massivo de fogo por rodada.',
        duracao: 'Enquanto em contato',
        niveis: 2,
        cor: '#BB8130',
        categoria: 'ambiente',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: null, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: '6d6', tipo: 'fogo', momento: 'inicioTurno' },
        stackRegra: 'maiorValor',
        cura: 'sair_da_lava',
        niveisDetalhes: [
            {
                nivel: 1, nome: 'Parcial',
                descricao: 'Parcialmente submergida ou em contato com lava: 6d6 dano de fogo por rodada.',
                danoRecorrente: { valor: '6d6', tipo: 'fogo', momento: 'inicioTurno' },
            },
            {
                nivel: 2, nome: 'Submergido',
                descricao: 'Grande parte submergida ou em contato com lava: 12d6 dano de fogo por rodada.',
                danoRecorrente: { valor: '12d6', tipo: 'fogo', momento: 'inicioTurno' },
            },
        ],
    },

    // ── OUTRAS AMBIENTE ───────────────────────────────────────────────

    'Obscurecido': {
        id: 'obscurecido',
        descricao: 'Além da visão. Não pode ser alvo de habilidades que exijam visão. +1 acerto e Furtividade.',
        duracao: 'Enquanto obscurecido',
        cor: '#2F3C29',
        categoria: 'ambiente',
        penalidades: { defesa: null, ataques: 1, testes: null, velocidade: null, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: false, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'sair_do_obscurecimento'
    },

    'Escondido': {
        id: 'escondido',
        descricao: 'Obscurecido + posição desconhecida. Ataque fora de combate: alvo fica Surpreso. Vantagem no ataque.',
        duracao: 'Até ser detectado',
        cor: '#454E30',
        categoria: 'ambiente',
        penalidades: { defesa: null, ataques: null, testes: null, velocidade: null, percepcao: null },
        flags: {
            semAcoes: false, semReacoes: false, semMovimento: false, semConcentracao: false,
            desvantagemAtaques: false, vantagemContraAlvo: false,
            vantagemAtaques: true, desvantagemContraAlvo: false,
            imuneADano: false, criticoReduzido: null
        },
        danoRecorrente: { valor: null, tipo: null, momento: null },
        stackRegra: 'substitui',
        cura: 'atacar_ou_ser_detectado',
        condicoesImplicitas: ['Obscurecido'],
    },
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
 * Retorna os dados efetivos de uma condição progressiva para um nível específico.
 * Se a condição não for progressiva ou o nível for inválido, retorna os dados base.
 * @param {string} nomeOuId - Nome ou id da condição
 * @param {number} nivel - Nível atual (1-based)
 * @returns {Object} Condição com penalidades/flags/dano ajustados para o nível
 */
export const getCondicaoParaNivel = (nomeOuId, nivel) => {
    const cond = getCondicao(nomeOuId);
    if (!cond) return null;
    if (!cond.niveisDetalhes || !nivel || nivel < 1) return cond;
    const idx = Math.min(nivel, cond.niveis) - 1;
    const detalhe = cond.niveisDetalhes[idx];
    if (!detalhe) return cond;
    return {
        ...cond,
        descricao: detalhe.descricao || cond.descricao,
        penalidades: detalhe.penalidades || cond.penalidades,
        flags: { ...cond.flags, ...(detalhe.flags || {}) },
        danoRecorrente: detalhe.danoRecorrente || cond.danoRecorrente,
        nivelAtual: nivel,
        nomeNivel: detalhe.nome || `Rodada ${nivel}`,
        condicaoAplicada: detalhe.condicaoAplicada || null,
        acoesReduzidas: detalhe.acoesReduzidas || 0,
    };
};

/**
 * Resolve TODAS as condições implícitas a partir de um mapa de condições ativas.
 * Percorre cadeias transitivas: ex. À Beira da Morte → Incapacitado → Deitado + Atordoado.
 * Para condições progressivas, verifica condicaoAplicada do nível ativo.
 *
 * @param {Object} condicoesAtivas - { 'NomeCondição': true|number, ... }
 * @returns {Object} { 'NomeCondição': 'fonte (nome da condição pai)' } — apenas as implícitas
 */
export const resolverCondicoesImplicitas = (condicoesAtivas) => {
    const implicitas = {}; // { nome: fonte }
    const visitados = new Set();

    const resolver = (condNome, fonte) => {
        if (visitados.has(condNome)) return; // evita ciclos
        visitados.add(condNome);

        const condObj = condicoesDisponiveis[condNome];
        if (!condObj) return;

        // 1) condicoesImplicitas estáticas (Escondido→Obscurecido, etc.)
        if (condObj.condicoesImplicitas) {
            for (const impl of condObj.condicoesImplicitas) {
                if (!condicoesAtivas[impl] && !implicitas[impl]) {
                    implicitas[impl] = fonte || condNome;
                }
                // Resolver transitivamente (ex: Incapacitado→Atordoado, que por si não tem mais)
                resolver(impl, condNome);
            }
        }

        // 2) condicaoAplicada de nível em condições progressivas
        const nivel = condicoesAtivas[condNome];
        if (condObj.niveisDetalhes && typeof nivel === 'number' && nivel >= 1) {
            const idx = Math.min(nivel, condObj.niveis) - 1;
            const detalhe = condObj.niveisDetalhes[idx];
            if (detalhe?.condicaoAplicada) {
                const aplicada = detalhe.condicaoAplicada;
                if (!condicoesAtivas[aplicada] && !implicitas[aplicada]) {
                    implicitas[aplicada] = `${condNome} (nível ${nivel})`;
                }
                // Resolver transitivamente
                resolver(aplicada, `${condNome} (nível ${nivel})`);
            }
        }
    };

    for (const condNome of Object.keys(condicoesAtivas)) {
        resolver(condNome, condNome);
    }

    return implicitas;
};

/**
 * Calcula os modificadores totais aplicados aos rolamentos pelas condições ativas.
 * Resolve condições implícitas internamente e computa penalidades, bônus e flags.
 *
 * Regra LDO 0.5: para cada tipo de modificador, apenas a maior penalidade e o maior bônus se aplicam.
 * Exceção especial: Cego + Surdo simultâneo = -10 adicional em todos os testes.
 *
 * @param {Object} condicoesAtivas - { 'NomeCondição': true|number, ... } (incluindo ambientais)
 * @returns {Object} { modificadores, velocidade, flags, vantagensAtaque, desvantagensAtaque, resumoTexto }
 */
export const calcularModificadoresCondicoes = (condicoesAtivas) => {
    const vazio = {
        modificadores: { defesa: 0, ataques: 0, testes: 0, percepcao: 0 },
        velocidade: { reducao: 0, metade: false, zero: false },
        flags: {},
        vantagensAtaque: 0,
        desvantagensAtaque: 0,
        resumoTexto: [],
    };
    if (!condicoesAtivas || Object.keys(condicoesAtivas).length === 0) return vazio;

    // 1) Resolve implicit conditions to include all chained effects
    const implicitas = resolverCondicoesImplicitas(condicoesAtivas);
    const todas = { ...condicoesAtivas };
    for (const nome of Object.keys(implicitas)) {
        if (!(nome in todas)) todas[nome] = true;
    }

    // 2) Separate worst penalty (most negative) and best bonus (most positive) per stat
    const pen = { defesa: 0, ataques: 0, testes: 0, percepcao: 0 };
    const bon = { defesa: 0, ataques: 0, testes: 0, percepcao: 0 };
    const flags = {};
    const vel = { reducao: 0, metade: false, zero: false };

    for (const [nome, valor] of Object.entries(todas)) {
        let cond = condicoesDisponiveis[nome];
        if (!cond) continue;

        // For progressive conditions, use level-specific data
        if (cond.niveisDetalhes && typeof valor === 'number' && valor >= 1) {
            const nivelCond = getCondicaoParaNivel(cond.id || nome, valor);
            if (nivelCond) cond = nivelCond;
        }

        // Penalidades numéricas
        if (cond.penalidades) {
            for (const [key, val] of Object.entries(cond.penalidades)) {
                if (val === null || val === undefined) continue;
                if (key === 'velocidade') {
                    if (val === 'metade') vel.metade = true;
                    else if (typeof val === 'number' && val < 0) {
                        vel.reducao = Math.min(vel.reducao, val);
                    }
                    // val === 0 is handled by semMovimento flag
                } else if (typeof val === 'number') {
                    if (val < 0) pen[key] = Math.min(pen[key], val);
                    else if (val > 0) bon[key] = Math.max(bon[key], val);
                }
            }
        }

        // Flags
        if (cond.flags) {
            for (const [key, val] of Object.entries(cond.flags)) {
                if (val === true) flags[key] = true;
                if (key === 'criticoReduzido' && typeof val === 'number') {
                    flags.criticoReduzido = flags.criticoReduzido !== undefined
                        ? Math.min(flags.criticoReduzido, val) : val;
                }
            }
        }
    }

    // semMovimento → velocidade zero
    if (flags.semMovimento) vel.zero = true;

    // Special: Cego + Surdo = -10 adicional em todos os testes
    if (todas['Cego'] && todas['Surdo']) {
        pen.testes -= 10;
    }

    // 3) Combine: net modifier = worst penalty + best bonus
    const modificadores = {
        defesa: pen.defesa + bon.defesa,
        ataques: pen.ataques + bon.ataques,
        testes: pen.testes + bon.testes,
        percepcao: pen.percepcao + bon.percepcao,
    };

    // 4) Attack advantage/disadvantage from flags
    let vantagensAtaque = 0;
    let desvantagensAtaque = 0;
    if (flags.vantagemAtaques) vantagensAtaque++;
    if (flags.desvantagemAtaques) desvantagensAtaque++;

    // 5) Build text summary for roll labels
    const resumoTexto = [];
    if (modificadores.ataques !== 0) resumoTexto.push(`${modificadores.ataques > 0 ? '+' : ''}${modificadores.ataques} atq`);
    if (modificadores.testes !== 0) resumoTexto.push(`${modificadores.testes > 0 ? '+' : ''}${modificadores.testes} testes`);
    if (modificadores.defesa !== 0) resumoTexto.push(`${modificadores.defesa > 0 ? '+' : ''}${modificadores.defesa} def`);
    if (modificadores.percepcao !== 0) resumoTexto.push(`${modificadores.percepcao > 0 ? '+' : ''}${modificadores.percepcao} per`);
    if (vel.zero) resumoTexto.push('vel=0');
    else if (vel.metade) resumoTexto.push('vel÷2');
    else if (vel.reducao < 0) resumoTexto.push(`${vel.reducao}m vel`);
    if (vantagensAtaque > 0) resumoTexto.push('vant. ataque');
    if (desvantagensAtaque > 0) resumoTexto.push('desv. ataque');
    if (flags.semAcoes) resumoTexto.push('sem ações');

    return { modificadores, velocidade: vel, flags, vantagensAtaque, desvantagensAtaque, resumoTexto };
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

// ============================================================================
// FUNÇÕES DE ENGINE — APLICAR/REMOVER CONDIÇÕES (TODO-CON-002)
// ============================================================================

/**
 * Aplica uma condição a um fichaState imutável e retorna novo state.
 *
 * O fichaState esperado segue o schema:
 *   { habilidades: {}, recursos: {}, defesa: {}, condicoesAtivas: [],
 *     modificadores: { defesa: 0, ataques: 0, testes: 0, velocidade: 0, percepcao: 0 },
 *     flags: {} }
 *
 * Ref: LDO 0.5, seção Condições
 *
 * @param {Object} fichaState  — estado atual da ficha
 * @param {string} condicaoId  — id da condição (ex: 'atordoado')
 * @param {Object} [opcoes={}] — { fonte?: string, duracao?: number (rodadas), intensidade?: number }
 * @returns {Object} novo fichaState com condição aplicada e modificadores recalculados
 */
export const aplicarCondicao = (fichaState, condicaoId, opcoes = {}) => {
    const cond = getCondicao(condicaoId);
    if (!cond) return fichaState;

    const { fonte = 'desconhecida', duracao = null, intensidade = 1 } = opcoes;

    // Copiar state de forma imutável
    const novoState = {
        ...fichaState,
        condicoesAtivas: [...(fichaState.condicoesAtivas || [])],
        modificadores: { ...(fichaState.modificadores || { defesa: 0, ataques: 0, testes: 0, velocidade: 0, percepcao: 0 }) },
        flags: { ...(fichaState.flags || {}) }
    };

    // Verificar stack rule
    const idx = novoState.condicoesAtivas.findIndex(c => c.condicaoId === cond.id);
    if (idx !== -1) {
        const existente = novoState.condicoesAtivas[idx];
        switch (cond.stackRegra) {
            case 'substitui':
                // Remove a anterior (vamos recalcular tudo)
                novoState.condicoesAtivas.splice(idx, 1);
                break;
            case 'acumula':
                // Incrementa intensidade
                novoState.condicoesAtivas[idx] = {
                    ...existente,
                    intensidade: (existente.intensidade || 1) + intensidade
                };
                return _recalcularModificadores(novoState);
            case 'maiorValor':
                if (intensidade <= (existente.intensidade || 1)) return fichaState;
                novoState.condicoesAtivas.splice(idx, 1);
                break;
            case 'maiorDuracao':
                if (duracao !== null && duracao <= (existente.duracaoRestante || 0)) return fichaState;
                novoState.condicoesAtivas.splice(idx, 1);
                break;
            default:
                // null → não stackeia, reaplica
                novoState.condicoesAtivas.splice(idx, 1);
        }
    }

    // Adicionar condição
    novoState.condicoesAtivas.push({
        condicaoId: cond.id,
        nome: cond.descricao ? (Object.keys(condicoesDisponiveis).find(k => condicoesDisponiveis[k].id === cond.id) || cond.id) : cond.id,
        fonte,
        duracaoRestante: duracao,
        intensidade,
        rodadaAplicada: Date.now() // timestamp para ordenação
    });

    return _recalcularModificadores(novoState);
};

/**
 * Remove uma condição do fichaState e recalcula modificadores.
 *
 * @param {Object} fichaState  — estado atual
 * @param {string} condicaoId  — id da condição a remover
 * @returns {Object} novo fichaState sem a condição
 */
export const removerCondicao = (fichaState, condicaoId) => {
    const novoState = {
        ...fichaState,
        condicoesAtivas: (fichaState.condicoesAtivas || []).filter(c => c.condicaoId !== condicaoId),
        modificadores: { ...(fichaState.modificadores || { defesa: 0, ataques: 0, testes: 0, velocidade: 0, percepcao: 0 }) },
        flags: { ...(fichaState.flags || {}) }
    };
    return _recalcularModificadores(novoState);
};

/**
 * Recalcula todos os modificadores e flags baseado nas condições ativas.
 * Regra LDO: "uma criatura recebe sempre o maior bônus ou penalidade, e somente ele."
 * @private
 */
const _recalcularModificadores = (state) => {
    // Resetar
    const mods = { defesa: 0, ataques: 0, testes: 0, velocidade: 0, percepcao: 0 };
    const flags = {};

    for (const ativa of state.condicoesAtivas) {
        const cond = getCondicao(ativa.condicaoId);
        if (!cond) continue;

        // Penalidades — acumula MENOR (mais negativo) conforme regra do maior efeito
        if (cond.penalidades) {
            for (const [key, val] of Object.entries(cond.penalidades)) {
                if (val === null) continue;
                if (val === 'metade') {
                    mods[key] = 'metade'; // flag especial para velocidade
                } else if (typeof val === 'number' && typeof mods[key] === 'number') {
                    mods[key] = Math.min(mods[key], val);
                }
            }
        }

        // Flags — OR lógico (qualquer condição seta, fica setada)
        if (cond.flags) {
            for (const [key, val] of Object.entries(cond.flags)) {
                if (val === true) flags[key] = true;
                // criticoReduzido: menor valor = melhor pro atacante
                if (key === 'criticoReduzido' && typeof val === 'number') {
                    flags.criticoReduzido = flags.criticoReduzido
                        ? Math.min(flags.criticoReduzido, val)
                        : val;
                }
            }
        }
    }

    return { ...state, modificadores: mods, flags };
};

// ============================================================================
// FUNÇÕES DE ENGINE — PROCESSAR EFEITOS DE RODADA (TODO-CON-003)
// ============================================================================

/**
 * Processa efeitos de início ou fim de turno para todas as condições ativas.
 * - Aplica dano recorrente no momento indicado
 * - Decrementa duração das condições com rodadas restantes
 * - Remove condições expiradas
 *
 * Ref: LDO 0.5, seção Condições e efeitos por turno
 *
 * @param {Object} fichaState — estado da ficha
 * @param {'inicioTurno'|'fimTurno'} momento — quando no turno estamos
 * @returns {{ novoState: Object, log: Array<string> }} — state atualizado + log de eventos
 */
export const processarEfeitosDeRodada = (fichaState, momento) => {
    const log = [];
    let novoState = {
        ...fichaState,
        condicoesAtivas: [...(fichaState.condicoesAtivas || [])],
        recursos: { ...(fichaState.recursos || {}) },
        modificadores: { ...(fichaState.modificadores || {}) },
        flags: { ...(fichaState.flags || {}) }
    };

    const condicoesParaManter = [];

    for (const ativa of novoState.condicoesAtivas) {
        const cond = getCondicao(ativa.condicaoId);
        if (!cond) { condicoesParaManter.push(ativa); continue; }

        // 1) Aplicar dano recorrente
        if (cond.danoRecorrente && cond.danoRecorrente.valor !== null && cond.danoRecorrente.momento === momento) {
            const dano = _resolverValorDano(cond.danoRecorrente.valor, ativa.intensidade);
            if (novoState.recursos.pvAtual !== undefined) {
                novoState.recursos = {
                    ...novoState.recursos,
                    pvAtual: Math.max(0, novoState.recursos.pvAtual - dano)
                };
            }
            log.push(`${ativa.condicaoId}: ${dano} dano de ${cond.danoRecorrente.tipo || 'efeito'} (${momento})`);
        }

        // 2) Decrementar duração
        let condAtualizada = { ...ativa };
        if (condAtualizada.duracaoRestante !== null && condAtualizada.duracaoRestante !== undefined) {
            condAtualizada.duracaoRestante -= 1;
            if (condAtualizada.duracaoRestante <= 0) {
                log.push(`${ativa.condicaoId}: expirou!`);
                continue; // Não adiciona — condição removida
            }
        }

        condicoesParaManter.push(condAtualizada);
    }

    novoState.condicoesAtivas = condicoesParaManter;

    // Recalcular modificadores após remoções
    novoState = _recalcularModificadores(novoState);

    return { novoState, log };
};

/**
 * Processa teste de morte (Beira da Morte).
 * Ref: LDO 0.5, seção "À Beira da Morte"
 *   - 10+ no d20 = 1 sucesso
 *   - 9 ou menos  = 1 falha
 *   - Nat 1       = 2 falhas
 *   - Nat 20      = estabiliza + cura = Fortitude PV
 *   - 5 sucessos  = estabilizado
 *   - 3 falhas    = morte
 *   - Dano enquanto à beira = +1 falha por 5 de dano
 *
 * @param {Object} fichaState — deve conter { testeMorte: { sucessos, falhas }, habilidades: { fortitude } }
 * @returns {{ novoState: Object, resultado: 'continua'|'estabilizado'|'morte'|'critico_estabilizado', rolagemD20: number, log: string }}
 */
export const processarTesteDeMorte = (fichaState) => {
    const rolagem = Math.floor(Math.random() * 20) + 1;
    const tm = { ...(fichaState.testeMorte || { sucessos: 0, falhas: 0 }) };
    let resultado = 'continua';
    let log = '';

    if (rolagem === 20) {
        // Crítico: estabiliza imediatamente + recupera Fortitude em PV
        const fortitude = fichaState.habilidades?.fortitude || 0;
        resultado = 'critico_estabilizado';
        log = `Nat 20! Estabilizado e recupera ${fortitude} PV`;
        const novoState = {
            ...fichaState,
            testeMorte: { sucessos: 0, falhas: 0 },
            recursos: {
                ...(fichaState.recursos || {}),
                pvAtual: Math.min(
                    (fichaState.recursos?.pvAtual || 0) + fortitude,
                    fichaState.recursos?.pvMax || fortitude
                )
            }
        };
        // Remover condição à beira da morte
        return { novoState: removerCondicao(novoState, 'a_beira_da_morte'), resultado, rolagemD20: rolagem, log };
    }

    if (rolagem === 1) {
        tm.falhas += 2;
        log = `Nat 1! Falha crítica (2 falhas). Total: ${tm.sucessos}S / ${tm.falhas}F`;
    } else if (rolagem >= 10) {
        tm.sucessos += 1;
        log = `${rolagem} → Sucesso! Total: ${tm.sucessos}S / ${tm.falhas}F`;
    } else {
        tm.falhas += 1;
        log = `${rolagem} → Falha. Total: ${tm.sucessos}S / ${tm.falhas}F`;
    }

    if (tm.falhas >= 3) {
        resultado = 'morte';
        log += ' → MORTE';
    } else if (tm.sucessos >= 5) {
        resultado = 'estabilizado';
        log += ' → Estabilizado!';
    }

    const novoState = { ...fichaState, testeMorte: tm };
    return { novoState, resultado, rolagemD20: rolagem, log };
};

/**
 * Resolve valor de dano que pode ser string ('2', '1d4', '2d4') ou number
 * @private
 */
const _resolverValorDano = (valor, intensidade = 1) => {
    if (typeof valor === 'number') return valor * intensidade;
    if (typeof valor === 'string') {
        // Dano fixo
        const fixo = parseInt(valor, 10);
        if (!isNaN(fixo) && !valor.includes('d')) return fixo * intensidade;
        // Dado: NdX
        const match = valor.match(/^(\d+)?d(\d+)$/);
        if (match) {
            const qtd = (parseInt(match[1], 10) || 1) * intensidade;
            const lados = parseInt(match[2], 10);
            let total = 0;
            for (let i = 0; i < qtd; i++) {
                total += Math.floor(Math.random() * lados) + 1;
            }
            return total;
        }
    }
    return 0;
};
