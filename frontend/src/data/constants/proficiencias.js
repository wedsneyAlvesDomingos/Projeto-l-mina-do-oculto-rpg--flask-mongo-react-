/**
 * Dados centralizados de Proficiências do sistema Lâmina do Oculto
 * Este arquivo contém todas as proficiências organizadas com efeitos mecânicos.
 *
 * === SCHEMA POR NÍVEL (TODO-PRO-001) ===
 * nivel     — int
 * descricao — texto descritivo
 * efeitos   — {
 *     desbloqueia: string[]    — itens/categorias que o nível libera
 *     bonusAtaque: int|null    — bônus numérico a ataques (se houver)
 *     bonusDefesa: int|null    — bônus numérico à defesa (se houver)
 *     bonusHabilidade: {}      — bônus a habilidades específicas
 *     bonusTeste: int|null     — bônus genérico a testes
 *     reducaoDano: string|null — fórmula de redução de dano
 *     chancePorcentagem: int|null — chance percentual especial
 *     especial: string[]|null  — efeitos especiais descritivos
 * }
 *
 * Ref: LDO 0.5, seção Proficiências
 * Usado em: criarPersonagem.js, characterSheet.js, Wiki/habilidadesProenfiencias
 */

export const armasEArmadurasProf = {
    id: "armas_armaduras",
    nome: "Maestria em Armaduras e Escudos",
    descricao: "Permite o uso progressivo de armaduras e escudos com diferentes níveis de proteção.",
    notas: [],
    niveis: [
        {
            nivel: 1,
            descricao: "Permite o uso de armaduras leves, como couro, peles, tecidos reforçados... Também permite o uso de escudos simples.",
            efeitos: {
                desbloqueia: ['armaduras_leves', 'escudo_simples'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        },
        {
            nivel: 2,
            descricao: "Permite de utilizar armaduras médias. Essas armaduras oferecem proteção moderada, porém, são mais pesadas.",
            efeitos: {
                desbloqueia: ['armaduras_medias'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        },
        {
            nivel: 3,
            descricao: "Permite armaduras pesadas. Essas fornecem a maior proteção possível, mas impactam a velocidade e furtividade.",
            efeitos: {
                desbloqueia: ['armaduras_pesadas'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        }
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
        {
            nivel: 1,
            descricao: "Permite uso de montarias simples como cavalos, burros, camelos. Montarias exóticas exigem outro tipo de treinamento.",
            efeitos: {
                desbloqueia: ['montarias_simples'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: ['remove_desvantagem_conducao_terrestre']
            }
        },
        {
            nivel: 2,
            descricao: "Permite uso de carruagens, charretes e veículos de tração animal comuns.",
            efeitos: {
                desbloqueia: ['carruagens', 'charretes', 'veiculos_tracao_animal'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        },
        {
            nivel: 3,
            descricao: "Permite condução de veículos terrestres de grande porte, como trens ou veículos blindados.",
            efeitos: {
                desbloqueia: ['veiculos_grande_porte', 'trens', 'veiculos_blindados'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        }
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
        {
            nivel: 1,
            descricao: "Permite a condução de embarcações simples: canoas, barcos a remo, jangadas, etc.",
            efeitos: {
                desbloqueia: ['canoas', 'barcos_a_remo', 'jangadas'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: ['remove_desvantagem_conducao_aquatica']
            }
        },
        {
            nivel: 2,
            descricao: "Permite a condução de escunas, pacotes e pequenas fragatas.",
            efeitos: {
                desbloqueia: ['escunas', 'pacotes', 'fragatas_pequenas'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        },
        {
            nivel: 3,
            descricao: "Permite a condução de naus, caravelas, galeras e grandes barcos.",
            efeitos: {
                desbloqueia: ['naus', 'caravelas', 'galeras', 'barcos_grandes'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        },
        {
            nivel: 4,
            descricao: "Permite a condução de navios de guerra ou mercantes de grande porte.",
            efeitos: {
                desbloqueia: ['navios_guerra', 'navios_mercantes_grande_porte'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        }
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
        {
            nivel: 1,
            descricao: "Permite a condução de montarias exóticas.",
            efeitos: {
                desbloqueia: ['montarias_exoticas'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: ['remove_desvantagem_dupla_conducao_exotica']
            }
        },
        {
            nivel: 2,
            descricao: "Permite conduzir veículos exóticos terrestres ou aquáticos simples/médios.",
            efeitos: {
                desbloqueia: ['veiculos_exoticos_terrestres_simples', 'veiculos_exoticos_aquaticos_simples'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        },
        {
            nivel: 3,
            descricao: "Permite conduzir veículos exóticos subaquáticos ou voadores.",
            efeitos: {
                desbloqueia: ['veiculos_exoticos_subaquaticos', 'veiculos_exoticos_voadores'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        },
        {
            nivel: 4,
            descricao: "Permite conduzir veículos com habilidades especiais, como naves mágicas ou submersíveis abissais.",
            efeitos: {
                desbloqueia: ['veiculos_especiais_magicos', 'submersiveis_abissais'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        }
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
        {
            nivel: 1,
            descricao: "Permite usar Ferramentas de ladrão sem desvantagem.",
            efeitos: {
                desbloqueia: ['ferramentas_ladrao'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: ['remove_desvantagem_ferramentas_ladrao']
            }
        },
        {
            nivel: 2,
            descricao: "Permite adicionar o modificador de Destreza ao teste para abrir trancas.",
            efeitos: {
                desbloqueia: [],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: { destreza: 'adicionar_ao_teste' },
                especial: ['adicionar_destreza_teste_trancas']
            }
        },
        {
            nivel: 3,
            descricao: "Permite realizar a ação de arrombamento com uma única ação em combate.",
            efeitos: {
                desbloqueia: [],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: ['arrombamento_uma_acao']
            }
        },
        {
            nivel: 4,
            descricao: "Permite desativar armadilhas complexas com o kit.",
            efeitos: {
                desbloqueia: ['desativar_armadilhas_complexas'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        },
        {
            nivel: 5,
            descricao: "Permite abrir fechaduras mágicas e adicionar Investigação ou Percepção ao valor de Destreza.",
            efeitos: {
                desbloqueia: ['fechaduras_magicas'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: { investigacao: 'adicionar_ao_teste', percepcao: 'adicionar_ao_teste' },
                especial: ['abrir_fechaduras_magicas', 'adicionar_investigacao_ou_percepcao_a_destreza']
            }
        }
    ]
};

export const armasDeFogoProf = {
    id: "armas_fogo",
    nome: "Proficiência em Armas de Fogo",
    descricao: "Capacidade de manusear armas de fogo, mesmo sem ser um combatente.",
    notas: [],
    niveis: [
        {
            nivel: 1,
            descricao: "Permite uso básico de armas de fogo como pistolas e rifles.",
            efeitos: {
                desbloqueia: ['armas_de_fogo_basicas', 'pistolas', 'rifles'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        },
        {
            nivel: 2,
            descricao: "Permite uso de armas de fogo exóticas ou experimentais com habilidades especiais.",
            efeitos: {
                desbloqueia: ['armas_de_fogo_exoticas', 'armas_de_fogo_experimentais'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        }
    ]
};

export const linguasAntigasProf = {
    id: "linguas_antigas",
    nome: "Proficiência em Línguas Antigas",
    descricao: "Compreensão e comunicação com línguas de eras passadas.",
    notas: [],
    niveis: [
        {
            nivel: 1,
            descricao: "Compreende e traduz inscrições antigas relacionadas à sua linhagem.",
            efeitos: {
                desbloqueia: ['ler_inscricoes_antigas_linhagem'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        },
        {
            nivel: 2,
            descricao: "Decifra línguas antigas desconhecidas após 1 hora de estudo.",
            efeitos: {
                desbloqueia: ['decifrar_linguas_desconhecidas'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: ['decifrar_1h_estudo']
            }
        },
        {
            nivel: 3,
            descricao: "Aprende e fala línguas antigas após 24h de estudo, podendo se comunicar com seres antigos.",
            efeitos: {
                desbloqueia: ['falar_linguas_antigas', 'comunicar_seres_antigos'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: ['aprender_idioma_24h']
            }
        }
    ]
};

export const arqueologiaProf = {
    id: "arqueologia",
    nome: "Proficiência em Arqueologia",
    descricao: "Especialização na descoberta, análise e restauração de artefatos históricos.",
    notas: [],
    niveis: [
        {
            nivel: 1,
            descricao: "Identifica e cataloga artefatos com +2 em testes de identificação, ruínas e restauração. Ferramentas arqueológicas dão +2 adicionais.",
            efeitos: {
                desbloqueia: ['identificar_artefatos'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusTeste: 2,
                bonusHabilidade: {},
                especial: ['bonus_ferramentas_arqueologicas_2']
            }
        },
        {
            nivel: 2,
            descricao: "Recebe +2 em testes de investigação de ruínas e descoberta de tesouros (acumulativo).",
            efeitos: {
                desbloqueia: [],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusTeste: 2,
                bonusHabilidade: { investigacao: 2 },
                especial: ['bonus_acumulativo_ruinas']
            }
        },
        {
            nivel: 3,
            descricao: "Adquire técnicas de restauração avançada com bônus de +2 em testes de preservação e restauração.",
            efeitos: {
                desbloqueia: ['restauracao_avancada'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusTeste: 2,
                bonusHabilidade: {},
                especial: ['bonus_preservacao_restauracao']
            }
        }
    ]
};

export const liderancaProf = {
    id: "lideranca",
    nome: "Proficiência em Liderança",
    descricao: "Capacidade de inspirar e comandar aliados e seguidores em diversas situações.",
    notas: [],
    niveis: [
        {
            nivel: 1,
            descricao: "Inspira aliados com +2 em testes por 1 minuto, 3x por descanso longo.",
            efeitos: {
                desbloqueia: [],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusTeste: 2,
                bonusHabilidade: {},
                especial: ['inspirar_aliados_2_por_1min', 'usos_3_por_descanso_longo']
            }
        },
        {
            nivel: 2,
            descricao: "+2 em ataques do grupo, 3x por descanso. +2 em persuasão e negociação.",
            efeitos: {
                desbloqueia: [],
                bonusAtaque: 2,
                bonusDefesa: null,
                bonusTeste: null,
                bonusHabilidade: { persuasao: 2, negociacao: 2 },
                especial: ['coordenar_tatico_grupo', 'usos_3_por_descanso_longo']
            }
        },
        {
            nivel: 3,
            descricao: "+2 em testes de seguidores, ataque e dano de aliados sob comando.",
            efeitos: {
                desbloqueia: [],
                bonusAtaque: 2,
                bonusDefesa: null,
                bonusTeste: 2,
                bonusHabilidade: {},
                especial: ['comandar_exercitos', 'bonus_ataque_dano_aliados_sob_comando']
            }
        }
    ]
};

export const armasExoticasProf = {
    id: "armas_exoticas",
    nome: "Proficiência em Armas Exóticas",
    descricao: "Habilidade para usar armas incomuns que não sejam armas de fogo.",
    notas: [],
    niveis: [
        {
            nivel: 1,
            descricao: "Adquire proficiência com 1 arma exótica não relacionada a armas de fogo.",
            efeitos: {
                desbloqueia: ['1_arma_exotica'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        },
        {
            nivel: 2,
            descricao: "Adquire proficiência com mais 2 armas exóticas não relacionadas a armas de fogo.",
            efeitos: {
                desbloqueia: ['2_armas_exoticas_adicionais'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        },
        {
            nivel: 3,
            descricao: "Pode usar qualquer arma exótica não relacionada a armas de fogo.",
            efeitos: {
                desbloqueia: ['todas_armas_exoticas_nao_fogo'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        }
    ]
};

export const esgrimaProf = {
    id: "esgrima",
    nome: "Proficiência em Esgrima",
    descricao: "Treinamento com espadas leves, adagas e floretes.",
    notas: [],
    niveis: [
        {
            nivel: 1,
            descricao: "Adquire proficiência com espadas leves, adagas, floretes e sabres não exóticos.",
            efeitos: {
                desbloqueia: ['espadas_leves', 'adagas', 'floretes', 'sabres'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        }
    ]
};

export const arcoBestaProf = {
    id: "arco_besta",
    nome: "Proficiência em Arco e Besta",
    descricao: "Capacidade de usar armas de disparo mecânico.",
    notas: [],
    niveis: [
        {
            nivel: 1,
            descricao: "Adquire proficiência com arcos e bestas.",
            efeitos: {
                desbloqueia: ['arcos', 'bestas'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: null
            }
        }
    ]
};

export const disfarceProf = {
    id: "disfarce",
    nome: "Proficiência em Disfarce",
    descricao: "Permite o uso de disfarces para as mais diversas necessidades, com maior facilidade conforme o aumento de pontos de proficiência. Testes de enganação tornam-se mais fáceis à medida que o personagem acumula pontos de proficiência.",
    notas: [],
    niveis: [
        {
            nivel: 1,
            descricao: "Permite criar disfarces simples para ocultar a identidade em situações básicas. O personagem pode alterar sua aparência usando maquiagem, adereços e roupas adequadas. +2 em testes de furtividade e enganação enquanto disfarçado.",
            efeitos: {
                desbloqueia: ['disfarces_simples'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: { furtividade: 2, enganacao: 2 },
                especial: ['bonus_enquanto_disfarçado']
            }
        },
        {
            nivel: 2,
            descricao: "Permite criar disfarces mais elaborados e convincentes, enganando observadores atentos. O personagem pode imitar características físicas específicas, como altura, peso, voz e até mesmo traços faciais. +2 em testes de furtividade e enganação enquanto disfarçado.",
            efeitos: {
                desbloqueia: ['disfarces_elaborados', 'imitacao_fisica'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: { furtividade: 2, enganacao: 2 },
                especial: ['bonus_acumulativo_enquanto_disfarçado']
            }
        },
        {
            nivel: 3,
            descricao: "Permite infiltrar-se em locais protegidos com maior facilidade. O personagem é capaz de imitar o comportamento e os trejeitos de uma pessoa ou criatura específica, tornando-se praticamente indistinguível dela. +10 em testes de furtividade e enganação enquanto disfarçado.",
            efeitos: {
                desbloqueia: ['imitacao_comportamental', 'infiltracao_avancada'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: { furtividade: 10, enganacao: 10 },
                especial: ['praticamente_indistinguivel']
            }
        }
    ]
};

export const ataquesEmAreaProf = {
    id: "ataques_area",
    nome: "Proficiência Contra Ataques em Área",
    descricao: "Capacidade de reduzir o dano de ataques em área ao realizar um teste de reflexo, com a eficácia aumentando com os pontos de proficiência.",
    notas: [],
    niveis: [
        {
            nivel: 1,
            descricao: "Ao sofrer um ataque em área, o personagem pode fazer um teste de reflexo (Agilidade) como reação e reduzir o dano em um valor igual a metade do seu valor de Fortitude.",
            efeitos: {
                desbloqueia: [],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                reducaoDano: 'fortitude / 2',
                especial: ['teste_reflexo_reacao', 'reducao_dano_area_metade_fortitude']
            }
        },
        {
            nivel: 2,
            descricao: "A redução de dano aumenta para igual ao valor de Fortitude.",
            efeitos: {
                desbloqueia: [],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                reducaoDano: 'fortitude',
                especial: ['reducao_dano_area_fortitude']
            }
        },
        {
            nivel: 3,
            descricao: "A redução de dano aumenta para igual a 2x o valor de Fortitude.",
            efeitos: {
                desbloqueia: [],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                reducaoDano: 'fortitude * 2',
                especial: ['reducao_dano_area_2x_fortitude']
            }
        }
    ]
};

export const combateAntiConjuradoresProf = {
    id: "anti_conjuradores",
    nome: "Proficiência em Combate Anti-conjuradores",
    descricao: "Permite ao personagem reconhecer sinais de magia, identificar conjuradores e até interromper feitiços, tornando-o mais eficaz contra magia.",
    notas: [],
    niveis: [
        {
            nivel: 1,
            descricao: "Permite ao personagem reconhecer sinais de magia e identificar conjuradores. Ele pode detectar a presença de magia ao seu redor e discernir quando alguém está lançando um feitiço ou utilizando habilidades mágicas. Se uma criatura conjurar qualquer Magia ou Feitiço dentro de seu alcance de ameaça, o personagem pode realizar um ataque de oportunidade.",
            efeitos: {
                desbloqueia: ['detectar_magia', 'identificar_conjuradores'],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                especial: ['ataque_oportunidade_contra_conjuracao_em_alcance']
            }
        },
        {
            nivel: 2,
            descricao: "Aumenta a resistência contra magia. Efeitos mágicos que possuem uma chance de sucesso em porcentagem têm 10% menos chance de ter sucesso.",
            efeitos: {
                desbloqueia: [],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                chancePorcentagem: -10,
                especial: ['reducao_10_porcento_efeitos_magicos']
            }
        },
        {
            nivel: 3,
            descricao: "Permite interromper o efeito de Magias ou Feitiços. Ao realizar ataques contra um conjurador, o personagem pode tentar desfazer um Feitiço ou Magia com duração maior que instantâneo. Cada ataque que acertar tem 10% de chance de desfazer o efeito. Se o personagem impedir um efeito mágico, ele recebe um ponto de magia temporário até o próximo descanso longo ou curto.",
            efeitos: {
                desbloqueia: [],
                bonusAtaque: null,
                bonusDefesa: null,
                bonusHabilidade: {},
                chancePorcentagem: 10,
                especial: ['chance_dissipar_magia_por_ataque', 'ganhar_pm_temporario_ao_dissipar']
            }
        }
    ]
};

// ============================================================================
// ARRAYS E HELPERS
// ============================================================================

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

/**
 * Retorna os efeitos mecânicos de um nível específico de proficiência
 * @param {string} idOuNome - ID ou nome da proficiência
 * @param {number} nivel - Nível da proficiência
 * @returns {Object|null} efeitos do nível ou null
 */
export const getEfeitosProficiencia = (idOuNome, nivel) => {
    const nivelData = getProficienciaNivel(idOuNome, nivel);
    return nivelData?.efeitos || null;
};

/**
 * Verifica se um personagem possui uma proficiência em nível mínimo
 * @param {Object} proficienciasPersonagem - { profId: nivelAtual }
 * @param {string} profId - ID da proficiência a verificar
 * @param {number} nivelMinimo - Nível mínimo requerido (default: 1)
 * @returns {boolean}
 */
export const possuiProficiencia = (proficienciasPersonagem, profId, nivelMinimo = 1) => {
    const nivelAtual = proficienciasPersonagem?.[profId] || 0;
    return nivelAtual >= nivelMinimo;
};

/**
 * Retorna tudo que um nível de proficiência desbloqueia
 * @param {string} profId - ID da proficiência
 * @param {number} nivelAtual - Nível atual do personagem nesta proficiência
 * @returns {string[]} Array com todos os itens desbloqueados até aquele nível
 */
export const getDesbloqueiosCumulativos = (profId, nivelAtual) => {
    const prof = getProficiencia(profId);
    if (!prof) return [];
    const desbloqueios = [];
    for (const n of prof.niveis) {
        if (n.nivel <= nivelAtual && n.efeitos?.desbloqueia) {
            desbloqueios.push(...n.efeitos.desbloqueia);
        }
    }
    return desbloqueios;
};
