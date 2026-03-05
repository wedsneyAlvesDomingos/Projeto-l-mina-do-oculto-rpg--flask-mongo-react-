/**
 * Dados centralizados de Condições do sistema Lâmina do Oculto
 * Este arquivo contém todas as condições de status que afetam personagens.
 * Usado em: characterSheet.js, Wiki/conditions
 */

// Cores padrão para condições por categoria
export const CORES_CONDICOES = {
    incapacitante: '#931C4A',
    mental: '#162A22',
    fisica: '#7B3311',
    magica: '#454E30',
    ambiente: '#2F3C29',
    progressiva: '#5B1F0F',
};

export const condicoesDisponiveis = {
    'Atordoado': {
        id: 'atordoado',
        descricao: 'Não pode usar ações, reações e não pode se mover. Defesa -2. Ataques contra ele têm crítico em 1 número abaixo.',
        duracao: '2 rodadas',
        penalidades: { defesa: -2 },
        cor: '#931C4A',
        categoria: 'incapacitante'
    },
    'Cego': {
        id: 'cego',
        descricao: 'Desvantagem em percepção (visão). +2 dificuldade em ações que precisam de visão. Se também surdo: -10 adicional em habilidades.',
        penalidades: { percepcao: -5 },
        cor: '#162A22',
        categoria: 'fisica'
    },
    'Encantado': {
        id: 'encantado',
        descricao: 'Não pode atacar o encantador. Encantador tem vantagem social. Quebra se sofrer dano ou aliado sofrer.',
        duracao: 'Até quebrar',
        cor: '#AB6422',
        categoria: 'magica'
    },
    'Agarrado': {
        id: 'agarrado',
        descricao: 'Velocidade vira zero. Atacar é possível, mas com desvantagem. Pode tentar se soltar.',
        duracao: 'Até se soltar',
        penalidades: { velocidade: 0 },
        cor: '#7B3311',
        categoria: 'fisica'
    },
    'Amedrontado': {
        id: 'amedrontado',
        descricao: '-2 em testes/ataques enquanto vê a fonte do medo. Não pode se aproximar voluntariamente.',
        duracao: '2 rodadas',
        penalidades: { ataques: -2, testes: -2 },
        cor: '#5B1F0F',
        categoria: 'mental'
    },
    'Dominado': {
        id: 'dominado',
        descricao: 'Perde controle temporariamente. Obedece comandos básicos exceto suicídio/autolesão.',
        duracao: 'Até quebrar',
        cor: '#40150A',
        categoria: 'magica'
    },
    'Enfeitiçado': {
        id: 'enfeiticado',
        descricao: 'Não age. Só observa o encantador. Quebra com ação de aliado ou dano.',
        duracao: 'Até quebrar',
        cor: '#756A34',
        categoria: 'magica'
    },
    'Invisível': {
        id: 'invisivel',
        descricao: 'Não pode ser visto. Ataques contra têm desvantagem. Ataques dele têm vantagem. Ainda faz barulho.',
        cor: '#454E30',
        categoria: 'magica'
    },
    'Petrificado': {
        id: 'petrificado',
        descricao: 'Vira pedra. Peso x10. Tempo não passa. Imune a dano (não-contundente) e veneno.',
        duracao: 'Até curar',
        cor: '#2F3C29',
        categoria: 'magica'
    },
    'Imobilizado': {
        id: 'imobilizado',
        descricao: 'Velocidade vira zero. -2 em Defesa e sem bônus de Agilidade/Escudo.',
        duracao: '2 rodadas',
        penalidades: { velocidade: 0, defesa: -2 },
        cor: '#BB8130',
        categoria: 'fisica'
    },
    'Atrofiado': {
        id: 'atrofiado',
        descricao: '-3 em todos os testes. Metade do movimento.',
        duracao: '2 rodadas',
        penalidades: { testes: -3 },
        cor: '#424242',
        categoria: 'fisica'
    },
    'Cansado (Leve)': {
        id: 'cansado_1',
        descricao: '-1 em todas as jogadas de ataque e habilidade.',
        nivel: 1,
        penalidades: { ataque: -1, habilidade: -1 },
        cor: '#AB6422',
        categoria: 'progressiva'
    },
    'Cansado (Moderado)': {
        id: 'cansado_2',
        descricao: '-2 em ataques/habilidade. -1,5m velocidade.',
        nivel: 2,
        penalidades: { ataque: -2, habilidade: -2, velocidade: -1.5 },
        cor: '#7B3311',
        categoria: 'progressiva'
    },
    'Cansado (Sufocante)': {
        id: 'cansado_3',
        descricao: '-3 em ataques/habilidade. -1,5m velocidade.',
        nivel: 3,
        penalidades: { ataque: -3, habilidade: -3, velocidade: -1.5 },
        cor: '#5B1F0F',
        categoria: 'progressiva'
    },
    'Cansado (Avassalador)': {
        id: 'cansado_4',
        descricao: '-4 em ataques/habilidade. -1,5m velocidade.',
        nivel: 4,
        penalidades: { ataque: -4, habilidade: -4, velocidade: -1.5 },
        cor: '#40150A',
        categoria: 'progressiva'
    },
    'Cansado (Esmagador)': {
        id: 'cansado_5',
        descricao: '-5 em ataques/habilidade. -3m velocidade.',
        nivel: 5,
        penalidades: { ataque: -5, habilidade: -5, velocidade: -3 },
        cor: '#2F3C29',
        categoria: 'progressiva'
    },
    'Cansado (Exaustivo)': {
        id: 'cansado_6',
        descricao: '-6 em ataques/habilidade. -3m velocidade.',
        nivel: 6,
        penalidades: { ataque: -6, habilidade: -6, velocidade: -3 },
        cor: '#162A22',
        categoria: 'progressiva'
    },
    'Cansado (Desesperador)': {
        id: 'cansado_7',
        descricao: '-7 em ataques/habilidade. -4,5m velocidade. 3 dano/rodada em combate.',
        nivel: 7,
        penalidades: { ataque: -7, habilidade: -7, velocidade: -4.5, dano: 3 },
        cor: '#931C4A',
        categoria: 'progressiva'
    },
    'Envenenado': {
        id: 'envenenado',
        descricao: 'Sofre dano de veneno a cada turno. Efeitos dependem do tipo de veneno.',
        duracao: 'Variável',
        cor: '#454E30',
        categoria: 'fisica'
    },
    'Restringido': {
        id: 'restringido',
        descricao: 'Movimento zero. Desvantagem em ataques. Perde 1 ação/turno.',
        duracao: '2 rodadas',
        penalidades: { movimento: 0 },
        cor: '#756A34',
        categoria: 'fisica'
    },
    'Deitado': {
        id: 'deitado',
        descricao: '-1 acerto. Inimigos: +1 corpo a corpo, -1 à distância contra você.',
        penalidades: { acerto: -1 },
        cor: '#5B1F0F',
        categoria: 'fisica'
    },
    'Incapacitado': {
        id: 'incapacitado',
        descricao: 'Cai deitado e fica atordoado.',
        duracao: '2 rodadas',
        penalidades: { defesa: -2 },
        cor: '#931C4A',
        categoria: 'incapacitante'
    },
    'Surdo': {
        id: 'surdo',
        descricao: '-5 em percepção (som). Se também cego: -10 adicional em habilidades.',
        penalidades: { percepcao: -5 },
        cor: '#2F3C29',
        categoria: 'fisica'
    },
    'Sangrando': {
        id: 'sangrando',
        descricao: '2 dano no início do turno. Cura: Medicina 12 ou magia.',
        penalidades: { dano: 2 },
        cor: '#931C4A',
        categoria: 'fisica'
    },
    'Paralisado': {
        id: 'paralisado',
        descricao: 'Atordoado + corpo travado. Ataques corpo a corpo têm vantagem.',
        duracao: '2 rodadas',
        penalidades: { defesa: -2 },
        cor: '#162A22',
        categoria: 'incapacitante'
    },
    'Aterrorizado': {
        id: 'aterrorizado',
        descricao: '-1 em todos os testes. Deve fugir da fonte de terror.',
        duracao: '2 rodadas',
        penalidades: { testes: -1 },
        cor: '#5B1F0F',
        categoria: 'mental'
    },
    'À Beira da Morte': {
        id: 'beira_morte',
        descricao: 'Incapacitado. Faz testes de morte (d20: 10+ sucesso, 9- falha).',
        cor: '#40150A',
        categoria: 'incapacitante'
    },
    'Congelando': {
        id: 'congelando',
        descricao: 'Progressivo: -velocidade, desvantagem, -ações. 9ª: Atordoado. 20ª: Morte.',
        niveis: 20,
        cor: '#2F3C29',
        categoria: 'progressiva'
    },
    'Queimando (Nível 1)': {
        id: 'queimando_1',
        descricao: '1d4 dano/rodada. Apagar: água, rolar no chão.',
        nivel: 1,
        penalidades: { dano: '1d4' },
        cor: '#7B3311',
        categoria: 'ambiente'
    },
    'Queimando (Nível 2)': {
        id: 'queimando_2',
        descricao: '1d6 dano/rodada. Maior área de fogo.',
        nivel: 2,
        penalidades: { dano: '1d6' },
        cor: '#AB6422',
        categoria: 'ambiente'
    },
    'Queimando (Nível 3)': {
        id: 'queimando_3',
        descricao: '1d8 dano/rodada. Fogo intenso.',
        nivel: 3,
        penalidades: { dano: '1d8' },
        cor: '#BB8130',
        categoria: 'ambiente'
    },
    'Surpreso': {
        id: 'surpreso',
        descricao: 'Não age/reage. Defesa -2. Crítico em 1 número abaixo.',
        penalidades: { defesa: -2 },
        cor: '#756A34',
        categoria: 'mental'
    },
    'Devagar': {
        id: 'devagar',
        descricao: 'Metade do movimento. 1 ataque/ação. +1 ação de custo em tudo.',
        cor: '#454E30',
        categoria: 'magica'
    }
};

// Array com todas as condições
export const condicoesArray = Object.entries(condicoesDisponiveis).map(([nome, dados]) => ({
    nome,
    ...dados
}));

// Função helper para buscar condição pelo id ou nome
export const getCondicao = (idOuNome) => {
    // Busca por nome (chave do objeto)
    if (condicoesDisponiveis[idOuNome]) {
        return { nome: idOuNome, ...condicoesDisponiveis[idOuNome] };
    }
    // Busca por id
    const entry = Object.entries(condicoesDisponiveis).find(([_, dados]) => dados.id === idOuNome);
    if (entry) {
        return { nome: entry[0], ...entry[1] };
    }
    return null;
};

// Função helper para obter condições por categoria
export const getCondicoesPorCategoria = (categoria) => {
    return condicoesArray.filter(c => c.categoria === categoria);
};

// Função helper para obter descrição resumida de uma condição
export const getCondicaoResumo = (idOuNome) => {
    const cond = getCondicao(idOuNome);
    if (!cond) return null;
    return {
        nome: cond.nome,
        descricao: cond.descricao,
        cor: cond.cor
    };
};

// Lista de categorias disponíveis
export const categoriasCondicoes = [
    { id: 'incapacitante', nome: 'Incapacitante', cor: CORES_CONDICOES.incapacitante },
    { id: 'mental', nome: 'Mental', cor: CORES_CONDICOES.mental },
    { id: 'fisica', nome: 'Física', cor: CORES_CONDICOES.fisica },
    { id: 'magica', nome: 'Mágica', cor: CORES_CONDICOES.magica },
    { id: 'ambiente', nome: 'Ambiente', cor: CORES_CONDICOES.ambiente },
    { id: 'progressiva', nome: 'Progressiva', cor: CORES_CONDICOES.progressiva },
];
