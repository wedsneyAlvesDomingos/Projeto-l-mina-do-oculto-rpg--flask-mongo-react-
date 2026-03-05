/**
 * Dados centralizados de Proficiências do sistema Lâmina do Oculto
 * Este arquivo contém todas as proficiências organizadas.
 * Usado em: criarPersonagem.js, characterSheet.js, Wiki/habilidadesProenfiencias
 */

export const armasEArmadurasProf = {
    id: "armas_armaduras",
    nome: "Maestria em Armaduras e Escudos",
    descricao: "Permite o uso progressivo de armaduras e escudos com diferentes níveis de proteção.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Permite o uso de armaduras leves, como couro, peles, tecidos reforçados... Também permite o uso de escudos simples." },
        { nivel: 2, descricao: "Permite de utilizar armaduras médias. Essas armaduras oferecem proteção moderada, porém, são mais pesadas." },
        { nivel: 3, descricao: "Permite armaduras pesadas. Essas fornecem a maior proteção possível, mas impactam a velocidade e furtividade." }
    ]
};

export const conducaoDeVeiculosTerrestresProf = {
    id: "conducao_terrestre",
    nome: "Condução de Veículos Terrestres",
    descricao: "Capacidade de usar montarias, carroças, charretes e outros transportes terrestres.",
    notas: [
        "Caso não possua essa proficiência o personagem tem desvantagem em todo e qualquer teste que envolva conduzir veículos terrestres."
    ],
    niveis: [
        { nivel: 1, descricao: "Permite uso de montarias simples como cavalos, burros, camelos. Montarias exóticas exigem outro tipo de treinamento." },
        { nivel: 2, descricao: "Permite uso de carruagens, charretes e veículos de tração animal comuns." },
        { nivel: 3, descricao: "Permite condução de veículos terrestres de grande porte, como trens ou veículos blindados." }
    ]
};

export const conducaoDeVeiculosAquaticosProf = {
    id: "conducao_aquatica",
    nome: "Condução de Veículos Aquáticos",
    descricao: "Capacidade de conduzir embarcações aquáticas de diferentes portes.",
    notas: [
        "Caso não possua essa proficiência o personagem tem desvantagem em todo e qualquer teste que envolva conduzir veículos aquáticos."
    ],
    niveis: [
        { nivel: 1, descricao: "Permite a condução de embarcações simples: canoas, barcos a remo, jangadas, etc." },
        { nivel: 2, descricao: "Permite a condução de escunas, pacotes e pequenas fragatas." },
        { nivel: 3, descricao: "Permite a condução de naus, caravelas, galeras e grandes barcos." },
        { nivel: 4, descricao: "Permite a condução de navios de guerra ou mercantes de grande porte." }
    ]
};

export const conducaoExoticaProf = {
    id: "conducao_exotica",
    nome: "Condução Exótica",
    descricao: "Capacidade de conduzir veículos e montarias exóticas.",
    notas: [
        "Caso não possua essa proficiência, o personagem tem desvantagem dupla em qualquer teste de condução exótica.",
        "Regalias podem usar essa proficiência como referência."
    ],
    niveis: [
        { nivel: 1, descricao: "Permite a condução de montarias exóticas." },
        { nivel: 2, descricao: "Permite conduzir veículos exóticos terrestres ou aquáticos simples/médios." },
        { nivel: 3, descricao: "Permite conduzir veículos exóticos subaquáticos ou voadores." },
        { nivel: 4, descricao: "Permite conduzir veículos com habilidades especiais, como naves mágicas ou submersíveis abissais." }
    ]
};

export const kitDeArrombamentoProf = {
    id: "ferramentas_ladrao",
    nome: "Ferramentas de ladrão",
    descricao: "Capacidade de usar ferramentas especiais para abrir trancas e desarmar armadilhas.",
    notas: [
        "Testes de arrombamento utilizam a Destreza da criatura.",
        "Níveis mais altos permitem ações mais rápidas ou contra trancas mágicas."
    ],
    niveis: [
        { nivel: 1, descricao: "Permite usar Ferramentas de ladrão sem desvantagem." },
        { nivel: 2, descricao: "Permite adicionar o modificador de Destreza ao teste para abrir trancas." },
        { nivel: 3, descricao: "Permite realizar a ação de arrombamento com uma única ação em combate." },
        { nivel: 4, descricao: "Permite desativar armadilhas complexas com o kit." },
        { nivel: 5, descricao: "Permite abrir fechaduras mágicas e adicionar Investigação ou Percepção ao valor de Destreza." }
    ]
};

export const armasDeFogoProf = {
    id: "armas_fogo",
    nome: "Proficiência em Armas de Fogo",
    descricao: "Capacidade de manusear armas de fogo, mesmo sem ser um combatente.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Permite uso básico de armas de fogo como pistolas e rifles." },
        { nivel: 2, descricao: "Permite uso de armas de fogo exóticas ou experimentais com habilidades especiais." }
    ]
};

export const linguasAntigasProf = {
    id: "linguas_antigas",
    nome: "Proficiência em Línguas Antigas",
    descricao: "Compreensão e comunicação com línguas de eras passadas.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Compreende e traduz inscrições antigas relacionadas à sua linhagem." },
        { nivel: 2, descricao: "Decifra línguas antigas desconhecidas após 1 hora de estudo." },
        { nivel: 3, descricao: "Aprende e fala línguas antigas após 24h de estudo, podendo se comunicar com seres antigos." }
    ]
};

export const arqueologiaProf = {
    id: "arqueologia",
    nome: "Proficiência em Arqueologia",
    descricao: "Especialização na descoberta, análise e restauração de artefatos históricos.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Identifica e cataloga artefatos com +2 em testes de identificação, ruínas e restauração. Ferramentas arqueológicas dão +2 adicionais." },
        { nivel: 2, descricao: "Recebe +2 em testes de investigação de ruínas e descoberta de tesouros (acumulativo)." },
        { nivel: 3, descricao: "Adquire técnicas de restauração avançada com bônus de +2 em testes de preservação e restauração." }
    ]
};

export const liderancaProf = {
    id: "lideranca",
    nome: "Proficiência em Liderança",
    descricao: "Capacidade de inspirar e comandar aliados e seguidores em diversas situações.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Inspira aliados com +2 em testes por 1 minuto, 3x por descanso longo." },
        { nivel: 2, descricao: "+2 em ataques do grupo, 3x por descanso. +2 em persuasão e negociação." },
        { nivel: 3, descricao: "+2 em testes de seguidores, ataque e dano de aliados sob comando." }
    ]
};

export const armasExoticasProf = {
    id: "armas_exoticas",
    nome: "Proficiência em Armas Exóticas",
    descricao: "Habilidade para usar armas incomuns que não sejam armas de fogo.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Adquire proficiência com 1 arma exótica não relacionada a armas de fogo." },
        { nivel: 2, descricao: "Adquire proficiência com mais 2 armas exóticas não relacionadas a armas de fogo." },
        { nivel: 3, descricao: "Pode usar qualquer arma exótica não relacionada a armas de fogo." }
    ]
};

export const esgrimaProf = {
    id: "esgrima",
    nome: "Proficiência em Esgrima",
    descricao: "Treinamento com espadas leves, adagas e floretes.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Adquire proficiência com espadas leves, adagas, floretes e sabres não exóticos." }
    ]
};

export const arcoBestaProf = {
    id: "arco_besta",
    nome: "Proficiência em Arco e Besta",
    descricao: "Capacidade de usar armas de disparo mecânico.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Adquire proficiência com arcos e bestas." }
    ]
};

export const disfarceProf = {
    id: "disfarce",
    nome: "Proficiência em Disfarce",
    descricao: "Permite o uso de disfarces para as mais diversas necessidades, com maior facilidade conforme o aumento de pontos de proficiência. Testes de enganação tornam-se mais fáceis à medida que o personagem acumula pontos de proficiência.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Permite criar disfarces simples para ocultar a identidade em situações básicas. O personagem pode alterar sua aparência usando maquiagem, adereços e roupas adequadas. +2 em testes de furtividade e enganação enquanto disfarçado." },
        { nivel: 2, descricao: "Permite criar disfarces mais elaborados e convincentes, enganando observadores atentos. O personagem pode imitar características físicas específicas, como altura, peso, voz e até mesmo traços faciais. +2 em testes de furtividade e enganação enquanto disfarçado." },
        { nivel: 3, descricao: "Permite infiltrar-se em locais protegidos com maior facilidade. O personagem é capaz de imitar o comportamento e os trejeitos de uma pessoa ou criatura específica, tornando-se praticamente indistinguível dela. +10 em testes de furtividade e enganação enquanto disfarçado." }
    ]
};

export const ataquesEmAreaProf = {
    id: "ataques_area",
    nome: "Proficiência Contra Ataques em Área",
    descricao: "Capacidade de reduzir o dano de ataques em área ao realizar um teste de reflexo, com a eficácia aumentando com os pontos de proficiência.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Ao sofrer um ataque em área, o personagem pode fazer um teste de reflexo (Agilidade) como reação e reduzir o dano em um valor igual a metade do seu valor de Fortitude." },
        { nivel: 2, descricao: "A redução de dano aumenta para igual ao valor de Fortitude." },
        { nivel: 3, descricao: "A redução de dano aumenta para igual a 2x o valor de Fortitude." }
    ]
};

export const combateAntiConjuradoresProf = {
    id: "anti_conjuradores",
    nome: "Proficiência em Combate Anti-conjuradores",
    descricao: "Permite ao personagem reconhecer sinais de magia, identificar conjuradores e até interromper feitiços, tornando-o mais eficaz contra magia.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Permite ao personagem reconhecer sinais de magia e identificar conjuradores. Ele pode detectar a presença de magia ao seu redor e discernir quando alguém está lançando um feitiço ou utilizando habilidades mágicas. Se uma criatura conjurar qualquer Magia ou Feitiço dentro de seu alcance de ameaça, o personagem pode realizar um ataque de oportunidade." },
        { nivel: 2, descricao: "Aumenta a resistência contra magia. Efeitos mágicos que possuem uma chance de sucesso em porcentagem têm 10% menos chance de ter sucesso." },
        { nivel: 3, descricao: "Permite interromper o efeito de Magias ou Feitiços. Ao realizar ataques contra um conjurador, o personagem pode tentar desfazer um Feitiço ou Magia com duração maior que instantâneo. Cada ataque que acertar tem 10% de chance de desfazer o efeito. Se o personagem impedir um efeito mágico, ele recebe um ponto de magia temporário até o próximo descanso longo ou curto." }
    ]
};

// Array com todas as proficiências
export const proficiencias = [
    armasEArmadurasProf,
    conducaoDeVeiculosTerrestresProf,
    conducaoDeVeiculosAquaticosProf,
    conducaoExoticaProf,
    kitDeArrombamentoProf,
    armasDeFogoProf,
    linguasAntigasProf,
    arqueologiaProf,
    liderancaProf,
    armasExoticasProf,
    esgrimaProf,
    arcoBestaProf,
    disfarceProf,
    ataquesEmAreaProf,
    combateAntiConjuradoresProf
];

// Objeto com valores iniciais zerados para formulários
export const proficienciasIniciais = proficiencias.reduce((acc, prof) => {
    acc[prof.id] = 0;
    return acc;
}, {});

// Função helper para buscar proficiência pelo id ou nome
export const getProficiencia = (idOuNome) => {
    return proficiencias.find(
        p => p.id === idOuNome || 
             p.nome.toLowerCase() === idOuNome.toLowerCase()
    );
};

// Função helper para obter descrição de um nível específico
export const getProficienciaNivel = (idOuNome, nivel) => {
    const prof = getProficiencia(idOuNome);
    if (!prof) return null;
    return prof.niveis.find(n => n.nivel === nivel);
};
