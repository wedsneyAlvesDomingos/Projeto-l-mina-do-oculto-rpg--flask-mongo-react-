/**
 * Dados centralizados de Habilidades do sistema Lâmina do Oculto
 * Este arquivo contém todas as habilidades organizadas por categoria.
 * Inclui marcos de habilidade e funções de cálculo.
 * Usado em: criarPersonagem.js, characterSheet.js, Wiki/habilidadesProenfiencias
 */

// Cores padrão do sistema para categorias
export const CORES_CATEGORIAS = {
    fisico: '#7B3311',
    exploracao: '#454E30',
    conhecimento: '#2F3C29',
    arcana: '#162A22',
    social: '#931C4A',
};

// ============================================================================
// FUNÇÕES DE CÁLCULO DO SISTEMA
// ============================================================================

/**
 * Calcula os pontos de vida do personagem
 * @param {number} baseVidaEspecie - Vida base da espécie
 * @param {number} fortitude - Valor da habilidade Fortitude
 * @returns {number} Total de pontos de vida
 */
export const calcularPontosDeVida = (baseVidaEspecie, fortitude) => {
    return baseVidaEspecie + (fortitude * 2);
};

/**
 * Calcula a capacidade de carga base do personagem
 * @param {number} forca - Valor da habilidade Força
 * @param {string} tamanho - Tamanho da criatura (minusculo, pequeno, medio, grande, enorme, colossal)
 * @returns {number} Capacidade de carga em kg
 */
export const calcularCapacidadeDeCarga = (forca, tamanho = 'medio') => {
    const multiplicadorTamanho = {
        minusculo: 0.25,
        pequeno: 0.5,
        medio: 1,
        grande: 2,
        enorme: 4,
        colossal: 8
    };
    const multiplicador = multiplicadorTamanho[tamanho.toLowerCase()] || 1;
    let cargaBase = forca * 5 * multiplicador;
    
    // Bônus ao atingir 10 pontos de força
    if (forca >= 10) {
        cargaBase += forca * 3;
    }
    
    return cargaBase;
};

/**
 * Calcula a estamina inicial do personagem
 * @param {number} atletismo - Valor da habilidade Atletismo
 * @returns {number} Total de pontos de estamina
 */
export const calcularEstamina = (atletismo) => {
    let estamina = 10 + atletismo;
    // Bônus ao atingir 10 pontos de atletismo
    if (atletismo >= 10) {
        estamina += 5;
    }
    return estamina;
};

/**
 * Calcula a iniciativa de combate
 * @param {number} agilidade - Valor da habilidade Agilidade
 * @param {number} percepcao - Valor da habilidade Percepção
 * @returns {number} Valor de iniciativa
 */
export const calcularIniciativa = (agilidade, percepcao) => {
    return agilidade + percepcao;
};

/**
 * Calcula o bônus de velocidade baseado na agilidade
 * @param {number} agilidade - Valor da habilidade Agilidade
 * @returns {number} Bônus de velocidade em metros
 */
export const calcularBonusVelocidade = (agilidade) => {
    if (agilidade <= 0) return 0;
    if (agilidade <= 2) return 1.5;
    if (agilidade <= 4) return 3;
    if (agilidade <= 6) return 4.5;
    if (agilidade <= 8) return 6;
    if (agilidade <= 10) return 7.5;
    return 7.5 + Math.floor((agilidade - 10) / 2) * 1.5;
};

/**
 * Calcula os pontos de magia totais
 * @param {number} arcanismo - Valor da habilidade Arcanismo
 * @param {number} baseMagia - Base de magia (pode vir de espécie/classe)
 * @returns {number} Total de pontos de magia
 */
export const calcularPontosDeMagia = (arcanismo, baseMagia = 0) => {
    let magia = baseMagia + arcanismo;
    if (arcanismo >= 10) {
        magia += 5;
    }
    return magia;
};

/**
 * Calcula o tempo que pode segurar a respiração
 * @param {number} fortitude - Valor da habilidade Fortitude
 * @returns {number} Minutos que pode segurar a respiração
 */
export const calcularTempoRespiracao = (fortitude) => {
    return Math.max(1, fortitude);
};

/**
 * Calcula a cura com kit médico/herbalista
 * @param {number} medicina - Valor da habilidade Medicina
 * @returns {number} Pontos de vida curados
 */
export const calcularCuraKitMedico = (medicina) => {
    if (medicina >= 5) {
        return medicina;
    }
    return 0;
};

// ============================================================================
// HABILIDADES - FÍSICO
// ============================================================================

export const habilidadesFisico = [
    {
        title: "Fortitude",
        key: "fortitude",
        categoria: "fisico",
        description: "Essa Habilidade está ligada à vitalidade do personagem e é responsável por parte dos Pontos de Vida. A vida inicial de um personagem é igual à base declarada na espécie + 2x o valor de sua fortitude.",
        descricaoCompleta: "Essa Habilidade está ligada à vitalidade do personagem e é responsável por parte dos Pontos de Vida (A vida inicial de um personagem é igual à base declarada na espécie e 2x o valor de sua fortitude). A partir do segundo nível, todo ponto de fortitude atribuído fornece 2 pontos de vida a mais.\n\nOu seja, cada ponto de atributo fornece dois pontos de vida ao número total de pontos de vida independente se foi distribuído durante a criação de personagem ou depois.\n\nAlgumas Regalias podem usar essa Habilidade como referência como parte de sua mecânica. A fortitude é usada como parâmetro para testes contra venenos, comidas podres e condicionamento físico por desgaste.\n\nUma criatura pode segurar a respiração por um número de minutos igual ao valor nesta Habilidade.",
        calculo: "PV = Base Espécie + (Fortitude × 2)",
        usosComuns: ["Testes contra venenos", "Resistência a comidas podres", "Condicionamento físico", "Segurar respiração"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem ganha um bônus de +2 em teste de fortitude para resistir a venenos e doenças.",
                bonus: { testeVenenoDoenca: 2 }
            }
        ]
    },
    {
        title: "Força",
        key: "forca",
        categoria: "fisico",
        description: "Essa Habilidade está ligada à capacidade de carga do personagem e também determina o dano somado a ataques físicos feitos com armas corpo a corpo.",
        descricaoCompleta: "Essa Habilidade está ligada à capacidade de carga do personagem e também determina o dano somado a ataques físicos feitos com armas corpo a corpo e suas Habilidades. Regalias podem usar essa Habilidade como referência como parte de sua mecânica.\n\nA força pode ser usada em testes para permanecer pendurado ou para manter algo pesado levantado ou abaixado, de acordo com a situação.",
        calculo: "Dano Corpo a Corpo += Força",
        usosComuns: ["Capacidade de carga", "Dano corpo a corpo", "Permanecer pendurado", "Levantar/abaixar objetos pesados"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem ganha um bônus de 3x o valor de força em quilos a mais em sua capacidade de carga, somado ao cálculo base descrito em 'Tamanho vs Carga', e +2 em quaisquer testes de força.",
                bonus: { capacidadeCargaExtra: "forca * 3", testeForca: 2 }
            }
        ]
    },
    {
        title: "Agilidade",
        key: "agilidade",
        categoria: "fisico",
        description: "Essa Habilidade está relacionada à velocidade do personagem e ajuda a determinar o Valor de Defesa. Somada ao valor de percepção, forma o valor da iniciativa de combate.",
        descricaoCompleta: "Essa Habilidade está relacionada à velocidade do personagem. Somando a velocidade base de sua Espécie com o bônus gerado pelo valor nesta Habilidade, determina-se sua velocidade total de movimento em combate.\n\nA agilidade também ajuda a determinar o Valor de Defesa e pode ser somada a armaduras leves, armaduras médias e escudos.\n\nEssa Habilidade, somada ao valor de percepção, forma o valor da iniciativa de combate.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.\n\nA agilidade é a Habilidade padrão para testes de reflexo ou de velocidade em uma corrida ou fuga.",
        calculo: "Iniciativa = Agilidade + Percepção | Velocidade = Base Espécie + Bônus Agilidade",
        usosComuns: ["Velocidade de movimento", "Valor de Defesa", "Iniciativa", "Testes de reflexo", "Corrida/fuga"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem ganha um bônus de +2 em teste de reflexo (testes feitos para definir se um personagem se agarra a algo, desviar de algo, pega algo que foi arremessado, etc.).",
                bonus: { testeReflexo: 2 }
            }
        ]
    },
    {
        title: "Combate Corpo a Corpo",
        key: "combate_corpo_a_corpo",
        categoria: "fisico",
        description: "Essa Habilidade está relacionada à capacidade de lutar com uma arma corpo a corpo e determina o seu Valor de Acerto.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de lutar com uma arma corpo a corpo e determina o seu Valor de Acerto. Regalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        calculo: "Valor de Acerto (corpo a corpo) = Combate Corpo a Corpo",
        usosComuns: ["Ataques corpo a corpo", "Valor de Acerto"],
        marcos: []
    },
    {
        title: "Combate a Distância",
        key: "combate_a_distancia",
        categoria: "fisico",
        description: "Essa Habilidade está relacionada à capacidade de lutar com uma arma de disparo ou arremesso e determina o seu Valor de Acerto.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de lutar com uma arma de disparo ou arremesso e determina o seu Valor de Acerto. Regalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        calculo: "Valor de Acerto (distância) = Combate a Distância",
        usosComuns: ["Ataques à distância", "Arremesso", "Valor de Acerto"],
        marcos: []
    },
    {
        title: "Atletismo",
        key: "atletismo",
        categoria: "fisico",
        description: "Essa Habilidade está relacionada à capacidade atlética do personagem e determina a estamina inicial. Cobre saltos, natação e escalada.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade atlética do personagem e determina a capacidade de realizar saltos verticais, saltos horizontais, nadar e escalar.\n\nEssa Habilidade também determina a estamina inicial do personagem. Regalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        calculo: "Estamina = 10 + Atletismo",
        usosComuns: ["Saltos verticais/horizontais", "Natação", "Escalada", "Estamina"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem ganha um bônus de 5 pontos de estamina a mais e também pode escalar e nadar com o valor de velocidade total, sem a redução. O personagem também consegue usar a ação Disparada como duas ações ao invés de ser uma ação de turno completo.",
                bonus: { estaminaExtra: 5, escalarNadarSemReducao: true, disparadaDuasAcoes: true }
            }
        ]
    },
    {
        title: "Acrobacia",
        key: "acrobacia",
        categoria: "fisico",
        description: "Essa Habilidade está relacionada à capacidade acrobática do personagem: manobras em saltos, equilíbrio, malabarismo e piruetas.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade acrobática do personagem e determina a capacidade de realizar manobras em meio a um salto, saltar por uma janela, equilibrar-se em uma superfície escorregadia ou em uma corda, malabarismo, fazer piruetas e afins.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Manobras em saltos", "Equilíbrio", "Malabarismo", "Piruetas", "Saltar por janelas"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem ganha um bônus de +2 em testes para equilibrar-se. Quedas de até 9 metros não causam dano e o dano de queda de 12 metros para cima é resetado (12m = 1d4, 15m = 2pts, 18m = 4pts). O personagem também pode usar a ação Levantar ao mesmo tempo que uma ação de movimento.",
                bonus: { testeEquilibrio: 2, quedaSeguraMetros: 9, quedaResetada: 12, levantarComMovimento: true }
            }
        ]
    },
    {
        title: "Destreza",
        key: "destreza",
        categoria: "fisico",
        description: "Essa Habilidade está ligada à capacidade de executar tarefas manuais complexas e determina o dano de ataques à distância.",
        descricaoCompleta: "Essa Habilidade está ligada à capacidade de executar uma tarefa complexa que exige grande Habilidade manual, e também determina o dano somado a ataques físicos feitos com armas de disparo ou arremesso e suas Habilidades.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.\n\nEssa Habilidade é padrão para testes que envolvam desamarrar cordas ou amarrá-las, assim como tentar abrir uma fechadura, montar ou desmontar qualquer coisa que não seja obviamente impossível ou pesada demais. Ou seja, destreza tem a ver com manuseio preciso de ferramentas e objetos.",
        calculo: "Dano Distância += Destreza",
        usosComuns: ["Dano à distância", "Abrir fechaduras", "Amarrar/desamarrar cordas", "Montar/desmontar objetos", "Manuseio de ferramentas"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem ganha um bônus de +2 em todos os testes que fizer para operar com precisão quaisquer ferramentas.",
                bonus: { testeFerramentas: 2 }
            }
        ]
    }
];

// ============================================================================
// HABILIDADES - EXPLORAÇÃO
// ============================================================================

export const habilidadesExploracao = [
    {
        title: "Furtividade",
        key: "furtividade",
        categoria: "exploracao",
        description: "Essa Habilidade está relacionada à capacidade de se esconder dos olhos e/ou ouvidos de outras criaturas.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem de se esconder dos olhos e/ou ouvidos de outras criaturas. Regalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Esconder-se", "Mover-se silenciosamente", "Evitar detecção"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem consegue usar a ação Esconder Objeto como ação livre uma vez em seu turno. Também consegue usar a ação Esconder ao mesmo tempo que uma ação de movimento. Além disso, não sofre penalidade de movimento ao usar a ação esgueirar-se.",
                bonus: { esconderObjetoAcaoLivre: true, esconderComMovimento: true, semPenalidadeEsgueirar: true }
            }
        ]
    },
    {
        title: "Investigação",
        key: "investigacao",
        categoria: "exploracao",
        description: "Essa Habilidade está relacionada à capacidade de procurar e vasculhar um ambiente, móvel ou objeto.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem de procurar e vasculhar um ambiente, móvel (mesa, armário, etc.) ou objeto (uma caixa sem fechadura, uma esfera que parece um quebra cabeça e outros objetos fora do comum).\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Vasculhar ambientes", "Procurar objetos", "Resolver quebra-cabeças"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem consegue usar investigação ao usar as ações Buscar e Ler Ambiente. Também consegue, ao gastar uma ação em combate, analisar seu adversário e procurar por uma abertura ou ponto fraco em sua defesa para ganhar um bônus em seu próximo ataque igual a +2.",
                bonus: { investigacaoBuscarLerAmbiente: true, analisarAdversarioBonus: 2 }
            }
        ]
    },
    {
        title: "Rastreamento",
        key: "rastreamento",
        categoria: "exploracao",
        description: "Essa Habilidade está relacionada à capacidade de seguir pegadas, cheiros e outras pistas deixadas por criaturas ou veículos.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem de seguir pegadas, cheiros e outras pistas deixadas por uma criatura ou veículo. Regalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Seguir pegadas", "Rastrear cheiros", "Seguir pistas"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem consegue antecipar os movimentos e intenções de criaturas, permitindo-lhe maior chance de evitar emboscadas. Recebe +4 em testes de prevenção de emboscadas, identificação de comportamentos de caça e testes de reflexo para evitar armadilhas. Pode usar Rastreamento nas ações Buscar e Ler Ambiente.",
                bonus: { testePrevencaoEmboscada: 4, testeComportamentoCaca: 4, testeReflexoArmadilhas: 4, rastreamentoBuscarLerAmbiente: true }
            }
        ]
    },
    {
        title: "Percepção",
        key: "percepcao",
        categoria: "exploracao",
        description: "Essa Habilidade está relacionada à capacidade de discernir sons, visões e sensações táteis do ambiente.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem de discernir o que interessa entre os sons do ambiente, do que ele consegue ver e do que ele consegue sentir ao toque.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        calculo: "Iniciativa = Agilidade + Percepção",
        usosComuns: ["Detectar sons", "Observar ambiente", "Sentir ao toque", "Iniciativa"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem consegue utilizar o seu valor de percepção ao invés dos valores em investigação ou rastreamento. Além de ficar imune à condição surpreso.",
                bonus: { percepcaoSubstituiInvestigacao: true, percepcaoSubstituiRastreamento: true, imuneSurpreso: true }
            }
        ]
    },
    {
        title: "Sobrevivência",
        key: "sobrevivencia",
        categoria: "exploracao",
        description: "Essa Habilidade está relacionada à capacidade de procurar abrigo, comida, água e outros recursos na natureza.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem de procurar por abrigo (ou montar um), procurar comida, encontrar água e outros recursos em qualquer situação, mas principalmente na natureza.\n\nO que um personagem pode encontrar depende do ambiente em que está. Regalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Encontrar/montar abrigo", "Procurar comida", "Encontrar água", "Sobreviver em ambientes hostis"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem se torna um especialista em sobreviver em terrenos perigosos (pântanos, florestas densas, desertos). Recebe +4 em testes para navegar por esses terrenos, evitar armadilhas naturais e encontrar rotas seguras. Uma vez por descanso longo, pode tirar um nível da condição cansado ao realizar um descanso curto.",
                bonus: { testeNavegacaoTerrenosPerigosos: 4, evitarArmadilhasNaturais: 4, encontrarRotasSeguras: 4, removerCansadoDescansoLongo: true }
            }
        ]
    },
    {
        title: "Lidar com animais",
        key: "lidar_com_animais",
        categoria: "exploracao",
        description: "Essa Habilidade está relacionada à capacidade de se comunicar e relacionar com animais sem uso de magia.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem de transmitir um pedido, aviso ou outras formas de se comunicar, e relacionar, com um animal sem o uso de magia.",
        usosComuns: ["Comunicar com animais", "Acalmar animais", "Treinar animais", "Montar"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem adquire habilidades básicas de tratamento de ferimentos em animais. Pode aplicar Primeiros Socorros em animais gastando apenas uma ação. Também se torna um mestre na montaria e ao montar animais não treinados consegue guiá-los em combate sem precisar realizar testes.",
                bonus: { primeirosSocorrosAnimaisUmaAcao: true, montariaAnimalNaoTreinadoSemTeste: true }
            }
        ]
    },
    {
        title: "Navegação",
        key: "navegacao",
        categoria: "exploracao",
        description: "Essa Habilidade está relacionada à capacidade de encontrar o caminho usando sol, estrelas e referências geográficas.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem de encontrar o caminho com base na posição do sol, estrelas e referências geográficas caso saiba o caminho ou tenha um mapa.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Orientação pelo sol/estrelas", "Leitura de mapas", "Encontrar caminhos"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem sempre sabe que direção é o norte, e se já tiver passado por um caminho antes não fica perdido. Recebe +2 em testes de navegação em áreas obscurecidas por nevoeiros e outros fenômenos que impedem a visão.",
                bonus: { saberNorte: true, naoFicaPerdidoCaminhoConhecido: true, testeNavegacaoNevoeiro: 2 }
            }
        ]
    },
    {
        title: "Armadilhas",
        key: "armadilhas",
        categoria: "exploracao",
        description: "Essa Habilidade está relacionada à capacidade de encontrar e desarmar armadilhas em um ambiente.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem de encontrar e desarmar armadilhas em um ambiente. Ao implantar armadilhas, então um teste com esta habilidade é feito e o resultado determina a dificuldade para desarmá-la.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Encontrar armadilhas", "Desarmar armadilhas", "Criar armadilhas"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem pode usar Desabilitar/Habilitar Dispositivo como uma ação (ao invés de turno completo) para armadilhas. Reduz o dano de armadilhas pela metade e pode evitar efeitos adicionais de armadilhas uma vez por dia.",
                bonus: { desabilitarDispositivoUmaAcao: true, reducaoDanoArmadilhaMetade: true, evitarEfeitoArmadilhaUmaPorDia: true }
            }
        ]
    }
];

// ============================================================================
// HABILIDADES - CONHECIMENTO
// ============================================================================

export const habilidadesConhecimento = [
    {
        title: "História",
        key: "historia",
        categoria: "conhecimento",
        description: "Essa Habilidade está relacionada à capacidade de lembrar fatos históricos, conhecimentos gerais da sociedade e assuntos não relacionados à natureza ou sobrenatural.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem lembrar de fatos, descrições e definições que já ouviram, viram acontecer ou leram.\n\nOs assuntos que essa Habilidade cobre são eventos históricos, conhecimentos gerais da sociedade, e qualquer assunto que não seja sobre a natureza e o sobrenatural.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Recordar eventos históricos", "Conhecimento geral", "Identificar culturas e sociedades"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem consegue usar a ação Recordar Conhecimento(história) enquanto realiza qualquer outra ação em seu turno. Além disso, ganha um ponto nas proficiências Línguas Antigas e Arqueologia.",
                bonus: { recordarConhecimentoHistoriaOutraAcao: true, proficienciaLinguasAntigas: 1, proficienciaArqueologia: 1 }
            }
        ]
    },
    {
        title: "Intuição",
        key: "intuicao",
        categoria: "conhecimento",
        description: "Essa Habilidade está relacionada à capacidade de entender uma situação ou intenção de pessoas, associando percepção com experiências pessoais.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem entender uma situação ou a intenção de uma pessoa, ou mais, associando sua percepção com suas experiências pessoais.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Ler intenções", "Entender situações", "Detectar mentiras"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem consegue usar a ação Ler Ambiente enquanto realiza qualquer outra ação em seu turno.",
                bonus: { lerAmbienteOutraAcao: true }
            }
        ]
    },
    {
        title: "Natureza",
        key: "natureza",
        categoria: "conhecimento",
        description: "Essa Habilidade está relacionada ao conhecimento sobre plantas, animais, biomas, fungos, rochas e tudo que faça parte da natureza.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem em reconhecer os mais diversos aspectos e informações de plantas, animais, biomas, fungos, rochas e todos as coisas que façam parte da natureza.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Identificar plantas", "Identificar animais", "Conhecer biomas", "Propriedades medicinais"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem se torna um especialista em identificação de plantas e animais. Reconhece e nomeia qualquer espécie em seu ambiente natural sem necessidade de teste, identificando suas características, propriedades medicinais e uso relevante. Tem sucesso automático ao usar Natureza na ação Recordar Conhecimento.",
                bonus: { identificacaoPlantasAnimaisSemTeste: true, sucessoAutomaticoRecordarNatureza: true }
            }
        ]
    },
    {
        title: "Medicina",
        key: "medicina",
        categoria: "conhecimento",
        description: "Essa Habilidade está relacionada à capacidade de reconhecer doenças, tratar ferimentos e enfermidades.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem reconhecer doenças, tratar ferimentos e enfermidades.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Tratar ferimentos", "Identificar doenças", "Primeiros socorros", "Usar kit médico"],
        marcos: [
            {
                nivel: 5,
                descricao: "O personagem cura o valor dessa Habilidade em pontos de vida quando usar um kit médico ou de herbalista.",
                bonus: { curaKitMedicoIgualHabilidade: true }
            },
            {
                nivel: 10,
                descricao: "O personagem consegue usar a ação de turno completo 'Primeiros socorros' como apenas uma ação.",
                bonus: { primeirosSocorrosUmaAcao: true }
            }
        ]
    },
    {
        title: "Jurisprudência",
        key: "jurisprudencia",
        categoria: "conhecimento",
        description: "Essa Habilidade está relacionada à capacidade de entender as leis e ordem de sociedades estruturadas.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem de entender as leis e ordem de sociedades estruturadas de maneira que tenham leis.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Conhecer leis", "Argumentação legal", "Entender política"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem consegue realizar uma análise detalhada de evidências, argumentos e precedentes legais, concedendo um bônus de +4 em testes de Investigação, Persuasão ou Intuição relacionados a leis de uma sociedade.",
                bonus: { testeInvestigacaoLeis: 4, testePersuasaoLeis: 4, testeIntuicaoLeis: 4 }
            }
        ]
    },
    {
        title: "Teologia",
        key: "teologia",
        categoria: "conhecimento",
        description: "Essa Habilidade está relacionada ao conhecimento sobre Religiões existentes, suas histórias, doutrinas e capacidades.",
        descricaoCompleta: "Essa Habilidade está relacionada ao conhecimento que o personagem tem sobre as Religiões existentes, suas histórias, doutrinas e capacidades.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Conhecer religiões", "Identificar símbolos religiosos", "Entender doutrinas"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem consegue usar a ação Recordar Conhecimento(Teologia) enquanto realiza qualquer outra ação em seu turno. Também recebe um bônus fixo de +4 em todos os testes desta habilidade.",
                bonus: { recordarConhecimentoTeologiaOutraAcao: true, bonusTesteTeologia: 4 }
            }
        ]
    },
    {
        title: "Tecnologia",
        key: "tecnologia",
        categoria: "conhecimento",
        description: "Essa Habilidade está relacionada ao conhecimento sobre mecânica, física e matemática.",
        descricaoCompleta: "Essa Habilidade está relacionada ao conhecimento sobre mecânica, física e matemática.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Entender mecanismos", "Aplicar física", "Cálculos matemáticos", "Dispositivos mecânicos"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem consegue usar a ação Recordar Conhecimento(Tecnologia) enquanto realiza qualquer outra ação em seu turno. Também se torna capaz de usar a ação de turno completo Desabilitar/Habilitar Dispositivo como duas ações.",
                bonus: { recordarConhecimentoTecnologiaOutraAcao: true, desabilitarDispositivoDuasAcoes: true }
            }
        ]
    }
];

// ============================================================================
// HABILIDADES - ARCANA
// ============================================================================

export const habilidadesArcana = [
    {
        title: "Arcanismo",
        key: "arcanismo",
        categoria: "arcana",
        description: "Essa Habilidade está relacionada ao conhecimento sobre magia e o véu arcano.",
        descricaoCompleta: "Essa Habilidade está relacionada ao conhecimento de um personagem sobre magia e o véu arcano.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        calculo: "Pontos de Magia podem ser aumentados com Arcanismo",
        usosComuns: ["Identificar magias", "Entender o véu arcano", "Conhecimento mágico"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem ganha +5 pontos de magia ao seu total de pontos. Além disso, consegue usar a ação Preparar para preparar magias de até duas ações ao invés de uma ação apenas.",
                bonus: { pontosMagiaExtra: 5, prepararMagiaDuasAcoes: true }
            }
        ]
    },
    {
        title: "Alquimia",
        key: "alquimia",
        categoria: "arcana",
        description: "Essa Habilidade está relacionada ao conhecimento sobre poções simples, mágicas e venenos.",
        descricaoCompleta: "Essa Habilidade está relacionada ao conhecimento de um personagem sobre poções simples, mágicas e venenos.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Criar poções", "Identificar venenos", "Análise de substâncias"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem é capaz de identificar propriedades e composição de substâncias sem necessidade de testes. Se torna resistente ao dano de venenos, ácido e fogo não-mágicos. O custo de produção de poções cai pela metade quando o personagem participa do processo.",
                bonus: { identificarSubstanciasSemTeste: true, resistenciaDanoVenenoAcidoFogoNaoMagico: true, custoPocaoMetade: true }
            }
        ]
    },
    {
        title: "Ritualismo",
        key: "ritualismo",
        categoria: "arcana",
        description: "Essa Habilidade está relacionada ao conhecimento sobre os diversos usos de rituais (selar, proteger, invocar, abençoar, etc.).",
        descricaoCompleta: "Essa Habilidade está relacionada ao conhecimento de um personagem sobre os mais diversos usos de um ritual. Um Ritual pode ser feito por um ou mais pessoas dependendo do objetivo final.\n\nRituais podem ser feitos para selar, proteger, invocar, observar, abençoar, amaldiçoar, comunicar ou fortalecer um objeto, criatura ou lugar.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Realizar rituais", "Selar/proteger locais", "Invocar entidades", "Abençoar/amaldiçoar"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem consegue diminuir o custo dos materiais de um ritual em 5 vezes. Além disso, ao realizar um ritual, recebe uma vez por descanso longo os benefícios de um descanso curto.",
                bonus: { custoMateriaisRitualDivididoPor5: true, beneficioDescansoAoRitual: true }
            }
        ]
    },
    {
        title: "Ocultismo",
        key: "ocultismo",
        categoria: "arcana",
        description: "Essa Habilidade está relacionada ao conhecimento sobre demônios, maldições, magia de sangue, magia negra, pactos e mortos vivos.",
        descricaoCompleta: "Essa Habilidade está relacionada ao conhecimento de um personagem sobre o tema. O oculto engloba demônios, maldições, magia de sangue, magia negra, pactos e mortos vivos.\n\nPara saber se um objeto é amaldiçoado é essa Habilidade que se usa. Com um sucesso, a dificuldade é determinada pelo mestre, em um teste de ocultismo o personagem descobre se um item está amaldiçoado, qual a maldição e como quebrá-la.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Identificar maldições", "Conhecer demônios", "Detectar itens amaldiçoados", "Entender pactos"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem consegue usar itens amaldiçoados sem ser afetado pela maldição. Também consegue usar a ação Recordar conhecimento(ocultismo) como parte de outra ação.",
                bonus: { usarItemAmaldicoadoSemEfeito: true, recordarConhecimentoOcultismoOutraAcao: true }
            }
        ]
    },
    {
        title: "Arcanatec",
        key: "arcanatec",
        categoria: "arcana",
        description: "Essa Habilidade está relacionada à capacidade de identificar objetos mágicos e encontrar/desarmar armadilhas mágicas.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem de identificar um objeto mágico. Em um sucesso, no teste de Habilidade, é possível identificar um objeto mágico, aprendendo o que ele faz e quais os seus pré requisitos.\n\nEssa Habilidade também está relacionada à capacidade de um personagem encontrar e usar ou desarmar uma armadilha mágica.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Identificar itens mágicos", "Desarmar armadilhas mágicas", "Consertar itens mágicos"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem identifica falsificações de itens mágicos sem teste. Pode consertar itens mágicos danificados ou saber o que é necessário. Pode equipar um item mágico extra. Usa Desabilitar/Habilitar Dispositivo como uma ação para armadilhas mágicas. Reduz dano de armadilhas mágicas pela metade e pode evitar efeitos adicionais uma vez por descanso longo.",
                bonus: { identificarFalsificacaoSemTeste: true, consertarItensMagicos: true, itemMagicoExtraEquipado: 1, desabilitarArmadilhaMagicaUmaAcao: true, reducaoDanoArmadilhaMagicaMetade: true, evitarEfeitoArmadilhaMagicaDescansoLongo: true }
            }
        ]
    },
    {
        title: "Combate Arcano",
        key: "combate_arcano",
        categoria: "arcana",
        description: "Essa Habilidade está relacionada à capacidade de lutar com magias, feitiços e milagres e determina o Valor de Acerto arcano.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem de lutar com magias, feitiços e milagres e determina o seu Valor de Acerto.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        calculo: "Valor de Acerto (arcano) = Combate Arcano",
        usosComuns: ["Ataques mágicos", "Magias ofensivas", "Valor de Acerto arcano"],
        marcos: []
    }
];

// ============================================================================
// HABILIDADES - SOCIAL
// ============================================================================

export const habilidadesSocial = [
    {
        title: "Enganação",
        key: "enganacao",
        categoria: "social",
        description: "Essa Habilidade está relacionada à capacidade de convencer outras criaturas de suas mentiras.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem de convencer outras criaturas de suas mentiras, seja através da fala ou de ações.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Mentir", "Blefar", "Disfarçar intenções"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem se torna capaz de usar as ações Fintar ou Distrair ao mesmo tempo que uma ação de movimento.",
                bonus: { fintarDistairComMovimento: true }
            }
        ]
    },
    {
        title: "Persuasão",
        key: "persuasao",
        categoria: "social",
        description: "Essa Habilidade está relacionada à capacidade de convencer outras criaturas de seus argumentos.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem convencer outras criaturas de seus argumentos, seja através da fala ou de ações.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Convencer", "Argumentar", "Negociar"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem se torna capaz de usar a ação Pedir ao mesmo tempo que outra ação. Além disso, ganha um ponto na proficiência Liderança.",
                bonus: { pedirOutraAcao: true, proficienciaLideranca: 1 }
            }
        ]
    },
    {
        title: "Performance",
        key: "performance",
        categoria: "social",
        description: "Essa Habilidade está relacionada à capacidade de dançar, cantar, atuar, recitar poemas ou tocar instrumentos.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem de dançar, cantar, atuar, recitar um poema ou tocar um instrumento. Regalias podem usar essa Habilidade como referência como parte de sua mecânica.\n\nOs primeiros 5 pontos definem suas capacidades artísticas:\n• 1 ponto: execução básica em uma forma de arte performática\n• 2 pontos: desempenho mais refinado e impressionante\n• 3 pontos: domina múltiplas formas de expressão artística\n• 5 pontos: reconhecido regionalmente como talento excepcional",
        usosComuns: ["Dançar", "Cantar", "Atuar", "Tocar instrumentos", "Recitar poemas"],
        progressao: [
            { nivel: 1, descricao: "Execução básica em uma forma de arte performática. Pode tocar algumas notas em um instrumento ou executar alguns passos de dança simples." },
            { nivel: 2, descricao: "Desempenho mais refinado e impressionante. Pode tocar melodias mais complexas ou realizar movimentos de dança mais elegantes." },
            { nivel: 3, descricao: "Domina múltiplas formas de expressão artística, como música e dança, e alterna entre elas com facilidade." },
            { nivel: 5, descricao: "Reconhecido regionalmente como um talento excepcional. Sua habilidade pode abrir portas para oportunidades profissionais e contatos importantes." }
        ],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem se torna capaz de usar as ações Performar e Distrair ao mesmo tempo que uma ação de movimento.",
                bonus: { performarDistrairComMovimento: true }
            }
        ]
    },
    {
        title: "Intimidação",
        key: "intimidacao",
        categoria: "social",
        description: "Essa Habilidade está relacionada à capacidade de intimidar outras criaturas através da fala ou ações.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem intimidar outras criaturas, seja através da fala ou de ações.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Intimidar", "Ameaçar", "Coagir"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem pode usar as ações Intimidar ou Distrair ao mesmo tempo que ação de movimento, Derrubar, Agarrar, Atacar ou Preparar. Pode usar Intimidar em número de criaturas igual ao valor desta habilidade, desde que estejam no campo de visão e possam ver e ouvir o personagem.",
                bonus: { intimidarDistrarComOutrasAcoes: true, intimidarMultiplasCriaturas: "valorHabilidade" }
            }
        ]
    },
    {
        title: "Sedução",
        key: "seducao",
        categoria: "social",
        description: "Essa Habilidade está relacionada à capacidade de seduzir outras criaturas através da fala ou ações.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem seduzir outras criaturas, seja através da fala ou de ações.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.\n\nNota: Um teste de sedução nunca pode ser feito por um personagem de jogador para outro personagem de jogador, nem a pedido do mestre, sem o consentimento de todos envolvidos na mesa.",
        usosComuns: ["Seduzir", "Encantar", "Atrair atenção"],
        nota: "Um teste de sedução nunca pode ser feito por um personagem de jogador para outro personagem de jogador sem consentimento de todos na mesa.",
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem apresenta-se com beleza estonteante e presença cativante. Todos os testes da aba Social ganham vantagem contra alvos que tenham compatibilidade de atração pelo personagem. O alvo se torna disposto a fazer pequenos favores que não sejam perigosos ou fora de seu alcance.",
                bonus: { vantagemTesteSocialComAtracao: true, alvoFazPequenosFavores: true }
            }
        ]
    },
    {
        title: "Negociação",
        key: "negociacao",
        categoria: "social",
        description: "Essa Habilidade está relacionada à capacidade de lidar com outras criaturas em situações de troca ou conflito.",
        descricaoCompleta: "Essa Habilidade está relacionada à capacidade de um personagem lidar com outras criaturas em uma situação de troca ou conflito.\n\nRegalias podem usar essa Habilidade como referência como parte de sua mecânica.",
        usosComuns: ["Negociar acordos", "Resolver conflitos", "Barganhar"],
        marcos: [
            {
                nivel: 10,
                descricao: "O personagem recebe +2 em testes de Persuasão, Enganação, Investigação, História e Intuição que beneficiem a conclusão de uma negociação. Também pode usar seu turno em combate para negociar uma trégua (teste de Negociação com dificuldade definida pelo mestre).",
                bonus: { bonusPersuasaoNegociacao: 2, bonusEnganacaoNegociacao: 2, bonusInvestigacaoNegociacao: 2, bonusHistoriaNegociacao: 2, bonusIntuicaoNegociacao: 2, negociarTreguaEmCombate: true }
            }
        ]
    }
];

// ============================================================================
// GRUPOS E EXPORTAÇÕES
// ============================================================================

export const gruposHabilidades = [
    { title: "Físico", key: "fisico", borderColor: CORES_CATEGORIAS.fisico, data: habilidadesFisico },
    { title: "Exploração", key: "exploracao", borderColor: CORES_CATEGORIAS.exploracao, data: habilidadesExploracao },
    { title: "Conhecimento", key: "conhecimento", borderColor: CORES_CATEGORIAS.conhecimento, data: habilidadesConhecimento },
    { title: "Arcana", key: "arcana", borderColor: CORES_CATEGORIAS.arcana, data: habilidadesArcana },
    { title: "Social", key: "social", borderColor: CORES_CATEGORIAS.social, data: habilidadesSocial }
];

export const todasHabilidades = [
    ...habilidadesFisico,
    ...habilidadesExploracao,
    ...habilidadesConhecimento,
    ...habilidadesArcana,
    ...habilidadesSocial
];

export const habilidadesIniciais = todasHabilidades.reduce((acc, hab) => {
    acc[hab.key] = 0;
    return acc;
}, {});

// ============================================================================
// FUNÇÕES HELPER
// ============================================================================

export const getHabilidade = (nomeOuKey) => {
    return todasHabilidades.find(
        h => h.title.toLowerCase() === nomeOuKey.toLowerCase() || h.key === nomeOuKey
    ) || null;
};

export const getHabilidadeDescricao = (nomeOuKey) => {
    const hab = getHabilidade(nomeOuKey);
    return hab?.description || null;
};

export const getHabilidadeDescricaoCompleta = (nomeOuKey) => {
    const hab = getHabilidade(nomeOuKey);
    return hab?.descricaoCompleta || hab?.description || null;
};

export const getHabilidadesPorCategoria = (categoria) => {
    const grupo = gruposHabilidades.find(g => g.key === categoria || g.title.toLowerCase() === categoria.toLowerCase());
    return grupo?.data || [];
};

export const getMarcosHabilidade = (nomeOuKey) => {
    const hab = getHabilidade(nomeOuKey);
    return hab?.marcos || [];
};

export const marcoAtingido = (habilidadeKey, valor, nivelMarco) => {
    return valor >= nivelMarco;
};

export const getMarcosAtingidos = (habilidadeKey, valor) => {
    const marcos = getMarcosHabilidade(habilidadeKey);
    return marcos.filter(marco => valor >= marco.nivel);
};

export const calcularAtributosDerivados = (habilidades, dadosBase = {}) => {
    const { fortitude = 0, forca = 0, agilidade = 0, atletismo = 0, percepcao = 0, arcanismo = 0 } = habilidades;
    const { vidaBase = 10, magiaBase = 0, tamanho = 'medio' } = dadosBase;
    
    return {
        pontosDeVida: calcularPontosDeVida(vidaBase, fortitude),
        estamina: calcularEstamina(atletismo),
        iniciativa: calcularIniciativa(agilidade, percepcao),
        bonusVelocidade: calcularBonusVelocidade(agilidade),
        capacidadeCarga: calcularCapacidadeDeCarga(forca, tamanho),
        pontosDeMagia: calcularPontosDeMagia(arcanismo, magiaBase),
        tempoRespiracao: calcularTempoRespiracao(fortitude)
    };
};
