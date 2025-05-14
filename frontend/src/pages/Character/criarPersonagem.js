import React, { useState, useCallback, useRef } from 'react';
import dayjs from 'dayjs';
import { Box, Tabs, Tab, Typography, Paper, Tooltip, Grid, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import UIcon from '../../assets/images/userIcon.png';
import './char.css';
import Checkbox from '@mui/material/Checkbox';

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

    const MAX_PROF_POINTS = 4;
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

    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };
    const MAX_POINTS = 40;
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
    };

    const [image, setImage] = useState(null);
    const fileInputRef = useRef();

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
    };

    const [especieSelecionada, setEspecieSelecionada] = useState('humano');

    const handleChange = (event) => {
        setEspecieSelecionada(event.target.value);
    };
    // Estado do React para guardar a escolha
    const [regaliaEscolhida, setRegaliaEscolhida] = useState('');
    const RegaliaDeEspecie = ({ data }) => {
        return (
            < Box >
                < Typography className="bigBoxTextEquipsHeader" sx={{ mb: 2 }}>
                    Escolha uma entre:
                </Typography >

                <FormControl component="fieldset">
                    <FormLabel component="legend">Regalia Obrigatória</FormLabel>
                    <RadioGroup
                        name="regalia-obrigatoria"
                        value={regaliaEscolhida}
                        onChange={(e) => setRegaliaEscolhida(e.target.value)}
                    >
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
                    </RadioGroup>
                </FormControl>
            </Box >
        )
    }
    return (
        <Box sx={{ width: '100%', minHeight: '900px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* User header */}
            <Box>
                <Typography variant="h4" className="MainTitleC" sx={{ mt: 4 }}>Criação de personagem</Typography>

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
                    {/* Tab panels */}
                    <TabPanel value={tabIndex} index={0}>

                        <Grid container spacing={2} sx={{ height: '400px' }}>
                            <Grid item xs={6}>
                                <Grid container spacing={2} sx={{ height: '100%' }} >
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="Nome do Personagem" name="nome_personagem" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="idade" name="idade" />
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
                                        flexDirection: 'column'
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
                                            sx={{ mt: 2, maxWidth: '50%', margin: '0 auto', borderRadius: 1 }}
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
                        <Typography>Escolha regalias de aprendiz.</Typography>
                        {/* Inputs para regalias_de_aprendiz */}
                    </TabPanel>

                    <TabPanel value={tabIndex} index={5}>
                        <Typography>Escolha regalias de profissão.</Typography>
                        {/* Inputs para regalias_de_profissao */}
                    </TabPanel>

                    <TabPanel value={tabIndex} index={6}>
                        <Typography>Adicione equipamentos iniciais.</Typography>
                        {/* Inputs para equipamentos */}
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
