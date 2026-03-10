/**
 * Dados centralizados de Espécies/Raças do sistema Lâmina do Oculto
 * Este arquivo contém todas as raças jogáveis com suas sub-raças (obrigatorias).
 * Usado em: criarPersonagem.js, characterSheet.js, Wiki/especies
 *
 * ── Referência de tamanhos ──
 * minusculo: 0–60 cm | pequeno: 61–130 cm | medio: 131–220 cm
 * grande: 221–350 cm | muito_grande: 351–600 cm | gigante: 601–1200 cm | colossal: >1201 cm
 */

// ============================================================================
// RAÇAS INDIVIDUAIS
// ============================================================================

export const humano = {
    nome: 'Humano',
    pvBase: 10,
    velocidadeBase: 6,
    tamanho: 'medio',
    resistencias: [],
    vulnerabilidades: [],
    imunidades: [],
    descricao: `Na vasta tapeçaria dos mundos, os seres humanos são frequentemente retratados como uma espécie de notável versatilidade. Eles são os sobreviventes por excelência, moldando-se e adaptando-se a uma miríade de circunstâncias desafiadoras, como a argila nas mãos de um habilidoso oleiro.
A resiliência dos seres humanos é uma característica que os destaca. Diante de adversidades intransponíveis, eles não apenas resistem, mas florescem. Desafiando os elementos, as ameaças e as adversidades do destino, os humanos provaram ser mais do que meros mortais. Eles são a personificação da determinação, da vontade indomável de superar obstáculos e de encontrar maneiras de prosperar, não importa quão sombrio seja o cenário.
Mas não é apenas a capacidade de sobrevivência que define os humanos. Sua capacidade destrutiva também é notável. Com criatividade e intelecto afiado, eles desvendam segredos, criam máquinas de guerra imponentes e dominam a magia como nenhuma outra espécie. Eles trazem a destruição, tanto com suas habilidades como com suas inovações, como uma força da natureza que molda o mundo ao seu redor.
Assim, os seres humanos em um mundo representam mais do que simples mortais. Eles personificam a versatilidade, resiliência e capacidade destrutiva que reside no coração de todos nós. Eles nos lembram que, no jogo da vida e da imaginação, somos todos heróis em nossas próprias histórias, prontos para enfrentar o desconhecido, resistir à adversidade e moldar nosso destino à medida que avançamos corajosamente em direção ao desconhecido.`,
    obrigatorias: [
        {
            id: "prodigio",
            nome: "Prodígio Militar",
            descricao: `Um humano que seja um prodígio militar pode realizar um teste de Percepção na mesma ação de atacar, a fim de identificar as fraquezas e forças do seu adversário. Ao passar no teste de habilidade com dificuldade estipulada pelo mestre, o humano ganha vantagem no rolamento de acerto deste e dos próximos ataques, e sua margem de crítico diminui em um até o final de seu turno atual. Ele pode executar essa leitura 3 vezes em um mesmo dia. O valor do teste pode ser alternativamente estipulado pela percepção do alvo, com um padrão de 10 + valor de percepção, se ele não tiver valor declarado, tome como base a dificuldade 15. Além disso, possui proficiência com espadas bastardas.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Leitura de Combate',
                    descricao: 'Teste de Percepção junto ao ataque para identificar fraquezas. Sucesso: vantagem em acerto + margem de crítico -1 até fim do turno.',
                    usosMax: 3,
                    cooldown: 'dia',
                    custoAcoes: 0,
                    custoMagia: null,
                    efeito: { vantagemAcerto: true, criticoReduzido: 1 }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: ['espada_bastarda'],
            flags: {}
        },
        {
            id: "genio",
            nome: "Gênio Acadêmico",
            descricao: `Um humano que seja um gênio acadêmico possui um vasto conhecimento e memória excepcional. Um gênio acadêmico não esquece nada do que leu ou ouviu nos últimos 30 dias. Ele sempre sabe a hora do dia e a estação do ano. Gênios acadêmicos podem usar a ação Recordar Conhecimento enquanto realizam a ação Ler Ambiente ou Buscar Cobertura. Ele pode executar essa ação desta forma 5 vezes em um mesmo dia.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Memória Excepcional',
                    descricao: 'Não esquece nada lido ou ouvido nos últimos 30 dias. Sabe hora do dia e estação.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { memoriaPerfeita: 30 }
                },
                {
                    nome: 'Recordar em Ação',
                    descricao: 'Pode usar Recordar Conhecimento junto com Ler Ambiente ou Buscar Cobertura.',
                    usosMax: 5,
                    cooldown: 'dia',
                    custoAcoes: 0,
                    custoMagia: null,
                    efeito: { acoesCombinadasConhecimento: true }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "faztudo",
            nome: "Faz Tudo",
            descricao: `Um humano que seja um faz-tudo é um indivíduo que não se dedicou a dominar uma habilidade específica, mas aprendeu várias delas. Um faz-tudo pode realizar a ação Abrir fechadura e a ação Preparar com apenas uma ação, e a ação Desabilitar Dispositivo com duas ações. Ele pode escolher uma destas opções para executar desta maneira 3 vezes ao dia. Ou pode escolher uma Proficiência para alocar 1 ponto.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Versatilidade',
                    descricao: 'Abrir Fechadura + Preparar em 1 ação, ou Desabilitar Dispositivo em 2 ações (3×/dia). Ou +1 ponto de proficiência livre.',
                    usosMax: 3,
                    cooldown: 'dia',
                    custoAcoes: 1,
                    custoMagia: null,
                    efeito: { acoesReduzidas: { abrirFechadura: 1, preparar: 1, desabilitarDispositivo: 2 } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        }
    ]
};

export const elfo = {
    nome: 'Elfo',
    pvBase: 10,
    velocidadeBase: 7.5,
    tamanho: 'medio',
    resistencias: [],
    vulnerabilidades: [],
    imunidades: [],
    descricao: `Dentro dos vastos mundos, a raça dos Elfos, com suas três distintas facções - os Elfos Exordiais, os Elfos Selvagens e os Elfos Lunares, apesar das diferenças evidentes, compartilham algumas notáveis semelhanças que refletem a essência de sua linhagem comum.
Independentemente de suas origens, os Elfos são uma espécie que tende a viver vidas notavelmente longas, muitas vezes atingindo séculos de idade. Essa longevidade confere uma profunda perspectiva de vida, permitindo que eles acumulem conhecimento e sabedoria ao longo dos anos. Todos os Elfos possuem traços físicos distintos, como a delicadeza de seus traços faciais e a graça de sua aparência, que são igualmente apreciados nas três subespécies.
Os Elfos, em geral, compartilham uma conexão singular com a magia e o mundo natural. Eles são conhecidos por sua afinidade natural com a magia, o que é especialmente perceptível nos Elfos Lunares, que banham-se na luz noturna e tiram proveito da magia lunar. Os Elfos Exordiais também mantêm uma relação profunda com a magia, refletindo em sua habilidade telepática e visão única. Já os Elfos Selvagens, embora priorizem a natureza, também têm um respeito inabalável pelo equilíbrio mágico da vida selvagem.`,
    obrigatorias: [
        {
            id: "ElfoExordial",
            nome: "Elfo Exordial",
            descricao: `Elfos Exordiais são a espécie original dos primeiros elfos. Elfos exordiais conseguem enxergar no escuro em até 9 metros de distância como se fosse em meia luz e como luz completa em meia luz. Elfos exordiais conseguem se comunicar com outros seres por telepatia, com uma distância máxima de 15 metros. Se o alvo da telepatia for outro elfo exordial esse alcance aumenta para 36 metros.`,
            visaoNoEscuro: { alcance: 9, tipo: 'meiaLuz' },
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Telepatia',
                    descricao: 'Comunicação telepática com outros seres em até 15 m (36 m com outro Elfo Exordial).',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { telepatia: { alcance: 15, alcanceElfoExordial: 36 } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "ElfoSelvagem",
            nome: "Elfo Selvagem",
            descricao: `Elfos Selvagens gostam de viver em ambientes naturais com pouca intervenção para construir suas sociedades. Elfos selvagens não precisam de equipamento de acampamentos para conseguir os benefícios de um descanso longo. Elfos selvagens também tem uma velocidade de movimento elevada, enquanto não usam armadura pesada, de 12 metros de velocidade de movimento base. Possuem visão no escuro com alcance de até 18 metros de distância como se fosse em meia luz e como luz completa em meia luz.`,
            visaoNoEscuro: { alcance: 18, tipo: 'meiaLuz' },
            velocidadeOverride: 12,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: { semDescansoEquipamento: true, velocidadeCondicao: 'semArmaduraPesada' }
        },
        {
            id: "ElfoLunar",
            nome: "Elfo Lunar",
            descricao: `Elfos lunares gostam de se banhar na luz noturna e são mais ativos durante a noite. Elfos lunares conseguem enxergar no escuro com alcance de 18 metros como se fosse luz completa e adicionais 18 metros como se fossem meia luz, e 36 metros como luz completa em meia luz. Elfos lunares conseguem se direcionar através da posição dos astros do céu noturno e não ficam perdidos viajando em ambientes abertos durante a noite. Elfos lunares são resistentes ao dano sombrio.`,
            visaoNoEscuro: { alcance: 18, tipo: 'luzCompleta', alcanceExtra: 18, tipoExtra: 'meiaLuz', meiaLuzAlcance: 36 },
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: ['sombrio'],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Navegação Noturna',
                    descricao: 'Orienta-se pelos astros; nunca fica perdido em ambientes abertos à noite.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { navegacaoNoturna: true }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        }
    ]
};

export const anao = {
    nome: 'Anão',
    pvBase: 12,
    velocidadeBase: 4.5,
    tamanho: 'medio',
    resistencias: [],
    vulnerabilidades: [],
    imunidades: [],
    descricao: `Dentro da cultura geral dos Anões, as três vertentes - Domínio das Minas, Domínio da Forja e os Anões Exilados - são elementos cruciais que se entrelaçam e enriquecem a sociedade anã como um todo.
Os Anões, como um povo, são conhecidos por sua durabilidade e sua determinação inabalável. A cultura anã valoriza a honestidade, a lealdade e o senso de comunidade. Os princípios éticos e a profunda reverência pelas tradições são aspectos centrais da vida anã.`,
    obrigatorias: [
        {
            id: "DominiodasMinas",
            nome: "Domínio das Minas",
            descricao: `Um anão que vem do domínio das minas tem uma linhagem de trabalhadores ou donos de minas. Um anão dessa linhagem reconhece com mais precisão veias de minério em cavernas e túneis de pedra caso existam, ganhando um bônus de +10 em testes de conhecimento e exploração que envolve perceber ou identificar a presença de minério em cavernas e outros. Um anão desta linhagem também consegue sentir tremores e vibrações na rocha relacionados a desastres naturais (terremotos, enchentes, deslizamentos), recebendo vantagem em testes de Habilidades (Investigação ou Percepção) para saber se irá acontecer algum tipo de deslocamento terrestre natural em rochas. Dentro do domínio das minas, um anão é treinado em perceber e navegar sem luz ou pouca luz e pode enxergar no escuro em até 9 metros como se fosse meia luz e como luz completa em meia luz.`,
            visaoNoEscuro: { alcance: 9, tipo: 'meiaLuz' },
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Identificar Minério',
                    descricao: '+10 em testes de conhecimento/exploração para perceber ou identificar minério em cavernas.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { bonusTeste: { contexto: 'minerio_cavernas', valor: 10 } }
                },
                {
                    nome: 'Sentir Tremores',
                    descricao: 'Vantagem em Investigação ou Percepção para detectar deslocamentos terrestres naturais em rochas.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { vantagemTeste: { habilidades: ['investigacao', 'percepcao'], contexto: 'tremores_rocha' } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "DominiodaForja",
            nome: "Domínio da Forja",
            descricao: `Um anão do domínio da forja se origina de uma linhagem de trabalhadores de metal e consegue reconhecer a qualidade de uma arma apenas de olhar para ela. Testes de Habilidade de história, Natureza ou Arcanatec recebe um valor igual a +1 quando se trata de itens forjados em metal. Anões da forja também tem proficiência em machado anão. Anões da forja tem resistência a dano de fogo.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: ['fogo'],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Conhecimento de Forja',
                    descricao: '+1 em testes de História, Natureza ou Arcanatec sobre itens forjados em metal.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { bonusTeste: { habilidades: ['historia', 'natureza', 'arcanatec'], contexto: 'itens_metal', valor: 1 } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: ['machado_anao'],
            flags: {}
        },
        {
            id: "Exilado",
            nome: "Exilado",
            descricao: `O Exilado é um indivíduo que nunca se dedicou a masterizar nenhuma habilidade por estar fora das linhagens principais da sociedade anã, porém aprendeu várias Habilidades mundo afora. Um exilado consegue usar a ação Abrir fechadura e Preparar com apenas uma ação e a ação Desabilitar Dispositivo com duas ações. Ele pode escolher uma destas opções para executar desta maneira 3 vezes ao dia. Ou pode escolher uma Proficiência para alocar 1 ponto.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Versatilidade',
                    descricao: 'Abrir Fechadura + Preparar em 1 ação, ou Desabilitar Dispositivo em 2 ações (3×/dia). Ou +1 ponto de proficiência livre.',
                    usosMax: 3,
                    cooldown: 'dia',
                    custoAcoes: 1,
                    custoMagia: null,
                    efeito: { acoesReduzidas: { abrirFechadura: 1, preparar: 1, desabilitarDispositivo: 2 } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        }
    ]
};

export const feerico = {
    nome: 'Feérico',
    pvBase: 10,
    velocidadeBase: 6,
    tamanho: 'medio',
    resistencias: [],
    vulnerabilidades: [],
    imunidades: [],
    descricao: `Em meio a um mundo repleto de criaturas feéricas de todas as formas e tamanhos, a sociedade feérica é uma tapeçaria de diversidade e mágica. Cada subespécie, como os Gnomos, Pixies, Dríades, Sátiros, Ninfas da Névoa, Mariposas Eternas e Menecmas, contribui de maneira única para a intrincada teia da convivência e interações entre esses seres mágicos e o mundo que os cerca.`,
    obrigatorias: [
        {
            id: "Gnomo",
            nome: "Gnomo",
            descricao: `O gnomo é um ser feérico minúsculo e, por isso, sua velocidade de movimento é de 4,5 metros. Um gnomo, por ser pequeno e ágil, consegue atravessar por debaixo de criaturas médias ou maiores sem penalidade de movimento. Um gnomo tem a capacidade de ficar tão imóvel que chega a parecer parte do ambiente e recebe vantagem em testes de furtividade enquanto imóvel em um ambiente de luz completa ou meia luz, e de vantagem dupla em ambientes escuros.`,
            visaoNoEscuro: null,
            velocidadeOverride: 4.5,
            velocidadeVoo: null,
            tamanhoOverride: 'minusculo',
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Atravessar Criaturas',
                    descricao: 'Pode passar por debaixo de criaturas médias ou maiores sem penalidade de movimento.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { atravessarCriaturas: { tamanhoMinimo: 'medio' } }
                },
                {
                    nome: 'Imobilidade Camuflada',
                    descricao: 'Vantagem em furtividade enquanto imóvel (luz completa/meia luz); vantagem dupla no escuro.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { vantagemFurtividade: { condicao: 'imovel', luz: 'vantagem', escuro: 'vantagemDupla' } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "PixiesSprite",
            nome: "Pixies/Sprites",
            descricao: `A pixie ou o sprite são fadas minúsculas e sua velocidade de movimento base por terra é de 4,5 metros, porém eles têm uma velocidade de movimento base de voo igual a 7,5 metros. Em um combate, a fada/sprite pode usar a ação esconder junto com a ação recuar cuidadosamente, para mesclar magicamente com o ambiente e se esconder se passar, sumindo da visão de todos e ficando Obscurecido.`,
            visaoNoEscuro: null,
            velocidadeOverride: 4.5,
            velocidadeVoo: 7.5,
            tamanhoOverride: 'minusculo',
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Mesclar com Ambiente',
                    descricao: 'Pode usar Esconder + Recuar Cuidadosamente na mesma ação. Se passar, fica Obscurecido.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: 1,
                    custoMagia: null,
                    efeito: { acoesCombinadas: ['esconder', 'recuarCuidadosamente'], condicaoAplicada: 'obscurecido' }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "Driade",
            nome: "Dríade",
            descricao: `A dríade é um espírito, de tamanho médio ou pequeno, feérico antigo de carvalhos e outros membros anciões de uma mata ou floresta. Dríades conseguem atravessar superfícies de madeira de até 1,5 metros de espessura e podem escalar árvores sem precisar realizar um teste de atletismo. Ao realizar um descanso longo em um ambiente de floresta a dríade ganha o seu nível em pontos de vida temporários, que duram até perdê-los ou receber uma nova fonte de vida temporária.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            tamanhoOverride: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Atravessar Madeira',
                    descricao: 'Atravessa superfícies de madeira de até 1,5 m de espessura.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { atravessarMaterial: { tipo: 'madeira', espessuraMax: 1.5 } }
                },
                {
                    nome: 'Escalada Natural',
                    descricao: 'Escala árvores sem teste de atletismo.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { escalarSemTeste: 'arvores' }
                },
                {
                    nome: 'Descanso na Floresta',
                    descricao: 'Descanso longo em floresta concede PV temporários iguais ao nível.',
                    usosMax: 1,
                    cooldown: 'descanso_longo',
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { pvTemporarios: 'nivel', contexto: 'floresta' }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "Satiro",
            nome: "Sátiro",
            descricao: `O sátiro é uma criatura de tamanho médio ou pequeno, metade cervo/bode e metade homem. Esse ser feérico tem a capacidade de saltar igual a sua velocidade de movimento em um salto horizontal, ou metade de sua velocidade de movimento para um salto vertical. Pode usar seu chifre como uma arma natural que causa 1d8 de dano de impacto.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            tamanhoOverride: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [{ nome: 'Chifre', dano: '1d8', tipoDano: 'impacto' }],
            habilidadesEspeciais: [
                {
                    nome: 'Salto Aprimorado',
                    descricao: 'Salto horizontal = velocidade de movimento; salto vertical = metade.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { saltoHorizontal: 'velocidadeMovimento', saltoVertical: 'metadeVelocidade' }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "NinfadaNevoa",
            nome: "Ninfa da Névoa",
            descricao: `As Névoa Ninfas são seres humanóides feéricos, de tamanho médio ou grande, associados à névoa e ao orvalho. Sua velocidade de movimento é de 7,5 metros, mas podem se transformar em névoa por um curto período (1 minuto), permitindo-lhes deslizar através de fendas e frestas inacessíveis para a maioria. Quando em forma de névoa, são quase intangíveis e podem evitar ataques físicos, porém não podem atacar enquanto nesta forma.`,
            visaoNoEscuro: null,
            velocidadeOverride: 7.5,
            velocidadeVoo: null,
            tamanhoOverride: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Forma de Névoa',
                    descricao: 'Transforma-se em névoa por 1 minuto. Intangível (evita ataques físicos), mas não pode atacar.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: 1,
                    custoMagia: null,
                    efeito: { formaNevoa: { duracao: '1 minuto', intangivel: true, podeAtacar: false } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "MariposasEternas",
            nome: "Mariposas Eternas",
            descricao: `São fadas humanoides de tamanho médio que se assemelham a mariposas com asas iridescentes. Sua velocidade de voo é incrivelmente rápida, atingindo 12 metros por turno. Elas têm a habilidade de criar ilusões coloridas pequenas, com uma ação em combate de até um cubo com 1,5m de aresta, que podem distrair e confundir inimigos possuem valor de dificuldade 10 para discernir se é uma ilusão ou não com um teste de Investigação, tornando-as mestres da ilusão.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: 12,
            tamanhoOverride: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Ilusão Colorida',
                    descricao: 'Cria ilusão de até 1,5 m³. DC 10 (Investigação) para discernir.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: 1,
                    custoMagia: null,
                    efeito: { ilusao: { tamanhoMax: 1.5, dificuldade: 10, teste: 'investigacao' } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "Menecma",
            nome: "Menecma",
            descricao: `O menecma é um humanóide feérico capaz de assumir aparência de seres de tamanho médio ou pequeno. Ele pode roubar a aparência de qualquer humanóide de tamanho parecido do seu que tenha visto. A transformação é mágica, aparece em detecção de magia e possui duração de 1 hora. Pode se transformar dessa forma até 4 vezes em um dia.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            tamanhoOverride: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Transformação de Aparência',
                    descricao: 'Assume aparência de humanóide de tamanho similar que tenha visto. Duração 1 hora. Detectável por detecção de magia.',
                    usosMax: 4,
                    cooldown: 'dia',
                    custoAcoes: 1,
                    custoMagia: null,
                    efeito: { transformacao: { duracao: '1 hora', detectavel: true, tipoDeteccao: 'magia' } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        }
    ]
};

export const draconiano = {
    nome: 'Draconiano',
    pvBase: 9,
    velocidadeBase: 4.5,
    tamanho: 'grande',
    resistencias: [],
    vulnerabilidades: [],
    imunidades: [],
    descricao: `Nas vastas terras deste mundo, uma espécie singular conhecida como Draconianos deixa sua marca indelével. Estes seres, fruto da fusão entre dragões ancestrais e outras linhagens, são uma presença notável em nossa realidade. Com uma aparência majestosa, os Draconianos podem ostentar asas imponentes, escamas iridescentes e olhos que irradiam sabedoria.`,
    obrigatorias: [
        {
            id: "MeioDragao",
            nome: "Meio-Dragão",
            descricao: `O meio dragão é fruto de uma quase incompatível combinação de um dragão com um elfo ou humano. Um meio dragão tem sua descendência de um dos três tipos de dragão: fogo, gelo e raio. O meio dragão tem resistência ao dano correspondente de seu ancestral.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            tamanhoOverride: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Resistência Ancestral',
                    descricao: 'Escolha um elemento ancestral: fogo, gelo ou raio. Ganha resistência a esse dano.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { resistenciaEscolha: ['fogo', 'gelo', 'raio'] }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "MeioWyvern",
            nome: "Meio-Wyvern",
            descricao: `O meio wyvern é a mistura do dracônico wyvern com um bestial ou humano. É menor que meio dragão e meio draco, por isso é uma criatura considerada de tamanho médio. Um meio wyvern é o mais rápido dos draconianos e possui uma velocidade de movimento base de 6 m. O meio wyvern pode também usar uma ação para dar um grande avanço correspondente a 15 metros. Uma vez que ele tenha feito isso deve esperar ao menos 1 minuto para fazer de novo.`,
            visaoNoEscuro: null,
            velocidadeOverride: 6,
            velocidadeVoo: null,
            tamanhoOverride: 'medio',
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Grande Avanço',
                    descricao: 'Usa 1 ação para avançar 15 metros. Cooldown: 1 minuto.',
                    usosMax: null,
                    cooldown: '1 minuto',
                    custoAcoes: 1,
                    custoMagia: null,
                    efeito: { avanco: { distancia: 15 } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "MeioWyrm",
            nome: "Meio-Wyrm",
            descricao: `O meio wyrm é uma mistura entre o dracônico wyrm com um feérico ou um humano. O meio wyrm é menor que meio dragão e meio draco, por isso é uma criatura considerada de tamanho médio. O meio wyrm traz consigo a mordida venenosa de seu parente e podem tentar como uma ação envenenar uma criatura com um ataque de mordida. Caso acerte o ataque causa 1d6 de dano e deixa o inimigo envenenado com dano por rodada de 1d4 de dano por 3 rodadas. Pode fazer essa mordida uma vez a cada 1 minuto.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            tamanhoOverride: 'medio',
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [{ nome: 'Mordida Venenosa', dano: '1d6', tipoDano: 'perfurante' }],
            habilidadesEspeciais: [
                {
                    nome: 'Mordida Venenosa',
                    descricao: 'Ataque de mordida: 1d6 dano + veneno 1d4/rodada por 3 rodadas.',
                    usosMax: null,
                    cooldown: '1 minuto',
                    custoAcoes: 1,
                    custoMagia: null,
                    efeito: { dano: '1d6', veneno: { dano: '1d4', duracao: 3, momento: 'inicioTurno' } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "MeioDraco",
            nome: "Meio-Draco",
            descricao: `O meio draco é uma mistura do dracônico draco com um bestial ou troll. Esse draconiano é o único que não pode escolher a regalia de Asas Draconianas, então para se adaptar a sua vida terrestre possui longas garras e chifres. O meio draco pode usar sua garra como uma arma de uma mão e se tiver o treinamento considerar cada mão como uma arma. O dano de seu ataque com garra é de 1d10 de dano cortante.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            tamanhoOverride: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [{ nome: 'Garras', dano: '1d10', tipoDano: 'cortante' }],
            habilidadesEspeciais: [],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: { semAsasDraconianas: true }
        },
        {
            id: "Kobolds",
            nome: "Kobolds",
            descricao: `Kobolds são pequenos draconianos que são a mistura de raças pequenas ou minúsculas com qualquer tipo de dragão. Eles possuem uma velocidade de movimento igual a 4,5 m por serem pequenos. Eles têm a capacidade de usar sua criatividade e inteligência para solucionar problemas. Eles podem usar a ação esconder quando usar a ação Buscar cobertura ao mesmo tempo sem custo extra, como também conseguem usar a ação habilitar/desabilitar dispositivo como uma ação.`,
            visaoNoEscuro: null,
            velocidadeOverride: 4.5,
            velocidadeVoo: null,
            tamanhoOverride: 'pequeno',
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Criatividade Kobold',
                    descricao: 'Esconder + Buscar Cobertura na mesma ação; Habilitar/Desabilitar Dispositivo como 1 ação.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: 1,
                    custoMagia: null,
                    efeito: { acoesCombinadas: ['esconder', 'buscarCobertura'], acoesReduzidas: { desabilitarDispositivo: 1 } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        }
    ]
};

export const meioElfo = {
    nome: 'Meio-Elfo',
    pvBase: 9,
    velocidadeBase: 6,
    tamanho: 'medio',
    resistencias: [],
    vulnerabilidades: [],
    imunidades: [],
    descricao: `Os Meio-Elfos, graciosos e dotados de beleza etérea, são a manifestação da união entre elfos e humanóides. Com uma herança mista que combina a paixão e a curiosidade dos humanos com a conexão profunda dos elfos com a natureza, eles se tornam um elo especial entre dois mundos.`,
    obrigatorias: [
        {
            id: "MeioExordial",
            nome: "Meio-Exordial",
            descricao: `O meio exordial é um meio elfo formado por pais elfo exordial e humano. Este meio elfo é capaz de conversar telepaticamente com outras criaturas e não só elfos, porém só pode usar essa telepatia por 6 segundos. Após sua telepatia por 6 segundos deve esperar 10 minutos para usar novamente. Consegue usar a ação Desabilitar Dispositivo com duas ações.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Telepatia Breve',
                    descricao: 'Telepatia com qualquer criatura por 6 segundos. Cooldown: 10 minutos.',
                    usosMax: null,
                    cooldown: '10 minutos',
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { telepatia: { duracao: '6 segundos' } }
                },
                {
                    nome: 'Desabilitar Rápido',
                    descricao: 'Usa Desabilitar Dispositivo com apenas 2 ações.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { acoesReduzidas: { desabilitarDispositivo: 2 } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "MeioSelvagem",
            nome: "Meio-Selvagem",
            descricao: `O meio selvagem é um meio elfo formado por pais elfo selvagem e humano. Este meio elfo tem uma velocidade de movimento elevada, enquanto não usam armadura pesada, de 7,5 metros de velocidade de movimento base. Além disso, proficiência com espadas-diapasão.`,
            visaoNoEscuro: null,
            velocidadeOverride: 7.5,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [],
            bonusHabilidades: {},
            proficienciasGanhas: ['espada_diapasao'],
            flags: { velocidadeCondicao: 'semArmaduraPesada' }
        },
        {
            id: "MeioLunar",
            nome: "Meio-Lunar",
            descricao: `O meio lunar é um meio elfo formado por pais elfo lunar e humano. Este meio elfo é capaz de enxergar no escuro com alcance de 6 metros como se fosse meia luz na escuridão, e luz completa na meia luz. Não esquece nada que leu ou ouviu nos últimos 30 dias.`,
            visaoNoEscuro: { alcance: 6, tipo: 'meiaLuz' },
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Memória Excepcional',
                    descricao: 'Não esquece nada lido ou ouvido nos últimos 30 dias.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { memoriaPerfeita: 30 }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        }
    ]
};

export const meioDemonio = {
    nome: 'Meio-Demônio',
    pvBase: 11,
    velocidadeBase: 6,
    tamanho: 'medio',
    resistencias: [],
    vulnerabilidades: [],
    imunidades: [],
    descricao: `Os Meio-Demônios, criaturas marcadas pela dualidade em sua essência, são o resultado da união entre seres demoníacos e humanóides. Eles carregam uma herança mágica sombria e uma natureza única que os distingue em meio aos dois mundos de sua ancestralidade.`,
    obrigatorias: [
        {
            id: "DemonioArcano",
            nome: "Demônio Arcano",
            descricao: `Um meio-demônio arcano é filho de um elfo, humano ou feérico com um demônio conjurador de feitiços. Com seu sangue demoníaco, o meio demônio desta linhagem pode conjurar feitiços ou magias com sua vitalidade quando estiver sem pontos de magia. Para cada ponto de magia necessário para conjurar uma magia ou feitiço são gastos 1d6 pontos de vida.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Sangue Arcano',
                    descricao: 'Quando sem PM, pode conjurar magias/feitiços gastando 1d6 PV por ponto de magia.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { converterVidaEmMagia: { custoPorPM: '1d6', recursoOrigem: 'pv' } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "DemonioGuerreiro",
            nome: "Demônio Guerreiro",
            descricao: `Um meio-demônio guerreiro é filho de um elfo, humano ou feérico com um demônio do exército do inferno. Com seu sangue demoníaco, o meio demônio desta linhagem pode realizar manobras ou habilidades com sua vitalidade quando estiver sem pontos de Estâmina. Para cada ponto de Estâmina necessário para usar uma Habilidade são gastos 1d6 pontos de vida.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Sangue Guerreiro',
                    descricao: 'Quando sem Estâmina, pode usar habilidades gastando 1d6 PV por ponto de estâmina.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { converterVidaEmEstamina: { custoPorEstamina: '1d6', recursoOrigem: 'pv' } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "SucubosIncubos",
            nome: "Súcubos/Íncubos",
            descricao: `Um meio-demônio súcubo ou íncubo é filho de um elfo, humano ou feérico com uma súcubo ou íncubo. Com seu sangue demoníaco, o meio demônio desta linhagem pode tentar encantar uma criatura como uma ação. A criatura encantada não agirá de maneira hostil com o demônio, a não ser que este a ataque ou lhe cause algum mal. O personagem pode tentar uma criatura por vez e uma vez a cada um minuto. A chance de sucesso é de 50%.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Encantar Criatura',
                    descricao: 'Encanta 1 criatura (50% chance). Alvo não age hostilmente, exceto se atacado. 1 alvo por vez.',
                    usosMax: null,
                    cooldown: '1 minuto',
                    custoAcoes: 1,
                    custoMagia: null,
                    efeito: { encantamento: { chanceSucesso: 0.5, alvoMax: 1, condicaoAplicada: 'encantado' } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        }
    ]
};

export const meioCelestial = {
    nome: 'Meio-Celestial',
    pvBase: 9,
    velocidadeBase: 6,
    tamanho: 'medio',
    resistencias: [],
    vulnerabilidades: [],
    imunidades: [],
    descricao: `Os Meio-Celestiais são seres excepcionais, nascidos da união entre celestiais e humanóides. Eles carregam em si a luminosidade e a benevolência das esferas divinas, manifestando essa herança em sua existência terrena.`,
    obrigatorias: [
        {
            id: "CelestialArcano",
            nome: "Celestial Arcano",
            descricao: `Um meio celestial arcano é filho de um elfo, humano ou feérico com um celestial conjurador de magias e milagres. Com seu sangue sagrado, o meio celestial desta linhagem pode conjurar milagres ou magias com seu vigor quando estiver sem pontos de magia. Para cada ponto de magia necessário para conjurar uma magia ou feitiço são gastos 2 pontos de Estamina.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Vigor Sagrado Arcano',
                    descricao: 'Quando sem PM, pode conjurar magias/milagres gastando 2 Estamina por ponto de magia.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { converterEstaminaEmMagia: { custoPorPM: 2, recursoOrigem: 'estamina' } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "CelestialGuerreiro",
            nome: "Celestial Guerreiro",
            descricao: `Um meio-celestial guerreiro é filho de um elfo, humano ou feérico com um celestial do exército divino. Com seu sangue sagrado, o meio celestial desta linhagem pode realizar manobras ou Habilidades com sua magia quando estiver sem pontos de Estamina. Para cada ponto de Estamina necessário para usar uma Habilidade são gastos 2 pontos de magia.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Vigor Sagrado Guerreiro',
                    descricao: 'Quando sem Estamina, pode usar habilidades gastando 2 PM por ponto de estâmina.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { converterMagiaEmEstamina: { custoPorEstamina: 2, recursoOrigem: 'magia' } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "CelestialIntermediador",
            nome: "Celestial Intermediador",
            descricao: `Um meio-celestial intermediador é filho de um elfo, humano ou feérico com um juiz sagrado. Com seu sangue sagrado, o meio celestial desta linhagem pode tentar apaziguar uma criatura como uma ação. A criatura encantada não agirá de maneira hostil com o celestial ou seus aliados, a não ser que a ataquem ou lhe causem algum mal. O personagem pode tentar uma criatura por vez, uma vez a cada um minuto. A chance de sucesso é de 40%.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Apaziguar Criatura',
                    descricao: 'Apazigua 1 criatura (40% chance). Alvo não age hostilmente contra ninguém do grupo. 1 alvo por vez.',
                    usosMax: null,
                    cooldown: '1 minuto',
                    custoAcoes: 1,
                    custoMagia: null,
                    efeito: { encantamento: { chanceSucesso: 0.4, alvoMax: 1, protegeAliados: true, condicaoAplicada: 'encantado' } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        }
    ]
};

export const meioGenio = {
    nome: 'Meio-Gênio',
    pvBase: 10,
    velocidadeBase: 6,
    tamanho: 'medio',
    resistencias: [],
    vulnerabilidades: [],
    imunidades: [],
    descricao: `Os Meio-Gênios, fruto de uma união entre elementais e humanóides, são seres cujas almas estão profundamente entrelaçadas com os segredos dos elementos. Eles representam uma ligação especial entre os reinos elementais e o mundo dos mortais.`,
    obrigatorias: [
        {
            id: "MeioGenioDoFogo",
            nome: "Meio-Gênio do Fogo",
            descricao: `Este meio gênio tem afinidade com o elemento fogo e possui resistência ao dano de fogo, porém tem vulnerabilidade a dano de gelo. Consegue acender velas e fogueiras com uma pequena chama em seus dedos.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: ['fogo'],
            vulnerabilidades: ['gelo'],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Chama nos Dedos',
                    descricao: 'Acende velas e fogueiras com uma pequena chama nos dedos.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { utilidade: 'acenderFogo' }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "MeioGenioDoGelo",
            nome: "Meio-Gênio do Gelo",
            descricao: `Este meio gênio tem afinidade com o elemento Gelo e possui resistência ao dano de gelo, porém tem vulnerabilidade a dano de raio. Consegue resfriar objetos e congelar pequenas quantidades (10 cm cúbicos) de líquidos a cada 12 segundos.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: ['gelo'],
            vulnerabilidades: ['raio'],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Toque Gélido',
                    descricao: 'Resfria objetos e congela até 10 cm³ de líquido a cada 12 segundos.',
                    usosMax: null,
                    cooldown: '12 segundos',
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { utilidade: 'congelarLiquido', volume: 10 }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "MeioGenioDoRaio",
            nome: "Meio-Gênio do Raio",
            descricao: `Este meio gênio tem afinidade com o raio e possui resistência ao dano de raio, porém tem vulnerabilidade a dano de terra. Ele também consegue criar pequenas descargas elétricas que podem gerar luz por um minuto e faz o cabelo ficar de pé.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: ['raio'],
            vulnerabilidades: ['terra'],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Descarga Elétrica',
                    descricao: 'Cria pequenas descargas elétricas que geram luz por 1 minuto.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { utilidade: 'gerarLuz', duracao: '1 minuto' }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "MeioGenioDaTerra",
            nome: "Meio-Gênio da Terra",
            descricao: `Este meio gênio tem afinidade com o elemento terra e possui resistência ao dano de terra, porém tem vulnerabilidade a dano de fogo. Ele também consegue mover uma pequena quantidade (50 cm cúbicos) de terra com a mão a cada 6 segundos.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: ['terra'],
            vulnerabilidades: ['fogo'],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Moldar Terra',
                    descricao: 'Move até 50 cm³ de terra com a mão a cada 6 segundos.',
                    usosMax: null,
                    cooldown: '6 segundos',
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { utilidade: 'moverTerra', volume: 50 }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        }
    ]
};

export const meioTroll = {
    nome: 'Meio-Troll',
    pvBase: 12,
    velocidadeBase: 7.5,
    tamanho: 'medio',
    resistencias: [],
    vulnerabilidades: [],
    imunidades: [],
    descricao: `Os Meio-Trolls são criaturas únicas, resultado da fusão entre humanóides e a resistência formidável dos trolls. Com uma linhagem que inclui diversos tipos de trolls, como os de areia, gelo e montanha, eles carregam em si a dualidade de uma herança selvagem e formidável.`,
    obrigatorias: [
        {
            id: "MeioMontanhoso",
            nome: "Meio-Montanhoso",
            descricao: `Um meio-troll é a mistura de um troll com um ser humanoide. Esse mestiço pode arremessar qualquer objeto, forte o suficiente para causar dano que pese até 5kg. Causando 1d10 pontos de dano de impacto, com uma distância de 15 metros. Podendo utilizar esse arremesso uma vez a cada 10 minutos.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Arremesso Poderoso',
                    descricao: 'Arremessa objeto de até 5 kg causando 1d10 impacto a 15 m.',
                    usosMax: null,
                    cooldown: '10 minutos',
                    custoAcoes: 1,
                    custoMagia: null,
                    efeito: { arremesso: { pesoMax: 5, dano: '1d10', tipoDano: 'impacto', alcance: 15 } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "MeioGeloso",
            nome: "Meio-Geloso",
            descricao: `Um meio-troll é a mistura de um troll com um ser humanoide. Esse mestiço tem resistência ao dano elemental de gelo. Além de possuírem uma velocidade de movimento de 9 metros.`,
            visaoNoEscuro: null,
            velocidadeOverride: 9,
            velocidadeVoo: null,
            resistencias: ['gelo'],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "MeioArenoso",
            nome: "Meio-Arenoso",
            descricao: `Um meio-troll é a mistura de um troll com um ser humanoide. Esses mestiços são resistentes ao cansaço, não sofrem com os efeitos dos 2 primeiros níveis de cansado. Além de não sofrerem penalidade de movimento por andar em um terreno difícil.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Resistência ao Cansaço',
                    descricao: 'Imune aos efeitos dos 2 primeiros níveis de Cansado.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { imunidadeCansaco: { niveisIgnorados: 2 } }
                },
                {
                    nome: 'Pés Firmes',
                    descricao: 'Não sofre penalidade de movimento em terreno difícil.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { ignorarTerrenoDificil: true }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        }
    ]
};

export const bestial = {
    nome: 'Bestial',
    pvBase: 10,
    velocidadeBase: 6,
    tamanho: 'medio',
    resistencias: [],
    vulnerabilidades: [],
    imunidades: [],
    descricao: `Os Bestiais são uma espécie singular que personifica a diversidade do reino animal em uma forma humanoide. Eles representam uma maravilhosa manifestação da natureza, trazendo consigo uma ampla variedade de características e habilidades, refletindo os muitos aspectos da vida selvagem.`,
    obrigatorias: [
        {
            id: "Alados",
            nome: "Alados",
            descricao: `Bestiais alados são humanoides com traços de qualquer pássaro. Bestiais alados podem voar até sua velocidade de movimento. Enquanto um bestial alado estiver caindo pode usar sua reação para abrir suas asas e quebrar a queda. Ao realizar essa reação não sofrerá o dano da queda.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: 6,
            tamanhoOverride: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Quebrar Queda',
                    descricao: 'Reação: abre as asas para anular dano de queda.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: 0,
                    custoMagia: null,
                    efeito: { reacao: true, anularDanoQueda: true }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "Brutamontes",
            nome: "Brutamontes",
            descricao: `Bestiais brutamontes são humanoides grandes com traços de animais que pesam naturalmente pelo menos 400 kg e possuem um valor de vida inicial igual a 12 (2 pontos acima do valor base da espécie). Após se mover por pelo menos 4,5 metros em linha reta, o Bestial brutamontes pode realizar um ataque com seu chifre, galhada ou cabeça, que causa 2d6 pontos de dano, além de empurrar seu inimigo por 3m. Se o rolamento de ataque for um acerto crítico, além do dano dobrado, empurra o dobro da distância.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            tamanhoOverride: 'grande',
            pvOverride: 12,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [{ nome: 'Chifre/Galhada/Cabeça', dano: '2d6', tipoDano: 'impacto' }],
            habilidadesEspeciais: [
                {
                    nome: 'Investida',
                    descricao: 'Após mover 4,5 m em linha reta: ataque com chifre/galhada (2d6 + empurra 3 m). Crítico: dano dobrado + empurra 6 m.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: 1,
                    custoMagia: null,
                    efeito: { investida: { distanciaMinima: 4.5, dano: '2d6', empurrao: 3, criticoEmpurrao: 6 } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "Predadores",
            nome: "Predadores",
            descricao: `Bestiais predadores são humanóides carnívoros e caçadores terrestres (Canídeos, répteis e felinos principalmente). Predadores possuem uma maior velocidade de movimento de 7,5 metros e também possuem armas naturais, que podem ser garras ou presas. Essas armas naturais causam 1d10 pontos de dano perfurante ou cortante.`,
            visaoNoEscuro: null,
            velocidadeOverride: 7.5,
            velocidadeVoo: null,
            tamanhoOverride: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [{ nome: 'Garras/Presas', dano: '1d10', tipoDano: 'perfurante_ou_cortante' }],
            habilidadesEspeciais: [],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "Herbivoraz",
            nome: "Herbivoraz",
            descricao: `Bestiais herbivorazes são pequenos humanóides com traços de animais herbívoros ou onívoros leves e ágeis, seu valor de Velocidade de Movimento é igual a 4,5. Um bestial herbivoraz pode usar sua agilidade de fuga para escapar do perigo, ou corajosamente avançar para atacar primeiro como instinto de sobrevivência. Um herbivoraz pode usar a ação disparada com o custo de duas ações ao invés de três. Ao usar a ação correr ou andar pode realizar, como parte da mesma ação, usar a ação Buscar Cobertura. Desde que esteja usando um escudo ou tenha cobertura próximo de si.`,
            visaoNoEscuro: null,
            velocidadeOverride: 4.5,
            velocidadeVoo: null,
            tamanhoOverride: 'pequeno',
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Disparada Ágil',
                    descricao: 'Ação Disparada custa 2 ações ao invés de 3.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: 2,
                    custoMagia: null,
                    efeito: { acoesReduzidas: { disparada: 2 } }
                },
                {
                    nome: 'Movimento Defensivo',
                    descricao: 'Ao correr/andar, pode Buscar Cobertura na mesma ação (requer escudo ou cobertura próxima).',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: 0,
                    custoMagia: null,
                    efeito: { acoesCombinadas: ['mover', 'buscarCobertura'], condicao: 'comEscudoOuCobertura' }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "Aquaticos",
            nome: "Aquáticos",
            descricao: `Bestiais aquáticos são humanoides com traços de animais aquáticos como os mais variados peixes e anfíbios. Esses bestiais conseguem respirar debaixo d'água. Nadam em qualquer tipo de correnteza sem precisar de um teste de atletismo. Com as escamas que se formam em sua pele, um bestial aquático recebe um bônus de 2 pontos de valor de defesa enquanto não estiver usando armadura média ou pesada. Um bestial aquático que não fica submergido por pelo menos uma hora a cada 48 horas fica um nível de Cansado, que pode acumular com outras fontes.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            tamanhoOverride: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Respiração Aquática',
                    descricao: 'Respira debaixo d\'água.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { respiracaoAquatica: true }
                },
                {
                    nome: 'Natação Natural',
                    descricao: 'Nada em qualquer correnteza sem teste de atletismo.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { natacaoSemTeste: true }
                },
                {
                    nome: 'Escamas Protetoras',
                    descricao: '+2 defesa enquanto não usar armadura média ou pesada.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { bonusDefesa: 2, condicao: 'semArmaduraMediaOuPesada' }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: { necessidadeSubmersao: { intervaloHoras: 48, duracaoMinHoras: 1, penalidade: 'cansado_1' } }
        }
    ]
};

export const halfling = {
    nome: 'Halfling',
    pvBase: 10,
    velocidadeBase: 4.5,
    tamanho: 'pequeno',
    resistencias: [],
    vulnerabilidades: [],
    imunidades: [],
    descricao: `Os Halflings, apesar de seu tamanho modesto, são gigantes quando se trata de coragem e espírito aventureiro. Eles vivem suas vidas com uma determinação feroz, enfrentando desafios muito maiores do que eles mesmos. Seus sorrisos são tão amplos quanto seus corações, e sua disposição para explorar o desconhecido é incomparável.`,
    obrigatorias: [
        {
            id: "Comuns",
            nome: "Comuns",
            descricao: `Halflings que lembram pequenos humanos, são ágeis e agitados. Esses halflings possuem a capacidade de usar a ação Esconder estando logo atrás de um aliado. Um halfling consegue se esconder mas não buscar cobertura desta maneira.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Esconder Atrás de Aliado',
                    descricao: 'Pode usar ação Esconder estando atrás de um aliado (não pode buscar cobertura).',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: 1,
                    custoMagia: null,
                    efeito: { esconderAtrasAliado: true }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "Subterraneos",
            nome: "Subterrâneos",
            descricao: `Halflings que vivem nas profundezas das cavernas e túneis subterrâneos, em constante harmonia com a escuridão e os segredos das entranhas da terra. Eles possuem a pele pálida avermelhada nas extremidades e olhos maiores que os comuns e que possuem pupilas enormes. Halflings do Submundo possuem visão no escuro com alcance de 64 metros, enxergando como se estivessem em meia luz.`,
            visaoNoEscuro: { alcance: 64, tipo: 'meiaLuz' },
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "Monstruosidades",
            nome: "Monstruosidades",
            descricao: `Halflings monstros são todas as espécies de goblinóides e kobolds (canídeos). Esses halflings são conhecidos por trabalhar em equipe e cultuar seres mais fortes. São muito orgulhosos do próprio povo ou de quem cultuam, esse orgulho se traduz em confiança e determinação em batalha. Quando realizam um ataque esses halflings conseguem usar ação Intimidar ao mesmo tempo. Essa habilidade pode ser usada 3 vezes ao dia. Quando estão com um ou mais aliados flanqueando um inimigo recebe vantagem em jogadas de acerto.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Ataque Intimidador',
                    descricao: 'Ao atacar, pode usar Intimidar na mesma ação (3×/dia).',
                    usosMax: 3,
                    cooldown: 'dia',
                    custoAcoes: 0,
                    custoMagia: null,
                    efeito: { acoesCombinadas: ['atacar', 'intimidar'] }
                },
                {
                    nome: 'Tática de Grupo',
                    descricao: 'Vantagem em jogadas de acerto ao flanquear inimigo com 1+ aliados.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { vantagemAcerto: true, condicao: 'flanqueando' }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        }
    ]
};

export const troll = {
    nome: 'Troll',
    pvBase: 15,
    velocidadeBase: 4.5,
    tamanho: 'muito_grande',
    resistencias: [],
    vulnerabilidades: [],
    imunidades: [],
    descricao: `Trolls são seres colossais, conhecidos por sua resistência sobrenatural e presença imponente. Independentemente da variação específica de sua linhagem, todos os Trolls compartilham traços comuns que os tornam verdadeiras forças da natureza no mundo da alta fantasia.`,
    obrigatorias: [
        {
            id: "TrollDaMontanha",
            nome: "Troll da Montanha",
            descricao: `Um Troll da Montanha são grandes seres humanóides monstruosos. Eles podem arremessar qualquer objeto grande e pesado, como pedras, toras de madeira e etc. em uma distância de até 15m. Um alvo atingido por esses objetos sofrem 2d10 de dano. Arremessar um objeto é uma ação e exige que tenha tal objeto próximo. Seu físico incomparável os permite ultrapassar a sua capacidade de carga em até 50 quilos por ponto de força durante 1 hora. Após realizar tal feito é necessário ao menos um descanso curto.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Arremesso Colossal',
                    descricao: 'Arremessa objetos grandes a 15 m causando 2d10 dano.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: 1,
                    custoMagia: null,
                    efeito: { arremesso: { dano: '2d10', alcance: 15 } }
                },
                {
                    nome: 'Força Incomparável',
                    descricao: 'Pode exceder capacidade de carga em +50 kg/ponto de Força por 1 hora. Requer descanso curto após.',
                    usosMax: 1,
                    cooldown: 'descanso_curto',
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { cargaExtra: { kgPorForca: 50, duracao: '1 hora' } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "TrollDoGelo",
            nome: "Troll do Gelo",
            descricao: `Um Troll do Gelo são grandes seres humanóides monstruosos. Esses trolls são imunes ao frio, ao dano de gelo e à condição Congelando.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: ['gelo', 'frio', 'congelando'],
            armasNaturais: [],
            habilidadesEspeciais: [],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        },
        {
            id: "TrollDoDeserto",
            nome: "Troll do Deserto",
            descricao: `Um Troll do Deserto são grandes seres humanóides monstruosos. Esses trolls são imunes ao cansaço e são adaptados para andar na areia, ignorando terrenos difíceis naturais.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: [],
            vulnerabilidades: [],
            imunidades: ['cansado'],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Pés do Deserto',
                    descricao: 'Ignora terrenos difíceis naturais.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { ignorarTerrenoDificil: true }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: {}
        }
    ]
};

export const constructo = {
    nome: 'Constructo',
    pvBase: 11,
    velocidadeBase: 6,
    tamanho: 'medio',
    resistencias: [],
    vulnerabilidades: [],
    imunidades: ['veneno', 'envenenado', 'cansado'],
    descricao: `Na penumbra do mundo da alta fantasia, os Constructos erguem-se como testemunhos vivos da união entre a magia ancestral e a habilidade criativa dos artífices. São entidades de energias elementais, infundidas com as almas ardentes do fogo, da eletricidade, do ar e da sombra, cada qual trazendo consigo uma personalidade distinta e um conjunto inigualável de talentos.`,
    obrigatorias: [
        {
            id: "ConstructoDeUtilidade",
            nome: "Constructo de Utilidade",
            descricao: `O constructo de utilidade foi criado ao usar um espírito elemental de fogo para alimentar uma máquina ajudante. Usadas em forjas, construções e transporte, essas máquinas são capazes de grande capacidade de carga, sendo capazes de carregar o dobro de carga que uma criatura orgânica de mesmo tamanho. Os constructos de Habilidade são duráveis porém lentos, sua velocidade de movimento é igual a 4,5 metros. Eles são imunes à condição de Cansado e não precisam de comida ou água. Para um descanso longo um constructo precisa ficar parado em modo inativo por 4 horas, e seu descanso curto funciona de maneira padrão. São resistentes ao dano de fogo e imunes ao dano de venenos e a condição Envenenado ou Sangrando. São vulneráveis ao dano de gelo.`,
            visaoNoEscuro: null,
            velocidadeOverride: 4.5,
            velocidadeVoo: null,
            resistencias: ['fogo'],
            vulnerabilidades: ['gelo'],
            imunidades: ['sangrando'],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Carga Dobrada',
                    descricao: 'Carrega o dobro da carga de uma criatura orgânica de mesmo tamanho.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { multiplicadorCarga: 2 }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: { semComida: true, semAgua: true, descansoReduzido: { longo: 4, curto: 'padrao' } }
        },
        {
            id: "ConstructoDeBatalha",
            nome: "Constructo de Batalha",
            descricao: `O constructo de batalha foi criado ao usar um espírito elemental de raio para alimentar uma máquina combatente. Usadas como guardas, soldados e assassinos, essas máquinas possuem uma armadura embutida que pode ser melhorada e reforçada. Seu valor de defesa inicial é de 15. Um constructo de batalha não pode adicionar sua agilidade ao seu valor de defesa e nem usar armaduras. Eles são imunes à condição de Cansado e não precisam de comida ou água. Para um descanso longo um constructo precisa ficar parado em modo inativo por 4 horas, e seu descanso curto funciona de maneira padrão. São resistentes ao dano de raio e imunes ao dano de venenos, a condição Envenenado e a condição Sangrando. São vulneráveis ao dano de terra.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: ['raio'],
            vulnerabilidades: ['terra'],
            imunidades: ['sangrando'],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Armadura Embutida',
                    descricao: 'Defesa base 15. Não pode adicionar agilidade à defesa nem usar armaduras.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { defesaFixa: 15, semBonusAgilidade: true, semArmaduras: true }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: { semComida: true, semAgua: true, descansoReduzido: { longo: 4, curto: 'padrao' } }
        },
        {
            id: "ConstructoDeExploracao",
            nome: "Constructo de Exploração",
            descricao: `O constructo de exploração foi criado ao utilizar um espírito elemental do ar para alimentar uma máquina de exploração versátil. Essas máquinas são frequentemente usadas em missões de reconhecimento, exploração de áreas desconhecidas e busca de tesouros escondidos. Possuem uma capacidade de voo limitada, permitindo-lhe voar por 10 minutos a cada descanso curto ou longo. Sua velocidade de movimento é de 9 metros em terra e 18 metros no ar. Os constructos de exploração são imunes à condição de Cansado e não precisam de comida ou água. Para um descanso longo, um constructo precisa ficar inativo em modo de economia de energia por 2 horas, enquanto seu descanso curto funciona como o padrão. São resistentes ao dano de raio e imunes ao dano de veneno e à condição Envenenado. São vulneráveis aos danos de gelo e terra.`,
            visaoNoEscuro: null,
            velocidadeOverride: 9,
            velocidadeVoo: 18,
            resistencias: ['raio'],
            vulnerabilidades: ['gelo', 'terra'],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Voo Limitado',
                    descricao: 'Pode voar por 10 minutos a cada descanso curto ou longo.',
                    usosMax: 1,
                    cooldown: 'descanso_curto',
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { vooLimitado: { duracao: '10 minutos' } }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: { semComida: true, semAgua: true, descansoReduzido: { longo: 2, curto: 'padrao' } }
        },
        {
            id: "ConstructoDeInvasao",
            nome: "Constructo de Invasão",
            descricao: `O constructo de sigilo foi criado ao utilizar um espírito elemental sombrio para alimentar uma máquina furtiva especializada em missões secretas e espionagem. Essas máquinas são especialistas em se mover em silêncio e em se esconder nas sombras. Possuem a habilidade de camuflagem que as tornam quase invisíveis em ambientes escuros, fornecendo +3 em testes de furtividade enquanto fora de luz completa. Sua velocidade de movimento é de 6 metros, mas quando estão nas sombras, sua velocidade é dobrada para 12 metros. Eles não precisam de comida ou água e são imunes à condição Cansado. Para um descanso longo, um constructo de sigilo precisa de apenas 2 horas de inatividade nas sombras, enquanto seu descanso curto funciona de maneira padrão. São resistentes ao dano de sombra e imunes ao dano de veneno e à condição Envenenado. São vulneráveis aos danos sagrado e de fogo.`,
            visaoNoEscuro: null,
            velocidadeOverride: null,
            velocidadeVoo: null,
            resistencias: ['sombrio'],
            vulnerabilidades: ['sagrado', 'fogo'],
            imunidades: [],
            armasNaturais: [],
            habilidadesEspeciais: [
                {
                    nome: 'Camuflagem nas Sombras',
                    descricao: '+3 em furtividade fora de luz completa. Velocidade dobra (12 m) nas sombras.',
                    usosMax: null,
                    cooldown: null,
                    custoAcoes: null,
                    custoMagia: null,
                    efeito: { bonusFurtividade: { valor: 3, condicao: 'foraLuzCompleta' }, velocidadeNasSombras: 12 }
                }
            ],
            bonusHabilidades: {},
            proficienciasGanhas: [],
            flags: { semComida: true, semAgua: true, descansoReduzido: { longo: 2, curto: 'padrao' } }
        }
    ]
};

// ============================================================================
// OBJETO CONSOLIDADO COM TODAS AS ESPÉCIES
// ============================================================================

export const especies = {
    humano,
    elfo,
    anao,
    feerico,
    draconiano,
    meioElfo,
    meioDemonio,
    meioCelestial,
    meioGenio,
    meioTroll,
    bestial,
    halfling,
    troll,
    constructo
};

// Alias para manter compatibilidade com código existente que usa 'racas'
export const racas = especies;

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Lista todas as espécies disponíveis
 * @returns {Array} Array com todas as espécies
 */
export const getTodasEspecies = () => Object.values(especies);

/**
 * Busca uma espécie pelo nome ou chave
 * @param {string} nomeOuChave - Nome ou chave da espécie
 * @returns {Object|null} Espécie encontrada ou null
 */
export const getEspecie = (nomeOuChave) => {
    const chave = nomeOuChave.toLowerCase().replace(/[-\s]/g, '');
    if (especies[chave]) return especies[chave];
    
    return Object.values(especies).find(e => 
        e.nome.toLowerCase().replace(/[-\s]/g, '') === chave
    ) || null;
};

/**
 * Busca uma sub-raça pelo ID
 * @param {string} especieId - ID da espécie
 * @param {string} subracaId - ID da sub-raça
 * @returns {Object|null} Sub-raça encontrada ou null
 */
export const getSubraca = (especieId, subracaId) => {
    const especie = getEspecie(especieId);
    if (!especie) return null;
    
    return especie.obrigatorias.find(s => s.id === subracaId) || null;
};

/**
 * Lista todas as sub-raças de uma espécie
 * @param {string} especieId - ID da espécie
 * @returns {Array} Array de sub-raças
 */
export const getSubracas = (especieId) => {
    const especie = getEspecie(especieId);
    return especie ? especie.obrigatorias : [];
};

/**
 * Conta o total de sub-raças no sistema
 * @returns {number} Total de sub-raças
 */
export const getTotalSubracas = () => {
    return Object.values(especies).reduce((total, e) => total + e.obrigatorias.length, 0);
};

/**
 * Cria um mapa de espécies para uso em dropdowns/selects
 * @returns {Array} Array de objetos {value, label, subracas}
 */
export const getEspeciesParaSelect = () => {
    return Object.entries(especies).map(([key, especie]) => ({
        value: key,
        label: especie.nome,
        subracas: especie.obrigatorias.map(s => ({ value: s.id, label: s.nome }))
    }));
};

// Map para characterSheet (especiesMap) - compatibilidade
export const especiesMap = Object.fromEntries(
    Object.entries(especies).map(([key, especie]) => [
        especie.nome,
        {
            nome: especie.nome,
            subracas: especie.obrigatorias.map(s => s.nome)
        }
    ])
);

// ============================================================================
// TODO-ESP-003 — getEstatisticasEspecie (merge espécie base + sub-raça)
// ============================================================================

/**
 * Retorna o bloco consolidado de estatísticas mecânicas de uma espécie + sub-raça.
 * Faz merge dos stats base da espécie com os overrides da sub-raça.
 *
 * @param {string} especieId - Chave ou nome da espécie (ex: 'humano', 'elfo')
 * @param {string} subracaId - ID da sub-raça (ex: 'prodigio', 'ElfoExordial')
 * @returns {Object|null} Bloco consolidado ou null se não encontrado
 */
export const getEstatisticasEspecie = (especieId, subracaId) => {
    const especie = getEspecie(especieId);
    if (!especie) return null;

    const subraca = especie.obrigatorias.find(s => s.id === subracaId);
    if (!subraca) return null;

    // Merge arrays (espécie base + sub-raça), sem duplicatas
    const mergeArrays = (base, override) => {
        const merged = [...(base || []), ...(override || [])];
        return [...new Set(merged)];
    };

    return {
        // Identidade
        especieNome: especie.nome,
        subracaNome: subraca.nome,

        // Stats base (sub-raça faz override se definido)
        pvBase: subraca.pvOverride ?? especie.pvBase,
        velocidadeBase: subraca.velocidadeOverride ?? especie.velocidadeBase,
        velocidadeVoo: subraca.velocidadeVoo ?? null,
        tamanho: subraca.tamanhoOverride ?? especie.tamanho,

        // Visão
        visaoNoEscuro: subraca.visaoNoEscuro ?? null,

        // Defesas e fraquezas (merge espécie + sub-raça)
        resistencias: mergeArrays(especie.resistencias, subraca.resistencias),
        vulnerabilidades: mergeArrays(especie.vulnerabilidades, subraca.vulnerabilidades),
        imunidades: mergeArrays(especie.imunidades, subraca.imunidades),

        // Combate
        armasNaturais: subraca.armasNaturais || [],

        // Habilidades e bônus
        habilidadesEspeciais: subraca.habilidadesEspeciais || [],
        bonusHabilidades: subraca.bonusHabilidades || {},
        proficienciasGanhas: subraca.proficienciasGanhas || [],

        // Flags especiais
        flags: subraca.flags || {}
    };
};

export default especies;
