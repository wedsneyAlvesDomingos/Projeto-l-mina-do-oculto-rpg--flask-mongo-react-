/**
 * Dados centralizados de Regalias do sistema Lâmina do Oculto
 * Este arquivo contém as regalias de aprendiz, regalias opcionais,
 * classes primárias, especializações e funções de resolução.
 *
 * Usado em: criarPersonagem.js, characterSheet.js, Wiki/classes
 *
 * Sistema de Regalias:
 *   Nível 1: 4 pontos (1 espécie + 1 classe aprendiz + 1 profissão + 1 livre)
 *   Nível 2: +4 pontos
 *   Nível 3+: +2 pontos por nível
 *   Total nível 20: 44 pontos
 *
 * Cada regalia de aprendiz comprada concede: +2 PV, +4 Estâmina, +4 Magia
 */

// ============================================================================
// REGALIAS DE APRENDIZ (Classes iniciais)
// ============================================================================

export const regaliasDeAprendiz = [
    {
        id: 'combatente',
        nome: 'Combatente Aprendiz',
        descricao: `1 ponto em Força, Fortitude ou Destreza.
1 ponto em Combate Corpo a Corpo ou Combate À Distância.
Proficiência em Armas Marciais, Armaduras Leves e Médias, e Escudo Simples.
Habilidade: Recuperar Fôlego – Ação de turno completo para recuperar 4 PV (custa 2 Magia). Pode recuperar também 4 Estamina por mais 2 Magia.`,
        // --- Dados mecânicos estruturados ---
        bonusHabilidades: {},
        escolhasHabilidades: [
            { grupo: ['forca', 'fortitude', 'destreza'], pontos: 1 },
            { grupo: ['combateCorpoACorpo', 'combateADistancia'], pontos: 1 }
        ],
        proficienciasGanhas: ['armas_marciais', 'armaduras_leves', 'armaduras_medias', 'escudo_simples'],
        habilidadesGanhas: [
            {
                nome: 'Recuperar Fôlego',
                descricao: 'Ação de turno completo para recuperar 4 PV. Pode recuperar também 4 Estamina por mais 2 Magia.',
                tipo: 'ativa',
                custoAcoes: 3, // turno completo
                custoMagia: 2,
                efeito: { curaHP: 4 },
                efeitoOpcional: { custoMagiaExtra: 2, curaEstamina: 4 }
            }
        ],
        bonusPorRegalia: { pv: 2, estamina: 4, magia: 4 }
    },
    {
        id: 'novico',
        nome: 'Noviço(a) Aprendiz',
        descricao: `1 ponto em Teologia, Arcanismo ou Medicina.
1 ponto em Combate Arcano, Corpo a Corpo ou Distância.
Milagres: 
- Abençoar Água: sagrada por 1h, usada para encantar arma ou causar 1d12 em mortos-vivos.
- Facilitar Cura: cura até 4d6 PV de até 2 criaturas (10 min, 2 Magia).
- Tocha Sagrada: ilumina e cega mortos-vivos no 1º turno.`,
        bonusHabilidades: {},
        escolhasHabilidades: [
            { grupo: ['teologia', 'arcanismo', 'medicina'], pontos: 1 },
            { grupo: ['combateArcano', 'combateCorpoACorpo', 'combateADistancia'], pontos: 1 }
        ],
        proficienciasGanhas: [],
        habilidadesGanhas: [
            {
                nome: 'Abençoar Água',
                descricao: 'Abençoa uma porção de água, tornando-a sagrada por 1h. Pode acumular até 5 frascos. Usar para encantar arma por 1 minuto (1 Magia/frasco) ou jogar em morto-vivo causando 1d12 de dano (3 Magia total).',
                tipo: 'milagre',
                custoAcoes: 1,
                custoMagia: 1,
                duracao: '1 hora',
                efeito: {
                    encantarArma: { duracao: '1 minuto', propriedade: 'sagrado', custoMagiaPorFrasco: 1 },
                },
                efeitoOpcional: {
                    nome: 'Jogar em Morto-Vivo',
                    custoMagiaExtra: 2, // total 3 PM (1 base + 2 extra)
                    alcance: 9,
                    dano: '1d12',
                    tipoDano: 'sagrado'
                },
                limiteAcumulo: 5
            },
            {
                nome: 'Facilitar Cura',
                descricao: 'Operação de 10 minutos. Cura até 4d6 PV em até 2 criaturas de uma vez.',
                tipo: 'milagre',
                custoAcoes: null, // 10 minutos fora de combate
                tempoExecucao: '10 minutos',
                custoMagia: 2,
                efeito: { curaHP: '4d6', alvosMax: 2 }
            },
            {
                nome: 'Tocha Sagrada',
                descricao: 'Toca um item com energia sagrada. Produz luz completa até 3m e meia-luz por mais 3m. Mortos-vivos na luz ficam cegos no 1º turno de combate.',
                tipo: 'milagre',
                custoAcoes: 1,
                custoMagia: 1,
                duracao: '1 hora',
                efeito: {
                    luzCompleta: 3, // metros
                    meiaLuz: 3,
                    cegarMortosVivos: { duracao: '1 turno', condicao: 'primeiro turno de combate' }
                }
            }
        ],
        bonusPorRegalia: { pv: 2, estamina: 4, magia: 4 }
    },
    {
        id: 'iniciado',
        nome: 'Iniciado(a) Aprendiz',
        descricao: `1 ponto em Arcanismo, Ritualismo ou Arcanatec.
1 ponto em Combate Arcano.
Magias:
- Míssil Arcano: 1d4 por míssil (2 Magia cada, até 5).
- Detectar Magia: detecta e identifica magia (2–6 Magia).
- Iluminação Arcana: cria luz por 1h (1 Magia).`,
        bonusHabilidades: {},
        escolhasHabilidades: [
            { grupo: ['arcanismo', 'ritualismo', 'arcanatec'], pontos: 1 },
            { grupo: ['combateArcano'], pontos: 1 } // obrigatório
        ],
        proficienciasGanhas: [],
        habilidadesGanhas: [
            {
                nome: 'Míssil Arcano',
                descricao: 'Dispara um projétil de energia arcana causando 1d4 de dano. Alcance 36m. Custa 2 Magia por míssil, até 5 mísseis de uma vez.',
                tipo: 'magia',
                custoAcoes: 2,
                custoMagia: 2, // por míssil
                alcance: 36,
                efeito: { dano: '1d4', tipoDano: 'arcano', misseisPorCast: 1, misseisMax: 5 },
                escalamento: { custoMagiaPorMissilExtra: 2 }
            },
            {
                nome: 'Detectar Magia',
                descricao: 'Olhos brilham com poder arcano; pode ver poder arcano emanando do ambiente, objetos ou pessoas. Alcance 9m.',
                tipo: 'magia',
                custoAcoes: 1,
                custoMagia: 2,
                alcance: 9,
                efeito: { detectarMagia: true },
                efeitoOpcional: {
                    custoMagiaExtra: 4, // total 6
                    custoAcoesExtra: 1,
                    identificarEscola: true
                }
            },
            {
                nome: 'Iluminação Arcana',
                descricao: 'Toca um item ou a própria mão. Produz luz completa até 3m e meia-luz por mais 3m. Duração 1h.',
                tipo: 'magia',
                custoAcoes: 1,
                custoMagia: 1,
                duracao: '1 hora',
                efeito: { luzCompleta: 3, meiaLuz: 3 }
            }
        ],
        bonusPorRegalia: { pv: 2, estamina: 4, magia: 4 }
    },
    {
        id: 'feiticeiro',
        nome: 'Feiticeiro(a) Aprendiz',
        descricao: `1 ponto em Ocultismo ou Ritualismo.
1 ponto em Combate Arcano.
Feitiços:
- Orbe Caótico: 2d6 de dano de elemento aleatório (2 Magia).
- Azaralhar: alvo atordoado até próximo turno (4 Magia + chance).
- Luz Guia: cria luz por 1h (1 Magia).`,
        bonusHabilidades: {},
        escolhasHabilidades: [
            { grupo: ['ocultismo', 'ritualismo'], pontos: 1 },
            { grupo: ['combateArcano'], pontos: 1 } // obrigatório
        ],
        proficienciasGanhas: [],
        habilidadesGanhas: [
            {
                nome: 'Orbe Caótico',
                descricao: 'Dispara um orbe de elemento aleatório causando 2d6 de dano. Rola 1d6: 1=Fogo, 2=Gelo, 3=Terra, 4=Ar, 5=Raio, 6=Escolhe.',
                tipo: 'feitico',
                custoAcoes: 2,
                custoMagia: 2,
                efeito: {
                    dano: '2d6',
                    tipoDano: 'elemental_aleatorio',
                    tabelaElemento: { 1: 'fogo', 2: 'gelo', 3: 'terra', 4: 'ar', 5: 'raio', 6: 'escolha' }
                }
            },
            {
                nome: 'Azaralhar',
                descricao: 'Embaralha os sentidos do alvo (alcance 9m), causando Atordoado até o próximo turno. 30% de chance de sucesso.',
                tipo: 'feitico',
                custoAcoes: 2,
                custoMagia: 4,
                alcance: 9,
                efeito: {
                    condicao: 'atordoado',
                    duracao: 'até próximo turno',
                    chanceSucesso: 30
                },
                escalamento: { bonusChancePorMagiaExtra: 5 }
            },
            {
                nome: 'Luz Guia',
                descricao: 'Foca energia na própria mão. Produz luz completa até 3m e meia-luz por mais 3m. Duração 1h.',
                tipo: 'feitico',
                custoAcoes: 1,
                custoMagia: 1,
                duracao: '1 hora',
                efeito: { luzCompleta: 3, meiaLuz: 3 }
            }
        ],
        bonusPorRegalia: { pv: 2, estamina: 4, magia: 4 }
    },
    {
        id: 'diplomata',
        nome: 'Diplomata Aprendiz',
        descricao: `2 pontos em Persuasão ou Enganação.
1 ponto em Negociação.
2 pontos em Sedução e Intimidação.
Habilidade: Barganhar – negociação com serviços (não mercadorias), 1x por pessoa/semana.
Rolamento define desconto: 5% com sucesso moderado, maiores descontos com rolagens maiores.`,
        bonusHabilidades: { negociacao: 1 },
        escolhasHabilidades: [
            { grupo: ['persuasao', 'enganacao'], pontos: 2 },
            { grupo: ['seducao', 'intimidacao'], pontos: 2 } // ambas recebem
        ],
        proficienciasGanhas: [],
        habilidadesGanhas: [
            {
                nome: 'Barganhar',
                descricao: 'Pode fazer um teste de Negociação por descontos em serviços (hospedagem, etc.), mas NÃO em compras de mercadorias. 1x por pessoa por semana. Role 1d20 + bônus de Negociação.',
                tipo: 'ativa',
                custoAcoes: null, // fora de combate
                custoMagia: 0,
                limiteUso: '1x por pessoa por semana',
                dado: '1d20',
                efeito: {
                    tabelaDesconto: [
                        { rolagem: '1-7',  desconto: 0,  resultado: 'Falha — sem desconto' },
                        { rolagem: '8-14', desconto: 5,  resultado: 'Sucesso moderado — 5%' },
                        { rolagem: '15-17',desconto: 10, resultado: 'Bom sucesso — 10%' },
                        { rolagem: '18-20',desconto: 15, resultado: 'Ótimo sucesso — 15%' }
                    ]
                }
            }
        ],
        bonusPorRegalia: { pv: 2, estamina: 4, magia: 4 }
    },
    {
        id: 'explorador',
        nome: 'Explorador Aprendiz',
        descricao: `2 pontos em Rastreamento ou Investigação.
1 ponto em Sobrevivência e Navegação.
2 Pontos em Percepção ou Furtividade.
Proficiente com Ferramentas de ladrão.
Aprende a Habilidade:
Visão para abrigo:
Um explorador aprendiz consegue procurar um abrigo natural para proteger dos elementos. A chance de sucesso é de 80%. E se não houver abrigos naturais, ele pode criar um com elementos locais. Além disso, um explorador aprendiz tem um bônus de +2 em testes de sobrevivência para achar comida e água caso exista.`,
        bonusHabilidades: { sobrevivencia: 1, navegacao: 1 },
        escolhasHabilidades: [
            { grupo: ['rastreamento', 'investigacao'], pontos: 2 },
            { grupo: ['percepcao', 'furtividade'], pontos: 2 }
        ],
        proficienciasGanhas: ['kit_arrombamento'],
        habilidadesGanhas: [
            {
                nome: 'Visão para Abrigo',
                descricao: 'Procura um abrigo natural para se proteger dos elementos. 80% de chance de sucesso. Se não houver abrigos naturais, pode criar um com elementos locais. +2 em testes de sobrevivência para achar comida e água.',
                tipo: 'ativa',
                custoAcoes: null, // fora de combate
                custoMagia: 0,
                efeito: {
                    chanceSucesso: 80,
                    criarAbrigoSemItens: true,
                    bonusSobrevivenciaComidaAgua: 2
                }
            }
        ],
        bonusPorRegalia: { pv: 2, estamina: 4, magia: 4 }
    },
    {
        id: 'academico',
        nome: 'Acadêmico Aprendiz',
        descricao: `2 pontos em História ou Intuição
1 ponto em Jurisprudência e Teologia
2 Pontos em Medicina ou Natureza
Aprende a Habilidade:
Já li sobre isso:
Um acadêmico tem +2 em qualquer rolamento de conhecimento. Um acadêmico também recebe +3 em testes de persuasão que o ajude a entrar em uma biblioteca, templo ou centro acadêmico com conhecimento registrado de alguma forma.`,
        bonusHabilidades: { jurisprudencia: 1, teologia: 1 },
        escolhasHabilidades: [
            { grupo: ['historia', 'intuicao'], pontos: 2 },
            { grupo: ['medicina', 'natureza'], pontos: 2 }
        ],
        proficienciasGanhas: [],
        habilidadesGanhas: [
            {
                nome: 'Já Li Sobre Isso',
                descricao: '+2 em qualquer rolamento de conhecimento. +3 em testes de persuasão para entrar em bibliotecas, templos ou centros acadêmicos.',
                tipo: 'passiva',
                custoAcoes: null,
                custoMagia: 0,
                efeito: {
                    bonusConhecimento: 2,
                    bonusPersuasaoAcademico: 3
                }
            }
        ],
        bonusPorRegalia: { pv: 2, estamina: 4, magia: 4 }
    },
    {
        id: 'guardarPonto',
        nome: 'Guardar ponto',
        descricao: 'Guarda este ponto de regalia para o próximo nível',
        bonusHabilidades: {},
        escolhasHabilidades: [],
        proficienciasGanhas: [],
        habilidadesGanhas: [],
        bonusPorRegalia: { pv: 0, estamina: 0, magia: 0 }
    }
];

// ============================================================================
// REGALIAS OPCIONAIS (Espécies Variantes)
// ============================================================================

export const regaliasOpcionais = {
    regalias_opcionais: [
        {
            tipo: "Psíquico",
            custo: 2,
            descricao: "Escolha um dos seguintes poderes psíquicos para começar:",
            opcoes: [
                {
                    nome: "Telecinese",
                    descricao: "O personagem tem a habilidade de mover objetos com a mente. O personagem consegue mover até um objeto de até 5 quilos que esteja em um alcance de até 30 metros de distância. O movimento não é veloz e não pode realizar ataques com armas com essa habilidade. Além disso, 3 vezes ao dia o personagem pode usar a sua reação para empurrar, 3 metros para a direção a sua escolha, uma criatura que se aproxime dele em uma distância de 3 metros.",
                    efeitos: {
                        bonusDefesa: null,
                        bonusAtaque: null,
                        armasNaturais: null,
                        resistencias: null,
                        velocidadeExtra: null,
                        visaoNoEscuro: null,
                        habilidadesAtivas: [
                            {
                                nome: 'Mover Objeto',
                                tipo: 'passiva',
                                custoAcoes: null,
                                custoMagia: 0,
                                cooldown: null,
                                efeito: { moverObjeto: true, pesoMax: 5, alcance: 30, ataqueProibido: true }
                            },
                            {
                                nome: 'Empurrão Telecinético',
                                tipo: 'reacao',
                                custoAcoes: 0, // reação
                                custoMagia: 0,
                                cooldown: '3x por dia',
                                efeito: { empurrar: 3, alcanceTrigger: 3, direcaoEscolha: true }
                            }
                        ]
                    }
                },
                {
                    nome: "Telepatia",
                    descricao: "Ler pensamentos e se comunicar mentalmente com outras pessoas. O personagem consegue manter conversas telepáticas com criaturas que a possa entender em até 27 metros de distância. Além disso, o jogador pode escolher tentar ler a mente, com 70% chance de sucesso, de alguém que possa ver em até 18 metros de distância. O jogador com sucesso em sua tentativa consegue ler os pensamentos superficiais do alvo, como o que ele está pensando no exato momento, contra a sua vontade.",
                    efeitos: {
                        bonusDefesa: null,
                        bonusAtaque: null,
                        armasNaturais: null,
                        resistencias: null,
                        velocidadeExtra: null,
                        visaoNoEscuro: null,
                        habilidadesAtivas: [
                            {
                                nome: 'Comunicação Telepática',
                                tipo: 'passiva',
                                custoAcoes: null,
                                custoMagia: 0,
                                cooldown: null,
                                efeito: { telepatia: true, alcance: 27 }
                            },
                            {
                                nome: 'Ler Mente',
                                tipo: 'ativa',
                                custoAcoes: null,
                                custoMagia: 0,
                                cooldown: null,
                                efeito: { lerMente: true, alcance: 18, chanceSucesso: 70, leituraProfundidade: 'superficial' }
                            }
                        ]
                    }
                },
                {
                    nome: "Precognição",
                    descricao: "Consegue ter vislumbres do futuro, gerando flashes de eventos que ainda estão por acontecer. O jogador pode escolher passar em um teste de habilidade, desviar de um ataque certeiro ou acertar um ataque uma vez por dia, pois ele já sabia que aquilo ia acontecer e como.",
                    efeitos: {
                        bonusDefesa: null,
                        bonusAtaque: null,
                        armasNaturais: null,
                        resistencias: null,
                        velocidadeExtra: null,
                        visaoNoEscuro: null,
                        habilidadesAtivas: [
                            {
                                nome: 'Vislumbre do Futuro',
                                tipo: 'ativa',
                                custoAcoes: 0, // livre (substitui resultado)
                                custoMagia: 0,
                                cooldown: '1x por dia',
                                efeito: {
                                    autoSucesso: true,
                                    opcoes: ['passar_teste_habilidade', 'desviar_ataque', 'acertar_ataque']
                                }
                            }
                        ]
                    }
                },
                {
                    nome: "Controle Mental",
                    descricao: "Capacidade de influenciar suavemente a mente dos outros, fazendo sugestões. O jogador ganha +2 em todos os rolamentos da aba social e uma vez por dia pode transformar esse bônus em um +10.",
                    efeitos: {
                        bonusDefesa: null,
                        bonusAtaque: null,
                        armasNaturais: null,
                        resistencias: null,
                        velocidadeExtra: null,
                        visaoNoEscuro: null,
                        bonusSocial: 2,
                        habilidadesAtivas: [
                            {
                                nome: 'Influência Avassaladora',
                                tipo: 'ativa',
                                custoAcoes: 0,
                                custoMagia: 0,
                                cooldown: '1x por dia',
                                efeito: { bonusSocialOverride: 10 }
                            }
                        ]
                    }
                }
            ]
        },
        {
            tipo: "Vampiro / Wight / Draugr",
            custo: 2,
            descricao: "Ao escolher ser um morto vivo, o personagem não pode ser curado por milagres. Escolha um dos seguintes poderes de mortos vivos para começar com (A habilidade Drenagem de Vida pode ser escolhido por qualquer tipo de morto vivo):",
            observacao: "Não pode ser curado por milagres.",
            flags: { semCuraMilagre: true },
            opcoes: [
                {
                    nome: "Drenagem de Vida",
                    descricao: "O personagem pode sugar a energia vital de outras criaturas para se fortalecer. O jogador pode escolher, como uma ação, realizar um ataque de combate corpo a corpo e sugar a vitalidade de um alvo, causando 1d8 de dano necrótico e o curando em 5 pontos, ou realizar uma versão mais fraca à distância, causando apenas 1d4 de dano necrótico e curando em 3, com alcance de 9m. Essa habilidade pode ser utilizada até 3 vezes por descanso longo.",
                    efeitos: {
                        bonusDefesa: null,
                        bonusAtaque: null,
                        armasNaturais: null,
                        resistencias: null,
                        velocidadeExtra: null,
                        visaoNoEscuro: null,
                        habilidadesAtivas: [
                            {
                                nome: 'Drenagem de Vida (Corpo a Corpo)',
                                tipo: 'ativa',
                                custoAcoes: 1,
                                custoMagia: 0,
                                cooldown: '3x por descanso longo (compartilhado)',
                                efeito: { dano: '1d8', tipoDano: 'necrotico', curaHP: 5, alcance: 1.5 }
                            },
                            {
                                nome: 'Drenagem de Vida (Distância)',
                                tipo: 'ativa',
                                custoAcoes: 1,
                                custoMagia: 0,
                                cooldown: '3x por descanso longo (compartilhado)',
                                efeito: { dano: '1d4', tipoDano: 'necrotico', curaHP: 3, alcance: 9 }
                            }
                        ]
                    }
                },
                {
                    nome: "Transformação Noturna",
                    descricao: "Ganha poderes especiais durante a noite, como aumento de força, velocidade ou poderes sombrios. Um personagem morto vivo recebe 1,5 de bônus de velocidade movimento a noite. Sua capacidade de carga aumenta, como se fosse um tamanho maior na tabela, durante a noite. O personagem consegue escalar paredes sem a necessidade de testes ou redução de velocidade e ganha +3 em testes de furtividade à noite.",
                    efeitos: {
                        bonusDefesa: null,
                        bonusAtaque: null,
                        armasNaturais: null,
                        resistencias: null,
                        velocidadeExtra: 1.5, // à noite
                        visaoNoEscuro: null,
                        condicao: 'noite',
                        habilidadesAtivas: [],
                        passivos: {
                            velocidadeBonusNoite: 1.5,
                            capacidadeCargaTamanhoMaior: true,
                            escalarSemTeste: true,
                            escalarSemReducaoVelocidade: true,
                            bonusFurtividadeNoite: 3
                        }
                    }
                },
                {
                    nome: "Hipnose",
                    descricao: "Hipnotiza suas vítimas com seu olhar ou voz, exercendo influência sobre elas. O personagem consegue utilizar as magias Hipnose e Voz de Comando uma vez cada por dia e sem custo de mana.",
                    efeitos: {
                        bonusDefesa: null,
                        bonusAtaque: null,
                        armasNaturais: null,
                        resistencias: null,
                        velocidadeExtra: null,
                        visaoNoEscuro: null,
                        habilidadesAtivas: [
                            {
                                nome: 'Hipnose (Vampírica)',
                                tipo: 'ativa',
                                custoAcoes: 3,
                                custoMagia: 0, // sem custo de mana
                                cooldown: '1x por dia',
                                efeito: { condicao: 'hipnotizado', chanceSucesso: 50, duracao: '1 hora' },
                                referencia: 'Encantamento Nível 3 (Iniciado)'
                            },
                            {
                                nome: 'Voz de Comando (Vampírica)',
                                tipo: 'ativa',
                                custoAcoes: 2,
                                custoMagia: 0, // sem custo de mana
                                cooldown: '1x por dia',
                                efeito: { condicao: 'comandado', chanceSucesso: 50, duracao: '1 comando' },
                                referencia: 'Encantamento Nível 1 (Iniciado)'
                            }
                        ]
                    }
                }
            ]
        },
        {
            tipo: "Mutante",
            custo: 2,
            descricao: "Uma criatura que sofreu de alguma forma uma exposição a um efeito que mudou permanentemente sua aparência e fisionomia é considerada um mutante. O mutante tem uma penalidade de -2 em todos os testes da aba social, exceto intimidação, sempre que que tiver a mutação visível. Todos sabem que o personagem possui mutações, a não ser que o personagem a mantenha contida dentro de roupas, máscaras e afins. Ao escolher ser um mutante é necessário escolher apenas uma das opções abaixo:",
            penalidade: "-2 em testes da aba social (exceto Intimidação) com mutação visível.",
            flags: { penalidadeSocial: -2, excecaoPenalidade: ['intimidacao'] },
            opcoes: [
                {
                    nome: "Pele Escamosa",
                    descricao: "A pele do personagem se torna grossa e escamosa, fornecendo uma defesa natural a cortes e arranhões. A base do valor de defesa para o personagem sem armadura é de 10 ao invés de 7.",
                    efeitos: {
                        bonusDefesa: null,
                        defesaBaseOverride: 10, // ao invés de 7
                        bonusAtaque: null,
                        armasNaturais: null,
                        resistencias: null,
                        velocidadeExtra: null,
                        visaoNoEscuro: null,
                        habilidadesAtivas: []
                    }
                },
                {
                    nome: "Olhos Multifacetados",
                    descricao: "Os olhos do personagem se multiplicam e adquirem uma aparência insectóide, concedendo visão ampliada e a capacidade de enxergar no escuro. Visão no escuro, e meia luz, com alcance de 27 metros e bônus de +2 em testes de percepção que envolvam visão. Além disso possui visão 360°",
                    efeitos: {
                        bonusDefesa: null,
                        bonusAtaque: null,
                        armasNaturais: null,
                        resistencias: null,
                        velocidadeExtra: null,
                        visaoNoEscuro: { alcance: 27, tipo: 'completa' },
                        bonusPercepcaoVisao: 2,
                        visao360: true,
                        habilidadesAtivas: []
                    }
                },
                {
                    nome: "Boca Abissal",
                    descricao: "A boca do personagem se expande, revelando uma mandíbula cheia de dentes afiados, permitindo ataques mordedores poderosos. Recebe uma arma natural com dano perfurante 4 + valor de força. Recebe +2 em testes de atletismo para agarrar um alvo com os dentes.",
                    efeitos: {
                        bonusDefesa: null,
                        bonusAtaque: null,
                        armasNaturais: [{ nome: 'Mordida Abissal', dano: '4+forca', tipoDano: 'perfurante' }],
                        resistencias: null,
                        velocidadeExtra: null,
                        visaoNoEscuro: null,
                        bonusAtletismoAgarrar: 2,
                        habilidadesAtivas: []
                    }
                },
                {
                    nome: "Membros Desproporcionais",
                    descricao: "Os membros do personagem se alongam ou encurtam, concedendo versatilidade. Aumentam o alcance de ameaça em 1,5 metros ou reduz a criatura em um tamanho na escala, com um mínimo de minúsculo.",
                    efeitos: {
                        bonusDefesa: null,
                        bonusAtaque: null,
                        armasNaturais: null,
                        resistencias: null,
                        velocidadeExtra: null,
                        visaoNoEscuro: null,
                        escolhaObrigatoria: [
                            { opcao: 'alcanceAmeacaExtra', valor: 1.5 },
                            { opcao: 'tamanhoMenor', valor: -1, minimo: 'minusculo' }
                        ],
                        habilidadesAtivas: []
                    }
                },
                {
                    nome: "Cauda Serpentina",
                    descricao: "Uma cauda serpentina cresce na parte inferior do corpo do personagem, permitindo uma maior capacidade de equilíbrio e agilidade em movimentos. O personagem ganha um bônus de +5 em testes de acrobacia para se equilibrar e consegue usar sua cauda para se segurar em beiradas, galhos e outros que possam ser enrolados por ela, deixando assim suas mãos livres. A cauda pode ser usada para segurar objetos mas não realizar ataques ou defender de ataques.",
                    efeitos: {
                        bonusDefesa: null,
                        bonusAtaque: null,
                        armasNaturais: null,
                        resistencias: null,
                        velocidadeExtra: null,
                        visaoNoEscuro: null,
                        bonusAcrobaciaEquilibrio: 5,
                        segurarComCauda: true,
                        caudaAtaqueProibido: true,
                        habilidadesAtivas: []
                    }
                },
                {
                    nome: "Garras Retráteis",
                    descricao: "O personagem desenvolve garras afiadas em suas mãos ou pés, fornecendo ataques mais letais e a habilidade de escalar superfícies verticais. Recebe uma arma natural com dano cortante 3 + valor de destreza. O personagem tem a capacidade de escalar superfícies verticais sem custo extra de movimento e sem necessidade de ferramentas extras.",
                    efeitos: {
                        bonusDefesa: null,
                        bonusAtaque: null,
                        armasNaturais: [{ nome: 'Garras Retráteis', dano: '3+destreza', tipoDano: 'cortante' }],
                        resistencias: null,
                        velocidadeExtra: null,
                        visaoNoEscuro: null,
                        escalarSemCustoExtra: true,
                        escalarSemFerramentas: true,
                        habilidadesAtivas: []
                    }
                },
                {
                    nome: "Chifres Torcidos",
                    descricao: "Chifres retorcidos e sinuosos crescem na cabeça do personagem, conferindo maior resistência física e a capacidade de empurrar objetos pesados. O personagem recebe +2 em testes de atletismo para se manter em pé ou derrubar um alvo. Recebe uma arma natural com dano de impacto 3 + valor de força.",
                    efeitos: {
                        bonusDefesa: null,
                        bonusAtaque: null,
                        armasNaturais: [{ nome: 'Chifrada', dano: '3+forca', tipoDano: 'impacto' }],
                        resistencias: null,
                        velocidadeExtra: null,
                        visaoNoEscuro: null,
                        bonusAtletismoManterPe: 2,
                        bonusAtletismoDerrubar: 2,
                        habilidadesAtivas: []
                    }
                },
                {
                    nome: "Exoesqueleto Ósseo",
                    descricao: "O corpo do personagem é envolvido por um exoesqueleto ósseo, tornando-o mais resistente a cortes. Se torna resistente ao dano cortante, porém se torna vulnerável ao dano de impacto. O exoesqueleto também aumenta a base do valor de defesa de 7 para 10.",
                    efeitos: {
                        bonusDefesa: null,
                        defesaBaseOverride: 10,
                        bonusAtaque: null,
                        armasNaturais: null,
                        resistencias: ['cortante'],
                        vulnerabilidades: ['impacto'],
                        velocidadeExtra: null,
                        visaoNoEscuro: null,
                        habilidadesAtivas: []
                    }
                },
                {
                    nome: "Pernas de Aranha",
                    descricao: "O personagem desenvolve pernas extras semelhantes às de uma aranha, permitindo maior mobilidade e a habilidade de escalar paredes. Pode escalar sem gastar movimento extra e ganha um bônus de 1.5 metros no valor de velocidade. Ganha um bônus de +5 em testes de atletismo para agarrar e para não ser derrubado.",
                    efeitos: {
                        bonusDefesa: null,
                        bonusAtaque: null,
                        armasNaturais: null,
                        resistencias: null,
                        velocidadeExtra: 1.5,
                        visaoNoEscuro: null,
                        escalarSemCustoExtra: true,
                        bonusAtletismoAgarrar: 5,
                        bonusAtletismoNaoSerDerrubado: 5,
                        habilidadesAtivas: []
                    }
                },
                {
                    nome: "Braços Tentaculares",
                    descricao: "Braços adicionais em forma de tentáculos crescem no corpo do personagem, fornecendo uma vantagem de alcance em combate e a habilidade de agarrar objetos a distância. Recebe 1.5 metros a mais em seu alcance de ameaça e +2 em testes de atletismo para agarrar outra criatura.",
                    efeitos: {
                        bonusDefesa: null,
                        bonusAtaque: null,
                        armasNaturais: null,
                        resistencias: null,
                        velocidadeExtra: null,
                        visaoNoEscuro: null,
                        alcanceAmeacaExtra: 1.5,
                        bonusAtletismoAgarrar: 2,
                        habilidadesAtivas: []
                    }
                }
            ]
        }
    ]
};

// ============================================================================
// CLASSES PRIMÁRIAS (Nível 3+)
// ============================================================================

/**
 * Pré-requisito para classes primárias:
 *   - Ter a regalia de aprendiz correspondente
 *   - Nível de personagem 3+
 *
 * Pré-requisito para especializações:
 *   - 10 regalias na(s) classe(s) primária(s) requerida(s)
 */

export const classesPrimarias = [
    // ==========================================================================
    // COMBATENTE PRIMÁRIO
    // ==========================================================================
    {
        id: 'combatente_primario',
        nome: 'Combatente',
        tipo: 'classe_primaria',
        preRequisitos: { regaliaAprendiz: 'combatente', nivelMinimo: 3 },
        bonusPorRegalia: { pv: 4, estamina: 2, magia: 0 },
        habilidadeClasse: {
            nome: 'Implacável',
            descricao: 'Habilidades automáticas ao entrar na classe.',
            subHabilidades: [
                {
                    nome: 'Meditação de Combate',
                    descricao: 'Pode usar Recuperar Fôlego 1x/dia sem custo de magia, custando apenas 1 ação.',
                    tipo: 'ativa',
                    custoAcoes: 1,
                    custoMagia: 0,
                    cooldown: '1x por dia'
                },
                {
                    nome: 'Novo Fôlego',
                    descricao: 'Ao usar Meditação de Combate, remove todas as penalidades de ataque acumuladas nesta rodada.',
                    tipo: 'passiva'
                },
                {
                    nome: 'Ataque Fortalecido',
                    descricao: 'Se acertar um ataque após Meditação de Combate, ganha bônus de dano igual ao valor de Fortitude.',
                    tipo: 'passiva',
                    efeito: { bonusDano: 'fortitude' }
                },
                {
                    nome: 'Embalado',
                    descricao: 'Se usar Meditação e via Ataque Fortalecido reduzir uma criatura a 0 PV, recebe +2 ações no próximo turno.',
                    tipo: 'passiva',
                    efeito: { acoesExtras: 2 }
                }
            ]
        },
        arvoresRegalia: [
            {
                id: 'combate_direto',
                nome: 'Combate Direto',
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { combateCorpoACorpo: 1 },
                        escolhasHabilidades: [{ grupo: ['destreza', 'forca'], pontos: 1 }]
                    },
                    {
                        nivel: 2, custo: 1,
                        bonusHabilidades: { combateCorpoACorpo: 2 },
                        escolhasHabilidades: [{ grupo: ['destreza', 'forca'], pontos: 1 }]
                    },
                    {
                        nivel: 3, custo: 1,
                        bonusHabilidades: { combateCorpoACorpo: 1 },
                        escolhasHabilidades: [{ grupo: ['destreza', 'forca'], pontos: 1 }],
                        habilidadeGanha: {
                            nome: 'Guarda de Duelo',
                            descricao: 'Ação livre: vantagem em ataques e +1 Defesa se apenas 1 inimigo corpo a corpo. Custa 3 Estâmina. Dura até o fim do turno.',
                            tipo: 'ativa',
                            custoAcoes: 0, // ação livre
                            custoEstamina: 3,
                            duracao: 'fim do turno',
                            efeito: { vantagemAtaques: true, bonusDefesa: 1 },
                            condicao: 'apenas 1 inimigo no alcance corpo a corpo'
                        }
                    }
                ]
            },
            {
                id: 'combate_distancia',
                nome: 'Combate a Distância',
                niveis: [
                    { nivel: 1, custo: 1, bonusHabilidades: { combateADistancia: 1, destreza: 1 } },
                    { nivel: 2, custo: 1, bonusHabilidades: { combateADistancia: 2, destreza: 1 } },
                    {
                        nivel: 3, custo: 1,
                        bonusHabilidades: { combateADistancia: 3, destreza: 1 },
                        habilidadeGanha: {
                            nome: 'Desarmar',
                            descricao: 'Ataque a distância pode desarmar o alvo (40%). Arma cai a 3m. Custa 4 Estâmina, +5%/Estâmina extra.',
                            tipo: 'ativa',
                            custoAcoes: null, // parte do ataque
                            custoEstamina: 4,
                            efeito: { chanceSucesso: 40, desarmarAlvo: true, armaDistancia: 3 },
                            escalamento: { bonusChancePorEstaminaExtra: 5 }
                        }
                    }
                ]
            },
            {
                id: 'combate_emboscada',
                nome: 'Combate de Emboscada',
                niveis: [
                    { nivel: 1, custo: 1, bonusHabilidades: { agilidade: 1, percepcao: 1, furtividade: 1 } },
                    {
                        nivel: 2, custo: 1,
                        bonusHabilidades: { agilidade: 1, percepcao: 1, furtividade: 1 },
                        passivos: { vantagemAtaqueFlanqueando: true }
                    },
                    {
                        nivel: 3, custo: 1,
                        bonusHabilidades: { agilidade: 1, percepcao: 1, furtividade: 1 },
                        habilidadeGanha: {
                            nome: 'Ponto Fraco',
                            descricao: '+1d6 dano extra no primeiro ataque ao flanquear. +1d6 por cada 2 Estâmina extras.',
                            tipo: 'passiva',
                            efeito: { danoExtraFlanqueando: '1d6', apenasFirstAtaquePorAcao: true },
                            escalamento: { custoEstaminaPorD6Extra: 2 }
                        }
                    }
                ]
            },
            {
                id: 'combate_defensivo',
                nome: 'Combate Defensivo',
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { fortitude: 1, agilidade: 1 },
                        proficienciasGanhas: ['armaduras_pesadas']
                    },
                    {
                        nivel: 2, custo: 1,
                        bonusHabilidades: { fortitude: 1, agilidade: 1 },
                        passivos: { bonusDefesaArmaduraMediaPesadaEscudo: 1 }
                    },
                    {
                        nivel: 3, custo: 1,
                        bonusHabilidades: { fortitude: 1, agilidade: 1 },
                        habilidadeGanha: {
                            nome: 'Guarda-Costas',
                            descricao: 'Reação: protege aliado a 1,5m de ataque. Bloqueia ou reduz dano à metade. Custa 3 Estâmina, +1 para repetir.',
                            tipo: 'reacao',
                            custoEstamina: 3,
                            efeito: { protegerAliado: true, alcance: 1.5, reducaoDano: 'metade' },
                            escalamento: { custoEstaminaRepetirMesmoTurno: 1 }
                        }
                    }
                ]
            },
            {
                id: 'combate_haste',
                nome: 'Combate com Arma de Haste',
                niveis: [
                    { nivel: 1, custo: 1, bonusHabilidades: { combateCorpoACorpo: 1, forca: 1 } },
                    { nivel: 2, custo: 1, bonusHabilidades: { combateCorpoACorpo: 2, forca: 1 } },
                    {
                        nivel: 3, custo: 1,
                        bonusHabilidades: { combateCorpoACorpo: 1, forca: 1 },
                        habilidadeGanha: {
                            nome: 'Estocada',
                            descricao: 'Com arma de haste, estende alcance em 1,5m na ação atacar. Custa 2 Estâmina.',
                            tipo: 'ativa',
                            custoEstamina: 2,
                            efeito: { alcanceExtra: 1.5, requerArmaHaste: true }
                        }
                    }
                ]
            },
            {
                id: 'combate_desarmado',
                nome: 'Combate Desarmado',
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        escolhasHabilidades: [
                            { grupo: ['combateCorpoACorpo'], pontos: 1 },
                            { grupo: ['forca', 'destreza'], pontos: 1 }
                        ],
                        passivos: { combateDesarmadoTreinado: true, danoDesarmado: '1d6', tipoDanoDesarmado: 'impacto' },
                        escolhaDanoDesarmado: ['destreza', 'forca']
                    },
                    {
                        nivel: 2, custo: 1,
                        bonusHabilidades: { combateCorpoACorpo: 2 },
                        escolhasHabilidades: [{ grupo: ['forca', 'destreza'], pontos: 1 }]
                    },
                    {
                        nivel: 3, custo: 1,
                        bonusHabilidades: { combateCorpoACorpo: 1 },
                        escolhasHabilidades: [{ grupo: ['forca', 'destreza'], pontos: 1 }],
                        habilidadeGanha: {
                            nome: 'Derrubar ou Agarrar',
                            descricao: 'Ataque desarmado: derruba ou agarra o alvo (50% de chance). Custa 4 Estâmina.',
                            tipo: 'ativa',
                            custoEstamina: 4,
                            efeito: { escolha: ['derrubar', 'agarrar'], chanceSucesso: 50 }
                        }
                    }
                ]
            }
        ],
        regaliasAvulsas: [
            {
                id: 'combate_armas_improvisadas',
                nome: 'Combate com Armas Improvisadas',
                custo: 1,
                descricao: 'Pode usar objetos resistentes como armas improvisadas.',
                efeito: { armasImprovisadas: true }
            },
            {
                id: 'combate_duas_armas',
                nome: 'Combate com Duas Armas',
                custo: 2,
                descricao: 'Pode atacar uma segunda vez com arma secundária na ação de Ataque. Ambas devem ser de uma mão, a secundária deve ser leve.',
                custoEstamina: 1, // por rodada
                efeito: { duasArmas: true, semPenalidadeConsecutiva: true }
            },
            {
                id: 'combate_acuidade',
                nome: 'Combate com Arma de Acuidade',
                custo: 1,
                descricao: 'Pode usar Destreza para dano corpo a corpo com armas com propriedade acuidade. Se tiver Ponto Fraco com arma acuidade: +1d6 dano extra.',
                efeito: { usarDestrezaParaDano: true, sinergiasPontoFraco: { danoExtra: '1d6' } }
            },
            {
                id: 'recuperar_folego_melhorado',
                nome: 'Recuperar Fôlego Melhorado',
                custo: 1,
                descricao: 'Recupera 3d4 PV. Custa 2 Magia. Por +2 Magia, recupera também 2d4 Estamina.',
                tipo: 'ativa',
                custoAcoes: 3, // turno completo
                custoMagia: 2,
                efeito: { curaHP: '3d4' },
                efeitoOpcional: { custoMagiaExtra: 2, curaEstamina: '2d4' }
            },
            {
                id: 'golpe_explosivo',
                nome: 'Golpe Explosivo',
                custo: 1,
                descricao: 'Na ação de ataque, causa +1d6 de dano adicional.',
                custoEstamina: 2,
                efeito: { danoExtra: '1d6' }
            },
            {
                id: 'levantar_escudo',
                nome: 'Levantar Escudo',
                custo: 1,
                descricao: 'Ergue escudo (não broquel) como reação. Todos os ataques contra o personagem têm desvantagem até o início do próximo turno.',
                tipo: 'reacao',
                custoEstamina: 2,
                efeito: { desvantagemAtaquesContra: true, duracao: 'até início do próximo turno' },
                restricao: 'Não funciona com broquel'
            },
            {
                id: 'recarga_oportuna',
                nome: 'Recarga Oportuna',
                custo: 1,
                descricao: 'Recarrega uma arma de recarga enquanto usa uma ação de movimento.',
                custoEstamina: 1,
                efeito: { recarregarDuranteMovimento: true }
            }
        ]
    },

    // ==========================================================================
    // NOVIÇO PRIMÁRIO
    // ==========================================================================
    {
        id: 'novico_primario',
        nome: 'Noviço(a)',
        tipo: 'classe_primaria',
        preRequisitos: { regaliaAprendiz: 'novico', nivelMinimo: 3 },
        bonusPorRegalia: { pv: 2, estamina: 0, magia: 4 },
        habilidadeClasse: {
            nome: 'Anticorrupção + Servitude',
            subHabilidades: [
                {
                    nome: 'Anticorrupção',
                    descricao: 'Cura em mortos-vivos/demônios causa dano sagrado. 1x por combate sem custo de magia. Todos os milagres causam dano sagrado.',
                    tipo: 'passiva'
                },
                {
                    nome: 'Servitude (Deus Bom)',
                    descricao: '2x/dia, cura uma criatura (não a si) por 2d6 PV. Pode ser feito em combate junto com outra ação não-dano. Aumenta para 3d6 no nível 7.',
                    tipo: 'ativa',
                    cooldown: '2x por dia',
                    efeito: { curaHP: '2d6', curaHPNivel7: '3d6', excluiAutoAlvo: true }
                },
                {
                    nome: 'Servitude (Deus Mal)',
                    descricao: '1x/dia, sacrifica animal/ser vivo para recuperar 8 Magia (oração 10 min). Ou cura 1d12 PV após matar. Nível 7: 12 PV fixo e 3d6.',
                    tipo: 'ativa',
                    cooldown: '1x por dia',
                    efeito: { recuperarMagia: 8, alternativa: { curaHP: '1d12', condicao: 'após matar criatura' } }
                },
                {
                    nome: 'Servitude (Deus Neutro)',
                    descricao: '3x/dia, oração (2 ações em combate) recuperando 1d6+1 PV e Magia. Aumenta para 2d6+2 no nível 7.',
                    tipo: 'ativa',
                    custoAcoes: 2,
                    cooldown: '3x por dia',
                    efeito: { curaHP: '1d6+1', recuperarMagia: '1d6+1', nivel7: { curaHP: '2d6+2', recuperarMagia: '2d6+2' } }
                }
            ]
        },
        arvoresRegalia: [
            {
                id: 'oracao_luz',
                nome: 'Oração de Luz',
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { medicina: 3, teologia: 3, intuicao: 3 },
                        habilidadeGanha: {
                            nome: 'Cura',
                            descricao: 'Cura 1d6+2 PV a até 1,5m. Custa 2 Magia. +1d6 por 2 Magia extras.',
                            tipo: 'milagre',
                            custoAcoes: 2,
                            custoMagia: 2,
                            alcance: 1.5,
                            efeito: { curaHP: '1d6+2' },
                            escalamento: { bonusCuraPor2Magia: '1d6' }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        habilidadeGanha: {
                            nome: 'Abençoar',
                            descricao: '+1,5m movimento e vantagem em ataques por 5 rodadas. Custa 6 Magia. +1 alvo/3 Magia.',
                            tipo: 'milagre',
                            custoAcoes: 2,
                            custoMagia: 6,
                            duracao: '5 rodadas',
                            efeito: { velocidadeExtra: 1.5, vantagemAtaques: true },
                            escalamento: { alvosExtraPor3Magia: 1 }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Ataque Guiado',
                            descricao: 'Reação: dá vantagem no ataque de criatura a até 18m. 4x/dia.',
                            tipo: 'reacao',
                            custoMagia: 0,
                            alcance: 18,
                            cooldown: '4x por dia',
                            efeito: { vantagemAtaqueAliado: true }
                        }
                    }
                ]
            },
            {
                id: 'oracao_banimento',
                nome: 'Oração de Banimento',
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { ocultismo: 3, combateArcano: 3 },
                        habilidadeGanha: {
                            nome: 'Marca Divina',
                            descricao: 'Marca a até 18m: 1d8 sagrado por 10 rodadas (1 ação/turno). Custa 5 Magia.',
                            tipo: 'milagre',
                            custoAcoes: 2,
                            custoMagia: 5,
                            alcance: 18,
                            duracao: '10 rodadas',
                            efeito: { dano: '1d8', tipoDano: 'sagrado' }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        habilidadeGanha: {
                            nome: 'Chama Sagrada',
                            descricao: '1d6 dano sagrado. Custa 1 Magia. +1d8/2 Magia extras.',
                            tipo: 'milagre',
                            custoAcoes: 1,
                            custoMagia: 1,
                            efeito: { dano: '1d6', tipoDano: 'sagrado' },
                            escalamento: { bonusDanoPor2Magia: '1d8' }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Fonte Divina',
                            descricao: 'Mortos-vivos e demônios a até 12m fogem (80%). 2x/dia ou 10 Magia.',
                            tipo: 'milagre',
                            custoAcoes: 2,
                            alcance: 12,
                            cooldown: '2x por dia (depois 10 Magia)',
                            efeito: { forcarFuga: true, chanceSucesso: 80, alvosMortosVivosDemonios: true }
                        }
                    }
                ]
            },
            {
                id: 'oracao_protecao',
                nome: 'Oração de Proteção',
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { fortitude: 2, percepcao: 2 },
                        habilidadeGanha: {
                            nome: 'Santuário',
                            descricao: '+2 Defesa por 1 rodada. Custa 4 Magia. +1 rodada/2 Magia extras.',
                            tipo: 'milagre',
                            custoAcoes: 1,
                            custoMagia: 4,
                            duracao: '1 rodada',
                            efeito: { bonusDefesa: 2 },
                            escalamento: { rodadasExtraPor2Magia: 1 }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        habilidadeGanha: {
                            nome: 'Farol',
                            descricao: 'Luz que cega não-aliados a até 27m até fim do próximo turno. Custa 8 Magia.',
                            tipo: 'milagre',
                            custoAcoes: 2,
                            custoMagia: 8,
                            alcance: 27,
                            efeito: { cegarNaoAliados: true, duracao: 'até fim do turno seguinte do alvo' }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Restauração',
                            descricao: 'Remove Envenenado, Congelado, Queimando ou Cansado (1 nível). 4x/dia.',
                            tipo: 'milagre',
                            custoAcoes: 2,
                            cooldown: '4x por dia',
                            efeito: { removerCondicao: ['envenenado', 'congelando', 'queimando', 'cansado'] }
                        }
                    }
                ]
            },
            {
                id: 'oracao_preservacao',
                nome: 'Oração de Preservação',
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { medicina: 3, teologia: 3, intuicao: 3 },
                        habilidadeGanha: {
                            nome: 'Estabilizar',
                            descricao: 'Estabiliza criatura À Beira da Morte (falhas necessárias: 10). 4x/dia.',
                            tipo: 'milagre',
                            custoAcoes: 1,
                            cooldown: '4x por dia',
                            efeito: { estabilizar: true, falhasParaMorrerExtendidas: 10 }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        habilidadeGanha: {
                            nome: 'Resistência',
                            descricao: 'Reação: alvo sofre metade do dano de um ataque ou efeito. Custa 3 Magia.',
                            tipo: 'reacao',
                            custoMagia: 3,
                            efeito: { reducaoDano: 'metade', alvos: 1 }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Lente Investigativa',
                            descricao: 'Quem mente a até 3m sofre 1d4 dano e fala cortada. 10min. 4x/dia.',
                            tipo: 'milagre',
                            custoAcoes: 1,
                            cooldown: '4x por dia',
                            duracao: '10 minutos',
                            alcance: 3,
                            efeito: { detectarMentira: true, danoPorMentira: '1d4' }
                        }
                    }
                ]
            }
        ],
        regaliasAvulsas: [
            {
                id: 'novico_combate',
                nome: 'Noviço(a) de Combate',
                custo: 1,
                proficienciasGanhas: ['armaduras_leves', 'armaduras_medias', 'escudo_simples'],
                efeito: { bonusPVMax: 5 }
            },
            {
                id: 'intervencao',
                nome: 'Intervenção',
                custo: 2,
                tipo: 'reacao',
                custoMagia: 3,
                descricao: 'Oração para forçar re-rolagem de d20. Noviço escolhe resultado antigo ou novo.',
                efeito: { reRolagemD20: true, escolherResultado: true }
            },
            {
                id: 'abencoar_arma',
                nome: 'Abençoar Arma',
                custo: 1,
                tipo: 'ativa',
                custoAcoes: 1,
                custoMagia: 1,
                duracao: '10 rodadas',
                efeito: { danoArma: 'sagrado' },
                restricao: 'Uma arma por vez'
            },
            {
                id: 'esfera_divina',
                nome: 'Esfera Divina',
                custo: 1,
                tipo: 'ativa',
                custoAcoes: 1,
                custoMagia: 2, // por esfera
                duracao: '1 hora',
                efeito: {
                    maxEsferas: 3,
                    luzRaio: 3,
                    protecaoControleMental: { reducaoChancePorEsfera: 10 }
                },
                escalamento: { custoMagiaPorEsferaExtra: 2 }
            },
            {
                id: 'martirio',
                nome: 'Martírio',
                custo: 1,
                tipo: 'ativa',
                custoAcoes: 2,
                cooldown: '1x por descanso curto',
                efeito: { converterHPParaMagia: true, razao: '1:1', maximo: 5 }
            },
            {
                id: 'dividir_dor',
                nome: 'Dividir a Dor',
                custo: 1,
                tipo: 'reacao',
                descricao: 'Quando vê criatura restringida/paralisada/atordoada/incapacitada sofrer ataque, absorve parte do dano.',
                efeito: { absorverDanoParcial: true, condicoes: ['restringido', 'paralisado', 'atordoado', 'incapacitado'] }
            }
        ]
    },

    // ==========================================================================
    // INICIADO PRIMÁRIO
    // ==========================================================================
    {
        id: 'iniciado_primario',
        nome: 'Iniciado(a)',
        tipo: 'classe_primaria',
        preRequisitos: { regaliaAprendiz: 'iniciado', nivelMinimo: 3 },
        bonusPorRegalia: { pv: 2, estamina: 0, magia: 4 },
        habilidadeClasse: {
            nome: 'Magus',
            descricao: 'Pode lançar magias de Aprendiz de Iniciado sem custo de magia um número de vezes igual ao valor de Arcanismo. Recupera após descanso longo. Todas as magias causam dano arcano.',
            efeito: { castSemMana: 'arcanismo', tiposDano: 'arcano', recuperacao: 'descanso_longo' }
        },
        arvoresRegalia: [
            {
                id: 'evocacao',
                nome: 'Evocação',
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { combateArcano: 1, arcanismo: 2 },
                        habilidadeGanha: {
                            nome: 'Cone Arcano',
                            descricao: 'Cone 6m/60°: 2d8 arcano + devagar. Custa 6 Magia. +1d8/3 Magia.',
                            tipo: 'magia',
                            custoAcoes: 2, custoMagia: 6,
                            area: { tipo: 'cone', distancia: 6, angulo: 60 },
                            efeito: { dano: '2d8', tipoDano: 'arcano', condicao: 'devagar' },
                            escalamento: { bonusDanoPor3Magia: '1d8' }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        habilidadeGanha: {
                            nome: 'Esfera Arcana',
                            descricao: 'Esfera 3m raio: 3d10 arcano + queimando. Custa 10 Magia. +1d10/3 Magia.',
                            tipo: 'magia',
                            custoAcoes: 2, custoMagia: 10,
                            area: { tipo: 'esfera', raio: 3 },
                            efeito: { dano: '3d10', tipoDano: 'arcano', condicao: 'queimando_ou_mais1' },
                            escalamento: { bonusDanoPor3Magia: '1d10' }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Raio Arcano',
                            descricao: 'Linha 36m×3m: 3d10 arcano. Custa 10 Magia. +1d10/3 Magia.',
                            tipo: 'magia',
                            custoAcoes: 2, custoMagia: 10,
                            area: { tipo: 'linha', distancia: 36, largura: 3 },
                            efeito: { dano: '3d10', tipoDano: 'arcano' },
                            escalamento: { bonusDanoPor3Magia: '1d10' }
                        }
                    }
                ]
            },
            {
                id: 'abjuracao',
                nome: 'Abjuração',
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { agilidade: 1, fortitude: 2 },
                        habilidadeGanha: {
                            nome: 'Armadura Arcana',
                            descricao: '+2 PV temp. e +2 Defesa por 1h. Custa 2 Magia. +2PV/+1Def por 2 Magia.',
                            tipo: 'magia',
                            custoAcoes: 1, custoMagia: 2,
                            duracao: '1 hora',
                            efeito: { pvTemporario: 2, bonusDefesa: 2 },
                            escalamento: { por2Magia: { pvTemporario: 2, bonusDefesa: 1 } }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        habilidadeGanha: {
                            nome: 'Defesa contra Armas',
                            descricao: 'Resistência a dano de armas mágicas, não-mágicas e elementais por 2 rodadas. Custa 2 Magia.',
                            tipo: 'magia',
                            custoAcoes: 1, custoMagia: 2,
                            duracao: '2 rodadas',
                            efeito: { resistencias: ['magico', 'nao_magico', 'elemental'] }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Refletir',
                            descricao: 'Reação: reflete dano mágico (d100: <40=¼, >40=½, 100=total). Dano vira PV temp. Custa 4 Magia.',
                            tipo: 'reacao',
                            custoMagia: 4,
                            alcance: 30,
                            efeito: {
                                refletirDanoMagico: true,
                                tabelaReflexao: { abaixo40: 0.25, acima40: 0.5, critico100: 1.0 },
                                danoRefletidoViraPVTemporario: true
                            }
                        }
                    }
                ]
            },
            {
                id: 'encantamento',
                nome: 'Encantamento',
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { persuasao: 2, seducao: 2 },
                        habilidadeGanha: {
                            nome: 'Voz de Comando',
                            descricao: '50%: alvo obedece comando de 1 palavra sem dano/perigo. Custa 4 Magia. +5%/Magia.',
                            tipo: 'magia',
                            custoAcoes: 2, custoMagia: 4,
                            efeito: { chanceSucesso: 50, comandoUmaPalavra: true, semDanoExtremo: true },
                            escalamento: { bonusChancePorMagiaExtra: 5 }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        habilidadeGanha: {
                            nome: 'Controlar Animal',
                            descricao: '60%: animal coopera por 1 hora. Custa 6 Magia. +5%/Magia.',
                            tipo: 'magia',
                            custoAcoes: 2, custoMagia: 6,
                            duracao: '1 hora',
                            efeito: { chanceSucesso: 60, controlarAnimal: true },
                            escalamento: { bonusChancePorMagiaExtra: 5 }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Hipnose',
                            descricao: '50%: alvo coopera como amigo por 1 hora. Custa 8 Magia. +5%/Magia.',
                            tipo: 'magia',
                            custoAcoes: 3, custoMagia: 8,
                            duracao: '1 hora',
                            efeito: { chanceSucesso: 50, hipnotizar: true },
                            escalamento: { bonusChancePorMagiaExtra: 5 }
                        }
                    }
                ]
            },
            {
                id: 'ilusao',
                nome: 'Ilusão',
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { arcanismo: 1, enganacao: 2, performance: 2 },
                        habilidadeGanha: {
                            nome: 'Disfarce Arcano',
                            descricao: 'Aparência de humanoide por 2h. Tátil. Brilha em Detectar Magia. Custa 4 Magia.',
                            tipo: 'magia',
                            custoAcoes: 3, custoMagia: 4,
                            duracao: '2 horas',
                            efeito: { disfarce: true, tamanhoIgual: true, tatil: true }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        habilidadeGanha: {
                            nome: 'Gerar Imagens',
                            descricao: 'Imagem animada com sons rudimentares em cubo 6m por 10min. Custa 6 Magia.',
                            tipo: 'magia',
                            custoAcoes: 2, custoMagia: 6,
                            duracao: '10 minutos',
                            efeito: { criarImagem: true, tamanhoMax: '6m cubo', sons: 'rudimentares' }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Ataque Fantasma',
                            descricao: '60%: Aterrorizado por 5 rodadas; se persistir, Atordoado. Custa 10 Magia. +5%/Magia.',
                            tipo: 'magia',
                            custoMagia: 10,
                            efeito: {
                                chanceSucesso: 60,
                                condicao: 'aterrorizado',
                                duracao: '5 rodadas',
                                seAindaAterrorizadoApos5: { condicao: 'atordoado', duracao: 'fim do próximo turno' }
                            },
                            escalamento: { bonusChancePorMagiaExtra: 5 }
                        }
                    }
                ]
            },
            {
                id: 'telecinese_escola',
                nome: 'Telecinese',
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { combateArcano: 1, intuicao: 2 },
                        habilidadeGanha: {
                            nome: 'Mover Objeto',
                            descricao: 'Move objeto até 3kg pelo ar por 1min. Sem ataques. Custa 1 Magia. +4/min.',
                            tipo: 'magia',
                            custoMagia: 1,
                            duracao: '1 minuto',
                            efeito: { moverObjeto: true, pesoMax: 3, semAtaques: true },
                            escalamento: { custoMagiaPorMinutoExtra: 4 }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        habilidadeGanha: {
                            nome: 'Ruptura Mental',
                            descricao: '50%: 2d10 dano + surdez. Custa 8 Magia. +5%/Magia.',
                            tipo: 'magia',
                            custoAcoes: 2, custoMagia: 8,
                            efeito: { chanceSucesso: 50, dano: '2d10', condicao: 'surdo' },
                            escalamento: { bonusChancePorMagiaExtra: 5 }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Psicose Súbita',
                            descricao: '50%: Paralisado e depois Aterrorizado por 2 rodadas. Custa 8 Magia. +5%/Magia.',
                            tipo: 'magia',
                            custoAcoes: 1, custoMagia: 8,
                            efeito: {
                                chanceSucesso: 50,
                                faseParalisia: { condicao: 'paralisado', duracao: 'até inicio do próximo turno do conjurador' },
                                faseAterrorizado: { condicao: 'aterrorizado', duracao: '2 rodadas' }
                            },
                            escalamento: { bonusChancePorMagiaExtra: 5 }
                        }
                    }
                ]
            },
            {
                id: 'invocacao',
                nome: 'Invocação',
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { combateArcano: 1, ritualismo: 2 },
                        habilidadeGanha: {
                            nome: 'Disco de Carga',
                            descricao: 'Disco energia (3m raio, 200kg). Move por ação até 18m. 1h. Custa 2 Magia.',
                            tipo: 'magia',
                            custoAcoes: 2, custoMagia: 2,
                            duracao: '1 hora',
                            efeito: { discoEnergia: true, raio: 3, capacidade: 200, moverComoAcao: 18 }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        habilidadeGanha: {
                            nome: 'Névoa de Combate',
                            descricao: 'Cubo 3m: obscurecido mas vê fora. 2 turnos. Custa 3 Magia. +6 Magia/turno.',
                            tipo: 'magia',
                            custoAcoes: 2, custoMagia: 3,
                            duracao: '2 turnos',
                            efeito: { nevoaCubo: 3, obscurecidoDentro: true, verForaNormalmente: true },
                            escalamento: { custoMagiaPorTurnoExtra: 6 }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Arma Arcana',
                            descricao: 'Arma arcana: 2d10+Arcanismo dano, usa Combate Arcano. 5 turnos. Custa 10 Magia.',
                            tipo: 'magia',
                            custoAcoes: 1, custoMagia: 10,
                            duracao: '5 turnos',
                            efeito: { invocarArma: true, dano: '2d10+arcanismo', tipoDano: 'arcano', usaCombateArcano: true },
                            escalamento: { custoMagiaSegundaArma: 8 }
                        }
                    }
                ]
            },
            {
                id: 'transmutacao',
                nome: 'Transmutação',
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { tecnologia: 1, arcanatec: 3, natureza: 2 },
                        habilidadeGanha: {
                            nome: 'Destrancar Fechadura',
                            descricao: 'Abre fechadura com som alto. Destruída após uso. Custa 5 Magia.',
                            tipo: 'magia',
                            custoAcoes: 2, custoMagia: 5,
                            efeito: { destrancar: true, somAlto: true, fechaduraDestruida: true }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        habilidadeGanha: {
                            nome: 'Mudar Temperatura',
                            descricao: 'Muda temp. de objeto (até 1,5m³). 80% Congelando/Queimando. 5 rodadas. Custa 4 Magia.',
                            tipo: 'magia',
                            custoAcoes: 2, custoMagia: 4,
                            duracao: '5 rodadas',
                            efeito: {
                                chanceCondicao: 80,
                                condicoes: ['congelando', 'queimando'],
                                volumeMax: '1.5m³',
                                superficieMax: '9m²'
                            }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Prisão Arcana',
                            descricao: '40%: Restringido em 3m raio a 9m de alcance. Custa 10 Magia. +5% e duração/Magia.',
                            tipo: 'magia',
                            custoAcoes: 2, custoMagia: 10,
                            alcance: 9,
                            area: { tipo: 'esfera', raio: 3 },
                            efeito: { chanceSucesso: 40, condicao: 'restringido', duracao: 'fim do próximo turno do alvo' },
                            escalamento: { bonusChanceEDuracaoPorMagiaExtra: { chance: 5, duracao: 1 } }
                        }
                    }
                ]
            }
        ],
        regaliasAvulsas: []
    },

    // ==========================================================================
    // FEITICEIRO PRIMÁRIO
    // ==========================================================================
    {
        id: 'feiticeiro_primario',
        nome: 'Feiticeiro(a)',
        tipo: 'classe_primaria',
        preRequisitos: { regaliaAprendiz: 'feiticeiro', nivelMinimo: 3 },
        bonusPorRegalia: { pv: 3, estamina: 0, magia: 3 },
        habilidadeClasse: {
            nome: 'Pontos de Feitiçaria',
            descricao: 'Ganha 2 pontos de feitiçaria ao lançar qualquer feitiço. 1 ponto = 1 Magia. Duram 1 minuto (10 rodadas). Máximo acumulado = Ocultismo + Ritualismo + Arcanismo. Pode modificar feitiço 1x/rodada.',
            efeito: {
                ganharPontosPorFeitico: 2,
                conversao: { pontos: 1, magia: 1 },
                duracao: '10 rodadas',
                maxAcumulo: 'ocultismo + ritualismo + arcanismo'
            },
            opcoesPontosFeiticaria: [
                { nome: 'Acelerar Feitiço', custo: 4, efeito: 'Reduz 1 ação para lançar (mínimo 1)' },
                { nome: 'Duplicar', custo: 4, efeito: 'Feitiço de alvo único atinge 2° alvo dentro de 9m' },
                { nome: 'Conjuração Atrasada', custo: 4, efeito: 'Atrasa feitiço de ataque à distância em 6 ou 12 segundos' },
                { nome: 'Eco Elemental', custo: 8, efeito: 'Cria duplicata elemental (20 PV) que replica próximo ataque elemental. +1 ação.' },
                { nome: 'Ampliação de Efeito', custo: 4, efeito: 'Aumenta área de efeito em 50%' }
            ]
        },
        arvoresRegalia: [
            {
                id: 'maldicao',
                nome: 'Maldição',
                ordemLivre: true,
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { intuicao: 1, ocultismo: 1 },
                        habilidadeGanha: {
                            nome: 'Enfraquecer',
                            descricao: '40%: desvantagem ataques e -1,5m movimento por 5 rodadas. Custa 6 Magia. +5%/2 Magia.',
                            tipo: 'feitico',
                            custoAcoes: 2, custoMagia: 6,
                            duracao: '5 rodadas',
                            efeito: { chanceSucesso: 40, desvantagemAtaques: true, velocidadeMenos: 1.5 },
                            escalamento: { bonusChancePor2Magia: 5 }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        bonusHabilidades: { arcanismo: 1, ocultismo: 1 },
                        habilidadeGanha: {
                            nome: 'Paranóia',
                            descricao: '30%: surdo e cego por 5 rodadas. Custa 6 Magia. +5%/3 Magia.',
                            tipo: 'feitico',
                            custoAcoes: 2, custoMagia: 6,
                            duracao: '5 rodadas',
                            efeito: { chanceSucesso: 30, condicoes: ['surdo', 'cego'] },
                            escalamento: { bonusChancePor3Magia: 5 }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Olhar Amaldiçoado',
                            descricao: '50%: Aterrorizado por 3 turnos em criatura a até 9m. Custa 5 Magia. +5%/Magia.',
                            tipo: 'feitico',
                            custoAcoes: 2, custoMagia: 5,
                            alcance: 9,
                            efeito: { chanceSucesso: 50, condicao: 'aterrorizado', duracao: '3 turnos' },
                            escalamento: { bonusChancePorMagiaExtra: 5 }
                        }
                    }
                ]
            },
            {
                id: 'caos',
                nome: 'Caos',
                ordemLivre: true,
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { combateArcano: 1, arcanismo: 1, natureza: 1 },
                        habilidadeGanha: {
                            nome: 'Aperto do Caos',
                            descricao: 'Elemento aleatório a 36m. 40%: 1d10 + Restringido. Bônus por elemento. Custa 3 Magia. +5%/Magia.',
                            tipo: 'feitico',
                            custoAcoes: 2, custoMagia: 3,
                            alcance: 36,
                            efeito: {
                                chanceSucesso: 40,
                                dano: '1d10', tipoDano: 'elemental_aleatorio',
                                condicao: 'restringido',
                                bonusElemento: {
                                    gelo: { chanceCongelado: 20 },
                                    fogo: { chanceQueimando: 20 },
                                    terra: { chanceRestringidoExtra: 20 },
                                    ar: { danoExtra: '2d6' }
                                }
                            },
                            escalamento: { bonusChancePorMagiaExtra: 5 }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        bonusHabilidades: { arcanismo: 1, natureza: 1 },
                        habilidadeGanha: {
                            nome: 'Eletrodança Caótica',
                            descricao: 'Esfera 3m: 1d4+1 de cada elemento. 40% Congelado/Queimando. Custa 8 Magia.',
                            tipo: 'feitico',
                            custoAcoes: 2, custoMagia: 8,
                            area: { tipo: 'esfera', raio: 3 },
                            efeito: {
                                dano: '1d4+1 de cada elemento (fogo, água, ar, terra, raio)',
                                chanceCongelado: 40, chanceQueimando: 40
                            }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Roleta Caótica',
                            descricao: 'Linha 18m×3m: 3d10 elemental aleatório. 10% de backfire. Custa 5 Magia.',
                            tipo: 'feitico',
                            custoAcoes: 2, custoMagia: 5,
                            area: { tipo: 'linha', distancia: 18, largura: 3 },
                            efeito: {
                                dano: '3d10', tipoDano: 'elemental_aleatorio',
                                chanceBackfire: 10, backfireRaio: 1.5
                            }
                        }
                    }
                ]
            },
            {
                id: 'rito',
                nome: 'Rito',
                ordemLivre: true,
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { percepcao: 1, ritualismo: 1 },
                        habilidadeGanha: {
                            nome: 'Espiritomancia',
                            descricao: '3 espíritos por 1h. Controle a 100m, ver/ouvir. Custa 1 Magia + 5 M.O.',
                            tipo: 'ritual',
                            tempoExecucao: '1 minuto',
                            custoMagia: 1,
                            custoMateriais: '5 M.O.',
                            duracao: '1 hora',
                            efeito: { invocarEspiritos: 3, alcanceControle: 100, verOuvirAtravez: true }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        bonusHabilidades: { combateArcano: 1, ritualismo: 1 },
                        habilidadeGanha: {
                            nome: 'Fantoche',
                            descricao: 'Fantoche animado: Combate Arcano, 1d6 necrótico, PV=20% do feiticeiro. Custa 4 Magia + 5 M.O.',
                            tipo: 'ritual',
                            tempoExecucao: '1 minuto',
                            custoMagia: 4,
                            custoMateriais: '5 M.O.',
                            efeito: {
                                invocarFantoche: true,
                                hp: 'pv_feiticeiro / 5',
                                dano: '1d6', tipoDano: 'necrotico',
                                usaCombateArcano: true
                            },
                            escalamento: { bonusHPPorMagiaExtra: 1 }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Comunicar com os Mortos',
                            descricao: 'Fala com espírito de morto por 10min ou 5 perguntas. Custa 4 Magia + 5 M.O.',
                            tipo: 'ritual',
                            tempoExecucao: '10 minutos',
                            custoMagia: 4,
                            custoMateriais: '5 M.O.',
                            alcance: 6,
                            duracao: '10 minutos ou 5 perguntas',
                            efeito: { comunicarMortos: true }
                        }
                    }
                ]
            },
            {
                id: 'metamorfose',
                nome: 'Metamorfose',
                ordemLivre: true,
                nota: 'Todos os elixires duram 24h ou até consumidos. Tomar/criar um elixir custa 1 ação cada.',
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { combateArcano: 1, alquimia: 1 },
                        habilidadeGanha: {
                            nome: 'Elixir Padrão',
                            descricao: '+1 acerto, visão no escuro 6m, vantagem Percepção. 10 rodadas. Custa 5 Magia.',
                            tipo: 'feitico',
                            custoAcoes: 1, custoMagia: 5,
                            duracao: '10 rodadas',
                            efeito: {
                                bonusAcertoTodoCombate: 1,
                                visaoNoEscuro: 6,
                                vantagemPercepcao: true
                            },
                            escalamento: { rodadasExtraPorMagiaExtra: 10 }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        bonusHabilidades: { combateArcano: 1, alquimia: 1 },
                        habilidadeGanha: {
                            nome: 'Elixir do Predador',
                            descricao: '+2 acerto, garras 1d8+Ocultismo, visão no escuro. 10 rodadas. Custa 3 Magia.',
                            tipo: 'feitico',
                            custoAcoes: 1, custoMagia: 3,
                            duracao: '10 rodadas',
                            efeito: {
                                bonusAcertoTodoCombate: 2,
                                armasNaturais: [{ nome: 'Garras/Presas', dano: '1d8+ocultismo', tipoDano: 'perfurante/cortante' }],
                                visaoNoEscuro: 6,
                                vantagemPercepcao: true
                            },
                            escalamento: { rodadasExtraPorMagiaExtra: 10 }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Elixir da Aceleração',
                            descricao: '+6m velocidade + efeitos do Elixir Padrão. 10 rodadas. Custa 8 Magia.',
                            tipo: 'feitico',
                            custoAcoes: 1, custoMagia: 8,
                            duracao: '10 rodadas',
                            efeito: { velocidadeExtra: 6, incluiElixirPadrao: true },
                            escalamento: { rodadasExtraPorMagiaExtra: 10 }
                        }
                    }
                ]
            },
            {
                id: 'runico',
                nome: 'Rúnico',
                ordemLivre: true,
                nota: 'Criar uma runa custa 1 minuto por runa.',
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { combateArcano: 1, ritualismo: 1 },
                        habilidadeGanha: {
                            nome: 'Runa Protetiva',
                            descricao: 'Nega todo dano de 1 ataque, 1x/dia. Custa 5 Magia. +1 uso/Magia extra.',
                            tipo: 'reacao',
                            custoMagia: 5,
                            cooldown: '1x por dia',
                            efeito: { negarDanoTotal: true },
                            escalamento: { usosExtraPorMagiaExtra: 1 }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        bonusHabilidades: { arcanismo: 1, ritualismo: 1 },
                        habilidadeGanha: {
                            nome: 'Runa Regenerativa',
                            descricao: 'Recupera 3 PV, 2 Estâmina, 4 Magia 1x/dia. Custa 5 Magia. +1 uso/5 Magia.',
                            tipo: 'ativa',
                            custoAcoes: 1, custoMagia: 5,
                            cooldown: '1x por dia',
                            efeito: { curaHP: 3, curaEstamina: 2, recuperarMagia: 4 },
                            escalamento: { usosExtraPor5Magia: 1 }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Runa de Ataque',
                            descricao: 'Dano sombrio/divino/arcano em arma por 1h. Custa 5 Magia. +1 uso/5 Magia.',
                            tipo: 'ativa',
                            custoAcoes: 1, custoMagia: 5,
                            duracao: '1 hora',
                            efeito: { encantarArma: true, tiposDano: ['sombrio', 'divino', 'arcano'] },
                            escalamento: { usosExtraPor5Magia: 1 }
                        }
                    }
                ]
            },
            {
                id: 'elemental',
                nome: 'Elemental',
                ordemLivre: true,
                niveis: [
                    {
                        nivel: 1, custo: 1,
                        bonusHabilidades: { combateArcano: 1, arcanismo: 1, natureza: 1 },
                        habilidadeGanha: {
                            nome: 'Ataque Elemental',
                            descricao: 'Jato elemental à escolha: 2d10. Gelo: 40% Congelado. Fogo: 40% Queimando. Custa 4 Magia.',
                            tipo: 'feitico',
                            custoAcoes: 2, custoMagia: 4,
                            efeito: {
                                dano: '2d10', tipoDano: 'elemental_escolha',
                                chanceCongelado: 40, chanceQueimando: 40
                            }
                        }
                    },
                    {
                        nivel: 2, custo: 1,
                        bonusHabilidades: { arcanismo: 1, natureza: 1 },
                        habilidadeGanha: {
                            nome: 'Dominar Elemento',
                            descricao: 'Controla pequenas quantidades de vento, terra, fogo, água ou raio para efeitos utilitários.',
                            tipo: 'feitico',
                            custoAcoes: 2,
                            efeito: { controlarElemento: true, descricao: 'Controla pequenas quantidades de vento/terra/fogo/água/raio' }
                        }
                    },
                    {
                        nivel: 3, custo: 1,
                        habilidadeGanha: {
                            nome: 'Armadura Elemental',
                            descricao: 'Armadura de um elemento: +5 PV temporário. Custa 2 Magia. +5 PV/2 Magia.',
                            tipo: 'feitico',
                            custoAcoes: 3, custoMagia: 2,
                            efeito: { pvTemporario: 5 },
                            escalamento: { pvTemporarioPor2Magia: 5 }
                        }
                    }
                ]
            }
        ],
        regaliasAvulsas: []
    }
];

// ============================================================================
// ESPECIALIZAÇÕES DE CLASSE (requerem 10 regalias na classe primária)
// ============================================================================

export const especializacoes = [
    // -------- DO COMBATENTE --------
    {
        id: 'cavaleiro',
        nome: 'Cavaleiro(a)',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { combatente_primario: 10 } },
        bonusPorRegalia: { pv: 6, estamina: 3, magia: 1 },
        descricao: 'Especialização em combate montado, liderança e proteção.'
    },
    {
        id: 'assassino',
        nome: 'Assassino(a)',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { combatente_primario: 10 } },
        bonusPorRegalia: { pv: 4, estamina: 6, magia: 0 },
        descricao: 'Especialização em furtividade, venenos e dano preciso.'
    },
    {
        id: 'cacador',
        nome: 'Caçador(a)',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { combatente_primario: 10 } },
        bonusPorRegalia: { pv: 5, estamina: 4, magia: 1 },
        descricao: 'Especialização em rastreamento, companheiro animal e combate natural.'
    },
    {
        id: 'barbaro',
        nome: 'Bárbaro(a)',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { combatente_primario: 10 } },
        bonusPorRegalia: { pv: 8, estamina: 2, magia: 0 },
        descricao: 'Especialização em fúria, resistência e combate brutal.'
    },
    {
        id: 'monge',
        nome: 'Monge',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { combatente_primario: 7, novico_primario: 3 } },
        bonusPorRegalia: { pv: 4, estamina: 4, magia: 2 },
        descricao: 'Especialização em ki, chakras e combate desarmado.'
    },
    // -------- DO NOVIÇO --------
    {
        id: 'sacerdote',
        nome: 'Sacerdote',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { novico_primario: 10 } },
        bonusPorRegalia: { pv: 4, estamina: 0, magia: 6 },
        descricao: 'Especialização em cura avançada, ressurreição e proteção divina.'
    },
    {
        id: 'exorcista',
        nome: 'Exorcista',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { novico_primario: 10 } },
        bonusPorRegalia: { pv: 5, estamina: 0, magia: 5 },
        descricao: 'Especialização em purificação, dano sagrado e combate contra corruptores.'
    },
    {
        id: 'inquisidor',
        nome: 'Inquisidor',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { combatente_primario: 5, novico_primario: 5 } },
        bonusPorRegalia: { pv: 5, estamina: 3, magia: 2 },
        descricao: 'Especialização em combate divino, armadura de fé e punição sagrada.'
    },
    {
        id: 'profano',
        nome: 'Profano',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { feiticeiro_primario: 5, novico_primario: 5 } },
        bonusPorRegalia: { pv: 3, estamina: 0, magia: 7 },
        descricao: 'Especialização em magia necrótica, corrupção divina e heresia.',
        restricoes: ['deidade_maligna_ou_neutra']
    },
    // -------- DO INICIADO --------
    {
        id: 'mago',
        nome: 'Mago(a)',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { iniciado_primario: 10 } },
        bonusPorRegalia: { pv: 4, estamina: 0, magia: 5 },
        descricao: 'Especialização em magia avançada, evocação e teletransporte.'
    },
    {
        id: 'professor',
        nome: 'Professor(a)',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { iniciado_primario: 10 } },
        bonusPorRegalia: { pv: 3, estamina: 0, magia: 6 },
        descricao: 'Especialização em construtos arcanos, suporte e magias versáteis.'
    },
    {
        id: 'cavaleiro_arcano',
        nome: 'Cavaleiro(a) Arcano',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { iniciado_primario: 5, combatente_primario: 5 } },
        bonusPorRegalia: { pv: 5, estamina: 2, magia: 3 },
        descricao: 'Especialização em combate mágico-marcial, armas arcanas e teletransporte tático.'
    },
    {
        id: 'erudito',
        nome: 'Erudito',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { iniciado_primario: 5, novico_primario: 5 } },
        bonusPorRegalia: { pv: 4, estamina: 0, magia: 6 },
        descricao: 'Especialização em engenharia divina, energia sagrada e sabedoria mista.'
    },
    {
        id: 'invocador',
        nome: 'Invocador',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { iniciado_primario: 5, feiticeiro_primario: 5 } },
        bonusPorRegalia: { pv: 3, estamina: 0, magia: 7 },
        descricao: 'Especialização em invocações, elementais e invocações de combate.'
    },
    // -------- DO FEITICEIRO --------
    {
        id: 'metamorfo',
        nome: 'Metamorfo',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { feiticeiro_primario: 10 } },
        bonusPorRegalia: { pv: 7, estamina: 0, magia: 3 },
        descricao: 'Especialização em formas licantrópicas, elixires e metamorfose animal.'
    },
    {
        id: 'elementalista',
        nome: 'Elementalista',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { feiticeiro_primario: 10 } },
        bonusPorRegalia: { pv: 3, estamina: 0, magia: 6 },
        descricao: 'Especialização em controle elemental avançado e magia de área devastadora.'
    },
    {
        id: 'xama',
        nome: 'Xamã',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { feiticeiro_primario: 10 } },
        bonusPorRegalia: { pv: 3, estamina: 0, magia: 7 },
        descricao: 'Especialização em necromancia, espíritos e controle de mortos-vivos.'
    },
    {
        id: 'bruxo',
        nome: 'Bruxo(a)',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { feiticeiro_primario: 10 } },
        bonusPorRegalia: { pv: 2, estamina: 0, magia: 8 },
        descricao: 'Especialização em familiar, natureza, ilusões e contratos.'
    },
    {
        id: 'cacador_demonios',
        nome: 'Caçador(a) de Demônios',
        tipo: 'especializacao',
        preRequisitos: { regaliasPrimarias: { feiticeiro_primario: 3, combatente_primario: 7 } },
        bonusPorRegalia: { pv: 3, estamina: 3, magia: 4 },
        descricao: 'Especialização em caça a corruptores, votos de caçada e combate sombrio.'
    }
];

// ============================================================================
// TABELA DE PONTOS DE REGALIA POR NÍVEL
// ============================================================================

export const pontosRegaliaPorNivel = (nivel) => {
    if (nivel < 1) return 0;
    if (nivel === 1) return 0; // pontos no nível 1 só via guardarPonto na criação
    if (nivel === 2) return 8;
    return 8 + 2 * (nivel - 2);
};

// ============================================================================
// FUNÇÕES AUXILIARES (compatibilidade)
// ============================================================================

/**
 * Busca uma regalia de aprendiz pelo id
 */
export const getRegaliaAprendiz = (id) => {
    return regaliasDeAprendiz.find(r => r.id === id) || null;
};

/**
 * Busca uma regalia de aprendiz pelo nome
 */
export const getRegaliaAprendizPorNome = (nome) => {
    return regaliasDeAprendiz.find(r =>
        r.nome.toLowerCase().includes(nome.toLowerCase())
    ) || null;
};

/**
 * Lista regalias de aprendiz para select/dropdown
 */
export const getRegaliasAprendizParaSelect = () => {
    return regaliasDeAprendiz.map(r => ({
        value: r.id,
        label: r.nome
    }));
};

/**
 * Busca um tipo de regalia opcional pelo tipo
 */
export const getRegaliaOpcional = (tipo) => {
    return regaliasOpcionais.regalias_opcionais.find(r =>
        r.tipo.toLowerCase().includes(tipo.toLowerCase())
    ) || null;
};

/**
 * Busca uma opção específica dentro de uma regalia opcional
 */
export const getOpcaoRegalia = (tipo, nomeOpcao) => {
    const regalia = getRegaliaOpcional(tipo);
    if (!regalia) return null;

    return regalia.opcoes.find(o =>
        o.nome.toLowerCase().includes(nomeOpcao.toLowerCase())
    ) || null;
};

/**
 * Lista todas as mutações disponíveis
 */
export const getMutacoes = () => {
    const mutante = getRegaliaOpcional('Mutante');
    return mutante ? mutante.opcoes : [];
};

/**
 * Lista os tipos de regalias opcionais
 */
export const getTiposRegaliasOpcionais = () => {
    return regaliasOpcionais.regalias_opcionais.map(r => ({
        value: r.tipo,
        label: r.tipo,
        custo: r.custo,
        penalidade: r.penalidade || null
    }));
};

// ============================================================================
// FUNÇÕES DE CLASSES PRIMÁRIAS E ESPECIALIZAÇÕES
// ============================================================================

/**
 * Busca uma classe primária pelo id
 */
export const getClassePrimaria = (id) => {
    return classesPrimarias.find(c => c.id === id) || null;
};

/**
 * Busca uma especialização pelo id
 */
export const getEspecializacao = (id) => {
    return especializacoes.find(e => e.id === id) || null;
};

/**
 * Lista todas as classes primárias para select/dropdown
 */
export const getClassesPrimariasParaSelect = () => {
    return classesPrimarias.map(c => ({
        value: c.id,
        label: c.nome,
        preRequisitos: c.preRequisitos
    }));
};

/**
 * Lista todas as especializações para select/dropdown
 */
export const getEspecializacoesParaSelect = () => {
    return especializacoes.map(e => ({
        value: e.id,
        label: e.nome,
        preRequisitos: e.preRequisitos
    }));
};

/**
 * Busca especializações disponíveis para uma combinação de regalias primárias
 * @param {Object} regaliasAdquiridas - ex: { combatente_primario: 12, novico_primario: 5 }
 */
export const getEspecializacoesDisponiveis = (regaliasAdquiridas = {}) => {
    return especializacoes.filter(esp => {
        const reqs = esp.preRequisitos.regaliasPrimarias;
        return Object.entries(reqs).every(([classeId, qtdNecessaria]) =>
            (regaliasAdquiridas[classeId] || 0) >= qtdNecessaria
        );
    });
};

/**
 * Busca uma árvore de regalia dentro de uma classe primária
 */
export const getArvoreRegalia = (classePrimariaId, arvoreId) => {
    const classe = getClassePrimaria(classePrimariaId);
    if (!classe) return null;
    return classe.arvoresRegalia.find(a => a.id === arvoreId) || null;
};

/**
 * Busca uma regalia avulsa dentro de uma classe primária
 */
export const getRegaliaAvulsa = (classePrimariaId, regaliaId) => {
    const classe = getClassePrimaria(classePrimariaId);
    if (!classe) return null;
    return classe.regaliasAvulsas.find(r => r.id === regaliaId) || null;
};

// ============================================================================
// FUNÇÕES DE RESOLUÇÃO DE REGALIAS (TODO-REG-003)
// ============================================================================

/**
 * Aplica os efeitos de uma regalia de aprendiz ao estado da ficha
 * @param {Object} fichaState - Estado atual da ficha
 * @param {string} regaliaId - ID da regalia de aprendiz
 * @param {Object} escolhas - Escolhas feitas pelo jogador
 *   ex: { habilidades: { forca: 1, combateCorpoACorpo: 1 } }
 * @returns {Object} Delta de stats a ser aplicado
 */
export const aplicarRegaliaAprendiz = (fichaState, regaliaId, escolhas = {}) => {
    const regalia = getRegaliaAprendiz(regaliaId);
    if (!regalia) return { sucesso: false, erro: `Regalia '${regaliaId}' não encontrada.` };

    const delta = {
        habilidades: {},
        proficiencias: [],
        habilidadesGanhas: [],
        pv: regalia.bonusPorRegalia?.pv || 0,
        estamina: regalia.bonusPorRegalia?.estamina || 0,
        magia: regalia.bonusPorRegalia?.magia || 0
    };

    // 1. Aplicar bônus fixos de habilidades
    if (regalia.bonusHabilidades) {
        for (const [hab, pts] of Object.entries(regalia.bonusHabilidades)) {
            delta.habilidades[hab] = (delta.habilidades[hab] || 0) + pts;
        }
    }

    // 2. Aplicar escolhas de habilidades (validando se a escolha pertence ao grupo)
    if (escolhas.habilidades && regalia.escolhasHabilidades) {
        for (const escolhaGrupo of regalia.escolhasHabilidades) {
            for (const [hab, pts] of Object.entries(escolhas.habilidades)) {
                if (escolhaGrupo.grupo.includes(hab)) {
                    const pontosAplicar = Math.min(pts, escolhaGrupo.pontos);
                    delta.habilidades[hab] = (delta.habilidades[hab] || 0) + pontosAplicar;
                }
            }
        }
    }

    // 3. Proficiências ganhas
    if (regalia.proficienciasGanhas?.length > 0) {
        delta.proficiencias = [...regalia.proficienciasGanhas];
    }

    // 4. Habilidades ganhas
    if (regalia.habilidadesGanhas?.length > 0) {
        delta.habilidadesGanhas = regalia.habilidadesGanhas.map(h => ({
            nome: h.nome,
            tipo: h.tipo,
            fonte: `regalia_aprendiz_${regaliaId}`
        }));
    }

    return { sucesso: true, delta };
};

/**
 * Aplica os efeitos de uma regalia opcional ao estado da ficha
 * @param {Object} fichaState - Estado atual da ficha
 * @param {string} tipo - Tipo da regalia (Psíquico, Vampiro, Mutante)
 * @param {string} opcaoNome - Nome da opção escolhida
 * @returns {Object} Delta de stats a ser aplicado
 */
export const aplicarRegaliaOpcional = (fichaState, tipo, opcaoNome) => {
    const regalia = getRegaliaOpcional(tipo);
    if (!regalia) return { sucesso: false, erro: `Regalia opcional tipo '${tipo}' não encontrada.` };

    const opcao = regalia.opcoes.find(o =>
        o.nome.toLowerCase() === opcaoNome.toLowerCase()
    );
    if (!opcao) return { sucesso: false, erro: `Opção '${opcaoNome}' não encontrada em '${tipo}'.` };

    const delta = {
        habilidades: {},
        proficiencias: [],
        habilidadesGanhas: [],
        flags: {},
        armasNaturais: [],
        resistencias: [],
        vulnerabilidades: [],
        visaoNoEscuro: null,
        defesaBaseOverride: null,
        velocidadeExtra: 0,
        bonusMiscelanea: {}
    };

    // Aplicar flags globais do tipo (ex: mutante → penalidade social; vampiro → sem cura milagre)
    if (regalia.flags) {
        delta.flags = { ...regalia.flags };
    }

    if (!opcao.efeitos) {
        return { sucesso: true, delta, aviso: 'Opção sem efeitos mecânicos estruturados.' };
    }

    const ef = opcao.efeitos;

    // Defesa
    if (ef.defesaBaseOverride) delta.defesaBaseOverride = ef.defesaBaseOverride;
    if (ef.bonusDefesa) delta.bonusMiscelanea.defesa = ef.bonusDefesa;

    // Armas naturais
    if (ef.armasNaturais?.length > 0) delta.armasNaturais = [...ef.armasNaturais];

    // Resistências e vulnerabilidades
    if (ef.resistencias?.length > 0) delta.resistencias = [...ef.resistencias];
    if (ef.vulnerabilidades?.length > 0) delta.vulnerabilidades = [...ef.vulnerabilidades];

    // Velocidade
    if (ef.velocidadeExtra) delta.velocidadeExtra = ef.velocidadeExtra;

    // Visão no escuro
    if (ef.visaoNoEscuro) delta.visaoNoEscuro = { ...ef.visaoNoEscuro };

    // Bônus diversos
    if (ef.bonusSocial) delta.bonusMiscelanea.social = ef.bonusSocial;
    if (ef.bonusPercepcaoVisao) delta.bonusMiscelanea.percepcaoVisao = ef.bonusPercepcaoVisao;
    if (ef.bonusAcrobaciaEquilibrio) delta.bonusMiscelanea.acrobaciaEquilibrio = ef.bonusAcrobaciaEquilibrio;
    if (ef.bonusAtletismoAgarrar) delta.bonusMiscelanea.atletismoAgarrar = ef.bonusAtletismoAgarrar;
    if (ef.bonusAtletismoManterPe) delta.bonusMiscelanea.atletismoManterPe = ef.bonusAtletismoManterPe;
    if (ef.bonusAtletismoDerrubar) delta.bonusMiscelanea.atletismoDerrubar = ef.bonusAtletismoDerrubar;
    if (ef.bonusAtletismoNaoSerDerrubado) delta.bonusMiscelanea.atletismoNaoSerDerrubado = ef.bonusAtletismoNaoSerDerrubado;
    if (ef.alcanceAmeacaExtra) delta.bonusMiscelanea.alcanceAmeacaExtra = ef.alcanceAmeacaExtra;

    // Passivos especiais
    if (ef.passivos) delta.bonusMiscelanea.passivos = { ...ef.passivos };
    if (ef.escalarSemCustoExtra) delta.flags.escalarSemCustoExtra = true;
    if (ef.escalarSemFerramentas) delta.flags.escalarSemFerramentas = true;
    if (ef.visao360) delta.flags.visao360 = true;

    // Habilidades ativas
    if (ef.habilidadesAtivas?.length > 0) {
        delta.habilidadesGanhas = ef.habilidadesAtivas.map(h => ({
            nome: h.nome,
            tipo: h.tipo,
            fonte: `regalia_opcional_${tipo}_${opcaoNome}`
        }));
    }

    return { sucesso: true, delta };
};

/**
 * Valida se um personagem atende aos pré-requisitos para comprar uma regalia
 * @param {Object} fichaState - Estado atual da ficha
 * @param {string} regaliaId - ID da regalia (aprendiz, primária ou especialização)
 * @returns {Object} { valido: boolean, mensagem: string }
 */
export const validarPreRequisitosRegalia = (fichaState, regaliaId) => {
    const nivel = fichaState?.nivel || 1;
    const regaliasCompradas = fichaState?.regaliasCompradas || {};
    const pontosGastos = fichaState?.pontosRegaliaGastos || 0;
    const pontosDisponiveis = pontosRegaliaPorNivel(nivel) - pontosGastos;

    // 1. Verificar se é regalia de aprendiz
    const aprendiz = getRegaliaAprendiz(regaliaId);
    if (aprendiz) {
        if (pontosDisponiveis < 1) {
            return { valido: false, mensagem: 'Pontos de regalia insuficientes.' };
        }
        return { valido: true, mensagem: 'OK' };
    }

    // 2. Verificar se é classe primária
    const primaria = getClassePrimaria(regaliaId);
    if (primaria) {
        if (nivel < primaria.preRequisitos.nivelMinimo) {
            return { valido: false, mensagem: `Nível mínimo ${primaria.preRequisitos.nivelMinimo} necessário. Nível atual: ${nivel}.` };
        }
        if (!regaliasCompradas[primaria.preRequisitos.regaliaAprendiz]) {
            return { valido: false, mensagem: `Necessário possuir a regalia de aprendiz '${primaria.preRequisitos.regaliaAprendiz}'.` };
        }
        if (pontosDisponiveis < 1) {
            return { valido: false, mensagem: 'Pontos de regalia insuficientes.' };
        }
        return { valido: true, mensagem: 'OK' };
    }

    // 3. Verificar se é especialização
    const especializacao = getEspecializacao(regaliaId);
    if (especializacao) {
        const reqs = especializacao.preRequisitos.regaliasPrimarias;
        for (const [classeId, qtdNecessaria] of Object.entries(reqs)) {
            const qtdAtual = regaliasCompradas[classeId] || 0;
            if (qtdAtual < qtdNecessaria) {
                return {
                    valido: false,
                    mensagem: `Necessário ${qtdNecessaria} regalias em '${classeId}'. Atual: ${qtdAtual}.`
                };
            }
        }
        // Verificar restrições adicionais (ex: profano requer deidade maligna/neutra)
        if (especializacao.restricoes?.length > 0) {
            for (const restricao of especializacao.restricoes) {
                if (restricao === 'deidade_maligna_ou_neutra') {
                    const alinhamento = fichaState?.deidade?.alinhamento;
                    if (alinhamento && alinhamento !== 'maligno' && alinhamento !== 'neutro') {
                        return { valido: false, mensagem: 'Necessário servir uma deidade maligna ou neutra.' };
                    }
                }
            }
        }
        if (pontosDisponiveis < 1) {
            return { valido: false, mensagem: 'Pontos de regalia insuficientes.' };
        }
        return { valido: true, mensagem: 'OK' };
    }

    return { valido: false, mensagem: `Regalia '${regaliaId}' não encontrada no sistema.` };
};

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export default {
    regaliasDeAprendiz,
    regaliasOpcionais,
    classesPrimarias,
    especializacoes
};
