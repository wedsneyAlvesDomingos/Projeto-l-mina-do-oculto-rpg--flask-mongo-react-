/**
 * Catálogo de Classes Avançadas — Lâmina do Oculto RPG
 * 
 * TODO-CLS-001 — Todas as classes primárias e especializações do livro
 * catalogadas em formato estruturado, com referências cruzadas a regalias.js.
 *
 * Progressão:  Aprendiz (nv 1-2) → Classe Primária (nv 3+) → Especialização (10 regalias)
 * Pontos de regalia: nv 1 = 4, nv 2 = 4, depois +2 por nível
 *
 * Importa dados canônicos de regalias.js e agrega:
 *  - Mapeamento completo classe → especializações
 *  - IDs das regalias de cada árvore
 *  - Funções de consulta para UI e pipeline de cálculo
 */

import {
    regaliasDeAprendiz,
    classesPrimarias,
    especializacoes,
    regaliasOpcionais,
    getRegaliaAprendiz,
    getClassePrimaria,
    getEspecializacao,
    getClassesPrimariasParaSelect,
    getEspecializacoesParaSelect,
    pontosRegaliaPorNivel
} from './regalias';

// ============================================================================
// TABELA DE CLASSES APRENDIZ (referência rápida)
// ============================================================================
export const classesAprendiz = [
    {
        id: 'combatente',
        nome: 'Combatente Aprendiz',
        tipo: 'aprendiz_combate',
        descricao: 'Aprendiz marcial. Habilita todas as classes primárias de combate.',
        classePrimariaRelacionada: 'combatente_primario',
        custo: 1,
        bonusHabilidades: { combateCorpoACorpo: 1, combateADistancia: 1, percepcao: 1 },
        proficienciasGanhas: ['armas_simples', 'armas_marciais', 'armaduras_leves', 'armaduras_medias', 'escudos_simples'],
        bonusPV: 5
    },
    {
        id: 'novico',
        nome: 'Noviço(a) Aprendiz',
        tipo: 'aprendiz_divino',
        descricao: 'Aprendiz divino. Habilita todas as classes primárias de fé.',
        classePrimariaRelacionada: 'novico_primario',
        custo: 1,
        bonusHabilidades: { teologia: 1, medicina: 1 },
        escolhasHabilidades: [{ grupo: ['intuicao', 'ocultismo'], pontos: 1 }],
        bonusMagia: 8,
        regaliaFoco: 'simbolo_santo'
    },
    {
        id: 'iniciado',
        nome: 'Iniciado(a) Aprendiz',
        tipo: 'aprendiz_arcano',
        descricao: 'Aprendiz arcano. Habilita todas as classes primárias de magia.',
        classePrimariaRelacionada: 'iniciado_primario',
        custo: 1,
        bonusHabilidades: { arcanismo: 1, combateArcano: 1 },
        escolhasHabilidades: [{ grupo: ['historia', 'intuicao', 'natureza'], pontos: 1 }],
        bonusMagia: 8,
        regaliaFoco: 'foco_arcano'
    },
    {
        id: 'feiticeiro',
        nome: 'Feiticeiro(a) Aprendiz',
        tipo: 'aprendiz_feiticaria',
        descricao: 'Aprendiz de feitiçaria. Habilita todas as classes primárias de feitiçaria.',
        classePrimariaRelacionada: 'feiticeiro_primario',
        custo: 1,
        bonusHabilidades: { ritualismo: 1 },
        escolhasHabilidades: [{ grupo: ['arcanismo', 'ocultismo'], pontos: 1 }],
        bonusMagia: 6,
        bonusPV: 2
    },
    {
        id: 'diplomata',
        nome: 'Diplomata Aprendiz',
        tipo: 'aprendiz_social',
        descricao: 'Aprendiz social. Não habilita classe primária, mas concede habilidades sociais.',
        classePrimariaRelacionada: null,
        custo: 1,
        bonusHabilidades: { persuasao: 2, enganacao: 2, negociacao: 1, seducao: 2, intimidacao: 2 },
        habilidadeEspecial: 'Barganhar'
    },
    {
        id: 'explorador',
        nome: 'Explorador Aprendiz',
        tipo: 'aprendiz_exploracao',
        descricao: 'Aprendiz explorador. Não habilita classe primária, mas concede habilidades de sobrevivência.',
        classePrimariaRelacionada: null,
        custo: 1,
        bonusHabilidades: { rastreamento: 2, investigacao: 2, sobrevivencia: 1, navegacao: 1, percepcao: 2, furtividade: 2 },
        proficienciasGanhas: ['ferramentas_de_ladrao'],
        habilidadeEspecial: 'Visão para Abrigo'
    },
    {
        id: 'academico',
        nome: 'Acadêmico Aprendiz',
        tipo: 'aprendiz_estudo',
        descricao: 'Aprendiz acadêmico. Não habilita classe primária, mas concede conhecimento amplo.',
        classePrimariaRelacionada: null,
        custo: 1,
        bonusHabilidades: { historia: 2, intuicao: 2, jurisprudencia: 1, teologia: 1, medicina: 2, natureza: 2 },
        habilidadeEspecial: 'Já Li Sobre Isso'
    }
];

// ============================================================================
// MAPEAMENTO COMPLETO: CLASSE PRIMÁRIA → ESPECIALIZAÇÕES
// ============================================================================
export const classeEspecializacaoMap = {
    combatente_primario: {
        puras: ['cavaleiro', 'assassino', 'cacador', 'barbaro'],
        mistas: [
            { id: 'monge', outrasClasses: { novico_primario: 3 }, minPropria: 7 },
            { id: 'inquisidor', outrasClasses: { novico_primario: 5 }, minPropria: 5 },
            { id: 'cavaleiro_arcano', outrasClasses: { iniciado_primario: 5 }, minPropria: 5 },
            { id: 'cacador_demonios', outrasClasses: { feiticeiro_primario: 3 }, minPropria: 7 }
        ]
    },
    novico_primario: {
        puras: ['sacerdote', 'exorcista'],
        mistas: [
            { id: 'monge', outrasClasses: { combatente_primario: 7 }, minPropria: 3 },
            { id: 'inquisidor', outrasClasses: { combatente_primario: 5 }, minPropria: 5 },
            { id: 'profano', outrasClasses: { feiticeiro_primario: 5 }, minPropria: 5 },
            { id: 'erudito', outrasClasses: { iniciado_primario: 5 }, minPropria: 5 }
        ]
    },
    iniciado_primario: {
        puras: ['mago', 'professor'],
        mistas: [
            { id: 'cavaleiro_arcano', outrasClasses: { combatente_primario: 5 }, minPropria: 5 },
            { id: 'erudito', outrasClasses: { novico_primario: 5 }, minPropria: 5 },
            { id: 'invocador', outrasClasses: { feiticeiro_primario: 5 }, minPropria: 5 }
        ]
    },
    feiticeiro_primario: {
        puras: ['metamorfo', 'elementalista', 'xama', 'bruxo'],
        mistas: [
            { id: 'profano', outrasClasses: { novico_primario: 5 }, minPropria: 5 },
            { id: 'invocador', outrasClasses: { iniciado_primario: 5 }, minPropria: 5 },
            { id: 'cacador_demonios', outrasClasses: { combatente_primario: 7 }, minPropria: 3 }
        ]
    }
};

// ============================================================================
// RESUMO DESCRITIVO DAS 4 CLASSES PRIMÁRIAS (para Wiki e UI)
// ============================================================================
export const resumoClassesPrimarias = [
    {
        id: 'combatente_primario',
        nome: 'Combatente',
        icone: '⚔️',
        corTema: '#c62828',
        aprendizId: 'combatente',
        descricaoCurta: 'Mestre das armas e da resistência física.',
        descricaoCompleta: 'O Combatente é a classe focada em habilidades marciais. Cada regalia comprada concede +4 PV e +2 Estâmina. Sua habilidade de classe "Implacável" permite meditar em combate para recuperar fôlego e ganhar bônus de dano igual à Fortitude. Se derrubar um inimigo com Ataque Fortalecido, ganha +2 ações extras no próximo turno.',
        arvoresNomes: ['Combate Direto', 'Combate a Distância', 'Combate de Emboscada', 'Combate Defensivo', 'Combate com Arma de Haste', 'Combate Desarmado'],
        regaliasAvulsasNomes: ['Combate com Armas Improvisadas', 'Combate com Duas Armas', 'Combate com Arma de Acuidade', 'Recuperar Fôlego Melhorado', 'Golpe Explosivo', 'Levantar Escudo', 'Recarga Oportuna'],
        especializacoesPuras: ['Cavaleiro(a)', 'Assassino(a)', 'Caçador(a)', 'Bárbaro(a)'],
        especializacoesMistas: ['Monge (7 com + 3 nov)', 'Inquisidor (5 com + 5 nov)', 'Cavaleiro(a) Arcano (5 com + 5 ini)', 'Caçador(a) de Demônios (7 com + 3 fei)']
    },
    {
        id: 'novico_primario',
        nome: 'Noviço(a)',
        icone: '✝️',
        corTema: '#f9a825',
        aprendizId: 'novico',
        descricaoCurta: 'Servo divino que canaliza o poder dos deuses.',
        descricaoCompleta: 'O Noviço(a) é a classe focada em magia divina. Cada regalia comprada concede +2 PV e +4 Magia. Possui Anticorrupção (toda magia de cura causa dano sagrado a mortos-vivos/demônios) e deve escolher uma deidade: Boa (cura aliados 2d6), Má (sacrifício por mana) ou Neutra (oração recupera PV e Magia).',
        arvoresNomes: ['Oração de Luz', 'Oração de Banimento', 'Oração de Proteção', 'Oração de Preservação'],
        regaliasAvulsasNomes: ['Noviço(a) de Combate', 'Intervenção', 'Abençoar Arma', 'Esfera Divina', 'Martírio', 'Dividir a Dor'],
        especializacoesPuras: ['Sacerdote', 'Exorcista'],
        especializacoesMistas: ['Monge (3 nov + 7 com)', 'Inquisidor (5 nov + 5 com)', 'Profano (5 nov + 5 fei)', 'Erudito (5 nov + 5 ini)']
    },
    {
        id: 'iniciado_primario',
        nome: 'Iniciado(a)',
        icone: '🔮',
        corTema: '#1565c0',
        aprendizId: 'iniciado',
        descricaoCurta: 'Estudioso da magia arcana e manipulação da realidade.',
        descricaoCompleta: 'O Iniciado(a) é a classe focada em magia arcana. Cada regalia comprada concede +2 PV e +4 Magia. Sua habilidade "Magus" permite lançar magias de aprendiz sem custo de mana (vezes = Arcanismo, recarga no descanso longo). Necessita foco arcano ou mão livre para conjurar.',
        arvoresNomes: ['Evocação', 'Abjuração', 'Encantamento', 'Ilusão', 'Telecinese', 'Invocação', 'Transmutação'],
        regaliasAvulsasNomes: [],
        especializacoesPuras: ['Mago(a)', 'Professor(a)'],
        especializacoesMistas: ['Cavaleiro(a) Arcano (5 ini + 5 com)', 'Erudito (5 ini + 5 nov)', 'Invocador (5 ini + 5 fei)']
    },
    {
        id: 'feiticeiro_primario',
        nome: 'Feiticeiro(a)',
        icone: '🌀',
        corTema: '#6a1b9a',
        aprendizId: 'feiticeiro',
        descricaoCurta: 'Conjurador instintivo que molda energias caóticas.',
        descricaoCompleta: 'O Feiticeiro(a) é a classe focada em magia instintiva. Cada regalia comprada concede +3 PV e +3 Magia. Cada magia lançada gera 2 Pontos de Feitiçaria (duram 10 rodadas, substituem mana 1:1, máximo = Ocultismo + Ritualismo + Arcanismo). Diferente das outras classes, regalias podem ser compradas em qualquer ordem dentro de cada categoria.',
        arvoresNomes: ['Maldição', 'Caos', 'Rito', 'Metamorfose', 'Rúnico', 'Elemental'],
        regaliasAvulsasNomes: [],
        especializacoesPuras: ['Metamorfo', 'Elementalista', 'Xamã', 'Bruxo(a)'],
        especializacoesMistas: ['Profano (5 fei + 5 nov)', 'Invocador (5 fei + 5 ini)', 'Caçador(a) de Demônios (3 fei + 7 com)']
    }
];

// ============================================================================
// RESUMO DAS 19 ESPECIALIZAÇÕES (para Wiki e UI)
// ============================================================================
export const resumoEspecializacoes = [
    // --- DO COMBATENTE ---
    { id: 'cavaleiro', nome: 'Cavaleiro(a)', classe: 'combatente_primario', tipo: 'pura', requisito: '10 regalias de Combatente', bonus: { pv: 6, estamina: 3, magia: 1 }, tema: 'Combate montado, liderança e proteção' },
    { id: 'assassino', nome: 'Assassino(a)', classe: 'combatente_primario', tipo: 'pura', requisito: '10 regalias de Combatente', bonus: { pv: 4, estamina: 6, magia: 0 }, tema: 'Furtividade, venenos e dano preciso' },
    { id: 'cacador', nome: 'Caçador(a)', classe: 'combatente_primario', tipo: 'pura', requisito: '10 regalias de Combatente', bonus: { pv: 5, estamina: 4, magia: 1 }, tema: 'Rastreamento, companheiro animal e combate natural' },
    { id: 'barbaro', nome: 'Bárbaro(a)', classe: 'combatente_primario', tipo: 'pura', requisito: '10 regalias de Combatente', bonus: { pv: 8, estamina: 2, magia: 0 }, tema: 'Fúria, resistência e combate brutal' },
    // --- MISTAS COM COMBATENTE ---
    { id: 'monge', nome: 'Monge', classe: 'mista', tipo: 'mista', requisito: '7 regalias de Combatente + 3 de Noviço', bonus: { pv: 4, estamina: 4, magia: 2 }, tema: 'Ki, chakras e combate desarmado' },
    // --- DO NOVIÇO ---
    { id: 'sacerdote', nome: 'Sacerdote', classe: 'novico_primario', tipo: 'pura', requisito: '10 regalias de Noviço', bonus: { pv: 4, estamina: 0, magia: 6 }, tema: 'Cura avançada, ressurreição e proteção divina' },
    { id: 'exorcista', nome: 'Exorcista', classe: 'novico_primario', tipo: 'pura', requisito: '10 regalias de Noviço', bonus: { pv: 5, estamina: 0, magia: 5 }, tema: 'Purificação, dano sagrado e combate contra corruptores' },
    // --- MISTAS COM NOVIÇO ---
    { id: 'inquisidor', nome: 'Inquisidor', classe: 'mista', tipo: 'mista', requisito: '5 regalias de Combatente + 5 de Noviço', bonus: { pv: 5, estamina: 3, magia: 2 }, tema: 'Combate divino, armadura de fé e punição sagrada' },
    { id: 'profano', nome: 'Profano', classe: 'mista', tipo: 'mista', requisito: '5 regalias de Feiticeiro + 5 de Noviço', bonus: { pv: 3, estamina: 0, magia: 7 }, tema: 'Magia necrótica, corrupção divina e heresia', restricao: 'deidade maligna ou neutra' },
    // --- DO INICIADO ---
    { id: 'mago', nome: 'Mago(a)', classe: 'iniciado_primario', tipo: 'pura', requisito: '10 regalias de Iniciado', bonus: { pv: 4, estamina: 0, magia: 5 }, tema: 'Magia avançada, evocação e teletransporte' },
    { id: 'professor', nome: 'Professor(a)', classe: 'iniciado_primario', tipo: 'pura', requisito: '10 regalias de Iniciado', bonus: { pv: 3, estamina: 0, magia: 6 }, tema: 'Construtos arcanos, suporte e magias versáteis' },
    // --- MISTAS COM INICIADO ---
    { id: 'cavaleiro_arcano', nome: 'Cavaleiro(a) Arcano', classe: 'mista', tipo: 'mista', requisito: '5 regalias de Iniciado + 5 de Combatente', bonus: { pv: 5, estamina: 2, magia: 3 }, tema: 'Combate mágico-marcial, armas arcanas e teletransporte tático' },
    { id: 'erudito', nome: 'Erudito', classe: 'mista', tipo: 'mista', requisito: '5 regalias de Iniciado + 5 de Noviço', bonus: { pv: 4, estamina: 0, magia: 6 }, tema: 'Engenharia divina, energia sagrada e sabedoria mista' },
    { id: 'invocador', nome: 'Invocador', classe: 'mista', tipo: 'mista', requisito: '5 regalias de Iniciado + 5 de Feiticeiro', bonus: { pv: 3, estamina: 0, magia: 7 }, tema: 'Invocações, elementais e invocações de combate' },
    // --- DO FEITICEIRO ---
    { id: 'metamorfo', nome: 'Metamorfo', classe: 'feiticeiro_primario', tipo: 'pura', requisito: '10 regalias de Feiticeiro', bonus: { pv: 7, estamina: 0, magia: 3 }, tema: 'Formas licantrópicas, elixires e metamorfose animal' },
    { id: 'elementalista', nome: 'Elementalista', classe: 'feiticeiro_primario', tipo: 'pura', requisito: '10 regalias de Feiticeiro', bonus: { pv: 3, estamina: 0, magia: 6 }, tema: 'Controle elemental avançado e magia de área devastadora' },
    { id: 'xama', nome: 'Xamã', classe: 'feiticeiro_primario', tipo: 'pura', requisito: '10 regalias de Feiticeiro', bonus: { pv: 3, estamina: 0, magia: 7 }, tema: 'Necromancia, espíritos e controle de mortos-vivos' },
    { id: 'bruxo', nome: 'Bruxo(a)', classe: 'feiticeiro_primario', tipo: 'pura', requisito: '10 regalias de Feiticeiro', bonus: { pv: 2, estamina: 0, magia: 8 }, tema: 'Familiar, natureza, ilusões e contratos' },
    // --- MISTA COM FEITICEIRO ---
    { id: 'cacador_demonios', nome: 'Caçador(a) de Demônios', classe: 'mista', tipo: 'mista', requisito: '3 regalias de Feiticeiro + 7 de Combatente', bonus: { pv: 3, estamina: 3, magia: 4 }, tema: 'Caça a corruptores, votos de caçada e combate sombrio' }
];

// ============================================================================
// MECÂNICA DE PONTOS DE FEITIÇARIA (detalhada)
// ============================================================================
export const pontosFeiticaria = {
    descricao: 'Cada magia lançada gera 2 Pontos de Feitiçaria que duram 10 rodadas.',
    geracao: 2,
    duracaoRodadas: 10,
    substituiMana: true,
    taxaSubstituicao: 1, // 1 ponto = 1 mana
    maximoAcumulado: 'ocultismo + ritualismo + arcanismo',
    metamagias: [
        { nome: 'Acelerar Feitiço', custo: 4, efeito: 'Reduz em 1 o custo de ações para conjurar a magia.' },
        { nome: 'Duplicar', custo: 4, efeito: 'Atinge um segundo alvo a até 9 m do primeiro.' },
        { nome: 'Conjuração Atrasada', custo: 4, efeito: 'Adia uma magia de ataque à distância em 6 a 12 segundos.' },
        { nome: 'Eco Elemental', custo: 8, efeito: 'Cria eco elemental que replica próximo ataque elemental.' },
        { nome: 'Ampliação de Efeito', custo: 4, efeito: 'Aumenta a área de efeito em 50%.' }
    ]
};

// ============================================================================
// FUNÇÕES DE CONSULTA
// ============================================================================

/**
 * Retorna as especializações disponíveis para uma classe primária
 * @param {string} classePrimariaId - ex: 'combatente_primario'
 * @returns {{ puras: object[], mistas: object[] }}
 */
export const getEspecializacoesParaClasse = (classePrimariaId) => {
    const map = classeEspecializacaoMap[classePrimariaId];
    if (!map) return { puras: [], mistas: [] };

    const puras = map.puras.map(id => especializacoes.find(e => e.id === id)).filter(Boolean);
    const mistas = map.mistas.map(m => ({
        ...especializacoes.find(e => e.id === m.id),
        outrasClasses: m.outrasClasses,
        minPropria: m.minPropria
    })).filter(e => e.id);

    return { puras, mistas };
};

/**
 * Verifica se um personagem atende os requisitos de uma especialização
 * @param {string} especializacaoId 
 * @param {object} regaliasCompradas - { combatente_primario: 12, novico_primario: 5, ... }
 * @returns {{ elegivel: boolean, faltam: object|null }}
 */
export const verificarRequisitoEspecializacao = (especializacaoId, regaliasCompradas = {}) => {
    const espec = especializacoes.find(e => e.id === especializacaoId);
    if (!espec) return { elegivel: false, faltam: { erro: 'Especialização não encontrada' } };

    const requisitos = espec.preRequisitos?.regaliasPrimarias || {};
    const faltam = {};
    let elegivel = true;

    for (const [classeId, qtdNecessaria] of Object.entries(requisitos)) {
        const qtdAtual = regaliasCompradas[classeId] || 0;
        if (qtdAtual < qtdNecessaria) {
            elegivel = false;
            faltam[classeId] = qtdNecessaria - qtdAtual;
        }
    }

    return { elegivel, faltam: elegivel ? null : faltam };
};

/**
 * Retorna a progressão completa: aprendiz → classe primária → especializações
 * @param {string} aprendizId - ex: 'combatente'
 */
export const getProgressaoCompleta = (aprendizId) => {
    const aprendiz = classesAprendiz.find(a => a.id === aprendizId);
    if (!aprendiz || !aprendiz.classePrimariaRelacionada) return null;

    const classe = classesPrimarias.find(c => c.id === aprendiz.classePrimariaRelacionada);
    if (!classe) return null;

    const especs = getEspecializacoesParaClasse(classe.id);

    return {
        aprendiz,
        classePrimaria: classe,
        especializacoesPuras: especs.puras,
        especializacoesMistas: especs.mistas
    };
};

/**
 * Calcula totais de bônus por regalias compradas em uma classe primária
 * @param {string} classePrimariaId 
 * @param {number} qtdRegalias
 * @returns {{ pv: number, estamina: number, magia: number }}
 */
export const calcularBonusClassePrimaria = (classePrimariaId, qtdRegalias) => {
    const classe = classesPrimarias.find(c => c.id === classePrimariaId);
    if (!classe) return { pv: 0, estamina: 0, magia: 0 };

    const b = classe.bonusPorRegalia;
    return {
        pv: b.pv * qtdRegalias,
        estamina: b.estamina * qtdRegalias,
        magia: b.magia * qtdRegalias
    };
};

/**
 * Calcula totais de bônus por regalias compradas em uma especialização
 * @param {string} especializacaoId 
 * @param {number} qtdRegalias
 * @returns {{ pv: number, estamina: number, magia: number }}
 */
export const calcularBonusEspecializacao = (especializacaoId, qtdRegalias) => {
    const espec = especializacoes.find(e => e.id === especializacaoId);
    if (!espec) return { pv: 0, estamina: 0, magia: 0 };

    const b = espec.bonusPorRegalia;
    return {
        pv: b.pv * qtdRegalias,
        estamina: b.estamina * qtdRegalias,
        magia: b.magia * qtdRegalias
    };
};

/**
 * Lista todas as especializações mistas (requerem 2+ classes)
 */
export const getEspecializacoesMistas = () => {
    return especializacoes.filter(e => {
        const reqs = e.preRequisitos?.regaliasPrimarias || {};
        return Object.keys(reqs).length > 1;
    });
};

/**
 * Lista todas as especializações puras (requerem apenas 1 classe)
 */
export const getEspecializacoesPuras = () => {
    return especializacoes.filter(e => {
        const reqs = e.preRequisitos?.regaliasPrimarias || {};
        return Object.keys(reqs).length === 1;
    });
};

/**
 * Retorna a árvore de regalias de uma classe primária pelo id da árvore
 * @param {string} classePrimariaId 
 * @param {string} arvoreId 
 */
export const getArvoreRegalia = (classePrimariaId, arvoreId) => {
    const classe = classesPrimarias.find(c => c.id === classePrimariaId);
    if (!classe) return null;
    return classe.arvoresRegalia?.find(a => a.id === arvoreId) || null;
};

/**
 * Para selects no UI: retorna todas as opções de progressão formatadas
 */
export const getOpcoesProgressaoParaSelect = () => {
    return classesAprendiz
        .filter(a => a.classePrimariaRelacionada)
        .map(a => {
            const prog = getProgressaoCompleta(a.id);
            if (!prog) return null;
            return {
                aprendiz: { value: a.id, label: a.nome },
                classePrimaria: { value: prog.classePrimaria.id, label: prog.classePrimaria.nome },
                especializacoes: [
                    ...prog.especializacoesPuras.map(e => ({ value: e.id, label: e.nome, tipo: 'pura' })),
                    ...prog.especializacoesMistas.map(e => ({ value: e.id, label: e.nome, tipo: 'mista' }))
                ]
            };
        })
        .filter(Boolean);
};

// ============================================================================
// RE-EXPORTS DE REGALIAS.JS (conveniência)
// ============================================================================
export {
    classesPrimarias,
    especializacoes,
    regaliasDeAprendiz,
    regaliasOpcionais,
    getRegaliaAprendiz,
    getClassePrimaria,
    getEspecializacao,
    getClassesPrimariasParaSelect,
    getEspecializacoesParaSelect,
    pontosRegaliaPorNivel
};

export default {
    classesAprendiz,
    classesPrimarias,
    especializacoes,
    classeEspecializacaoMap,
    resumoClassesPrimarias,
    resumoEspecializacoes,
    pontosFeiticaria
};
