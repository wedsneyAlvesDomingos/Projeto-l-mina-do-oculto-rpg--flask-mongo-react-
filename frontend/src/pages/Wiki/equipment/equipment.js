import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
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
            "descricao": 'esta adaga é mantida em uma tira de couro presa ao antebraço. Quando o usuário gira seu pulso de um jeito específico (uma ação livre), a adaga salta para sua mão. Se o personagem sacar a adaga com mola e, na mesma rodada usá-la para atacar, o oponente fica surpreso contra esse ataque (mas esse truque só funciona uma vez por combate). Causa 1d4 de dano de corte, arma leve com  acuidade. Preço: 4 M.O.',
            "preco": '4 M.O.',
            "dano": '1d4 de dano de corte',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Aji',
            "descricao": 'Aji é uma peça metálica em forma de arco, onde a lâmina seria o arco propriamente dito e a empunhadura seria a corda. A aji é facilmente usada em conjunto e por isso não precisa de ter estilo de luta para usar duas  desta arma, uma em cada mão. causa 1d6 de dano de corte, arma leve e acuidade. ',
            "dano": '1d6 de dano de corte',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Alabarda',
            "descricao": 'Alabarda é uma arma composta por uma longa haste. A haste é rematada por uma peça pontiaguda, de metal, que por sua vez é atravessada por uma lâmina em forma de meia-lua (similar à de um machado). É considerada a arma de infantaria mais eficaz contra invasores em fortificações e muralhas. É por excelência a arma usada pelos guardas de castelos e palácios e aparece como padrão em unidades militares. Ao usar uma alabarda o personagem pode, ao atacar, usar a ação Derrubar no inimigo ao mesmo tempo que o ataque, mas somente uma vez por por turno. Se o alvo estiver a 1,5 metros de distância do atacante com uma alabarda o dano da arma cai de 1d10 para 1d8, por causa da dificuldade de manobrar a arma longa em combate tão próximo. Arma de alcance (3 metros) com 1d10 de dano cortante (se atacar com a lâmina) ou perfurante (se atacar com a ponta), arma pesada. ',
            "preco": '20 M.O.',
            "dano": '1d10 de dano cortante ou perfurante',
            "alcance": '3 metros'
        },
        {
            "nome": 'Alfange',
            "descricao": 'Espada de lâmina muito larga e curva, usada por guerreiros do Deserto. Ao usar esta arma o personagem tem vantagem em testes para manter a arma na sua mão e atacantes desvantagem para tirá-la. Espada de uma mão,1d8 de dano cortante. ',
            "preco": '25 M.O.',
            "dano": '1d8 de dano cortante',
            "alcance": 'Espada de uma mão'
        },
        {
            "nome": 'Arco Composto',
            "descricao": 'Este arco é feito de chifres, madeira ou ossos laminados (ou até mesmo chapas de metal), e recurvado de forma a continuar estirado mesmo quando desarmado. Devido a isso, o arco composto dispara com mais força que um arco comum. Ao contrário de outros arcos,o personagem aplica seu modificador de Força nas jogadas de dano e ataque com um arco composto. Usar um arco composto exige as duas mãos. Arma pesada de distância com alcance de 60 metros (máximo de 195 metros), 1d12 de dano perfurante .',
            "preco": '60 M.O.',
            "dano": '1d12 de dano perfurante',
            "alcance": '60 metros (máximo de 195 metros)',
        },
        {
            "nome": 'Arco Curto',
            "descricao": 'arco bastante comum é próprio para caçadas, muito usado por povos selvagens e caçadores, este arco tem um tamanho pequeno e é apropriado para manuseio em florestas e outros ambientes fechados. Exige as duas mãos. 1d6 de dano perfurante. alcance 12 metros (96 metros).',
            "preco": '25 M.O.',
            "dano": '1d6 de dano perfurante',
            "alcance": '12 metros (96 metros)'
        },
        {
            "nome": 'Arco Longo',
            "descricao": 'Arco reforçado tem a altura de uma pessoa. Diferente do arco curto, é próprio para campos de batalha e outras áreas abertas — seu longo alcance permite atingir o inimigo a grandes distâncias. Exige as duas mãos. 1d8 de dano perfurante.  Alcance 45 metros (180 metros). ',
            "preco": '50 M.O.',
            "dano": '1d8 de dano perfurante',
            "alcance": '45 metros / 180 metros'
        },
        {
            "nome": "Azagaia",
            "descricao": "Azagaia é uma lança curta e delgada é usada como arma de arremesso por povos ou indivíduos caçadores. Também é conhecida como apenas javelin. Alcance 12 metros + (1,5 metros x Força) , 1d6 de dano perfurante.",
            "preco": "5 PP",
            "dano": "1d6 de dano perfurante",
            "alcance": "12 metros + (1,5 metros x Força)"
        },
        {
            "nome": "Balestra",
            "descricao": "Uma  besta com mecanismo pesado, que permite que seu usuário use toda sua força ao engatilhar, o personagem aplica seu modificador de Força nas jogadas de dano com uma balestra. Recarregar esta arma é uma ação. Exige duas mãos.  1d12 de dano perfurante e ao rolar um 18 ou maior no d20 é um crítico. ",
            "preco": "70 M.O.",
            "dano": "1d12 de dano perfurante. Ao rolar um 18 ou maior no d20 é um crítico.",
            "alcance": "72/240 metros"
        },
        {
            "nome": "Bastão Acolchoado",
            "descricao": "Um pedaço sólido de madeira, coberto por uma camada grossa de lã. O bastão acolchoado causa dano não-letal. 2 de dano de impacto , arma leve. ",
            "preco": "5 PC",
            "dano": "2 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Besta de Mão",
            "descricao": "Uma besta em miniatura, ideal para ser escondida sob um casaco, e usada por nobres e assassinos. Se o personagem sacar a besta de mão, e na mesma rodada, usá-la para atacar, o oponente fica desprevenido contra esse ataque (mas esse truque só funciona uma vez por combate) e o ataque ganha vantagem. Recarregar esta arma é uma ação. Exige uma mão. Alcance 9/27 metros,1d6 de dano perfurante. ",
            "preco": "75 M.O.",
            "dano": "1d6 de dano perfurante",
            "alcance": "9/27 metros"
        },
        {
            "nome": "Besta de Repetição",
            "descricao": "Esta arma é uma besta (leve ou pesada) acoplada a uma caixa com capacidade de dez virotes. A caixa possui um mecanismo que recarrega a besta automaticamente.  Alcance 24/120 metros, 1d8 de dano perfurante, trocar ou recarregar o cartucho exige uma ação. ",
            "preco": "100 M.O.",
            "dano": "1d8 de dano perfurante",
            "alcance": "24/120 metros"
        },
        {
            "nome": "Besta Leve",
            "descricao": "Um arco montado sobre uma coronha de madeira com um gatilho, a besta leve é uma arma que dispara virotes com grande potência. Exige as duas mãos.  Alcance 24/90 metros, 1d8 dano perfurante, carregar exige uma ação bônus ou um ataque.",
            "preco": "25 M.O.",
            "dano": "1d8 de dano perfurante",
            "alcance": "24/90 metros"
        },
        {
            "nome": "Besta Pesada",
            "descricao": "Versão maior e mais potente da besta leve. Usar esta besta também exige as duas mãos.  Alcance 30/120 metros, 1d10 dano perfurante, carregar exige uma ação bônus ou um ataque.",
            "preco": "50 M.O.",
            "dano": "1d10 de dano perfurante",
            "alcance": "30/120 metros"
        },
        {
            "nome": "Bordão",
            "descricao": "cajado apreciado por viajantes e camponeses, por sua praticidade e preço   assim como uma clava, seu custo é zero. 1d6 / 1d8 de dano de impacto  versátil: uma mão 1 /duas mãos  2. Arma leve e possui acuidade. ",
            "preco": "0",
            "dano": "1d6 / 1d8 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": 'Cajado de Batalha',
            "descricao": 'Um cajado de madeira forte, reforçado com chapas de metal nas pontas. É uma arma discreta, usada por andarilhos que não querem levantar suspeitas   como rebeldes em regiões imperiais e outros tipos de foragidos. O cajado de batalha é uma arma de duas mãos. dano de impacto  versátil: uma mão 2d4 /duas mãos  3d4. ',
            "preco": '2 PP',
            "dano": 'Dano de impacto versátil: uma mão 2d4 /duas mãos 3d4',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Catapulta-de-Braço',
            "descricao": 'Um dos diversos engenhos criados por halflings, para praticar seus esportes de arremesso de pedras. A catapulta-de-braço é uma arma que presa ao braço com fivelas, arremessa pedras ao movimento correto do pulso quase tão longe quanto os arcos lançam flechas. Recarregá-la é uma ação livre. 1d6 de dano de impacto , arma com alcance de 9/18 metros. ',
            "preco": '25 M.O.',
            "dano": '1d6 de dano de impacto',
            "alcance": '9/18 metros'
        },
        {
            "nome": 'Manopla de Espinhos',
            "descricao": 'uva de couro com espinhos, usada por pugilistas e brigões de rua. A manopla de espinhos fornece um bônus de +1 nas jogadas de dano com ataques desarmados. Esta arma não pode ser desarmada. ',
            "preco": '10 M.O.',
            "dano": 'Bônus de +1 em dano com ataques desarmados',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Chicote',
            "descricao": 'O  personagem pode atacar um inimigo a até 4,5m com um chicote. Esta arma pode se enroscar nas mãos, pernas ou armas do adversário; quando o personagem usa a ação para atacar no seu turno, o personagem pode trocar um  ataque  para tentar derrubar ou desarmar um alvo. O DC para estas manobras é = 10+ bônus de proficiência.   O chicote tem até 4,5 metros de alcance, é leve, possui acuidade, e possui desvantagens em ataques contra inimigos a 1,5 metros de distância. Seu dano é de 1d4 de dano cortante devido a pequena lâmina em sua ponta. ',
            "preco": '10 M.O.',
            "dano": '1d4 de dano cortante',
            "alcance": 'Até 4,5 metros'
        },
        {
            "nome": 'Cimitarra',
            "descricao": 'de lâmina muito larga e curva, usada por guerreiros do Mar. Ao usar esta arma o personagem tem 1 ponto de bônus em testes para manter a arma na sua mão e atacantes desvantagem para tirá-la. Espada de uma mão leve e possui acuidade, 1d4 de dano de corte. ',
            "preco": '25 M.O.',
            "dano": '1d4 de dano de corte',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Clava',
            "descricao": 'Pedaço de madeira empunhado como arma, geralmente usado por bárbaros ou criaturas brutais   ou como arma improvisada, como um galho de árvore ou pedaço de mobília. Sendo fácil de conseguir, seu preço é zero. Arma leve de uma mão que causa 1d4 de dano de impacto.',
            "preco": 'Gratuito',
            "dano": '1d4 de dano de impacto',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Corrente com Cravos',
            "descricao": 'O personagem pode atacar um inimigo a até 4,5m com uma corrente. Esta arma pode se enroscar nas mãos, pernas ou armas do adversário; quando o personagem usa a ação para atacar no seu turno, o personagem pode trocar um  ataque  para tentar agarrar um alvo e prendê-lo. O DC para esta manobra é = 10+ bônus de proficiência. Um alvo preso dessa forma só pode se movimentar em direção da outra ponta da corrente, se tentar arrastar o atacante ou fizer qualquer ação que não seja tentar se soltar, toma imediatamente 1d4 de dano perfurante. A corrente tem até 4,5 metros de alcance e possui desvantagens em ataques contra inimigos a 1,5 metros de distância, seu dano é de 1d4 de dano perfurante devido aos pequenos espinhos.',
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
            "descricao": 'Bônus de Valor de Defesa igual a +2, o usuário deste escudo também pode usar a ação Buscar Cobertura e posicionar o escudo no chão a sua frente e se esconder atrás dele e ganhar uma cobertura completa  em uma direção até o início de seu próximo turno. Após assumir essa posição defensiva o usuário do escudo não pode mais atacar e seu movimento é reduzido pela metade.',
            "preco": '20 M.O.',
            "dano": 'Nenhum',
            "alcance": 'Defensivo'
        },
        {
            "nome": 'Escudo de Duelo',
            "descricao": 'Escudo leve com bônus de Valor de Defesa igual a +1. Um lutador portando esse escudo em um braço e uma arma de uma mão no outro pode usar este escudo como uma ferramenta para aparar golpes, durante o seu turno usando sua reação o lutador aumenta seu Valor de Defesa em +2 até o início de seu próximo turno.',
            "preco": '30 M.O.',
            "dano": 'Nenhum',
            "alcance": 'Defensivo'
        },
        {
            "nome": 'Espada Bastarda',
            "descricao": ' e mais pesada que a espada longa, esta poderosa arma é usada por cavaleiros para vencer a proteção de uma armadura completa. Se empunhada com uma mão e seu usuário não carregar nada em sua outra mão ele pode usar sua ação bônus para criar momentum e fazer um grande arco de corte causando dano a todos inimigos em até 1,5 metros de distância, esse dano é igual ao seu modificador de força. Uma espada bastarda é muito grande para ser usada com só uma mão sem treinamento especial; por isso é uma arma exótica. Ela pode ser usada como uma arma marcial de duas mãos. Essa espada pesada pode ser versátil com o treinamento correto, 1d10 de dano cortante se empunhada com uma mão ou 1d12 se empunhada com duas. ',
            "preco": '30 M.O.',
            "dano": '1d10 de dano cortante (uma mão) / 1d12 (duas mãos)',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Espada Curta',
            "descricao": 'É o mais comum tipo de espada, muito usada por milicianos e soldados rasos   ou ainda como arma secundária. Possui entre 40 a 50 cm de comprimento. Por ser facilmente manuseada, essa arma pode ser usada de diversas maneiras. Um Combatente que tiver pelo menos um ponto de Regalia na árvore de Combate Defensivo, recebe +1  de acerto por usar esta arma com um escudo. Essa espada leve possui acuidade e é uma arma simples, 1d6 de dano cortante. ',
            "preco": '10 M.O.',
            "dano": '1d6 de dano cortante',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Espada de Lâminas Duplas',
            "descricao": 'Duas espadas longas, presas em lados opostos de um mesmo cabo. Essa arma exótica exige treinamento para usá-la sem se cortar. Um lutador que usar esta arma pode fazer um ataque bônus sempre que usar sua ação para atacar. Essa arma leve de duas mãos causa 1d8 de dano cortante e possui acuidade. ',
            "preco": '40 M.O.',
            "dano": '1d8 de dano cortante',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Espada-diapasão',
            "descricao": 'Esta espada de aparência estranha tem duas lâminas separadas entre si por alguns milímetros, o personagem pode realizar uma manobra especial com uma ação de interagir com objeto, golpeando o chão (que não pode ser macio e acolchoado como grama, areia,...). A espada então entra em ressonância, passando a vibrar e emitir um ruído muito incômodo. Os próximos ataques com esta arma, até o fim de seu próximo turno, causa 1d6 de dano adicional. Essa arma exótica de uma mão causa 1d8 de dano cortante.',
            "preco": '60 M.O.',
            "dano": '1d8 de dano cortante (adicional 1d6 de dano vibratório)',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Espada Grande',
            "descricao": 'Uma arma enorme e muito pesada, esta espada tem cerca de 1,5m de comprimento. É uma das armas mais poderosas que uma criatura Média consegue empunhar. Um lutador com essa arma pode,como uma ação, dar um golpe pesado e carregado que causa o dobro de dano de um golpe normal. Ao usar o golpe carregado o usuário desta arma sacrifica defesa por dano e assim perde 1 de Valor de Defesa até o início de seu próximo turno. Essa arma pesada exige que o usuário tenha 5 de força ou mais para atacar sem penalidade (desvantagem), e causa 3d4 de dano cortante.',
            "preco": '50 M.O.',
            "dano": '3d4 de dano cortante',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Espada Longa',
            "descricao": 'Espadas versáteis e práticas que podem ser usadas com uma ou duas mãos. Um Combatente que estiver empunhando uma espada  longa com as duas mãos pode, ao usar a ação atacar, tentar usar o efeito alavanca da espada longa e causar 1d8 de dano extra. Essa manobra pode ser usada apenas uma vez por rodada. Essa espada versátil, causa com uma mão 1d8 /duas mãos  1d10 de dano cortante.',
            "preco": '15 M.O.',
            "dano": '1d8 de dano cortante (uma mão) / 1d10 (duas mãos)',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": 'Espada Táurica',
            "descricao": 'Esta espada gigantesca é usada pelos maiores campeões e gladiadores do Reino dos Minotauros. Além de ser uma arma exótica, também exige Força 10 ou mais para ser utilizada e tem desvantagem em ataques em locais fechados como casas, túneis apertados e outros. Essa espada muito pesada tem alcance de 3 metros  e causa 3d6 de dano cortante.',
            "preco": '100 M.O.',
            "dano": '3d6 de dano cortante',
            "alcance": 'Até 3 metros'
        },
        {
            "nome": 'Florete',
            "descricao": 'Comuma lâmina fina e afiada, esta espada se torna muito precisa. Um combatente que estiver usando um florete em uma mão e nada em sua outra mão pode, em sua ação de ataque, fazer uma finta e gerar penalidade de acertos em ataques feitos contra o usuário da arma até o fim de seu turno. Essa manobra pode funcionar apenas uma vez para inimigos em um devido combate. Tem 50% de chance de funcionar. Espada de uma mão leve e possui acuidade, 1d8 dano de perfurante. ',
            "preco": '25 M.O.',
            "dano": '1d8 de dano perfurante',
            "alcance": 'Corpo a corpo'
        },
        {
            "nome": "Florete-agulha",
            "descricao": "Com uma lâmina fina e afiada, esta espada se torna muito precisa. Um combatente que estiver usando um florete em uma mão e nada em sua outra mão pode, em sua ação de ataque, fazer uma finta e gerar penalidade de acertos em ataques feitos contra o usuário da arma até o fim de seu turno. Essa manobra pode funcionar apenas uma vez para inimigos em um devido combate. Tem 50% de chance de funcionar. Este florete possui um minúsculo êmbolo interno, que carrega uma dose de líquido — geralmente veneno. Permite usar um veneno do tipo contato, além do tipo ingerido. Inimigos envenenados desta forma pelo portador desta arma recebem penalidade de 1 ponto para sair dos efeitos do veneno. Para aplicar o veneno na arma é necessário uma ação de turno inteiro. O veneno dentro desta arma é preservado como se estivesse dentro de um vidro fechado. Espada de uma mão leve e possui acuidade, 1d8 dano de perfurante.",
            "preco": "40 M.O.",
            "dano": "1d8 dano de perfurante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Fogo Alquímico",
            "descricao": "É um frasco que contém uma substância grossa e pegajosa, e que entra em combustão ao entrar em contato com o ar. O personagem atira o frasco, fazendo um rolamento de combate à distância . Se o personagem acertar, o alvo sofre 1d6 pontos de dano e pega fogo, entrando na condição queimando. Se errar, ele sofre metade desse dano e não pega fogo. Uma criatura em chamas pelo fogo alquímico sofre 1d6 pontos de dano no fim do seu próximo turno, a menos que apague as chamas (com uma ação completa). ",
            "preco": "50 M.O.",
            "dano": "1d6 de dano (se acertar) e 1d6 no próximo turno se queimando",
            "alcance": "Distância"
        },
        {
            "nome": "Foice",
            "descricao": "Diferente da ferramenta usada por fazendeiros, uma foice de combate é bem mais forte e balanceada. Capaz de infligir ferimentos precisos e letais. Após atacar com esta arma, o atacante pode tentar causar ferimentos profundos em seu adversário ao puxar sua enorme lâmina, como uma reação, e pode causar a condição sangrando no alvo. Chance de sucesso de 40%. Esse ataque não funciona duas vezes seguidas em um inimigo no mesmo turno. Possui sua margem de ameaça de crítico 18. Essa arma de haste pesada tem alcance de 3 metros e causa 1d8 de dano perfurante. ",
            "preco": "30 M.O.",
            "dano": "1d8 de dano perfurante",
            "alcance": "3 metros"
        },
        {
            "nome": "Funda",
            "descricao": "Podendo ser feita com uma simples tira de couro, é usada para arremessar balas de metal. Na falta de munição adequada, uma funda também pode disparar pedras comuns, mas o dano é reduzido para 1. Colocar uma bala em uma funda é uma ação. Ao contrário de outras armas de disparo,o personagem aplica seu modificador de Força a jogadas de dano com uma funda, essa arma causa 1d6 de dano de impacto com alcance de 15 metros. ",
            "preco": "1 PP",
            "dano": "1d6 de dano de impacto",
            "alcance": "15 metros"
        },
        {
            "nome": "Katana",
            "descricao": "Sua lâmina delgada é levemente curvada, e possui apenas um único fio. É muito longa para ser usada com uma só mão sem treinamento especial, sendo, por isso, uma arma exótica. Ela pode ser usada com duas mãos como uma arma marcial. Cada Katana é uma peça de arte única, com entalhes na bainha e lamina, e cabo decorado com fios de seda e metais preciosos, e o metal de sua lâmina é temperado de maneira especial. Por essas características, uma Katana é sempre considerada uma arma Obra Prima, e oferece um bônus de 1 no rolamento de acerto. Esta espada é uma arma leve com acuidade e causa 1d8 com uma mão e 1d10 com duas mãos.",
            "preco": "200 M.O.",
            "dano": "1d8 com uma mão e 1d10 com duas mãos",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Katar",
            "descricao": "Esta arma exótica é basicamente uma forma de dar socos com lâminas em frente aos punhos para furar e cortar com metal ao invés de acertar com as mãos. A katar tem fácil manuseio e é extremamente manobrável. Ao atacar com esta arma o atacante tem maior facilidade para acertar pontos fracos na defesa do inimigo e pode considerar um rolamento crítico com 19 ou 20 no rolamento do D20 e seu dano é triplicado e não dobrado. A katar é uma arma leve, com acuidade e causa 1d4 de dano perfurante ou cortante. ",
            "preco": "40 M.O.",
            "dano": "1d4 de dano perfurante ou cortante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Lança",
            "descricao": "É qualquer arma feita com uma haste de madeira e ponta afiada, natural ou metálica. Por sua facilidade de fabricação, é muito comum entre diversas espécies menos civilizadas. Uma lança também pode ser arremessada. Esta arma simples pode ser usada com uma mão ou duas e pode ser arremessada. Esta arma causa 1d6 de dano perfurante com uma mão e 1d8 com duas e pode ser arremessada até 9 metros sem penalidade e no máximo 15 metros de distância. ",
            "preco": "1 M.O.",
            "dano": "1d6 de dano perfurante (com uma mão) e 1d8 com duas mãos",
            "alcance": "Arremesso até 15 metros"
        },
        {
            "nome": "Lança de Falange",
            "descricao": "Uma ersão mais comprida da lança comum, mas balanceada para ser usada com uma mão. A lança de falange pode ser arremessada, e é uma arma de haste. A lança de falange é muito grande para ser usada com uma mão sem treinamento especial; por isso é uma arma exótica. Ela pode ser usada como uma arma marcial de duas mãos. Esta arma pesada possui um alcance padrão de 3 metros, causa 1d10 de dano perfurante com uma mão e 1d12 com duas e pode ser arremessada até 9 metros sem penalidade e no máximo 15 metros de distância. ",
            "preco": "5 M.O.",
            "dano": "1d10 de dano perfurante (com uma mão) e 1d12 com duas mãos",
            "alcance": "3 metros"
        },
        {
            "nome": "Lança-foguete",
            "descricao": "Esta lança parece normal, mas há um “foguete” (um reservatório de pólvora) no meio de sua haste. Este foguete pode ser ativado por uma corda na haste (uma ação livre), fazendo com que o próximo arremesso da lança tenha o seu alcance dobrado e receba vantagem nas jogadas de acerto e 1d6 a mais de dano. Depois de arremessada com o pavio do foguete aceso, a lança torna-se inútil. Esta arma causa 1d6 de dano perfurante com uma mão, ou se arremessada, e 1d8 com duas e pode ser arremessada até 9 metros sem penalidade e no máximo 15 metros de distância. ",
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
            "descricao": "Quando montado,o personagem pode utilizar essa arma com apenas uma mão. A lança montada é uma arma de haste, e causa dano dobrado se usada durante uma investida (avançar no mínimo 3 metros em linha reta) montada. Esta arma possui alcance de 3 metros e causa 2d6 de dano perfurante com uma mão enquanto montado e 1d10 quando segurada por duas mãos e desmontado, não é possível atacar com uma mão enquanto desmontado. ",
            "preco": "15 M.O.",
            "dano": "2d6 de dano perfurante com uma mão enquanto montado, 1d10 com duas mãos enquanto desmontado",
            "alcance": "3 metros"
        },
        {
            "nome": "Maça",
            "descricao": "Composta por um bastão metálico com um peso cheio de protuberâncias na extremidade, a maça é muito usada por clérigos que fazem votos de não derramar sangue. De fato, um golpe de maça nem sempre derrama sangue, mas pode esmagar alguns ossos. Essa arma é muito efetiva contra constructos e esqueletos, ataques com essa arma contra essas criaturas causa o dobro do dano. Esta arma de uma mão causa 1d6 de dano de impacto. ",
            "preco": "5 M.O.",
            "dano": "1d6 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Maça-Estrela",
            "descricao": "Uma maça-estrela tem espinhos pontiagudos, sendo mais perigosa que uma maça comum. É uma arma rústica, mas capaz de causar ferimentos profundos. Essa arma é muito efetiva contra constructos e esqueletos, ataques com essa arma contra essas criaturas causa o dobro do dano. Esta arma de uma mão causa 1d8 de dano perfurante. ",
            "preco": "15 M.O.",
            "dano": "1d8 de dano perfurante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Maça de Guerra",
            "descricao": "Uma  versão mais perigosa da maça comum, com uma cabeça formada por grandes placas de metal.  Essa arma é muito efetiva contra constructos e esqueletos, ataques com essa arma contra essas criaturas causam o dobro de dano. O peso da maça de guerra torna seu golpe poderoso, mas desajeitado. Um personagem usando uma maça de guerra sofre -1 nos rolamentos de acerto. Esta arma pesada de uma mão causa 1d12 de dano de impacto. ",
            "preco": "30 M.O.",
            "dano": "1d12 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Machadinha",
            "descricao": "Uma ferramenta bem útil para cortar madeira, e também inimigos. Uma machadinha pode ser arremessada. Esta arma de uma mão causa 1d6 de dano cortante com alcance de 9 metros sem penalidade e 18 metros máximo. ",
            "preco": "5 M.O.",
            "dano": "1d6 de dano cortante",
            "alcance": "9 metros sem penalidade, 18 metros máximo"
        },
        {
            "nome": "Machado Anão",
            "descricao": "Esse  poderoso machado é a arma favorita dos anões, quase um símbolo da raça. O Machado Anão é pesado demais para ser usado com uma mão sem treinamento: Por isso é uma arma exótica. O machado anão pode ser usado como uma arma marcial de duas mãos. Esta arma pesada causa 1d12 de dano cortante. ",
            "preco": "50 M.O.",
            "dano": "1d12 de dano cortante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Machado de Batalha",
            "descricao": "Diferente de uma machadinha, este não é um simples instrumento para cortes de árvores, mas sim uma poderosa arma capaz de causar ferimentos terríveis. Quando um atacante usando esta arma rola um 20 natural esta arma causa 1d6 de dano extra (depois de calcular o valor do dano crítico ). Esta arma de uma mão causa 1d8 de dano cortante  e pode ser usada com duas mãos para causar 1d10 de dano. ",
            "preco": "10 M.O.",
            "dano": "1d8 de dano cortante (1d10 com duas mãos)",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Maça-granada",
            "descricao": "Esta maça tem uma carga explosiva em sua cabeça. A granada é ativada quando submetida a uma grande pressão. Quando o personagem faz um acerto crítico, além de infligir dano dobrado, causa uma explosão, que faz 4d4 pontos de dano de fogo no alvo e 2d4 pontos de dano ao usuário. Depois de explodir, a maça fica inutilizada.  Esta arma de uma mão causa 1d8 de dano de impacto.",
            "preco": "20 M.O.",
            "dano": "1d8 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Machado Grande",
            "descricao": "Este  imenso machado de lâmina dupla é uma das mais perigosas armas existentes. Quando um atacante rola um acerto crítico esta arma causa 1d6 de dano extra (depois de calcular o valor do dano crítico ). Esta arma de duas mãos causa 1d12 de dano cortante.",
            "preco": "30 M.O.",
            "dano": "1d12 de dano cortante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Machado Táurico",
            "descricao": "Uma  haste de 2m de comprimento com uma lâmina extremamente grossa na ponta, o machado táurico é muito pesado, e impõe uma penalidade de -1 na Valor de Defesa de seu usuário. Exige Força 12 ou mais para ser manuseado. Quando um atacante usando esta arma rola um acerto crítico esta arma causa 1d12 de dano extra antes de calcular o valor do cŕitico. Esta arma de duas mãos causa 4d6 de dano cortante com alcance de 3 metros. ",
            "preco": "80 M.O.",
            "dano": "4d6 de dano cortante",
            "alcance": "3 metros"
        },
        {
            "nome": "Mangual",
            "descricao": "Arma composta por uma haste metálica ligada a uma corrente que por sua vez é ligada a uma esfera de aço. O mangual pode se enroscar na arma do adversário, e usar a ação desarmar ao mesmo tempo que atacar (uma vez por turno). Esta arma ganha +1 em rolagens de acerto contra oponentes com escudos. Esta arma causa 1d8 de dano de impacto.",
            "preco": "10 M.O.",
            "dano": "1d8 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Mangual Pesado",
            "descricao": "Uma versão mais pesada do mangual, feita para ser usada com duas mãos. O mangual pode se enroscar na arma do adversário, e usar a ação desarmar ao mesmo tempo que atacar (uma vez por turno). Esta arma ganha +1 em rolagens de acerto contra oponentes com escudos. Esta arma causa 1d10 de dano de impacto.",
            "preco": "20 M.O.",
            "dano": "1d10 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Manopla-Espada",
            "descricao": "Uma braçadeira de metal na qual é fixada uma lâmina, que corre paralelamente ao antebraço do usuário. Como a manopla-espada protege seu braço,o personagem recebe um bônus de +1 na Valor de Valor. Se usar uma manopla-espada em cada um de seus braços, e tiver a Regalia de Combate com Duas Armas, o bônus aumenta para +2. Esta arma não pode ser desarmada. Por possuir menos mobilidade para atacar é mais difícil causar dano. Esta arma leve causa 1d6 de dano cortante. ",
            "preco": "25 M.O.",
            "dano": "1d6 de dano cortante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Marreta",
            "descricao": "Este  martelo tem o cabo comprido e a cabeça chata e pesada. É uma arma desajeitada, mas poderosa. Esta arma pesada de duas mãos causa 2d6 de dano de impacto e causa o dobro de dano contra estruturas e construtos de pedra. ",
            "preco": "5 M.O.",
            "dano": "2d6 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Marreta-pistão",
            "descricao": "Semelhante ao martelo-pistão, mas maior, para ser usada com duas mãos. Funciona da mesma maneira — use uma ação para carregar uma carga de vapor. Ao liberar a carga, a marreta concede um bônus de dupla vantagem na jogada de acerto. Esta arma pesada de duas mãos causa 2d6 de dano de impacto e causa dobro de dano contra estruturas e construtos de pedra. ",
            "preco": "15 M.O.",
            "dano": "2d6 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Marreta Estilhaçadora",
            "descricao": "Este grande e desajeitado martelo de guerra é pouco eficaz em combate normal e reduz em -1 seu valor de ataque. Com o cabo longo e uma imensa cabeça de metal, a marreta estilhaçadora conta com uma superfície de impacto larga, incapaz de causar muito dano real. Sua verdadeira finalidade é despedaçar armaduras e carapaças de monstros   especialmente seres da realidade aberrante; com um crítico no dado, em vez de causar dano multiplicado, a marreta reduz em 2 o bônus de armadura natural da criatura atingida, ou o bônus de armadura da armadura que a criatura estiver usando, essa penalidade dura até o fim do seu próximo turno.  Esta arma pesada de duas mãos causa 2d6 de dano de impacto e causa dobro de dano contra estruturas e construtos de pedra. ",
            "preco": "10 M.O.",
            "dano": "2d6 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Martelo",
            "descricao": "Em sua essência é uma ferramenta para bater pregos, em caso de problemas uma arma para bater em inimigos. Esta arma leve de um mão causa 1d4 de dano de impacto e causa dano máximo contra esqueletos e construtos de ossos. ",
            "preco": "2 M.O.",
            "dano": "1d4 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Martelo de Guerra",
            "descricao": "Mais uma ferramenta modificada para combate. É muito eficiente contra alguns tipos de mortos-vivos, por exemplo esqueletos. Também é a arma preferida de quase todos os anões que recusam os machados. Esta arma pesada de uma mão causa 1d8 de dano de impacto e causa dano máximo contra esqueletos e construtos de ossos.",
            "preco": "15 M.O.",
            "dano": "1d8 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Martelo-pistão",
            "descricao": "Este martelo tem um mecanismo avançado em seu interior. Com uma ação,o personagem puxa o pistão e “carrega” uma carga de vapor na arma. Em qualquer momento até 1 hora depois de carregar a arma,o personagem pode liberar a energia do pistão para a ponta do martelo com uma alavanca na haste. Quando fizer isso, o martelo move sua cabeça muito rapidamente e dá um impulso extra no ataque, concedendo dupla vantagem jogada de Acerto. Esta arma pesada de duas mãos causa 1d10 de dano de impacto e causa dano máximo contra esqueletos e construtos de ossos. ",
            "preco": "40 M.O.",
            "dano": "1d10 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Mosquete",
            "descricao": "Uma arma de uso complicado, que é rejeitada pela maioria dos guerreiros, porém devastadora ao atingir seu alvo. Recarregar um mosquete é uma ação, e cabe no máximo duas balas em seu barril . Exige as duas mãos. Essa arma marcial pesada a distância  causa 2d8 de dano perfurante, ao atirar produz um enorme som e tem alcance de 60 metros sem penalidade e alcance máximo de 180 metros. ",
            "preco": "500 M.O.",
            "dano": "2d8 de dano perfurante",
            "alcance": "60/180 metros"
        },
        {
            "nome": "Montante cinético",
            "descricao": "Esta  imensa espada de duas mãos tem minúsculas esferas de mitralino untadas com um óleo especial no interior de sua lâmina. O movimento destas esferas faz com que a espada tenha seu peso e impacto aumentados várias vezes, sendo extremamente letal. Porém, ela torna-se imprevisível. Ao rolar um resultado “1” numa jogada de ataque, o personagem sofre o dano da própria arma, com todos os bônus normais. Exige força 11 para ser utilizada. Essa arma pesada de duas mãos causa 3d6 de dano cortante.",
            "preco": "250 M.O.",
            "dano": "3d6 de dano cortante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Mosquetão",
            "descricao": "Este mosquete tem tambor e cano mais grossos, concentrando a força do tiro em um alvo mais próximo. Consequentemente, tem alcance menor, mas causa mais dano.Carregar um mosquete é uma ação e cabe no máximo duas balas em seu barril. Essa arma exótica pesada a distância causa 4d8 de dano perfurante, ao atirar produz um enorme som, tem alcance de 6 metros e todos seus ataques são com  desvantagem, se proficiente caso erre o ataque ainda causa 1d8 de dano perfurante sem adição do valor de destreza.",
            "preco": "500 M.O.",
            "dano": "4d8 de dano perfurante",
            "alcance": "6 metros"
        },
        {
            "nome": "Nunchaku",
            "descricao": "Composto por dois bastões curtos de madeira ligados por uma corrente ou tira de couro. O nunchaku quando usado por um monge causa 1d10 de dano de impacto e causa desvantagem no teste para não ser atordoado pelo monge. Essa arma leve usada com as duas mãos causa 1d6 de dano de impacto. ",
            "preco": "2 M.O.",
            "dano": "1d6 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Pique",
            "descricao": "É basicamente uma lança muito longa. Esta arma de haste é preferida por guardas medrosos que não querem ficar perto de seus inimigos, uma versão mais comprida da lança comum, mas usada com as duas mãos sempre. Esta arma pesada possui um alcance padrão de 3 metros, causa 1d10 de dano perfurante e possui 1 ponto bônus de acerto contra alvos montados ou voadores no alcance. Desvantagem em ataques feitos em 1,5 metros de distância. ",
            "preco": "10 M.O.",
            "dano": "1d10 de dano perfurante",
            "alcance": "3 metros"
        },
        {
            "nome": "Pistola",
            "descricao": "Considerada  a mais popular arma de fogo, tem capacidade para apenas dois tiros. Requer apenas uma mão mas se empunhada com duas mãos, oferece um bônus de +1 em jogadas de acerto devido a estabilidade extra. Devido ao tempo de recarga (uma ação), alguns pistoleiros trazem consigo várias pistolas em diversos coldres. Até seis pistolas podem ser transportadas dessa forma. Ao segurar apenas esta arma, um Combatente ganha +2 ao rolar a iniciativa. Esta arma de fogo leve causa 1d8 de dano perfurante.",
            "preco": "180 M.O.",
            "dano": "1d8 de dano perfurante",
            "alcance": "36 metro"
        },
        {
            "nome": "Pistola de tambor",
            "descricao": "Esta maravilha tecnológica conta com um tambor capaz de girar, alinhando cargas de pólvora e balas com o cano repetidas vezes. Depois de dar um tiro o usuário pode girar o tambor e realizar outro tiro com a mesma pistola, até um máximo de quatro tiros no total por pistola, e então usar uma ação para recarregar a arma. Esta arma é quase desconhecida, provavelmente a mais rara das armas tecnológicas. Ao segurar apenas esta arma, um combatente ganha +2 ao rolar a iniciativa. Esta arma de fogo leve causa 1d8 de dano perfurante.",
            "preco": "400 M.O.",
            "dano": "1d8 de dano perfurante",
            "alcance": "36 metro"
        },
        {
            "nome": "Pó da Explosão Solar",
            "descricao": "Estefrasco de cerâmica contém um pó que explode em contato com o ar. Quando o frasco é arremessado e quebra, qualquer criatura num raio de 6 metros é afetada. Uma criatura afetada fica atordoada por uma rodada, devido ao brilho e barulho da explosão. ",
            "preco": "100 M.O.",
            "dano": "Atordoa criaturas no raio",
            "alcance": "6 metros (raio)"
        },
        {
            "nome": "Presa da Serpente",
            "descricao": "Estaarma é uma espada feita de obsidiana. Devido a sua fragilidade, a presa da serpente é de difícil uso, e por isso é uma arma exótica. Uma criatura que sofre um ataque desta arma entra na condição sangrando.  Se o valor final do acerto de um ataque for 8 ou menor, ou se a rolagem for uma falha crítica, a arma quebra. Esta arma tem sua margem de crítico reduzida para 17.Esta arma leve de uma mão causa 2d4 de dano cortante.",
            "preco": "30 M.O.",
            "dano": "2d4 de dano cortante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Rede",
            "descricao": "A rede de combate tem pequenos dentes em sua trama e uma corda para controlar os inimigos presos. Se acertar o ataque, a criatura fica restringida . Além disso, se o personagem for bem sucedido em um teste de Força, a vítima só pode se mover até o limite da corda (9m). Para se soltar é necessário uma ação completa e um teste de Acrobacia ou atletismo (dificuldade 10). A rede possui 5 Pontos de Vida, e se rasgar qualquer criatura presa se solta automaticamente. Ela só pode ser usada contra criaturas de até uma categoria de tamanho maior que o personagem. ",
            "preco": "1 M.O.",
            "dano": "Nenhum dano, apenas restrição",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Sabre Serrilhado",
            "descricao": "Esta arma cruel possui uma lâmina parecida com um serrote. Ela causa grande estrago quando atinge a carne, rasgando e destroçando tudo. Devido a seus \"dentes\", é comum que fique profundamente entrelaçada nas costelas (ou órgãos equivalentes). Após um acerto crítico, em vez de causar dano multiplicado, o sabre fica preso e requer uma ação para ser arrancado. Esse ato causa à vítima 2 pontos de dano adicional. Caso não seja removida, a arma causa 1d4 de dano para cada ação realizada pela vítima. O portador da arma pode arrancar a arma como uma ação em seu turno ou como reação fora de seu turno, de qualquer forma a arma causa 2d4 de dano cortante ao ser retirada. Causa 1d8 pontos de dano cortante. ",
            "preco": "25 M.O.",
            "dano": "1d8 de dano cortante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Sai",
            "descricao": "Parecido com um grande garfo de metal, a adaga Sai é uma arma para prender as armas do oponente. Ao usar a ação atacar no seu turno, o atacante pode substituir um de seus ataques e realizar a ação desarmar. A margem de crítico desta arma é reduzida para 19. Esta arma leve de uma mão causa 1d4 de dano perfurante.",
            "preco": "10 M.O.",
            "dano": "1d4 de dano perfurante",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Vara-relâmpago",
            "descricao": "Trata-se de uma vara de madeira de 1,5 metros que possui em seu interior um fio de cobre ligado a uma bateria arcana. Na ponta da vara há uma esfera de cobre. Quando o usuário aproxima a ponta da vara ao alvo, a bateria descarrega uma carga elétrica contra ele. Para acertar, o usuário deve fazer um rolamento de ataque corpo a corpo usando combate arcano. A bateria tem capacidade para 10 descargas e deve ser usada como uma mochila. Um conjurador que possua pontos de magia pode recarregar essas cargas com estes pontos. Quando o usuário faz um acerto crítico com a vara, causa dano triplicado! Contudo descarrega 3 cargas da bateria, se a bateria tiver menos que 3 cargas o dano é o mesmo e a bateria se descarrega completamente. Esta arma exótica de uma mão causa 3d8 de dano de raio.",
            "preco": "300 M.O.",
            "dano": "3d8 de dano de raio",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Tacape",
            "descricao": "Versão  mais perigosa da clava, maior e/ou com pregos. Não é uma arma muito elegante, mas faz o serviço. Causa 1d8 de dano de impacto e é feito com qualquer pedaço grande de madeira que tenha um lado mais pesado que o outro e algum balanço. Arma Pesada.",
            "preco": "5 M.O.",
            "dano": "1d8 de dano de impacto",
            "alcance": "Corpo a corpo"
        },
        {
            "nome": "Tridente",
            "descricao": "O tridente, garfo ou forcado é uma arma branca que se assemelha a uma lança, mas com duas, três ou mais lâminas ou ponteiras que acabam por enfraquecer o poder penetrante da lança (quando não há a armadura). O tridente tem vantagens em ataques feitos dentro da água, gerando um bônus de 1 ponto de acerto em ataques contra criaturas aquáticas. Esta arma é usada com as duas mãos e causa 1d10 de dano perfurante. ",
            "preco": "5 M.O.",
            "dano": "1d10 de dano perfurante",
            "alcance": "Corpo a corpo (com duas mãos)"
        },
        {
            "nome": "Wakizashi",
            "descricao": "Versão mais curta da Katana. Junto com ela formam o Daisho, armas tradicionais do guerreiro de katana. A katana e a wakizashi são armas obra-prima (+1 acerto). Se usada em conjunto a uma katana, pode se atacar com a wakizashi na mesma ação que a katana. Ao atacar com a wakizashi desta maneira é gerado penalidade de ataque para o próximo ação de ataque como se fossem duas ações e não uma.  Essa arma leve de uma mão causa 1d6 de dano cortante. ",
            "preco": "150 M.O.",
            "dano": "1d6 de dano cortante",
            "alcance": "Corpo a corpo"
        }
    ];
    const weapons = {
        "Armas Simples": [
            ["Adaga", "1d4", "1M", "19", "2 M.O."],
            ["Adaga de mola", "1d4", "1M", "19", "4 M.O."],
            ["Arco curto", "1d6", "2M", "20", "25 M.O."],
            ["Azagaia", "1d6", "1M", "20", "4 M.O."],
            ["Bastão acolchoado", "1d4", "2M", "20", "5 M.O."],
            ["Besta leve", "1d8", "2M", "20", "25 M.O."],
            ["Bordão", "1d6", "2M", "20", "0 M.O."],
            ["Clava", "1d4", "1M", "20", "1 M.O."],
            ["Espada curta", "1d6", "1M", "20", "10 M.O."],
            ["Funda", "1d4", "1M", "20", "2 M.P."],
            ["Lança", "1d6/1d8", "1M/2M", "20", "1 M.O."],
            ["Maça", "1d6", "1M", "20", "50 M.O."],
            ["Machadinha", "1d6", "1M", "20", "5 M.O."],
            ["Martelo leve", "1d4", "1M", "20", "2 M.O."],
            ["Tacape", "1d8", "2M", "20", "0"]
        ],
        "Armas Marciais": [
            ["Aji", "1d6", "1M", "20", "2 M.O."],
            ["Alabarda", "1d10", "2M", "20", "20 M.O."],
            ["Alfange", "1d8", "1M", "20", "25 M.O."],
            ["Arco Longo", "1d8", "2M", "20", "50 P.O."],
            ["Besta de Mão", "1d6", "1M", "20", "25 M.O."],
            ["Besta Pesada", "1d10", "2M", "20", "50 M.O."],
            ["Cajado de batalha", "1d4/1d6", "2M", "20", "2 M.P."],
            ["Chicote", "1d4", "1M", "20", "10 M.O."],
            ["Cimitarra", "1d4", "1M", "20", "25 M.O."],
            ["Corrente com Cravos", "1d4", "2M", "20", "30 M.O."],
            ["Espada Bastarda", "1d10/1d12", "1M/2M", "20", "30 M.O."],
            ["Espada Grande", "2d6", "2M", "20", "15 M.O."],
            ["Espada Longa", "1d8/1d10", "1M/2M", "20", "50 M.O."],
            ["Florete", "1d8", "1M", "20", "25 M.O."],
            ["Foice", "1d8", "1M", "18", "30 M.O."],
            ["Katana", "1d8/1d10", "1M/2M", "20", "200 M.O."]
        ],
        "Armas Exóticas": [
            ["Catapulta de Braço", "1d6", "2M", "20", "25 M.O."],
            ["Manopla de espinhos", "+1 ataques desarmados", "1M", "20", "10 M.O."],
            ["Espada Bastarda (uma mão)", "1d10", "1M", "20", "30 M.O."],
            ["Espada Lâminas Duplas", "1d8", "2M", "20", "40 M.O."],
            ["Espada Diapasão", "1d8", "1M", "20", "60 M.O."],
            ["Espada Táurica", "3d6", "2M", "20", "100 M.O."],
            ["Katana (uma mão)", "1d8", "1M", "20", "200 M.O."],
            ["Katar", "1d4", "1M", "19", "40 M.O."]
        ],
        "Escudos": [
            ["Escudo simples", "Defesa +2", "1M", "20", "15 M.O."],
            ["Escudo pesado", "Defesa +2", "1M", "20", "30 M.O."],
            ["Escudo de duelo", "Defesa +1", "1M", "20", "50 M.O."],
        ]
    };

    const armaduras = [
        { nome: "Armadura Acolchoada", tipo: "Leve", descricao: "Composta por várias camadas de tecido sobrepostas. É a armadura mais leve, mas também é a que oferece menos proteção.", bonus: "+1" },
        { nome: "Armadura Completa", tipo: "Pesada", descricao: "A mais forte e pesada, formada por placas de metal forjadas e encaixadas de modo a cobrir o corpo inteiro. Necessita adaptação por um ferreiro (500 M.O.).", bonus: "20" },
        { nome: "Armadura Cerimonial", tipo: "Leve", descricao: "Formada por uma couraça de bronze, aço e outros metais, combinando beleza e funcionalidade.", bonus: "+4" },
        { nome: "Brunea", tipo: "Média", descricao: "Colete de couro coberto com plaquetas de metal sobrepostas, como escamas de um peixe.", bonus: "+6" },
        { nome: "Camisa de Cota de Malha", tipo: "Leve", descricao: "Versão mais leve da cota de malha, cobrindo apenas o torso.", bonus: "+3" },
        { nome: "Corset de Couro", tipo: "Leve", descricao: "O peitoral desta armadura é feito de couro curtido, misturado com tecido para ter mobilidade.", bonus: "+2" },
        { nome: "Cota de Malha", tipo: "Média", descricao: "Longa veste de anéis metálicos interligados, formando uma malha flexível e resistente.", bonus: "+5" },
        { nome: "Cota de Talas", tipo: "Pesada", descricao: "Armadura composta de talas de metal cuidadosamente costuradas sobre um corselete de couro.", bonus: "18" },
        { nome: "Couraça", tipo: "Média", descricao: "Peitoral de aço que protege o peito e as costas. Popular entre nobres e oficiais.", bonus: "+4" },
        { nome: "Couro Batido", tipo: "Leve", descricao: "Versão mais pesada do corselete de couro, reforçada com rebites de metal.", bonus: "+4" },
        { nome: "Gibão de Peles", tipo: "Média", descricao: "Usada principalmente por bárbaros e selvagens, formada por várias camadas de peles e couro de animais.", bonus: "+3" },
        { nome: "Loriga Segmentada", tipo: "Pesada", descricao: "Composta de tiras horizontais de metal, esta armadura é pesada e resistente.", bonus: "16" },
        { nome: "Meia-Armadura", tipo: "Pesada", descricao: "Combinação de cota de malha e placas de metal posicionadas sobre as áreas vitais.", bonus: "19" },
        { nome: "O-Yoroi", tipo: "Pesada", descricao: "Usada pelos samurais, formada por pequenas placas metálicas unidas por nós de couro colorido.", bonus: "17" }
    ];
    const armadurasPesadas = [
        { nome: "Loriga segmentada", defesa: 16, preco: "325 M.O.", forca: 2 },
        { nome: "O-Yoroi", defesa: 17, preco: "575 M.O.", forca: 3 },
        { nome: "Cota de talas", defesa: 18, preco: "800 M.O.", forca: 3 },
        { nome: "Meia armadura", defesa: 19, preco: "1000 M.O.", forca: 4 },
        { nome: "Armadura completa", defesa: 20, preco: "1500 M.O.", forca: 5 },
    ];

    const armadurasMedias = [
        { nome: "Gibão de peles", defesa: "+3", preco: "250 M.O." },
        { nome: "Couraça", defesa: "+4", preco: "375 M.O." },
        { nome: "Cota de malha", defesa: "+5", preco: "750 M.O." },
        { nome: "Brunéia", defesa: "+6", preco: "1000 M.O." },
    ];



    const armadurasLeves = [
        { nome: "Armadura Acolchoada", defesa: "+1", preco: "100 M.O." },
        { nome: "Corset de Couro", defesa: "+2", preco: "200 M.O." },
        { nome: "Camisa de Cota de Malha", defesa: "+3", preco: "400 M.O." },
        { nome: "Couro Batido", defesa: "+4", preco: "600 M.O." },
        { nome: "Armadura Cerimonial", defesa: "+5", preco: "1000 M.O." },
    ];

    const TabelaDeArmaduras = ({ titulo, dados }) => (


        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Typography className="MainTitleC" variant="h5" sx={{ my: 4 }}>{titulo}</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Armadura</TableCell>
                        <TableCell>Valor de Defesa</TableCell>
                        <TableCell>Preço</TableCell>
                        {dados[0]?.forca !== undefined && <TableCell>Força Mínima</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dados.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="bigBoxTextEquips">{item.nome}</TableCell>
                            <TableCell className="bigBoxTextEquips">{item.defesa}</TableCell>
                            <TableCell className="bigBoxTextEquips">{item.preco}</TableCell>
                            {item.forca !== undefined && <TableCell>{item.forca}</TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );

    const WeaponTable = ({ title, data }) => (
        <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Typography className="MainTitleC" variant="h6" >
                {title}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className="bigBoxTextEquips" >Item</TableCell>
                        <TableCell className="bigBoxTextEquips" >Dano</TableCell>
                        <TableCell className="bigBoxTextEquips" >Uma Mão/Duas Mãos</TableCell>
                        <TableCell className="bigBoxTextEquips" >Crítico</TableCell>
                        <TableCell className="bigBoxTextEquips" >Preço</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((weapon, index) => (
                        <TableRow key={index}>
                            {weapon.map((cell, i) => (
                                <TableCell className="bigBoxTextEquips" key={i}>{cell}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

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
                        {Object.entries(weapons).map(([category, data], index) => (
                            <WeaponTable key={index} title={category} data={data} />
                        ))}
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ my: 4 }} className="boxTextTitle" >Descrição das armas</Typography>
                        <Box sx={{ display: "flex", flexWrap: 'wrap', justifyContent: 'left', gap: '1%' }}>
                            {armas.map((arma, index) => (
                                <Paper key={index} elevation={3} sx={{ padding: 3, marginBottom: 2, width: '24%', height: "600px" }}>
                                    <Typography className="estebanText" variant="h5" color="primary" gutterBottom>
                                        {arma.nome}
                                    </Typography>
                                    <Typography className="armaCard esteban font16" sx={{ textAlign: 'justify', overflowY: 'scroll', height: '370px', p: 2, border: '1px solid gray', borderRadius: "10px" }} paragraph>
                                        {arma.descricao}
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12}>
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
                <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
                    <Typography className="boxTextTitle" variant="h4" gutterBottom>Armaduras</Typography>
                    <Typography className="estebanText" variant="body1" paragraph>
                        <strong>Atenção:</strong> Armaduras pesadas requerem um mínimo de força. Se usadas sem esse pré-requisito, sofre as seguintes penalidades:
                    </Typography>
                    <ul>
                        <li className="estebanText">-1,5 m de velocidade de movimento por ponto de força abaixo do requerido.</li>
                        <li className="estebanText">-1 em rolamento de acerto de qualquer teste de combate por ponto de força abaixo do requerimento.</li>
                        <li className="estebanText">Requer duas ações para usar a ação andar/correr ao invés de apenas uma.</li>
                    </ul>
                    <Typography className="estebanText" variant="body1" paragraph>
                        Armaduras pesadas sofrem penalidade em testes de furtividade de -5 e armaduras médias sofrem uma penalidade de -2. Se uma criatura que não recebe capacidade de usar um tipo de armadura usá-la, se torna incapaz de conjurar magias, milagres, feitiços, manobras e quaisquer habilidades. Além disso, todo rolamento de habilidade possui desvantagem.
                    </Typography>

                    <TabelaDeArmaduras titulo="Armaduras Pesadas" dados={armadurasPesadas} />
                    <TabelaDeArmaduras titulo="Armaduras Médias" dados={armadurasMedias} />
                    <TabelaDeArmaduras titulo="Armaduras Leves" dados={armadurasLeves} />
                    <Grid container spacing={3} sx={{ pt: 4 }}>
                        {armaduras.map((armadura, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{armadura.nome}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {armadura.tipo} - Bônus de Defesa: {armadura.bonus}
                                        </Typography>
                                        <Typography variant="body2">{armadura.descricao}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
            {equipmentValue === 3 && (
                <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>

                </Box>
            )}
            {equipmentValue === 4 && (
                <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
                    =
                </Box>
            )}
            {equipmentValue === 5 && (
                <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>

                </Box>
            )}
            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>
    );
};

export default EquipmentPage;
