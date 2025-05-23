import React, { useState, useCallback, useRef } from 'react';
import dayjs from 'dayjs';
import { Box, Container, Card, CardHeader, CardContent, Tabs, Tab, Typography, Paper, Tooltip, Grid, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem, Stack, Divider, Chip } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import UIcon from '../../assets/images/userIcon.png';
import './char.css';
import Checkbox from '@mui/material/Checkbox';

const fisico = [
    {
        title: "Fortitude",
        description:
            "Essa Habilidade está ligada à vitalidade do personagem e é responsável por parte dos Pontos de Vida (A vida inicial de um personagem é igual à base declarada na espécie e 2x o valor de sua fortitude).  A partir do segundo nível, todo ponto de fortitude atribuído fornece 2 pontos de vida  a mais.  Ou seja, cada ponto de atributo fornece dois pontos de vida ao número total de pontos de vida independente se foi distribuído durante a criação de personagem ou depois.Algumas Regalias podem usar essa Habilidade como referência como parte de sua mecânica. A fortitude é usada como parâmetro para testes contra venenos, comidas podres e condicionamento físico por desgaste. Uma criatura pode segurar a respiração por um número de minutos igual ao valor nesta Habilidade. Ao atingir 10 pontos nessa Habilidade o personagem ganha um bônus de +2 em teste de fortitude para resistir a venenos e doenças."
    },
    {
        title: "Força",
        description:
            "Essa Habilidade está ligada à capacidade de carga do personagem e também determina o dano somado a ataques físicos feitos com armas corpo a corpo e suas Habilidades. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. A força pode ser usada em testes para permanecer pendurado ou para manter algo pesado levantado ou abaixado, de acordo com a situação. Ao atingir 10 pontos nessa Habilidade o personagem ganha um bônus de 3x o valor de força em quilos a mais em sua capacidade de carga, somado ao cálculo base descrito em “Tamanho vs Carga”,  e +2 em quaisquer testes de força."
    },
    {
        title: "Agilidade",
        description:
            "Essa Habilidade está relacionada à velocidade do personagem. Somando a velocidade base de sua Espécie com o bônus gerado pelo valor nesta Habilidade, determina-se sua velocidade total de movimento em combate. O valor do bônus pode ser encontrado em uma tabela no tópico combate, encontrado anteriormente neste documento. A agilidade também ajuda a determinar o Valor de Defesa e pode ser somada a armaduras leves, armaduras médias e escudos. Essa Habilidade, somada ao valor de percepção, forma o valor da iniciativa de combate. Regalias podem usar essa Habilidade como referência como parte de sua mecânica.A agilidade é a Habilidade padrão para testes de reflexo ou de velocidade em uma corrida ou fuga.Ao atingir 10 pontos nessa Habilidade o personagem ganha um bônus de +2 em teste de reflexo( testes feitos para definir se um personagem, se agarra a algo, desviar de algo, pega algo que foi arremessado, etc.)."
    },
    {
        title: "Combate Corpo a Corpo",
        description:
            "Essa Habilidade está relacionada à capacidade de lutar com uma arma corpo a corpo e determina o seu Valor de Acerto. Regalias podem usar essa Habilidade como referência como parte de sua mecânica."
    },
    {
        title: "Combate a Distância",
        description:
            "Essa Habilidade está relacionada à capacidade de lutar com uma arma de disparo ou arremesso e determina o seu Valor de Acerto. Regalias podem usar essa Habilidade como referência como parte de sua mecânica."
    },
    {
        title: "Atletismo",
        description:
            "Essa Habilidade está relacionada à capacidade atlética do personagem e determina a capacidade de realizar saltos verticais, saltos horizontais, nadar e escalar. Essa Habilidade também determina a estamina inicial do personagem. Regalias podem usar essa Habilidade como referência como parte de sua mecânica.Ao atingir 10 pontos nessa Habilidade o personagem ganha um bônus de 5 pontos de estâmina a mais e também pode escalar e nadar com o valor de velocidade total, sem a redução. O personagem também consegue usar a ação Disparada como duas ações ao invés de ser uma ação de turno completo."
    },
    {
        title: "Acrobacia",
        description:
            "Essa Habilidade está relacionada à capacidade acrobática do personagem e determina a capacidade de realizar manobras em meio a um salto, saltar por uma janela, equilibrar-se em uma superfície escorregadia ou em uma corda, malabarismo, fazer piruetas e afins. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem ganha um bônus de +2 em testes para equilibrar-se. Ao mesmo tempo quedas de até 9 metros não lhe causa dano e o dano de queda de 12 metros para cima tem o dano resetado e começa a contar como se estivesse caindo de 3 metros (12 metros= 1d4 de dano , 15 metros= 2 pontos de dano, 18 metros= 4 pontos, etc.).o personagem também pode usar a ação Levantar ao mesmo tempo que uma ação de movimento."
    },
    {
        title: "Destreza",
        description:
            "Essa Habilidade está ligada à capacidade de executar uma tarefa complexa que exige grande Habilidade manual, e também determina o dano somado a ataques físicos feitos com armas de disparo ou arremesso e suas Habilidades. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Essa Habilidade é padrão para testes que envolvam desamarrar cordas ou amarrá-las, assim como tentar abrir uma fechadura, montar ou desmontar qualquer coisa que não seja obviamente impossível ou pesada demais. Ou seja, destreza tem a ver com manuseio preciso de ferramentas e objetos.Ao atingir 10 pontos nessa Habilidade o personagem ganha um bônus de +2 em todos os testes que fizer para operar com precisão quaisquer ferramentas."
    }
];
const exploracao = [
    {
        title: "Furtividade",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem de se esconder dos olhos e/ou ouvidos de outras criaturas. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem consegue usar a ação Esconder Objeto como ação livre uma vez em seu turno. Também consegue usar a ação Esconder ao mesmo tempo que uma ação de movimento, lembre-se que existem condições para estar na condição Escondido. Além disso, não sofre penalidade de movimento ao usar a ação esgueirar-se."
    },
    {
        title: "Investigação",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem de procurar e vasculhar um ambiente, móvel (mesa, armário, etc.) ou objeto (uma caixa sem fechadura, uma esfera que parece um quebra cabeça e outros objetos fora do comum). Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem consegue usar investigação ao usar as ações Buscar e Ler Ambiente. Também consegue, ao gastar uma ação em combate, analisar seu adversário e procurar por uma abertura ou ponto fraco em sua defesa para ganhar um bônus em seu próximo ataque igual a +2."
    },
    {
        title: "Rastreamento",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem de seguir pegadas, cheiros e outras pistas deixadas por uma criatura ou veículo. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem consegue antecipar os movimentos e intenções de criaturas, permitindo-lhe maior chance de evitar emboscadas e embates desfavoráveis. Ele recebe um bônus de +4 em testes relacionados à prevenção de emboscadas (percepção ou investigação), identificação de comportamentos de caça (lidar com animais, percepção ou intuição) e testes de reflexo para evitar armadilhas. Além disso, o personagem consegue usar Rastreamento ao usar as ações Buscar e Ler Ambiente, ao invés de percepção ou intuição."
    },
    {
        title: "Percepção",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem de  discernir o que interessa entre os sons do ambiente, do que ele consegue ver e do que ele consegue sentir ao toque. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem consegue utilizar o seu valor de  percepção ao invés dos valores em investigação ou rastreamento, ao realizar o testes citados . Além de ficar imune a condição surpreso."
    },
    {
        title: "Sobrevivência",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem de procurar por abrigo (ou montar um), procurar comida, encontrar água e outros recursos em qualquer situação, mas principalmente na natureza. O que um personagem pode encontrar depende do ambiente em que está. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem se torna um especialista em sobreviver em terrenos perigosos e traiçoeiros, como pântanos, florestas densas ou desertos. Ele recebe um bônus de +4 em testes para navegar por esses terrenos, evitar armadilhas naturais e encontrar rotas seguras, o personagem também se torna capaz de, uma vez por descanso longo, tirar um nível da condição cansado ao realizar um descanso curto."
    },
    {
        title: "Lidar com animais",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem de transmitir um pedido, aviso ou outras formas de se comunicar, e relacionar, com um animal sem o uso de magia. Ao atingir 10 pontos nessa Habilidade o personagem adquire habilidades básicas de tratamento de ferimentos em animais. Ele pode aplicar a ação de turno completo Primeiros Socorros em animais feridos gastando apenas uma ação, o personagem também se torna um mestre na montaria de animais e ao montar animais não treinados consegue guiá-los em combate sem precisar realizar testes para controlar seus movimentos e ações."
    },
    {
        title: "Navegação",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem de encontrar o caminho com base na posição do sol, estrelas e referências geográficas caso saiba o caminho ou tenha um mapa.  Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem adquire a capacidade de sempre saber que direção é o norte, e se já tiver passado por um caminho antes o personagem não fica perdido (no caminho mencionado). Além disso, recebe +2 em testes de navegação que envolva passar em áreas obscurecidas por nevoeiros e outros fenômenos naturais (ou não) que impedem a visão."
    },
    {
        title: "Armadilhas",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem de encontrar e desarmar armadilhas em um ambiente. Ao implantar armadilhas, então um teste com esta habilidade é feito e o resultado determina a dificuldade para desarmá-la. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem se torna capaz de usar a ação de turno completo Desabilitar / Habilitar Dispositivo como uma ação desde que esteja desarmando ou armando uma armadilha. Além disso, o personagem consegue reduzir o dano de armadilhas, caso caia em uma, em metade. Se a armadilha causar mais algum efeito em seu corpo além de dano, o personagem pode escolher evitar esse efeito uma vez por dia."
    }
];
const conhecimento = [
    {
        title: "História",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem lembrar de fatos, descrições e definições que já ouviram, viram acontecer ou leram. Os assuntos que essa Habilidade cobre são eventos históricos, conhecimentos gerais da sociedade, e qualquer assunto que não seja sobre a natureza e o sobrenatural. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem consegue usar a ação Recordar Conhecimento(história) enquanto realiza qualquer  outra ação em seu turno. Além disso, ganha um  ponto nas proficiências Línguas Antigas e Arqueologia. "
    },
    {
        title: "Intuição",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem  entender uma situação ou a intenção de uma pessoa, ou mais, associando sua percepção com suas experiências pessoais. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem consegue usar a ação Ler Ambiente enquanto realiza qualquer  outra ação em seu turno."
    },
    {
        title: "Natureza",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem em reconhecer os mais diversos aspectos e informações de plantas, animais, biomas, fungos, rochas e todos as coisas que façam parte da natureza. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem  se torna um especialista em identificação de plantas e animais. Ganha a capacidade de, sem necessidade de um teste, reconhecer e nomear qualquer espécie encontrada em seu ambiente natural, identificando suas características, propriedades medicinais e qualquer uso relevante. Se o personagem for usar a Habilidade Natureza na ação Recordar Conhecimento ele automaticamente tem sucesso , mas usar uma ação ainda é necessário."
    },
    {
        title: "Medicina",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem reconhecer doenças, tratar ferimentos e enfermidades. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 5 pontos nessa Habilidade o personagem cura o valor dessa Habilidade em pontos de vida quando usar um kit médico ou de herbalista. Ao atingir 10 pontos nessa Habilidade o personagem consegue usar a ação de turno completo “Primeiros socorros” como apenas uma ação."
    },
    {
        title: "Jurisprudência (Política e leis)",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem de entender as leis e ordem de sociedades estruturadas de maneira que tenham leis. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem consegue realizar uma análise detalhada de evidências, argumentos e precedentes legais, concedendo um bônus de +4 em testes de Investigação, Persuasão ou Intuição relacionados a leis de um sociedade. "
    },
    {
        title: "Teologia",
        description:
            "Essa Habilidade está relacionada ao conhecimento que o personagem tem sobre as Religiões existentes, suas histórias, doutrinas e capacidades. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem consegue usar a ação Recordar Conhecimento(Teologia) enquanto realiza qualquer  outra ação em seu turno. Também recebe um bônus fixo de +4 em todos os testes desta habilidade."
    },
    {
        title: "Tecnologia",
        description:
            "Essa Habilidade está relacionada ao conhecimento sobre mecânica, física e matemática. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem consegue usar a ação Recordar Conhecimento(Tecnologia) enquanto realiza qualquer  outra ação em seu turno. Também se torna capaz de usar a ação de turno completo Desabilitar / Habilitar Dispositivo como duas ações."
    }
];
const arcana = [
    {
        title: "Arcanismo",
        description:
            "Essa Habilidade está relacionada ao conhecimento de um personagem sobre magia e o véu arcano. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem ganha +5 pontos de magia ao seu total de pontos. Além disso, o personagem consegue usar a ação Preparar para preparar magias de até duas ações ao invés de uma ação apenas."
    },
    {
        title: "Alquimia",
        description:
            "Essa Habilidade está relacionada ao conhecimento de um personagem sobre poções simples, mágicas e venenos. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem é capaz de realizar análises detalhadas de substâncias e materiais, identificando suas propriedades e composição sem necessidade de testes de Habilidade. O personagem se torna resistente ao dano causado por venenos, ácido e fogo que não são produzidos por uma magia, milagre ou feitiço. O custo de produção de poções cai em metade quando o personagem participa do processo de criação."
    },
    {
        title: "Ritualismo",
        description:
            "Essa Habilidade está relacionada ao conhecimento de um personagem sobre os mais diversos usos de um ritual. Um Ritual pode ser feito por um ou mais pessoas dependendo do objetivo final. Rituais podem ser feitos para selar, proteger, invocar, observar, abençoar, amaldiçoar, comunicar ou fortalecer um objeto, criatura ou lugar. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem consegue diminuir o custo dos materiais de um ritual em 5 vezes. Além disso, ao realizar um ritual o personagem recebe, uma vez por descanso longo, os benefícios de um descanso curto ."
    },
    {
        title: "Ocultismo",
        description:
            "Essa Habilidade está relacionada ao conhecimento de um personagem sobre o tema. O oculto  engloba demônios, maldições, magia de sangue, magia negra, pactos e mortos vivos. Para saber se um objeto é amaldiçoado é essa Habilidade que se usa. Com um sucesso, a dificuldade é determinada pelo mestre, em um teste de ocultismo o personagem descobre se um item está amaldiçoado, qual a maldição e como quebrá-la. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem consegue usar itens amaldiçoados sem ser afetado pela maldição. O personagem também consegue usar a ação Recordar conhecimento(ocultismo) como parte de outra ação."
    },
    {
        title: "Arcanatec",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem  de identificar um objeto mágico. Em um sucesso, no teste de Habilidade, é possível identificar um objeto mágico, aprendendo o que ele faz e quais os seus pré requisitos.  Essa Habilidade também está relacionada à capacidade de um personagem encontrar e usar ou desarmar uma armadilha mágica. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem consegue, sem a necessidade de um teste, identificar uma falsificação de um item mágico. Se um item mágico estiver danificado, o personagem pode consertá-lo ou pelo menos saber o que é necessário para tal. Além disso, o personagem consegue equipar um item mágico, de qualquer categoria, a mais que o previamente estipulado no tópico de itens  mágicos. Ao atingir 10 pontos nessa Habilidade o personagem também se torna capaz de usar a ação de turno completo Desabilitar / Habilitar Dispositivo como uma ação, desde que esteja desarmando ou armando uma armadilha mágica. Além disso, o personagem consegue diminuir o dano de armadilhas mágicas, caso caia em uma, pela metade. Se a armadilha causar mais algum efeito, além de dano, em seu corpo é possível evitar esse efeito uma vez por descanso longo."
    },
    {
        title: "Combate Arcano",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem de lutar com magias, feitiços e milagres e determina o seu Valor de Acerto. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. "
    }
];
const social = [
    {
        title: "Enganação",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem de convencer outras criaturas de suas mentiras, seja através da fala ou de ações. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem se torna capaz de usar as ações Fintar ou Distrair ao mesmo tempo que uma ação de movimento. "
    },
    {
        title: "Persuasão",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem convencer outras criaturas de seus argumentos, seja através da fala ou de ações. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem se torna capaz de usar a ação Pedir ao mesmo tempo que outra ação. Além disso, ganha um ponto na proficiência Liderança."
    },
    {
        title: "Performance",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem  de dançar, cantar, atuar, recitar um poema ou tocar um instrumento. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Os primeiros 5 pontos definem  suas capacidades artísticas. Um ponto nesta proficiência permite uma execução básica em uma forma de arte performática. Por exemplo, um personagem pode tocar algumas notas em um instrumento ou executar alguns passos de dança simples.Um segundo ponto permite um desempenho mais refinado e impressionante, o personagem pode tocar melodias mais complexas em seu instrumento ou realizar movimentos de dança mais elegantes e fluidos.Com três pontos, o personagem domina múltiplas formas de expressão artística, como música e dança, e alterna entre elas com facilidade. Com cinco pontos, o personagem é reconhecido regionalmente como um talento excepcional nas artes performáticas. Sua Habilidade e expressão artística são admiradas e podem abrir portas para oportunidades profissionais e contatos importantes. Ao atingir 10 pontos nessa Habilidade o personagem se torna capaz de usar as ações Performar e Distrair ao mesmo tempo que uma ação de movimento. "
    },
    {
        title: "Intimidação",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem intimidar outras criaturas, seja através da fala ou de ações. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem se torna capaz de usar as ações Intimidar ou Distrair ao mesmo tempo que ação de movimento, Derrubar, Agarrar, Atacar, Derrubar ou Preparar. Além disso, pode usar a ação Intimidar em número de criaturas igual o valor desta habilidade criaturas ao mesmo tempo, desde que estejam dentro do campo de visão e possam ver e ouvir o personagem."
    },
    {
        title: "Sedução",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem Essa Habilidade está relacionada à capacidade de um personagem seduzir outras criaturas, seja através da fala ou de ações. Regalias podem usar essa Habilidade como referência como parte de sua mecânica.Ao atingir 10 pontos nessa Habilidade o personagem se torna capaz de apresentar-se com uma beleza estonteante e uma presença cativante. Sua aparência física se torna irresistível aos olhos de quem o vê, atraindo olhares e o interesse das pessoas ao seu redor. Todos os testes da aba Social ganham vantagem contra alvos que tenham compatibilidade de atração pelo personagem. O alvo se torna disposto a fazer Pequenos favores que não sejam claramente perigosos ou fora de seu alcance.Nota: Um teste de sedução nunca pode ser feito por um personagem de jogador para outro personagem de jogador, nem a pedido do mestre, sem o consentimento de todos envolvidos na mesa."
    },
    {
        title: "Negociação",
        description:
            "Essa Habilidade está relacionada à capacidade de um personagem lidar com outras criaturas em uma situação de troca ou conflito. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem recebe um bônus de +2 em testes de Persuasão, Enganação, Investigação, História e Intuição que beneficiem a conclusão de uma negociação. O personagem também consegue tentar usar seu turno em combate para negociar termos para uma trégua entre as partes, em um secesso no teste de Habilidade Negociação, com dificuldade definida pelo mestre, define se a luta acaba ou se  é interrompida apenas por um turno, onde ninguém pode usar ações ou reações maliciosas um contra outro."
    }
];
const grupos = [
    {
        title: "Físico",
        borderColor: "#7B3311",
        data: fisico
    },
    {
        title: "Exploração",
        borderColor: "#7B3311",
        data: exploracao
    },
    {
        title: "Conhecimento",
        borderColor: "#7B3311",
        data: conhecimento
    },
    {
        title: "Arcana",
        borderColor: "#7B3311",
        data: arcana
    },
    {
        title: "Social",
        borderColor: "#7B3311",
        data: social
    },

]
const armasEArmadurasProf = {
    nome: "Maestria em Armaduras e Escudos",
    descricao: "Permite o uso progressivo de armaduras e escudos com diferentes níveis de proteção.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Permite o uso de armaduras leves, como couro, peles, tecidos reforçados... Também permite o uso de escudos simples." },
        { nivel: 2, descricao: "Permite de utilizar armaduras médias. Essas armaduras oferecem proteção moderada, porém, são mais pesadas." },
        { nivel: 3, descricao: "Permite armaduras pesadas. Essas fornecem a maior proteção possível, mas impactam a velocidade e furtividade." }
    ]
};
const conducaoDeVeiculosTerrestresProf = {
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
const conducaoDeVeiculosAquaticosProf = {
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
const conducaoExoticaProf = {
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
const kitDeArrombamentoProf = {
    nome: "Kit de Arrombamento",
    descricao: "Capacidade de usar ferramentas especiais para abrir trancas e desarmar armadilhas.",
    notas: [
        "Testes de arrombamento utilizam a Destreza da criatura.",
        "Níveis mais altos permitem ações mais rápidas ou contra trancas mágicas."
    ],
    niveis: [
        { nivel: 1, descricao: "Permite usar ferramentas de arrombamento sem desvantagem." },
        { nivel: 2, descricao: "Permite adicionar o modificador de Destreza ao teste para abrir trancas." },
        { nivel: 3, descricao: "Permite realizar a ação de arrombamento com uma única ação em combate." },
        { nivel: 4, descricao: "Permite desativar armadilhas complexas com o kit." },
        { nivel: 5, descricao: "Permite abrir fechaduras mágicas e adicionar Investigação ou Percepção ao valor de Destreza." }
    ]
};
const armasDeFogoProf = {
    nome: "Proficiência em Armas de Fogo",
    descricao: "Capacidade de manusear armas de fogo, mesmo sem ser um combatente.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Permite uso básico de armas de fogo como pistolas e rifles." },
        { nivel: 2, descricao: "Permite uso de armas de fogo exóticas ou experimentais com habilidades especiais." }
    ]
};
const linguasAntigasProf = {
    nome: "Proficiência em Línguas Antigas",
    descricao: "Compreensão e comunicação com línguas de eras passadas.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Compreende e traduz inscrições antigas relacionadas à sua linhagem." },
        { nivel: 2, descricao: "Decifra línguas antigas desconhecidas após 1 hora de estudo." },
        { nivel: 3, descricao: "Aprende e fala línguas antigas após 24h de estudo, podendo se comunicar com seres antigos." }
    ]
};
const arqueologiaProf = {
    nome: "Proficiência em Arqueologia",
    descricao: "Especialização na descoberta, análise e restauração de artefatos históricos.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Identifica e cataloga artefatos com +2 em testes de identificação, ruínas e restauração. Ferramentas arqueológicas dão +2 adicionais." },
        { nivel: 2, descricao: "Recebe +2 em testes de investigação de ruínas e descoberta de tesouros (acumulativo)." },
        { nivel: 3, descricao: "Adquire técnicas de restauração avançada com bônus de +2 em testes de preservação e restauração." }
    ]
};
const liderancaProf = {
    nome: "Proficiência em Liderança",
    descricao: "Capacidade de inspirar e comandar aliados e seguidores em diversas situações.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Inspira aliados com +2 em testes por 1 minuto, 3x por descanso longo." },
        { nivel: 2, descricao: "+2 em ataques do grupo, 3x por descanso. +2 em persuasão e negociação." },
        { nivel: 3, descricao: "+2 em testes de seguidores, ataque e dano de aliados sob comando." }
    ]
};
const armasExoticasProf = {
    nome: "Proficiência em Armas Exóticas",
    descricao: "Habilidade para usar armas incomuns que não sejam armas de fogo.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Adquire proficiência com 1 arma exótica não relacionada a armas de fogo." },
        { nivel: 2, descricao: "Adquire proficiência com mais 2 armas exóticas não relacionadas a armas de fogo." },
        { nivel: 3, descricao: "Pode usar qualquer arma exótica não relacionada a armas de fogo." }
    ]
};
const esgrimaProf = {
    nome: "Proficiência em Esgrima",
    descricao: "Treinamento com espadas leves, adagas e floretes.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Adquire proficiência com espadas leves, adagas, floretes e sabres não exóticos." }
    ]
};
const arcoBestaProf = {
    nome: "Proficiência em Arco e Besta",
    descricao: "Capacidade de usar armas de disparo mecânico.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Adquire proficiência com arcos e bestas." }
    ]
};
const disfarceProf = {
    nome: "Proficiência em Disfarce",
    descricao: "Permite o uso de disfarces para as mais diversas necessidades, com maior facilidade conforme o aumento de pontos de proficiência. Testes de enganação tornam-se mais fáceis à medida que o personagem acumula pontos de proficiência.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Permite criar disfarces simples para ocultar a identidade em situações básicas. O personagem pode alterar sua aparência usando maquiagem, adereços e roupas adequadas. +2 em testes de furtividade e enganação enquanto disfarçado." },
        { nivel: 2, descricao: "Permite criar disfarces mais elaborados e convincentes, enganando observadores atentos. O personagem pode imitar características físicas específicas, como altura, peso, voz e até mesmo traços faciais. +2 em testes de furtividade e enganação enquanto disfarçado." },
        { nivel: 3, descricao: "Permite infiltrar-se em locais protegidos com maior facilidade. O personagem é capaz de imitar o comportamento e os trejeitos de uma pessoa ou criatura específica, tornando-se praticamente indistinguível dela. +10 em testes de furtividade e enganação enquanto disfarçado." }
    ]
};
const ataquesEmAreaProf = {
    nome: "Proficiência Contra Ataques em Área",
    descricao: "Capacidade de reduzir o dano de ataques em área ao realizar um teste de reflexo, com a eficácia aumentando com os pontos de proficiência.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Ao sofrer um ataque em área, o personagem pode fazer um teste de reflexo (Agilidade) como reação e reduzir o dano em um valor igual a metade do seu valor de Fortitude." },
        { nivel: 2, descricao: "A redução de dano aumenta para igual ao valor de Fortitude." },
        { nivel: 3, descricao: "A redução de dano aumenta para igual a 2x o valor de Fortitude." }
    ]
};
const combateAntiConjuradoresProf = {
    nome: "Proficiência em Combate Anti-conjuradores",
    descricao: "Permite ao personagem reconhecer sinais de magia, identificar conjuradores e até interromper feitiços, tornando-o mais eficaz contra magia.",
    notas: [],
    niveis: [
        { nivel: 1, descricao: "Permite ao personagem reconhecer sinais de magia e identificar conjuradores. Ele pode detectar a presença de magia ao seu redor e discernir quando alguém está lançando um feitiço ou utilizando habilidades mágicas. Se uma criatura conjurar qualquer Magia ou Feitiço dentro de seu alcance de ameaça, o personagem pode realizar um ataque de oportunidade." },
        { nivel: 2, descricao: "Aumenta a resistência contra magia. Efeitos mágicos que possuem uma chance de sucesso em porcentagem têm 10% menos chance de ter sucesso." },
        { nivel: 3, descricao: "Permite interromper o efeito de Magias ou Feitiços. Ao realizar ataques contra um conjurador, o personagem pode tentar desfazer um Feitiço ou Magia com duração maior que instantâneo. Cada ataque que acertar tem 10% de chance de desfazer o efeito. Se o personagem impedir um efeito mágico, ele recebe um ponto de magia temporário até o próximo descanso longo ou curto." }
    ]
};
const proficiencias = [
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
const profissoes = [
    {
        "nome": "Ferreiro",
        "ambiente": "forja média",
        "rendimento": 20,
        "habilidades": [
            {
                "nome": "Forja de Armaduras e Escudos de Metal - Nível 1",
                "descricao": "Forja em aço e reforça armaduras em até +1.",
                "custoRegalia": 1
            },
            {
                "nome": "Forja de Armaduras e Escudos de Metal - Nível 2",
                "descricao": "Forja em aço, aço negro e reforça armaduras em até +2.",
                "custoRegalia": 1
            },
            {
                "nome": "Forja de Armaduras e Escudos de Metal - Nível 3",
                "descricao": "Forja em aço, aço negro, mitralino e reforça armaduras em até +3.",
                "custoRegalia": 1
            },
            {
                "nome": "Forja de Armas de Metal (Dano e Acerto) - Nível 1",
                "descricao": "Forja em aço e reforça armas em até +1.",
                "custoRegalia": 1
            },
            {
                "nome": "Forja de Armas de Metal (Dano e Acerto) - Nível 2",
                "descricao": "Forja em aço, aço negro e reforça armas em até +2.",
                "custoRegalia": 1
            },
            {
                "nome": "Forja de Armas de Metal (Dano e Acerto) - Nível 3",
                "descricao": "Forja em aço, aço negro, mitralino, adamante e reforça armas em até +3.",
                "custoRegalia": 1
            },
            {
                "nome": "Forja de Itens Gerais - Nível 1",
                "descricao": "Forja em aço itens gerais como ferraduras, esferas de aço, alavancas, engrenagens e outros.",
                "custoRegalia": 1
            },
            {
                "nome": "Forja de Itens Gerais - Nível 2",
                "descricao": "Forja em aço e outros metais comuns itens gerais como ferraduras, esferas de aço, alavancas, engrenagens e peças pequenas e complexas para mecanismos.",
                "custoRegalia": 1
            }
        ]
    },
    {
        "nome": "Criminoso",
        "ambienteEmprego": "Pode conseguir emprego em qualquer lugar onde tenha multidões, estradas vazias ou becos.",
        "rendaPorDia": 30,
        "chanceDeRisco": "10% de ser pego",
        "beneficiosFixos": [
            "Aprende a usar kit de arrombamento"
        ],
        "habilidades": [
            {
                "nome": "Bater Carteiras",
                "descricao": "Permite ao criminoso furtar itens em multidões ou com trombadas.",
                "custoRegalia": 1,
                "efeitos": [
                    "Pode tentar pegar itens visíveis de outra criatura em meio à multidão ou em uma trombada.",
                    "Um teste de agilidade determina o sucesso, com dificuldade definida pelo mestre."
                ]
            },
            {
                "nome": "Abrir Fechaduras",
                "descricao": "Aumenta a proficiência e eficácia ao arrombar portas e janelas.",
                "custoRegalia": 1,
                "efeitos": [
                    "Ganha dois pontos na proficiência em kit de arrombamento.",
                    "+2 em testes para abrir portas e janelas em uma invasão."
                ]
            },
            {
                "nome": "Esconder Itens Ilegais",
                "descricao": "Aprimora a capacidade de esconder objetos ilegais.",
                "custoRegalia": 1,
                "efeitos": [
                    "Vantagem no teste de furtividade para esconder um item ilegal."
                ]
            }
        ],
        "sistemasEspeciais": {}
    },
    {
        "nome": "Mercador",
        "ambienteEmprego": "Pode conseguir emprego em qualquer lugar onde tenha comércio de médio porte.",
        "rendaPorDia": 0,
        "chanceDeRisco": null,
        "beneficiosFixos": [],
        "habilidades": [
            {
                "nome": "Melhorar Preços",
                "descricao": "Permite negociar descontos em produtos ou serviços.",
                "custoRegalia": 1,
                "efeitos": [
                    "Pode fazer um teste de negociação para conseguir descontos.",
                    "Desconto varia conforme a rolagem: 5% (0-5), 10% (6-10), 15% (11-15), 25% (16-20), 30% (21-25), 35% (26+)."
                ]
            },
            {
                "nome": "Reunir Informações",
                "descricao": "Coleta informações em cidades ou regiões conversando com mercadores.",
                "custoRegalia": 1,
                "efeitos": [
                    "Gasta 1 hora conversando para obter informações.",
                    "Requer teste de persuasão com dificuldade determinada pelo mestre."
                ]
            }
        ],
        "sistemasEspeciais": {
            "Rolamento de Negociação": {
                "tabelas": {
                    "Desconto por Rolagem": {
                        "0-5": "5%",
                        "6-10": "10%",
                        "11-15": "15%",
                        "16-20": "25%",
                        "21-25": "30%",
                        "26+": "35%"
                    }
                },
                "regras": {}
            }
        }
    },
    {
        "nome": "Explorador",
        "ambienteEmprego": "Pode conseguir emprego em qualquer lugar onde tenha viajantes necessitados e aventureiros estrangeiros.",
        "rendaPorDia": 20,
        "chanceDeRisco": null,
        "beneficiosFixos": [],
        "habilidades": [
            {
                "nome": "Guiar",
                "descricao": "Ajuda o grupo a se mover furtivamente em terrenos perigosos.",
                "custoRegalia": 1,
                "efeitos": [
                    "+2 em testes de furtividade e navegação para o grupo.",
                    "Se o explorador tirar 20 no teste de furtividade, todos aliados automaticamente passam no teste."
                ]
            },
            {
                "nome": "Rastrear Pistas",
                "descricao": "Especialista em seguir rastros e pegadas.",
                "custoRegalia": 1,
                "efeitos": [
                    "Rolagens de 12 ou menor são consideradas como 12 em testes de rastrear."
                ]
            },
            {
                "nome": "Facilidade em Encontrar Recursos na Natureza",
                "descricao": "Mais eficiente em testes de sobrevivência.",
                "custoRegalia": 1,
                "efeitos": [
                    "Dobra os recursos obtidos em testes de sobrevivência.",
                    "Sempre encontra abrigo para descansar na natureza."
                ]
            }
        ],
        "sistemasEspeciais": {}
    },
    {
        "nome": "Acadêmico",
        "ambienteEmprego": "Pode conseguir emprego em qualquer lugar onde tenha uma academia ou nobre precisando de tutores.",
        "rendaPorDia": 40,
        "chanceDeRisco": null,
        "beneficiosFixos": [],
        "habilidades": [
            {
                "nome": "Elaborar Mapas",
                "descricao": "Cria mapas que permitem retornar sem se perder.",
                "custoRegalia": 1,
                "efeitos": [
                    "Permite retornar ao ponto inicial de uma viagem com precisão total ao usar um mapa elaborado."
                ]
            },
            {
                "nome": "Conhecimento de Civilizações Antigas",
                "descricao": "Ajuda na exploração de ruínas e tumbas.",
                "custoRegalia": 1,
                "efeitos": [
                    "+2 de navegação em tumbas e ruínas.",
                    "+3 em proficiência em Línguas Antigas.",
                    "+5 em testes de investigação para encontrar artefatos."
                ]
            },
            {
                "nome": "Acesso a Bibliotecas e Setores de Estudos Privados",
                "descricao": "Acesso exclusivo a áreas de pesquisa.",
                "custoRegalia": 1,
                "efeitos": [
                    "Entrada permitida em bibliotecas e setores de pesquisa proibidos ao público geral."
                ]
            },
            {
                "nome": "Arqueólogo",
                "descricao": "Especialista em escavações e estudo de artefatos antigos.",
                "custoRegalia": 1,
                "efeitos": [
                    "+3 em proficiência em Arqueologia."
                ]
            }
        ],
        "sistemasEspeciais": {}
    },
    {
        "nome": "Herbalista",
        "ambienteEmprego": "Pode conseguir emprego em qualquer lugar onde tenha laboratórios, curandeiros e lojas de poções.",
        "rendaPorDia": 20,
        "beneficiosFixos": [
            "Poções feitas pelo próprio herbalista custam 3x menos que em lojas, pagando apenas pelos materiais."
        ],
        "habilidades": [
            {
                "nome": "Produção de Poções",
                "descricao": "Consegue produzir poções a partir de ervas e soluções alquímicas.",
                "custoRegalia": 1,
                "efeitos": [
                    "Custo em materiais conforme tabela.",
                    "Necessário teste de alquimia para produção."
                ]
            },
            {
                "nome": "Produção de Venenos Naturais",
                "descricao": "Extrai e prepara venenos de bestas e plantas naturais para aplicar em armas ou misturar em líquidos.",
                "custoRegalia": 1,
                "efeitos": [
                    "Dano e efeitos conforme tabela.",
                    "Custo mínimo de materiais: 10 M.O.",
                    "Necessário teste de alquimia para produção."
                ]
            },
            {
                "nome": "Produção de Venenos de Monstros",
                "descricao": "Extrai e prepara venenos de anomalias e monstros para aplicação em armas ou líquidos.",
                "custoRegalia": 1,
                "efeitos": [
                    "Dano e efeitos conforme tabela.",
                    "Necessário teste de alquimia para produção."
                ]
            },
            {
                "nome": "Produção de Frascos de Veneno para Arremesso",
                "descricao": "Produz veneno de arremesso que causa dano em área.",
                "custoRegalia": 1,
                "efeitos": [
                    "Afeta todas as criaturas em um raio de 10 pés.",
                    "Causa o dano do veneno aplicado."
                ]
            },
            {
                "nome": "Produção de Antídotos",
                "descricao": "Consegue produzir antídotos para venenos de todos os tipos.",
                "custoRegalia": 1,
                "efeitos": [
                    "Chance de sucesso: 50% (acima de 17 no D20).",
                    "Custo: 50 M.O.",
                    "Necessário teste de alquimia para produção."
                ]
            }
        ],
        "pocoes": [
            {
                "nome": "Poção de saciedade",
                "mágica": "não",
                "alquimia": "sim",
                "efeito": "Poção que deixa uma criatura hidratada e alimentada por um dia inteiro.",
                "duração": "24 horas",
                "custo": "10 M.O."
            },
            {
                "nome": "Poção de velocidade",
                "mágica": "sim",
                "alquimia": "não",
                "efeito": "Poção que dobra a velocidade do movimento de uma criatura.",
                "duração": "10 minutos",
                "custo": "100 M.O."
            },
            {
                "nome": "Poção de velocidade maior",
                "mágica": "sim",
                "alquimia": "não",
                "efeito": "Poção que dobra a velocidade do movimento de uma criatura e aumenta em 1 o número total de ações em um turno, para um total de 4.",
                "duração": "1 minuto",
                "custo": "200 M.O."
            },
            {
                "nome": "Poção de invisibilidade",
                "mágica": "sim",
                "alquimia": "não",
                "efeito": "A criatura fica invisível até realizar um ataque ou interagir com outra criatura de alguma forma. Enquanto invisível a criatura está Obscurecida.",
                "duração": "1 hora",
                "custo": "100 M.O."
            },
            {
                "nome": "Poção de cura",
                "mágica": "não",
                "alquimia": "sim",
                "efeito": "Cura uma criatura em 10 pontos de vida.",
                "duração": "instantâneo",
                "custo": "50 M.O."
            },
            {
                "nome": "Poção de cura maior",
                "mágica": "não",
                "alquimia": "sim",
                "efeito": "Cura uma criatura em 50 pontos de vida.",
                "duração": "instantâneo",
                "custo": "100 M.O."
            },
            {
                "nome": "Poção de cura suprema",
                "mágica": "sim",
                "alquimia": "não",
                "efeito": "Cura uma criatura em 100 pontos de vida.",
                "duração": "instantâneo",
                "custo": "200 M.O."
            },
            {
                "nome": "Poção de cura completa",
                "mágica": "sim",
                "alquimia": "não",
                "efeito": "Cura uma criatura em 150 pontos de vida.",
                "duração": "instantâneo",
                "custo": "400 M.O."
            },
            {
                "nome": "Poção de Armadura",
                "mágica": "sim",
                "alquimia": "não",
                "efeito": "Aumenta a defesa de uma pessoa sem armadura em +6",
                "duração": "12 horas",
                "custo": "100 M.O."
            },
            {
                "nome": "Poção de Crescimento",
                "mágica": "sim",
                "alquimia": "não",
                "efeito": "Aumenta em 1 o tamanho de uma criatura.",
                "duração": "1 minuto",
                "custo": "100 M.O."
            },
            {
                "nome": "Poção de redução",
                "mágica": "sim",
                "alquimia": "não",
                "efeito": "Diminui em 2 o tamanho de uma criatura. Máximo de minúsculo.",
                "duração": "1 minuto",
                "custo": "100 M.O."
            },
            {
                "nome": "Poção de transformação animal",
                "mágica": "sim",
                "alquimia": "não",
                "efeito": "Transforma-se em um animal de tamanho pequeno ou médio. Completamente transforma a forma física mas não a mental.",
                "duração": "1 hora",
                "custo": "100 M.O."
            },
            {
                "nome": "Poção de coragem",
                "mágica": "não",
                "alquimia": "sim",
                "efeito": "Imune a aterrorizado pela duração",
                "duração": "8 horas",
                "custo": "50 M.O."
            },
            {
                "nome": "Poção de disfarce",
                "mágica": "sim",
                "alquimia": "não",
                "efeito": "Transforma a aparência de uma criatura para outra de mesmo tamanho. Não é uma ilusão, porém não altera a capacidade física de quem toma a poção.",
                "duração": "1 hora",
                "custo": "50 M.O."
            },
            {
                "nome": "Poção de silêncio",
                "mágica": "sim",
                "alquimia": "não",
                "efeito": "Reduz todo som produzido por voz, roupa e itens de um indivíduo para um alcance de 3 metros, qualquer criatura fora desse alcance não consegue ouvir a criatura que tomou a poção andar ou falar.",
                "duração": "10 minutos",
                "custo": "30 M.O."
            }
        ],

        "venenos": [
            {
                "nome": "Cobra",
                "efeito": "Causa 6 pontos por rodada e deixa a vítima Devagar.",
                "duração": "Durabilidade do veneno",
                "custo": "20 M.O.",
                "teste_fortitude": "10"
            },
            {
                "nome": "Aranha",
                "efeito": "Causa 7 de dano imediato e 2 por rodada.",
                "duração": "Durabilidade do veneno",
                "custo": "30 M.O.",
                "teste_fortitude": "10"
            },
            {
                "nome": "Escorpião",
                "efeito": "Causa 6 de dano imediato e 2 por rodada.",
                "duração": "Durabilidade do veneno",
                "custo": "20 M.O.",
                "teste_fortitude": "10"
            },
            {
                "nome": "Abelhas",
                "efeito": "Deixa a vítima com a condição Enfraquecido.",
                "duração": "Durabilidade do veneno",
                "custo": "10 M.O.",
                "teste_fortitude": "14"
            },
            {
                "nome": "Vespas",
                "efeito": "Causa 10 de dano imediato e 2 por rodada.",
                "duração": "Durabilidade do veneno",
                "custo": "20 M.O.",
                "teste_fortitude": "12"
            },
            {
                "nome": "Água viva",
                "efeito": "Causa à vítima dor intensa e queima a pele, 6 de dano por rodada.",
                "duração": "Durabilidade do veneno",
                "custo": "10 M.O.",
                "teste_fortitude": "10"
            },
            {
                "nome": "Sapos",
                "efeito": "Causa à vítima a condição Paralisado.",
                "duração": "Durabilidade do veneno",
                "custo": "50 M.O.",
                "teste_fortitude": "10"
            },
            {
                "nome": "Larva de mariposa",
                "efeito": "Causa feridas na pele da vítima, 1d12 de dano por rodada.",
                "duração": "Durabilidade do veneno",
                "custo": "20 M.O.",
                "teste_fortitude": "10"
            },
            {
                "nome": "Peixe",
                "efeito": "Causa à vítima danos internos, 1d12 de dano por rodada.",
                "duração": "Durabilidade do veneno",
                "custo": "20 M.O.",
                "teste_fortitude": "10"
            },
            {
                "nome": "Besouro",
                "efeito": "Causa dor local e queimação e deixa Incapacitado.",
                "duração": "Durabilidade do veneno",
                "custo": "10 M.O.",
                "teste_fortitude": "10"
            }
        ],
        "plantas": [
            {
                "nome": "Aningapara",
                "efeito": "Causa à vítima a condição Paralisado.",
                "duração": "Durabilidade do veneno",
                "custo": "50 M.O.",
                "teste_fortitude": "10"
            },
            {
                "nome": "Saia Branca",
                "efeito": "Causa à vítima a condição Aterrorizado.",
                "duração": "Durabilidade do veneno",
                "custo": "30 M.O.",
                "teste_fortitude": "13"
            },
            {
                "nome": "Lírio do vale",
                "efeito": "Causa feridas na pele da vítima, 1d12 de dano por rodada.",
                "duração": "Durabilidade do veneno",
                "custo": "20 M.O.",
                "teste_fortitude": "10"
            },
            {
                "nome": "Olho de Boneca",
                "efeito": "Causa à vítima danos internos, 1d12 de dano por rodada.",
                "duração": "Durabilidade do veneno",
                "custo": "20 M.O.",
                "teste_fortitude": "10"
            }
        ],
        "monstros": [
            {
                "nome": "Basilisco",
                "efeito": "Causa à vítima a condição Paralisado.",
                "duração": "Durabilidade do veneno",
                "custo": "50 M.O."
            },
            {
                "nome": "Wyrm",
                "efeito": "Causa 10 de dano imediato e 4 por rodada.",
                "duração": "Durabilidade do veneno",
                "custo": "30 M.O."
            },
            {
                "nome": "Manticora",
                "efeito": "Causa à vítima as condições Aterrorizado e Devagar.",
                "duração": "Durabilidade do veneno",
                "custo": "40 M.O."
            },
            {
                "nome": "Sandworm",
                "efeito": "Causa à vítima a condição Enfraquecido e adiciona um nível de Cansado.",
                "duração": "Durabilidade do veneno",
                "custo": "30 M.O."
            }
        ],
        "producoes": [
            {
                "nome": "Frasco de veneno",
                "efeito": "Causa o dano do veneno em todas as criaturas em 10 pés do raio de explosão.",
                "custo": "Produção com 1 ponto de regalia"
            },
            {
                "nome": "Antídoto",
                "efeito": "Antídoto contra venenos de todos os tipos.",
                "custo": "50 M.O."
            }
        ]
    },
    {
        "nome": "Alfaiate",
        "ambiente": "cidades pequenas (costureiro de roupas básicas ou finas)",
        "rendimento": 40,
        "habilidades": [
            {
                "nome": "Produção de Itens e Armaduras de Tecido Encantáveis",
                "descricao": "Produz itens e armaduras de tecido que podem ser encantados.",
                "custoRegalia": 1
            },
            {
                "nome": "Refinar Armaduras Leves +1",
                "descricao": "Fabrica e reforça armaduras leves em até +1.",
                "custoRegalia": 1
            },
            {
                "nome": "Refinar Armaduras Leves +2",
                "descricao": "Fabrica e reforça armaduras leves em até +2.",
                "custoRegalia": 1
            },
            {
                "nome": "Refinar Armaduras Leves +3",
                "descricao": "Fabrica e reforça armaduras leves em até +3.",
                "custoRegalia": 1
            },
            {
                "nome": "Produção de Itens e Armaduras de Couro Encantáveis",
                "descricao": "Produz itens e armaduras de couro que podem ser encantados.",
                "custoRegalia": 1
            },
            {
                "nome": "Refinar Armaduras Médias +1",
                "descricao": "Fabrica e reforça armaduras médias em até +1.",
                "custoRegalia": 1
            },
            {
                "nome": "Refinar Armaduras Médias +2",
                "descricao": "Fabrica e reforça armaduras médias em até +2.",
                "custoRegalia": 1
            },
            {
                "nome": "Refinar Armaduras Médias +3",
                "descricao": "Fabrica e reforça armaduras médias em até +3.",
                "custoRegalia": 1
            }
        ],
        "chanceDeSucesso": [
            {
                "produto": "Armaduras ou itens de couro/tecido +1",
                "chance": "80%",
                "dificuldadeRolagem": "≥5 no D20"
            },
            {
                "produto": "Armaduras ou itens de couro/tecido +2",
                "chance": "60%",
                "dificuldadeRolagem": "≥13 no D20"
            },
            {
                "produto": "Armaduras ou itens de couro/tecido +3",
                "chance": "40%",
                "dificuldadeRolagem": "≥17 no D20"
            }
        ],
        "notas": "Requer teste de Destreza. Forja leva 3 dias de trabalho."
    },
    {
        "nome": "Artista",
        "ambiente": "qualquer lugar com público",
        "rendimento": 20,
        "habilidades": [
            {
                "nome": "Reunir Informações",
                "descricao": "Gasta 1h conversando para coletar informações (teste de Persuasão ou Sedução).",
                "custoRegalia": 1
            },
            {
                "nome": "Espalhar Rumores",
                "descricao": "Gasta 1h conversando para espalhar informações (teste de Enganação ou Sedução).",
                "custoRegalia": 1
            },
            {
                "nome": "Causar Distrações",
                "descricao": "Pode usar a ação ‘Distrair’ simultaneamente à performance.",
                "custoRegalia": 1
            }
        ]
    },
    {
        "nome": "Joalheiro",
        "ambiente": "joalherias ou minas de pedras preciosas",
        "rendimento": 50,
        "habilidades": [
            {
                "nome": "Confeccionar Jóias Simples",
                "descricao": "Produz jóias (custa metade do preço de mercado).",
                "custoRegalia": 1
            },
            {
                "nome": "Confeccionar Jóias Encantadas",
                "descricao": "Produz jóias encantáveis a partir de metais preciosos e gemas.",
                "custoRegalia": 1
            },
            {
                "nome": "Apurar Pedras Preciosas",
                "descricao": "Determina valor e identifica gemas (+5 em Natureza para rochas).",
                "custoRegalia": 1
            }
        ]
    },
    {
        "nome": "Inventor",
        "ambiente": "grandes cidades (projetista de pontes/estruturas)",
        "rendimento": 60,
        "habilidades": [
            {
                "nome": "Elaborar Esquemáticas de Armas",
                "descricao": "Cria ou melhora armas existentes.",
                "custoRegalia": 1
            },
            {
                "nome": "Elaborar Esquemáticas de Armaduras",
                "descricao": "Cria ou melhora armaduras existentes.",
                "custoRegalia": 1
            },
            {
                "nome": "Elaborar Esquemáticas de Próteses",
                "descricao": "Projeta próteses para membros faltantes ou inexistentes.",
                "custoRegalia": 1
            },
            {
                "nome": "Elaborar Esquemáticas de Veículos",
                "descricao": "Cria ou melhora veículos existentes.",
                "custoRegalia": 1
            },
            {
                "nome": "Elaborar Esquemáticas de Engenhocas",
                "descricao": "Cria pequenos mecanismos de utilidade básica.",
                "custoRegalia": 1
            },
            {
                "nome": "Criar Constructos Semicientes",
                "descricao": "Elabora constructos sencientes.",
                "custoRegalia": 1
            }
        ],
        "tabelaSucesso": [
            {
                "chance": "80%",
                "rolagem": "≥5 no D20",
                "precoSugerido": 5,
                "complexidade": "simples"
            },
            {
                "chance": "50%",
                "rolagem": "≥11 no D20",
                "precoSugerido": 15,
                "complexidade": "média"
            },
            {
                "chance": "30%",
                "rolagem": "≥15 no D20",
                "precoSugerido": 45,
                "complexidade": "média‑alta"
            },
            {
                "chance": "10%",
                "rolagem": "≥19 no D20",
                "precoSugerido": 135,
                "complexidade": "alta"
            }
        ],
        "notas": "Teste de Tecnologia para criar esquemáticas; duração e custo definidos pelo mestre."
    },
    {
        "nome": "Carpinteiro",
        "ambiente": "qualquer lugar com moradias ou móveis de madeira",
        "rendimento": 20,
        "habilidades": [
            {
                "nome": "Produzir Itens de Madeira",
                "descricao": "Produz itens de madeira simples ou exóticas (custa metade do preço).",
                "custoRegalia": 1
            },
            {
                "nome": "Produzir Itens Encantáveis",
                "descricao": "Produz itens de madeira que podem ser encantados.",
                "custoRegalia": 1
            },
            {
                "nome": "Forjar Armas de Madeira +1",
                "descricao": "Forja armas de madeira com reforço +1.",
                "custoRegalia": 1
            },
            {
                "nome": "Forjar Armas de Madeira +2",
                "descricao": "Forja armas de madeira élfica com reforço +2.",
                "custoRegalia": 1
            },
            {
                "nome": "Forjar Armas de Madeira +3",
                "descricao": "Forja armas em madeiras exóticas com reforço +3.",
                "custoRegalia": 1
            },
            {
                "nome": "Construir Veículos de Madeira",
                "descricao": "Constrói veículos terrestres e aquáticos majoritariamente de madeira.",
                "custoRegalia": 1
            },
            {
                "nome": "Construir Veículos Exóticos de Madeira",
                "descricao": "Constrói veículos exóticos de madeira com peças adicionais compradas.",
                "custoRegalia": 1
            }
        ],
        "materiaisEspeciais": [
            "Madeira Simples",
            "Madeira Élfica",
            "Madeira de Ébano Ancião",
            "Madeira de Sangue"
        ],
        "chanceDeSucesso": [
            {
                "tentativa": "arma de madeira",
                "chance": "80%",
                "rolagem": "≥5 no D20"
            },
            {
                "tentativa": "item ou veículo",
                "chance": "50%",
                "rolagem": "≥11 no D20"
            }
        ],
        "notas": "Produção custa metade do preço; refino custa um terço."
    },
    {
        "nome": "Arcanista",
        "ambiente": "itens militares ou academias de magia",
        "rendimento": 40,
        "habilidades": [
            {
                "nome": "Encantar Armas +1d4",
                "descricao": "Bônus +1d4 de dano elemental (materiais de 100 M.O.).",
                "custoRegalia": 1
            },
            {
                "nome": "Encantar Armas +2d4",
                "descricao": "Bônus +2d4 de dano (pré‑req: +1; materiais 100 M.O. se reencantar ou 400 M.O. se primeiro).",
                "custoRegalia": 1
            },
            {
                "nome": "Encantar Armas +3d4",
                "descricao": "Bônus +3d4 de dano (pré‑req: +2; materiais 100 M.O. se reencantar ou 600 M.O. se primeiro).",
                "custoRegalia": 1
            },
            {
                "nome": "Mudar Tipo de Dano",
                "descricao": "Altera elemento da arma corpo a corpo (100 M.O.; projéteis não podem).",
                "custoRegalia": 1
            },
            {
                "nome": "Encantar Proteção +1",
                "descricao": "+1 em defesa em armaduras leves/roupas/jóias (150 M.O.).",
                "custoRegalia": 1
            },
            {
                "nome": "Encantar Proteção +2",
                "descricao": "+2 em defesa (pré‑req: +1; 300 M.O.).",
                "custoRegalia": 1
            },
            {
                "nome": "Reforço de Dano Elemental +2",
                "descricao": "+2 no dano elemental de magias (100 M.O.).",
                "custoRegalia": 1
            },
            {
                "nome": "Reforço de Dano Elemental +4",
                "descricao": "+4 no dano elemental de magias (pré‑req: +2; 300 M.O.).",
                "custoRegalia": 1
            },
            {
                "nome": "Produzir Pergaminhos",
                "descricao": "Replica magias conhecidas em pergaminhos (50 M.O. em papel e tinta).",
                "custoRegalia": 1
            }
        ],
        "tiposDeDano": [
            "Fogo", "Gelo", "Raio", "Terra", "Sombrio", "Sagrado", "Arcano", "Necrótico"
        ],
        "chanceDeSucesso": [
            {
                "acao": "encantar arma/objeto",
                "chance": "30%",
                "rolagem": "≥15 no D20"
            },
            {
                "acao": "criar pergaminho",
                "chance": "20%",
                "rolagem": "≥17 no D20"
            }
        ],
        "notas": "Teste de Arcanismo para rolagem."
    },
    {
        "nome": "Cozinheiro",
        "ambiente": "qualquer lugar",
        "rendimento": null,
        "habilidades": [
            {
                "nome": "Produzir Rações Especiais",
                "descricao": "Gasta metade do valor para fazer duas rações; cada uma confere +10 PV temporários.",
                "custoRegalia": 1
            },
            {
                "nome": "Aprimorar Uso de Recursos Alimentícios",
                "descricao": "Dobra usos de comida/água encontradas e +5 em Sobrevivência.",
                "custoRegalia": 1
            },
            {
                "nome": "Cozinhar Alimentos Restauradores",
                "descricao": "Ração que em 10 min cura 10 PV e 3 de estamina (10 M.O. por ração).",
                "custoRegalia": 1
            }
        ]
    },
    {
        "nome": "Soldado de Aluguel",
        "ambiente": "área portuária, segurança ou periferias",
        "rendimento": null,
        "habilidades": [
            {
                "nome": "Trabalhar como Marinheiro",
                "descricao": "+5 em Navegação e passagem em troca de serviço.",
                "custoRegalia": 1
            },
            {
                "nome": "Trabalhar como Segurança",
                "descricao": "+3 em Percepção em turno de guarda ou vigia.",
                "custoRegalia": 1
            },
            {
                "nome": "Trabalhar como Capanga de Agiota",
                "descricao": "+5 em Intimidação para obter informações.",
                "custoRegalia": 1
            },
            {
                "nome": "Treinamento Militar",
                "descricao": "+5 em Jurisprudência e Negociação com nobres.",
                "custoRegalia": 1
            }
        ]
    }
]
const racas = {
    humano: {
        nome: 'Humano',
        descricao: `Na vasta tapeçaria dos mundos, os seres humanos são frequentemente retratados como uma espécie de notável versatilidade. Eles são os sobreviventes por excelência, moldando-se e adaptando-se a uma miríade de circunstâncias desafiadoras, como a argila nas mãos de um habilidoso oleiro.
        A resiliência dos seres humanos é uma característica que os destaca. Diante de adversidades intransponíveis, eles não apenas resistem, mas florescem. Desafiando os elementos, as ameaças e as adversidades do destino, os humanos provaram ser mais do que meros mortais. Eles são a personificação da determinação, da vontade indomável de superar obstáculos e de encontrar maneiras de prosperar, não importa quão sombrio seja o cenário.\n
        Mas não é apenas a capacidade de sobrevivência que define os humanos. Sua capacidade destrutiva também é notável. Com criatividade e intelecto afiado, eles desvendam segredos, criam máquinas de guerra imponentes e dominam a magia como nenhuma outra espécie. Eles trazem a destruição, tanto com suas habilidades como com suas inovações, como uma força da natureza que molda o mundo ao seu redor.\n
        Assim, os seres humanos em um mundo representam mais do que simples mortais. Eles personificam a versatilidade, resiliência e capacidade destrutiva que reside no coração de todos nós. Eles nos lembram que, no jogo da vida e da imaginação, somos todos heróis em nossas próprias histórias, prontos para enfrentar o desconhecido, resistir à adversidade e moldar nosso destino à medida que avançamos corajosamente em direção ao desconhecido.
` ,
        obrigatorias: [
            {
                id: "prodigio",
                nome: "Prodígio Militar",
                descricao: `Um humano que seja um prodígio militar pode realizar um teste de Percepção na mesma ação de atacar, a fim de identificar as fraquezas e forças do seu adversário. Ao passar no teste de habilidade com dificuldade estipulada pelo mestre, o humano ganha vantagem no rolamento de acerto deste e dos próximos ataques, e sua margem de cŕitico diminui em um até o final de seu turno atual. Ele pode executar essa leitura 3 vezes em um mesmo dia. O valor do teste pode ser alternativamente estipulado pela percepção do alvo, com um padrão de 10 + valor de percepção, se ele não tiver valor declarado, tome como base a dificuldade 15.
                Além disso, possui proficiência com espadas bastardas.
                `
            },
            {
                id: "genio",
                nome: "Gênio Acadêmico",
                descricao: `Um humano que seja um gênio acadêmico possui um vasto conhecimento e memória excepcional. Um gênio acadêmico não esquece nada do que leu ou ouviu nos últimos 30 dias. Ele sempre sabe a hora do dia e a estação do ano. Gênios acadêmicos podem usar a ação Recordar Conhecimento enquanto realizam a ação Ler Ambiente ou Buscar Cobertura. Ele pode executar essa ação desta forma 5 vezes em um mesmo dia. 
`
            },
            {
                id: "faztudo",
                nome: "Faz Tudo",
                descricao: `Um humano que seja um faz-tudo é um indivíduo que não se dedicou a dominar uma habilidade específica, mas aprendeu várias delas. Um faz-tudo pode realizar a ação Abrir fechadura e a ação Preparar com apenas uma ação, e a ação Desabilitar Dispositivo com duas ações.  Ele pode escolher uma destas opções para executar desta maneira 3 vezes ao dia. 
                Ou pode escolher uma Proficiência para alocar 1 ponto.
                `
            }
        ]
    },
    elfo: {
        nome: 'Elfo',
        descricao: `
        Dentro dos vastos mundos, a raça dos Elfos, com suas três distintas facções - os Elfos Exordiais, os Elfos Selvagens e os Elfos Lunares, apesar das diferenças evidentes, compartilham algumas notáveis semelhanças que refletem a essência de sua linhagem comum.
        Independentemente de suas origens, os Elfos são uma espécie que tende a viver vidas notavelmente longas, muitas vezes atingindo séculos de idade. Essa longevidade confere uma profunda perspectiva de vida, permitindo que eles acumulem conhecimento e sabedoria ao longo dos anos. Todos os Elfos possuem traços físicos distintos, como a delicadeza de seus traços faciais e a graça de sua aparência, que são igualmente apreciados nas três subespécies.
        Os Elfos, em geral, compartilham uma conexão singular com a magia e o mundo natural. Eles são conhecidos por sua afinidade natural com a magia, o que é especialmente perceptível nos Elfos Lunares, que banham-se na luz noturna e tiram proveito da magia lunar. Os Elfos Exordiais também mantêm uma relação profunda com a magia, refletindo em sua habilidade telepática e visão única. Já os Elfos Selvagens, embora priorizem a natureza, também têm um respeito inabalável pelo equilíbrio mágico da vida selvagem.
        As três subespécies de Elfos compartilham uma perspectiva unificada sobre a coexistência com outras raças, valorizando a diversidade e a paz inter-racial. Cada grupo reconhece que, apesar das diferenças, todos os seres têm um papel a desempenhar na narrativa do mundo.
        Os Elfos Exordiais, enraizados nas origens da civilização élfica, possuem uma perspectiva de vida milenar. Eles carregam consigo um profundo respeito pelas tradições e pela sabedoria ancestral. Sua aparência física frequentemente reflete a antiguidade de sua linhagem, com traços delicados e refinados. Sua sociedade é centrada no compartilhamento de conhecimento, em que as histórias do passado são valorizadas e transmitidas às gerações mais jovens. Eles têm uma visão das relações inter-raciais que é enraizada no respeito pela história e pela continuidade da cultura élfica.
        Os Elfos Selvagens, por outro lado, abraçam a natureza como parte fundamental de suas vidas. Sua aparência física muitas vezes apresenta características que se harmonizam com os ambientes naturais que habitam. Eles tendem a viver em ambientes intocados, onde a conexão com a natureza é mais forte do que qualquer outra coisa. Sua sociedade valoriza a proteção da vida selvagem e a coexistência pacífica com ela. Quando se relacionam com outras raças, a preservação da natureza é frequentemente um ponto de discordância e compreensão.
        Os Elfos Lunares são noturnos por natureza, e suas vidas estão entrelaçadas com as fases da lua. Sua aparência frequentemente incorpora tons prateados e uma aura mágica que reflete sua afinidade com as estrelas e a luz da lua. Eles veem o cosmos como uma fonte de inspiração e poder, e sua sociedade é construída em torno da magia noturna e do conhecimento místico. Quando interagem com outras raças, muitas vezes são vistos como guardiões dos segredos do céu noturno, mas também como misteriosos e imprevisíveis.
        Em resumo, a diversidade cultural e a relação com outras raças definem os Elfos. Suas perspectivas de vida milenar, aparência física e conexão com a natureza ou o cosmos moldam profundamente suas sociedades e interações em um mundo repleto de diversidade e maravilhas. Cada facção de Elfos traz consigo sua própria essência e valores, enriquecendo o panorama da civilização élfica e do mundo em que habitam.
        `,
        obrigatorias: [
            {
                id: "ElfoExordial",
                nome: "Elfo Exordial",
                descricao: `Elfos Exordiais  são a espécie original dos primeiros elfos. Elfos exordiais Conseguem enxergar no escuro em até 9 metros de distância como se fosse em meia luz e como luz completa em meia luz. Elfos exordiais conseguem se comunicar com outros seres por telepatia, com uma distância máxima de 15 metros. Se o alvo da telepatia for outro elfo exordial esse alcance aumenta para 36 metros.`
            },
            {
                id: "ElfoSelvagem",
                nome: "Elfo Selvagem",
                descricao: `Elfos Selvagens gostam de viver em ambientes naturais com pouca intervenção para construir suas sociedades. Elfos selvagens não precisam de equipamento de acampamentos para conseguir os benefícios de um descanso longo. Elfos selvagens também tem uma velocidade de movimento elevada, enquanto não usam armadura pesada, de 12 metros de velocidade de movimento base. Possuem visão no escuro com alcance de até 18 metros de distância como se fosse em meia luz e como luz completa em meia luz.`
            },
            {
                id: "ElfoLunar",
                nome: "Elfo Lunar",
                descricao: `Elfos lunares gostam de se banhar na luz noturna e são mais ativos durante a noite. Elfos lunares conseguem enxergar no escuro com alcance de 18 metros como se fosse luz completa e adicionais 18 metros como se fossem meia luz, e 36 metros como luz completa em meia luz. Elfos lunares conseguem se direcionar através da posição dos astros do céu noturno e não ficam perdidos viajando em ambientes abertos durante a noite. Elfos lunares são resistentes ao dano sombrio.`
            }
        ]
    },
    anao: {
        nome: 'Anão',
        descricao: `Dentro da cultura geral dos Anões, as três vertentes - Domínio das Minas, Domínio da Forja e os Anões Exilados - são elementos cruciais que se entrelaçam e enriquecem a sociedade anã como um todo.
        Os Anões, como um povo, são conhecidos por sua durabilidade e sua determinação inabalável. A cultura anã valoriza a honestidade, a lealdade e o senso de comunidade. Os princípios éticos e a profunda reverência pelas tradições são aspectos centrais da vida anã. As histórias e lendas passadas de geração em geração têm um papel crucial na manutenção da identidade e na transmissão dos valores.
        A busca pela maestria e pela excelência é um componente intrínseco da cultura anã. Seja na habilidade de identificar minérios e antecipar desastres naturais dos Anões do Domínio das Minas, na habilidade de forjar e apreciar a qualidade das armas e armaduras dos Anões do Domínio da Forja, ou na versatilidade dos Anões Exilados, que valorizam a aprendizagem constante e a habilidade de se adaptar a diversas situações, todos compartilham o compromisso com a expertise e a excelência em seu campo.
        Além disso, a sociedade anã é profundamente centrada na comunidade. Os laços familiares e a solidariedade entre clãs são inegociáveis. As cidades anãs são geralmente escavadas nas profundezas da terra e, embora cada vertente possua seu próprio espaço e funcionalidade específica, todas colaboram para o bem-estar da comunidade. A sociedade anã é altamente organizada, com sistemas de governo e hierarquias que garantem a ordem e a prosperidade.
        A fé desempenha um papel significativo na vida dos Anões, independentemente da vertente. Eles geralmente veneram deuses relacionados à terra, mineração e forja. Seus rituais religiosos são eventos comunitários que fortalecem a coesão e a espiritualidade.
        Em resumo, a cultura geral dos Anões é uma celebração da durabilidade, da expertise e da comunidade. As diferentes vertentes - Domínio das Minas, Domínio da Forja e os Anões Exilados - contribuem para essa cultura diversificada, enriquecendo o mosaico da sociedade anã. Independentemente da linhagem, os Anões compartilham um profundo respeito por suas tradições, valores éticos e um senso inabalável de identidade e comunidade.
        `,
        obrigatorias: [
            {
                id: "DomíniodasMinas",
                nome: "Domínio das Minas",
                descricao: `Um anão que vem do domínio das minas tem uma linhagem de trabalhadores ou donos de minas. Um anão dessa linhagem reconhece  com mais precisão veias de minério em cavernas e túneis de pedra caso existam, ganhando um bônus de +10 em testes de conhecimento e exploração que envolve perceber ou identificar a presença de minério em cavernas e outros. \n
                Um anão desta linhagem também conseguem sentir tremores e vibrações na rocha relacionados a desastres naturais (terremotos, enchentes, deslizamentos), recebendo vantagem em testes de Habilidades(Investigação ou Percepção) para saber se irá acontecer algum tipo de deslocamento terrestre natural em rochas. \n
                Dentro do domínio das minas, um anão é treinado em perceber e navegar sem luz ou pouca luz e pode enxergar no escuro em até 9 metros como se fosse meia luz e como luz completa em meia luz.
`
            },
            {
                id: "Domínio aForja",
                nome: "Domínio da Forja",
                descricao: `Um anão do domínio da forja se origina de uma linhagem de trabalhadores de metal e consegue reconhecer a qualidade de uma arma apenas de olhar para ela. Testes de Habilidade de história, Natureza ou apuração de itens mágicos recebe um valor igual a +1 quando se trata de itens forjados em metal.\n  
                Anões da forja também tem proficiência em machado anão. \n
                Anões da forja tem resistência a dano de fogo.
                `
            },
            {
                id: "Exilado",
                nome: "Exilado",
                descricao: `O Exilado é um indivíduo que nunca se dedicou a masterizar nenhuma habilidade por estar fora das linhagens principais da sociedade anã, porém aprendeu várias Habilidades mundo afora. Um exilado consegue usar a ação Abrir fechadura e Preparar com apenas uma ação e a ação Desabilitar Dispositivo com duas ações.  Ele pode escolher uma destas opções para executar desta maneira 3 vezes ao dia. 
                Ou pode escolher uma Proficiência para alocar 1 ponto.
                `
            }
        ]
    },
    feerico: {
        nome: 'Feérico',
        descricao: `Em meio a um mundo repleto de criaturas feéricas de todas as formas e tamanhos, a sociedade feérica é uma tapeçaria de diversidade e mágica. Cada subespécie, como os Gnomos, Pixies, Dríades, Sátiros, Ninfas da Névoa, Mariposas Eternas e Menecmas, contribui de maneira única para a intrincada teia da convivência e interações entre esses seres mágicos e o mundo que os cerca.
        Os Gnomos, pequenos e ágeis, são habilidosos em se mover através de ambientes hostis e em permanecerem despercebidos. Eles frequentemente servem como mensageiros e exploradores, fornecendo informações valiosas para sua sociedade feérica. Sua destreza é uma ferramenta importante em ambientes densos e perigosos.
        As Pixies e Sprites, com suas asas brilhantes, trazem a alegria da liberdade e da exploração. Eles são embaixadores naturais entre a sociedade feérica e as criaturas do ar, proporcionando uma conexão única com as alturas. Sua capacidade de se mesclar com o ambiente torna-os mestres da evasão e do sigilo.
        As Dríades, ancestrais das árvores, são guardiãs dos bosques e matas. Sua habilidade de atravessar madeira e ganhar força com a energia das árvores é essencial para a preservação das florestas. Elas servem como sentinelas e curandeiras da natureza.
        Os Sátiros, com sua mistura de natureza e animalidade, trazem a vitalidade e a alegria da dança e da música para a sociedade feérica. Sua agilidade e capacidade de saltar os tornam excelentes exploradores das áreas selvagens.
        As Ninfas da Névoa, ligadas à névoa e ao orvalho, são especialistas em evasão e movimento furtivo. Sua habilidade de evitar ataques físicos e deslizar através de frestas torna-as mensageiras eficazes e exploradoras de terrenos perigosos.
        As Mariposas Eternas, com asas iridescentes, possuem habilidades únicas de ilusão que adicionam uma camada de encanto e diversão à sociedade feérica. Elas frequentemente atuam como artistas e ilusionistas, cativando multidões com seu espetáculo de luzes e cores.
        Os Menecmas, mestres da ilusão e da transformação, são diplomatas e espiões consumados. Sua habilidade de assumir a forma de outras criaturas permite que estabeleçam conexões e obtenham informações cruciais para a sociedade feérica.
        Em conjunto, essas subespécies feéricas criam uma sociedade complexa e rica em diversidade, onde cada ser desempenha um papel único e vital. Suas interações com o mundo humano e outras criaturas moldam o equilíbrio mágico do universo de fantasia, criando um cenário onde a magia, a diversão e a intriga se entrelaçam de maneiras fascinantes.
        Hierarquia na Sociedade Feérica:
        Famílias e Clãs Feéricos: A base da sociedade feérica é frequentemente composta por famílias e clãs, cada um com sua própria linhagem e tradições. Os líderes dessas famílias muitas vezes detêm grande influência sobre seus membros, e a hierarquia interna pode variar. Os clãs são responsáveis por manter tradições, cuidar da natureza e gerenciar recursos mágicos.
        Reis e Rainhas Feéricos: Em algumas sociedades feéricas, há reis e rainhas que governam sobre várias famílias e clãs. Eles são frequentemente escolhidos com base em suas habilidades mágicas, sabedoria e conexão com a natureza. Sua autoridade é reconhecida, mas pode variar em extensão, dependendo da sociedade.
        Conselhos e Assembleias: Alguns grupos feéricos têm conselhos ou assembleias formados por líderes de famílias e clãs. Esses órgãos podem ser consultados para tomar decisões importantes e resolver disputas. Os líderes eleitos ou designados servem como representantes de suas comunidades.
        Protetores da Natureza: Muitas subespécies feéricas, como as Dríades e as Ninfas da Névoa, desempenham papéis fundamentais na preservação e proteção da natureza. Elas são vistas como guardiãs e líderes espirituais de seus territórios naturais, recebendo respeito e deferência de outras criaturas feéricas.
        Artesãos e Curandeiros: A sociedade feérica valoriza habilidades artísticas e mágicas. Artesãos habilidosos, como as Mariposas Eternas, são respeitados por suas contribuições culturais, enquanto curandeiros e curandeiras têm um papel vital na manutenção da saúde e bem-estar da comunidade.
        Exploradores e Emissários: Alguns feéricos assumem a tarefa de explorar o mundo exterior e estabelecer relações com outras raças. Isso pode envolver embaixadores, emissários e espiões, como os Menecmas. Sua habilidade de assumir a forma de outras criaturas é uma vantagem nesses papéis.

        Características da Sociedade Feérica:
        Diversidade Cultural: A sociedade feérica é caracterizada por uma rica diversidade de culturas e tradições. Cada subespécie tem suas próprias práticas e crenças, mas elas muitas vezes coexistem em harmonia.
        Celebrações Mágicas: Festivais e celebrações mágicas desempenham um papel importante na sociedade feérica. Eles são oportunidades para compartilhar histórias, músicas e danças, além de fortalecer os laços com a natureza.
        Respeito pela Natureza: A natureza é reverenciada e protegida, pois os feéricos têm uma conexão profunda com o mundo natural. A preservação da flora e fauna é uma responsabilidade compartilhada por todos.
        Magia e Artes: As artes mágicas desempenham um papel central na sociedade feérica. Muitos feéricos praticam magia, seja como curandeiros, invocadores de ilusões ou mestres de elementos naturais.
        Espírito Comunitário: Os feéricos geralmente têm um forte senso de comunidade e cuidado mútuo. A cooperação é valorizada, e muitas decisões são tomadas coletivamente.

        A sociedade feérica é um reflexo da magia e diversidade que permeiam seu mundo. Suas hierarquias variam entre as subespécies, mas todas compartilham um profundo respeito pela natureza, uma conexão mágica e uma cultura rica. Ela é um lugar de encanto e mistério, onde a harmonia com o mundo natural é essencial.

        `,
        obrigatorias: [
            {
                id: "Gnomo",
                nome: "Gnomo",
                descricao: `O gnomo é um ser feérico minúsculo e, por isso, sua velocidade de movimento é de 4,5 metros. Um gnomo, por ser pequeno e ágil, consegue atravessar por debaixo de criaturas médias ou maiores sem penalidade de movimento. Um gnomo tem a capacidade de ficar tão imóvel que chega a parecer parte do ambiente e recebe vantagem em testes de furtividade enquanto imóvel em um ambiente de luz completa  ou meia luz, e de vantagem dupla em ambientes escuros.`
            },
            {
                id: "PixiesSprite",
                nome: "Pixies/Sprites",
                descricao: `A pixie ou o sprite  são fadas minúsculas e sua velocidade de movimento base por terra é de 4,5 metros, porém eles têm uma velocidade de movimento base de voo igual a 7,5 metros.  Em um combate, a fada/sprite pode usar a ação esconder junto com a ação recuar cuidadosamente, para mesclar mágicamente  com o ambiente e se esconder se passar, sumindo da visão de todos e ficando Obscurecido.
                `
            },
            {
                id: "Driade",
                nome: "Dríade",
                descricao: `A dríade é um espírito, de tamanho médio ou pequeno, feérico antigo de carvalhos e outros membros anciões de uma mata ou floresta. Dríades conseguem atravessar superfícies de madeira de até 1,5 metros de espessura e podem escalar árvores sem precisar realizar um teste de atletismo. Ao realizar um descanso longo em um ambiente de floresta a dríade ganha o seu nível em pontos de vida temporários, que duram até perdê-los ou receber uma nova fonte de vida temporária.
                `
            },
            {
                id: "Satiro",
                nome: "Sátiro",
                descricao: `O sátiro é uma criatura de tamanho médio ou pequeno, metade cervo/bode e metade homem. Esse ser feérico tem a capacidade de saltar igual a sua velocidade de movimento em um salto horizontal, ou metade de sua velocidade de movimento para um salto vertical. Pode usar seu chifre como uma arma natural que causa 1d8 de dano de impacto.
                `
            },
            {
                id: "NinfadaNevoa",
                nome: "Ninfa da Névoa",
                descricao: `As Névoa Ninfas são seres humanóides feéricos, de tamanho médio ou grande, associados à névoa e ao orvalho. Sua velocidade de movimento é de 7,5 metros, mas podem se transformar em névoa por um curto período (1 minuto), permitindo-lhes deslizar através de fendas e frestas inacessíveis para a maioria. Quando em forma de névoa, são quase intangíveis e podem evitar ataques físicos, porém não podem atacar enquanto nesta forma.
                `
            },
            {
                id: "MariposasEternas",
                nome: "Mariposas Eternas",
                descricao: `São fadas humanoides de tamanho médio que se assemelham a mariposas com asas iridescentes. Sua velocidade de voo é incrivelmente rápida, atingindo 12 metros por turno. Elas têm a habilidade de criar ilusões  coloridas pequenas, com uma ação em combate de até um cubo com 1,5m de aresta, que podem distrair e confundir inimigos possuem valor de dificuldade 10 para discernir se é uma ilusão ou não com um teste de Investigação, tornando-as mestres da ilusão.
                `
            },
            {
                id: "Menecma",
                nome: "Menecma",
                descricao: `O menecma é um humanóide feérico capaz de assumir aparência de seres de tamanho médio ou pequeno. Ele pode roubar a aparência de qualquer humanóide de tamanho parecido do seu que tenha visto. A transformação é mágica, aparece em detecção de magia e possui duração de 1 hora. Pode se transformar dessa forma até 4 vezes em um dia.
                `
            },
        ]
    },
    draconiano: {
        nome: 'Draconiano',
        descricao: `
        Nas vastas terras deste mundo, uma espécie singular conhecida como Draconianos deixa sua marca indelével. Estes seres, fruto da fusão entre dragões ancestrais e outras linhagens, são uma presença notável em nossa realidade.
        Com uma aparência majestosa, os Draconianos podem ostentar asas imponentes, escamas iridescentes e olhos que irradiam sabedoria. Eles carregam não apenas a força e resistência de seus antecessores draconianos, mas também uma série de habilidades especiais que refletem o tipo de dragão a que estão ligados. Essas habilidades variam de controlar chamas, gelo ou raios, e são uma manifestação da diversidade mágica que permeia o mundo.
        Os Draconianos desempenham papéis de destaque em nossa sociedade, muitas vezes ocupando cargos de liderança ou oferecendo sua experiência como conselheiros sábios. Sua influência é sentida em todos os cantos, e eles inspiram respeito e admiração.
        Além de seu impacto na sociedade, a presença dos Draconianos enriquece a narrativa de nosso mundo. Eles podem ser heróis que protegem nossos reinos, ou personagens complexos com objetivos próprios. Seu papel é fundamental em nossa realidade, onde a magia e o extraordinário se entrelaçam em uma teia de maravilhas.
        `,
        obrigatorias: [
            {
                id: "MeioDragao",
                nome: "Meio-Dragão",
                descricao: `
                O meio dragão é fruto de uma quase incompatível combinação de um dragão com um elfo ou humano. Um meio dragão tem sua descendência de um dos três tipos de dragão: fogo, gelo e raio. O meio dragão tem resistência ao dano  correspondente de seu ancestral.
                `
            },
            {
                id: "MeioWyvern",
                nome: "Meio-Wyvern",
                descricao: `O meio wyvern é a mistura do dracônico wyvern com um bestial ou humano. É menor que meio dragão e meio draco, por isso é uma criatura considerada de tamanho médio. Um meio wyvern é o mais rápido dos draconianos e possui uma velocidade de movimento base de 6 m. O meio wyvern pode também usar uma ação para dar um grande avanço correspondente a 15 metros. Uma vez que ele tenha feito isso deve esperar ao menos 1 minuto para fazer de novo.  
                `
            },
            {
                id: "MeioWyrm",
                nome: "Meio-Wyrm",
                descricao: `O meio wyrm é uma mistura entre o dracônico wyrm com um feérico ou um humano. O meio wyrm é menor que meio dragão e meio draco, por isso é uma criatura considerada de tamanho médio. O meio wyrm traz consigo a mordida venenosa de seu parente e podem tentar como uma ação envenenar uma criatura com um ataque de mordida. Caso acerte o ataque causa 1d6 de dano e deixa o inimigo envenenado com dano por rodada de 1d4 de dano por 3 rodadas. Pode fazer essa mordida uma vez a cada 1 minuto.
                `
            },
            {
                id: "MeioDraco",
                nome: "Meio-Draco",
                descricao: `O meio draco é uma mistura  do dracônico draco com um bestial ou troll. Esse draconiano é o único que não pode escolher a regalia de Asas Draconianas, então para se adaptar a sua vida terrestre possui longas garras e chifres. O meio draco pode usar sua garra como uma arma de uma mão e se tiver o treinamento considerar cada mão como uma arma. O dano de seu ataque com garra é de 1d10 de dano cortante.
                `
            },
            {
                id: "Kobolds",
                nome: "Kobolds",
                descricao: `Kobolds são pequenos draconianos que são a mistura de raças pequenas ou minúsculas com qualquer tipo de dragão. Eles possuem uma velocidade de movimento igual a 4,5 m por serem pequenos. Eles têm a capacidade de usar sua criatividade e inteligência para solucionar problemas. Eles podem usar a ação esconder quando usar a ação Bustar cobertura ao mesmo tempo sem custo extra, como também conseguem usar a ação habilitar / desabilitar dispositivo como uma ação.
                `
            },
        ]
    },
    meioElfo: {
        nome: 'Meio-Elfos',
        descricao: `
        Os Meio-Elfos, graciosos e dotados de beleza etérea, são a manifestação da união entre elfos e humanóides. Com uma herança mista que combina a paixão e a curiosidade dos humanos com a conexão profunda dos elfos com a natureza, eles se tornam um elo especial entre dois mundos.
        Essa raça é abençoada com características marcantes: a pele delicada dos elfos e a resistência dos humanos, a agilidade dos primeiros e a versatilidade dos segundos. Os Meio-Elfos herdam a habilidade de se comunicar com a natureza, percebendo suas nuances e entrando em sintonia com o ambiente ao seu redor.
        Mas sua singularidade não se limita apenas às características físicas. São também mediadores naturais, capazes de harmonizar comunidades diversas. Eles carregam consigo a riqueza das histórias e culturas de ambas as raças, criando pontes e promovendo a compreensão entre elfos e humanos.
        Os Meio-Elfos são espíritos inquietos, sempre buscando um propósito maior. Eles podem escolher entre os caminhos de seus antecessores, abraçando a natureza e a magia, ou embarcar em jornadas de exploração e aventura em busca de seu destino.
        Com uma beleza cativante e um espírito resiliente, os Meio-Elfos são a encarnação da diversidade e da harmonia, representando a fusão das tradições antigas e do ímpeto de novas descobertas. Eles são uma ponte entre dois mundos, unindo-os em uma só raça com um potencial ilimitado.
        `,
        obrigatorias: [
            {
                id: "MeioExordial",
                nome: "Meio-Exordial",
                descricao: `
               O meio exordial é um meio elfo formado por pais elfo exordial e humano. Este meio elfo é capaz de conversar telepaticamente com outras criaturas e não só elfos, porém só pode usar essa telepatia por 6 segundos. Após sua telepatia por 6 segundos deve esperar 10 minutos para usar novamente. Consegue usar a ação Desabilitar Dispositivo com duas ações.
                `
            },
            {
                id: "MeioSelvagem",
                nome: "Meio-Selvagem",
                descricao: `O meio selvagem é um meio elfo formado por pais elfo selvagem e humano. Este meio elfo tem uma velocidade de movimento elevada, enquanto não usam armadura pesada, de 7,5 metros de velocidade de movimento base. Além disso, proficiência com espadas-diapasão.  
                `
            },
            {
                id: "MeioLunar",
                nome: "Meio-Lunar",
                descricao: `O meio lunar é um meio elfo formado por pais elfo lunar e humano. Este meio elfo é capaz de enxergar no escuro com alcance de 6 metros como se fosse meia luz na escuridão, e luz completa na meia luz. Não esquece nada que leu ou ouviu nos últimos 30 dias.
                `
            },
        ]
    },
    meioDemonio: {
        nome: 'Meio-Demônio',
        descricao: `
        Os Meio-Demônios, criaturas marcadas pela dualidade em sua essência, são o resultado da união entre seres demoníacos e humanóides. Eles carregam uma herança mágica sombria e uma natureza única que os distingue em meio aos dois mundos de sua ancestralidade.
        Com uma aparência que combina a complexidade dos traços humanos com a aura misteriosa dos demônios, os Meio-Demônios exibem uma beleza sobrenatural que oscila entre o fascínio e o temor. Seus olhos muitas vezes revelam um brilho ardente, refletindo a dualidade que reside em sua alma.
        Além das características físicas marcantes, os Meio-Demônios herdam poderes sombrios e habilidades mágicas das profundezas do inferno. Eles são capazes de conjurar chamas infernais, sombras sedutoras e manipular as energias demoníacas a seu favor.
        No entanto, essa dualidade não se limita à sua aparência e habilidades. Os Meio-Demônios frequentemente enfrentam uma luta interior, tentando encontrar um equilíbrio entre sua herança demoníaca e sua humanidade. Alguns abraçam seu lado sombrio, usando seus poderes para buscar objetivos nefastos, enquanto outros lutam para resistir à influência demoníaca, dedicando-se a causas nobres.
        Essa raça é muitas vezes vista com desconfiança e preconceito, mas também com um certo fascínio, já que eles personificam a eterna luta entre a luz e a escuridão. Os Meio-Demônios carregam consigo a responsabilidade de moldar seus destinos, escolhendo entre a redenção e a perdição.
        Com uma aura enigmática e uma alma dividida, os Meio-Demônios são uma encarnação da dualidade inerente ao ser humano, forjando seus próprios caminhos em meio à eterna luta entre o bem e o mal. Eles são testemunhas da complexidade da existência, representando a capacidade de escolher entre a luz e as sombras.
        `,
        obrigatorias: [
            {
                id: "DemonioArcano",
                nome: "Demônio Arcano",
                descricao: `
               Um meio-demônio arcano é filho de um elfo, humano ou feérico com um demônio conjurador de feitiços. Com seu sangue demoníaco, o meio demônio desta linhagem pode conjurar feitiços ou magias com sua vitalidade quando estiver sem pontos de magia. Para cada ponto de magia necessário para conjurar uma magia ou feitiço são gastos 1d6 pontos de vida.
                `
            },
            {
                id: "DemonioGuerreiro",
                nome: "Demônio Guerreiro",
                descricao: `Um meio-demônio guerreiro é filho de um elfo, humano ou feérico com um demônio do exército do inferno. Com seu sangue demoníaco, o meio demônio desta linhagem pode realizar manobras ou habilidades com sua vitalidade quando estiver sem pontos de Estâmina. Para cada ponto de Estâmina  necessário para usar uma Habilidade são gastos 1d6 pontos de vida.  
                `
            },
            {
                id: "SucubosIncubos",
                nome: "Súcubos/Íncubos",
                descricao: `Um meio-demônio súcubo ou íncubo é filho de um elfo, humano ou feérico com uma súcubo ou íncubo. Com seu sangue demoníaco, o meio demônio desta linhagem pode tentar encantar uma criatura como uma ação. A criatura encantada não agirá de maneira hostil com o demônio, a não ser que este a ataque ou lhe cause algum mal. O personagem pode tentar uma criatura por vez e uma vez a cada um minuto. A chance de sucesso é de 50%.
                `
            },
        ]
    },
    meioCelestial: {
        nome: 'Meio-Celestial',
        descricao: `
        Os Meio-Celestiais são seres excepcionais, nascidos da união entre celestiais e humanóides. Eles carregam em si a luminosidade e a benevolência das esferas divinas, manifestando essa herança em sua existência terrena.
        Com uma beleza angelical e uma aura de bondade, os Meio-Celestiais irradiam uma luz celestial que envolve todos aqueles que se aproximam deles. Suas características físicas exalam uma beleza etérea e uma sensação de harmonia que inspira admiração e respeito.
        Além da aparência marcante, os Meio-Celestiais possuem dons divinos que variam dependendo de sua linhagem celestial. Eles podem curar feridas com um toque, invocar proteção divina e canalizar energias sagradas para banir o mal. Essas habilidades refletem a bênção de sua herança celestial.
        Os Meio-Celestiais também possuem uma moral firme e um profundo senso de justiça. Eles são frequentemente vistos como guias espirituais e protetores de comunidades, buscando erradicar a injustiça e trazer cura aos necessitados.
        No entanto, apesar de sua herança celestial, os Meio-Celestiais não estão isentos de desafios e tentações terrenas. Eles devem equilibrar sua natureza divina com as complexidades e imperfeições da vida mortal. Essa dualidade muitas vezes os leva a questionar seu propósito e a buscar uma compreensão mais profunda de sua existência.
        Os Meio-Celestiais são uma presença iluminada no mundo, uma lembrança constante da divindade e da possibilidade de transcender as limitações terrenas. Sua influência é sentida em todas as esferas da vida, inspirando esperança, compaixão e um compromisso inabalável com o bem. Com sua luz radiante e determinação nobre, eles personificam a capacidade de elevar o espírito humano e relembram a todos que a bondade é uma força poderosa na luta contra as trevas.
        `,
        obrigatorias: [
            {
                id: "CelestialArcano",
                nome: "Celestial Arcano",
                descricao: `
               Um meio celestial arcano é filho de um elfo, humano ou feérico com um celestial conjurador de magias e milagres. Com seu sangue sagrado, o meio celestial desta linhagem pode conjurar milagres ou magias com seu vigor quando estiver sem pontos de magia. Para cada ponto de magia necessário para conjurar uma magia ou feitiço são gastos 2 pontos de Estamina.
                `
            },
            {
                id: "CelestialGuerreiro",
                nome: "Celestial Guerreiro",
                descricao: `Um meio-celestial guerreiro é filho de um elfo, humano ou feérico com um celestial do exército divino. Com seu sangue sagrado, o meio celestial desta linhagem pode realizar manobras ou Habilidades com sua magia quando estiver sem pontos de Estamina. Para cada ponto de Estamina  necessário para usar uma Habilidade são gastos 2 pontos de magia. 
                `
            },
            {
                id: "CelestialIntermediador",
                nome: "Celestial Intermediador",
                descricao: `Um meio-celestial intermediador é filho de um elfo, humano ou feérico com um juiz sagrado. Com seu sangue sagrado, o meio celestial desta linhagem pode tentar apaziguar uma criatura como uma ação. A criatura encantada não agirá de maneira hostil com o celestial ou seus aliados, a não ser que a ataquem ou lhe causem algum mal. O personagem pode tentar uma criatura por vez,  uma vez a cada um minuto. A chance de sucesso é de 40%.
                `
            },
        ]
    },
    meioGenio: {
        nome: 'Meio-Gênio',
        descricao: `
        Os Meio-Gênios, fruto de uma união entre elementais e humanóides, são seres cujas almas estão profundamente entrelaçadas com os segredos dos elementos. Eles representam uma ligação especial entre os reinos elementais e o mundo dos mortais, trazendo consigo tanto os dons quanto as limitações dessa conexão única.
        Com uma aparência que muitas vezes reflete os elementos dos quais descendem, os Meio-Gênios podem exibir características associadas à terra, fogo, água, ar ou outros elementos da natureza. Seus olhos costumam brilhar com uma energia inerente, sugerindo a influência dos elementos em sua essência.
        Além da aparência marcante, os Meio-Gênios herdam certas afinidades elementais. Eles podem sentir as mudanças no clima e nos elementos, controlando em certa medida os poderes naturais ao seu redor. No entanto, essa capacidade é limitada em comparação com a dos gênios puros, e os Meio-Gênios geralmente precisam de um esforço maior para realizar feitos elementais extraordinários.
        A dualidade da herança elemental dos Meio-Gênios também se estende à sua personalidade. Eles podem oscilar entre estados de calma e agitação, refletindo as mudanças nos elementos que os influenciam. Esta conexão com a natureza muitas vezes os torna peritos na resolução de problemas relacionados ao ambiente natural.
        A influência dos Meio-Gênios na sociedade é palpável. Sua compreensão dos elementos e sua capacidade de mediar conflitos entre humanos e elementais os tornam líderes e diplomatas procurados. Além disso, suas habilidades com os elementos frequentemente os destacam como guardiões da natureza e protetores do equilíbrio ecológico.
        Em última análise, os Meio-Gênios personificam a intersecção entre os segredos dos elementos e o mundo dos mortais. Eles lembram a todos que, mesmo nas limitações de sua herança, a conexão com a natureza e o respeito pelos elementos podem moldar um destino extraordinário.
        `,
        obrigatorias: [
            {
                id: "MeioGenioDoFogo",
                nome: "Meio-Gênio do Fogo",
                descricao: `
               Este meio gênio tem afinidade com o elemento fogo e possui resistência ao dano de fogo, porém tem vulnerabilidade a dano de gelo.Consegue acender velas e fogueiras com uma pequena chama em seus dedos.
                `
            },
            {
                id: "MeioGenioDoGelo",
                nome: "Meio-Gênio do Gelo",
                descricao: `Este meio gênio tem afinidade com o elemento Gelo e possui resistência ao dano de gelo, porém tem vulnerabilidade a dano de raio. Consegue resfriar objetos e congelar pequenas quantidades (10 cm cúbicos) de líquidos a cada 12 segundos. 
                `
            },
            {
                id: "MeioGenioDoRaio",
                nome: "Meio-Gênio do Raio",
                descricao: `Este meio gênio tem afinidade com o raio e possui resistência ao dano de raio, porém tem vulnerabilidade a dano de terra. Ele também consegue criar pequenas descargas elétricas que podem gerar luz por um minuto e faz o cabelo ficar de pé.
                `
            },
            {
                id: "MeioGenioDoTerra",
                nome: "Meio-Gênio do Terra",
                descricao: `Este meio gênio tem afinidade com o elemento terra e possui resistência ao dano de terra, porém tem vulnerabilidade a dano de fogo. Ele também consegue mover uma pequena quantidade (50 cm cúbicos) de terra com a mão a cada 6 segundos.
                `
            },
        ]
    },
    meioTroll: {
        nome: 'Meio-Troll',
        descricao: `
        Os Meio-Trolls são criaturas únicas, resultado da fusão entre humanóides e a resistência formidável dos trolls. Com uma linhagem que inclui diversos tipos de trolls, como os de areia, gelo e montanha, eles carregam em si a dualidade de uma herança selvagem e formidável.
        A aparência dos Meio-Trolls varia amplamente, refletindo a diversidade de sua herança troll. Alguns podem exibir pele resistente e áspera, outros podem herdar a resistência ao frio ou uma afinidade com as alturas das montanhas. No entanto, todos compartilham a característica comum de regeneração acelerada, que lhes permite se curar mais rapidamente do que a maioria dos humanóides.
        Além das características físicas impressionantes, os Meio-Trolls herdam uma resistência excepcional. Seja a resistência ao calor abrasador das dunas, a adaptabilidade ao frio glacial, ou a força formidável necessária para navegar pelas escarpas das montanhas, eles são capazes de enfrentar ambientes extremos com coragem e determinação.
        A dualidade da herança dos Meio-Trolls também se estende à sua personalidade. Eles podem exibir uma natureza forte e impetuosa, mas também são conhecidos por sua determinação e resistência inabaláveis. Essa tenacidade muitas vezes os torna líderes em situações desafiadoras.
        Os Meio-Trolls desempenham papéis importantes nas sociedades que habitam, frequentemente como protetores de suas comunidades e defensores contra ameaças externas. Sua resistência e habilidades de combate os tornam aliados valiosos, enquanto sua natureza adaptável lhes permite sobreviver e prosperar em condições adversas.
        Em última análise, os Meio-Trolls personificam a força bruta e a adaptação à adversidade. Eles lembram a todos que, mesmo nas circunstâncias mais difíceis, a determinação e a coragem podem superar desafios aparentemente insuperáveis, e que a herança diversificada é uma força a ser valorizada.
        `,
        obrigatorias: [
            {
                id: "MeioMontanhoso",
                nome: "Meio-Montanhoso",
                descricao: `
               Um meio-troll é a mistura de um troll com um ser humanoide. Esse mestiço pode arremessar qualquer objeto, forte o suficiente para causar dano que pese até 5kg. Causando 1d10 pontos de dano de impacto, com uma distância de 15 metros. Podendo utilizar esse arremesso uma vez a cada 10 minutos.
                `
            },
            {
                id: "MeioGeloso",
                nome: "Meio-Geloso",
                descricao: `Um meio-troll é a mistura de um troll com um ser humanoide. Esse mestiço tem resistência ao dano elemental de gelo. Além de possuírem uma velocidade de movimento de 9 metros. 
                `
            },
            {
                id: "MeioArenoso",
                nome: "Meio-Arenoso",
                descricao: `Um meio-troll é a mistura de um troll com um ser humanoide. Esses mestiços são resistentes ao cansaço, não sofrem com os efeitos dos 2 primeiros níveis de cansado. Além de não sofrerem penalidade de movimento por andar em um terreno difícil.
                `
            },
        ]
    },
    bestial: {
        nome: 'Bestial',
        descricao: `
        Os Bestiais são uma espécie singular que personifica a diversidade do reino animal em uma forma humanoide. Eles representam uma maravilhosa manifestação da natureza, trazendo consigo uma ampla variedade de características e habilidades, refletindo os muitos aspectos da vida selvagem.
        Sua aparência é tão diversa quanto a própria natureza. Alguns exibem traços de aves, com asas que lhes permitem voar com graça e leveza, enquanto outros são imponentes e maciços, lembrando animais de grande porte. Há também aqueles que carregam características de caçadores terrestres, com velocidade e garras afiadas, e os pequenos e ágeis, que lembram os herbívoros ou onívoros ágeis e esquivos.
        Mas a verdadeira beleza dos Bestiais vai além de sua aparência. Cada subespécie traz consigo habilidades únicas que se enraízam em sua herança animal. Alguns são mestres da caça e da sobrevivência, enquanto outros são habilidosos na arte de voar ou na capacidade de resistir aos desafios das terras inóspitas.
        A presença dos Bestiais no mundo é uma lembrança constante da amplitude da natureza e de sua incrível capacidade de adaptação. Eles nos ensinam que, assim como a natureza é diversa, somos todos únicos em nossas habilidades e características. Os Bestiais são uma celebração da maravilha da vida e da riqueza que a natureza oferece em todas as suas formas.

        `,
        obrigatorias: [
            {
                id: "Alados",
                nome: "Alados",
                descricao: `
               Bestiais alados são humanoides com traços de qualquer pássaro. Bestiais alados podem voar até sua velocidade de movimento. Enquanto um bestial alado estiver caindo pode usar sua reação para abrir suas asas e quebrar a queda. Ao realizar essa reação não sofrerá o dano da queda. 
                `
            },
            {
                id: "Brutamontes",
                nome: "Brutamontes",
                descricao: `Bestiais brutamontes são humanoides grandes com traços de animais que pesam naturalmente pelo menos 400 kg e possuem um valor de vida inicial igual a 12 (2 pontos acima do valor base da espécie). Após se mover por pelo menos 4,5 metros em linha reta, o Bestial brutamontes pode realizar um ataque com seu chifre, galhada ou cabeça, que causa 2d6 pontos de dano, além de empurrar seu inimigo por 3m. Se o rolamento de ataque for um acerto crítico, além do dano dobrado, empurra o dobro da distância. 
                `
            },
            {
                id: "Predadores",
                nome: "Predadores",
                descricao: `Bestiais predadores são humanóides carnívoros e caçadores terrestres (Canídeos, répteis e felinos principalmente). Predadores possuem uma maior velocidade de movimento de 7,5 metros e também possuem armas naturais, que podem ser garras ou presas. Essas armas naturais causam 1d10 pontos de dano perfurante ou cortante.
                `
            },
            {
                id: "Herbivoraz",
                nome: "Herbivoraz",
                descricao: `Bestiais herbivorazes são pequenos humanóides com traços de animais herbívoros ou onívoros leves e ágeis, seu valor de Velocidade de Movimento é igual a 4,5. Um bestial herbivoraz pode usar sua agilidade de fuga para escapar do perigo, ou corajosamente avançar para atacar primeiro como instinto de sobrevivência. 
                Um herbivoraz pode usar a ação disparada com o custo de duas ações ao invés de três. Ao usar a ação correr ou andar pode realizar, como parte da mesma ação,  usar a ação Buscar Cobertura. Desde que esteja usando um escudo ou tenha cobertura próximo de si.

                `
            },
            {
                id: "Aquaticos",
                nome: "Aquaticos",
                descricao: `Bestiais aquáticos são humanoides com traços de animais aquáticos como os mais variados peixes e anfíbios. Esses bestiais conseguem respirar debaixo d’água. Nadam em qualquer tipo de correnteza sem precisar de um teste de atletismo. Com as escamas que se formam em sua pele, um bestial aquático recebe um bônus de 2 pontos de valor de defesa enquanto não estiver usando armadura média ou pesada. Um bestial aquático que não fica submergido por pelo menos uma hora a cada 48 horas fica um nível de Cansado,  que pode acumular com outras fontes.
                `
            },
        ]
    },
    halfling: {
        nome: 'Halfling',
        descricao: `
        Os Halflings, apesar de seu tamanho modesto, são gigantes quando se trata de coragem e espírito aventureiro. Eles vivem suas vidas com uma determinação feroz, enfrentando desafios muito maiores do que eles mesmos. Seus sorrisos são tão amplos quanto seus corações, e sua disposição para explorar o desconhecido é incomparável.
        Sua estatura pequena não é um impedimento, mas sim uma vantagem. Eles passam facilmente despercebidos e são mestres em navegar por lugares apertados e esconder-se nas sombras. Sua agilidade é lendária, e muitos inimigos subestimam a habilidade de um Halfling, apenas para serem surpreendidos por sua destreza em combate.
        Nada é mais importante para um Halfling do que a família e os amigos. Eles estão dispostos a fazer qualquer coisa para proteger aqueles que amam e nunca recuam diante de um desafio. Sua determinação é incomparável, e sua alegria de viver é contagiante.
        Os Halflings são uma prova viva de que o tamanho não define o heroísmo. Eles são uma espécie de espíritos aventureiros, prontos para enfrentar o mundo com um sorriso no rosto e uma sede insaciável por novas experiências. Eles são pequenos em estatura, mas grandes em coragem e determinação.
        `,
        obrigatorias: [
            {
                id: "Comuns",
                nome: "Comuns",
                descricao: `
               Halflings que lembram pequenos humanos, são ágeis e agitados. Esses halflings possuem a capacidade de usar a ação Esconder estando logo atrás de um aliado. Um halfling consegue se esconder mas não buscar cobertura desta maneira. 
                `
            },
            {
                id: "Subterraneos",
                nome: "Subterrâneos",
                descricao: `Halflings que vivem nas profundezas das cavernas e túneis subterrâneos, em constante harmonia com a escuridão e os segredos das entranhas da terra. Eles possuem a pele pálida avermelhada nas extremidades e olhos maiores que os comuns e que possuem pupilas enormes. Halflings do Submundo possuem visão no escuro com alcance de 64 metros, enxergando como se estivessem em meia luz.
                `
            },
            {
                id: "Monstruosidades",
                nome: "Monstruosidades",
                descricao: `Halflings monstros são todas as espécies de goblinóides e kobolds (canídeos). Esses halflings são conhecidos por trabalhar em equipe e cultuar seres mais fortes. São muito orgulhosos do próprio povo ou de quem cultuam, esse orgulho se traduz em confiança e determinação em batalha. Quando realizam um ataque esses halflings conseguem usar ação Intimidar ao mesmo tempo. Essa habilidade pode ser usada 3 vezes ao dia. Quando estão com um ou mais aliados flanqueando um inimigo recebe vantagem em jogadas de acerto.
                `
            },
        ]
    },
    troll: {
        nome: 'Troll',
        descricao: `
        Trolls são seres colossais, conhecidos por sua resistência sobrenatural e presença imponente. Independentemente da variação específica de sua linhagem, todos os Trolls compartilham traços comuns que os tornam verdadeiras forças da natureza no mundo da alta fantasia.
        Possuindo uma natureza monstruosa, os Trolls são gigantes imunes a muitos dos obstáculos que afetam criaturas menores. Sua imponência física e força descomunal lhes conferem a capacidade de realizar feitos impressionantes, como arremessar objetos maciços a grandes distâncias e transportar cargas consideráveis por curtos períodos de tempo.
        Além disso, a resistência inerente dos Trolls permite que eles prosperem em ambientes extremos, como montanhas, tundras congeladas e desertos escaldantes. Seus corpos robustos e peles resistentes protegem-nos das agruras do ambiente, tornando-os mestres da sobrevivência em terrenos hostis.
        A linhagem de um Troll é uma marca de sua jornada única e destino no mundo da alta fantasia. Cada subespécie de Troll representa uma adaptação especializada a um ambiente particular, mas todos compartilham a herança de força e resistência que os torna verdadeiramente formidáveis. Independentemente da variação, os Trolls são gigantes que se destacam, deixando sua marca indelével no mundo de aventuras e desafios.
        `,
        obrigatorias: [
            {
                id: "TrollDaMontanha",
                nome: "Troll da Montanha",
                descricao: `
               Um Troll da Montanha são grandes seres humanóides monstruosos. Eles podem arremessar qualquer objeto grande e pesado, como pedras, toras de madeira e etc. em uma distância de até 15m. Um alvo atingido por esses objetos sofrem 2d10 de dano. Arremessar um objeto é uma ação e exige que tenha tal objeto próximo. Seu físico incomparável os permite ultrapassar a sua capacidade de carga em até 50 quilos por ponto de força durante 1 hora. Após realizar tal feito é necessário ao menos um descanso curto.
                `
            },
            {
                id: "TrolldoGelo",
                nome: "Troll do Gelo",
                descricao: `Um Troll do Gelo são grandes seres humanóides monstruosos. Esses trolls são imunes ao frio, ao dano de gelo e à condição Congelando. 
                `
            },
            {
                id: "TrollDoDeserto",
                nome: "Troll do Deserto",
                descricao: `Um Troll do Deserto são grandes seres humanóides monstruosos. Esses trolls são imunes ao cansaço e são adaptados para andar na areia, ignorando terrenos difíceis naturais.
                `
            },
        ]
    },
    constructo: {
        nome: 'Constructo',
        descricao: `
        Na penumbra do mundo da alta fantasia, os Constructos erguem-se como testemunhos vivos da união entre a magia ancestral e a habilidade criativa dos artífices. São entidades de energias elementais, infundidas com as almas ardentes do fogo, da eletricidade, do ar e da sombra, cada qual trazendo consigo uma personalidade distinta e um conjunto inigualável de talentos.
        Nascidos de uma alquimia complexa e do domínio das artes mágicas, os Constructos são verdadeiras quimeras, distintas de qualquer forma de vida convencional. Eles não conhecem a vida como a compreendemos, mas em seu íntimo, mantêm uma consciência singular, originada das energias elementais que os compõem. O resultado é uma fusão fascinante de artifícios e elementos, um casamento de magia e engenhosidade.
        Independentemente de suas vocações como utilitários, guerreiros, agentes infiltrados ou exploradores destemidos, todos os Constructos partilham uma verdade fundamental: a natureza de sua existência é essencialmente artificial. São criaturas que se destacam, em virtude de sua singularidade, destacando-se como a conjunção mais notável entre o mundo natural e o reino das criações mágicas.
        Assim, os Constructos perduram como criaturas enigmáticas e imponentes, dotadas de habilidades incomuns, capazes de desempenhar tarefas intrincadas e superar muitas das limitações inerentes às formas de vida orgânicas. Essa união única entre magia elemental e artifício confere a eles um lugar ilustre no teatro de maravilhas e desafios que compõem o mundo da alta fantasia.
        `,
        obrigatorias: [
            {
                id: "ConstructoDeUtilidade",
                nome: "Constructo de Utilidade",
                descricao: `
               O constructo de utilidade foi criado ao usar um espírito elemental de fogo para alimentar uma máquina ajudante. Usadas em forjas, construções e transporte , essas máquinas são capazes de grande capacidade de carga, sendo capazes de carregar o dobro de carga que uma criatura orgânica de mesmo tamanho. Os constructos de Habilidade são duráveis porém lentos, sua velocidade de movimento é igual a 4,5 metros. Eles são imunes à condição de Cansado e não precisam de comida ou água. Para um descanso longo um constructo precisa ficar parado em modo inativo por 4 horas, e seu descanso curto funciona de maneira padrão. São resistentes ao dano de fogo e imunes ao dano de venenos e a condição Envenenado ou Sangrando. São vulneráveis ao dano de gelo.
                `
            },
            {
                id: "ConstructoDeBatalha",
                nome: "Constructo de Batalha",
                descricao: `
               O constructo de batalha foi criado ao usar um espírito elemental de raio para alimentar uma máquina combatente. Usadas como guardas, soldados e assassinos, essas máquinas possuem uma armadura embutida que pode ser melhorada e reforçada. Seu valor de defesa inicial é de 15. Um constructo de batalha não pode adicionar sua agilidade ao seu valor de defesa e nem usar armaduras. Eles são imunes à condição de Cansado e não precisam de comida ou água. Para um descanso longo um constructo precisa ficar parado em modo inativo por 4 horas, e seu descanso curto funciona de maneira padrão. São resistentes ao dano de raio e imunes ao dano de venenos, a condição Envenenado e a condição Sangrando. São vulneráveis ao dano de terra.
                `
            },
            {
                id: "ConstructoDeExploracao",
                nome: "Constructo de Exploração",
                descricao: `
               O constructo de exploração foi criado ao utilizar um espírito elemental do ar para alimentar uma máquina de exploração versátil. Essas máquinas são frequentemente usadas em missões de reconhecimento, exploração de áreas desconhecidas e busca de tesouros escondidos. Possuem uma capacidade de voo limitada, permitindo-lhe voar por 10 minutos a cada descanso curto ou longo. Sua velocidade de movimento é de 9 metros em terra e 18 metros no ar. Os constructos de exploração são imunes à condição de Cansado e não precisam de comida ou água. Para um descanso longo, um constructo precisa ficar inativo em modo de economia de energia por 2 horas, enquanto seu descanso curto funciona como o padrão. São resistentes ao dano de raio e imunes ao dano de veneno e à condição Envenenado. São vulneráveis aos danos de gelo e terra.
                `
            },
            {
                id: "ConstructoDeInvasao",
                nome: "Constructo de Invasão",
                descricao: `
                O constructo de sigilo foi criado ao utilizar um espírito elemental sombrio para alimentar uma máquina furtiva especializada em missões secretas e espionagem. Essas máquinas são especialistas em se mover em silêncio e em se esconder nas sombras. Possuem a habilidade de camuflagem que as tornam quase invisíveis em ambientes escuros, fornecendo +3 em testes de furtividade enquanto fora de luz completa. Sua velocidade de movimento é de 6 metros, mas quando estão nas sombras, sua velocidade é dobrada para 12 metros. Eles não precisam de comida ou água e são imunes à condição Cansado. Para um descanso longo, um constructo de sigilo precisa de apenas 2 horas de inatividade nas sombras, enquanto seu descanso curto funciona de maneira padrão. São resistentes ao dano de sombra e imunes ao dano de veneno e à condição Envenenado. São vulneráveis aos danos sagrado e de fogo.
                `
            },
        ]
    },

};
const regaliasOpcionais = {
    "regalias_opcionais": [
        {
            "tipo": "Psíquico",
            "custo": 2,
            "descricao": 'Escolha um dos seguintes poderes psíquicos para começar:',
            "opcoes": [
                {
                    "nome": "Telecinese",
                    "descricao": " Opersonagem tem a habilidade de mover objetos com a mente. O personagem consegue mover até um objeto de até 5 quilos que esteja em um alcance de até 30 metros de distância. O movimento não é veloz e não pode realizar ataques com armas com essa habilidade. Além disso, 3 vezes ao dia o personagem pode usar a sua reação para empurrar, 3 metros para a direção  a sua escolha, uma criatura que se aproxime  dele em uma distância de 3 metros."
                },
                {
                    "nome": "Telepatia",
                    "descricao": "Ler pensamentos e se comunicar mentalmente com outras pessoas. O personagem consegue manter conversas telepáticas com criaturas que a possa entender em até 27 metros de distância. Além disso, o jogador pode escolher tentar ler a mente, com 70% chance de sucesso, de alguém que possa ver em até 18 metros de distância. O jogador com sucesso em sua tentativa  consegue ler os pensamentos superficiais do alvo, como o que ele está pensando no exato momento, contra a sua vontade. "
                },
                {
                    "nome": "Precognição",
                    "descricao": "Consegue ter vislumbres do futuro, gerando flashes de eventos que ainda estão por acontecer. O jogador pode escolher passar em um teste de habilidade, desviar de um ataque certeiro ou acertar um ataque uma vez por dia, pois ele já sabia que aquilo ia acontecer e como."
                },
                {
                    "nome": "Controle Mental",
                    "descricao": "Capacidade de influenciar suavemente a mente dos outros, fazendo sugestões. O jogador ganha +2 em todos os rolamentos da aba social e uma vez por dia pode transformar esse  bônus em um +10."
                }
            ]
        },
        {
            "tipo": "Vampiro / Wight / Draugr",
            "custo": 2,
            "descricao": "Ao escolher ser um morto vivo, o personagem não pode ser curado por milagres. Escolha um dos seguintes poderes de mortos vivos para começar com (A habilidade Drenagem de Vida pode ser escolhido por qualquer tipo de morto vivo):",
            "observacao": "Não pode ser curado por milagres.",
            "opcoes": [
                {
                    "nome": "Drenagem de Vida",
                    "descricao": "O personagem pode sugar a energia vital de outras criaturas para se fortalecer. O jogador pode escolher, como uma ação, realizar um ataque de combate corpo a corpo e sugar a vitalidade de um alvo, causando 1d8 de dano necrótico e o curando em 5 pontos, ou realizar uma versão mais fraca à distância, causando apenas 1d4 de dano necrótico e curando em 3, com alcance de 9m. Essa habilidade pode ser utilizada até 3 vezes por descanso longo."
                },
                {
                    "nome": "Transformação Noturna",
                    "descricao": "Ganha poderes especiais durante a noite, como aumento de força, velocidade ou poderes sombrios. Um personagem morto vivo recebe 1,5 de bônus de velocidade movimento a noite. Sua capacidade de carga aumenta, como se fosse um tamanho maior na tabela, durante a noite. O personagem consegue escalar paredes sem a necessidade de testes ou redução de velocidade e ganha +3 em testes de furtividade à noite."
                },
                {
                    "nome": "Hipnose",
                    "descricao": "Hipnotiza suas vítimas com seu olhar ou voz, exercendo influência sobre elas. O personagem consegue utilizar as magias Hipnose e Voz de Comando uma vez cada por dia e sem custo de mana."
                }
            ]
        },
        {
            "tipo": "Mutante",
            "custo": 2,
            "descricao": 'Uma criatura que sofreu de alguma forma uma exposição a um efeito que mudou permanentemente sua aparência e fisionomia é considerada um mutante. O mutante tem uma penalidade de -2 em todos os testes da aba social, exceto intimidação, sempre que que tiver a mutação visível. Todos sabem que o personagem possui mutações, a não ser que o personagem a mantenha contida dentro de roupas, máscaras e afins. Ao escolher ser um mutante é necessário escolher apenas uma das opções abaixo:',
            "penalidade": "-2 em testes da aba social (exceto Intimidação) com mutação visível.",
            "opcoes": [
                {
                    "nome": "Pele Escamosa",
                    "descricao": "A pele do personagem se torna grossa e escamosa, fornecendo uma defesa natural a cortes e arranhões. A base do valor de defesa para o personagem sem armadura é de 10 ao invés de 7."
                },
                {
                    "nome": "Olhos Multifacetados",
                    "descricao": "Os olhos do personagem se multiplicam e adquirem uma aparência insectóide, concedendo visão ampliada e a capacidade de enxergar no escuro. Visão no escuro, e meia luz, com alcance de 27 metros e bônus de +2 em testes de percepção que envolvam visão. Além disso possui visão 360°"
                },
                {
                    "nome": "Boca Abissal",
                    "descricao": "A boca do personagem se expande, revelando uma mandíbula cheia de dentes afiados, permitindo ataques mordedores poderosos. Recebe uma arma natural com dano perfurante  1d10 + valor de força. Recebe +2 em testes de atletismo para agarrar um alvo com os dentes."
                },
                {
                    "nome": "Membros Desproporcionais",
                    "descricao": "Os membros do personagem se alongam ou encurtam, concedendo versatilidade. Aumentam o alcance de ameaça em 1,5 metros ou reduz a criatura em um tamanho na escala, com um mínimo de minúsculo."
                },
                {
                    "nome": "Cauda Serpentina",
                    "descricao": "Uma cauda serpentina cresce na parte inferior do corpo do personagem, permitindo uma maior capacidade de equilíbrio e agilidade em movimentos.o personagem ganha um bônus de +5 em testes de acrobacia para se equilibrar e consegue usar sua cauda para se segurar em beiradas, galhos e outros que possam ser enrolados por ela, deixando assim suas mãos livres. A calda pode ser usada para segurar objetos mas não realizar ataques ou defender de ataques."
                },
                {
                    "nome": "Garras Retráteis",
                    "descricao": "O personagem desenvolve garras afiadas em suas mãos ou pés, fornecendo ataques mais letais e a habilidade de escalar superfícies verticais. Recebe uma arma natural com dano cortante   1d6 + valor de destreza. O personagem tem a capacidade de escalar superfícies verticais sem custo extra de movimento e sem necessidade de ferramentas extras."
                },
                {
                    "nome": "Chifres Torcidos",
                    "descricao": "Chifres retorcidos e sinuosos crescem na cabeça do personagem, conferindo maior resistência física e a capacidade de empurrar objetos pesados. O personagem recebe +2 em testes de atletismo para se manter em pé ou derrubar um alvo. Recebe uma arma natural com dano de impacto  1d6 + valor de força."
                },
                {
                    "nome": "Exoesqueleto Ósseo",
                    "descricao": "O corpo do personagem é envolvido por um exoesqueleto ósseo, tornando-o mais resistente a cortes. Se torna resistente ao dano cortante, porém se torna vulnerável ao dano de impacto. O exoesqueleto também aumenta a base do valor de defesa de 7 para 12."
                },
                {
                    "nome": "Pernas de Aranha",
                    "descricao": "O personagem desenvolve pernas extras semelhantes às de uma aranha, permitindo maior mobilidade e a habilidade de escalar paredes. Pode escalar sem gastar movimento extra e ganha um bônus de 1.5 metros no valor de velocidade. Ganha um bônus de +5 em testes de atletismo para agarrar e para não ser derrubado."
                },
                {
                    "nome": "Braços Tentaculares",
                    "descricao": "Braços adicionais em forma de tentáculos crescem no corpo do personagem, fornecendo uma vantagem de alcance em combate e a habilidade de agarrar objetos a distância. Recebe 1.5 metros a mais em seu alcance de ameaça e +2 em testes de atletismo para agarrar outra criatura."
                }
            ]
        }
    ]
}
const categories = {
    "Armaduras Pesadas": [
        {
            name: "Loriga segmentada",
            price: 325,
            defesa: 16,
            forca: 2,
            description: "Composta de tiras horizontais de metal, esta armadura é pesada e resistente. Peça muito utilizada por legionários minotauros. Valor de Defesa 16."
        },
        {
            name: "O-Yoroi",
            price: 575,
            defesa: 17,
            forca: 3,
            description: "Usada pelos samurais, esta armadura é formada por pequenas placas metálicas unidas por nós de couro colorido. Inclui o kabuto, um elmo com uma máscara metálica. Valor de Defesa 17."
        },
        {
            name: "Cota de talas",
            price: 800,
            defesa: 18,
            forca: 3,
            description: "Armadura composta de talas de metal cuidadosamente costuradas sobre um corselete de couro. É a armadura tradicional do samurai, embora exista em versões nativas de todos os reinos. Valor de Defesa 18."
        },
        {
            name: "Meia armadura",
            price: 1000,
            defesa: 19,
            forca: 4,
            description: "Combinação de cota de malha e placas de metal posicionadas sobre as áreas vitais.  Valor de Defesa 19."
        },
        {
            name: "Armadura completa",
            price: 1500,
            defesa: 20,
            forca: 5,
            description: "A mais forte e pesada, formada por placas de metal forjadas e encaixadas de modo a cobrir o corpo inteiro. Inclui manoplas e grevas, um elmo com viseira e um colete acolchoado para ser usado sob as placas. Esta armadura precisa ser feita sob medida; um ferreiro cobra 500 M.O. para adaptar uma armadura completa a um novo usuário. Bônus de Valor de Defesa 20."
        }
    ],
    "Armaduras Médias": [
        {
            name: "Gibão de peles",
            price: 250,
            bonusDefesa: 3,
            description: "Usada principalmente por bárbaros e selvagens, esta armadura é formada por várias camadas de peles e couro de animais. Bônus de Valor de Defesa + 3."
        },
        {
            name: "Couraça",
            price: 375,
            bonusDefesa: 4,
            description: "Peitoral de aço que protege o peito e as costas. Popular entre nobres e oficiais. Bônus de Valor de Defesa + 4."
        },
        {
            name: "Cota de malha",
            price: 750,
            bonusDefesa: 5,
            description: "Longa veste de anéis metálicos interligados, formando uma malha flexível e resistente, que vai até os joelhos. Bônus de Valor de Defesa + 5."
        },
        {
            name: "Brunéia",
            price: 1000,
            bonusDefesa: 6,
            description: "Colete de couro coberto com plaquetas de metal sobrepostas, como escamas de um peixe. Bônus de Valor de Defesa + 6."
        }
    ],
    "Armaduras Leves": [
        {
            name: "Armadura Acolchoada",
            price: 100,
            bonusDefesa: 1,
            description: "Composta por várias camadas de tecido sobrepostas. É a armadura mais leve, mas também é a que oferece menos proteção. Bônus de Valor de Defesa + 1."
        },
        {
            name: "Corset de Couro",
            price: 200,
            bonusDefesa: 2,
            description: "O peitoral desta armadura é feito de couro curtido, misturado com tecido para ter mobilidade. Bônus de Valor de Defesa + 2."
        },
        {
            name: "Camisa de Cota de Malha",
            price: 400,
            bonusDefesa: 3,
            description: "Versão mais leve da cota de malha, cobrindo apenas o torso. Bônus de Valor de Defesa + 3."
        },
        {
            name: "Couro Batido",
            price: 600,
            bonusDefesa: 4,
            description: "Versão mais pesada do corselete de couro, reforçada com rebites de metal. Bônus de Valor de Defesa + 4."
        },
        {
            name: "Armadura Cerimonial",
            price: 1000,
            bonusDefesa: 5,
            description: "Formada por uma couraça de bronze, aço e outros metais. Uma manga de couro e um grande elmo detalhado com viseira dão contraste ao peitoral colorido. Para efeitos de beleza e funcionalidade, a armadura de cerimonial é considerada uma armadura leve. Bônus de Valor de Defesa + 4."
        }
    ],
    "Escudos": [
        { name: "Escudo simples", description: "Concede +2 no Valor de Defesa.", price: 15, bonusDefesa: 2 },
        { name: "Escudo pesado", price: 30, description: "Ação Buscar Cobertura: posiciona no chão para cobertura completa contra um inimigo até seu próximo turno (não podendo atacar e seu movimento é reduzido pela metade).Escudo robusto que pode ser fincado no solo para proteção estática.", bonusDefesa: 2 },
        { name: "Escudo de duelo", description: "Reação: aparar um golpe para ganhar +2 no Valor de Defesa até o início do próximo turno.Escudo leve que permite aparar ataques com o braço livre.", price: 50, bonusDefesa: 1 },
    ],
    "Armas Simples": [
        { name: "Adaga", description: "Esta faca afiada é muito usada por ladrões e assassinos, por ser facilmente escondida. O personagem recebe um bônus de +4 em testes de furtividade para escondê-la com a ação Esconder. Críticos têm 3 pontos de dano adicionais após dobrar o dano causado. Será considerado acerto crítico em 19 ou 20 no rolamento.", price: 2, dano: "1d4", critico: 19 },
        { name: "Adaga de mola", description: "Esta adaga é mantida em uma tira de couro presa ao antebraço. Quando o usuário gira seu pulso de um jeito específico (ação livre), a adaga salta para sua mão. Funciona apenas uma vez por combate.", price: 4, dano: "1d4", critico: 19 },
        { name: "Arco curto", description: "Uso comum em florestas e ambientes fechados, próprio para caçadas.", price: 25, dano: "1d6", critico: 20 },
        { name: "Azagaia", price: 4, description: "Lança curta e delgada usada como arma de arremesso por caçadores.", dano: "1d6", critico: 20 },
        { name: "Bastão acolchoado", description: "Um pedaço sólido de madeira, coberto por uma camada grossa de lã, causa dano não-letão.", price: 5, dano: "1d4", critico: 20 },
        { name: "Besta leve", description: "Um arco montado sobre uma coronha de madeira com gatilho, dispara virotes com grande potência.", price: 25, dano: "1d8", critico: 20 },
        { name: "Bordão", description: "Um cajado apreciado por viajantes e camponeses; prático como uma clava e de custo zero.", price: 0, dano: "1d6", critico: 20 },
        { name: "Clava", description: "Pedaço de madeira usado como arma improvisada; custo zero.", price: 1, dano: "1d4", critico: 20 },
        { name: "Espada curta", description: "Espada de 40–50 cm, versátil e fácil de manejar.Combatente com 1 ponto em Combate Defensivo recebe +1 de acerto se usar esta arma com escudo.", price: 10, dano: "1d6", critico: 20 },
        { name: "Funda", description: "Tira de couro usada para arremessar balas de metal ou pedras.Aplica modificador de Força ao dano; colocar munição é ação.", price: 0.2, dano: "1d4", critico: 20 },
        { name: "Lança", description: "Haste com ponta afiada; facilmente fabricada e arremessável.", price: 1, dano: "1d6/1d8", critico: 20 },
        { name: "Maça", description: "Bastão metálico com peso protuberante, efetivo contra não mortos.Dobra o dano contra constructos e esqueletos.", price: 50, dano: "1d6", critico: 20 },
        { name: "Machadinha", description: "Ferramenta leve de corte que também funciona como arma arremessável.", price: 5, dano: "1d6", critico: 20 },
        { name: "Martelo leve", price: 2, dano: "1d4", critico: 20 },
        { name: "Tacape", description: "Clava grande, às vezes cravada de pregos, simples mas brutal.", price: 0, dano: "1d8", critico: 20 },
    ],
    "Armas Marciais": [
        { name: "Aji", description: "Peça metálica em forma de arco, onde a lâmina seria o arco propriamente dito e a empunhadura seria a corda. Pode ser usada em conjunto em ambas as mãos sem estilo especial.", price: 2, dano: "1d6", critico: 20 },
        { name: "Alabarda", description: "Pode usar a ação Derrubar junto ao ataque, uma vez por turno. Se o alvo estiver a 1,5 m, o dano cai para 1d8.Arma de infantaria padrão em fortificações. Haste longa com lâmina meia-lua e ponta perfurante.", price: 20, dano: "1d10", critico: 20 },
        { name: "Alfange", description: "Vantagem em manter na mão e desvantagem do oponente ao tentar desarmar.Espada de lâmina larga e curva, usada por guerreiros do Deserto.", price: 25, dano: "1d8", critico: 20 },
        { name: "Arco Longo", description: "Aplica modificador de Força em ataque e dano.Arco recurvado de materiais laminados que mantém a tensão mesmo desarmado, disparando com mais força.", price: 50, dano: "1d8", critico: 20 },
        { name: "Balestra", price: 70, dano: "1d12", critico: 18 - 20, description: "Recarregar é uma ação; crítico em 18+; aplica modificador de Força no dano.Besta com mecanismo pesado que permite usar toda a força ao engatilhar." },
        { name: "Besta de Mão", description: "Saque e ataque na mesma rodada: oponente desprevenido (uma vez por combate) e vantagem no ataque; recarregar é ação.Miniatura de besta para ocultar sob casaco, usada por nobres e assassinos.", price: 25, dano: "1d6", critico: 20 },
        {
            name: "Besta de Repetição",
            price: 100,
            dano: "1d8",
            tipo: "perfurante",
            alcance: "24/120 m",
            propriedades: ["cartucho de 10 virotes"],
            usoEspecial: "",
            description: "Trocar ou recarregar o cartucho: ação.Besta acoplada a caixa com mecanismo automático que recarrega até dez virotes."
        },
        {
            name: "Besta Pesada",
            price: 50,
            dano: "1d10",
            tipo: "perfurante",
            alcance: "30/120 m",
            propriedades: ["duas mãos"],
            usoEspecial: "",
            description: "Carregar exige uma ação ou um ataque.Versão maior e mais potente da besta leve, exige as duas mãos para usar."
        },
        { name: "Cajado de batalha", description: "Cajado de madeira reforçado com chapas de metal nas pontas, usado por andarilhos que não querem levantar suspeitas.", price: 0.2, dano: "1d4/1d6", critico: 20 },
        { name: "Chicote", description: "Pode trocar um ataque para tentar derrubar ou desarmar (60% de chance de acerto). Arma longa e flexível que pode enroscar-se no adversário, ideal para manobras de controle.", price: 10, dano: "1d4", critico: 20 },
        { name: "Cimitarra", description: "Vantagem em manter na mão e desvantagem para quem tenta desarmar. Espada de lâmina larga e curva, usada por guerreiros do Mar.", price: 25, dano: "1d4", critico: 20 },
        { name: "Corrente com Cravos", description: "Pode trocar um ataque para agarrar (DC 10 + bônus de proficiência); alvo preso só se move em direção à outra ponta ou sofre 1d4 perfurante.Corrente com pequenos espinhos, ótima para controlar e prender o inimigo.", price: 30, dano: "1d4", critico: 20 },
        { name: "Espada Bastarda", description: "Se empunhada com uma mão sem nada na outra, pode usar ação bônus para arco de corte em área (dano = mod. de Força).Espada grande e exótica, eficaz contra armaduras completas.", price: 30, dano: "1d10/1d12", critico: 20 },
        { name: "Espada Grande", description: "Golpe carregado: ao realizar um ataque pode escolher fazê-lo carregado causando o dobro do dano, entretanto perde –1 no Valor de Defesa até o próximo turno para cada ataque carregado feito. Requer Força ≥ 5 ou faça todo ataque co esta arma com desvantagem. Espada de 1,5 m, poderosa mas pesada, ideal para um único golpe decisivo.", price: 15, dano: "2d6", critico: 20 },
        { name: "Espada Longa", description: "Espada versátil e prática que pode ser usada com uma ou duas mãos.Uma vez por rodada, ao usar a ação Atacar com duas mãos, causa +1d8 de dano adicional (manobra de alavanca).", price: 50, dano: "1d8/1d10", critico: 20 },
        { name: "Florete", description: "Lâmina fina e afiada, muito precisa, usada para manobras de engano.Uma vez por combate, pode finta como ação de ataque para impor –1 em acertos contra si até o fim do turno (50% de chance de funcionar).", price: 25, dano: "1d8", critico: 20 },
        {
            name: "Florete-Agulha",
            price: 40,
            dano: "1d8",
            tipo: "perfurante",
            propriedades: ["leve", "acuidade", "espada de uma mão"],
            usoEspecial: "",
            description: "Florete com êmbolo interno que injeta veneno no alvo.Como o florete, + interno de veneno de contato (aplicar é ação inteira); inimigos têm –1 para se livrar do veneno."
        },
        {
            name: "Fogo Alquímico",
            price: 50,
            dano: "1d6",
            tipo: "impacto / fogo",
            alcance: "alcance à distância",
            propriedades: ["frágil"],
            usoEspecial: "Acerto causa condição Queimando (1d6 no fim do próximo turno); erro causa metade do dano, sem fogo.",
            description: "Frasco de substância que inflama ao contato com o ar."
        },
        { name: "Foice", description: "Foice de combate bem equilibrada, capaz de infligir ferimentos profundos.Após um ataque, como reação pode tentar causar condição Sangrando (40% de chance; não pode repetir no mesmo turno).", price: 30, dano: "1d8", critico: 18 },
        { name: "Katana", description: "Lâmina curva única, temperada e incrustada, considerada obra-prima.Obra-prima: +1 no rolamento de acerto.", price: 200, dano: "1d8/1d10", critico: 20 },
        { name: "Lança de Falange", description: "Versão longa da lança, balanceada para falange; pesada e arremessável.", price: 5, dano: "1d10/1d12", critico: 20 },
        { name: "Lança Montada", description: "Lança adaptada para uso a cavalo, permite golpe de investida poderoso.Investida montada: dano dobrado; só funciona montado (1 mão).", price: 15, dano: "2d6/1d10", critico: 20 },
        { name: "Maça Estrela", description: "Maça com espinhos pontiagudos que causam ferimentos profundos.Dobra o dano contra constructos e esqueletos.", price: 15, dano: "1d8", critico: 20 },
        { name: "Maça de Guerra", description: "Maça pesada com cabeça metálica, poderosa mas desajeitada.–1 no ataque; dobra dano contra constructos e esqueletos.", price: 30, dano: "1d12", critico: 20 },
        { name: "Machado Anão", description: "Machado favorito dos anões; pesado demais sem treino.", price: 50, dano: "1d12", critico: 20 },
        {
            name: "Machado de Batalha",
            price: 10,
            dano: "1d8 (1 mão) / 1d10 (2 mãos)",
            tipo: "corte",
            propriedades: ["versátil"],
            usoEspecial: "",
            description: "Machado grande de guerra, com chance de dano bônus no crítico. No rolamento de um 20 no d20: o ataque causa +1d6 de dano extra."
        },
        { name: "Machado Grande", description: "Imenso machado de lâmina dupla, perigoso e com chance de dano bônus no crítico.No rolamento de 0 no d20: +1d6 de dano extra (após cálculo de crítico).", price: 30, dano: "1d12", critico: 20 },
        { name: "Mangual", description: "Haste metálica ligada a esfera de aço, ideal para desarmar e combater escudos.Pode enroscar e desarmar ao atacar (uma vez por turno) e recebe +1 em acertos contra oponentes com escudos.", price: 10, dano: "1d8", critico: 20 },
        { name: "Mangual Pesado", description: "Versão mais pesada do mangual, para uso a duas mãos, com desarme e bônus contra escudos.Mesmas habilidades do mangual normal, mas usada com duas mãos.", price: 0.2, dano: "1d10", critico: 20 },
        { name: "Manopla Espada", description: "Braçadeira com lâmina paralela ao antebraço, protege o braço e oferece bônus de defesa.Concede +1 no Valor de Defesa (ou +2 se usar uma em cada braço com Regalia de Combate com Duas Armas).", price: 25, dano: "1d6", critico: 20 },
        { name: "Marreta", description: "Martelo com cabo longo e cabeça pesada, desajeitado mas poderoso contra construções.Causa dano dobrado a estruturas e construtos de pedra.", price: 5, dano: "2d6", critico: 20 },
        { name: "Marreta Estilhaçadora", description: "Grande marreta de guerra que despedaça armaduras e reduz armadura em crítico.Crítico: ao invés de multiplicar dano, reduz em 2 o bônus de armadura natural ou da armadura do alvo até o fim do próximo turno.", price: 10, dano: "2d6", critico: 20 },
        {
            "name": "Martelo",
            "price": 2,
            "dano": "1d4 impacto",
            "tipo": "impacto",
            "propriedades": ["leve", "1 mão", "dano máximo contra esqueletos e construtos de ossos"],
            "usoEspecial": "",
            description: "Ferramenta para pregos que vira arma eficaz contra esqueletos.Sempre causa dano máximo contra esqueletos e construtos de ossos."
        },
        { name: "Martelo de guerra", description: "Versão militar do martelo, preferida por anões, efetiva contra mortos-vivos.Sempre causa dano máximo contra esqueletos e construtos de ossos.", price: 15, dano: "1d8", critico: 20 },
        { name: "Mosquete", description: "Arma de uso complicado e devastadora, com longo alcance e recarga lenta.Produz enorme som ao disparar; recarregar é uma ação.", price: 500, dano: "2d8", critico: 20 },
        { name: "Nunchaku", description: "Dois bastões unidos por corrente; versátil para artes marciais com efeitos especiais para monges.Quando usado por monge, causa 1d10 de impacto e impõe desvantagem no teste para não ser atordoado.", price: 2, dano: "1d6", critico: 20 },
        { name: "Pique", description: "Lança muito longa, ideal para manter distância e punir montados.Bônus de +1 em acertos contra alvos montados ou voadores no alcance.", price: 10, dano: "1d10", critico: 20 },
        { name: "Pistola", description: "Arma de fogo leve de dois tiros, popular e beneficiada por empunhadura estável.Ganha +2 na iniciativa; se usada com duas mãos, +1 na jogada de acerto.", price: 180, dano: "1d8", critico: 20 },
        { name: "Pistola de Tambor", description: "Pistola com tambor giratório que permite até quatro disparos antes de recarregar.+2 na iniciativa quando empunhada em uma mãe e nada na outra", price: 400, dano: "1d8", critico: 20 },
        {
            "name": "Pó da Explosão Solar",
            "price": 100,
            "dano": "—",
            "tipo": "granada",
            "propriedades": ["consumível", "área 6 m", "atordoamento"],
            description: "Frasco de cerâmica com pó explosivo que ofusca e atordoa no impacto.Ao quebrar, todas as criaturas num raio de 6 m ficam atordoadas por 1 rodada."
        },
        { name: "Rede", description: "Rede com dentes na trama, usada para imobilizar e controlar inimigos.Acerto restringe e permite limitar movimento; é preciso ação completa + teste (CD 10) ou rasgar (5 PV) para liberar.", price: 1, dano: "0", critico: 20 },
        { name: "Sabre Serrilhado", description: "Lâmina dentada que rasga e prende na carne, causando dano contínuo até ser removida. No crítico, fica presa: arrancar provoca 2d4 de dano; enquanto preso, causa 1d4 a cada ação da vítima.", price: 25, dano: "1d8", critico: 20 },
        { name: "Sai", description: "Adaga em forma de garfo, ideal para prender e desarmar armas adversárias.Pode trocar um ataque pela ação desarmar; crítico em 19–20", price: 10, dano: "1d4", critico: 19 },
        { name: "Tridente", description: "Lança com múltiplas pontas, menos penetrante sem armadura, mas letal na água.+1 em acertos contra criaturas aquáticas quando em água.", price: 5, dano: "1d10", critico: 20 },
        { name: "Wakizashi", description: "versão mais curta da Katana. Junto com ela formam o Daisho, armas tradicionais do guerreiro de katana. A katana e a wakizashi são armas obra-prima (+1 acerto). Se usada em conjunto a uma katana, pode se atacar com a wakizashi na mesma ação que a katana. Ao atacar com a wakizashi desta maneira é gerado penalidade de ataque para o próximo ação de ataque como se fossem duas ações e não uma.", price: 150, dano: "1d6", critico: 20 },
    ],
    "Armas Exóticas": [
        { name: "Catapulta de Braço", description: "Recarregar é uma ação livre.Engenho halfling preso ao braço que arremessa pedras quase tão longe quanto um arco.", price: 25, dano: "1d6", critico: 20 },
        { name: "Manopla de espinhos", description: "Luva de couro com espinhos, usada por pugilistas; concede +1 no dano de ataques desarmados. Não pode sofrer desarme.", price: 10, dano: "+1 ataques desarmados", critico: 20 },
        { name: "Espada Bastarda (uma mão)", description: "Se empunhada com uma mão sem nada na outra, pode usar ação bônus para arco de corte em área (dano = mod. de Força).Espada grande e exótica, eficaz contra armaduras completas.", price: 30, dano: "1d10", critico: 20 },
        { name: "Espada Lâminas Duplas", description: "Pode fazer um ataque bônus sempre que usar a ação de atacar.Duas lâminas opostas num mesmo cabo; exige treino para evitar ferir-se.", price: 40, dano: "1d8", critico: 20 },
        { name: "Espada Diapasão", description: "Interagir com o chão como ação para fazê-la vibrar: ataques seguintes causam +1d6 até o fim do próximo turno.Espada com lâminas duplas paralelas que ressoam para desorientar oponentes.", price: 60, dano: "1d8", critico: 20 },
        { name: "Espada Táurica", description: "Espada gigantesca usada pelos campeões minotauros.Requer Força ≥ 10 ou sofre desvantagem para cada 3 pontos abaixo de 10. Se tiver força inferior a 3 não consegue manusear a espada. Desvantagem em ambientes fechados.", price: 100, dano: "3d6", critico: 20 },
        { name: "Katana (uma mão)", description: "Lâmina curva única, temperada e incrustada, considerada obra-prima.Obra-prima: +1 no rolamento de acerto.", price: 200, dano: "1d8", critico: 20 },
        { name: "Katar", description: "Punho com lâminas frontais, ideal para golpes perfurantes.Crítico triplica o dano em vez de dobrar.", price: 40, dano: "1d4", critico: 19 },
        { name: "Lança Falange (uma mão)", description: "Versão longa da lança, balanceada para falange; pesada e arremessável.", price: 5, dano: "1d8", critico: 20 },
        { name: "Lança foguete", description: "Lança com reservatório de pólvora que boosta o próximo arremesso.Ação livre ativa foguete: próximo arremesso tem alcance dobrado, vantagem e +1d6 de dano. Depois, inútil.", price: 20, dano: "1d6/1d8", critico: 20 },
        { name: "Lança Mola", description: "Haste retrátil com mola interna para ataque de curto alcance aprimorado.Ação livre dispara mola (+2 no ataque, alcance = 3 m); desmontar/regenerar mola é ação.", price: 5, dano: "1d6/1d8", critico: 20 },
        { name: "Machado Anão (uma mão)", description: "Machado favorito dos anões; pesado demais sem treino.", price: 50, dano: "1d10", critico: 20 },
        { name: "Maça Granada", description: "Maça com carga explosiva na cabeça, que detona sob grande pressão em acerto crítico.Acerto crítico: além de infligir dano dobrado, causa explosão (4d4 fogo no alvo e 2d4 fogo no usuário). Após explodir, fica inutilizada.", price: 20, dano: "1d8", critico: 20 },
        { name: "Machado Táurico", description: "Exige Força 12 ou mais para ser manuseado. Quando um atacante usando esta arma rola um acerto crítico esta arma causa 1d12 de dano extra. Esta arma de duas mãos causa 4d6 de dano cortante com alcance de 3 metros. ", price: 80, dano: "4d6", critico: 20 },
        { name: "Marreta Pistão", description: "Marreta de duas mãos com carga de vapor, poderosa contra estruturas e construtos.Ação para carregar vapor concede dupla vantagem na jogada de acerto; dano dobrado em estruturas.", price: 15, dano: "2d6", critico: 20 },
        { name: "Martelo Pistão", description: "Martelo avançado com mecanismo interno de vapor, letal contra esqueletos.Ação para carregar pistão concede dupla vantagem na jogada de acerto; dano máximo em esqueletos.", price: 40, dano: "1d10", critico: 20 },
        { name: "Montante Cinético", description: "Imensa espada com esferas internas que aumentam impacto, mas pode ferir o usuário. Em rolamento de 1 no d20, na jogada de ataque: você sofre o dano da arma (com bônus) em si mesmo.", price: 250, dano: "3d6", critico: 20 },
        { name: "Mosquetão", description: "Mosquete de cano grosso, foca em curto alcance com grande impacto, mas com desvantagem.Se errar ataque proficiente, ainda causa 1d8 perfurante sem bônus de Destreza.", price: 600, dano: "4d8", critico: 20 },
        { name: "Presa da Serpente", description: "Espada de obsidiana frágil que impõe sangramento e pode se partir em combate.Acertos causam  a condição Sangrando; se o total do ataque ≤ 8 ou falha crítica, a arma quebra.", price: 30, dano: "2d4", critico: 17 },
        { name: "Vara relâmpago", description: "Vara arcana que dispara descargas elétricas corpo a corpo, recarregável com PMs.Crítico: triplica o dano e consome 3 cargas (se não houver, descarrega tudo sem bônus).", price: 300, dano: "3d8", critico: 20 },
    ],
    "Equipamentos de Viagem": [
        { name: "Mochila", price: 1 },
        { name: "Saco de Dormir", price: 0.2 },
        { name: "Pederneira e Isqueiro", price: 0.3 },
        { name: "Algibeira", price: 0.2 },
        { name: "Rações de Viagem", price: 0.02 },
        { name: "Corda de cânhamo (15m)", price: 0.5 },
        { name: "Bolsa de água", price: 0.02 },
    ],
    "Munições": [
        { name: "Flechas (30)", price: 1 },
        { name: "Virotes (20)", price: 1 },
        { name: "Balas (20)", price: 3 },
    ],
    "Equipamento Geral": [
        { name: "Corrente (2m)", price: 0.1 },
        { name: "Caixa (1m³)", price: 0.1 },
        { name: "Arremessador de gancho", price: 0.3 },
        { name: "Martelo (carpintaria)", price: 0.1 },
        { name: "Instrumento musical", price: 1 },
        { name: "Pítons", price: 0.03 },
        { name: "Tocha", price: 0.05 },
        { name: "Vestuário fino", price: 10 },
        { name: "Frasco", price: 0.2 },
        { name: "Símbolo santo", price: 0.7 },
        { name: "Lanterna Direcional", price: 0.3 },
        { name: "Corda de seda (2m)", price: 0.8 },
        { name: "Tenda", price: 0.7 },
        { name: "Ferramentas para Ladrões", price: 3 },
    ],
    "Montaria": [
        { name: "Camelo", price: 50, velocidade: "9m", carga: 140 },
        { name: "Burro ou mula", price: 8, velocidade: "7.5m", carga: 160 },
        { name: "Elefante", price: 200, velocidade: "12m", carga: 660 },
        { name: "Cavalo", price: 50, velocidade: "12m", carga: 270 },
        { name: "Lagarto Açu", price: 75, velocidade: "15m", carga: 240 },
        { name: "Mastiff", price: 25, velocidade: "9m", carga: 97 },
        { name: "Pônei", price: 30, velocidade: "6m", carga: null }, // Faltou info
    ],
    "Kits": [
        {
            name: "Kit Médico",
            description: "Inclui bandagens, anti sépticos, tesoura médica e outros itens para primeiros socorros.",
            price: 50
        },
        {
            name: "Kit de Herborista",
            description: "Contém ervas medicinais, pilão, mortalha e outros itens para preparar remédios naturais.",
            price: 20
        },
        {
            name: "Kit de Sobrevivência",
            description: "Inclui faca, corda, fósforos, cantil e outros itens essenciais para sobreviver ao ar livre.",
            price: 30
        },
        {
            name: "Kit de Ferramentas",
            description: "Contém martelo, chave de fenda, alicate e outros itens úteis para consertar e construir objetos.",
            price: 25
        },
        {
            name: "Kit de Alquimista",
            description: "Inclui frascos vazios, substâncias químicas básicas, tubos de ensaio e outros itens para alquimia.",
            price: 60
        },
        {
            name: "Kit de Ladrão",
            description: "Contém ferramentas de arrombamento, pés de cabra, cordas e outros itens para atividades furtivas.",
            price: 40
        },
        {
            name: "Kit de Explorador",
            description: "Inclui bússola, mapa, binóculos e outros itens para exploração e orientação em território desconhecido.",
            price: 35
        },
        {
            name: "Kit de Disfarces",
            description: "Contém roupas variadas, perucas, maquiagem e outros itens para se disfarçar e passar despercebido.",
            price: 50
        },
        {
            name: "Kit de Músico",
            description: "Inclui instrumentos musicais, partituras, cordas de reposição e outros itens para tocar música.",
            price: 55
        },
        {
            name: "Kit de Arrombamento",
            description: "Contém ferramentas especializadas, como pés de cabra, ganzúas e chave de fenda para abrir fechaduras.",
            price: 45
        },
        {
            name: "Kit de Cartografia",
            description: "Inclui pergaminhos, pena, tinta e outros itens para desenhar mapas e fazer anotações.",
            price: 30
        },
        {
            name: "Kit de Venenos",
            description: "Contém frascos de veneno, luvas, aplicadores e outros itens para lidar com substâncias tóxicas.",
            price: 70
        },
        {
            name: "Kit de Engenhocas",
            description: "Inclui engrenagens, molas, fios e outros itens para criar dispositivos e armadilhas improvisadas.",
            price: 60
        },
        {
            name: "Kit de Escalada",
            description: "Contém cordas, mosquetões, ganchos e outros itens para escalada e rapel.",
            price: 40
        },
        {
            name: "Kit de Caça",
            description: "Inclui armadilhas, armas de caça, iscas e outros itens para caçar e rastrear animais.",
            price: 45
        },
        {
            name: "Kit de Sobrevivência Aquática",
            description: "Contém nadadeiras, redes de pesca, arpão e outros itens para sobreviver em ambientes aquáticos.",
            price: 50
        }
    ]
};
function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`character-tabpanel-${index}`}
            aria-labelledby={`character-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const CharCreationPage = () => {

    const [age, setAge] = React.useState(18);
    const [tabIndex, setTabIndex] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [image, setImage] = useState(null);
    const [especieSelecionada, setEspecieSelecionada] = useState('humano');
    var inicialMoney = 450;
    var goldLimit = inicialMoney || 450;
    const MAX_POINTS = 40;
    const MAX_PROF_POINTS = 4;
    const fileInputRef = useRef();
    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };
    const handleChangeShop = (category, item) => {
        const key = `${category}-${item.name}`;
        const index = selectedItems.findIndex(i => i.key === key);

        if (index !== -1) {
            const existingItem = selectedItems[index];
            const newTotal = totalSpent() + item.price;
            if (newTotal <= goldLimit) {
                const updatedItems = [...selectedItems];
                updatedItems[index] = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1
                };
                setSelectedItems(updatedItems);
            }
        } else {
            const newTotal = totalSpent() + item.price;
            if (newTotal <= goldLimit) {
                setSelectedItems(prev => [...prev, {
                    key,
                    category,
                    ...item,
                    quantity: 1
                }]);
            }
        }
    };
    const handleRemove = (item) => {
        const index = selectedItems.findIndex(i => i.key === item.key);
        if (index !== -1) {
            const updatedItems = [...selectedItems];
            if (updatedItems[index].quantity > 1) {
                updatedItems[index].quantity -= 1;
            } else {
                updatedItems.splice(index, 1);
            }
            setSelectedItems(updatedItems);
        }
    };
    const totalSpent = () => selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const processFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        processFile(e.dataTransfer.files[0]);
    }, []);
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        processFile(e.target.files[0]);
    };
    const handleAgeChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value >= 18) {
            setAge(value);
        } else {
            setAge(18);
        }
    };
    const handleChange = (event) => {
        setEspecieSelecionada(event.target.value);
    };
    const handleRegaliasUpdate = ({ regalias, comprada }) => {
        console.log('Regalias selecionadas:', regalias);
        console.log('Regalia comprada:', comprada);
    };
    function ProfessionContainer() {
        const [selectedId, setSelectedId] = React.useState('');

        const handleToggle = (profissao, habNome) => {
            const id = `${profissao}::${habNome}`;
            setSelectedId(prev => prev === id ? '' : id);
        };

        return (
            <Box sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    {profissoes.map((prof) => (
                        <Grid item xs={12} md={6} key={prof.nome}>
                            <Card
                                variant={selectedId.startsWith(prof.nome + '::') ? 'outlined' : 'elevation'}
                                sx={{
                                    borderBottom: '6px solid #7B3311',
                                    height: '320px',
                                    overflowY: 'scroll',
                                    background: '#EDEDED',
                                    borderColor: selectedId.startsWith(prof.nome + '::') ? 'primary.main' : undefined
                                }}
                            >
                                <CardHeader title={prof.nome} subheader={`Ambiente: ${prof.ambiente || prof.ambienteEmprego}`} />
                                <CardContent>
                                    {prof.habilidades
                                        .filter(hab => {
                                            const nome = hab.nome;

                                            // Filtro por nível
                                            const nivelMatch = nome.match(/Nível (\d+)/i);
                                            if (nivelMatch && parseInt(nivelMatch[1], 10) >= 2) return false;

                                            // Filtro por "+X"
                                            const plusMatch = nome.match(/\+(\d+)/);
                                            if (plusMatch && parseInt(plusMatch[1], 10) >= 2) return false;

                                            return true;
                                        })
                                        .map((hab) => {
                                            const id = `${prof.nome}::${hab.nome}`;
                                            return (
                                                <Box key={id} mb={1}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={selectedId === id}
                                                                onChange={() => handleToggle(prof.nome, hab.nome)}
                                                            />
                                                        }
                                                        label={
                                                            <Box>
                                                                <Typography variant="subtitle2" component="div">
                                                                    {hab.nome}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {hab.descricao}
                                                                </Typography>
                                                            </Box>
                                                        }
                                                    />
                                                </Box>
                                            );
                                        })}


                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }
    const ProfBox = ({ nome, descricao, notas, niveis, value, onChange, remainingPoints, borderColor = '#7B3311' }) => (
        <Paper
            elevation={3}
            sx={{ padding: 2, mx: 0, width: '24.5%', my: 1, borderBottom: `6px solid ${borderColor}` }}
        >
            <Typography variant="h6" gutterBottom>
                {nome}
            </Typography>
            <Typography variant="body2" gutterBottom>
                {descricao}
            </Typography>
            {notas?.length > 0 && (
                <Box mb={1}>
                    {notas.map((nota, idx) => (
                        <Typography key={idx} variant="caption" display="block">
                            • {nota}
                        </Typography>
                    ))}
                </Box>
            )}
            <Box display="flex" alignItems="center" gap={1} mt={1}>
                <TextField
                    label="Nível"
                    type="number"
                    size="small"
                    value={value}
                    onChange={(e) => onChange(nome, parseInt(e.target.value) || 0)}
                    inputProps={{ min: 0, max: niveis.length, step: 1 }}
                    sx={{ width: '80px' }}
                />
                <Typography variant="body2" color={remainingPoints === 0 ? 'error' : 'textSecondary'}>
                    Restam: {remainingPoints}
                </Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap={1} mt={1}>
                {niveis.map(({ nivel, descricao: nivelDesc }) => (
                    <Typography
                        key={nivel}
                        variant="body2"
                        sx={{ opacity: value >= nivel ? 1 : 0.5 }}
                    >
                        {nivel}. {nivelDesc}
                    </Typography>
                ))}
            </Box>
        </Paper>
    );
    const ProfContainer = ({ proficiencias }) => {
        const [values, setValues] = React.useState(
            proficiencias.reduce((acc, prof) => ({ ...acc, [prof.nome]: 0 }), {})
        );

        const totalUsed = Object.values(values).reduce((sum, v) => sum + v, 0);
        const remainingPoints = MAX_PROF_POINTS - totalUsed;

        const handleChange = (nome, newVal) => {
            if (newVal < 0) newVal = 0;
            if (newVal > proficiencias.find(p => p.nome === nome).niveis.length) {
                newVal = proficiencias.find(p => p.nome === nome).niveis.length;
            }
            const prevVal = values[nome];
            const delta = newVal - prevVal;
            if (delta <= remainingPoints) {
                setValues(prev => ({ ...prev, [nome]: newVal }));
            }
        };

        return (
            <Box display="flex" flexWrap="wrap" sx={{ justifyContent: 'start', gap: 1, width: '100%' }}>
                {proficiencias.map((prof, idx) => (
                    <ProfBox
                        key={idx}
                        nome={prof.nome}
                        descricao={prof.descricao}
                        notas={prof.notas}
                        niveis={prof.niveis}
                        value={values[prof.nome]}
                        onChange={handleChange}
                        remainingPoints={remainingPoints}
                        borderColor={prof.borderColor}
                    />
                ))}
            </Box>
        );
    };
    const AtributoBox = ({ title, data, values, onChange, remainingPoints, borderColor = "#7B3311", onCheckboxClick, isChecked }) => {
        const handleCheckboxChange = () => {
            onCheckboxClick(data, title, !isChecked);
        };

        return (
            <Paper
                elevation={3}
                sx={{
                    padding: 2,
                    mx: 0,
                    width: "19.5%",
                    my: 1,
                    borderBottom: `10px solid ${borderColor}`
                }}
            >
                <Typography variant="h6" gutterBottom className="esteban" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {title}
                    <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
                </Typography>
                <Typography
                    variant="body2"
                    color={remainingPoints === 0 ? "error" : "textSecondary"}
                    className="bigBoxTextClasses"
                >
                    Pontos restantes: {remainingPoints}
                </Typography>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    {data.map((item, index) => (
                        <Box
                            key={index}
                            gap={2}
                            sx={{
                                justifyContent: "space-around",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <Tooltip title={item.description} arrow placement="right">
                                <Typography sx={{ width: "200px", textAlign: "start" }} className="bigBoxTextClasses">
                                    {item.title}
                                </Typography>
                            </Tooltip>
                            <TextField
                                label="Valor"
                                type="number"
                                size="small"
                                value={values[item.title]}
                                onChange={(e) => onChange(item.title, e.target.value)}
                                sx={{ width: "100px" }}
                                inputProps={{
                                    min: 0,
                                    max: values[item.title] + remainingPoints
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Paper>
        );
    };
    const calculateCustoEscalonado = (valor) => {
        let custo = 0;
        for (let i = 1; i <= valor; i++) {
            if (i <= 4) custo += 1;
            else if (i === 5) custo += 2;
            else if (i === 6) custo += 3;
            else custo += 4;
        }
        return custo;
    };
    const AtributoContainer = ({ atributos }) => {
        const [allValues, setAllValues] = React.useState(
            Object.fromEntries(
                atributos.flatMap((grupo) => grupo.data.map((item) => [item.title, 0]))
            )
        );

        const [autoIncrementedValues, setAutoIncrementedValues] = React.useState(
            Object.fromEntries(
                atributos.flatMap((grupo) => grupo.data.map((item) => [item.title, 0]))
            )
        );

        const [checkedGroups, setCheckedGroups] = React.useState({});
        const [checkedOrder, setCheckedOrder] = React.useState([]);

        const getTotalUsed = () => {
            return Object.entries(allValues).reduce((acc, [title, val]) => {
                const auto = autoIncrementedValues[title] || 0;
                return acc + calculateCustoEscalonado(val - auto);
            }, 0);
        };

        const remainingPoints = MAX_POINTS - getTotalUsed();

        const handleChange = (title, newValue) => {
            newValue = parseInt(newValue) || 0;
            const auto = autoIncrementedValues[title] || 0;

            if (newValue < auto) return;

            setAllValues((prev) => {
                const previousValue = prev[title];
                const newCusto = calculateCustoEscalonado(newValue - auto);
                const prevCusto = calculateCustoEscalonado(previousValue - auto);
                const deltaCusto = newCusto - prevCusto;

                if (deltaCusto <= 0 || (getTotalUsed() + deltaCusto <= MAX_POINTS)) {
                    return { ...prev, [title]: newValue };
                }

                return prev;
            });
        };

        const handleCheckboxClick = (grupoData, grupoTitle, novoStatus) => {
            let updatedChecked = { ...checkedGroups };
            let newOrder = [...checkedOrder];

            if (novoStatus) {
                // Ativando um novo grupo

                // Se já há 2 ativos, remover o mais antigo
                if (newOrder.length >= 2) {
                    const oldest = newOrder.shift();
                    updatedChecked[oldest] = false;

                    // Limpa os atributos do grupo removido
                    const grupoRemovido = atributos.find(g => g.title === oldest);
                    if (grupoRemovido) {
                        grupoRemovido.data.forEach(item => {
                            setAutoIncrementedValues(prev => ({ ...prev, [item.title]: 0 }));
                            setAllValues(prev => {
                                const currentManual = Math.max(0, (prev[item.title] || 0) - (autoIncrementedValues[item.title] || 0));
                                return { ...prev, [item.title]: currentManual };
                            });
                        });
                    }
                }

                updatedChecked[grupoTitle] = true;
                newOrder.push(grupoTitle);

                // Aplica autoIncremento ao grupo atual
                grupoData.forEach((item) => {
                    setAutoIncrementedValues(prev => ({ ...prev, [item.title]: 1 }));
                    setAllValues(prev => {
                        const currentManual = Math.max(0, (prev[item.title] || 0) - (autoIncrementedValues[item.title] || 0));
                        return { ...prev, [item.title]: currentManual + 1 };
                    });
                });

            } else {
                // Desmarcando manualmente
                updatedChecked[grupoTitle] = false;
                newOrder = newOrder.filter(title => title !== grupoTitle);

                grupoData.forEach((item) => {
                    setAutoIncrementedValues(prev => ({ ...prev, [item.title]: 0 }));
                    setAllValues(prev => {
                        const currentManual = Math.max(0, (prev[item.title] || 0) - (autoIncrementedValues[item.title] || 0));
                        return { ...prev, [item.title]: currentManual };
                    });
                });
            }

            setCheckedGroups(updatedChecked);
            setCheckedOrder(newOrder);
        };


        return (
            <Box display="flex" flexWrap="wrap" sx={{ justifyContent: 'space-between', width: '100%' }}>
                {atributos.map((grupo, index) => (
                    <AtributoBox
                        key={index}
                        title={grupo.title}
                        data={grupo.data}
                        values={allValues}
                        onChange={handleChange}
                        remainingPoints={remainingPoints}
                        borderColor={grupo.borderColor}
                        onCheckboxClick={handleCheckboxClick}
                        isChecked={!!checkedGroups[grupo.title]}
                    />
                ))}
            </Box>
        );
    }
    const RegaliaDeEspecie = ({ data }) => {
        const [regaliaEscolhida, setRegaliaEscolhida] = React.useState('');

        return (
            <Box>
                <Typography className="bigBoxTextEquipsHeader" sx={{ mb: 2 }}>
                    Escolha uma entre:
                </Typography>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Regalia Obrigatória</FormLabel>
                    <RadioGroup
                        name="regalia-escolhida"
                        value={regaliaEscolhida}
                        onChange={(e) => setRegaliaEscolhida(e.target.value)}
                    >
                        {/* Regalias Obrigatórias */}
                        {data.obrigatorias.map((opcao) => (
                            <FormControlLabel
                                key={opcao.id}
                                value={opcao.id}
                                control={<Radio />}
                                label={
                                    <div>
                                        <strong>{opcao.nome}</strong><br />
                                        <Typography variant="body2">{opcao.descricao}</Typography>
                                    </div>
                                }
                                sx={{ alignItems: 'flex-start', my: 2 }}
                            />
                        ))}
                        <Box>
                            <Typography variant="h6" className="bigBoxTextClasses" sx={{ mb: 2 }}>

                                REGALIAS OPCIONAIS DE ESPÉCIE
                            </Typography>
                            <Typography className="bigBoxTextClasses">
                                Aqui o jogador pode encontrar opções para personalizar ainda mais seus personagens. A seguir temos várias opções que podem substituir a Regalia obrigatória de uma espécie. Assim sendo, como um exemplo,  o personagem pode ser humano e começar com uma das opções abaixo ao invés das que estão inicialmente disponíveis para ele.
                                Ao escolher uma das opções abaixo é proibido escolher uma das outras. Após trocar a regalia inicial de classe, adicione as outras opções que sobraram da lista de escolhas para regalias de sua espécie original.

                            </Typography>
                        </Box>
                        {/* Regalias Especiais agrupadas por tipo */}
                        {regaliasOpcionais.regalias_opcionais.map((grupo) => (
                            <Box key={grupo.tipo} sx={{ mt: 3, display: 'flex', flexDirection: 'column', flexWrap: 'nowrap' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    Regalias Especiais - {grupo.tipo}
                                </Typography>
                                {grupo.observacao &&
                                    <Typography sx={{ mb: 1 }}>
                                        {grupo.observacao}
                                    </Typography>}
                                {grupo.penalidade &&
                                    <Typography sx={{ mb: 1 }}>
                                        {grupo.penalidade}
                                    </Typography>}
                                <Typography sx={{ mb: 1 }}>
                                    {grupo.descricao}
                                </Typography>
                                {grupo.opcoes.map((opcao) => (
                                    <FormControlLabel
                                        key={opcao.nome}
                                        value={opcao.nome}
                                        control={<Radio />}
                                        label={
                                            <Box>
                                                <strong>{opcao.nome}</strong>
                                                <Typography variant="body2" sx={{ mt: 0.5 }}>
                                                    {opcao.descricao.trim()}
                                                </Typography>
                                            </Box>
                                        }
                                        sx={{ alignItems: 'flex-start', my: 1 }}
                                    />
                                ))}
                            </Box>
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>
        );
    };
    const AprendizClass = ({ onRegaliaChange }) => {
        const [RegaliasDeAprendiz, setRegaliasDeAprendiz] = useState([]);
        const [RegaliaComprada, setRegaliaComprada] = useState('');

        const handleRegaliaChange = (regaliaId) => {
            const alreadySelected = RegaliasDeAprendiz.includes(regaliaId);

            if (alreadySelected) {
                const updated = RegaliasDeAprendiz.filter((id) => id !== regaliaId);
                setRegaliasDeAprendiz(updated);
                onRegaliaChange({ regalias: updated, comprada: RegaliaComprada });
            } else {
                if (RegaliasDeAprendiz.length < 2) {
                    const updated = [...RegaliasDeAprendiz, regaliaId];
                    setRegaliasDeAprendiz(updated);
                    onRegaliaChange({ regalias: updated, comprada: RegaliaComprada });
                }
            }
        };
        const regaliasDeAprendiz = [
            {
                id: 'combatente',
                nome: 'Combatente Aprendiz',
                descricao: `1 ponto em Força, Fortitude ou Destreza.
                1 ponto em Combate Corpo a Corpo ou Combate À Distância.
                Proficiência em Armas Marciais, Armaduras Leves e Médias, e Escudo Simples.
                Habilidade: Recuperar Fôlego – Ação de turno completo para recuperar 4 PV (custa 2 Magia). Pode recuperar também 4 Estamina por mais 2 Magia.`
            },
            {
                id: 'novico',
                nome: 'Noviço(a) Aprendiz',
                descricao: `1 ponto em Teologia, Arcanismo ou Medicina.
                1 ponto em Combate Arcano, Corpo a Corpo ou Distância.
                Milagres: 
                - Abençoar Água: sagrada por 1h, usada para encantar arma ou causar 1d12 em mortos-vivos.
                - Facilitar Cura: cura até 4d6 PV de até 2 criaturas (10 min, 2 Magia).
                - Tocha Sagrada: ilumina e cega mortos-vivos no 1º turno.`
            },
            {
                id: 'iniciado',
                nome: 'Iniciado(a) Aprendiz',
                descricao: `1 ponto em Arcanismo, Ritualismo ou Apuração de Itens Mágicos.
                1 ponto em Combate Arcano.
                Magias:
                - Míssil Arcano: 1d4 por míssil (2 Magia cada, até 5).
                - Detectar Magia: detecta e identifica magia (2–6 Magia).
                - Iluminação Arcana: cria luz por 1h (1 Magia).`
            },
            {
                id: 'feiticeiro',
                nome: 'Feiticeiro(a) Aprendiz',
                descricao: `1 ponto em Ocultismo ou Ritualismo.
                1 ponto em Combate Arcano.
                Feitiços:
                - Orbe Caótico: 2d6 de dano de elemento aleatório (2 Magia).
                - Azaralhar: alvo atordoado até próximo turno (4 Magia + chance).
                - Luz Guia: cria luz por 1h (1 Magia).`
            },
            {
                id: 'diplomata',
                nome: 'Diplomata Aprendiz',
                descricao: `2 pontos em Persuasão ou Enganação.
                1 ponto em Negociação.
                2 pontos em Sedução e Intimidação.
                Habilidade: Barganhar – negociação com serviços (não mercadorias), 1x por pessoa/semana.
                Rolamento define desconto: 5% com sucesso moderado, maiores descontos com rolagens maiores.`
            },
            {
                id: 'explorador',
                nome: 'Explorador Aprendiz',
                descricao: `2 pontos em Rastreamento ou Investigação.
                1 ponto em Sobrevivência e Navegação.
                2 Pontos em Percepção ou Furtividade.
                Proficiente com kit de arrombamento.
                Aprende a Habilidade:
                Visão para abrigo:
                Um explorador aprendiz consegue procurar um abrigo natural para proteger dos elementos. Se for calor demais que possa causar exaustão ele consegue achar um lugar para refrescar ou isolar do calor, ou então se for frio demais um abrigo quente para não sofrer com  a temperatura. A chance de sucesso é de 100%. E se não houver abrigos naturais, ele pode criar um com elemenos locais, mesmo se não tiver itens de acampamento.  Além disso, um explorador aprendiz tem um bônus de + 2 em testes de sobrevivência para achar comida e água caso exista.
                `
            },
            {
                id: 'academico',
                nome: 'Acadêmico Aprendiz',
                descricao: `2 pontos em História ou Intuição
                1 ponto em Jurisprudência e Teologia
                2 Pontos em Medicina ou Natureza
                Aprende a Habilidade:
                Já li sobre isso:
                Um acadêmico tem +2 em qualquer rolamento de conhecimento. Um acadêmico também recebe + 3 em testes de persuasão que o ajude a entrar em uma biblioteca, templo ou centro acadêmico com conhecimento registrado de alguma forma.
                ` // Placeholder, adicione os detalhes aqui quando disponíveis
            },
            {
                id: 'guardarPonto',
                nome: 'Guardar ponto',
                descricao: `Guarda este ponto de regalia para o próximo nível` // Placeholder, adicione os detalhes aqui quando disponíveis
            },
        ];

        const handleCompradaChange = (event) => {
            const value = event.target.value;
            setRegaliaComprada(value);
            onRegaliaChange({ regalias: RegaliasDeAprendiz, comprada: value });
        };

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', m: 3 }}>


                <FormControl component="fieldset" sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', m: 3 }}>
                    <FormLabel component="legend">Escolha até duas regalias de aprendiz</FormLabel>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', m: 3, width: '50%' }}>
                        {regaliasDeAprendiz.map((sc) => {
                            const checked = RegaliasDeAprendiz.includes(sc.id);
                            return (
                                <FormControlLabel
                                    key={sc.id}
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={() => handleRegaliaChange(sc.id)}
                                        />
                                    }
                                    label={
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                {sc.nome}
                                            </Typography>
                                            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                                                {sc.descricao}
                                            </Typography>
                                        </Box>
                                    }
                                    sx={{ alignItems: 'flex-start', my: 1 }}
                                />
                            );
                        })}
                    </Box>
                </FormControl>

                {/* <FormControl component="fieldset">
              <FormLabel component="legend">Regalia comprada (opcional)</FormLabel>
              <RadioGroup value={RegaliaComprada} onChange={handleCompradaChange}>
                {regaliasDeAprendiz.map((sc) => (
                  <FormControlLabel
                    key={sc.id}
                    value={sc.id}
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {sc.nome}
                        </Typography>
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                          {sc.descricao}
                        </Typography>
                      </Box>
                    }
                    sx={{ alignItems: 'flex-start', my: 1 }}
                  />
                ))}
              </RadioGroup>
            </FormControl> */}
            </Box>
        );
    };
    function NavigationButtons() {

        const handleNext = () => {
            if (tabIndex < 6) {
                setTabIndex(prev => prev + 1);
            }
        };

        const handlePrevious = () => {
            if (tabIndex > 0) {
                setTabIndex(prev => prev - 1);
            }
        };

        return (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ display: 'flex', justifyContent: 'center', py: '1', my: 4 }}>
                {tabIndex > 0 && (
                    <Button variant="outline" className="navagationButtons" onClick={handlePrevious}>
                        Anterior
                    </Button>
                )}
                {tabIndex < 6 && (
                    <Button variant="outline" className="navagationButtons" onClick={handleNext}>
                        Próximo
                    </Button>
                )}
            </Stack>
        );
    }
    function ShopForm() {
        return (
            <Box sx={{ width: '100%', position: 'relative' }}>
                <Box my={4}>
                    <Typography className="esteban" variant="h4" gutterBottom>
                        Loja de Itens
                    </Typography>

                    <Typography className="esteban" variant="h6" color={totalSpent() > goldLimit ? "error" : "primary"}>
                        Total: {totalSpent().toFixed(2)} M.O. / {inicialMoney} M.O.
                    </Typography>
                    <Typography className="esteban" sx={{ my: 2 }}>
                        Atenção:<br />
                        Armaduras pesadas requerem um mínimo de força, se usadas sem esse pré requisito sofre as seguintes penalidades:<br />
                        -1,5 m de velocidade de  movimento por ponto de força abaixo do requerido.<br />
                        -1 em rolamento de acerto de qualquer teste de combate por ponto de força abaixo do requerimento.<br />
                        Requer duas ações para usar a ação andar/correr ao invés de apenas uma.<br />

                        Armaduras pesadas, mesmo se atingir o requerimento de força, sofrem penalidade em testes de furtividade de -5 e armaduras médias sofrem uma penalidade de -2.<br />
                        Se uma criatura que não receber capacidade de usar um tipo de armadura usá-la mesmo assim se torna incapaz de conjurar magias, milagres, feitiços, manobras e quaisquer habilidades. Além disso, todo rolamento de habilidade possui desvantagem.

                    </Typography>
                    <Box mt={4}>
                        <Typography className="esteban" variant="h5">Itens Selecionados:</Typography>
                        {selectedItems.length === 0 ? (
                            <Typography className="esteban">Nenhum item selecionado.</Typography>
                        ) : (
                            selectedItems.map(item => (

                                <Chip
                                    key={item.key}
                                    label={`${item.name} x${item.quantity} (${(item.price * item.quantity).toFixed(2)} M.O.)`}
                                    onDelete={() => handleRemove(item)}
                                    sx={{ m: 0.5 }}
                                />
                            ))
                        )}
                    </Box>

                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                            backgroundColor: 'white',
                            padding: 4,
                            borderRadius: 2,
                            boxShadow: 3,
                            zIndex: 1000,
                            maxWidth: '300px',
                            minWidth:'250px'
                        }}
                    >
                        <Typography className="esteban" variant="h5" sx={{color:'#7B3311 !important'}}>
                            Inventário
                        </Typography>
                        <Typography className="esteban" variant="subtitle" color={totalSpent() > goldLimit ? "error" : "primary"} sx={{fontSize:'12px !important'}}>
                            Total: {totalSpent().toFixed(2)} M.O. / {inicialMoney} M.O.
                        </Typography>
                        <Box mt={1}>
                            <Typography className="esteban" sx={{ fontSize: '12px !important' }} variant="subtitle1">Itens Selecionados:</Typography>
                            {selectedItems.length === 0 ? (
                                <Typography className="esteban" sx={{ fontSize: '12px !important' }} variant="body2">Nenhum item selecionado.</Typography>
                            ) : (
                                selectedItems.map(item => (
                                    <Chip
                                        key={item.key}
                                        label={`${item.name} x${item.quantity} (${(item.price * item.quantity).toFixed(2)} M.O.)`}
                                        onDelete={() => handleRemove(item)}
                                        sx={{ m: 0.5 }}
                                    />
                                ))
                            )}
                        </Box>
                    </Box>


                    {Object.entries(categories).map(([category, items]) => (
                        <Box key={category} my={3} >
                            <Typography className="esteban" sx={{ color: '#40150A', my: 3 }} variant="h6">{category}</Typography>
                            <Grid container spacing={1} sx={{ display: 'flex !important', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'start', gap: 1 }}>
                                {items.map(item => {
                                    const key = `${category}-${item.name}`;
                                    const selected = selectedItems.some(i => i.key === key);
                                    const disabled = totalSpent() + item.price > goldLimit;
                                    const forcaRequisito = item.forca ? `Requisito de força: ${item.forca}` : ""
                                    return (
                                        item.description ?
                                            <Tooltip title={`${item.description} ${forcaRequisito}`}>
                                                <Box sx={{ width: 'fitContent' }} key={key} >

                                                    <Button
                                                        className="esteban"
                                                        variant={selected ? "contained" : "outlined"}
                                                        color={disabled ? "inherit" : "primary"}
                                                        disabled={disabled}
                                                        onClick={() => handleChangeShop(category, item)}
                                                        sx={{ fontSize: '14px !important', background: selected ? "#40150A" : "#EDEDED", }}
                                                    >
                                                        {item.name} ({item.price} M.O.)
                                                    </Button>

                                                </Box>
                                            </Tooltip> :
                                            <Box sx={{ width: 'fitContent' }} key={key} >

                                                <Button
                                                    className="esteban"
                                                    variant={selected ? "contained" : "outlined"}
                                                    color={disabled ? "inherit" : "primary"}
                                                    disabled={disabled}
                                                    onClick={() => handleChangeShop(category, item)}
                                                    sx={{ fontSize: '14px !important', background: selected ? "#40150A" : "#EDEDED", }}
                                                >
                                                    {item.name} ({item.price} M.O.)
                                                </Button>

                                            </Box>
                                    );
                                })}
                            </Grid>
                            <Divider sx={{ my: 2 }} />
                        </Box>
                    ))}

                </Box>
            </Box>
        );
    }
    return (
        <Box sx={{ width: '100%', minHeight: '900px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', m: 'auto' }}>
            {/* User header */}
            <Box sx={{ width: '90%', mx: 'auto' }}>
                <Typography variant="h4" className="MainTitleC" sx={{ mt: 4 }}>Criação de personagem</Typography>
                <NavigationButtons sx={{ width: '100%' }} />
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="character creation tabs"
                >
                    <Tab className="tabs" label="Informações Básicas" id="character-tab-0" aria-controls="character-tabpanel-0" />
                    <Tab className="tabs" label="Habilidades" id="character-tab-1" aria-controls="character-tabpanel-1" />
                    <Tab className="tabs" label="Proficiências" id="character-tab-3" aria-controls="character-tabpanel-2" />
                    <Tab className="tabs" label="Espécie" id="character-tab-4" aria-controls="character-tabpanel-3" />
                    <Tab className="tabs" label="Aprendiz" id="character-tab-5" aria-controls="character-tabpanel-4" />
                    <Tab className="tabs" label="Profissão" id="character-tab-6" aria-controls="character-tabpanel-5" />
                    <Tab className="tabs" label="Equipamentos" id="character-tab-7" aria-controls="character-tabpanel-6" />
                </Tabs>
                <Box >
                    <TabPanel value={tabIndex} index={0}>

                        <Grid container spacing={2} sx={{ height: '400px' }}>
                            <Grid item xs={6}>
                                <Grid container spacing={2} sx={{ height: '100%' }} >
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="Nome do Personagem" name="nome_personagem" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        {age == 18 ?
                                            <Tooltip title="Idade mínima para fazer sentido estar em um aventura no sistema LDO.">
                                                <TextField
                                                    fullWidth
                                                    type="number"
                                                    inputProps={{
                                                        min: 18
                                                    }}
                                                    label="idade"
                                                    name="idade"
                                                    defaultValue="18"
                                                    value={age}
                                                    onChange={handleAgeChange}
                                                />
                                            </Tooltip> :
                                            <TextField
                                                fullWidth
                                                type="number"
                                                inputProps={{
                                                    min: 18
                                                }}
                                                label="idade"
                                                name="idade"
                                                defaultValue="18"
                                                value={age}
                                                onChange={handleAgeChange}
                                            />
                                        }

                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="genêro" name="genero" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="Nível" name="nivel" defaultValue={1} disabled />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField multiline rows={9} fullWidth label="Descrição" name="descricao" sx={{ height: '250px' }} />
                                    </Grid>

                                </Grid>

                            </Grid>
                            <Grid item xs={6}>
                                <Box
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    sx={{
                                        border: '2px dashed #BB8130',
                                        borderRadius: 2,
                                        padding: 2,
                                        textAlign: 'center',
                                        bgcolor: '#756A3422',
                                        position: 'relative',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        maxHeight: '600px'
                                    }}
                                >
                                    <Box>
                                        <Typography variant="body1" sx={{ mb: 1 }}>
                                            Arraste e solte uma imagem aqui
                                        </Typography>

                                        <Button variant="text" sx={{ width: 'fit-content', marginX: 'auto' }} onClick={handleButtonClick}>
                                            Selecionar imagem
                                        </Button>
                                    </Box>


                                    {/* Input escondido para seleção por botão */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        style={{ display: 'none', }}
                                    />

                                    {image && (
                                        <Box
                                            component="img"
                                            src={image}
                                            alt="Imagem do personagem"
                                            sx={{ mt: 2, maxWidth: '50%', margin: '0 auto', borderRadius: 1, maxHeight: '300px' }}
                                        />
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={1}>
                        <Typography className="bigBoxTextClasses">
                            Um personagem com zero pontos em uma Habilidade não é proficiente nesta Habilidade. Essa informação é relevante para as regras, habilidades e ações que exigem que o personagem seja proficiente com a habilidade.Um jogador só pode pedir ao mestre testes em Habilidades que sejam proficientes, caso contrário somente fará testes que lhe forem exigidos pelas situações enfrentadas no jogo.
                        </Typography>
                        <ListItem sx={{ px: 0 }} className="esteban">
                            Escolha dois dos Grupos de Habilidade (Físico, Conhecimento, Exploração, Arcana ou Social). Receba 1 ponto de habilidade em cada uma das Habilidades do Grupo. Esses incrementos são considerados os primeiros incrementos para propósitos de distribuição de pontos de Habilidade.
                            Ao atingir o Nível 7 escolha um nova aba, diferente das opções escolhidas no nível 1, para receber o mesmo incremento.<br />
                        </ListItem>
                        <ListItem sx={{ px: 0 }} className="esteban">

                            Aloque 40 pontos em Habilidades ou Proficiências. Ao alocar os pontos de habilidade, siga as regras a seguir:
                            Depois do quarto incremento em uma Habilidade, são necessários 2 pontos de habilidade para o quinto incremento (ao invés de 1) , 3 para um sexto (ao invés de 2) e a partir do sétimo será 4 pontos de habilidade por incremento (ao invés de 3).

                        </ListItem>
                        <ListItem sx={{ px: 0 }} className="esteban">
                            O valor máximo de uma Habilidade é igual a 15. Se alguma Regalia lhe fornecer pontos em uma habilidade que já esteja no valor de 15, escolha outra habilidade do mesmo grupo (Físico, Conhecimento, Exploração, Arcana ou Social) para adicionar o ponto.

                        </ListItem>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <AtributoContainer atributos={grupos} />

                        </Box>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={2}>
                        <Typography>Selecione proficiências iniciais.</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <ProfContainer proficiencias={proficiencias} />

                        </Box>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={3}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="select-especie-label">Espécie</InputLabel>
                            <Select
                                labelId="select-especie-label"
                                label="Espécie"
                                value={especieSelecionada}
                                onChange={handleChange}
                                sx={{ borderRadius: '4px 4px 4px' }}
                            >
                                {Object.keys(racas).map((key) => (
                                    <MenuItem key={key} value={key}>
                                        {racas[key].nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography variant="h6">{racas[especieSelecionada].nome}</Typography>
                        <Typography className="bigBoxTextClasses" paragraph>{racas[especieSelecionada].descricao}</Typography>
                        <RegaliaDeEspecie data={racas[especieSelecionada]} />
                    </TabPanel>
                    <TabPanel value={tabIndex} index={4}>
                        <Typography variant="h6">
                            Aprendiz
                        </Typography>
                        <Typography className="bigBoxTextClasses" paragraph>
                            A jornada de um herói nem sempre começa com glória e reconhecimento. No vasto e implacável mundo, onde reinos se erguem e caem e os perigos espreitam nas sombras, aqueles que buscam se aventurar precisam mais do que coragem — precisam de preparo. É nesse vácuo de inexperiência que surge a figura do Aprendiz.Nem todos nascem nobres guerreiros, poderosos magos ou astutos exploradores.Muitos são apenas jovens sedentos por conhecimento, sobreviventes forçados a trilhar caminhos incertos, ou estudiosos que, diante da realidade, percebem que a teoria, sozinha, não os salvará.O Aprendiz é aquele que entende que antes de se tornar mestre, precisa aprender; antes de empunhar uma lâmina com destreza, deve compreender seu peso; antes de lançar feitiços que dobram a realidade, precisa sentir a magia pulsar dentro de si.Seja empunhando uma espada, curando feridos com bênçãos sagradas ou desbravando mistérios ocultos, o Aprendiz dá seus primeiros passos rumo ao desconhecido.Ele não é um especialista, mas também não é um amador indefeso.Seu papel no mundo é crescer, explorar e se moldar ao destino que escolheu — ou ao que o destino escolheu para ele.Mas a trilha do Aprendiz não é apenas feita de livros e lições simples. O mundo é um mestre cruel, e cada cicatriz, cada batalha perdida, cada erro cometido esculpe sua jornada. É na forja da experiência que o Aprendiz se torna algo mais. Alguns seguirão o caminho do aço, tornando-se guerreiros temidos. Outros dominarão os segredos da magia, dobrando as forças arcanas à sua vontade. Alguns escolherão a diplomacia, a exploração ou a fé, guiando-se não pela lâmina, mas pela palavra, pelo conhecimento ou pelo instinto.Independentemente do caminho escolhido, o Aprendiz carrega uma verdade inabalável: ele ainda não é um mestre, mas já deixou de ser um mero iniciante. E, no fim, o que define seu destino não é de onde veio, mas para onde está indo.</Typography>
                        <AprendizClass onRegaliaChange={handleRegaliasUpdate} />
                    </TabPanel>
                    <TabPanel value={tabIndex} index={5}>
                        <Typography>Escolha uma regalia de profissão.</Typography>
                        <ProfessionContainer />
                    </TabPanel>
                    <TabPanel value={tabIndex} index={6}>
                        <Typography>Adicione equipamentos iniciais.</Typography>
                        <ShopForm />
                    </TabPanel>
                </Box>
            </Box>
            {/* Footer */}
            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© {dayjs().year()} Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>
    );
};

export default CharCreationPage;
