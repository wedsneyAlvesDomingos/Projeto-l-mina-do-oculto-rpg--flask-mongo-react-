import React, { useState, useEffect } from 'react';
import { Container, Paper, Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./equipment.css";


const EquipmentPage = () => {

    const [equipmentValue, setEquipmentValue] = useState(() => {
        const savedValue = localStorage.getItem('equipmentValue');
        // Verifica se savedValue é null e retorna 0 caso contrário
        return savedValue !== null ? JSON.parse(savedValue) : 0;
    });

    // Atualiza o localStorage sempre que equipmentValue mudar
    useEffect(() => {
        if (equipmentValue !== null) {
            localStorage.setItem('equipmentValue', JSON.stringify(equipmentValue));
        }
    }, [equipmentValue]);

    const handleEquipTABChange = (event, newValue) => {
        // Garante que newValue seja válido
        if (newValue !== null && newValue !== undefined) {
            setEquipmentValue(newValue);
        }
    };
    const armas = [
        {
            "nome": 'Adaga',
            "descricao": 'Essa faca afiada é muito usada por ladrões e assassinos, por ser facilmente escondida. O personagem recebe um bônus de +4 em testes de furtividade para escondê-la com a ação esconder. Uma adaga também pode ser arremessada. Críticos têm 3 pontos de dano adicionais após dobrar o dano causado. Será considerado acerto crítico em 19 ou 20 no rolamento. Causa 1d4 de dano de corte, arma leve, arremessável (alcance de 6/18 metros) e acuidade.',
            "preco": '2 M.O.',
            "dano": '1d4 de dano de corte',
            "alcance": '6/18 metros'
        },
        {
            "nome": 'Adaga com Mola',
            "descricao": 'Esta adaga é mantida em uma tira de couro presa ao antebraço. Quando o usuário gira seu pulso de um jeito específico (uma ação livre), a adaga salta para sua mão. Se o personagem sacar a adaga com mola e, na mesma rodada usá-la para atacar, o oponente fica surpreso contra esse ataque (mas esse truque só funciona uma vez por combate).',
            "preco": '4 M.O.',
            "dano": '1d4 de dano de corte',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Aji',
            "descricao": 'A Aji é uma peça metálica em forma de arco, onde a lâmina seria o arco propriamente dito e a empunhadura seria a corda. A Aji é facilmente usada em conjunto e por isso não precisa de ter estilo de luta para usar duas dessa arma, uma em cada mão.',
            "preco": '4 M.O. / unidade',
            "dano": '1d6 de dano de corte',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Alabarda',
            "descricao": 'É uma arma composta por uma longa haste. A haste é rematada por uma peça pontiaguda, de metal, que por sua vez é atravessada por uma lâmina em forma de meia-lua (similar à de um machado). É considerada a arma de infantaria mais eficaz contra invasores em fortificações e muralhas. É por excelência a arma usada pelos guardas de castelos e palácios e aparece como padrão em unidades militares. Ao usar uma alabarda o personagem pode, ao atacar, usar a ação Derrubar no inimigo ao mesmo tempo que o ataque, mas somente uma vez por turno. Se o alvo estiver a 1,5 metros de distância do atacante com uma alabarda o dano da arma cai de 1d10 para 1d8, por causa da dificuldade de manobrar a arma longa em combate tão próximo.',
            "preco": '20 M.O.',
            "dano": '1d10 de dano cortante ou perfurante',
            "alcance": '3 metros'
        },
        {
            "nome": 'Alfange',
            "descricao": 'Espada de lâmina muito larga e curva, usada por guerreiros do Deserto. Ao usar esta arma o personagem tem vantagem em testes para manter a arma na sua mão e atacantes desvantagem para tirá-la.',
            "preco": '25 M.O.',
            "dano": '1d8 de dano cortante',
            "alcance": 'Espada de uma mão'
        },
        {
            "nome": 'Arco Composto',
            "descricao": 'Este arco é feito de chifres, madeira ou ossos laminados, e recurvado de forma a continuar estirado mesmo quando desarmado. O personagem aplica seu modificador de Força nas jogadas de dano e ataque com um arco composto.',
            "preco": '60 M.O.',
            "dano": '1d12 de dano perfurante',
            "alcance": '60 metros (máximo de 195 metros)',
        },
        {
            "nome": 'Arco Curto',
            "descricao": 'Este arco é bastante comum, usado por caçadores e povos selvagens, ideal para ambientes fechados.',
            "preco": '25 M.O.',
            "dano": '1d6 de dano perfurante',
            "alcance": '12 metros (96 metros)'
        },
        {
            "nome": 'Arco Longo',
            "descricao": 'Reforçado e apropriado para campos de batalha, esse arco permite atingir o inimigo a grandes distâncias.',
            "preco": '50 M.O.',
            "dano": '1d8 de dano perfurante',
            "alcance": '45 metros / 180 metros'
        },
        {
            "nome": "Azagaia",
            "descricao": "Azagaia é uma lança curta e delgada, usada como arma de arremesso por povos ou indivíduos caçadores. Também é conhecida como apenas javelin.",
            "preco": "5 PP",
            "dano": "1d6 de dano perfurante",
            "alcance": "12 metros + (1,5 metros x Força)"
        },
        {
            "nome": "Balestra",
            "descricao": "Uma besta com mecanismo pesado, que permite que seu usuário use toda sua força ao engatilhar. O personagem aplica seu modificador de Força nas jogadas de dano com uma balestra. Recarregar esta arma é uma ação. Exige duas mãos.",
            "preco": "70 M.O.",
            "dano": "1d12 de dano perfurante. Ao rolar um 18 ou maior no d20 é um crítico.",
            "alcance": "72/240 metros"
        },
        {
            "nome": "Bastão Acolchoado",
            "descricao": "Um pedaço sólido de madeira, coberto por uma camada grossa de lã. O bastão acolchoado causa dano não-letal.",
            "preco": "5 PC",
            "dano": "2 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Besta de Mão",
            "descricao": "Uma besta em miniatura, ideal para ser escondida sob um casaco, e usada por nobres e assassinos. Se o personagem sacar a besta de mão e, na mesma rodada, usá-la para atacar, o oponente fica desprevenido contra esse ataque (mas esse truque só funciona uma vez por combate) e o ataque ganha vantagem. Recarregar esta arma é uma ação. Exige uma mão.",
            "preco": "75 M.O.",
            "dano": "1d6 de dano perfurante",
            "alcance": "9/27 metros"
        },
        {
            "nome": "Besta de Repetição",
            "descricao": "Esta arma é uma besta (leve ou pesada) acoplada a uma caixa com capacidade de dez virotes. A caixa possui um mecanismo que recarrega a besta automaticamente.",
            "preco": "100 M.O.",
            "dano": "1d8 de dano perfurante",
            "alcance": "24/120 metros"
        },
        {
            "nome": "Besta Leve",
            "descricao": "Um arco montado sobre uma coronha de madeira com um gatilho, a besta leve é uma arma que dispara virotes com grande potência. Exige as duas mãos.",
            "preco": "25 M.O.",
            "dano": "1d8 de dano perfurante",
            "alcance": "24/90 metros"
        },
        {
            "nome": "Besta Pesada",
            "descricao": "Versão maior e mais potente da besta leve. Usar esta besta também exige as duas mãos.",
            "preco": "50 M.O.",
            "dano": "1d10 de dano perfurante",
            "alcance": "30/120 metros"
        },
        {
            "nome": "Bordão",
            "descricao": "Um cajado apreciado por viajantes e camponeses, por sua praticidade e preço, assim como uma clava, seu custo é zero.",
            "preco": "0",
            "dano": "1d6 / 1d8 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": 'Cajado de Batalha',
            "descricao": 'Um cajado de madeira forte, reforçado com chapas de metal nas pontas. É uma arma discreta, usada por andarilhos que não querem levantar suspeitas como rebeldes em regiões imperiais e outros tipos de foragidos. O cajado de batalha é uma arma de duas mãos.',
            "preco": '2 PP',
            "dano": 'Dano de impacto versátil: uma mão 2d4 /duas mãos 3d4',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Catapulta-de-Braço',
            "descricao": 'Um dos diversos engenhos criados por halflings, para praticar seus esportes de arremesso de pedras. A catapulta-de-braço é uma arma que presa ao braço com fivelas, arremessa pedras ao movimento correto do pulso quase tão longe quanto os arcos lançam flechas. Recarregá-la é uma ação livre.',
            "preco": '25 M.O.',
            "dano": '1d6 de dano de impacto',
            "alcance": '9/18 metros'
        },
        {
            "nome": 'Manopla de Espinhos',
            "descricao": 'Uma luva de couro com espinhos, usada por pugilistas e brigões de rua. A manopla de espinhos fornece um bônus de +1 nas jogadas de dano com ataques desarmados. Esta arma não pode ser desarmada.',
            "preco": '10 M.O.',
            "dano": 'Bônus de +1 em dano com ataques desarmados',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Chicote',
            "descricao": 'O personagem pode atacar um inimigo a até 4,5m com um chicote. Esta arma pode se enroscar nas mãos, pernas ou armas do adversário; quando o personagem usa a ação para atacar no seu turno, o personagem pode trocar um ataque para tentar derrubar ou desarmar um alvo. O DC para estas manobras é = 10+ bônus de proficiência.',
            "preco": '10 M.O.',
            "dano": '1d4 de dano cortante',
            "alcance": 'Até 4,5 metros'
        },
        {
            "nome": 'Cimitarra',
            "descricao": 'Espada de lâmina muito larga e curva, usada por guerreiros do Mar. Ao usar esta arma o personagem tem 1 ponto de bônus em testes para manter a arma na sua mão e atacantes desvantagem para tirá-la.',
            "preco": '25 M.O.',
            "dano": '1d4 de dano de corte',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Clava',
            "descricao": 'Um pedaço de madeira empunhado como arma, geralmente usado por bárbaros ou criaturas brutais ou como arma improvisada, como um galho de árvore ou pedaço de mobília. Sendo fácil de conseguir, seu preço é zero.',
            "preco": 'Gratuito',
            "dano": '1d4 de dano de impacto',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Corrente com Cravos',
            "descricao": 'O personagem pode atacar um inimigo a até 4,5m com uma corrente. Esta arma pode se enroscar nas mãos, pernas ou armas do adversário; quando o personagem usa a ação para atacar no seu turno, o personagem pode trocar um ataque para tentar agarrar um alvo e prendê-lo. O DC para esta manobra é = 10+ bônus de proficiência.',
            "preco": '30 M.O.',
            "dano": '1d4 de dano perfurante',
            "alcance": 'Até 4,5 metros'
        },
        {
            "nome": 'Escudo Simples',
            "descricao": 'Bônus de Valor de Defesa igual a +2.',
            "preco": '10 M.O.',
            "dano": 'Nenhum',
            "alcance": 'Defensivo'
        },
        {
            "nome": 'Escudo Pesado',
            "descricao": 'Bônus de Valor de Defesa igual a +2, o usuário deste escudo também pode usar a ação Buscar Cobertura e posicionar o escudo no chão a sua frente e se esconder atrás dele e ganhar uma cobertura completa em uma direção até o início de seu próximo turno.',
            "preco": '20 M.O.',
            "dano": 'Nenhum',
            "alcance": 'Defensivo'
        },
        {
            "nome": 'Escudo de Duelo',
            "descricao": 'Escudo leve com bônus de Valor de Defesa igual a +1. Um lutador portando esse escudo em um braço e uma arma de uma mão no outro pode usar este escudo como uma ferramenta para aparar golpes.',
            "preco": '30 M.O.',
            "dano": 'Nenhum',
            "alcance": 'Defensivo'
        },
        {
            "nome": 'Espada Bastarda',
            "descricao": 'Maior e mais pesada que a espada longa, esta poderosa arma é usada por cavaleiros para vencer a proteção de uma armadura completa.',
            "preco": '30 M.O.',
            "dano": '1d10 de dano cortante (uma mão) / 1d12 (duas mãos)',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Espada Curta',
            "descricao": 'É o mais comum tipo de espada, muito usada por milicianos e soldados rasos ou ainda como arma secundária.',
            "preco": '10 M.O.',
            "dano": '1d6 de dano cortante',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Espada de Lâminas Duplas',
            "descricao": 'Duas espadas longas, presas em lados opostos de um mesmo cabo. Essa arma exótica exige treinamento para usá-la sem se cortar.',
            "preco": '40 M.O.',
            "dano": '1d8 de dano cortante',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Espada-diapasão',
            "descricao": 'Esta espada de aparência estranha tem duas lâminas separadas entre si por alguns milímetros, o personagem pode realizar uma manobra especial com uma ação de interagir com objeto.',
            "preco": '60 M.O.',
            "dano": '1d8 de dano cortante (adicional 1d6 de dano vibratório)',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Espada Grande',
            "descricao": 'Uma arma enorme e muito pesada, esta espada tem cerca de 1,5m de comprimento. É uma das armas mais poderosas que uma criatura Média consegue empunhar.',
            "preco": '50 M.O.',
            "dano": '3d4 de dano cortante',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Espada Longa',
            "descricao": 'Espadas versáteis e práticas que podem ser usadas com uma ou duas mãos. Um Combatente que estiver empunhando uma espada longa com as duas mãos pode, ao usar a ação atacar, tentar usar o efeito alavanca da espada longa.',
            "preco": '15 M.O.',
            "dano": '1d8 de dano cortante (uma mão) / 1d10 (duas mãos)',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Espada Táurica',
            "descricao": 'Esta espada gigantesca é usada pelos maiores campeões e gladiadores do Reino dos Minotauros. Além de ser uma arma exótica, também exige Força 10 ou mais para ser utilizada.',
            "preco": '100 M.O.',
            "dano": '3d6 de dano cortante',
            "alcance": 'Até 3 metros'
        },
        {
            "nome": 'Florete',
            "descricao": 'Com uma lâmina fina e afiada, esta espada se torna muito precisa. Um combatente que estiver usando um florete em uma mão e nada em sua outra mão pode, em sua ação de ataque, fazer uma finta e gerar penalidade de acertos em ataques feitos contra o usuário da arma.',
            "preco": '25 M.O.',
            "dano": '1d8 de dano perfurante',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": "Florete-agulha",
            "descricao": "Com uma lâmina fina e afiada, esta espada se torna muito precisa. Um combatente que estiver usando um florete em uma mão e nada em sua outra mão pode, em sua ação de ataque, fazer uma finta e gerar penalidade de acertos em ataques feitos contra o usuário da arma até o fim de seu turno. Essa manobra pode funcionar apenas uma vez para inimigos em um devido combate. Tem 50% de chance de funcionar. Este florete possui um minúsculo êmbolo interno, que carrega uma dose de líquido — geralmente veneno. Permite usar um veneno do tipo contato, além do tipo ingerido. Inimigos envenenados desta forma pelo portador desta arma recebem penalidade de 1 ponto para sair dos efeitos do veneno. Para aplicar o veneno na arma é necessário uma ação de turno inteiro. O veneno dentro desta arma é preservado como se estivesse dentro de um vidro fechado. Espada de uma mão leve e possui acuidade.",
            "preco": "40 M.O.",
            "dano": "1d8 dano de perfurante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Fogo Alquímico",
            "descricao": "É um frasco que contém uma substância grossa e pegajosa, e que entra em combustão ao entrar em contato com o ar. O personagem atira o frasco, fazendo um rolamento de combate à distância. Se o personagem acertar, o alvo sofre 1d6 pontos de dano e pega fogo, entrando na condição queimando. Se errar, ele sofre metade desse dano e não pega fogo. Uma criatura em chamas pelo fogo alquímico sofre 1d6 pontos de dano no fim do seu próximo turno, a menos que apague as chamas (com uma ação completa).",
            "preco": "50 M.O.",
            "dano": "1d6 de dano (se acertar) e 1d6 no próximo turno se queimando",
            "alcance": "Distância"
        },
        {
            "nome": "Foice",
            "descricao": "Diferente da ferramenta usada por fazendeiros, uma foice de combate é bem mais forte e balanceada. Capaz de infligir ferimentos precisos e letais. Após atacar com esta arma, o atacante pode tentar causar ferimentos profundos em seu adversário ao puxar sua enorme lâmina, como uma reação, e pode causar a condição sangrando no alvo. Chance de sucesso de 40%. Esse ataque não funciona duas vezes seguidas em um inimigo no mesmo turno. Possui sua margem de ameaça de crítico 18. Esta arma de haste pesada tem alcance de 3 metros.",
            "preco": "30 M.O.",
            "dano": "1d8 de dano perfurante",
            "alcance": "3 metros"
        },
        {
            "nome": "Funda",
            "descricao": "Podendo ser feita com uma simples tira de couro, é usada para arremessar balas de metal. Na falta de munição adequada, uma funda também pode disparar pedras comuns, mas o dano é reduzido para 1. Colocar uma bala em uma funda é uma ação. Ao contrário de outras armas de disparo, o personagem aplica seu modificador de Força a jogadas de dano com uma funda.",
            "preco": "1 PP",
            "dano": "1d6 de dano de impacto",
            "alcance": "15 metros"
        },
        {
            "nome": "Katana",
            "descricao": "Sua lâmina delgada é levemente curvada, e possui apenas um único fio. É muito longa para ser usada com uma só mão sem treinamento especial, sendo, por isso, uma arma exótica. Ela pode ser usada com duas mãos como uma arma marcial. Cada Katana é uma peça de arte única, com entalhes na bainha e lâmina, e cabo decorado com fios de seda e metais preciosos, e o metal de sua lâmina é temperado de maneira especial. Por essas características, uma Katana é sempre considerada uma arma Obra Prima, e oferece um bônus de 1 no rolamento de acerto.",
            "preco": "200 M.O.",
            "dano": "1d8 com uma mão e 1d10 com duas mãos",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Katar",
            "descricao": "Esta arma exótica é basicamente uma forma de dar socos com lâminas em frente aos punhos para furar e cortar com metal ao invés de acertar com as mãos. A katar tem fácil manuseio e é extremamente manobrável. Ao atacar com esta arma o atacante tem maior facilidade para acertar pontos fracos na defesa do inimigo e pode considerar um rolamento crítico com 19 ou 20 no rolamento do D20 e seu dano é triplicado e não dobrado.",
            "preco": "40 M.O.",
            "dano": "1d4 de dano perfurante ou cortante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Lança",
            "descricao": "É qualquer arma feita com uma haste de madeira e ponta afiada, natural ou metálica. Por sua facilidade de fabricação, é muito comum entre diversas espécies menos civilizadas. Uma lança também pode ser arremessada. Esta arma simples pode ser usada com uma mão ou duas e pode ser arremessada.",
            "preco": "1 M.O.",
            "dano": "1d6 de dano perfurante (com uma mão) e 1d8 com duas mãos",
            "alcance": "Arremesso até 15 metros"
        },
        {
            "nome": "Lança de Falange",
            "descricao": "Uma versão mais comprida da lança comum, mas balanceada para ser usada com uma mão. A lança de falange pode ser arremessada, e é uma arma de haste. A lança de falange é muito grande para ser usada com uma mão sem treinamento especial; por isso é uma arma exótica. Ela pode ser usada como uma arma marcial de duas mãos.",
            "preco": "5 M.O.",
            "dano": "1d10 de dano perfurante (com uma mão) e 1d12 com duas mãos",
            "alcance": "3 metros"
        },
        {
            "nome": "Lança-foguete",
            "descricao": "Esta lança parece normal, mas há um “foguete” (um reservatório de pólvora) no meio de sua haste. Este foguete pode ser ativado por uma corda na haste (uma ação livre), fazendo com que o próximo arremesso da lança tenha o seu alcance dobrado e receba vantagem nas jogadas de acerto e 1d6 a mais de dano. Depois de arremessada com o pavio do foguete aceso, a lança torna-se inútil.",
            "preco": "20 M.O.",
            "dano": "1d6 de dano perfurante (com uma mão ou arremessada) e 1d8 com duas mãos",
            "alcance": "Arremesso até 15 metros"
        },
        {
            "nome": "Lança-mola",
            "descricao": "Esta lança retrátil de metal possui no meio de sua haste uma forte mola, que fica encolhida, o personagem pode realizar um ataque especial apertando um botão para soltar a mola (uma ação livre). Este ataque recebe um bônus de +2 na jogada de acerto e tem seu alcance aumentado para 3 metros, o personagem deve remontar a mola com uma ação para voltar a usar a arma. Esta arma causa 1d6 de dano perfurante com uma mão e 1d8 com duas e pode ser arremessada até 9 metros sem penalidade e no máximo 15 metros de distância.",
            "preco": "5 M.O.",
            "dano": "1d6 de dano perfurante com uma mão, 1d8 com duas",
            "alcance": "3 metros (alcança até 9 metros sem penalidade e 15 metros no máximo)"
        },
        {
            "nome": "Lança Montada",
            "descricao": "Quando montado, o personagem pode utilizar essa arma com apenas uma mão. A lança montada é uma arma de haste, e causa dano dobrado se usada durante uma investida (avançar no mínimo 3 metros em linha reta) montada. Esta arma possui alcance de 3 metros e causa 2d6 de dano perfurante com uma mão enquanto montado e 1d10 quando segurada por duas mãos e desmontado, não é possível atacar com uma mão enquanto desmontado.",
            "preco": "15 M.O.",
            "dano": "2d6 de dano perfurante com uma mão enquanto montado, 1d10 com duas mãos enquanto desmontado",
            "alcance": "3 metros"
        },
        {
            "nome": "Maça",
            "descricao": "Composta por um bastão metálico com um peso cheio de protuberâncias na extremidade, a maça é muito usada por clérigos que fazem votos de não derramar sangue. De fato, um golpe de maça nem sempre derrama sangue, mas pode esmagar alguns ossos. Essa arma é muito efetiva contra constructos e esqueletos, ataques com essa arma contra essas criaturas causam o dobro do dano.",
            "preco": "5 M.O.",
            "dano": "1d6 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Maça-Estrela",
            "descricao": "Uma maça-estrela tem espinhos pontiagudos, sendo mais perigosa que uma maça comum. É uma arma rústica, mas capaz de causar ferimentos profundos. Essa arma é muito efetiva contra constructos e esqueletos, ataques com essa arma contra essas criaturas causam o dobro do dano.",
            "preco": "15 M.O.",
            "dano": "1d8 de dano perfurante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Maça de Guerra",
            "descricao": "Uma versão mais perigosa da maça comum, com uma cabeça formada por grandes placas de metal. Essa arma é muito efetiva contra constructos e esqueletos, ataques com essa arma contra essas criaturas causam o dobro de dano. O peso da maça de guerra torna seu golpe poderoso, mas desajeitado. Um personagem usando uma maça de guerra sofre -1 nos rolamentos de acerto.",
            "preco": "30 M.O.",
            "dano": "1d12 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Machadinha",
            "descricao": "Uma ferramenta bem útil para cortar madeira, e também inimigos. Uma machadinha pode ser arremessada.",
            "preco": "5 M.O.",
            "dano": "1d6 de dano cortante",
            "alcance": "9 metros sem penalidade, 18 metros máximo"
        },
        {
            "nome": "Machado Anão",
            "descricao": "Esse poderoso machado é a arma favorita dos anões, quase um símbolo da raça. O Machado Anão é pesado demais para ser usado com uma mão sem treinamento: Por isso é uma arma exótica. O machado anão pode ser usado como uma arma marcial de duas mãos.",
            "preco": "50 M.O.",
            "dano": "1d12 de dano cortante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Machado de Batalha",
            "descricao": "Diferente de uma machadinha, este não é um simples instrumento para cortes de árvores, mas sim uma poderosa arma capaz de causar ferimentos terríveis. Quando um atacante usando esta arma rola um 20 natural esta arma causa 1d6 de dano extra.",
            "preco": "10 M.O.",
            "dano": "1d8 de dano cortante (1d10 com duas mãos)",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Maça-granada",
            "descricao": "Esta maça tem uma carga explosiva em sua cabeça. A granada é ativada quando submetida a uma grande pressão. Quando o personagem faz um acerto crítico, além de infligir dano dobrado, causa uma explosão, que faz 4d4 pontos de dano de fogo no alvo e 2d4 pontos de dano ao usuário. Depois de explodir, a maça fica inutilizada.",
            "preco": "20 M.O.",
            "dano": "1d8 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Machado Grande",
            "descricao": "Este imenso machado de lâmina dupla é uma das mais perigosas armas existentes. Quando um atacante usando esta arma tira um 20 natural, no rolamento de um d20, esta arma causa 1d6 de dano extra.",
            "preco": "30 M.O.",
            "dano": "1d12 de dano cortante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Machado Táurico",
            "descricao": "Uma haste de 2m de comprimento com uma lâmina extremamente grossa na ponta, o machado táurico é muito pesado, e impõe uma penalidade de -1 na Valor de Defesa de seu usuário. Exige Força 12 ou mais para ser manuseado.",
            "preco": "80 M.O.",
            "dano": "4d6 de dano cortante",
            "alcance": "3 metros"
        },
        {
            "nome": "Mangual",
            "descricao": "Arma composta por uma haste metálica ligada a uma corrente que por sua vez é ligada a uma esfera de aço. O mangual pode se enroscar na arma do adversário, e usar a ação desarmar ao mesmo tempo que atacar.",
            "preco": "10 M.O.",
            "dano": "1d8 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Mangual Pesado",
            "descricao": "Uma versão mais pesada do mangual, feita para ser usada com duas mãos. O mangual pode se enroscar na arma do adversário, e usar a ação desarmar ao mesmo tempo que atacar.",
            "preco": "20 M.O.",
            "dano": "1d10 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Manopla-Espada",
            "descricao": "Uma braçadeira de metal na qual é fixada uma lâmina, que corre paralelamente ao antebraço do usuário. Como a manopla-espada protege seu braço, o personagem recebe um bônus de +1 na Valor de Valor. Se usar uma manopla-espada em cada um de seus braços, e tiver a Regalia de Combate com Duas Armas, o bônus aumenta para +2. Esta arma não pode ser desarmada. Por possuir menos mobilidade para atacar, é mais difícil causar dano.",
            "preco": "25 M.O.",
            "dano": "1d6 de dano cortante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Marreta",
            "descricao": "Este martelo tem o cabo comprido e a cabeça chata e pesada. É uma arma desajeitada, mas poderosa. Esta arma pesada de duas mãos causa 2d6 de dano de impacto e causa o dobro de dano contra estruturas e construtos de pedra.",
            "preco": "5 M.O.",
            "dano": "2d6 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Marreta-pistão",
            "descricao": "Semelhante ao martelo-pistão, mas maior, para ser usada com duas mãos. Funciona da mesma maneira — use uma ação para carregar uma carga de vapor. Ao liberar a carga, a marreta concede um bônus de dupla vantagem na jogada de acerto. Esta arma pesada de duas mãos causa 2d6 de dano de impacto e causa o dobro de dano contra estruturas e construtos de pedra.",
            "preco": "15 M.O.",
            "dano": "2d6 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Marreta Estilhaçadora",
            "descricao": "Este grande e desajeitado martelo de guerra é pouco eficaz em combate normal e reduz em -1 seu valor de ataque. Com o cabo longo e uma imensa cabeça de metal, a marreta estilhaçadora conta com uma superfície de impacto larga, incapaz de causar muito dano real. Sua verdadeira finalidade é despedaçar armaduras e carapaças de monstros, especialmente seres da realidade aberrante; com um crítico no dado, em vez de causar dano multiplicado, a marreta reduz em 2 o bônus de armadura natural da criatura atingida, ou o bônus de armadura da armadura que a criatura estiver usando, essa penalidade dura até o fim do seu próximo turno.",
            "preco": "10 M.O.",
            "dano": "2d6 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Martelo",
            "descricao": "Em sua essência, é uma ferramenta para bater pregos, mas em caso de problemas, uma arma para bater em inimigos. Esta arma leve de uma mão causa 1d4 de dano de impacto e causa dano máximo contra esqueletos e construtos de ossos.",
            "preco": "2 M.O.",
            "dano": "1d4 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Martelo de Guerra",
            "descricao": "Mais uma ferramenta modificada para combate. É muito eficiente contra alguns tipos de mortos-vivos, por exemplo, esqueletos. Também é a arma preferida de quase todos os anões que recusam os machados. Esta arma pesada de uma mão causa 1d8 de dano de impacto e causa dano máximo contra esqueletos e construtos de ossos.",
            "preco": "15 M.O.",
            "dano": "1d8 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Martelo-pistão",
            "descricao": "Este martelo tem um mecanismo avançado em seu interior. Com uma ação, o personagem puxa o pistão e 'carrega' uma carga de vapor na arma. Em qualquer momento até 1 hora depois de carregar a arma, o personagem pode liberar a energia do pistão para a ponta do martelo com uma alavanca na haste. Quando fizer isso, o martelo move sua cabeça muito rapidamente e dá um impulso extra no ataque, concedendo dupla vantagem na jogada de acerto. Esta arma pesada de duas mãos causa 1d10 de dano de impacto e causa dano máximo contra esqueletos e construtos de ossos.",
            "preco": "40 M.O.",
            "dano": "1d10 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Mosquete",
            "descricao": "Uma arma de uso complicado, que é rejeitada pela maioria dos guerreiros, porém devastadora ao atingir seu alvo. Recarregar um mosquete é uma ação, e cabe no máximo duas balas em seu barril. Exige as duas mãos. Essa arma marcial pesada à distância causa 2d8 de dano perfurante, ao atirar produz um enorme som e tem alcance de 60 metros sem penalidade e alcance máximo de 180 metros.",
            "preco": "500 M.O.",
            "dano": "2d8 de dano perfurante",
            "alcance": "60/180 metros"
        },
        {
            "nome": "Montante cinético",
            "descricao": "Esta imensa espada de duas mãos tem minúsculas esferas de mitralino untadas com um óleo especial no interior de sua lâmina. O movimento destas esferas faz com que a espada tenha seu peso e impacto aumentados várias vezes, sendo extremamente letal. Porém, ela torna-se imprevisível. Ao rolar um resultado '1' numa jogada de ataque, o personagem sofre o dano da própria arma, com todos os bônus normais. Exige força 11 para ser utilizada. Essa arma pesada de duas mãos causa 3d6 de dano cortante.",
            "preco": "250 M.O.",
            "dano": "3d6 de dano cortante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Mosquetão",
            "descricao": "Este mosquete tem tambor e cano mais grossos, concentrando a força do tiro em um alvo mais próximo. Consequentemente, tem alcance menor, mas causa mais dano. Carregar um mosquete é uma ação e cabe no máximo duas balas em seu barril. Essa arma exótica pesada à distância causa 4d8 de dano perfurante, ao atirar produz um enorme som, tem alcance de 6 metros e todos seus ataques são com desvantagem. Caso proficiente, se errar o ataque, ainda causa 1d8 de dano perfurante sem adição do valor de destreza.",
            "preco": "500 M.O.",
            "dano": "4d8 de dano perfurante",
            "alcance": "6 metros"
        },
        {
            "nome": "Nunchaku",
            "descricao": "Composto por dois bastões curtos de madeira ligados por uma corrente ou tira de couro. O nunchaku, quando usado por um monge, causa 1d10 de dano de impacto e causa desvantagem no teste para não ser atordoado pelo monge. Essa arma leve, usada com as duas mãos, causa 1d6 de dano de impacto.",
            "preco": "2 M.O.",
            "dano": "1d6 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Pique",
            "descricao": "É basicamente uma lança muito longa. Esta arma de haste é preferida por guardas medrosos que não querem ficar perto de seus inimigos, uma versão mais comprida da lança comum, mas usada com as duas mãos sempre. Esta arma pesada possui um alcance padrão de 3 metros, causa 1d10 de dano perfurante e possui 1 ponto bônus de acerto contra alvos montados ou voadores no alcance. Desvantagem em ataques feitos em 1,5 metros de distância.",
            "preco": "10 M.O.",
            "dano": "1d10 de dano perfurante",
            "alcance": "3 metros"
        },
        {
            "nome": "Pistola",
            "descricao": "Considerada a mais popular arma de fogo, tem capacidade para apenas dois tiros. Requer apenas uma mão, mas se empunhada com duas mãos, oferece um bônus de +1 em jogadas de acerto devido a estabilidade extra. Devido ao tempo de recarga (uma ação), alguns pistoleiros trazem consigo várias pistolas em diversos coldres. Até seis pistolas podem ser transportadas dessa forma. Ao segurar apenas esta arma, um combatente ganha +2 ao rolar a iniciativa. Esta arma de fogo leve causa 1d8 de dano perfurante.",
            "preco": "180 M.O.",
            "dano": "1d8 de dano perfurante",
            "alcance": "36 metro"
        },
        {
            "nome": "Pistola de tambor",
            "descricao": "Esta maravilha tecnológica conta com um tambor capaz de girar, alinhando cargas de pólvora e balas com o cano repetidas vezes. Depois de dar um tiro, o usuário pode girar o tambor e realizar outro tiro com a mesma pistola, até um máximo de quatro tiros no total por pistola, e então usar uma ação para recarregar a arma. Esta arma é quase desconhecida, provavelmente a mais rara das armas tecnológicas. Ao segurar apenas esta arma, um combatente ganha +2 ao rolar a iniciativa. Esta arma de fogo leve causa 1d8 de dano perfurante.",
            "preco": "400 M.O.",
            "dano": "1d8 de dano perfurante",
            "alcance": "36 metro"
        },
        {
            "nome": "Pó da Explosão Solar",
            "descricao": "Este frasco de cerâmica contém um pó que explode em contato com o ar. Quando o frasco é arremessado e quebra, qualquer criatura num raio de 6 metros é afetada. Uma criatura afetada fica atordoada por uma rodada, devido ao brilho e barulho da explosão.",
            "preco": "100 M.O.",
            "dano": "Atordoa criaturas no raio",
            "alcance": "6 metros (raio)"
        },
        {
            "nome": "Presa da Serpente",
            "descricao": "Esta arma é uma espada feita de obsidiana. Devido a sua fragilidade, a presa da serpente é de difícil uso, e por isso é uma arma exótica. Uma criatura que sofre um ataque desta arma entra na condição sangrando. Se o valor final do acerto de um ataque for 8 ou menor, ou se a rolagem for uma falha crítica, a arma quebra. Esta arma tem sua margem de crítico reduzida para 17.",
            "preco": "30 M.O.",
            "dano": "2d4 de dano cortante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Rede",
            "descricao": "A rede de combate tem pequenos dentes em sua trama e uma corda para controlar os inimigos presos. Se acertar o ataque, a criatura fica restringida. Além disso, se o personagem for bem sucedido em um teste de Força, a vítima só pode se mover até o limite da corda (9m). Para se soltar é necessário uma ação completa e um teste de Acrobacia ou atletismo (dificuldade 10). A rede possui 5 Pontos de Vida, e se rasgar qualquer criatura presa se solta automaticamente. Ela só pode ser usada contra criaturas de até uma categoria de tamanho maior que o personagem.",
            "preco": "1 M.O.",
            "dano": "Nenhum dano, apenas restrição",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Sabre Serrilhado",
            "descricao": "Esta arma cruel possui uma lâmina parecida com um serrote. Ela causa grande estrago quando atinge a carne, rasgando e destroçando tudo. Devido a seus \"dentes\", é comum que fique profundamente entrelaçada nas costelas (ou órgãos equivalentes). Após um acerto crítico, em vez de causar dano multiplicado, o sabre fica preso e requer uma ação para ser arrancado. Esse ato causa à vítima 2 pontos de dano adicional. Caso não seja removida, a arma causa 1d4 de dano para cada ação realizada pela vítima. O portador da arma pode arrancar a arma como uma ação em seu turno ou como reação fora de seu turno, de qualquer forma a arma causa 2d4 de dano cortante ao ser retirada.",
            "preco": "25 M.O.",
            "dano": "1d8 de dano cortante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Sai",
            "descricao": "Parecido com um grande garfo de metal, a adaga Sai é uma arma para prender as armas do oponente. Ao usar a ação atacar no seu turno, o atacante pode substituir um de seus ataques e realizar a ação desarmar. A margem de crítico desta arma é reduzida para 19.",
            "preco": "10 M.O.",
            "dano": "1d4 de dano perfurante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Vara-relâmpago",
            "descricao": "Trata-se de uma vara de madeira de 1,5 metros que possui em seu interior um fio de cobre ligado a uma bateria arcana. Na ponta da vara há uma esfera de cobre. Quando o usuário aproxima a ponta da vara ao alvo, a bateria descarrega uma carga elétrica contra ele. Para acertar, o usuário deve fazer um rolamento de ataque corpo a corpo usando combate arcano. A bateria tem capacidade para 10 descargas e deve ser usada como uma mochila. Um conjurador que possua pontos de magia pode recarregar essas cargas com estes pontos. Quando o usuário faz um acerto crítico com a vara, causa dano triplicado! Contudo descarrega 3 cargas da bateria, se a bateria tiver menos que 3 cargas o dano é o mesmo e a bateria se descarrega completamente.",
            "preco": "300 M.O.",
            "dano": "3d8 de dano de raio",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Tacape",
            "descricao": "Versão mais perigosa da clava, maior e/ou com pregos. Não é uma arma muito elegante, mas faz o serviço. Causa 1d8 de dano de impacto e é feito com qualquer pedaço grande de madeira que tenha um lado mais pesado que o outro e algum balanço.",
            "preco": "5 M.O.",
            "dano": "1d8 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Tridente",
            "descricao": "O tridente, garfo ou forcado é uma arma branca que se assemelha a uma lança, mas com duas, três ou mais lâminas ou ponteiras que acabam por enfraquecer o poder penetrante da lança (quando não há a armadura). O tridente tem vantagens em ataques feitos dentro da água, gerando um bônus de 1 ponto de acerto em ataques contra criaturas aquáticas.",
            "preco": "5 M.O.",
            "dano": "1d10 de dano perfurante",
            "alcance": "Corpo a corpo (com duas mãos)"
        },
        {
            "nome": "Wakizashi",
            "descricao": "Versão mais curta da Katana. Junto com ela formam o Daisho, armas tradicionais do guerreiro de katana. A katana e a wakizashi são armas obra-prima (+1 acerto). Se usada em conjunto a uma katana, pode se atacar com a wakizashi na mesma ação que a katana. Ao atacar com a wakizashi desta maneira é gerado penalidade de ataque para o próximo ação de ataque como se fossem duas ações e não uma.",
            "preco": "150 M.O.",
            "dano": "1d6 de dano cortante",
            "alcance": "Corpo a corpo"
        }
    ];

    return (
        <Box sx={{ minHeight: '700px', width: '100%' }} >
            <Tabs value={equipmentValue} onChange={handleEquipTABChange} aria-label="Info and Classes Tabs">
                <Tab label="Informações Gerais" className="tabs" />
                <Tab label="Armas" className="tabs" />
                <Tab label="Armaduras" className="tabs" />
                <Tab label="Itens Gerais" className="tabs" />
                <Tab label="Veículos  e Montarias" className="tabs" />
                <Tab label="Kits" className="tabs" />
            </Tabs>

            {/* Info MUI Tab Content */}
            {equipmentValue === 0 && (
                <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
                    <Box>
                        {/* Título Principal */}
                        <Typography variant="h3" className="MainTitleC">
                            Itens gerais
                        </Typography>

                        {/* Caixa de Texto */}
                        <Box >
                            <Typography variant="h5" className="boxTextTitleText">
                                Compra e Venda de Itens
                            </Typography>
                            <Typography variant="body1" className="bigBoxTextClasses">
                                No sistema de "Lâmina do Oculto" (LDO), a compra e venda de itens segue um modelo de economia baseado em
                                Moeda de Ouro (M.O.), com um sistema de negociação que pode ser influenciado pelas habilidades do
                                personagem. As transações de compra e venda são uma parte essencial da dinâmica do jogo, pois oferecem
                                aos jogadores a oportunidade de adquirir equipamentos, suprimentos e outras ferramentas necessárias para
                                suas aventuras, enquanto também permitem a troca de bens e serviços com NPCs (personagens não jogáveis) e
                                outros jogadores.
                            </Typography>
                        </Box>

                        <Box >
                            <Typography variant="h5" className="boxTextTitleText">
                                Compra e Venda de Itens
                            </Typography>
                            <Typography variant="body1" className="bigBoxTextClasses">
                                Quando um personagem decide comprar itens, ele precisa dispor de uma quantia suficiente de M.O. ou de
                                outros recursos para completar a transação. Cada item tem um preço fixo, como especificado nas tabelas
                                fornecidas, com valores que podem variar de itens simples, como uma adaga de mola por 4 M.O., até itens
                                mais caros e poderosos, como um "Katana" por 200 M.O. No entanto, a venda de itens segue um modelo
                                diferente: o preço de venda de um item é sempre metade do seu valor de mercado.
                            </Typography>
                        </Box>

                        {/* Aba de Negociação */}
                        <Paper sx={{ p: 4 }}>
                            <Tabs value={0} indicatorColor="primary">
                                <Tab label="Negociação com Habilidades de Personagem" />
                            </Tabs>
                            <Typography variant="body1" className="bigBoxTextClasses">
                                Uma das mecânicas interessantes do sistema de LDO é a possibilidade de negociação de preços, influenciada
                                pelas habilidades do personagem. O jogo permite que, com o tempo, os personagens melhorem suas habilidades
                                e escolham especializações de classe e profissão que afetem diretamente sua capacidade de negociar com NPCs.
                            </Typography>
                        </Paper>

                        <Box >
                            <Typography variant="h5" className="boxTextTitleText">
                                O Impacto dos Itens e Habilidades nas Aventuras
                            </Typography>
                            <Typography variant="body1" className="bigBoxTextClasses">
                                Os itens adquiridos e as habilidades do personagem não são apenas importantes para a mecânica do jogo, mas
                                também desempenham um papel crucial nas aventuras e no roleplay. Cada item, seja uma simples adaga ou uma
                                poderosa armadura completa, tem um impacto direto nas habilidades do personagem e pode influenciar seu
                                desempenho em combate, exploração e interação social.
                            </Typography>
                        </Box>

                        <Box >
                            <Typography variant="h5" className="boxTextTitleText">
                                Integração no Roleplay
                            </Typography>
                            <Typography variant="body1" className="bigBoxTextClasses">
                                Finalmente, a integração de itens e habilidades no roleplay oferece uma camada adicional de profundidade ao
                                jogo. Itens como "Kit de Disfarces", "Kit de Ladrão" ou "Kit de Cartografia" não são apenas ferramentas
                                funcionais, mas podem ser usados criativamente durante a narrativa.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )}

            {/* Aprendiz Tab Content (Empty for now) */}
            {equipmentValue === 1 && (
                <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
                    <Box>
                        {/* Título Principal */}
                        <Typography variant="h3" className="MainTitleC">
                            Armas
                        </Typography>

                        {/* Caixa de Texto */}
                        <Box >
                            <Typography variant="h5" className="boxTextTitleText">
                                Proficiência com Armas
                            </Typography>
                            <Typography variant="body1" className="bigBoxTextClasses">
                                Em Lâmina do Oculto, as armas desempenham um papel crucial no combate, e cada uma tem suas próprias
                                propriedades e características únicas. No entanto, para usar uma arma eficazmente, um personagem deve ter
                                proficiência com ela. A seguir, explico como a proficiência com armas funciona e as penalidades por não ser
                                proficiente.
                            </Typography>
                        </Box>

                        {/* Descrição Proficiência com Armas */}
                        <Box >
                            <Typography variant="h5" className="boxTextTitleText">
                                O que é Proficiência?
                            </Typography>
                            <Typography variant="body1" className="bigBoxTextClasses">
                                A proficiência com uma arma significa que um personagem foi treinado no uso dessa arma específica e sabe
                                como manejá-la de maneira eficaz. Diferentes classes e raças têm acesso a diferentes listas de armas com
                                as quais são proficientes. Por exemplo, um Guerreiro é proficiente com todas as armas simples e marciais,
                                enquanto um Mago geralmente só é proficiente com armas simples.
                            </Typography>
                        </Box>

                        {/* Descrição Penalidades */}
                        <Box >
                            <Typography variant="h5" className="boxTextTitleText">
                                Penalidades por Não Ser Proficiente
                            </Typography>
                            <Typography variant="body1" className="bigBoxTextClasses">
                                Se um personagem usar uma arma com a qual não é proficiente, ele enfrenta várias penalidades significativas:
                                <ul>
                                    <li><strong>Sem Modificadores de Habilidade:</strong> O personagem não adiciona seu valor de combate ao rolamento de acerto nem de Força (para armas corpo a corpo) ou Destreza (para armas à distância) ao rolamento de dano.</li>
                                    <li><strong>Sem Bônus de Magias ou Habilidades:</strong> Qualquer bônus que a arma receberia de habilidades de classe ou outras fontes também não se aplica.</li>
                                    <li><strong>Dano Base Apenas:</strong> O personagem só causa o dano base fixo da arma, que é descrito na tabela de armas.</li>
                                </ul>
                            </Typography>

                        </Box>

                        {/* Exemplo de Uso de Armas */}
                        <Box >
                            <Typography variant="h5" className="boxTextTitleText">
                                Exemplo de Uso de Armas
                            </Typography>
                            <Typography variant="body1" className="bigBoxTextClasses">
                                Imagine um Ladino que normalmente usa uma adaga (com a qual é proficiente), mas decide pegar uma alabarda
                                (com a qual não é proficiente) durante uma batalha. As penalidades seriam:
                                <ul>
                                    <li><strong>Sem Modificadores de Habilidade:</strong> O Ladino não adicionaria seu valor de combate corpo a corpo ao acerto nem de Força ao dano.</li>
                                    <li><strong>Sem Bônus de Habilidades:</strong> Qualquer bônus de habilidades de classe não se aplicaria.</li>
                                    <li><strong>Dano Base Apenas:</strong> A alabarda causaria um dano fixo de 4.</li>
                                </ul>
                            </Typography>
                        </Box>

                        {/* Descrição das Propriedades das Armas */}
                        <Box >
                            <Paper elevation={3} sx={{ margin: '2% 0', padding: '1%' }}>
                                <Typography variant="h5" className="boxTextTitleText">
                                    Descrição das Propriedades das Armas
                                </Typography>
                                <Typography variant="body1" className="bigBoxTextClasses">
                                    As armas em Lâmina do Oculto possuem várias propriedades que determinam como elas são usadas em combate.
                                    Abaixo está uma descrição detalhada de cada uma dessas propriedades:
                                </Typography>


                                <ul>
                                    <li><strong>Pesado:</strong> Armas grandes que criaturas pequenas ou menores têm desvantagem em usar se não forem adaptadas. Armas pesadas também causam desvantagem em tentativas de desarmá-las.</li>
                                    <li><strong>Leve:</strong> Facilita o combate com duas armas; Não sofre penalidade se atacar uma segunda vez no mesmo turno.</li>
                                    <li><strong>Acuidade:</strong> Se tiver a regalia de combatente chamada “Combate com arma de acuidade”, permite o uso do modificador de Destreza em vez de Força para ataques e dano.</li>
                                    <li><strong>Arremessável:</strong> Pode ser arremessada para fazer um ataque à distância.</li>
                                    <li><strong>Alcance:</strong> Aumenta o alcance dos ataques corpo a corpo em pelo menos 1,5 metros.</li>
                                    <li><strong>Versátil:</strong> Pode ser usada com uma ou duas mãos, causando mais dano com duas mãos.</li>
                                    <li><strong>Duas Mãos:</strong> Requer ambas as mãos para ser usada.</li>
                                    <li><strong>Distância:</strong> Ataca a distância com um valor de limite máximo sem desvantagem e (valor máximo com desvantagem entre parênteses).</li>
                                    <li><strong>Especial:</strong> Segue regras diferentes das outras armas.</li>
                                </ul>
                            </Paper>
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="h5" sx={{ my: 4 }} className="boxTextTitle" >Descrição das armas</Typography>
                        <Box sx={{ display: "flex", flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            {armas.map((arma, index) => (
                                <Paper key={index} elevation={3} sx={{ padding: 3, marginBottom: 2,  width: '32%', }}>
                                    <Typography className="estebanText" variant="h5" color="primary" gutterBottom>
                                        {arma.nome}
                                    </Typography>
                                    <Typography className="armaCard esteban font16" sx={{ textAlign: 'justify', overflowY: 'scroll', maxHeight: '200px', p: 2, border: '1px solid gray', borderRadius: "10px"}} paragraph>
                                        {arma.descricao}
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography className="esteban" variant="subtitle1">Dano: {arma.dano}</Typography>
                                            <Typography className="esteban" variant="subtitle1">Alcance: {arma.alcance}</Typography>
                                            <Typography className="esteban" variant="subtitle1">Preço: {arma.preco}</Typography>
                                        </Grid>
                                    </Grid>

                                </Paper>
                            ))}
                        </Box>
                    </Box>
                </Box>
            )}

            {/* Combatente Tab Content (Empty for now) */}
            {equipmentValue === 2 && (
                <Box>
                </Box>
            )}
            {equipmentValue === 3 && (
                <Box>

                </Box>
            )}
            {equipmentValue === 4 && (
                <Box>
                    =
                </Box>
            )}
            {equipmentValue === 5 && (
                <Box>

                </Box>
            )}
            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>
    );
};

export default EquipmentPage;
