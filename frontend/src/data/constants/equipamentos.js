/**
 * Constantes de Equipamentos para o sistema Lâmina do Oculto RPG
 * 
 * Inclui:
 * - Armaduras (Pesadas, Médias, Leves)
 * - Escudos
 * - Armas (Simples, Marciais, Exóticas)
 * - Equipamentos de Viagem
 * - Munições
 * - Equipamento Geral
 * - Montaria
 * - Kits
 */

// ============================================================================
// ARMADURAS PESADAS
// ============================================================================
export const armadurasPesadas = [
    {
        name: "Loriga segmentada",
        price: 325,
        defesa: 16,
        forca: 2,
        tipo: "pesada",
        peso: 18,
        description: "Composta de tiras horizontais de metal, esta armadura é pesada e resistente. Peça muito utilizada por legionários minotauros. Valor de Defesa 16."
    },
    {
        name: "O-Yoroi",
        price: 575,
        defesa: 17,
        forca: 3,
        tipo: "pesada",
        peso: 22,
        description: "Usada pelos samurais, esta armadura é formada por pequenas placas metálicas unidas por nós de couro colorido. Inclui o kabuto, um elmo com uma máscara metálica. Valor de Defesa 17."
    },
    {
        name: "Cota de talas",
        price: 800,
        defesa: 18,
        forca: 3,
        tipo: "pesada",
        peso: 25,
        description: "Armadura composta de talas de metal cuidadosamente costuradas sobre um corselete de couro. É a armadura tradicional do samurai, embora exista em versões nativas de todos os reinos. Valor de Defesa 18."
    },
    {
        name: "Meia armadura",
        price: 1000,
        defesa: 19,
        forca: 4,
        tipo: "pesada",
        peso: 30,
        description: "Combinação de cota de malha e placas de metal posicionadas sobre as áreas vitais. Valor de Defesa 19."
    },
    {
        name: "Armadura completa",
        price: 1500,
        defesa: 20,
        forca: 5,
        tipo: "pesada",
        peso: 35,
        description: "A mais forte e pesada, formada por placas de metal forjadas e encaixadas de modo a cobrir o corpo inteiro. Inclui manoplas e grevas, um elmo com viseira e um colete acolchoado para ser usado sob as placas. Esta armadura precisa ser feita sob medida; um ferreiro cobra 500 M.O. para adaptar uma armadura completa a um novo usuário. Bônus de Valor de Defesa 20."
    }
];

// ============================================================================
// ARMADURAS MÉDIAS
// ============================================================================
export const armadurasMedidas = [
    {
        name: "Gibão de peles",
        price: 250,
        bonusDefesa: 3,
        tipo: "media",
        peso: 10,
        description: "Usada principalmente por bárbaros e selvagens, esta armadura é formada por várias camadas de peles e couro de animais. Bônus de Valor de Defesa + 3."
    },
    {
        name: "Couraça",
        price: 375,
        bonusDefesa: 4,
        tipo: "media",
        peso: 12,
        description: "Peitoral de aço que protege o peito e as costas. Popular entre nobres e oficiais. Bônus de Valor de Defesa + 4."
    },
    {
        name: "Cota de malha",
        price: 750,
        bonusDefesa: 5,
        tipo: "media",
        peso: 15,
        description: "Longa veste de anéis metálicos interligados, formando uma malha flexível e resistente, que vai até os joelhos. Bônus de Valor de Defesa + 5."
    },
    {
        name: "Brunéia",
        price: 1000,
        bonusDefesa: 6,
        tipo: "media",
        peso: 14,
        description: "Colete de couro coberto com plaquetas de metal sobrepostas, como escamas de um peixe. Bônus de Valor de Defesa + 6."
    }
];

// ============================================================================
// ARMADURAS LEVES
// ============================================================================
export const armadurasLeves = [
    {
        name: "Armadura Acolchoada",
        price: 100,
        bonusDefesa: 1,
        tipo: "leve",
        peso: 4,
        description: "Composta por várias camadas de tecido sobrepostas. É a armadura mais leve, mas também é a que oferece menos proteção. Bônus de Valor de Defesa + 1."
    },
    {
        name: "Corset de Couro",
        price: 200,
        bonusDefesa: 2,
        tipo: "leve",
        peso: 5,
        description: "O peitoral desta armadura é feito de couro curtido, misturado com tecido para ter mobilidade. Bônus de Valor de Defesa + 2."
    },
    {
        name: "Camisa de Cota de Malha",
        price: 400,
        bonusDefesa: 3,
        tipo: "leve",
        peso: 6,
        description: "Versão mais leve da cota de malha, cobrindo apenas o torso. Bônus de Valor de Defesa + 3."
    },
    {
        name: "Couro Batido",
        price: 600,
        bonusDefesa: 4,
        tipo: "leve",
        peso: 7,
        description: "Versão mais pesada do corselete de couro, reforçada com rebites de metal. Bônus de Valor de Defesa + 4."
    },
    {
        name: "Armadura Cerimonial",
        price: 1000,
        bonusDefesa: 5,
        tipo: "leve",
        peso: 8,
        description: "Formada por uma couraça de bronze, aço e outros metais. Uma manga de couro e um grande elmo detalhado com viseira dão contraste ao peitoral colorido. Para efeitos de beleza e funcionalidade, a armadura de cerimonial é considerada uma armadura leve. Bônus de Valor de Defesa + 4."
    }
];

// ============================================================================
// ESCUDOS
// ============================================================================
export const escudos = [
    { 
        name: "Escudo simples", 
        description: "Concede +2 no Valor de Defesa.", 
        price: 15, 
        bonusDefesa: 2,
        peso: 3
    },
    { 
        name: "Escudo pesado", 
        price: 30, 
        bonusDefesa: 2,
        peso: 6,
        description: "Ação Buscar Cobertura: posiciona no chão para cobertura completa contra um inimigo até seu próximo turno (não podendo atacar e seu movimento é reduzido pela metade). Escudo robusto que pode ser fincado no solo para proteção estática."
    },
    { 
        name: "Escudo de duelo", 
        description: "Reação: aparar um golpe para ganhar +2 no Valor de Defesa até o início do próximo turno. Escudo leve que permite aparar ataques com o braço livre.", 
        price: 50, 
        bonusDefesa: 1,
        peso: 2
    }
];

// ============================================================================
// ARMAS SIMPLES
// ============================================================================
export const armasSimples = [
    { 
        name: "Adaga", 
        description: "Esta faca afiada é muito usada por ladrões e assassinos, por ser facilmente escondida. O personagem recebe um bônus de +4 em testes de furtividade para escondê-la com a ação Esconder. Críticos têm 3 pontos de dano adicionais após dobrar o dano causado. Será considerado acerto crítico em 19 ou 20 no rolamento.", 
        price: 2, 
        dano: "1d4", 
        critico: 19,
        tipo: "simples",
        peso: 0.5
    },
    { 
        name: "Adaga de mola", 
        description: "Esta adaga é mantida em uma tira de couro presa ao antebraço. Quando o usuário gira seu pulso de um jeito específico (ação livre), a adaga salta para sua mão. Funciona apenas uma vez por combate.", 
        price: 4, 
        dano: "1d4", 
        critico: 19,
        tipo: "simples",
        peso: 0.5
    },
    { 
        name: "Arco curto", 
        description: "Uso comum em florestas e ambientes fechados, próprio para caçadas.", 
        price: 25, 
        dano: "1d6", 
        critico: 20,
        tipo: "simples",
        peso: 1
    },
    { 
        name: "Azagaia", 
        price: 4, 
        description: "Lança curta e delgada usada como arma de arremesso por caçadores.", 
        dano: "1d6", 
        critico: 20,
        tipo: "simples",
        peso: 1
    },
    { 
        name: "Bastão acolchoado", 
        description: "Um pedaço sólido de madeira, coberto por uma camada grossa de lã, causa dano não-letão.", 
        price: 5, 
        dano: "1d4", 
        critico: 20,
        tipo: "simples",
        peso: 2
    },
    { 
        name: "Besta leve", 
        description: "Um arco montado sobre uma coronha de madeira com gatilho, dispara virotes com grande potência.", 
        price: 25, 
        dano: "1d8", 
        critico: 20,
        tipo: "simples",
        peso: 2
    },
    { 
        name: "Bordão", 
        description: "Um cajado apreciado por viajantes e camponeses; prático como uma clava e de custo zero.", 
        price: 0, 
        dano: "1d6", 
        critico: 20,
        tipo: "simples",
        peso: 1.5
    },
    { 
        name: "Clava", 
        description: "Pedaço de madeira usado como arma improvisada; custo zero.", 
        price: 1, 
        dano: "1d4", 
        critico: 20,
        tipo: "simples",
        peso: 1
    },
    { 
        name: "Espada curta", 
        description: "Espada de 40–50 cm, versátil e fácil de manejar. Combatente com 1 ponto em Combate Defensivo recebe +1 de acerto se usar esta arma com escudo.", 
        price: 10, 
        dano: "1d6", 
        critico: 20,
        tipo: "simples",
        peso: 1
    },
    { 
        name: "Funda", 
        description: "Tira de couro usada para arremessar balas de metal ou pedras. Aplica modificador de Força ao dano; colocar munição é ação.", 
        price: 0.2, 
        dano: "1d4", 
        critico: 20,
        tipo: "simples",
        peso: 0.1
    },
    { 
        name: "Lança", 
        description: "Haste com ponta afiada; facilmente fabricada e arremessável.", 
        price: 1, 
        dano: "1d6/1d8", 
        critico: 20,
        tipo: "simples",
        peso: 1.5
    },
    { 
        name: "Maça", 
        description: "Bastão metálico com peso protuberante, efetivo contra não mortos. Dobra o dano contra constructos e esqueletos.", 
        price: 50, 
        dano: "1d6", 
        critico: 20,
        tipo: "simples",
        peso: 2
    },
    { 
        name: "Machadinha", 
        description: "Ferramenta leve de corte que também funciona como arma arremessável.", 
        price: 5, 
        dano: "1d6", 
        critico: 20,
        tipo: "simples",
        peso: 1
    },
    { 
        name: "Martelo leve", 
        price: 2, 
        dano: "1d4", 
        critico: 20,
        tipo: "simples",
        peso: 1
    },
    { 
        name: "Tacape", 
        description: "Clava grande, às vezes cravada de pregos, simples mas brutal.", 
        price: 0, 
        dano: "1d8", 
        critico: 20,
        tipo: "simples",
        peso: 2
    }
];

// ============================================================================
// ARMAS MARCIAIS
// ============================================================================
export const armasMarciais = [
    { 
        name: "Aji", 
        description: "Peça metálica em forma de arco, onde a lâmina seria o arco propriamente dito e a empunhadura seria a corda. Pode ser usada em conjunto em ambas as mãos sem estilo especial.", 
        price: 2, 
        dano: "1d6", 
        critico: 20,
        tipo: "marcial",
        peso: 0.5
    },
    { 
        name: "Alabarda", 
        description: "Pode usar a ação Derrubar junto ao ataque, uma vez por turno. Se o alvo estiver a 1,5 m, o dano cai para 1d8. Arma de infantaria padrão em fortificações. Haste longa com lâmina meia-lua e ponta perfurante.", 
        price: 20, 
        dano: "1d10", 
        critico: 20,
        tipo: "marcial",
        peso: 3
    },
    { 
        name: "Alfange", 
        description: "Vantagem em manter na mão e desvantagem do oponente ao tentar desarmar. Espada de lâmina larga e curva, usada por guerreiros do Deserto.", 
        price: 25, 
        dano: "1d8", 
        critico: 20,
        tipo: "marcial",
        peso: 1.5
    },
    { 
        name: "Arco Longo", 
        description: "Aplica modificador de Força em ataque e dano. Arco recurvado de materiais laminados que mantém a tensão mesmo desarmado, disparando com mais força.", 
        price: 50, 
        dano: "1d8", 
        critico: 20,
        tipo: "marcial",
        peso: 1
    },
    { 
        name: "Balestra", 
        price: 70, 
        dano: "1d12", 
        critico: "18-20", 
        description: "Recarregar é uma ação; crítico em 18+; aplica modificador de Força no dano. Besta com mecanismo pesado que permite usar toda a força ao engatilhar.",
        tipo: "marcial",
        peso: 3
    },
    { 
        name: "Besta de Mão", 
        description: "Saque e ataque na mesma rodada: oponente desprevenido (uma vez por combate) e vantagem no ataque; recarregar é ação. Miniatura de besta para ocultar sob casaco, usada por nobres e assassinos.", 
        price: 25, 
        dano: "1d6", 
        critico: 20,
        tipo: "marcial",
        peso: 1
    },
    {
        name: "Besta de Repetição",
        price: 100,
        dano: "1d8",
        tipoDano: "perfurante",
        alcance: "24/120 m",
        propriedades: ["cartucho de 10 virotes"],
        description: "Trocar ou recarregar o cartucho: ação. Besta acoplada a caixa com mecanismo automático que recarrega até dez virotes.",
        tipo: "marcial",
        peso: 2.5
    },
    {
        name: "Besta Pesada",
        price: 50,
        dano: "1d10",
        tipoDano: "perfurante",
        alcance: "30/120 m",
        propriedades: ["duas mãos"],
        description: "Carregar exige uma ação ou um ataque. Versão maior e mais potente da besta leve, exige as duas mãos para usar.",
        tipo: "marcial",
        peso: 3
    },
    { 
        name: "Cajado de batalha", 
        description: "Cajado de madeira reforçado com chapas de metal nas pontas, usado por andarilhos que não querem levantar suspeitas.", 
        price: 0.2, 
        dano: "1d4/1d6", 
        critico: 20,
        tipo: "marcial",
        peso: 2
    },
    { 
        name: "Chicote", 
        description: "Pode trocar um ataque para tentar derrubar ou desarmar (60% de chance de acerto). Arma longa e flexível que pode enroscar-se no adversário, ideal para manobras de controle.", 
        price: 10, 
        dano: "1d4", 
        critico: 20,
        tipo: "marcial",
        peso: 0.5
    },
    { 
        name: "Cimitarra", 
        description: "Vantagem em manter na mão e desvantagem para quem tenta desarmar. Espada de lâmina larga e curva, usada por guerreiros do Mar.", 
        price: 25, 
        dano: "1d4", 
        critico: 20,
        tipo: "marcial",
        peso: 1.5
    },
    { 
        name: "Corrente com Cravos", 
        description: "Pode trocar um ataque para agarrar (DC 10 + bônus de proficiência); alvo preso só se move em direção à outra ponta ou sofre 1d4 perfurante. Corrente com pequenos espinhos, ótima para controlar e prender o inimigo.", 
        price: 30, 
        dano: "1d4", 
        critico: 20,
        tipo: "marcial",
        peso: 1.5
    },
    { 
        name: "Espada Bastarda", 
        description: "Se empunhada com uma mão sem nada na outra, pode usar ação bônus para arco de corte em área (dano = mod. de Força). Espada grande e exótica, eficaz contra armaduras completas.", 
        price: 30, 
        dano: "1d10/1d12", 
        critico: 20,
        tipo: "marcial",
        peso: 2.5
    },
    { 
        name: "Espada Grande", 
        description: "Golpe carregado: ao realizar um ataque pode escolher fazê-lo carregado causando o dobro do dano, entretanto perde –1 no Valor de Defesa até o próximo turno para cada ataque carregado feito. Requer Força ≥ 5 ou faça todo ataque com esta arma com desvantagem. Espada de 1,5 m, poderosa mas pesada, ideal para um único golpe decisivo.", 
        price: 15, 
        dano: "2d6", 
        critico: 20,
        tipo: "marcial",
        peso: 4
    },
    { 
        name: "Espada Longa", 
        description: "Espada versátil e prática que pode ser usada com uma ou duas mãos. Uma vez por rodada, ao usar a ação Atacar com duas mãos, causa +1d8 de dano adicional (manobra de alavanca).", 
        price: 50, 
        dano: "1d8/1d10", 
        critico: 20,
        tipo: "marcial",
        peso: 1.5
    },
    { 
        name: "Florete", 
        description: "Lâmina fina e afiada, muito precisa, usada para manobras de engano. Uma vez por combate, pode finta como ação de ataque para impor –1 em acertos contra si até o fim do turno (50% de chance de funcionar).", 
        price: 25, 
        dano: "1d8", 
        critico: 20,
        tipo: "marcial",
        peso: 1
    },
    {
        name: "Florete-Agulha",
        price: 40,
        dano: "1d8",
        tipoDano: "perfurante",
        propriedades: ["leve", "acuidade", "espada de uma mão"],
        description: "Florete com êmbolo interno que injeta veneno no alvo. Como o florete, + interno de veneno de contato (aplicar é ação inteira); inimigos têm –1 para se livrar do veneno.",
        tipo: "marcial",
        peso: 1
    },
    {
        name: "Fogo Alquímico",
        price: 50,
        dano: "1d6",
        tipoDano: "impacto / fogo",
        alcance: "alcance à distância",
        propriedades: ["frágil"],
        usoEspecial: "Acerto causa condição Queimando (1d6 no fim do próximo turno); erro causa metade do dano, sem fogo.",
        description: "Frasco de substância que inflama ao contato com o ar.",
        tipo: "marcial",
        peso: 0.5
    },
    { 
        name: "Foice", 
        description: "Foice de combate bem equilibrada, capaz de infligir ferimentos profundos. Após um ataque, como reação pode tentar causar condição Sangrando (40% de chance; não pode repetir no mesmo turno).", 
        price: 30, 
        dano: "1d8", 
        critico: 18,
        tipo: "marcial",
        peso: 2
    },
    { 
        name: "Katana", 
        description: "Lâmina curva única, temperada e incrustada, considerada obra-prima. Obra-prima: +1 no rolamento de acerto.", 
        price: 200, 
        dano: "1d8/1d10", 
        critico: 20,
        tipo: "marcial",
        peso: 1.5
    },
    { 
        name: "Lança de Falange", 
        description: "Versão longa da lança, balanceada para falange; pesada e arremessável.", 
        price: 5, 
        dano: "1d10/1d12", 
        critico: 20,
        tipo: "marcial",
        peso: 2.5
    },
    { 
        name: "Lança Montada", 
        description: "Lança adaptada para uso a cavalo, permite golpe de investida poderoso. Investida montada: dano dobrado; só funciona montado (1 mão).", 
        price: 15, 
        dano: "2d6/1d10", 
        critico: 20,
        tipo: "marcial",
        peso: 3
    },
    { 
        name: "Maça Estrela", 
        description: "Maça com espinhos pontiagudos que causam ferimentos profundos. Dobra o dano contra constructos e esqueletos.", 
        price: 15, 
        dano: "1d8", 
        critico: 20,
        tipo: "marcial",
        peso: 2
    },
    { 
        name: "Maça de Guerra", 
        description: "Maça pesada com cabeça metálica, poderosa mas desajeitada. –1 no ataque; dobra dano contra constructos e esqueletos.", 
        price: 30, 
        dano: "1d12", 
        critico: 20,
        tipo: "marcial",
        peso: 3
    },
    { 
        name: "Machado Anão", 
        description: "Machado favorito dos anões; pesado demais sem treino.", 
        price: 50, 
        dano: "1d12", 
        critico: 20,
        tipo: "marcial",
        peso: 4
    },
    {
        name: "Machado de Batalha",
        price: 10,
        dano: "1d8 (1 mão) / 1d10 (2 mãos)",
        tipoDano: "corte",
        propriedades: ["versátil"],
        description: "Machado grande de guerra, com chance de dano bônus no crítico. No rolamento de um 20 no d20: o ataque causa +1d6 de dano extra.",
        tipo: "marcial",
        peso: 2
    },
    { 
        name: "Machado Grande", 
        description: "Imenso machado de lâmina dupla, perigoso e com chance de dano bônus no crítico. No rolamento de 0 no d20: +1d6 de dano extra (após cálculo de crítico).", 
        price: 30, 
        dano: "1d12", 
        critico: 20,
        tipo: "marcial",
        peso: 4
    },
    { 
        name: "Mangual", 
        description: "Haste metálica ligada a esfera de aço, ideal para desarmar e combater escudos. Pode enroscar e desarmar ao atacar (uma vez por turno) e recebe +1 em acertos contra oponentes com escudos.", 
        price: 10, 
        dano: "1d8", 
        critico: 20,
        tipo: "marcial",
        peso: 2
    },
    { 
        name: "Mangual Pesado", 
        description: "Versão mais pesada do mangual, para uso a duas mãos, com desarme e bônus contra escudos. Mesmas habilidades do mangual normal, mas usada com duas mãos.", 
        price: 0.2, 
        dano: "1d10", 
        critico: 20,
        tipo: "marcial",
        peso: 3.5
    },
    { 
        name: "Manopla Espada", 
        description: "Braçadeira com lâmina paralela ao antebraço, protege o braço e oferece bônus de defesa. Concede +1 no Valor de Defesa (ou +2 se usar uma em cada braço com Regalia de Combate com Duas Armas).", 
        price: 25, 
        dano: "1d6", 
        critico: 20,
        tipo: "marcial",
        peso: 1
    },
    { 
        name: "Marreta", 
        description: "Martelo com cabo longo e cabeça pesada, desajeitado mas poderoso contra construções. Causa dano dobrado a estruturas e construtos de pedra.", 
        price: 5, 
        dano: "2d6", 
        critico: 20,
        tipo: "marcial",
        peso: 5
    },
    { 
        name: "Marreta Estilhaçadora", 
        description: "Grande marreta de guerra que despedaça armaduras e reduz armadura em crítico. Crítico: ao invés de multiplicar dano, reduz em 2 o bônus de armadura natural ou da armadura do alvo até o fim do próximo turno.", 
        price: 10, 
        dano: "2d6", 
        critico: 20,
        tipo: "marcial",
        peso: 5
    },
    {
        name: "Martelo",
        price: 2,
        dano: "1d4 impacto",
        tipoDano: "impacto",
        propriedades: ["leve", "1 mão", "dano máximo contra esqueletos e construtos de ossos"],
        description: "Ferramenta para pregos que vira arma eficaz contra esqueletos. Sempre causa dano máximo contra esqueletos e construtos de ossos.",
        tipo: "marcial",
        peso: 1
    },
    { 
        name: "Martelo de guerra", 
        description: "Versão militar do martelo, preferida por anões, efetiva contra mortos-vivos. Sempre causa dano máximo contra esqueletos e construtos de ossos.", 
        price: 15, 
        dano: "1d8", 
        critico: 20,
        tipo: "marcial",
        peso: 2
    },
    { 
        name: "Mosquete", 
        description: "Arma de uso complicado e devastadora, com longo alcance e recarga lenta. Produz enorme som ao disparar; recarregar é uma ação.", 
        price: 500, 
        dano: "2d8", 
        critico: 20,
        tipo: "marcial",
        peso: 4
    },
    { 
        name: "Nunchaku", 
        description: "Dois bastões unidos por corrente; versátil para artes marciais com efeitos especiais para monges. Quando usado por monge, causa 1d10 de impacto e impõe desvantagem no teste para não ser atordoado.", 
        price: 2, 
        dano: "1d6", 
        critico: 20,
        tipo: "marcial",
        peso: 0.5
    },
    { 
        name: "Pique", 
        description: "Lança muito longa, ideal para manter distância e punir montados. Bônus de +1 em acertos contra alvos montados ou voadores no alcance.", 
        price: 10, 
        dano: "1d10", 
        critico: 20,
        tipo: "marcial",
        peso: 3
    },
    { 
        name: "Pistola", 
        description: "Arma de fogo leve de dois tiros, popular e beneficiada por empunhadura estável. Ganha +2 na iniciativa; se usada com duas mãos, +1 na jogada de acerto.", 
        price: 180, 
        dano: "1d8", 
        critico: 20,
        tipo: "marcial",
        peso: 1
    },
    { 
        name: "Pistola de Tambor", 
        description: "Pistola com tambor giratório que permite até quatro disparos antes de recarregar. +2 na iniciativa quando empunhada em uma mão e nada na outra.", 
        price: 400, 
        dano: "1d8", 
        critico: 20,
        tipo: "marcial",
        peso: 1.5
    },
    {
        name: "Pó da Explosão Solar",
        price: 100,
        dano: "—",
        tipoDano: "granada",
        propriedades: ["consumível", "área 6 m", "atordoamento"],
        description: "Frasco de cerâmica com pó explosivo que ofusca e atordoa no impacto. Ao quebrar, todas as criaturas num raio de 6 m ficam atordoadas por 1 rodada.",
        tipo: "marcial",
        peso: 0.3
    },
    { 
        name: "Rede", 
        description: "Rede com dentes na trama, usada para imobilizar e controlar inimigos. Acerto restringe e permite limitar movimento; é preciso ação completa + teste (CD 10) ou rasgar (5 PV) para liberar.", 
        price: 1, 
        dano: "0", 
        critico: 20,
        tipo: "marcial",
        peso: 1.5
    },
    { 
        name: "Sabre Serrilhado", 
        description: "Lâmina dentada que rasga e prende na carne, causando dano contínuo até ser removida. No crítico, fica presa: arrancar provoca 2d4 de dano; enquanto preso, causa 1d4 a cada ação da vítima.", 
        price: 25, 
        dano: "1d8", 
        critico: 20,
        tipo: "marcial",
        peso: 1.5
    },
    { 
        name: "Sai", 
        description: "Adaga em forma de garfo, ideal para prender e desarmar armas adversárias. Pode trocar um ataque pela ação desarmar; crítico em 19–20.", 
        price: 10, 
        dano: "1d4", 
        critico: 19,
        tipo: "marcial",
        peso: 0.5
    },
    { 
        name: "Tridente", 
        description: "Lança com múltiplas pontas, menos penetrante sem armadura, mas letal na água. +1 em acertos contra criaturas aquáticas quando em água.", 
        price: 5, 
        dano: "1d10", 
        critico: 20,
        tipo: "marcial",
        peso: 2
    },
    { 
        name: "Wakizashi", 
        description: "Versão mais curta da Katana. Junto com ela formam o Daisho, armas tradicionais do guerreiro de katana. A katana e a wakizashi são armas obra-prima (+1 acerto). Se usada em conjunto a uma katana, pode se atacar com a wakizashi na mesma ação que a katana. Ao atacar com a wakizashi desta maneira é gerado penalidade de ataque para o próximo ação de ataque como se fossem duas ações e não uma.", 
        price: 150, 
        dano: "1d6", 
        critico: 20,
        tipo: "marcial",
        peso: 1
    }
];

// ============================================================================
// ARMAS EXÓTICAS
// ============================================================================
export const armasExoticas = [
    { 
        name: "Catapulta de Braço", 
        description: "Recarregar é uma ação livre. Engenho halfling preso ao braço que arremessa pedras quase tão longe quanto um arco.", 
        price: 25, 
        dano: "1d6", 
        critico: 20,
        tipo: "exotica",
        peso: 1
    },
    { 
        name: "Manopla de espinhos", 
        description: "Luva de couro com espinhos, usada por pugilistas; concede +1 no dano de ataques desarmados. Não pode sofrer desarme.", 
        price: 10, 
        dano: "+1 ataques desarmados", 
        critico: 20,
        tipo: "exotica",
        peso: 0.5
    },
    { 
        name: "Espada Bastarda (uma mão)", 
        description: "Se empunhada com uma mão sem nada na outra, pode usar ação bônus para arco de corte em área (dano = mod. de Força). Espada grande e exótica, eficaz contra armaduras completas.", 
        price: 30, 
        dano: "1d10", 
        critico: 20,
        tipo: "exotica",
        peso: 2.5
    },
    { 
        name: "Espada Lâminas Duplas", 
        description: "Pode fazer um ataque bônus sempre que usar a ação de atacar. Duas lâminas opostas num mesmo cabo; exige treino para evitar ferir-se.", 
        price: 40, 
        dano: "1d8", 
        critico: 20,
        tipo: "exotica",
        peso: 3
    },
    { 
        name: "Espada Diapasão", 
        description: "Interagir com o chão como ação para fazê-la vibrar: ataques seguintes causam +1d6 até o fim do próximo turno. Espada com lâminas duplas paralelas que ressoam para desorientar oponentes.", 
        price: 60, 
        dano: "1d8", 
        critico: 20,
        tipo: "exotica",
        peso: 2
    },
    { 
        name: "Espada Táurica", 
        description: "Espada gigantesca usada pelos campeões minotauros. Requer Força ≥ 10 ou sofre desvantagem para cada 3 pontos abaixo de 10. Se tiver força inferior a 3 não consegue manusear a espada. Desvantagem em ambientes fechados.", 
        price: 100, 
        dano: "3d6", 
        critico: 20,
        tipo: "exotica",
        peso: 8
    },
    { 
        name: "Katana (uma mão)", 
        description: "Lâmina curva única, temperada e incrustada, considerada obra-prima. Obra-prima: +1 no rolamento de acerto.", 
        price: 200, 
        dano: "1d8", 
        critico: 20,
        tipo: "exotica",
        peso: 1.5
    },
    { 
        name: "Katar", 
        description: "Punho com lâminas frontais, ideal para golpes perfurantes. Crítico triplica o dano em vez de dobrar.", 
        price: 40, 
        dano: "1d4", 
        critico: 19,
        tipo: "exotica",
        peso: 0.5
    },
    { 
        name: "Lança Falange (uma mão)", 
        description: "Versão longa da lança, balanceada para falange; pesada e arremessável.", 
        price: 5, 
        dano: "1d8", 
        critico: 20,
        tipo: "exotica",
        peso: 2
    },
    { 
        name: "Lança foguete", 
        description: "Lança com reservatório de pólvora que boosta o próximo arremesso. Ação livre ativa foguete: próximo arremesso tem alcance dobrado, vantagem e +1d6 de dano. Depois, inútil.", 
        price: 20, 
        dano: "1d6/1d8", 
        critico: 20,
        tipo: "exotica",
        peso: 2
    },
    { 
        name: "Lança Mola", 
        description: "Haste retrátil com mola interna para ataque de curto alcance aprimorado. Ação livre dispara mola (+2 no ataque, alcance = 3 m); desmontar/regenerar mola é ação.", 
        price: 5, 
        dano: "1d6/1d8", 
        critico: 20,
        tipo: "exotica",
        peso: 1.5
    },
    { 
        name: "Machado Anão (uma mão)", 
        description: "Machado favorito dos anões; pesado demais sem treino.", 
        price: 50, 
        dano: "1d10", 
        critico: 20,
        tipo: "exotica",
        peso: 3
    },
    { 
        name: "Maça Granada", 
        description: "Maça com carga explosiva na cabeça, que detona sob grande pressão em acerto crítico. Acerto crítico: além de infligir dano dobrado, causa explosão (4d4 fogo no alvo e 2d4 fogo no usuário). Após explodir, fica inutilizada.", 
        price: 20, 
        dano: "1d8", 
        critico: 20,
        tipo: "exotica",
        peso: 2.5
    },
    { 
        name: "Machado Táurico", 
        description: "Exige Força 12 ou mais para ser manuseado. Quando um atacante usando esta arma rola um acerto crítico esta arma causa 1d12 de dano extra. Esta arma de duas mãos causa 4d6 de dano cortante com alcance de 3 metros.", 
        price: 80, 
        dano: "4d6", 
        critico: 20,
        tipo: "exotica",
        peso: 10
    },
    { 
        name: "Marreta Pistão", 
        description: "Marreta de duas mãos com carga de vapor, poderosa contra estruturas e construtos. Ação para carregar vapor concede dupla vantagem na jogada de acerto; dano dobrado em estruturas.", 
        price: 15, 
        dano: "2d6", 
        critico: 20,
        tipo: "exotica",
        peso: 6
    },
    { 
        name: "Martelo Pistão", 
        description: "Martelo avançado com mecanismo interno de vapor, letal contra esqueletos. Ação para carregar pistão concede dupla vantagem na jogada de acerto; dano máximo em esqueletos.", 
        price: 40, 
        dano: "1d10", 
        critico: 20,
        tipo: "exotica",
        peso: 3
    },
    { 
        name: "Montante Cinético", 
        description: "Imensa espada com esferas internas que aumentam impacto, mas pode ferir o usuário. Em rolamento de 1 no d20, na jogada de ataque: você sofre o dano da arma (com bônus) em si mesmo.", 
        price: 250, 
        dano: "3d6", 
        critico: 20,
        tipo: "exotica",
        peso: 7
    },
    { 
        name: "Mosquetão", 
        description: "Mosquete de cano grosso, foca em curto alcance com grande impacto, mas com desvantagem. Se errar ataque proficiente, ainda causa 1d8 perfurante sem bônus de Destreza.", 
        price: 600, 
        dano: "4d8", 
        critico: 20,
        tipo: "exotica",
        peso: 5
    },
    { 
        name: "Presa da Serpente", 
        description: "Espada de obsidiana frágil que impõe sangramento e pode se partir em combate. Acertos causam a condição Sangrando; se o total do ataque ≤ 8 ou falha crítica, a arma quebra.", 
        price: 30, 
        dano: "2d4", 
        critico: 17,
        tipo: "exotica",
        peso: 1
    },
    { 
        name: "Vara relâmpago", 
        description: "Vara arcana que dispara descargas elétricas corpo a corpo, recarregável com PMs. Crítico: triplica o dano e consome 3 cargas (se não houver, descarrega tudo sem bônus).", 
        price: 300, 
        dano: "3d8", 
        critico: 20,
        tipo: "exotica",
        peso: 1.5
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
    {
        name: "Kit Médico",
        description: "Inclui bandagens, anti sépticos, tesoura médica e outros itens para primeiros socorros.",
        price: 50,
        peso: 2
    },
    {
        name: "Kit de Herborista",
        description: "Contém ervas medicinais, pilão, mortalha e outros itens para preparar remédios naturais.",
        price: 20,
        peso: 2
    },
    {
        name: "Kit de Sobrevivência",
        description: "Inclui faca, corda, fósforos, cantil e outros itens essenciais para sobreviver ao ar livre.",
        price: 30,
        peso: 3
    },
    {
        name: "Kit de Ferramentas",
        description: "Contém martelo, chave de fenda, alicate e outros itens úteis para consertar e construir objetos.",
        price: 25,
        peso: 4
    },
    {
        name: "Kit de Alquimista",
        description: "Inclui frascos vazios, substâncias químicas básicas, tubos de ensaio e outros itens para alquimia.",
        price: 60,
        peso: 3
    },
    {
        name: "Kit de Ladrão",
        description: "Contém Ferramentas de ladrão, pés de cabra, cordas e outros itens para atividades furtivas.",
        price: 40,
        peso: 2
    },
    {
        name: "Kit de Explorador",
        description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.",
        price: 35,
        peso: 2
    },
    {
        name: "Kit de Disfarces",
        description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.",
        price: 50,
        peso: 3
    },
    {
        name: "Kit de Músico",
        description: "Inclui instrumentos musicais, partituras, cordas de reposição e outros itens para tocar música.",
        price: 55,
        peso: 3
    },
    {
        name: "Ferramentas de ladrão",
        description: "Contém ferramentas especializadas, como pés de cabra, brocas manuais e chave de fenda para abrir fechaduras.",
        price: 45,
        peso: 1
    },
    {
        name: "Kit de Cartografia",
        description: "Inclui pergaminhos, pena, tinta e outros itens para desenhar mapas e fazer anotações.",
        price: 30,
        peso: 1.5
    },
    {
        name: "Kit de Venenos",
        description: "Contém frascos de veneno, luvas, aplicadores e outros itens para lidar com substâncias tóxicas.",
        price: 70,
        peso: 1.5
    },
    {
        name: "Kit de Engenhocas",
        description: "Inclui engrenagens, molas, fios e outros itens para criar dispositivos e armadilhas improvisadas.",
        price: 60,
        peso: 3
    },
    {
        name: "Kit de Escalada",
        description: "Contém cordas, mosquetões, ganchos e outros itens para escalada e rapel.",
        price: 40,
        peso: 4
    },
    {
        name: "Kit de Caça",
        description: "Inclui armadilhas, armas de caça, iscas e outros itens para caçar e rastrear animais.",
        price: 45,
        peso: 4
    },
    {
        name: "Kit de Sobrevivência Aquática",
        description: "Contém nadadeiras, redes de pesca, arpão e outros itens para sobreviver em ambientes aquáticos.",
        price: 50,
        peso: 5
    }
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

// Alias para compatibilidade
export const categories = equipamentos;

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Retorna todas as categorias de equipamentos
 */
export const getCategorias = () => Object.keys(equipamentos);

/**
 * Retorna os itens de uma categoria específica
 */
export const getEquipamentosPorCategoria = (categoria) => equipamentos[categoria] || [];

/**
 * Busca um equipamento pelo nome em todas as categorias
 */
export const getEquipamento = (nome) => {
    for (const categoria of Object.values(equipamentos)) {
        const item = categoria.find(e => e.name === nome);
        if (item) return item;
    }
    return null;
};

/**
 * Retorna todas as armas (simples + marciais + exóticas)
 */
export const getTodasArmas = () => [...armasSimples, ...armasMarciais, ...armasExoticas];

/**
 * Retorna todas as armaduras (pesadas + médias + leves)
 */
export const getTodasArmaduras = () => [...armadurasPesadas, ...armadurasMedidas, ...armadurasLeves];

/**
 * Busca equipamentos por faixa de preço
 */
export const getEquipamentosPorPreco = (minPrice, maxPrice) => {
    const result = [];
    for (const [categoria, items] of Object.entries(equipamentos)) {
        const filtered = items.filter(item => 
            item.price >= minPrice && item.price <= maxPrice
        );
        if (filtered.length > 0) {
            result.push({ categoria, items: filtered });
        }
    }
    return result;
};

/**
 * Retorna todos os equipamentos para uso em selects
 */
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

/**
 * Calcula o peso/carga total de uma lista de equipamentos
 */
export const calcularCargaTotal = (listaEquipamentos) => {
    // Implementação básica - pode ser expandida com pesos específicos
    return listaEquipamentos.length;
};

/**
 * Busca o peso de um item pelo nome no catálogo
 * @param {string} nomeItem - Nome do item
 * @returns {number} Peso do item em kg, ou 0 se não encontrado
 */
export const getPesoItem = (nomeItem) => {
    if (!nomeItem) return 0;
    
    // Procura em todas as categorias
    for (const categoria of Object.values(equipamentos)) {
        const item = categoria.find(i => 
            i.name?.toLowerCase() === nomeItem.toLowerCase() ||
            i.nome?.toLowerCase() === nomeItem.toLowerCase()
        );
        if (item && item.peso !== undefined) {
            return item.peso;
        }
    }
    return 0;
};

/**
 * Enriquece uma lista de equipamentos com peso do catálogo
 * Útil para personagens criados antes do sistema de peso
 * @param {Array} itens - Lista de itens do inventário
 * @returns {Array} Lista com pesos preenchidos
 */
export const enriquecerComPeso = (itens = []) => {
    return itens.map(item => {
        // Se já tem peso, mantém
        if (item.peso !== undefined && item.peso !== null) {
            return item;
        }
        // Busca peso pelo nome
        const pesoEncontrado = getPesoItem(item.name || item.nome);
        return {
            ...item,
            peso: pesoEncontrado
        };
    });
};

/**
 * Retorna armas por tipo de dano
 */
export const getArmasPorTipoDano = (tipoDano) => {
    return getTodasArmas().filter(arma => 
        arma.tipoDano?.toLowerCase().includes(tipoDano.toLowerCase())
    );
};

/**
 * Retorna armaduras por valor de defesa mínimo
 */
export const getArmadurasPorDefesa = (minDefesa) => {
    return getTodasArmaduras().filter(armadura => 
        (armadura.defesa || armadura.bonusDefesa || 0) >= minDefesa
    );
};
