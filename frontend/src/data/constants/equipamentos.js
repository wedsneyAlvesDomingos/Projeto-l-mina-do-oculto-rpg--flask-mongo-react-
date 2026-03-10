/**
 * Constantes de Equipamentos para o sistema Lâmina do Oculto RPG
 *
 * === SCHEMA ARMAS (TODO-EQP-001) ===
 * name, price, dano, critico, tipo, peso, description  — campos originais
 * tipoDano        — 'cortante'|'perfurante'|'impacto'|'fogo'|etc
 * alcance         — 'corpo-a-corpo'|'9/36 m'|etc
 * maos            — 1|2|'1ou2' (versátil)
 * categoriaProf   — 'simples'|'marcial'|'exotica'|'arma_de_fogo'
 * propriedades    — string[] tags mecânicas
 * efeitosEspeciais — [{ gatilho, efeito, mecanica? }] efeitos especiais
 *
 * === SCHEMA ARMADURAS (TODO-EQP-002) ===
 * categoriaProf   — 'pesada'|'media'|'leve'|'escudo'|'escudo_pesado'
 * penalidade      — { velocidade: float (m reduzidos), furtividade: int }
 *
 * Usado em: criarPersonagem.js, Character.js, Wiki/equipment
 */

// ============================================================================
// ARMADURAS PESADAS (EQP-002)
// ============================================================================
export const armadurasPesadas = [
    {
        name: "Loriga segmentada",
        price: 325,
        defesa: 16,
        forca: 2,
        tipo: "pesada",
        peso: 18,
        categoriaProf: "pesada",
        penalidade: { velocidade: -1.5, furtividade: -3 },
        description: "Composta de tiras horizontais de metal, esta armadura é pesada e resistente. Peça muito utilizada por legionários minotauros. Valor de Defesa 16."
    },
    {
        name: "O-Yoroi",
        price: 575,
        defesa: 17,
        forca: 3,
        tipo: "pesada",
        peso: 22,
        categoriaProf: "pesada",
        penalidade: { velocidade: -1.5, furtividade: -4 },
        description: "Usada pelos samurais, esta armadura é formada por pequenas placas metálicas unidas por nós de couro colorido. Inclui o kabuto, um elmo com uma máscara metálica. Valor de Defesa 17."
    },
    {
        name: "Cota de talas",
        price: 800,
        defesa: 18,
        forca: 3,
        tipo: "pesada",
        peso: 25,
        categoriaProf: "pesada",
        penalidade: { velocidade: -3, furtividade: -4 },
        description: "Armadura composta de talas de metal cuidadosamente costuradas sobre um corselete de couro. É a armadura tradicional do samurai, embora exista em versões nativas de todos os reinos. Valor de Defesa 18."
    },
    {
        name: "Meia armadura",
        price: 1000,
        defesa: 19,
        forca: 4,
        tipo: "pesada",
        peso: 30,
        categoriaProf: "pesada",
        penalidade: { velocidade: -3, furtividade: -5 },
        description: "Combinação de cota de malha e placas de metal posicionadas sobre as áreas vitais. Valor de Defesa 19."
    },
    {
        name: "Armadura completa",
        price: 1500,
        defesa: 20,
        forca: 5,
        tipo: "pesada",
        peso: 35,
        categoriaProf: "pesada",
        penalidade: { velocidade: -3, furtividade: -6 },
        description: "A mais forte e pesada, formada por placas de metal forjadas e encaixadas de modo a cobrir o corpo inteiro. Inclui manoplas e grevas, um elmo com viseira e um colete acolchoado para ser usado sob as placas. Esta armadura precisa ser feita sob medida; um ferreiro cobra 500 M.O. para adaptar uma armadura completa a um novo usuário. Bônus de Valor de Defesa 20."
    }
];

// ============================================================================
// ARMADURAS MÉDIAS (EQP-002)
// ============================================================================
export const armadurasMedidas = [
    {
        name: "Gibão de peles",
        price: 250,
        bonusDefesa: 3,
        tipo: "media",
        peso: 10,
        categoriaProf: "media",
        penalidade: { velocidade: 0, furtividade: -1 },
        description: "Usada principalmente por bárbaros e selvagens, esta armadura é formada por várias camadas de peles e couro de animais. Bônus de Valor de Defesa + 3."
    },
    {
        name: "Couraça",
        price: 375,
        bonusDefesa: 4,
        tipo: "media",
        peso: 12,
        categoriaProf: "media",
        penalidade: { velocidade: 0, furtividade: -2 },
        description: "Peitoral de aço que protege o peito e as costas. Popular entre nobres e oficiais. Bônus de Valor de Defesa + 4."
    },
    {
        name: "Cota de malha",
        price: 750,
        bonusDefesa: 5,
        tipo: "media",
        peso: 15,
        categoriaProf: "media",
        penalidade: { velocidade: -1.5, furtividade: -3 },
        description: "Longa veste de anéis metálicos interligados, formando uma malha flexível e resistente, que vai até os joelhos. Bônus de Valor de Defesa + 5."
    },
    {
        name: "Brunéia",
        price: 1000,
        bonusDefesa: 6,
        tipo: "media",
        peso: 14,
        categoriaProf: "media",
        penalidade: { velocidade: -1.5, furtividade: -3 },
        description: "Colete de couro coberto com plaquetas de metal sobrepostas, como escamas de um peixe. Bônus de Valor de Defesa + 6."
    }
];

// ============================================================================
// ARMADURAS LEVES (EQP-002)
// ============================================================================
export const armadurasLeves = [
    {
        name: "Armadura Acolchoada",
        price: 100,
        bonusDefesa: 1,
        tipo: "leve",
        peso: 4,
        categoriaProf: "leve",
        penalidade: { velocidade: 0, furtividade: 0 },
        description: "Composta por várias camadas de tecido sobrepostas. É a armadura mais leve, mas também é a que oferece menos proteção. Bônus de Valor de Defesa + 1."
    },
    {
        name: "Corset de Couro",
        price: 200,
        bonusDefesa: 2,
        tipo: "leve",
        peso: 5,
        categoriaProf: "leve",
        penalidade: { velocidade: 0, furtividade: 0 },
        description: "O peitoral desta armadura é feito de couro curtido, misturado com tecido para ter mobilidade. Bônus de Valor de Defesa + 2."
    },
    {
        name: "Camisa de Cota de Malha",
        price: 400,
        bonusDefesa: 3,
        tipo: "leve",
        peso: 6,
        categoriaProf: "leve",
        penalidade: { velocidade: 0, furtividade: -1 },
        description: "Versão mais leve da cota de malha, cobrindo apenas o torso. Bônus de Valor de Defesa + 3."
    },
    {
        name: "Couro Batido",
        price: 600,
        bonusDefesa: 4,
        tipo: "leve",
        peso: 7,
        categoriaProf: "leve",
        penalidade: { velocidade: 0, furtividade: -1 },
        description: "Versão mais pesada do corselete de couro, reforçada com rebites de metal. Bônus de Valor de Defesa + 4."
    },
    {
        name: "Armadura Cerimonial",
        price: 1000,
        bonusDefesa: 5,
        tipo: "leve",
        peso: 8,
        categoriaProf: "leve",
        penalidade: { velocidade: 0, furtividade: -1 },
        description: "Formada por uma couraça de bronze, aço e outros metais. Uma manga de couro e um grande elmo detalhado com viseira dão contraste ao peitoral colorido. Para efeitos de beleza e funcionalidade, a armadura de cerimonial é considerada uma armadura leve. Bônus de Valor de Defesa + 5."
    }
];

// ============================================================================
// ESCUDOS (EQP-002)
// ============================================================================
export const escudos = [
    {
        name: "Escudo simples",
        price: 15,
        bonusDefesa: 2,
        peso: 3,
        categoriaProf: "escudo",
        penalidade: { velocidade: 0, furtividade: 0 },
        description: "Concede +2 no Valor de Defesa."
    },
    {
        name: "Escudo pesado",
        price: 30,
        bonusDefesa: 2,
        peso: 6,
        categoriaProf: "escudo_pesado",
        penalidade: { velocidade: -1.5, furtividade: -1 },
        description: "Ação Buscar Cobertura: posiciona no chão para cobertura completa contra um inimigo até seu próximo turno (não podendo atacar e seu movimento é reduzido pela metade). Escudo robusto que pode ser fincado no solo para proteção estática.",
        efeitosEspeciais: [
            { gatilho: 'acao', efeito: 'Buscar Cobertura: cobertura completa contra 1 inimigo até próximo turno', mecanica: 'Não pode atacar, movimento reduzido pela metade' }
        ]
    },
    {
        name: "Escudo de duelo",
        price: 50,
        bonusDefesa: 1,
        peso: 2,
        categoriaProf: "escudo",
        penalidade: { velocidade: 0, furtividade: 0 },
        description: "Reação: aparar um golpe para ganhar +2 no Valor de Defesa até o início do próximo turno. Escudo leve que permite aparar ataques com o braço livre.",
        efeitosEspeciais: [
            { gatilho: 'reacao', efeito: 'Aparar: +2 Valor de Defesa até início do próximo turno' }
        ]
    }
];

// ============================================================================
// ARMAS SIMPLES (EQP-001)
// ============================================================================
export const armasSimples = [
    {
        name: "Adaga",
        price: 2,
        dano: "1d4",
        critico: 19,
        tipo: "simples",
        peso: 0.5,
        tipoDano: "perfurante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "simples",
        propriedades: ["leve", "acuidade", "arremessavel"],
        efeitosEspeciais: [
            { gatilho: 'furtividade', efeito: '+4 em testes de Furtividade para escondê-la (ação Esconder)' },
            { gatilho: 'critico', efeito: '+3 de dano adicional após dobrar o dano' }
        ],
        description: "Esta faca afiada é muito usada por ladrões e assassinos, por ser facilmente escondida. O personagem recebe um bônus de +4 em testes de furtividade para escondê-la com a ação Esconder. Críticos têm 3 pontos de dano adicionais após dobrar o dano causado. Será considerado acerto crítico em 19 ou 20 no rolamento."
    },
    {
        name: "Adaga de mola",
        price: 4,
        dano: "1d4",
        critico: 19,
        tipo: "simples",
        peso: 0.5,
        tipoDano: "perfurante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "simples",
        propriedades: ["leve", "acuidade", "mecanismo_de_mola"],
        efeitosEspeciais: [
            { gatilho: 'acao_livre', efeito: 'Salta para a mão ao girar o pulso; 1x por combate' }
        ],
        description: "Esta adaga é mantida em uma tira de couro presa ao antebraço. Quando o usuário gira seu pulso de um jeito específico (ação livre), a adaga salta para sua mão. Funciona apenas uma vez por combate."
    },
    {
        name: "Arco curto",
        price: 25,
        dano: "1d6",
        critico: 20,
        tipo: "simples",
        peso: 1,
        tipoDano: "perfurante",
        alcance: "18/60 m",
        maos: 2,
        categoriaProf: "simples",
        propriedades: ["duas_maos", "municao"],
        efeitosEspeciais: [],
        description: "Uso comum em florestas e ambientes fechados, próprio para caçadas."
    },
    {
        name: "Azagaia",
        price: 4,
        dano: "1d6",
        critico: 20,
        tipo: "simples",
        peso: 1,
        tipoDano: "perfurante",
        alcance: "9/36 m",
        maos: 1,
        categoriaProf: "simples",
        propriedades: ["arremessavel"],
        efeitosEspeciais: [],
        description: "Lança curta e delgada usada como arma de arremesso por caçadores."
    },
    {
        name: "Bastão acolchoado",
        price: 5,
        dano: "1d4",
        critico: 20,
        tipo: "simples",
        peso: 2,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "simples",
        propriedades: ["duas_maos", "nao_letal"],
        efeitosEspeciais: [],
        description: "Um pedaço sólido de madeira, coberto por uma camada grossa de lã, causa dano não-letal."
    },
    {
        name: "Besta leve",
        price: 25,
        dano: "1d8",
        critico: 20,
        tipo: "simples",
        peso: 2,
        tipoDano: "perfurante",
        alcance: "24/96 m",
        maos: 2,
        categoriaProf: "simples",
        propriedades: ["duas_maos", "municao", "recarga"],
        efeitosEspeciais: [],
        description: "Um arco montado sobre uma coronha de madeira com gatilho, dispara virotes com grande potência."
    },
    {
        name: "Bordão",
        price: 0,
        dano: "1d6",
        critico: 20,
        tipo: "simples",
        peso: 1.5,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "simples",
        propriedades: ["duas_maos"],
        efeitosEspeciais: [],
        description: "Um cajado apreciado por viajantes e camponeses; prático como uma clava e de custo zero."
    },
    {
        name: "Clava",
        price: 1,
        dano: "1d4",
        critico: 20,
        tipo: "simples",
        peso: 1,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "simples",
        propriedades: ["leve"],
        efeitosEspeciais: [],
        description: "Pedaço de madeira usado como arma improvisada; custo zero."
    },
    {
        name: "Espada curta",
        price: 10,
        dano: "1d6",
        critico: 20,
        tipo: "simples",
        peso: 1,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "simples",
        propriedades: ["leve", "acuidade"],
        efeitosEspeciais: [
            { gatilho: 'combate_defensivo', efeito: '+1 acerto se usada com escudo e 1pt em Combate Defensivo' }
        ],
        description: "Espada de 40–50 cm, versátil e fácil de manejar. Combatente com 1 ponto em Combate Defensivo recebe +1 de acerto se usar esta arma com escudo."
    },
    {
        name: "Funda",
        price: 0.2,
        dano: "1d4",
        critico: 20,
        tipo: "simples",
        peso: 0.1,
        tipoDano: "impacto",
        alcance: "9/36 m",
        maos: 1,
        categoriaProf: "simples",
        propriedades: ["municao"],
        efeitosEspeciais: [
            { gatilho: 'dano', efeito: 'Aplica mod. de Força ao dano' },
            { gatilho: 'recarga', efeito: 'Colocar munição é uma ação' }
        ],
        description: "Tira de couro usada para arremessar balas de metal ou pedras. Aplica modificador de Força ao dano; colocar munição é ação."
    },
    {
        name: "Lança",
        price: 1,
        dano: "1d6/1d8",
        critico: 20,
        tipo: "simples",
        peso: 1.5,
        tipoDano: "perfurante",
        alcance: "corpo-a-corpo",
        maos: "1ou2",
        categoriaProf: "simples",
        propriedades: ["versatil", "arremessavel"],
        efeitosEspeciais: [],
        description: "Haste com ponta afiada; facilmente fabricada e arremessável."
    },
    {
        name: "Maça",
        price: 50,
        dano: "1d6",
        critico: 20,
        tipo: "simples",
        peso: 2,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "simples",
        propriedades: [],
        efeitosEspeciais: [
            { gatilho: 'tipo_alvo', efeito: 'Dobra dano contra constructos e esqueletos' }
        ],
        description: "Bastão metálico com peso protuberante, efetivo contra não mortos. Dobra o dano contra constructos e esqueletos."
    },
    {
        name: "Machadinha",
        price: 5,
        dano: "1d6",
        critico: 20,
        tipo: "simples",
        peso: 1,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "simples",
        propriedades: ["leve", "arremessavel"],
        efeitosEspeciais: [],
        description: "Ferramenta leve de corte que também funciona como arma arremessável."
    },
    {
        name: "Martelo leve",
        price: 2,
        dano: "1d4",
        critico: 20,
        tipo: "simples",
        peso: 1,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "simples",
        propriedades: ["leve", "arremessavel"],
        efeitosEspeciais: [],
        description: "Martelo pequeno útil como ferramenta e arma arremessável."
    },
    {
        name: "Tacape",
        price: 0,
        dano: "1d8",
        critico: 20,
        tipo: "simples",
        peso: 2,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "simples",
        propriedades: ["duas_maos"],
        efeitosEspeciais: [],
        description: "Clava grande, às vezes cravada de pregos, simples mas brutal."
    }
];

// ============================================================================
// ARMAS MARCIAIS (EQP-001)
// ============================================================================
export const armasMarciais = [
    {
        name: "Aji",
        price: 2,
        dano: "1d6",
        critico: 20,
        tipo: "marcial",
        peso: 0.5,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["leve", "dupla"],
        efeitosEspeciais: [
            { gatilho: 'dual_wield', efeito: 'Pode ser usada em ambas as mãos sem estilo especial' }
        ],
        description: "Peça metálica em forma de arco, onde a lâmina seria o arco propriamente dito e a empunhadura seria a corda. Pode ser usada em conjunto em ambas as mãos sem estilo especial."
    },
    {
        name: "Alabarda",
        price: 20,
        dano: "1d10",
        critico: 20,
        tipo: "marcial",
        peso: 3,
        tipoDano: "cortante",
        alcance: "3 m",
        maos: 2,
        categoriaProf: "marcial",
        propriedades: ["duas_maos", "pesada", "alcance"],
        efeitosEspeciais: [
            { gatilho: 'ataque', efeito: 'Pode usar ação Derrubar junto ao ataque, 1x/turno' },
            { gatilho: 'alcance_curto', efeito: 'Se alvo a 1.5 m, dano cai para 1d8' }
        ],
        description: "Pode usar a ação Derrubar junto ao ataque, uma vez por turno. Se o alvo estiver a 1,5 m, o dano cai para 1d8. Arma de infantaria padrão em fortificações. Haste longa com lâmina meia-lua e ponta perfurante."
    },
    {
        name: "Alfange",
        price: 25,
        dano: "1d8",
        critico: 20,
        tipo: "marcial",
        peso: 1.5,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["anti_desarme"],
        efeitosEspeciais: [
            { gatilho: 'desarme', efeito: 'Vantagem para manter na mão; desvantagem do oponente ao desarmar' }
        ],
        description: "Vantagem em manter na mão e desvantagem do oponente ao tentar desarmar. Espada de lâmina larga e curva, usada por guerreiros do Deserto."
    },
    {
        name: "Arco Longo",
        price: 50,
        dano: "1d8",
        critico: 20,
        tipo: "marcial",
        peso: 1,
        tipoDano: "perfurante",
        alcance: "45/180 m",
        maos: 2,
        categoriaProf: "marcial",
        propriedades: ["duas_maos", "municao", "pesada"],
        efeitosEspeciais: [
            { gatilho: 'dano', efeito: 'Aplica mod. de Força em ataque e dano' }
        ],
        description: "Aplica modificador de Força em ataque e dano. Arco recurvado de materiais laminados que mantém a tensão mesmo desarmado, disparando com mais força."
    },
    {
        name: "Balestra",
        price: 70,
        dano: "1d12",
        critico: "18-20",
        tipo: "marcial",
        peso: 3,
        tipoDano: "perfurante",
        alcance: "30/120 m",
        maos: 2,
        categoriaProf: "marcial",
        propriedades: ["duas_maos", "municao", "recarga", "pesada"],
        efeitosEspeciais: [
            { gatilho: 'recarga', efeito: 'Recarregar é uma ação' },
            { gatilho: 'dano', efeito: 'Aplica mod. de Força no dano' }
        ],
        description: "Recarregar é uma ação; crítico em 18+; aplica modificador de Força no dano. Besta com mecanismo pesado que permite usar toda a força ao engatilhar."
    },
    {
        name: "Besta de Mão",
        price: 25,
        dano: "1d6",
        critico: 20,
        tipo: "marcial",
        peso: 1,
        tipoDano: "perfurante",
        alcance: "9/36 m",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["leve", "municao", "recarga"],
        efeitosEspeciais: [
            { gatilho: 'primeiro_ataque', efeito: 'Saque e ataque na mesma rodada: oponente desprevenido (1x/combate), vantagem no ataque' },
            { gatilho: 'recarga', efeito: 'Recarregar é uma ação' }
        ],
        description: "Saque e ataque na mesma rodada: oponente desprevenido (uma vez por combate) e vantagem no ataque; recarregar é ação. Miniatura de besta para ocultar sob casaco, usada por nobres e assassinos."
    },
    {
        name: "Besta de Repetição",
        price: 100,
        dano: "1d8",
        critico: 20,
        tipo: "marcial",
        peso: 2.5,
        tipoDano: "perfurante",
        alcance: "24/120 m",
        maos: 2,
        categoriaProf: "marcial",
        propriedades: ["duas_maos", "municao", "cartucho_10_virotes"],
        efeitosEspeciais: [
            { gatilho: 'recarga', efeito: 'Trocar ou recarregar cartucho é uma ação' }
        ],
        description: "Trocar ou recarregar o cartucho: ação. Besta acoplada a caixa com mecanismo automático que recarrega até dez virotes."
    },
    {
        name: "Besta Pesada",
        price: 50,
        dano: "1d10",
        critico: 20,
        tipo: "marcial",
        peso: 3,
        tipoDano: "perfurante",
        alcance: "30/120 m",
        maos: 2,
        categoriaProf: "marcial",
        propriedades: ["duas_maos", "municao", "recarga", "pesada"],
        efeitosEspeciais: [
            { gatilho: 'recarga', efeito: 'Carregar exige uma ação ou um ataque' }
        ],
        description: "Carregar exige uma ação ou um ataque. Versão maior e mais potente da besta leve, exige as duas mãos para usar."
    },
    {
        name: "Cajado de batalha",
        price: 0.2,
        dano: "1d4/1d6",
        critico: 20,
        tipo: "marcial",
        peso: 2,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: "1ou2",
        categoriaProf: "marcial",
        propriedades: ["versatil"],
        efeitosEspeciais: [],
        description: "Cajado de madeira reforçado com chapas de metal nas pontas, usado por andarilhos que não querem levantar suspeitas."
    },
    {
        name: "Chicote",
        price: 10,
        dano: "1d4",
        critico: 20,
        tipo: "marcial",
        peso: 0.5,
        tipoDano: "cortante",
        alcance: "3 m",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["acuidade", "alcance"],
        efeitosEspeciais: [
            { gatilho: 'ataque', efeito: 'Pode trocar ataque para derrubar ou desarmar (60% de chance)' }
        ],
        description: "Pode trocar um ataque para tentar derrubar ou desarmar (60% de chance de acerto). Arma longa e flexível que pode enroscar-se no adversário, ideal para manobras de controle."
    },
    {
        name: "Cimitarra",
        price: 25,
        dano: "1d4",
        critico: 20,
        tipo: "marcial",
        peso: 1.5,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["anti_desarme"],
        efeitosEspeciais: [
            { gatilho: 'desarme', efeito: 'Vantagem para manter na mão; desvantagem para quem tenta desarmar' }
        ],
        description: "Vantagem em manter na mão e desvantagem para quem tenta desarmar. Espada de lâmina larga e curva, usada por guerreiros do Mar."
    },
    {
        name: "Corrente com Cravos",
        price: 30,
        dano: "1d4",
        critico: 20,
        tipo: "marcial",
        peso: 1.5,
        tipoDano: "perfurante",
        alcance: "3 m",
        maos: 2,
        categoriaProf: "marcial",
        propriedades: ["duas_maos", "alcance"],
        efeitosEspeciais: [
            { gatilho: 'ataque', efeito: 'Pode trocar ataque por agarrar (DC 10 + bônus de proficiência)' },
            { gatilho: 'agarrar', efeito: 'Alvo preso só se move em direção ao usuário ou sofre 1d4 perfurante' }
        ],
        description: "Pode trocar um ataque para agarrar (DC 10 + bônus de proficiência); alvo preso só se move em direção à outra ponta ou sofre 1d4 perfurante. Corrente com pequenos espinhos, ótima para controlar e prender o inimigo."
    },
    {
        name: "Espada Bastarda",
        price: 30,
        dano: "1d10/1d12",
        critico: 20,
        tipo: "marcial",
        peso: 2.5,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: "1ou2",
        categoriaProf: "marcial",
        propriedades: ["versatil"],
        efeitosEspeciais: [
            { gatilho: 'uma_mao_livre', efeito: 'Ação bônus: arco de corte em área (dano = mod. de Força)' }
        ],
        description: "Se empunhada com uma mão sem nada na outra, pode usar ação bônus para arco de corte em área (dano = mod. de Força). Espada grande e exótica, eficaz contra armaduras completas."
    },
    {
        name: "Espada Grande",
        price: 15,
        dano: "2d6",
        critico: 20,
        tipo: "marcial",
        peso: 4,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "marcial",
        propriedades: ["duas_maos", "pesada"],
        efeitosEspeciais: [
            { gatilho: 'ataque', efeito: 'Golpe carregado: dobro do dano, mas -1 Valor de Defesa até próximo turno por ataque carregado' },
            { gatilho: 'requisito', efeito: 'Requer Força >= 5 ou desvantagem em todos ataques' }
        ],
        description: "Golpe carregado: ao realizar um ataque pode escolher fazê-lo carregado causando o dobro do dano, entretanto perde -1 no Valor de Defesa até o próximo turno para cada ataque carregado feito. Requer Força >= 5 ou faça todo ataque com esta arma com desvantagem. Espada de 1,5 m, poderosa mas pesada, ideal para um único golpe decisivo."
    },
    {
        name: "Espada Longa",
        price: 50,
        dano: "1d8/1d10",
        critico: 20,
        tipo: "marcial",
        peso: 1.5,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: "1ou2",
        categoriaProf: "marcial",
        propriedades: ["versatil"],
        efeitosEspeciais: [
            { gatilho: 'duas_maos', efeito: '1x/rodada na ação Atacar com duas mãos: +1d8 dano adicional (alavanca)' }
        ],
        description: "Espada versátil e prática que pode ser usada com uma ou duas mãos. Uma vez por rodada, ao usar a ação Atacar com duas mãos, causa +1d8 de dano adicional (manobra de alavanca)."
    },
    {
        name: "Florete",
        price: 25,
        dano: "1d8",
        critico: 20,
        tipo: "marcial",
        peso: 1,
        tipoDano: "perfurante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["acuidade"],
        efeitosEspeciais: [
            { gatilho: 'ataque', efeito: 'Finta (1x/combate): -1 acertos contra si até fim do turno (50% de chance)' }
        ],
        description: "Lâmina fina e afiada, muito precisa, usada para manobras de engano. Uma vez por combate, pode finta como ação de ataque para impor -1 em acertos contra si até o fim do turno (50% de chance de funcionar)."
    },
    {
        name: "Florete-Agulha",
        price: 40,
        dano: "1d8",
        critico: 20,
        tipo: "marcial",
        peso: 1,
        tipoDano: "perfurante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["leve", "acuidade"],
        efeitosEspeciais: [
            { gatilho: 'veneno', efeito: 'Êmbolo interno injeta veneno de contato (aplicar é ação inteira); inimigos -1 para livrar do veneno' }
        ],
        description: "Florete com êmbolo interno que injeta veneno no alvo. Como o florete, + interno de veneno de contato (aplicar é ação inteira); inimigos têm -1 para se livrar do veneno."
    },
    {
        name: "Fogo Alquímico",
        price: 50,
        dano: "1d6",
        critico: 20,
        tipo: "marcial",
        peso: 0.5,
        tipoDano: "fogo",
        alcance: "6/18 m",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["arremessavel", "consumivel"],
        efeitosEspeciais: [
            { gatilho: 'acerto', efeito: 'Causa condição Queimando (1d6 no fim do próximo turno)' },
            { gatilho: 'erro', efeito: 'Causa metade do dano, sem condição Queimando' }
        ],
        description: "Frasco de substância que inflama ao contato com o ar."
    },
    {
        name: "Foice",
        price: 30,
        dano: "1d8",
        critico: 18,
        tipo: "marcial",
        peso: 2,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: [],
        efeitosEspeciais: [
            { gatilho: 'reacao', efeito: 'Após ataque, como reação tenta causar Sangrando (40% de chance; 1x/turno)' }
        ],
        description: "Foice de combate bem equilibrada, capaz de infligir ferimentos profundos. Após um ataque, como reação pode tentar causar condição Sangrando (40% de chance; não pode repetir no mesmo turno)."
    },
    {
        name: "Katana",
        price: 200,
        dano: "1d8/1d10",
        critico: 20,
        tipo: "marcial",
        peso: 1.5,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: "1ou2",
        categoriaProf: "marcial",
        propriedades: ["versatil", "obra_prima"],
        efeitosEspeciais: [
            { gatilho: 'acerto', efeito: 'Obra-prima: +1 no rolamento de acerto' }
        ],
        description: "Lâmina curva única, temperada e incrustada, considerada obra-prima. Obra-prima: +1 no rolamento de acerto."
    },
    {
        name: "Lança de Falange",
        price: 5,
        dano: "1d10/1d12",
        critico: 20,
        tipo: "marcial",
        peso: 2.5,
        tipoDano: "perfurante",
        alcance: "3 m",
        maos: 2,
        categoriaProf: "marcial",
        propriedades: ["duas_maos", "pesada", "alcance", "arremessavel"],
        efeitosEspeciais: [],
        description: "Versão longa da lança, balanceada para falange; pesada e arremessável."
    },
    {
        name: "Lança Montada",
        price: 15,
        dano: "2d6/1d10",
        critico: 20,
        tipo: "marcial",
        peso: 3,
        tipoDano: "perfurante",
        alcance: "3 m",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["alcance", "montaria"],
        efeitosEspeciais: [
            { gatilho: 'investida_montada', efeito: 'Dano dobrado; só funciona montado (1 mão)' }
        ],
        description: "Lança adaptada para uso a cavalo, permite golpe de investida poderoso. Investida montada: dano dobrado; só funciona montado (1 mão)."
    },
    {
        name: "Maça Estrela",
        price: 15,
        dano: "1d8",
        critico: 20,
        tipo: "marcial",
        peso: 2,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: [],
        efeitosEspeciais: [
            { gatilho: 'tipo_alvo', efeito: 'Dobra dano contra constructos e esqueletos' }
        ],
        description: "Maça com espinhos pontiagudos que causam ferimentos profundos. Dobra o dano contra constructos e esqueletos."
    },
    {
        name: "Maça de Guerra",
        price: 30,
        dano: "1d12",
        critico: 20,
        tipo: "marcial",
        peso: 3,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "marcial",
        propriedades: ["duas_maos", "pesada"],
        efeitosEspeciais: [
            { gatilho: 'penalidade', efeito: '-1 no ataque' },
            { gatilho: 'tipo_alvo', efeito: 'Dobra dano contra constructos e esqueletos' }
        ],
        description: "Maça pesada com cabeça metálica, poderosa mas desajeitada. -1 no ataque; dobra dano contra constructos e esqueletos."
    },
    {
        name: "Machado Anão",
        price: 50,
        dano: "1d12",
        critico: 20,
        tipo: "marcial",
        peso: 4,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "marcial",
        propriedades: ["duas_maos", "pesada"],
        efeitosEspeciais: [],
        description: "Machado favorito dos anões; pesado demais sem treino."
    },
    {
        name: "Machado de Batalha",
        price: 10,
        dano: "1d8/1d10",
        critico: 20,
        tipo: "marcial",
        peso: 2,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: "1ou2",
        categoriaProf: "marcial",
        propriedades: ["versatil"],
        efeitosEspeciais: [
            { gatilho: 'critico_natural', efeito: 'No rolamento de 20 no d20: +1d6 de dano extra' }
        ],
        description: "Machado grande de guerra, com chance de dano bônus no crítico. No rolamento de um 20 no d20: o ataque causa +1d6 de dano extra."
    },
    {
        name: "Machado Grande",
        price: 30,
        dano: "1d12",
        critico: 20,
        tipo: "marcial",
        peso: 4,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "marcial",
        propriedades: ["duas_maos", "pesada"],
        efeitosEspeciais: [
            { gatilho: 'critico_natural', efeito: 'No rolamento de 20 no d20: +1d6 de dano extra (após cálculo de crítico)' }
        ],
        description: "Imenso machado de lâmina dupla, perigoso e com chance de dano bônus no crítico. No rolamento de 20 no d20: +1d6 de dano extra (após cálculo de crítico)."
    },
    {
        name: "Mangual",
        price: 10,
        dano: "1d8",
        critico: 20,
        tipo: "marcial",
        peso: 2,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["anti_escudo"],
        efeitosEspeciais: [
            { gatilho: 'ataque', efeito: 'Pode enroscar e desarmar 1x/turno' },
            { gatilho: 'contra_escudo', efeito: '+1 acerto contra oponentes com escudo' }
        ],
        description: "Haste metálica ligada a esfera de aço, ideal para desarmar e combater escudos. Pode enroscar e desarmar ao atacar (uma vez por turno) e recebe +1 em acertos contra oponentes com escudos."
    },
    {
        name: "Mangual Pesado",
        price: 0.2,
        dano: "1d10",
        critico: 20,
        tipo: "marcial",
        peso: 3.5,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "marcial",
        propriedades: ["duas_maos", "pesada", "anti_escudo"],
        efeitosEspeciais: [
            { gatilho: 'ataque', efeito: 'Mesmas habilidades do mangual normal (desarme e +1 vs escudo)' }
        ],
        description: "Versão mais pesada do mangual, para uso a duas mãos, com desarme e bônus contra escudos. Mesmas habilidades do mangual normal, mas usada com duas mãos."
    },
    {
        name: "Manopla Espada",
        price: 25,
        dano: "1d6",
        critico: 20,
        tipo: "marcial",
        peso: 1,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["leve"],
        efeitosEspeciais: [
            { gatilho: 'defesa', efeito: '+1 no Valor de Defesa (ou +2 com uma em cada braço + Regalia Duas Armas)' }
        ],
        description: "Braçadeira com lâmina paralela ao antebraço, protege o braço e oferece bônus de defesa. Concede +1 no Valor de Defesa (ou +2 se usar uma em cada braço com Regalia de Combate com Duas Armas)."
    },
    {
        name: "Marreta",
        price: 5,
        dano: "2d6",
        critico: 20,
        tipo: "marcial",
        peso: 5,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "marcial",
        propriedades: ["duas_maos", "pesada"],
        efeitosEspeciais: [
            { gatilho: 'tipo_alvo', efeito: 'Dano dobrado a estruturas e construtos de pedra' }
        ],
        description: "Martelo com cabo longo e cabeça pesada, desajeitado mas poderoso contra construções. Causa dano dobrado a estruturas e construtos de pedra."
    },
    {
        name: "Marreta Estilhaçadora",
        price: 10,
        dano: "2d6",
        critico: 20,
        tipo: "marcial",
        peso: 5,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "marcial",
        propriedades: ["duas_maos", "pesada"],
        efeitosEspeciais: [
            { gatilho: 'critico', efeito: 'Ao invés de multiplicar dano, reduz em 2 o bônus de armadura do alvo até fim do próximo turno' }
        ],
        description: "Grande marreta de guerra que despedaça armaduras e reduz armadura em crítico. Crítico: ao invés de multiplicar dano, reduz em 2 o bônus de armadura natural ou da armadura do alvo até o fim do próximo turno."
    },
    {
        name: "Martelo",
        price: 2,
        dano: "1d4",
        critico: 20,
        tipo: "marcial",
        peso: 1,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["leve"],
        efeitosEspeciais: [
            { gatilho: 'tipo_alvo', efeito: 'Sempre causa dano máximo contra esqueletos e construtos de ossos' }
        ],
        description: "Ferramenta para pregos que vira arma eficaz contra esqueletos. Sempre causa dano máximo contra esqueletos e construtos de ossos."
    },
    {
        name: "Martelo de guerra",
        price: 15,
        dano: "1d8",
        critico: 20,
        tipo: "marcial",
        peso: 2,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: [],
        efeitosEspeciais: [
            { gatilho: 'tipo_alvo', efeito: 'Sempre causa dano máximo contra esqueletos e construtos de ossos' }
        ],
        description: "Versão militar do martelo, preferida por anões, efetiva contra mortos-vivos. Sempre causa dano máximo contra esqueletos e construtos de ossos."
    },
    {
        name: "Mosquete",
        price: 500,
        dano: "2d8",
        critico: 20,
        tipo: "marcial",
        peso: 4,
        tipoDano: "perfurante",
        alcance: "45/180 m",
        maos: 2,
        categoriaProf: "arma_de_fogo",
        propriedades: ["duas_maos", "recarga", "pesada", "arma_de_fogo"],
        efeitosEspeciais: [
            { gatilho: 'disparo', efeito: 'Produz enorme som ao disparar' },
            { gatilho: 'recarga', efeito: 'Recarregar é uma ação' }
        ],
        description: "Arma de uso complicado e devastadora, com longo alcance e recarga lenta. Produz enorme som ao disparar; recarregar é uma ação."
    },
    {
        name: "Nunchaku",
        price: 2,
        dano: "1d6",
        critico: 20,
        tipo: "marcial",
        peso: 0.5,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["leve"],
        efeitosEspeciais: [
            { gatilho: 'classe_monge', efeito: 'Quando usado por monge: causa 1d10 impacto e impõe desvantagem no teste contra atordoamento' }
        ],
        description: "Dois bastões unidos por corrente; versátil para artes marciais com efeitos especiais para monges. Quando usado por monge, causa 1d10 de impacto e impõe desvantagem no teste para não ser atordoado."
    },
    {
        name: "Pique",
        price: 10,
        dano: "1d10",
        critico: 20,
        tipo: "marcial",
        peso: 3,
        tipoDano: "perfurante",
        alcance: "4.5 m",
        maos: 2,
        categoriaProf: "marcial",
        propriedades: ["duas_maos", "pesada", "alcance"],
        efeitosEspeciais: [
            { gatilho: 'contra_montado', efeito: '+1 acerto contra alvos montados ou voadores no alcance' }
        ],
        description: "Lança muito longa, ideal para manter distância e punir montados. Bônus de +1 em acertos contra alvos montados ou voadores no alcance."
    },
    {
        name: "Pistola",
        price: 180,
        dano: "1d8",
        critico: 20,
        tipo: "marcial",
        peso: 1,
        tipoDano: "perfurante",
        alcance: "12/48 m",
        maos: 1,
        categoriaProf: "arma_de_fogo",
        propriedades: ["arma_de_fogo", "recarga"],
        efeitosEspeciais: [
            { gatilho: 'iniciativa', efeito: '+2 na iniciativa' },
            { gatilho: 'duas_maos', efeito: 'Se usada com duas mãos: +1 na jogada de acerto' }
        ],
        description: "Arma de fogo leve de dois tiros, popular e beneficiada por empunhadura estável. Ganha +2 na iniciativa; se usada com duas mãos, +1 na jogada de acerto."
    },
    {
        name: "Pistola de Tambor",
        price: 400,
        dano: "1d8",
        critico: 20,
        tipo: "marcial",
        peso: 1.5,
        tipoDano: "perfurante",
        alcance: "12/48 m",
        maos: 1,
        categoriaProf: "arma_de_fogo",
        propriedades: ["arma_de_fogo", "tambor_4_tiros"],
        efeitosEspeciais: [
            { gatilho: 'iniciativa', efeito: '+2 na iniciativa quando empunhada em uma mão e nada na outra' }
        ],
        description: "Pistola com tambor giratório que permite até quatro disparos antes de recarregar. +2 na iniciativa quando empunhada em uma mão e nada na outra."
    },
    {
        name: "Pó da Explosão Solar",
        price: 100,
        dano: "0",
        critico: 20,
        tipo: "marcial",
        peso: 0.3,
        tipoDano: "granada",
        alcance: "6/18 m",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["consumivel", "area_6m", "arremessavel"],
        efeitosEspeciais: [
            { gatilho: 'impacto', efeito: 'Todas criaturas num raio de 6 m ficam Atordoadas por 1 rodada' }
        ],
        description: "Frasco de cerâmica com pó explosivo que ofusca e atordoa no impacto. Ao quebrar, todas as criaturas num raio de 6 m ficam atordoadas por 1 rodada."
    },
    {
        name: "Rede",
        price: 1,
        dano: "0",
        critico: 20,
        tipo: "marcial",
        peso: 1.5,
        tipoDano: "nenhum",
        alcance: "4.5/9 m",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["arremessavel", "especial"],
        efeitosEspeciais: [
            { gatilho: 'acerto', efeito: 'Alvo fica Restringido; ação completa + teste CD 10 ou rasgar (5 PV) para libertar' }
        ],
        description: "Rede com dentes na trama, usada para imobilizar e controlar inimigos. Acerto restringe e permite limitar movimento; é preciso ação completa + teste (CD 10) ou rasgar (5 PV) para liberar."
    },
    {
        name: "Sabre Serrilhado",
        price: 25,
        dano: "1d8",
        critico: 20,
        tipo: "marcial",
        peso: 1.5,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: [],
        efeitosEspeciais: [
            { gatilho: 'critico', efeito: 'Fica presa no alvo; arrancar causa 2d4; enquanto presa, 1d4 a cada ação da vítima' }
        ],
        description: "Lâmina dentada que rasga e prende na carne, causando dano contínuo até ser removida. No crítico, fica presa: arrancar provoca 2d4 de dano; enquanto preso, causa 1d4 a cada ação da vítima."
    },
    {
        name: "Sai",
        price: 10,
        dano: "1d4",
        critico: 19,
        tipo: "marcial",
        peso: 0.5,
        tipoDano: "perfurante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["leve"],
        efeitosEspeciais: [
            { gatilho: 'ataque', efeito: 'Pode trocar ataque pela ação Desarmar' }
        ],
        description: "Adaga em forma de garfo, ideal para prender e desarmar armas adversárias. Pode trocar um ataque pela ação desarmar; crítico em 19-20."
    },
    {
        name: "Tridente",
        price: 5,
        dano: "1d10",
        critico: 20,
        tipo: "marcial",
        peso: 2,
        tipoDano: "perfurante",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "marcial",
        propriedades: ["duas_maos", "arremessavel"],
        efeitosEspeciais: [
            { gatilho: 'ambiente_aquatico', efeito: '+1 acerto contra criaturas aquáticas quando em água' }
        ],
        description: "Lança com múltiplas pontas, menos penetrante sem armadura, mas letal na água. +1 em acertos contra criaturas aquáticas quando em água."
    },
    {
        name: "Wakizashi",
        price: 150,
        dano: "1d6",
        critico: 20,
        tipo: "marcial",
        peso: 1,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "marcial",
        propriedades: ["leve", "obra_prima"],
        efeitosEspeciais: [
            { gatilho: 'acerto', efeito: 'Obra-prima: +1 no acerto' },
            { gatilho: 'daisho', efeito: 'Com katana: ataque bônus com wakizashi na mesma ação, mas penalidade de ataque duplo no próximo turno' }
        ],
        description: "Versão mais curta da Katana. Junto com ela formam o Daisho, armas tradicionais do guerreiro de katana. A katana e a wakizashi são armas obra-prima (+1 acerto). Se usada em conjunto a uma katana, pode se atacar com a wakizashi na mesma ação que a katana. Ao atacar com a wakizashi desta maneira é gerado penalidade de ataque para o próximo ação de ataque como se fossem duas ações e não uma."
    }
];

// ============================================================================
// ARMAS EXÓTICAS (EQP-001)
// ============================================================================
export const armasExoticas = [
    {
        name: "Catapulta de Braço",
        price: 25,
        dano: "1d6",
        critico: 20,
        tipo: "exotica",
        peso: 1,
        tipoDano: "impacto",
        alcance: "18/60 m",
        maos: 1,
        categoriaProf: "exotica",
        propriedades: ["municao"],
        efeitosEspeciais: [
            { gatilho: 'recarga', efeito: 'Recarregar é uma ação livre' }
        ],
        description: "Recarregar é uma ação livre. Engenho halfling preso ao braço que arremessa pedras quase tão longe quanto um arco."
    },
    {
        name: "Manopla de espinhos",
        price: 10,
        dano: "+1 desarmado",
        critico: 20,
        tipo: "exotica",
        peso: 0.5,
        tipoDano: "perfurante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "exotica",
        propriedades: ["leve", "anti_desarme"],
        efeitosEspeciais: [
            { gatilho: 'desarmado', efeito: '+1 dano em ataques desarmados; não pode sofrer desarme' }
        ],
        description: "Luva de couro com espinhos, usada por pugilistas; concede +1 no dano de ataques desarmados. Não pode sofrer desarme."
    },
    {
        name: "Espada Bastarda (uma mão)",
        price: 30,
        dano: "1d10",
        critico: 20,
        tipo: "exotica",
        peso: 2.5,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "exotica",
        propriedades: [],
        efeitosEspeciais: [
            { gatilho: 'uma_mao_livre', efeito: 'Ação bônus: arco de corte em área (dano = mod. de Força)' }
        ],
        description: "Se empunhada com uma mão sem nada na outra, pode usar ação bônus para arco de corte em área (dano = mod. de Força). Espada grande e exótica, eficaz contra armaduras completas."
    },
    {
        name: "Espada Lâminas Duplas",
        price: 40,
        dano: "1d8",
        critico: 20,
        tipo: "exotica",
        peso: 3,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "exotica",
        propriedades: ["duas_maos", "dupla"],
        efeitosEspeciais: [
            { gatilho: 'ataque', efeito: 'Ataque bônus sempre que usar ação de Atacar' }
        ],
        description: "Pode fazer um ataque bônus sempre que usar a ação de atacar. Duas lâminas opostas num mesmo cabo; exige treino para evitar ferir-se."
    },
    {
        name: "Espada Diapasão",
        price: 60,
        dano: "1d8",
        critico: 20,
        tipo: "exotica",
        peso: 2,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "exotica",
        propriedades: ["duas_maos"],
        efeitosEspeciais: [
            { gatilho: 'acao', efeito: 'Interagir com o chão: ataques causam +1d6 até fim do próximo turno' }
        ],
        description: "Interagir com o chão como ação para fazê-la vibrar: ataques seguintes causam +1d6 até o fim do próximo turno. Espada com lâminas duplas paralelas que ressoam para desorientar oponentes."
    },
    {
        name: "Espada Táurica",
        price: 100,
        dano: "3d6",
        critico: 20,
        tipo: "exotica",
        peso: 8,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "exotica",
        propriedades: ["duas_maos", "pesada"],
        efeitosEspeciais: [
            { gatilho: 'requisito', efeito: 'Requer Força >= 10 ou desvantagem a cada 3 pts abaixo de 10; Força < 3: não consegue manusear' },
            { gatilho: 'ambiente', efeito: 'Desvantagem em ambientes fechados' }
        ],
        description: "Espada gigantesca usada pelos campeões minotauros. Requer Força >= 10 ou sofre desvantagem para cada 3 pontos abaixo de 10. Se tiver força inferior a 3 não consegue manusear a espada. Desvantagem em ambientes fechados."
    },
    {
        name: "Katana (uma mão)",
        price: 200,
        dano: "1d8",
        critico: 20,
        tipo: "exotica",
        peso: 1.5,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "exotica",
        propriedades: ["obra_prima"],
        efeitosEspeciais: [
            { gatilho: 'acerto', efeito: 'Obra-prima: +1 no rolamento de acerto' }
        ],
        description: "Lâmina curva única, temperada e incrustada, considerada obra-prima. Obra-prima: +1 no rolamento de acerto."
    },
    {
        name: "Katar",
        price: 40,
        dano: "1d4",
        critico: 19,
        tipo: "exotica",
        peso: 0.5,
        tipoDano: "perfurante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "exotica",
        propriedades: ["leve"],
        efeitosEspeciais: [
            { gatilho: 'critico', efeito: 'Triplica o dano em vez de dobrar' }
        ],
        description: "Punho com lâminas frontais, ideal para golpes perfurantes. Crítico triplica o dano em vez de dobrar."
    },
    {
        name: "Lança Falange (uma mão)",
        price: 5,
        dano: "1d8",
        critico: 20,
        tipo: "exotica",
        peso: 2,
        tipoDano: "perfurante",
        alcance: "3 m",
        maos: 1,
        categoriaProf: "exotica",
        propriedades: ["alcance", "arremessavel"],
        efeitosEspeciais: [],
        description: "Versão longa da lança, balanceada para falange; pesada e arremessável."
    },
    {
        name: "Lança foguete",
        price: 20,
        dano: "1d6/1d8",
        critico: 20,
        tipo: "exotica",
        peso: 2,
        tipoDano: "perfurante",
        alcance: "corpo-a-corpo",
        maos: "1ou2",
        categoriaProf: "exotica",
        propriedades: ["versatil", "arremessavel"],
        efeitosEspeciais: [
            { gatilho: 'acao_livre', efeito: 'Ativa foguete: próximo arremesso tem alcance dobrado, vantagem e +1d6 dano. Após uso, inutilizada.' }
        ],
        description: "Lança com reservatório de pólvora que boosta o próximo arremesso. Ação livre ativa foguete: próximo arremesso tem alcance dobrado, vantagem e +1d6 de dano. Depois, inútil."
    },
    {
        name: "Lança Mola",
        price: 5,
        dano: "1d6/1d8",
        critico: 20,
        tipo: "exotica",
        peso: 1.5,
        tipoDano: "perfurante",
        alcance: "corpo-a-corpo",
        maos: "1ou2",
        categoriaProf: "exotica",
        propriedades: ["versatil"],
        efeitosEspeciais: [
            { gatilho: 'acao_livre', efeito: 'Dispara mola: +2 ataque, alcance 3 m; desmontar/regenerar mola é ação' }
        ],
        description: "Haste retrátil com mola interna para ataque de curto alcance aprimorado. Ação livre dispara mola (+2 no ataque, alcance = 3 m); desmontar/regenerar mola é ação."
    },
    {
        name: "Machado Anão (uma mão)",
        price: 50,
        dano: "1d10",
        critico: 20,
        tipo: "exotica",
        peso: 3,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "exotica",
        propriedades: ["pesada"],
        efeitosEspeciais: [],
        description: "Machado favorito dos anões; pesado demais sem treino."
    },
    {
        name: "Maça Granada",
        price: 20,
        dano: "1d8",
        critico: 20,
        tipo: "exotica",
        peso: 2.5,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "exotica",
        propriedades: [],
        efeitosEspeciais: [
            { gatilho: 'critico', efeito: 'Explosão: 4d4 fogo no alvo, 2d4 fogo no usuário. Arma fica inutilizada.' }
        ],
        description: "Maça com carga explosiva na cabeça, que detona sob grande pressão em acerto crítico. Acerto crítico: além de infligir dano dobrado, causa explosão (4d4 fogo no alvo e 2d4 fogo no usuário). Após explodir, fica inutilizada."
    },
    {
        name: "Machado Táurico",
        price: 80,
        dano: "4d6",
        critico: 20,
        tipo: "exotica",
        peso: 10,
        tipoDano: "cortante",
        alcance: "3 m",
        maos: 2,
        categoriaProf: "exotica",
        propriedades: ["duas_maos", "pesada", "alcance"],
        efeitosEspeciais: [
            { gatilho: 'requisito', efeito: 'Exige Força >= 12 para manusear' },
            { gatilho: 'critico_natural', efeito: 'Acerto crítico causa +1d12 dano extra' }
        ],
        description: "Exige Força 12 ou mais para ser manuseado. Quando um atacante usando esta arma rola um acerto crítico esta arma causa 1d12 de dano extra. Esta arma de duas mãos causa 4d6 de dano cortante com alcance de 3 metros."
    },
    {
        name: "Marreta Pistão",
        price: 15,
        dano: "2d6",
        critico: 20,
        tipo: "exotica",
        peso: 6,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "exotica",
        propriedades: ["duas_maos", "pesada"],
        efeitosEspeciais: [
            { gatilho: 'acao', efeito: 'Carregar vapor concede dupla vantagem na jogada de acerto' },
            { gatilho: 'tipo_alvo', efeito: 'Dano dobrado em estruturas' }
        ],
        description: "Marreta de duas mãos com carga de vapor, poderosa contra estruturas e construtos. Ação para carregar vapor concede dupla vantagem na jogada de acerto; dano dobrado em estruturas."
    },
    {
        name: "Martelo Pistão",
        price: 40,
        dano: "1d10",
        critico: 20,
        tipo: "exotica",
        peso: 3,
        tipoDano: "impacto",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "exotica",
        propriedades: [],
        efeitosEspeciais: [
            { gatilho: 'acao', efeito: 'Carregar pistão concede dupla vantagem na jogada de acerto' },
            { gatilho: 'tipo_alvo', efeito: 'Dano máximo em esqueletos' }
        ],
        description: "Martelo avançado com mecanismo interno de vapor, letal contra esqueletos. Ação para carregar pistão concede dupla vantagem na jogada de acerto; dano máximo em esqueletos."
    },
    {
        name: "Montante Cinético",
        price: 250,
        dano: "3d6",
        critico: 20,
        tipo: "exotica",
        peso: 7,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "exotica",
        propriedades: ["duas_maos", "pesada"],
        efeitosEspeciais: [
            { gatilho: 'falha_critica', efeito: 'No rolamento de 1 no d20: sofre o dano da arma (com bônus) em si mesmo' }
        ],
        description: "Imensa espada com esferas internas que aumentam impacto, mas pode ferir o usuário. Em rolamento de 1 no d20, na jogada de ataque: você sofre o dano da arma (com bônus) em si mesmo."
    },
    {
        name: "Mosquetão",
        price: 600,
        dano: "4d8",
        critico: 20,
        tipo: "exotica",
        peso: 5,
        tipoDano: "perfurante",
        alcance: "9/36 m",
        maos: 2,
        categoriaProf: "arma_de_fogo",
        propriedades: ["duas_maos", "recarga", "pesada", "arma_de_fogo"],
        efeitosEspeciais: [
            { gatilho: 'erro_proficiente', efeito: 'Se errar ataque proficiente, ainda causa 1d8 perfurante sem bônus de Destreza' }
        ],
        description: "Mosquete de cano grosso, foca em curto alcance com grande impacto, mas com desvantagem. Se errar ataque proficiente, ainda causa 1d8 perfurante sem bônus de Destreza."
    },
    {
        name: "Presa da Serpente",
        price: 30,
        dano: "2d4",
        critico: 17,
        tipo: "exotica",
        peso: 1,
        tipoDano: "cortante",
        alcance: "corpo-a-corpo",
        maos: 1,
        categoriaProf: "exotica",
        propriedades: ["fragil"],
        efeitosEspeciais: [
            { gatilho: 'acerto', efeito: 'Causa condição Sangrando' },
            { gatilho: 'durabilidade', efeito: 'Se total do ataque <= 8 ou falha crítica, a arma quebra' }
        ],
        description: "Espada de obsidiana frágil que impõe sangramento e pode se partir em combate. Acertos causam a condição Sangrando; se o total do ataque <= 8 ou falha crítica, a arma quebra."
    },
    {
        name: "Vara relâmpago",
        price: 300,
        dano: "3d8",
        critico: 20,
        tipo: "exotica",
        peso: 1.5,
        tipoDano: "eletrico",
        alcance: "corpo-a-corpo",
        maos: 2,
        categoriaProf: "exotica",
        propriedades: ["duas_maos", "magica"],
        efeitosEspeciais: [
            { gatilho: 'critico', efeito: 'Triplica dano e consome 3 cargas (sem cargas, descarrega sem bônus)' }
        ],
        description: "Vara arcana que dispara descargas elétricas corpo a corpo, recarregável com PMs. Crítico: triplica o dano e consome 3 cargas (se não houver, descarrega tudo sem bônus)."
    }
];

// ============================================================================
// EQUIPAMENTOS DE VIAGEM
// ============================================================================
export const equipamentosViagem = [
    { name: "Mochila", price: 1, peso: 2 },
    { name: "Saco de Dormir", price: 0.2, peso: 1.5 },
    { name: "Pederneira e Isqueiro", price: 0.3, peso: 0.1 },
    { name: "Algibeira", price: 0.2, peso: 0.3 },
    { name: "Rações de Viagem", price: 0.02, peso: 0.5 },
    { name: "Corda de cânhamo (15m)", price: 0.5, peso: 2 },
    { name: "Bolsa de água", price: 0.02, peso: 0.5 }
];

// ============================================================================
// MUNIÇÕES
// ============================================================================
export const municoes = [
    { name: "Flechas (30)", price: 1, peso: 0.5 },
    { name: "Virotes (20)", price: 1, peso: 0.5 },
    { name: "Balas (20)", price: 3, peso: 0.3 }
];

// ============================================================================
// EQUIPAMENTO GERAL
// ============================================================================
export const equipamentoGeral = [
    { name: "Corrente (2m)", price: 0.1, peso: 1.5 },
    { name: "Caixa (1m³)", price: 0.1, peso: 5 },
    { name: "Arremessador de gancho", price: 0.3, peso: 2 },
    { name: "Martelo (carpintaria)", price: 0.1, peso: 0.5 },
    { name: "Instrumento musical", price: 1, peso: 1.5 },
    { name: "Pítons", price: 0.03, peso: 0.1 },
    { name: "Tocha", price: 0.05, peso: 0.5 },
    { name: "Vestuário fino", price: 10, peso: 1 },
    { name: "Frasco", price: 0.2, peso: 0.2 },
    { name: "Símbolo santo", price: 0.7, peso: 0.3 },
    { name: "Lanterna Direcional", price: 0.3, peso: 1 },
    { name: "Corda de seda (2m)", price: 0.8, peso: 0.3 },
    { name: "Tenda", price: 0.7, peso: 4 },
    { name: "Ferramentas para Ladrões", price: 3, peso: 0.5 },
    { name: "Telescópio portátil", price: 1, peso: 0.5 },
    { name: "Mapa das estrelas", price: 2, peso: 0.1 }
];

// ============================================================================
// MONTARIA
// ============================================================================
export const montarias = [
    { name: "Camelo", price: 50, velocidade: "9m", carga: 140 },
    { name: "Burro ou mula", price: 8, velocidade: "7.5m", carga: 160 },
    { name: "Elefante", price: 200, velocidade: "12m", carga: 660 },
    { name: "Cavalo", price: 50, velocidade: "12m", carga: 270 },
    { name: "Lagarto Açu", price: 75, velocidade: "15m", carga: 240 },
    { name: "Mastiff", price: 25, velocidade: "9m", carga: 97 },
    { name: "Pônei", price: 30, velocidade: "6m", carga: null }
];

// ============================================================================
// KITS
// ============================================================================
export const kits = [
    { name: "Kit Médico", description: "Inclui bandagens, anti sépticos, tesoura médica e outros itens para primeiros socorros.", price: 50, peso: 2 },
    { name: "Kit de Herborista", description: "Contém ervas medicinais, pilão, mortalha e outros itens para preparar remédios naturais.", price: 20, peso: 2 },
    { name: "Kit de Sobrevivência", description: "Inclui faca, corda, fósforos, cantil e outros itens essenciais para sobreviver ao ar livre.", price: 30, peso: 3 },
    { name: "Kit de Ferramentas", description: "Contém martelo, chave de fenda, alicate e outros itens úteis para consertar e construir objetos.", price: 25, peso: 4 },
    { name: "Kit de Alquimista", description: "Inclui frascos vazios, substâncias químicas básicas, tubos de ensaio e outros itens para alquimia.", price: 60, peso: 3 },
    { name: "Kit de Ladrão", description: "Contém Ferramentas de ladrão, pés de cabra, cordas e outros itens para atividades furtivas.", price: 40, peso: 2 },
    { name: "Kit de Explorador", description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.", price: 35, peso: 2 },
    { name: "Kit de Disfarces", description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.", price: 50, peso: 3 },
    { name: "Kit de Músico", description: "Inclui instrumentos musicais, partituras, cordas de reposição e outros itens para tocar música.", price: 55, peso: 3 },
    { name: "Ferramentas de ladrão", description: "Contém ferramentas especializadas, como pés de cabra, brocas manuais e chave de fenda para abrir fechaduras.", price: 45, peso: 1 },
    { name: "Kit de Cartografia", description: "Inclui pergaminhos, pena, tinta e outros itens para desenhar mapas e fazer anotações.", price: 30, peso: 1.5 },
    { name: "Kit de Venenos", description: "Contém frascos de veneno, luvas, aplicadores e outros itens para lidar com substâncias tóxicas.", price: 70, peso: 1.5 },
    { name: "Kit de Engenhocas", description: "Inclui engrenagens, molas, fios e outros itens para criar dispositivos e armadilhas improvisadas.", price: 60, peso: 3 },
    { name: "Kit de Escalada", description: "Contém cordas, mosquetões, ganchos e outros itens para escalada e rapel.", price: 40, peso: 4 },
    { name: "Kit de Caça", description: "Inclui armadilhas, armas de caça, iscas e outros itens para caçar e rastrear animais.", price: 45, peso: 4 },
    { name: "Kit de Sobrevivência Aquática", description: "Contém nadadeiras, redes de pesca, arpão e outros itens para sobreviver em ambientes aquáticos.", price: 50, peso: 5 }
];

// ============================================================================
// OBJETO COMBINADO - CATEGORIAS (compatível com criarPersonagem.js)
// ============================================================================
export const equipamentos = {
    "Armaduras Pesadas": armadurasPesadas,
    "Armaduras Médias": armadurasMedidas,
    "Armaduras Leves": armadurasLeves,
    "Escudos": escudos,
    "Armas Simples": armasSimples,
    "Armas Marciais": armasMarciais,
    "Armas Exóticas": armasExoticas,
    "Equipamentos de Viagem": equipamentosViagem,
    "Munições": municoes,
    "Equipamento Geral": equipamentoGeral,
    "Montaria": montarias,
    "Kits": kits
};

export const categories = equipamentos;

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

export const getCategorias = () => Object.keys(equipamentos);

export const getEquipamentosPorCategoria = (categoria) => equipamentos[categoria] || [];

export const getEquipamento = (nome) => {
    for (const categoria of Object.values(equipamentos)) {
        const item = categoria.find(e => e.name === nome);
        if (item) return item;
    }
    return null;
};

export const getTodasArmas = () => [...armasSimples, ...armasMarciais, ...armasExoticas];

export const getTodasArmaduras = () => [...armadurasPesadas, ...armadurasMedidas, ...armadurasLeves];

export const getEquipamentosPorPreco = (minPrice, maxPrice) => {
    const result = [];
    for (const [categoria, items] of Object.entries(equipamentos)) {
        const filtered = items.filter(item => item.price >= minPrice && item.price <= maxPrice);
        if (filtered.length > 0) result.push({ categoria, items: filtered });
    }
    return result;
};

export const getEquipamentosParaSelect = () => {
    return Object.entries(equipamentos).map(([categoria, items]) => ({
        categoria,
        items: items.map(item => ({
            value: item.name,
            label: `${item.name} (${item.price} M.O.)`,
            ...item
        }))
    }));
};

export const calcularCargaTotal = (listaEquipamentos) => {
    return listaEquipamentos.reduce((total, item) => {
        const peso = item.peso || getPesoItem(item.name || item.nome) || 0;
        const qtd = item.quantidade || 1;
        return total + (peso * qtd);
    }, 0);
};

export const getPesoItem = (nomeItem) => {
    if (!nomeItem) return 0;
    for (const categoria of Object.values(equipamentos)) {
        const item = categoria.find(i =>
            (i.name || '').toLowerCase() === nomeItem.toLowerCase() ||
            (i.nome || '').toLowerCase() === nomeItem.toLowerCase()
        );
        if (item && item.peso !== undefined) return item.peso;
    }
    return 0;
};

export const enriquecerComPeso = (itens = []) => {
    return itens.map(item => {
        if (item.peso !== undefined && item.peso !== null) return item;
        const pesoEncontrado = getPesoItem(item.name || item.nome);
        return { ...item, peso: pesoEncontrado };
    });
};

export const getArmasPorTipoDano = (tipoDano) => {
    return getTodasArmas().filter(arma =>
        arma.tipoDano?.toLowerCase().includes(tipoDano.toLowerCase())
    );
};

export const getArmadurasPorDefesa = (minDefesa) => {
    return getTodasArmaduras().filter(armadura =>
        (armadura.defesa || armadura.bonusDefesa || 0) >= minDefesa
    );
};

/**
 * Retorna armas por categoria de proficiência
 * @param {'simples'|'marcial'|'exotica'|'arma_de_fogo'} catProf
 */
export const getArmasPorCategoriaProf = (catProf) => {
    return getTodasArmas().filter(a => a.categoriaProf === catProf);
};

/**
 * Retorna armas que possuem uma propriedade específica
 * @param {string} prop - ex: 'leve', 'pesada', 'arremessavel', 'versatil'
 */
export const getArmasComPropriedade = (prop) => {
    return getTodasArmas().filter(a =>
        a.propriedades?.some(p => p.toLowerCase() === prop.toLowerCase())
    );
};

/**
 * Retorna armas que possuem efeitos especiais
 */
export const getArmasComEfeitosEspeciais = () => {
    return getTodasArmas().filter(a => a.efeitosEspeciais && a.efeitosEspeciais.length > 0);
};

/**
 * Retorna armaduras por categoria de proficiência
 * @param {'pesada'|'media'|'leve'} catProf
 */
export const getArmadurasPorCategoriaProf = (catProf) => {
    return [...armadurasPesadas, ...armadurasMedidas, ...armadurasLeves].filter(a => a.categoriaProf === catProf);
};

export default equipamentos;
