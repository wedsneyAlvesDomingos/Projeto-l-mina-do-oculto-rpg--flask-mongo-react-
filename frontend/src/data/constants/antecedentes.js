/**
 * Dados centralizados de Antecedentes (Backgrounds) do sistema Lâmina do Oculto
 * Este arquivo contém todos os antecedentes disponíveis para personagens.
 *
 * === SCHEMA POR ANTECEDENTE (TODO-ANT-001) ===
 * nome               — string display name (UPPER CASE)
 * descricao          — texto para exibição
 * habilidades        — string[] texto original para exibição
 * bonusEstruturado   — [{ habilidade: string, pontos: int }] bônus fixos parseáveis
 * escolhasHabilidades — [{ grupo: string[], pontos: int }] bônus com escolha restrita
 * proficienciasGanhas — [{ proficiencia: string, pontos: int }] proficiências fixas
 * escolhasProficiencias — [{ grupo: string[], pontos: int }] proficiências com escolha
 * itensIniciais       — string[] itens/equipamento narrativo
 * moedasExtra         — int (moedas de ouro extras, 0 se nenhuma)
 * escolhasLivres      — int (slots de escolha livre, para AMNÉSICO etc.)
 *
 * Usado em: criarPersonagem.js, Wiki/backgrounds
 */

// ============================================================================
// ANTECEDENTES COMPLETOS
// ============================================================================

export const antecedentes = [
    {
        nome: "ABENÇOADO",
        descricao: "Um personagem com este antecedente possui um histórico religioso e foi tocado por uma divindade.",
        habilidades: [
            "2 pontos em Teologia e História",
            "2 pontos em Intuição",
            "-1 em Ritualismo e Ocultismo"
        ],
        bonusEstruturado: [
            { habilidade: 'teologia', pontos: 2 },
            { habilidade: 'historia', pontos: 2 },
            { habilidade: 'intuicao', pontos: 2 },
            { habilidade: 'ritualismo', pontos: -1 },
            { habilidade: 'ocultismo', pontos: -1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "ACADÊMICO",
        descricao: "Um personagem com este antecedente possui um histórico estudioso, passando muito tempo em uma academia.",
        habilidades: [
            "2 pontos em História e Natureza",
            "1 ponto em Jurisprudência",
            "1 ponto na proficiência Línguas Antigas"
        ],
        bonusEstruturado: [
            { habilidade: 'historia', pontos: 2 },
            { habilidade: 'natureza', pontos: 2 },
            { habilidade: 'jurisprudencia', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [
            { proficiencia: 'linguas_antigas', pontos: 1 }
        ],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "ACÓLITO",
        descricao: "Um personagem com este antecedente é um devoto de um templo.",
        habilidades: [
            "2 pontos em Teologia e Jurisprudência",
            "1 ponto em História e Intuição",
            "Um símbolo religioso que permite conjurar o milagre Tocha Sagrada por 10 minutos 1 vez no dia."
        ],
        bonusEstruturado: [
            { habilidade: 'teologia', pontos: 2 },
            { habilidade: 'jurisprudencia', pontos: 2 },
            { habilidade: 'historia', pontos: 1 },
            { habilidade: 'intuicao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Símbolo religioso (Tocha Sagrada 1x/dia)'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "ACROBATA",
        descricao: "Um personagem com este antecedente possui um histórico de ser um ginasta ou praticante de algum tipo de apresentação artística acrobática. Um acrobata consegue ser flexível e tem um conhecimento do próprio corpo.",
        habilidades: [
            "2 pontos em Acrobacia",
            "2 pontos em Performance",
            "1 ponto em Destreza",
            "1 ponto em Agilidade"
        ],
        bonusEstruturado: [
            { habilidade: 'acrobacia', pontos: 2 },
            { habilidade: 'performance', pontos: 2 },
            { habilidade: 'destreza', pontos: 1 },
            { habilidade: 'agilidade', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "ADESTRADOR DE ANIMAIS",
        descricao: "Um personagem com este antecedente possui um histórico de lidar com animais com fim de treinamento.",
        habilidades: [
            "2 pontos em Intuição",
            "2 pontos em Lidar com animais",
            "1 ponto em Natureza",
            "1 ponto em Armadilhas"
        ],
        bonusEstruturado: [
            { habilidade: 'intuicao', pontos: 2 },
            { habilidade: 'lidar_com_animais', pontos: 2 },
            { habilidade: 'natureza', pontos: 1 },
            { habilidade: 'armadilhas', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "AMALDIÇOADO",
        descricao: "Um personagem com este antecedente possui um histórico de tormento e de azar. Um personagem pode ter sido amaldiçoado por um demônio, bruxo ou outro membro do oculto.",
        habilidades: [
            "2 pontos em Percepção",
            "2 pontos em Ocultismo",
            "2 pontos em Intimidação",
            "2 pontos em Ritualismo",
            "-1 ponto em Intuição",
            "-1 ponto em Persuasão"
        ],
        bonusEstruturado: [
            { habilidade: 'percepcao', pontos: 2 },
            { habilidade: 'ocultismo', pontos: 2 },
            { habilidade: 'intimidacao', pontos: 2 },
            { habilidade: 'ritualismo', pontos: 2 },
            { habilidade: 'intuicao', pontos: -1 },
            { habilidade: 'persuasao', pontos: -1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "AMNÉSICO",
        descricao: "Um personagem com este antecedente não possui um histórico.",
        habilidades: [
            "2 pontos em Habilidade escolhida",
            "2 pontos em Habilidade escolhida",
            "1 ponto em Habilidade escolhida",
            "1 ponto em Habilidade escolhida"
        ],
        bonusEstruturado: [],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 4
    },
    {
        nome: "ARQUEOLOGISTA",
        descricao: "Um personagem com este antecedente possui um histórico acadêmico. Passou anos estudando história e explorando ruínas.",
        habilidades: [
            "2 pontos em História",
            "2 pontos em Navegação",
            "1 ponto em Natureza",
            "1 ponto em Investigação",
            "1 ponto em Proficiência Arqueólogo"
        ],
        bonusEstruturado: [
            { habilidade: 'historia', pontos: 2 },
            { habilidade: 'navegacao', pontos: 2 },
            { habilidade: 'natureza', pontos: 1 },
            { habilidade: 'investigacao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [
            { proficiencia: 'arqueologo', pontos: 1 }
        ],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "ARTESÃO",
        descricao: "Um personagem com este antecedente possui um histórico de trabalhar com criações manuais de madeira, pedra, tecido ou argila.",
        habilidades: [
            "2 pontos em Natureza",
            "2 pontos em Percepção",
            "1 ponto em Negociação",
            "1 ponto em Destreza",
            "1 ponto em Ferreiro, Alfaiate, Marceneiro ou Joalheiro",
            "1 kit de Ferramentas"
        ],
        bonusEstruturado: [
            { habilidade: 'natureza', pontos: 2 },
            { habilidade: 'percepcao', pontos: 2 },
            { habilidade: 'negociacao', pontos: 1 },
            { habilidade: 'destreza', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [
            { grupo: ['ferreiro', 'alfaiate', 'marceneiro', 'joalheiro'], pontos: 1 }
        ],
        itensIniciais: ['Kit de Ferramentas'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "ASSISTENTE DE LABORATÓRIO",
        descricao: "Um personagem com este antecedente possui um histórico de ajudar em pesquisas feitas em um laboratório químico.",
        habilidades: [
            "2 pontos em Natureza",
            "2 pontos em Alquimia",
            "1 ponto em História",
            "1 ponto em Arcanismo",
            "1 ponto em Mutações da espécie variante Mutante"
        ],
        bonusEstruturado: [
            { habilidade: 'natureza', pontos: 2 },
            { habilidade: 'alquimia', pontos: 2 },
            { habilidade: 'historia', pontos: 1 },
            { habilidade: 'arcanismo', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['1 mutação (espécie variante Mutante)'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "ASTRÔNOMO",
        descricao: "Um personagem com este antecedente possui um histórico acadêmico do estudo das estrelas e seus padrões.",
        habilidades: [
            "2 pontos em Navegação",
            "2 pontos em Natureza",
            "1 ponto em História",
            "1 ponto em Percepção",
            "1 Mapa das estrelas",
            "1 telescópio portátil",
            "1 kit de cartografia"
        ],
        bonusEstruturado: [
            { habilidade: 'navegacao', pontos: 2 },
            { habilidade: 'natureza', pontos: 2 },
            { habilidade: 'historia', pontos: 1 },
            { habilidade: 'percepcao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Mapa das estrelas', 'Telescópio portátil', 'Kit de cartografia'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "ATOR",
        descricao: "Um personagem com este antecedente possui um histórico de ser um artista das artes cênicas.",
        habilidades: [
            "2 pontos em Performance",
            "2 pontos em Persuasão",
            "1 ponto em Sedução",
            "1 ponto em Enganação",
            "1 ponto na Proficiência em Disfarce",
            "1 kit de disfarce"
        ],
        bonusEstruturado: [
            { habilidade: 'performance', pontos: 2 },
            { habilidade: 'persuasao', pontos: 2 },
            { habilidade: 'seducao', pontos: 1 },
            { habilidade: 'enganacao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [
            { proficiencia: 'disfarce', pontos: 1 }
        ],
        escolhasProficiencias: [],
        itensIniciais: ['Kit de disfarce'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "BANDIDO",
        descricao: "Um personagem com este antecedente possui um histórico de atacar viajantes na beira das estradas ou vítimas indefesas em becos.",
        habilidades: [
            "2 pontos em Intimidação",
            "2 pontos em Furtividade",
            "1 ponto em Agilidade",
            "1 ponto em Percepção",
            "1 Ferramentas de ladrão"
        ],
        bonusEstruturado: [
            { habilidade: 'intimidacao', pontos: 2 },
            { habilidade: 'furtividade', pontos: 2 },
            { habilidade: 'agilidade', pontos: 1 },
            { habilidade: 'percepcao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Ferramentas de ladrão'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "BARBEIRO",
        descricao: "Um personagem com este antecedente possui um histórico de ser um trabalhador comum em uma cidade, que trabalha cortando cabelo e fazendo a barba de clientes.",
        habilidades: [
            "2 pontos em Intuição",
            "2 pontos em Negociação",
            "1 ponto em Agilidade",
            "1 ponto em Destreza",
            "1 kit de disfarce"
        ],
        bonusEstruturado: [
            { habilidade: 'intuicao', pontos: 2 },
            { habilidade: 'negociacao', pontos: 2 },
            { habilidade: 'agilidade', pontos: 1 },
            { habilidade: 'destreza', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Kit de disfarce'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "BATEDOR",
        descricao: "Um personagem com este antecedente possui um histórico de ser um forma de soldado ou informante dentro de uma instituição ou contratado por uma caravana.",
        habilidades: [
            "2 pontos em Sobrevivência",
            "2 pontos em Navegação",
            "1 ponto em Furtividade",
            "1 ponto em Percepção",
            "1 ponto na Proficiência em Ferramentas de ladrão",
            "1 kit de explorador",
            "1 kit de escalada"
        ],
        bonusEstruturado: [
            { habilidade: 'sobrevivencia', pontos: 2 },
            { habilidade: 'navegacao', pontos: 2 },
            { habilidade: 'furtividade', pontos: 1 },
            { habilidade: 'percepcao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [
            { proficiencia: 'ferramentas_de_ladrao', pontos: 1 }
        ],
        escolhasProficiencias: [],
        itensIniciais: ['Kit de explorador', 'Kit de escalada'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "BIBLIOTECÁRIO",
        descricao: "Um personagem com este antecedente possui um histórico de ser um trabalhador comum em uma grande cidade, mais especificamente na biblioteca de uma academia ou particular.",
        habilidades: [
            "2 pontos em História",
            "2 pontos em Jurisprudência",
            "1 ponto em Teologia",
            "1 ponto em Natureza",
            "1 ponto na Proficiência em Línguas Antigas"
        ],
        bonusEstruturado: [
            { habilidade: 'historia', pontos: 2 },
            { habilidade: 'jurisprudencia', pontos: 2 },
            { habilidade: 'teologia', pontos: 1 },
            { habilidade: 'natureza', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [
            { proficiencia: 'linguas_antigas', pontos: 1 }
        ],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "CAÇADOR DE RECOMPENSAS",
        descricao: "Um personagem com este antecedente possui um histórico de caçar criminosos procurados.",
        habilidades: [
            "2 pontos em Rastreamento",
            "2 pontos em Investigação",
            "1 ponto em Persuasão",
            "1 ponto em Negociação",
            "1 kit de explorador"
        ],
        bonusEstruturado: [
            { habilidade: 'rastreamento', pontos: 2 },
            { habilidade: 'investigacao', pontos: 2 },
            { habilidade: 'persuasao', pontos: 1 },
            { habilidade: 'negociacao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Kit de explorador'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "CAPANGA",
        descricao: "Um personagem com este antecedente possui um histórico de trabalhar como músculo de cobrança ou proteção de um criminoso ou outro tipo de indivíduo excuso.",
        habilidades: [
            "2 pontos em Negociação",
            "2 pontos em Intimidação",
            "1 ponto em Fortitude",
            "1 ponto em Força",
            "1 Ferramentas de ladrão"
        ],
        bonusEstruturado: [
            { habilidade: 'negociacao', pontos: 2 },
            { habilidade: 'intimidacao', pontos: 2 },
            { habilidade: 'fortitude', pontos: 1 },
            { habilidade: 'forca', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Ferramentas de ladrão'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "CARTEIRO",
        descricao: "Um personagem com este antecedente possui um histórico de trabalhar como entregador de correspondências.",
        habilidades: [
            "2 pontos em Percepção",
            "2 pontos em Navegação",
            "1 ponto em Agilidade",
            "1 ponto em Intuição",
            "1 kit de explorador",
            "1 kit de cartografia",
            "1 ponto na proficiência condução de veículos terrestres",
            "1 cavalo (50 po.)"
        ],
        bonusEstruturado: [
            { habilidade: 'percepcao', pontos: 2 },
            { habilidade: 'navegacao', pontos: 2 },
            { habilidade: 'agilidade', pontos: 1 },
            { habilidade: 'intuicao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [
            { proficiencia: 'conducao_veiculos_terrestres', pontos: 1 }
        ],
        escolhasProficiencias: [],
        itensIniciais: ['Kit de explorador', 'Kit de cartografia', 'Cavalo (50 M.O.)'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "CAMPONÊS",
        descricao: "Um personagem com este antecedente possui um histórico simples e tranquilo. Viveu possivelmente sem muitos luxos, mas não necessariamente em grande pobreza.",
        habilidades: [
            "2 pontos em Sobrevivência",
            "2 pontos em Lidar com animais",
            "1 ponto em Fortitude",
            "1 ponto em Destreza",
            "2 pontos na Proficiência Condução e Veículos Terrestres"
        ],
        bonusEstruturado: [
            { habilidade: 'sobrevivencia', pontos: 2 },
            { habilidade: 'lidar_com_animais', pontos: 2 },
            { habilidade: 'fortitude', pontos: 1 },
            { habilidade: 'destreza', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [
            { proficiencia: 'conducao_veiculos_terrestres', pontos: 2 }
        ],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "CHARLATÃO",
        descricao: "Um personagem com este antecedente possui um histórico de enganar e dar golpes em desavisados pelas cidades e vilas por aí.",
        habilidades: [
            "2 pontos em Performance",
            "2 pontos em Enganação",
            "1 ponto em Persuasão",
            "1 ponto em Agilidade",
            "1 ponto na Proficiência Disfarce",
            "1 kit de disfarce"
        ],
        bonusEstruturado: [
            { habilidade: 'performance', pontos: 2 },
            { habilidade: 'enganacao', pontos: 2 },
            { habilidade: 'persuasao', pontos: 1 },
            { habilidade: 'agilidade', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [
            { proficiencia: 'disfarce', pontos: 1 }
        ],
        escolhasProficiencias: [],
        itensIniciais: ['Kit de disfarce'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "CIRCENSE",
        descricao: "Um personagem com este antecedente possui um histórico de viajar com um circo pelas estradas do mundo sem um rumo e atrás de novos clientes e experiências.",
        habilidades: [
            "2 pontos em Navegação",
            "2 pontos em Performance",
            "1 ponto em Agilidade",
            "1 ponto em Acrobacia",
            "1 mutação da lista de mutações da espécie variante Mutante"
        ],
        bonusEstruturado: [
            { habilidade: 'navegacao', pontos: 2 },
            { habilidade: 'performance', pontos: 2 },
            { habilidade: 'agilidade', pontos: 1 },
            { habilidade: 'acrobacia', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['1 mutação (espécie variante Mutante)'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "COMERCIANTE",
        descricao: "Um personagem com este antecedente possui um histórico de trabalhar com venda e/ou compra de produtos, serviços e imóveis.",
        habilidades: [
            "2 pontos em Negociação",
            "2 pontos em Arcanatec",
            "1 ponto em Enganação",
            "1 ponto em Persuasão",
            "1 kit de Sobrevivência"
        ],
        bonusEstruturado: [
            { habilidade: 'negociacao', pontos: 2 },
            { habilidade: 'arcanatec', pontos: 2 },
            { habilidade: 'enganacao', pontos: 1 },
            { habilidade: 'persuasao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Kit de Sobrevivência'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "CORTESÃO",
        descricao: "Um personagem com este antecedente possui um histórico social de alto status.",
        habilidades: [
            "2 pontos em História",
            "2 pontos em Persuasão",
            "1 ponto em Sedução",
            "1 ponto em Intuição",
            "Vestuárias finas"
        ],
        bonusEstruturado: [
            { habilidade: 'historia', pontos: 2 },
            { habilidade: 'persuasao', pontos: 2 },
            { habilidade: 'seducao', pontos: 1 },
            { habilidade: 'intuicao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Vestuárias finas'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "CURANDEIRO",
        descricao: "Um personagem com este antecedente possui um histórico de trabalhar como um farmacêutico e responsável por doentes em pequenas vilas e cidades.",
        habilidades: [
            "2 pontos em Medicina",
            "2 pontos em Natureza",
            "1 ponto em Sobrevivência",
            "1 ponto em Alquimia",
            "1 kit Médico",
            "1 kit de Herbalismo"
        ],
        bonusEstruturado: [
            { habilidade: 'medicina', pontos: 2 },
            { habilidade: 'natureza', pontos: 2 },
            { habilidade: 'sobrevivencia', pontos: 1 },
            { habilidade: 'alquimia', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Kit Médico', 'Kit de Herbalismo'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "DETETIVE",
        descricao: "Um personagem com este antecedente possui um histórico de ser um detetive particular que recolhe informações para a guarda ou civis.",
        habilidades: [
            "2 pontos em Investigação",
            "2 pontos em Rastreio",
            "1 ponto em Jurisprudência",
            "1 ponto em Intuição",
            "1 kit de explorador"
        ],
        bonusEstruturado: [
            { habilidade: 'investigacao', pontos: 2 },
            { habilidade: 'rastreamento', pontos: 2 },
            { habilidade: 'jurisprudencia', pontos: 1 },
            { habilidade: 'intuicao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Kit de explorador'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "EREMITA",
        descricao: "Um personagem com este antecedente possui um histórico de isolamento por penitência ou amor à natureza.",
        habilidades: [
            "2 pontos em Natureza",
            "2 pontos em Sobrevivência",
            "1 ponto em Furtividade",
            "1 ponto em Lidar com Animais",
            "1 kit de sobrevivência"
        ],
        bonusEstruturado: [
            { habilidade: 'natureza', pontos: 2 },
            { habilidade: 'sobrevivencia', pontos: 2 },
            { habilidade: 'furtividade', pontos: 1 },
            { habilidade: 'lidar_com_animais', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Kit de sobrevivência'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "ESCUDEIRO",
        descricao: "Um personagem com este antecedente possui um histórico de trabalhar para um cavaleiro em uma batalha ou competição. Geralmente os escudeiros são treinados para quem trabalha.",
        habilidades: [
            "2 pontos em História",
            "2 pontos em Atletismo",
            "1 ponto em Fortitude",
            "1 ponto em Força ou Destreza",
            "1 kit de ferramentas"
        ],
        bonusEstruturado: [
            { habilidade: 'historia', pontos: 2 },
            { habilidade: 'atletismo', pontos: 2 },
            { habilidade: 'fortitude', pontos: 1 }
        ],
        escolhasHabilidades: [
            { grupo: ['forca', 'destreza'], pontos: 1 }
        ],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Kit de ferramentas'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "ESPIÃO",
        descricao: "Um personagem com este antecedente possui um histórico de trabalhar infiltrado ou entrando em ambientes para roubá-las.",
        habilidades: [
            "2 pontos em Furtividade",
            "2 pontos em Investigação",
            "1 ponto em Intuição",
            "1 ponto em Enganação",
            "1 ponto na Proficiência em Disfarce",
            "1 kit de disfarce",
            "1 kit de venenos"
        ],
        bonusEstruturado: [
            { habilidade: 'furtividade', pontos: 2 },
            { habilidade: 'investigacao', pontos: 2 },
            { habilidade: 'intuicao', pontos: 1 },
            { habilidade: 'enganacao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [
            { proficiencia: 'disfarce', pontos: 1 }
        ],
        escolhasProficiencias: [],
        itensIniciais: ['Kit de disfarce', 'Kit de venenos'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "ESTUDANTE DE MAGIA",
        descricao: "Um personagem com este antecedente possui um histórico de estudar em uma academia de magia ou possui um tutor.",
        habilidades: [
            "2 pontos em Arcanismo",
            "2 pontos em Alquimia",
            "1 ponto em Arcanatec",
            "1 ponto em Natureza"
        ],
        bonusEstruturado: [
            { habilidade: 'arcanismo', pontos: 2 },
            { habilidade: 'alquimia', pontos: 2 },
            { habilidade: 'arcanatec', pontos: 1 },
            { habilidade: 'natureza', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "FANÁTICO",
        descricao: "Um personagem com este antecedente possui um histórico de ser integrante ou ex-integrante de um grupo religioso ou culto.",
        habilidades: [
            "2 pontos em Ocultismo",
            "2 pontos em Ritualismo",
            "1 ponto em Arcanismo",
            "1 ponto em Teologia"
        ],
        bonusEstruturado: [
            { habilidade: 'ocultismo', pontos: 2 },
            { habilidade: 'ritualismo', pontos: 2 },
            { habilidade: 'arcanismo', pontos: 1 },
            { habilidade: 'teologia', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "FORASTEIRO",
        descricao: "Um personagem com este antecedente possui um histórico de ser de uma terra longínqua ou isolada.",
        habilidades: [
            "2 pontos em Navegação",
            "2 pontos em Sobrevivência",
            "1 ponto em História",
            "1 ponto em Negociação"
        ],
        bonusEstruturado: [
            { habilidade: 'navegacao', pontos: 2 },
            { habilidade: 'sobrevivencia', pontos: 2 },
            { habilidade: 'historia', pontos: 1 },
            { habilidade: 'negociacao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "GLADIADOR",
        descricao: "Um personagem com este antecedente possui um histórico em lutar em arenas por dinheiro, honra ou obrigação.",
        habilidades: [
            "2 pontos em Atletismo",
            "2 pontos em Acrobacia",
            "1 ponto em Força ou Destreza",
            "1 ponto em Fortitude"
        ],
        bonusEstruturado: [
            { habilidade: 'atletismo', pontos: 2 },
            { habilidade: 'acrobacia', pontos: 2 },
            { habilidade: 'fortitude', pontos: 1 }
        ],
        escolhasHabilidades: [
            { grupo: ['forca', 'destreza'], pontos: 1 }
        ],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "GUARDA",
        descricao: "Um personagem com este antecedente possui um histórico de trabalhar na guarda de uma cidade, provavelmente como soldado.",
        habilidades: [
            "2 pontos em Jurisprudência",
            "2 pontos em Percepção",
            "1 ponto na Proficiência em Armaduras ou Esgrima"
        ],
        bonusEstruturado: [
            { habilidade: 'jurisprudencia', pontos: 2 },
            { habilidade: 'percepcao', pontos: 2 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [
            { grupo: ['armaduras', 'esgrima'], pontos: 1 }
        ],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "HERDEIRO",
        descricao: "Um personagem com este antecedente possui um histórico de vir de uma família rica e algum parente próximo acabou de morrer e lhe deixar dinheiro, pertences ou terrenos. O personagem não começa o jogo com esses espólios, mas pode reivindicá-los em jogo.",
        habilidades: [
            "2 pontos em Persuasão",
            "2 pontos em História",
            "200 moedas de ouro",
            "Vestuárias Finas"
        ],
        bonusEstruturado: [
            { habilidade: 'persuasao', pontos: 2 },
            { habilidade: 'historia', pontos: 2 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Vestuárias Finas'],
        moedasExtra: 200,
        escolhasLivres: 0
    },
    {
        nome: "HEROICO",
        descricao: "Um personagem com este antecedente possui um histórico de ter salvado uma ou mais pessoas de um pequeno perigo ou um inimigo problemático para pessoas fracas.",
        habilidades: [
            "2 pontos em Acrobacia",
            "2 pontos em Medicina",
            "1 ponto em Atletismo",
            "1 ponto em Agilidade"
        ],
        bonusEstruturado: [
            { habilidade: 'acrobacia', pontos: 2 },
            { habilidade: 'medicina', pontos: 2 },
            { habilidade: 'atletismo', pontos: 1 },
            { habilidade: 'agilidade', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "JORNALEIRO",
        descricao: "Um personagem com este antecedente possui um histórico de trabalhar como investigador de notícias e também como entregador.",
        habilidades: [
            "2 pontos em Intuição",
            "2 pontos em Investigação",
            "1 ponto em História",
            "1 ponto em Navegação"
        ],
        bonusEstruturado: [
            { habilidade: 'intuicao', pontos: 2 },
            { habilidade: 'investigacao', pontos: 2 },
            { habilidade: 'historia', pontos: 1 },
            { habilidade: 'navegacao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "MARUJO",
        descricao: "Um personagem com este antecedente possui um histórico de trabalhar em barcos dentro da legalidade ou não.",
        habilidades: [
            "2 pontos na Proficiência Veículos Aquáticos",
            "1 ponto em Intimidação",
            "1 ponto em Navegação",
            "1 ponto em Força ou Destreza"
        ],
        bonusEstruturado: [
            { habilidade: 'intimidacao', pontos: 1 },
            { habilidade: 'navegacao', pontos: 1 }
        ],
        escolhasHabilidades: [
            { grupo: ['forca', 'destreza'], pontos: 1 }
        ],
        proficienciasGanhas: [
            { proficiencia: 'veiculos_aquaticos', pontos: 2 }
        ],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "MÉDICO DE BECO",
        descricao: "Um personagem com este antecedente possui um histórico de ser um médico ilegal que atende de maneira clandestina dentro de cidades.",
        habilidades: [
            "2 pontos em Medicina",
            "2 pontos em Alquimia",
            "1 ponto em Furtividade",
            "1 ponto em Enganação",
            "1 kit de ferramentas"
        ],
        bonusEstruturado: [
            { habilidade: 'medicina', pontos: 2 },
            { habilidade: 'alquimia', pontos: 2 },
            { habilidade: 'furtividade', pontos: 1 },
            { habilidade: 'enganacao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Kit de ferramentas'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "MENESTREL",
        descricao: "Um personagem com este antecedente possui um histórico de ser um músico e poeta, viajante ou não.",
        habilidades: [
            "2 pontos em Performance",
            "2 pontos em Sedução",
            "1 ponto em Persuasão",
            "1 ponto em Enganação",
            "1 kit de músico",
            "1 instrumento a sua escolha de até 1 M.O."
        ],
        bonusEstruturado: [
            { habilidade: 'performance', pontos: 2 },
            { habilidade: 'seducao', pontos: 2 },
            { habilidade: 'persuasao', pontos: 1 },
            { habilidade: 'enganacao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Kit de músico', 'Instrumento musical (até 1 M.O.)'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "MINERADOR",
        descricao: "Um personagem com este antecedente possui um histórico de trabalhar nas minas para coletar minérios diversos.",
        habilidades: [
            "2 pontos em Natureza",
            "2 pontos em Navegação",
            "1 ponto em Fortitude",
            "1 ponto em Força",
            "1 kit de escalada"
        ],
        bonusEstruturado: [
            { habilidade: 'natureza', pontos: 2 },
            { habilidade: 'navegacao', pontos: 2 },
            { habilidade: 'fortitude', pontos: 1 },
            { habilidade: 'forca', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Kit de escalada'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "NAVEGADOR",
        descricao: "Um personagem com este antecedente possui um histórico de ser o leitor de mapas de uma expedição, o navegador de um navio em alto mar, etc.",
        habilidades: [
            "2 pontos em Navegação",
            "2 pontos em Percepção",
            "1 ponto em Investigação",
            "1 ponto em História"
        ],
        bonusEstruturado: [
            { habilidade: 'navegacao', pontos: 2 },
            { habilidade: 'percepcao', pontos: 2 },
            { habilidade: 'investigacao', pontos: 1 },
            { habilidade: 'historia', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "NOBRE",
        descricao: "Um personagem com este antecedente possui um histórico de possuir um título de nobreza em sua família.",
        habilidades: [
            "2 pontos em Jurisprudência",
            "2 pontos em História",
            "150 moedas de ouro extra",
            "Vestuárias finas",
            "Cavalo (50 M.O.)"
        ],
        bonusEstruturado: [
            { habilidade: 'jurisprudencia', pontos: 2 },
            { habilidade: 'historia', pontos: 2 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Vestuárias finas', 'Cavalo (50 M.O.)'],
        moedasExtra: 150,
        escolhasLivres: 0
    },
    {
        nome: "NÔMADE",
        descricao: "Um personagem com este antecedente possui um histórico de não ficar em um mesmo lugar durante longos períodos de tempo. Nômades normalmente andam em grupos.",
        habilidades: [
            "2 pontos em Lidar com animais",
            "2 pontos em Navegação",
            "1 ponto em História",
            "1 ponto em Sobrevivência",
            "1 kit de sobrevivência"
        ],
        bonusEstruturado: [
            { habilidade: 'lidar_com_animais', pontos: 2 },
            { habilidade: 'navegacao', pontos: 2 },
            { habilidade: 'historia', pontos: 1 },
            { habilidade: 'sobrevivencia', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: ['Kit de sobrevivência'],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "ÓRFÃO",
        descricao: "Um personagem com este antecedente possui um histórico de não saber quem são seus pais e família, ou dessa família ter morrido.",
        habilidades: [
            "2 pontos em Sobrevivência",
            "2 pontos em Enganação",
            "1 ponto em Furtividade",
            "1 ponto em Agilidade"
        ],
        bonusEstruturado: [
            { habilidade: 'sobrevivencia', pontos: 2 },
            { habilidade: 'enganacao', pontos: 2 },
            { habilidade: 'furtividade', pontos: 1 },
            { habilidade: 'agilidade', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "PEREGRINO",
        descricao: "Um personagem com este antecedente possui um histórico de ter feito ou estar fazendo uma viagem religiosa, de penitência ou de aprendizado.",
        habilidades: [
            "2 pontos em Navegação",
            "2 pontos em História",
            "1 ponto em Teologia",
            "1 ponto em Percepção"
        ],
        bonusEstruturado: [
            { habilidade: 'navegacao', pontos: 2 },
            { habilidade: 'historia', pontos: 2 },
            { habilidade: 'teologia', pontos: 1 },
            { habilidade: 'percepcao', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "PRISIONEIRO",
        descricao: "Um personagem com este antecedente possui um histórico de ter sido um prisioneiro e cumprido sua pena, ou ter fugido da cadeia.",
        habilidades: [
            "2 pontos em Furtividade",
            "2 pontos em Intimidação",
            "1 ponto em Jurisprudência",
            "1 ponto em Agilidade"
        ],
        bonusEstruturado: [
            { habilidade: 'furtividade', pontos: 2 },
            { habilidade: 'intimidacao', pontos: 2 },
            { habilidade: 'jurisprudencia', pontos: 1 },
            { habilidade: 'agilidade', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "REFUGIADO",
        descricao: "Um personagem com este antecedente possui um histórico de estar fugindo de um desastre natural ou avanços militares.",
        habilidades: [
            "2 pontos em Sobrevivência",
            "2 pontos em Persuasão",
            "1 ponto em Intuição",
            "1 ponto em História"
        ],
        bonusEstruturado: [
            { habilidade: 'sobrevivencia', pontos: 2 },
            { habilidade: 'persuasao', pontos: 2 },
            { habilidade: 'intuicao', pontos: 1 },
            { habilidade: 'historia', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    },
    {
        nome: "TAVERNEIRO",
        descricao: "Um personagem com este antecedente possui um histórico de trabalhar em uma taverna como cozinheiro, ajudante de cozinheiro, servir comida e bebida.",
        habilidades: [
            "2 pontos em Negociação",
            "2 pontos em Intuição",
            "1 ponto em Intimidação",
            "1 ponto em Destreza"
        ],
        bonusEstruturado: [
            { habilidade: 'negociacao', pontos: 2 },
            { habilidade: 'intuicao', pontos: 2 },
            { habilidade: 'intimidacao', pontos: 1 },
            { habilidade: 'destreza', pontos: 1 }
        ],
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        escolhasProficiencias: [],
        itensIniciais: [],
        moedasExtra: 0,
        escolhasLivres: 0
    }
];

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Lista todos os antecedentes
 * @returns {Array} Array de antecedentes
 */
export const getTodosAntecedentes = () => antecedentes;

/**
 * Busca um antecedente pelo nome
 * @param {string} nome - Nome do antecedente
 * @returns {Object|null} Antecedente encontrado ou null
 */
export const getAntecedente = (nome) => {
    const search = nome.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return antecedentes.find(a =>
        a.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === search
    ) || null;
};

/**
 * Busca antecedentes que concedem bônus em uma habilidade específica
 * @param {string} habilidade - Nome da habilidade (ex: "Persuasão", "Furtividade")
 * @returns {Array} Antecedentes que concedem bônus na habilidade
 */
export const getAntecedentesComHabilidade = (habilidade) => {
    const search = habilidade.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return antecedentes.filter(a =>
        a.bonusEstruturado.some(b =>
            b.habilidade.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === search
        ) ||
        a.escolhasHabilidades.some(e =>
            e.grupo.some(g => g.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === search)
        ) ||
        a.habilidades.some(h => h.toLowerCase().includes(habilidade.toLowerCase()))
    );
};

/**
 * Lista os nomes de todos os antecedentes para select/dropdown
 * @returns {Array} Array de objetos {value, label}
 */
export const getAntecedentesParaSelect = () => {
    return antecedentes.map(a => ({
        value: a.nome,
        label: a.nome
    }));
};

/**
 * Retorna os bônus numéricos totais de um antecedente (fixos + escolhidos)
 * @param {string} nome - Nome do antecedente
 * @param {Object} escolhas - { habilidade1: pontos, habilidade2: pontos } para escolhas livres
 * @returns {Object} Mapa { habilidade: pontosTotal }
 */
export const calcularBonusAntecedente = (nome, escolhas = {}) => {
    const ant = getAntecedente(nome);
    if (!ant) return {};

    const bonus = {};

    // Bônus fixos
    for (const b of ant.bonusEstruturado) {
        bonus[b.habilidade] = (bonus[b.habilidade] || 0) + b.pontos;
    }

    // Escolhas livres
    for (const [hab, pts] of Object.entries(escolhas)) {
        bonus[hab] = (bonus[hab] || 0) + pts;
    }

    return bonus;
};

// ============================================================================
// FUNÇÕES DE ENGINE — APLICAR ANTECEDENTE (TODO-ANT-002)
// ============================================================================

/**
 * Aplica um antecedente a um fichaState imutável, distribuindo:
 *   1. bonusEstruturado   → pontos fixos em habilidades
 *   2. escolhasHabilidades → pontos em habilidades escolhidas (de um grupo restrito)
 *   3. escolhasLivres      → pontos em habilidades livremente escolhidas
 *   4. proficienciasGanhas → proficiências fixas
 *   5. escolhasProficiencias → proficiências escolhidas (de um grupo restrito)
 *   6. itensIniciais       → adicionados ao inventário
 *   7. moedasExtra         → adicionadas ao ouro
 *
 * Ref: LDO 0.5, seção Antecedentes
 *
 * @param {Object} fichaState — estado atual da ficha
 *   Esperado: { habilidades: { nome: valor }, proficiencias: { id: nivel }, inventario: [], ouro: 0, ... }
 * @param {string} antecedenteNome — nome do antecedente (case-insensitive, accent-insensitive)
 * @param {Object} [escolhas={}] — escolhas do jogador:
 *   {
 *     habilidadesEscolhidas: [{ habilidade: string, pontos: int }],  — para escolhasHabilidades
 *     habilidadesLivres:     [{ habilidade: string, pontos: int }],  — para escolhasLivres
 *     proficienciasEscolhidas: [{ proficiencia: string, pontos: int }] — para escolhasProficiencias
 *   }
 * @returns {{ novoState: Object, resumo: Object }} — state atualizado + resumo dos bônus aplicados
 */
export const aplicarAntecedente = (fichaState, antecedenteNome, escolhas = {}) => {
    const ant = getAntecedente(antecedenteNome);
    if (!ant) return { novoState: fichaState, resumo: { erro: 'Antecedente não encontrado' } };

    const novoState = {
        ...fichaState,
        habilidades: { ...(fichaState.habilidades || {}) },
        proficiencias: { ...(fichaState.proficiencias || {}) },
        inventario: [...(fichaState.inventario || [])],
        ouro: fichaState.ouro || 0,
        antecedente: antecedenteNome
    };

    const resumo = {
        antecedente: ant.nome,
        habilidadesAlteradas: {},
        proficienciasGanhas: [],
        itensAdicionados: [],
        moedasAdicionadas: 0,
        erros: []
    };

    // 1) Bônus estruturados (fixos)
    for (const b of ant.bonusEstruturado) {
        novoState.habilidades[b.habilidade] = (novoState.habilidades[b.habilidade] || 0) + b.pontos;
        resumo.habilidadesAlteradas[b.habilidade] = (resumo.habilidadesAlteradas[b.habilidade] || 0) + b.pontos;
    }

    // 2) Escolhas de habilidades (grupo restrito)
    if (ant.escolhasHabilidades.length > 0 && escolhas.habilidadesEscolhidas) {
        for (const esc of escolhas.habilidadesEscolhidas) {
            // Verificar se a habilidade está no grupo permitido de alguma escolha
            const slotDisponivel = ant.escolhasHabilidades.find(e =>
                e.grupo.includes(esc.habilidade) && esc.pontos <= e.pontos
            );
            if (slotDisponivel) {
                novoState.habilidades[esc.habilidade] = (novoState.habilidades[esc.habilidade] || 0) + esc.pontos;
                resumo.habilidadesAlteradas[esc.habilidade] = (resumo.habilidadesAlteradas[esc.habilidade] || 0) + esc.pontos;
            } else {
                resumo.erros.push(`Habilidade "${esc.habilidade}" não permitida nas escolhas do antecedente`);
            }
        }
    }

    // 3) Escolhas livres (AMNÉSICO etc.)
    if (ant.escolhasLivres > 0 && escolhas.habilidadesLivres) {
        let slotsUsados = 0;
        for (const esc of escolhas.habilidadesLivres) {
            if (slotsUsados >= ant.escolhasLivres) {
                resumo.erros.push(`Limite de escolhas livres (${ant.escolhasLivres}) excedido`);
                break;
            }
            novoState.habilidades[esc.habilidade] = (novoState.habilidades[esc.habilidade] || 0) + esc.pontos;
            resumo.habilidadesAlteradas[esc.habilidade] = (resumo.habilidadesAlteradas[esc.habilidade] || 0) + esc.pontos;
            slotsUsados++;
        }
    }

    // 4) Proficiências fixas
    for (const p of ant.proficienciasGanhas) {
        const nivelAtual = novoState.proficiencias[p.proficiencia] || 0;
        novoState.proficiencias[p.proficiencia] = Math.max(nivelAtual, p.pontos);
        resumo.proficienciasGanhas.push({ proficiencia: p.proficiencia, nivel: p.pontos });
    }

    // 5) Proficiências escolhidas
    if (ant.escolhasProficiencias.length > 0 && escolhas.proficienciasEscolhidas) {
        for (const esc of escolhas.proficienciasEscolhidas) {
            const slotDisponivel = ant.escolhasProficiencias.find(e =>
                e.grupo.includes(esc.proficiencia) && esc.pontos <= e.pontos
            );
            if (slotDisponivel) {
                const nivelAtual = novoState.proficiencias[esc.proficiencia] || 0;
                novoState.proficiencias[esc.proficiencia] = Math.max(nivelAtual, esc.pontos);
                resumo.proficienciasGanhas.push({ proficiencia: esc.proficiencia, nivel: esc.pontos });
            } else {
                resumo.erros.push(`Proficiência "${esc.proficiencia}" não permitida nas escolhas do antecedente`);
            }
        }
    }

    // 6) Itens iniciais
    for (const item of ant.itensIniciais) {
        novoState.inventario.push({ nome: item, fonte: 'antecedente', equipado: false });
        resumo.itensAdicionados.push(item);
    }

    // 7) Moedas extras
    if (ant.moedasExtra > 0) {
        novoState.ouro += ant.moedasExtra;
        resumo.moedasAdicionadas = ant.moedasExtra;
    }

    return { novoState, resumo };
};

export default antecedentes;
