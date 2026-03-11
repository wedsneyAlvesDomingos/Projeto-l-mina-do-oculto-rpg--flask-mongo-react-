/**
 * Dados centralizados de Profissões do sistema Lâmina do Oculto v0.5
 *
 * Campos padronizados (TODO-JOB-002):
 *   nome, descricao, ambienteEmprego, rendaPorDia, chanceDeRisco,
 *   beneficiosFixos[], habilidades[{ nome, descricao, custoRegalia, efeitos[] }]
 *
 * Cada habilidade contém efeitos[] parseáveis (TODO-JOB-001).
 * Poções/venenos contêm efeitoMecanico{} (TODO-JOB-003).
 *
 * Usado em: criarPersonagem.js, characterSheet.js, Wiki/jobs
 */

// ============================================================================
// PROFISSÕES COMPLETAS
// ============================================================================

export const ferreiro = {
    nome: "Ferreiro",
    descricao: "Forjar um item: Para forjar um item como um ferreiro é necessário que um personagem faça um teste de força para trabalhar o metal e forjar um item e de destreza para refinar ou reforçar um item. A dificuldade vai ser decidida pelo mestre e pelo tempo gasto. Um ferreiro perde os materiais ao falhar em forjar ou refinar um mesmo item 3 vezes. No caso do refinamento, o armamento ou armadura se quebra e é perdido. O custo de produção de item é igual a metade de seu valor e para refinar é igual a ⅓ de seu valor (Arredondado para cima). Confira a wiki para mais informações",
    ambienteEmprego: "Forja média em cidades ou vilas.",
    rendaPorDia: 20,
    chanceDeRisco: null,
    beneficiosFixos: ["Custo de produção = metade do valor do item.", "Custo de refino = ⅓ do valor.", "Falhar 3 vezes na mesma peça destrói os materiais."],
    habilidades: [
        { nome: "Forja de Armaduras e Escudos de Metal - Nível 1", descricao: "Forja em aço e reforça armaduras em até +1.", custoRegalia: 1, efeitos: ["Pode forjar armaduras e escudos de aço.", "Pode reforçar armaduras em até +1."] },
        { nome: "Forja de Armaduras e Escudos de Metal - Nível 2", descricao: "Forja em aço, aço negro e reforça armaduras em até +2.", custoRegalia: 1, efeitos: ["Desbloqueia forja em aço negro.", "Pode reforçar armaduras em até +2."] },
        { nome: "Forja de Armaduras e Escudos de Metal - Nível 3", descricao: "Forja em aço, aço negro, mitralino e reforça armaduras em até +3.", custoRegalia: 1, efeitos: ["Desbloqueia forja em mitralino.", "Pode reforçar armaduras em até +3."] },
        { nome: "Forja de Armas de Metal (Dano e Acerto) - Nível 1", descricao: "Forja em aço e reforça armas em até +1.", custoRegalia: 1, efeitos: ["Pode forjar armas de aço.", "Pode reforçar armas em até +1 (dano e acerto)."] },
        { nome: "Forja de Armas de Metal (Dano e Acerto) - Nível 2", descricao: "Forja em aço, aço negro e reforça armas em até +2.", custoRegalia: 1, efeitos: ["Desbloqueia forja em aço negro.", "Pode reforçar armas em até +2 (dano e acerto)."] },
        { nome: "Forja de Armas de Metal (Dano e Acerto) - Nível 3", descricao: "Forja em aço, aço negro, mitralino, adamante e reforça armas em até +3.", custoRegalia: 1, efeitos: ["Desbloqueia forja em mitralino e adamante.", "Pode reforçar armas em até +3 (dano e acerto)."] },
        { nome: "Forja de Itens Gerais - Nível 1", descricao: "Forja em aço itens gerais como ferraduras, esferas de aço, alavancas, engrenagens e outros.", custoRegalia: 1, efeitos: ["Pode forjar itens gerais de aço (ferraduras, esferas, alavancas, engrenagens)."] },
        { nome: "Forja de Itens Gerais - Nível 2", descricao: "Forja em aço e outros metais comuns itens gerais como ferraduras, esferas de aço, alavancas, engrenagens e peças pequenas e complexas para mecanismos.", custoRegalia: 1, efeitos: ["Desbloqueia forja de peças complexas para mecanismos.", "Pode trabalhar com outros metais comuns."] }
    ]
};

export const criminoso = {
    nome: "Criminoso",
    descricao: "Pode conseguir emprego em qualquer lugar onde tenha multidões, estradas vazias ou becos. Aprende a usar Ferramentas de ladrão. Esta profissão rende 30 moedas de ouro por dia de trabalho. O criminoso tem 10% de chance de ser pego pela guarda.",
    ambienteEmprego: "Pode conseguir emprego em qualquer lugar onde tenha multidões, estradas vazias ou becos.",
    rendaPorDia: 30,
    chanceDeRisco: "10% de ser pego",
    beneficiosFixos: ["Aprende a usar Ferramentas de ladrão em seu nível básico."],
    habilidades: [
        { nome: "Bater Carteiras", descricao: "Um criminoso consegue interagir com outra criatura em meio a multidão ou em uma trombada. Ao fazer um ou outro, o ladrão pode tentar pegar algum item dentre os pertences visíveis da criatura em questão. Um teste de agilidade determina o sucesso. A dificuldade do teste será decidida pelo mestre.", custoRegalia: 1, efeitos: ["Pode tentar pegar itens visíveis de outra criatura em meio à multidão ou em uma trombada.", "Um teste de agilidade determina o sucesso, com dificuldade definida pelo mestre."] },
        { nome: "Abrir Fechaduras", descricao: "Ganha dois pontos na proficiência em Ferramentas de ladrão. Além disso, recebe um bônus de +2 em testes para abrir portas e janelas em uma invasão.", custoRegalia: 1, efeitos: ["Ganha dois pontos na proficiência em Ferramentas de ladrão.", "+2 em testes para abrir portas e janelas em uma invasão."] },
        { nome: "Esconder Itens Ilegais", descricao: "Um ladrão pode tentar esconder um item roubado dentro de sua roupa, ou um assassino esconder uma adaga. Criminosos tem um jeito diferente de fazer essas pequenas coisas. Ao fazer um teste de furtividade para esconder um item ilegal o criminoso tem vantagem na rolagem do dado.", custoRegalia: 1, efeitos: ["Vantagem no teste de furtividade para esconder um item ilegal."] }
    ]
};

export const mercador = {
    nome: "Mercador",
    descricao: "Mercador especializado em comércio e negociação de bens.",
    ambienteEmprego: "Pode conseguir emprego em qualquer lugar onde tenha comércio de médio porte.",
    rendaPorDia: 0,
    chanceDeRisco: null,
    beneficiosFixos: [],
    habilidades: [
        { nome: "Melhorar Preços", descricao: "Um mercador pode fazer um teste de negociação para tentar descontos em preços de produtos ou serviços. Ao fazer o teste o mercador consegue uma porcentagem a cada 5 pontos do rolamento. Desconto varia conforme a rolagem: 5% (0-5), 10% (6-10), 15% (11-15), 25% (16-20), 30% (21-25), 35% (26+).", custoRegalia: 1, efeitos: ["Pode fazer um teste de negociação para conseguir descontos.", "Desconto varia conforme a rolagem: 5% (0-5), 10% (6-10), 15% (11-15), 25% (16-20), 30% (21-25), 35% (26+)."] },
        { nome: "Reunir Informações", descricao: "Um mercador pode gastar 1 hora conversando com mercadores em uma cidade ou região para reunir informações. Um teste de persuasão é necessário para definir se houve sucesso na tentativa. A dificuldade do teste vai ser decidida pelo mestre de acordo com a informação a ser reunida.", custoRegalia: 1, efeitos: ["Gasta 1 hora conversando para obter informações.", "Requer teste de persuasão com dificuldade determinada pelo mestre."] }
    ],
    sistemasEspeciais: {
        "Rolamento de Negociação": {
            tabelas: {
                "Desconto por Rolagem": { "0-5": "5%", "6-10": "10%", "11-15": "15%", "16-20": "25%", "21-25": "30%", "26+": "35%" }
            }
        }
    }
};

export const explorador = {
    nome: "Explorador",
    descricao: "Guia e rastreador especializado em ambientes selvagens.",
    ambienteEmprego: "Pode conseguir emprego em qualquer lugar onde tenha viajantes necessitados e aventureiros estrangeiros.",
    rendaPorDia: 20,
    chanceDeRisco: null,
    beneficiosFixos: [],
    habilidades: [
        { nome: "Guiar", descricao: "O explorador consegue guiar um grupo de pessoas por um terreno de maneira furtiva para não chamar atenção. Uma equipe com um explorador os guiando ganha +2 em teste de furtividade e navegação. Se um explorador rolar um 20 no D20 em um teste de furtividade, os aliados do grupo automaticamente passam no teste também.", custoRegalia: 1, efeitos: ["+2 em testes de furtividade e navegação para o grupo.", "Se o explorador tirar 20 no teste de furtividade, todos aliados automaticamente passam no teste."] },
        { nome: "Rastrear Pistas", descricao: "O explorador pode tentar rastrear outra criatura ou um grupo de maneira excepcional. Um explorador pode considerar um rolamento de 12 ou menor em um D20 como 12 em um teste para rastrear através de pistas e pegadas.", custoRegalia: 1, efeitos: ["Rolagens de 12 ou menor são consideradas como 12 em testes de rastrear."] },
        { nome: "Facilidade em Encontrar Recursos na Natureza", descricao: "Ao tentar fazer um teste de sobrevivência um explorador consegue o dobro de recursos que conseguiria normalmente. Sempre consegue encontrar abrigo em um ambiente para descansar.", custoRegalia: 1, efeitos: ["Dobra os recursos obtidos em testes de sobrevivência.", "Sempre encontra abrigo para descansar na natureza."] }
    ]
};

export const academico = {
    nome: "Acadêmico",
    descricao: "Erudito com conhecimento de civilizações antigas, mapas e bibliotecas restritas.",
    ambienteEmprego: "Pode conseguir emprego em qualquer lugar onde tenha uma academia ou nobre precisando de tutores.",
    rendaPorDia: 40,
    chanceDeRisco: null,
    beneficiosFixos: [],
    habilidades: [
        { nome: "Elaborar Mapas", descricao: "Um acadêmico que estude mapas pode criar um mapa do caminho trilhado pelo seu grupo de aliados. Ao criar esse mapa pode retornar para o ponto inicial do caminho traçado sem se perder.", custoRegalia: 1, efeitos: ["Permite retornar ao ponto inicial de uma viagem com precisão total ao usar um mapa elaborado."] },
        { nome: "Conhecimento de Civilizações Antigas", descricao: "Um personagem que possui conhecimento de civilizações antigas tem um bônus de navegação dentro de tumbas e ruínas igual a 2 pontos adicionais. Ganha 3 pontos de proficiência em Línguas Antigas. Testes de investigação para encontrar artefatos e outras coisas ganham um bônus de 5 pontos adicionais.", custoRegalia: 1, efeitos: ["+2 de navegação em tumbas e ruínas.", "+3 em proficiência em Línguas Antigas.", "+5 em testes de investigação para encontrar artefatos."] },
        { nome: "Acesso a Bibliotecas e Setores de Estudos Privados", descricao: "Tem uma autorização para entrar em bibliotecas proibidas para o público não acadêmico.", custoRegalia: 1, efeitos: ["Entrada permitida em bibliotecas e setores de pesquisa proibidos ao público geral."] },
        { nome: "Arqueólogo", descricao: "Recebe 3 pontos de proficiência em Arqueologia.", custoRegalia: 1, efeitos: ["+3 em proficiência em Arqueologia."] }
    ]
};

// ============================================================================
// POÇÕES, VENENOS, PLANTAS E MONSTROS DO HERBALISTA (TODO-JOB-003)
// ============================================================================

export const pocoesHerbalista = [
    { nome: "Poção de saciedade", magica: false, alquimia: true, efeito: "Poção que deixa uma criatura hidratada e alimentada por um dia inteiro.", duracao: "24 horas", custo: "10 M.O.", efeitoMecanico: { curaHP: null, vidaTemporaria: null, bonusDefesa: null, condicaoAplicada: null, condicaoRemovida: null, modificadorVelocidade: null, acoesExtras: null, saciedade: true, duracaoHoras: 24 } },
    { nome: "Poção de velocidade", magica: true, alquimia: false, efeito: "Poção que dobra a velocidade do movimento de uma criatura.", duracao: "10 minutos", custo: "100 M.O.", efeitoMecanico: { curaHP: null, vidaTemporaria: null, bonusDefesa: null, condicaoAplicada: null, condicaoRemovida: null, modificadorVelocidade: 'dobro', acoesExtras: null, duracaoRodadas: 100 } },
    { nome: "Poção de velocidade maior", magica: true, alquimia: false, efeito: "Poção que dobra a velocidade do movimento de uma criatura e aumenta em 1 o número total de ações em um turno, para um total de 4.", duracao: "1 minuto", custo: "200 M.O.", efeitoMecanico: { curaHP: null, vidaTemporaria: null, bonusDefesa: null, condicaoAplicada: null, condicaoRemovida: null, modificadorVelocidade: 'dobro', acoesExtras: 1, duracaoRodadas: 10 } },
    { nome: "Poção de invisibilidade", magica: true, alquimia: false, efeito: "A criatura fica invisível até realizar um ataque ou interagir com outra criatura de alguma forma. Enquanto invisível a criatura está Obscurecida.", duracao: "1 hora", custo: "100 M.O.", efeitoMecanico: { curaHP: null, vidaTemporaria: null, bonusDefesa: null, condicaoAplicada: 'Obscurecida', condicaoRemovida: null, modificadorVelocidade: null, acoesExtras: null, duracaoRodadas: 600, quebraAoAtacar: true } },
    { nome: "Poção de cura", magica: false, alquimia: true, efeito: "Cura uma criatura em 10 pontos de vida.", duracao: "instantâneo", custo: "50 M.O.", efeitoMecanico: { curaHP: 10, vidaTemporaria: null, bonusDefesa: null, condicaoAplicada: null, condicaoRemovida: null, modificadorVelocidade: null, acoesExtras: null } },
    { nome: "Poção de cura maior", magica: false, alquimia: true, efeito: "Cura uma criatura em 50 pontos de vida.", duracao: "instantâneo", custo: "100 M.O.", efeitoMecanico: { curaHP: 50, vidaTemporaria: null, bonusDefesa: null, condicaoAplicada: null, condicaoRemovida: null, modificadorVelocidade: null, acoesExtras: null } },
    { nome: "Poção de cura suprema", magica: true, alquimia: false, efeito: "Cura uma criatura em 100 pontos de vida.", duracao: "instantâneo", custo: "200 M.O.", efeitoMecanico: { curaHP: 100, vidaTemporaria: null, bonusDefesa: null, condicaoAplicada: null, condicaoRemovida: null, modificadorVelocidade: null, acoesExtras: null } },
    { nome: "Poção de cura completa", magica: true, alquimia: false, efeito: "Cura uma criatura em 150 pontos de vida.", duracao: "instantâneo", custo: "400 M.O.", efeitoMecanico: { curaHP: 150, vidaTemporaria: null, bonusDefesa: null, condicaoAplicada: null, condicaoRemovida: null, modificadorVelocidade: null, acoesExtras: null } },
    { nome: "Poção de Armadura", magica: true, alquimia: false, efeito: "Aumenta a defesa de uma pessoa sem armadura em +6", duracao: "12 horas", custo: "100 M.O.", efeitoMecanico: { curaHP: null, vidaTemporaria: null, bonusDefesa: 6, condicaoAplicada: null, condicaoRemovida: null, modificadorVelocidade: null, acoesExtras: null, duracaoHoras: 12, apenaSemArmadura: true } },
    { nome: "Poção de Crescimento", magica: true, alquimia: false, efeito: "Aumenta em 1 o tamanho de uma criatura.", duracao: "1 minuto", custo: "100 M.O.", efeitoMecanico: { curaHP: null, vidaTemporaria: null, bonusDefesa: null, condicaoAplicada: null, condicaoRemovida: null, modificadorVelocidade: null, acoesExtras: null, modificadorTamanho: 1, duracaoRodadas: 10 } },
    { nome: "Poção de redução", magica: true, alquimia: false, efeito: "Diminui em 2 o tamanho de uma criatura. Máximo de minúsculo.", duracao: "1 minuto", custo: "100 M.O.", efeitoMecanico: { curaHP: null, vidaTemporaria: null, bonusDefesa: null, condicaoAplicada: null, condicaoRemovida: null, modificadorVelocidade: null, acoesExtras: null, modificadorTamanho: -2, duracaoRodadas: 10 } },
    { nome: "Poção de transformação animal", magica: true, alquimia: false, efeito: "Transforma-se em um animal de tamanho pequeno ou médio. Completamente transforma a forma física mas não a mental.", duracao: "1 hora", custo: "100 M.O.", efeitoMecanico: { curaHP: null, vidaTemporaria: null, bonusDefesa: null, condicaoAplicada: null, condicaoRemovida: null, modificadorVelocidade: null, acoesExtras: null, transformacao: 'animal', duracaoRodadas: 600 } },
    { nome: "Poção de coragem", magica: false, alquimia: true, efeito: "Imune a aterrorizado pela duração", duracao: "8 horas", custo: "50 M.O.", efeitoMecanico: { curaHP: null, vidaTemporaria: null, bonusDefesa: null, condicaoAplicada: null, condicaoRemovida: 'Aterrorizado', modificadorVelocidade: null, acoesExtras: null, imunidade: ['Aterrorizado'], duracaoHoras: 8 } },
    { nome: "Poção de disfarce", magica: true, alquimia: false, efeito: "Transforma a aparência de uma criatura para outra de mesmo tamanho. Não é uma ilusão, porém não altera a capacidade física de quem toma a poção.", duracao: "1 hora", custo: "50 M.O.", efeitoMecanico: { curaHP: null, vidaTemporaria: null, bonusDefesa: null, condicaoAplicada: null, condicaoRemovida: null, modificadorVelocidade: null, acoesExtras: null, disfarce: true, duracaoRodadas: 600 } },
    { nome: "Poção de silêncio", magica: true, alquimia: false, efeito: "Reduz todo som produzido por voz, roupa e itens de um indivíduo para um alcance de 3 metros, qualquer criatura fora desse alcance não consegue ouvir a criatura que tomou a poção andar ou falar.", duracao: "10 minutos", custo: "30 M.O.", efeitoMecanico: { curaHP: null, vidaTemporaria: null, bonusDefesa: null, condicaoAplicada: null, condicaoRemovida: null, modificadorVelocidade: null, acoesExtras: null, silencioAlcance: 3, duracaoRodadas: 100 } }
];

export const venenosAnimais = [
    { nome: "Cobra", efeito: "Causa 6 pontos por rodada e deixa a vítima Devagar.", duracao: "Durabilidade do veneno", custo: "20 M.O.", testeFortitude: 10, efeitoMecanico: { danoPorRodada: 6, danoImediato: 0, condicaoAplicada: 'Devagar', tipo: 'animal' } },
    { nome: "Aranha", efeito: "Causa 7 de dano imediato e 2 por rodada.", duracao: "Durabilidade do veneno", custo: "30 M.O.", testeFortitude: 10, efeitoMecanico: { danoPorRodada: 2, danoImediato: 7, condicaoAplicada: null, tipo: 'animal' } },
    { nome: "Escorpião", efeito: "Causa 6 de dano imediato e 2 por rodada.", duracao: "Durabilidade do veneno", custo: "20 M.O.", testeFortitude: 10, efeitoMecanico: { danoPorRodada: 2, danoImediato: 6, condicaoAplicada: null, tipo: 'animal' } },
    { nome: "Abelhas", efeito: "Deixa a vítima com a condição Enfraquecido.", duracao: "Durabilidade do veneno", custo: "10 M.O.", testeFortitude: 14, efeitoMecanico: { danoPorRodada: 0, danoImediato: 0, condicaoAplicada: 'Enfraquecido', tipo: 'animal' } },
    { nome: "Vespas", efeito: "Causa 10 de dano imediato e 2 por rodada.", duracao: "Durabilidade do veneno", custo: "20 M.O.", testeFortitude: 12, efeitoMecanico: { danoPorRodada: 2, danoImediato: 10, condicaoAplicada: null, tipo: 'animal' } },
    { nome: "Água viva", efeito: "Causa à vítima dor intensa e queima a pele, 6 de dano por rodada.", duracao: "Durabilidade do veneno", custo: "10 M.O.", testeFortitude: 10, efeitoMecanico: { danoPorRodada: 6, danoImediato: 0, condicaoAplicada: null, tipo: 'animal' } },
    { nome: "Sapos", efeito: "Causa à vítima a condição Paralisado.", duracao: "Durabilidade do veneno", custo: "50 M.O.", testeFortitude: 10, efeitoMecanico: { danoPorRodada: 0, danoImediato: 0, condicaoAplicada: 'Paralisado', tipo: 'animal' } },
    { nome: "Larva de mariposa", efeito: "Causa feridas na pele da vítima, 1d12 de dano por rodada.", duracao: "Durabilidade do veneno", custo: "20 M.O.", testeFortitude: 10, efeitoMecanico: { danoPorRodada: '1d12', danoImediato: 0, condicaoAplicada: null, tipo: 'animal' } },
    { nome: "Peixe", efeito: "Causa à vítima danos internos, 1d12 de dano por rodada.", duracao: "Durabilidade do veneno", custo: "20 M.O.", testeFortitude: 10, efeitoMecanico: { danoPorRodada: '1d12', danoImediato: 0, condicaoAplicada: null, tipo: 'animal' } },
    { nome: "Besouro", efeito: "Causa dor local e queimação e deixa Incapacitado.", duracao: "Durabilidade do veneno", custo: "10 M.O.", testeFortitude: 10, efeitoMecanico: { danoPorRodada: 0, danoImediato: 0, condicaoAplicada: 'Incapacitado', tipo: 'animal' } }
];

export const venenosPlantas = [
    { nome: "Aningapara", efeito: "Causa à vítima a condição Paralisado.", duracao: "Durabilidade do veneno", custo: "50 M.O.", testeFortitude: 10, efeitoMecanico: { danoPorRodada: 0, danoImediato: 0, condicaoAplicada: 'Paralisado', tipo: 'planta' } },
    { nome: "Saia Branca", efeito: "Causa à vítima a condição Aterrorizado.", duracao: "Durabilidade do veneno", custo: "30 M.O.", testeFortitude: 13, efeitoMecanico: { danoPorRodada: 0, danoImediato: 0, condicaoAplicada: 'Aterrorizado', tipo: 'planta' } },
    { nome: "Lírio do vale", efeito: "Causa feridas na pele da vítima, 1d12 de dano por rodada.", duracao: "Durabilidade do veneno", custo: "20 M.O.", testeFortitude: 10, efeitoMecanico: { danoPorRodada: '1d12', danoImediato: 0, condicaoAplicada: null, tipo: 'planta' } },
    { nome: "Olho de Boneca", efeito: "Causa à vítima danos internos, 1d12 de dano por rodada.", duracao: "Durabilidade do veneno", custo: "20 M.O.", testeFortitude: 10, efeitoMecanico: { danoPorRodada: '1d12', danoImediato: 0, condicaoAplicada: null, tipo: 'planta' } }
];

export const venenosMonstros = [
    { nome: "Basilisco", efeito: "Causa à vítima a condição Paralisado.", duracao: "Durabilidade do veneno", custo: "50 M.O.", efeitoMecanico: { danoPorRodada: 0, danoImediato: 0, condicaoAplicada: 'Paralisado', tipo: 'monstro' } },
    { nome: "Wyrm", efeito: "Causa 10 de dano imediato e 4 por rodada.", duracao: "Durabilidade do veneno", custo: "30 M.O.", efeitoMecanico: { danoPorRodada: 4, danoImediato: 10, condicaoAplicada: null, tipo: 'monstro' } },
    { nome: "Manticora", efeito: "Causa à vítima as condições Aterrorizado e Devagar.", duracao: "Durabilidade do veneno", custo: "40 M.O.", efeitoMecanico: { danoPorRodada: 0, danoImediato: 0, condicaoAplicada: ['Aterrorizado', 'Devagar'], tipo: 'monstro' } },
    { nome: "Sandworm", efeito: "Causa à vítima a condição Enfraquecido e adiciona um nível de Cansado.", duracao: "Durabilidade do veneno", custo: "30 M.O.", efeitoMecanico: { danoPorRodada: 0, danoImediato: 0, condicaoAplicada: 'Enfraquecido', nivelCansaco: 1, tipo: 'monstro' } }
];

export const herbalista = {
    nome: "Herbalista",
    descricao: "Duração de venenos: Colocar em armas e projéteis: Dura 5 rodadas após acertar o alvo com a arma envenenada. Se atacar novamente com veneno, o mesmo alvo apenas reseta o tempo, caso seja outro veneno reseta o tempo e muda o efeito mas não acumula. Caso passe no teste de resistência, com a dificuldade exibida na tabela, o alvo não sofre o efeito extra e só toma o dano ao contato, mas o dano não persiste. Na comida ou outra forma de ingestão: Se misturar vários venenos apenas irá causar o dano e efeito do mais forte. Um teste de fortitude define se ocorrerá o efeito e se o dano será total ou metade, se o alvo passar no teste será metade do dano e nenhum efeito. A dificuldade do teste é baseada num teste de medicina feito na hora de criar o veneno. O dano dura 10 rodadas.",
    ambienteEmprego: "Pode conseguir emprego em qualquer lugar onde tenha laboratórios, curandeiros e lojas de poções.",
    rendaPorDia: 20,
    chanceDeRisco: null,
    beneficiosFixos: ["Poções feitas pelo próprio herbalista custam 3x menos que em lojas, pagando apenas pelos materiais."],
    habilidades: [
        { nome: "Produção de Poções", descricao: "Consegue produzir poções a partir de ervas e soluções alquímicas. Possui um custo em materiais de acordo com a tabela na página wiki. Chance para criação de poções de 30% (acima ou igual a 15 no rolamento de um D20)", custoRegalia: 1, efeitos: ["Custo em materiais conforme tabela.", "Necessário teste de alquimia para produção.", "Chance de sucesso: 30% (≥15 no D20)."] },
        { nome: "Produção de Venenos Naturais", descricao: "Consegue extrair e preparar venenos de bestas e plantas naturais para aplicar em armas e misturar em líquidos para consumo. Possui um custo mínimo em materiais de 10 moedas. Venenos e peçonhas de animal tem duração de acordo com seu uso e seu dano mínimo é de 1 ponto por rodada ou maior. Venenos de planta tem duração de acordo com seu uso e seu dano mínimo é de 3 pontos por rodada ou maior. Chance para criação de venenos de 30% (acima ou igual a 15 no rolamento de um D20)", custoRegalia: 1, efeitos: ["Dano e efeitos conforme tabela.", "Custo mínimo de materiais: 10 M.O.", "Necessário teste de alquimia para produção.", "Chance de sucesso: 30% (≥15 no D20)."] },
        { nome: "Produção de Venenos de Monstros", descricao: "Consegue extrair e preparar venenos de anomalias e monstros para aplicar em armas e misturar em líquidos para consumo. Venenos e peçonhas de monstros tem duração de acordo com seu uso e seu dano mínimo é de 5 pontos por rodada. Chance para criação de venenos de 30% (acima ou igual a 15 no rolamento de um D20)", custoRegalia: 1, efeitos: ["Dano e efeitos conforme tabela.", "Necessário teste de alquimia para produção.", "Chance de sucesso: 30% (≥15 no D20)."] },
        { nome: "Produção de Frascos de Veneno para Arremesso", descricao: "Consegue produzir frascos de veneno para arremesso e dano em área. Causa o dano do veneno em todas as criaturas em 10 pés do raio de explosão.", custoRegalia: 1, efeitos: ["Afeta todas as criaturas em um raio de 10 pés.", "Causa o dano do veneno aplicado."] },
        { nome: "Produção de Antídotos", descricao: "Produção de antídotos contra venenos de todos os tipos. Necessário um teste de alquimia para criar uma poção, veneno ou antídoto. Chance de 50% (acima ou igual a 17 no rolamento de um D20) com custo de 50M.O.", custoRegalia: 1, efeitos: ["Chance de sucesso: 50% (≥17 no D20).", "Custo: 50 M.O.", "Necessário teste de alquimia para produção."] }
    ],
    pocoes: pocoesHerbalista,
    venenos: venenosAnimais,
    plantas: venenosPlantas,
    monstros: venenosMonstros,
    producoes: [
        { nome: "Frasco de veneno", efeito: "Causa o dano do veneno em todas as criaturas em 10 pés do raio de explosão.", custo: "Produção com 1 ponto de regalia" },
        { nome: "Antídoto", efeito: "Antídoto contra venenos de todos os tipos.", custo: "50 M.O." }
    ]
};

export const alfaiate = {
    nome: "Alfaiate",
    descricao: "Produz e refina armaduras de tecido e couro, podendo torná-las encantáveis.",
    ambienteEmprego: "Cidades pequenas (costureiro de roupas básicas ou finas).",
    rendaPorDia: 40,
    chanceDeRisco: null,
    beneficiosFixos: ["Requer teste de Destreza.", "Produção leva 3 dias de trabalho."],
    habilidades: [
        { nome: "Produção de Itens e Armaduras de Tecido Encantáveis", descricao: "Produz itens e armaduras de tecido que podem ser encantados.", custoRegalia: 1, efeitos: ["Desbloqueia produção de itens de tecido encantáveis."] },
        { nome: "Refinar Armaduras Leves +1", descricao: "Fabrica e reforça armaduras leves em até +1.", custoRegalia: 1, efeitos: ["Pode fabricar armaduras leves.", "Pode reforçar armaduras leves em até +1."] },
        { nome: "Refinar Armaduras Leves +2", descricao: "Fabrica e reforça armaduras leves em até +2.", custoRegalia: 1, efeitos: ["Pode reforçar armaduras leves em até +2."] },
        { nome: "Refinar Armaduras Leves +3", descricao: "Fabrica e reforça armaduras leves em até +3.", custoRegalia: 1, efeitos: ["Pode reforçar armaduras leves em até +3."] },
        { nome: "Produção de Itens e Armaduras de Couro Encantáveis", descricao: "Produz itens e armaduras de couro que podem ser encantados.", custoRegalia: 1, efeitos: ["Desbloqueia produção de itens de couro encantáveis."] },
        { nome: "Refinar Armaduras Médias +1", descricao: "Fabrica e reforça armaduras médias em até +1.", custoRegalia: 1, efeitos: ["Pode fabricar armaduras médias.", "Pode reforçar armaduras médias em até +1."] },
        { nome: "Refinar Armaduras Médias +2", descricao: "Fabrica e reforça armaduras médias em até +2.", custoRegalia: 1, efeitos: ["Pode reforçar armaduras médias em até +2."] },
        { nome: "Refinar Armaduras Médias +3", descricao: "Fabrica e reforça armaduras médias em até +3.", custoRegalia: 1, efeitos: ["Pode reforçar armaduras médias em até +3."] }
    ],
    chanceDeSucesso: [
        { produto: "Armaduras ou itens de couro/tecido +1", chance: "80%", dificuldadeRolagem: "≥5 no D20" },
        { produto: "Armaduras ou itens de couro/tecido +2", chance: "60%", dificuldadeRolagem: "≥13 no D20" },
        { produto: "Armaduras ou itens de couro/tecido +3", chance: "40%", dificuldadeRolagem: "≥17 no D20" }
    ]
};

export const artista = {
    nome: "Artista",
    descricao: "Performer e comunicador que reúne informações e espalha rumores através de apresentações.",
    ambienteEmprego: "Qualquer lugar com público.",
    rendaPorDia: 20,
    chanceDeRisco: null,
    beneficiosFixos: [],
    habilidades: [
        { nome: "Reunir Informações", descricao: "Um Artista pode gastar 1 hora conversando com moradores, mendigos e outros artistas locais em uma cidade ou região para reunir informações. Um teste de persuasão ou sedução é necessário para definir se houve sucesso na tentativa. A dificuldade do teste vai ser decidida pelo mestre de acordo com a informação a ser reunida.", custoRegalia: 1, efeitos: ["Gasta 1 hora conversando para obter informações.", "Requer teste de persuasão ou sedução com dificuldade do mestre."] },
        { nome: "Espalhar Rumores", descricao: "Um Artista pode gastar 1 hora conversando com moradores, mendigos e outros artistas locais em uma cidade ou região para espalhar informações. Um teste de enganação ou sedução é necessário para definir se houve sucesso na tentativa. A dificuldade do teste vai ser decidida pelo mestre de acordo com a informação a ser reunida.", custoRegalia: 1, efeitos: ["Gasta 1 hora conversando para espalhar rumores.", "Requer teste de enganação ou sedução com dificuldade do mestre."] },
        { nome: "Causar Distrações", descricao: "Um Artista pode tentar usar a ação distrair na mesma ação que performar.", custoRegalia: 1, efeitos: ["Pode usar a ação Distrair na mesma ação que performar."] }
    ]
};

export const joalheiro = {
    nome: "Joalheiro",
    descricao: "Confecciona jóias simples e encantadas, além de apurar pedras preciosas.",
    ambienteEmprego: "Joalherias ou minas de pedras preciosas.",
    rendaPorDia: 50,
    chanceDeRisco: null,
    beneficiosFixos: [],
    habilidades: [
        { nome: "Confeccionar Jóias Simples", descricao: "Pode confeccionar, a partir de metais preciosos e gemas, jóias que podem ser vendidas.", custoRegalia: 1, efeitos: ["Pode produzir jóias vendáveis a partir de metais preciosos e gemas."] },
        { nome: "Confeccionar Jóias Encantadas", descricao: "Pode confeccionar, a partir de metais preciosos e gemas, jóias que podem ser encantadas e vendidas.", custoRegalia: 1, efeitos: ["Pode produzir jóias encantáveis a partir de metais preciosos e gemas."] },
        { nome: "Apurar Pedras Preciosas", descricao: "Pode determinar valor e identificar a pedra preciosa. Testes de natureza para identificar rochas recebem 5 pontos de bônus.", custoRegalia: 1, efeitos: ["Identifica tipo e valor de pedras preciosas.", "+5 em testes de natureza para identificar rochas."] }
    ]
};

export const inventor = {
    nome: "Inventor",
    descricao: "Teste de tecnologia deve ser feito para criar uma esquemática. Após criada, o mestre determina o valor e o que é necessário para construir a esquemática.",
    ambienteEmprego: "Grandes cidades (projetista de pontes/estruturas).",
    rendaPorDia: 60,
    chanceDeRisco: null,
    beneficiosFixos: ["Requer teste de Tecnologia para criar esquemáticas.", "Custo e duração da construção definidos pelo mestre."],
    habilidades: [
        { nome: "Elaborar Esquemáticas de Armas", descricao: "Elaborar melhorias para armas existentes ou novas armas.", custoRegalia: 1, efeitos: ["Pode projetar armas novas ou melhorar as existentes via esquemática."] },
        { nome: "Elaborar Esquemáticas de Armaduras", descricao: "Elaborar melhorias para armaduras existentes ou novas armaduras.", custoRegalia: 1, efeitos: ["Pode projetar armaduras novas ou melhorar as existentes via esquemática."] },
        { nome: "Elaborar Esquemáticas de Próteses", descricao: "Elaborar próteses para partes do corpo que faltam ou que nem existem.", custoRegalia: 1, efeitos: ["Pode projetar próteses funcionais para membros faltantes ou inexistentes."] },
        { nome: "Elaborar Esquemáticas de Veículos", descricao: "Elaborar melhorias para veículos existentes ou novos veículos.", custoRegalia: 1, efeitos: ["Pode projetar veículos novos ou melhorar os existentes via esquemática."] },
        { nome: "Elaborar Esquemáticas de Engenhocas", descricao: "Elaborar pequenos ou médios mecanismos, que podem ser constructos sem inteligência para entretenimento ou de utilidade determinada que não pode ser alterada.", custoRegalia: 1, efeitos: ["Pode projetar engenhocas e constructos não-sencientes de utilidade fixa."] },
        { nome: "Criar Constructos Semicientes", descricao: "Elaborar constructos sencientes.", custoRegalia: 1, efeitos: ["Pode projetar constructos com inteligência própria (semicientes)."] }
    ],
    tabelaSucesso: [
        { chance: "80%", rolagem: "≥5 no D20", precoSugerido: 5, complexidade: "simples" },
        { chance: "50%", rolagem: "≥11 no D20", precoSugerido: 15, complexidade: "média" },
        { chance: "30%", rolagem: "≥15 no D20", precoSugerido: 45, complexidade: "média-alta" },
        { chance: "10%", rolagem: "≥19 no D20", precoSugerido: 135, complexidade: "alta" }
    ]
};

export const carpinteiro = {
    nome: "Carpinteiro",
    descricao: "Trabalha com madeiras simples e exóticas para criar itens, armas e veículos.",
    ambienteEmprego: "Qualquer lugar com moradias ou móveis de madeira.",
    rendaPorDia: 20,
    chanceDeRisco: null,
    beneficiosFixos: ["Produção custa metade do preço.", "Refino custa um terço do valor."],
    habilidades: [
        { nome: "Produzir Itens de Madeira", descricao: "Produz itens de madeira simples ou exóticas (custa metade do preço).", custoRegalia: 1, efeitos: ["Pode produzir itens de madeira simples e exótica.", "Custo de produção = metade do valor."] },
        { nome: "Produzir Itens Encantáveis", descricao: "Produz itens de madeira que podem ser encantados.", custoRegalia: 1, efeitos: ["Desbloqueia produção de itens de madeira encantáveis."] },
        { nome: "Forjar Armas de Madeira +1", descricao: "Forja armas de madeira com reforço +1.", custoRegalia: 1, efeitos: ["Pode forjar armas de madeira.", "Pode reforçar armas de madeira em até +1."] },
        { nome: "Forjar Armas de Madeira +2", descricao: "Forja armas de madeira élfica com reforço +2.", custoRegalia: 1, efeitos: ["Desbloqueia madeira élfica.", "Pode reforçar armas de madeira em até +2."] },
        { nome: "Forjar Armas de Madeira +3", descricao: "Forja armas em madeiras exóticas com reforço +3.", custoRegalia: 1, efeitos: ["Desbloqueia madeiras exóticas (Ébano Ancião, Sangue).", "Pode reforçar armas de madeira em até +3."] },
        { nome: "Construir Veículos de Madeira", descricao: "Constrói veículos terrestres e aquáticos majoritariamente de madeira.", custoRegalia: 1, efeitos: ["Pode construir veículos terrestres e aquáticos de madeira."] },
        { nome: "Construir Veículos Exóticos de Madeira", descricao: "Constrói veículos exóticos de madeira com peças adicionais compradas.", custoRegalia: 1, efeitos: ["Pode construir veículos exóticos de madeira (requer peças compradas)."] }
    ],
    materiaisEspeciais: ["Madeira Simples", "Madeira Élfica", "Madeira de Ébano Ancião", "Madeira de Sangue"],
    chanceDeSucesso: [
        { tentativa: "arma de madeira", chance: "80%", rolagem: "≥5 no D20" },
        { tentativa: "item ou veículo", chance: "50%", rolagem: "≥11 no D20" }
    ]
};

export const arcanista = {
    nome: "Arcanista",
    descricao: "Encanta armas e armaduras com elementos mágicos e produz pergaminhos.",
    ambienteEmprego: "Itens militares ou academias de magia.",
    rendaPorDia: 40,
    chanceDeRisco: null,
    beneficiosFixos: ["Requer teste de Arcanismo para encantamentos."],
    habilidades: [
        { nome: "Encantar Armas +1d4 - Nível 1", descricao: "Pode encantar armas com um bônus de dano elemental. Escolha apenas um dos elementos por arma. Bônus de dano +1d4 de dano. Para encantar é preciso usar linguagem arcana ou runas, que possuem materiais base que custam 100 moedas de ouro.", custoRegalia: 1, efeitos: ["+1d4 de dano elemental (escolher 1 elemento por arma).", "Custo de materiais: 100 M.O."] },
        { nome: "Encantar Armas +2d4 - Nível 2", descricao: "Pode encantar armas com um bônus de dano elemental. Escolha apenas um dos elementos mágicos por arma. Bônus de dano +2d4 de dano. Para encantar é preciso usar linguagem arcana ou runas, que possuem materiais base que custam 100 moedas de ouro se a arma já estava encantada em +1. Caso seja o primeiro encantamento da arma, custam 400 moedas de ouro em materiais.", custoRegalia: 1, efeitos: ["+2d4 de dano elemental (escolher 1 elemento por arma).", "Custo: 100 M.O. se já encantada +1, senão 400 M.O."] },
        { nome: "Encantar Armas +3d4 - Nível 3", descricao: "Pode encantar armas com um bônus de dano elemental. Escolha apenas um dos 8 elementos por arma. Bônus de dano +3d4 de dano. Para encantar é preciso usar linguagem arcana ou runas, que possuem materiais base que custam 100 moedas de ouro se a arma já estava encantada em +2. Caso seja o primeiro encantamento da arma, custam 600 moedas de ouro em materiais.", custoRegalia: 1, efeitos: ["+3d4 de dano elemental (escolher entre 8 elementos).", "Custo: 100 M.O. se já encantada +2, senão 600 M.O."] },
        { nome: "Mudar Tipo de Dano", descricao: "Pode mudar o tipo de dano da arma. Custa 100 moedas de ouro para mudar o elemento da arma corpo a corpo. Armas que causem atiram projéteis não podem sofrer essa mudança.", custoRegalia: 1, efeitos: ["Pode mudar o elemento de dano de arma corpo a corpo.", "Custo: 100 M.O.", "Não funciona em armas de projétil."] },
        { nome: "Encantar Proteção +1 - Nível 1", descricao: "+1 em defesa em armaduras leves/roupas/jóias (150 M.O.).", custoRegalia: 1, efeitos: ["+1 de bônus de defesa em armaduras leves, roupas ou jóias.", "Custo: 150 M.O."] },
        { nome: "Encantar Proteção +2 - Nível 2", descricao: "+2 em defesa (pré-req: +1; 300 M.O.).", custoRegalia: 1, efeitos: ["+2 de bônus de defesa (requer encantamento +1 prévio).", "Custo: 300 M.O."] },
        { nome: "Reforço de Dano Elemental +2 - Nível 3", descricao: "+2 no dano elemental de magias (100 M.O.).", custoRegalia: 1, efeitos: ["+2 no dano de magias elementais.", "Custo: 100 M.O."] },
        { nome: "Reforço de Dano Elemental +4 - Nível 4", descricao: "+4 no dano elemental de magias (pré-req: +2; 300 M.O.).", custoRegalia: 1, efeitos: ["+4 no dano de magias elementais (requer +2 prévio).", "Custo: 300 M.O."] },
        { nome: "Produzir Pergaminhos", descricao: "Pode replicar o efeito de magias, milagres e feitiços que o personagem tenha conhecimento. Para criar um pergaminho é preciso gastar 50 moedas de ouro em papel e tinta mágicos. Pergaminhos podem ser utilizados por qualquer um e não consomem pontos de magia, porém são sempre conjurados na versão mais fraca da Habilidade replicada.", custoRegalia: 1, efeitos: ["Replica magias conhecidas em pergaminho.", "Custo: 50 M.O. por pergaminho.", "Usado por qualquer pessoa sem custo de PM.", "Sempre conjurado na versão mais fraca."] }
    ],
    tiposDeDano: ["Fogo", "Gelo", "Raio", "Terra", "Sombrio", "Sagrado", "Arcano", "Necrótico"],
    chanceDeSucesso: [
        { acao: "encantar arma/objeto", chance: "30%", rolagem: "≥15 no D20" },
        { acao: "criar pergaminho", chance: "20%", rolagem: "≥17 no D20" }
    ]
};

export const cozinheiro = {
    nome: "Cozinheiro",
    descricao: "Prepara rações especiais e alimentos restauradores que concedem bônus temporários.",
    ambienteEmprego: "Qualquer lugar com acesso a alimentos.",
    rendaPorDia: 15,
    chanceDeRisco: null,
    beneficiosFixos: [],
    habilidades: [
        { nome: "Produzir Rações Especiais", descricao: "O cozinheiro gasta metade do valor de uma ração para fazer duas. Além disso, a ração gera um bônus de 10 pontos de vida temporários depois de consumida.", custoRegalia: 1, efeitos: ["Custo de produção: metade do valor de 1 ração para 2 unidades.", "+10 PV temporários após consumir a ração."] },
        { nome: "Aprimorar Uso de Recursos Alimentícios", descricao: "Ao realizar testes de sobrevivência é possível buscar comida e água. Um cozinheiro consegue multiplicar esse recurso para o dobro de usos. Ao usar uma ração, o cozinheiro consegue transformar a comida para uma pessoa em comida para duas. Aumenta em 5 o teste de sobrevivência para encontrar comida e água.", custoRegalia: 1, efeitos: ["Dobra os recursos de comida/água obtidos em testes de sobrevivência.", "Uma ração alimenta 2 pessoas.", "+5 em testes de sobrevivência para encontrar comida e água."] },
        { nome: "Cozinhar Alimentos Restauradores", descricao: "Um cozinheiro pode cozinhar rações que ao serem consumidas em um período de 10 minutos curam 10 pontos de vida perdidos e 3 de estâmina. Custa 10 moedas de ouro por ração.", custoRegalia: 1, efeitos: ["Ração restauradora: cura 10 PV + 3 PE (consumo em 10 min).", "Custo: 10 M.O. por ração."] }
    ]
};

export const soldadoDeAluguel = {
    nome: "Soldado de Aluguel",
    descricao: "Mercenário versátil que atua como marinheiro, segurança, capanga ou treinador militar.",
    ambienteEmprego: "Área portuária, segurança ou periferias.",
    rendaPorDia: 25,
    chanceDeRisco: "Variável conforme o serviço",
    beneficiosFixos: [],
    habilidades: [
        { nome: "Trabalhar como Marinheiro", descricao: "Um soldado de aluguel com esse traço tem capacidade de procurar emprego na área portuária em navios e afins. Esses soldados conseguem passagem em troca de serviço e também tem um bônus de navegação em +5 em alto mar.", custoRegalia: 1, efeitos: ["Consegue passagem marítima em troca de serviço.", "+5 em testes de navegação em alto mar."] },
        { nome: "Trabalhar como Segurança", descricao: "Um soldado de aluguel com esse traço tem capacidade de procurar por empregos em cidades e vilas como protetor de um estabelecimento, carregamento ou pessoa. Um soldado que tenha essa experiência ganha um bônus de 3 em percepção enquanto estiver como em trabalho de guarda ou em turno de vigia em um acampamento.", custoRegalia: 1, efeitos: ["+3 em Percepção enquanto em trabalho de guarda ou vigia."] },
        { nome: "Trabalhar como Capanga de Agiota", descricao: "Um soldado de aluguel com esse traço tem conexões com pessoas de caráter duvidoso e consegue serviços em periferias e cidades grandes. Um soldado que tenha essa experiência ganha um bônus de 5 em intimidação para retirar informações de um inimigo.", custoRegalia: 1, efeitos: ["+5 em Intimidação para extrair informações."] },
        { nome: "Treinamento Militar", descricao: "Um soldado de aluguel com esse traço tem conexão com nobres e outros que desejam dar treinamento para seu filho ou funcionário a fim de fazer um soldado ou cavaleiro da pessoa. Um soldado que tenha essa experiência ganha um bônus de 5 em testes de Jurisprudência e negociação conversando com nobres.", custoRegalia: 1, efeitos: ["+5 em testes de Jurisprudência e negociação com nobres."] }
    ]
};

// ============================================================================
// ARRAY COMPLETO DE PROFISSÕES
// ============================================================================

export const profissoes = [
    ferreiro,
    criminoso,
    mercador,
    explorador,
    academico,
    herbalista,
    alfaiate,
    artista,
    joalheiro,
    inventor,
    carpinteiro,
    arcanista,
    cozinheiro,
    soldadoDeAluguel
];

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Busca uma profissão pelo nome
 * @param {string} nome - Nome da profissão
 * @returns {Object|null} Profissão encontrada ou null
 */
export const getProfissao = (nome) => {
    return profissoes.find(p => p.nome.toLowerCase() === nome.toLowerCase()) || null;
};

/**
 * Busca profissões por ambiente
 * @param {string} ambiente - Parte do texto do ambiente
 * @returns {Array} Profissões que contêm o ambiente especificado
 */
export const getProfissoesPorAmbiente = (ambiente) => {
    const searchTerm = ambiente.toLowerCase();
    return profissoes.filter(p => {
        const amb = p.ambienteEmprego || '';
        return amb.toLowerCase().includes(searchTerm);
    });
};

/**
 * Busca profissões com rendimento mínimo
 * @param {number} minimo - Rendimento mínimo
 * @returns {Array} Profissões com rendimento >= minimo
 */
export const getProfissoesComRendimento = (minimo = 0) => {
    return profissoes.filter(p => (p.rendaPorDia || 0) >= minimo);
};

/**
 * Retorna todas as poções disponíveis
 * @returns {Array} Lista de todas as poções
 */
export const getTodasPocoes = () => pocoesHerbalista;

/**
 * Retorna todos os venenos disponíveis
 * @returns {Object} Objeto com venenos por categoria
 */
export const getTodosVenenos = () => ({
    animais: venenosAnimais,
    plantas: venenosPlantas,
    monstros: venenosMonstros
});

/**
 * Busca uma poção pelo nome
 * @param {string} nome - Nome da poção
 * @returns {Object|null} Poção encontrada ou null
 */
export const getPocao = (nome) => {
    return pocoesHerbalista.find(p => p.nome.toLowerCase().includes(nome.toLowerCase())) || null;
};

/**
 * Filtra poções por tipo (mágica ou alquimia)
 * @param {boolean} magica - Se true, retorna poções mágicas; se false, alquímicas
 * @returns {Array} Poções filtradas
 */
export const getPocoesPorTipo = (magica) => {
    return pocoesHerbalista.filter(p => p.magica === magica);
};

/**
 * Busca um veneno pelo nome em qualquer categoria
 * @param {string} nome - Nome do veneno
 * @returns {Object|null} Veneno encontrado ou null
 */
export const getVeneno = (nome) => {
    const search = nome.toLowerCase();
    return [...venenosAnimais, ...venenosPlantas, ...venenosMonstros]
        .find(v => v.nome.toLowerCase().includes(search)) || null;
};

/**
 * Retorna todas as habilidades de todas as profissões
 * @returns {Array<{profissao: string, habilidade: Object}>} Lista flat
 */
export const getTodasHabilidadesProfissoes = () => {
    return profissoes.flatMap(p =>
        p.habilidades.map(h => ({ profissao: p.nome, ...h }))
    );
};

/**
 * Aplica efeito mecânico de uma poção a um personagem (retorna novo estado)
 * @param {Object} fichaState - Estado atual do personagem
 * @param {string} nomePocao - Nome da poção
 * @returns {{ fichaState: Object, mensagem: string }|null}
 */
export const aplicarPocao = (fichaState, nomePocao) => {
    const pocao = getPocao(nomePocao);
    if (!pocao?.efeitoMecanico) return null;

    const em = pocao.efeitoMecanico;
    const novo = { ...fichaState };
    const msgs = [];

    if (em.curaHP) {
        const pvMax = novo.pv_max || novo.pvMax || 999;
        const pvAntes = novo.pv_atual || 0;
        novo.pv_atual = Math.min(pvAntes + em.curaHP, pvMax);
        msgs.push(`+${novo.pv_atual - pvAntes} PV curados`);
    }
    if (em.vidaTemporaria) {
        novo.pv_temporario = (novo.pv_temporario || 0) + em.vidaTemporaria;
        msgs.push(`+${em.vidaTemporaria} PV temporários`);
    }
    if (em.bonusDefesa) {
        novo.bonusDefesaPocao = (novo.bonusDefesaPocao || 0) + em.bonusDefesa;
        msgs.push(`+${em.bonusDefesa} Defesa`);
    }
    if (em.condicaoRemovida) {
        const conds = novo.condicoes || {};
        delete conds[em.condicaoRemovida];
        novo.condicoes = { ...conds };
        msgs.push(`Removida condição: ${em.condicaoRemovida}`);
    }

    return { fichaState: novo, mensagem: `${pocao.nome}: ${msgs.join(', ') || pocao.efeito}` };
};
