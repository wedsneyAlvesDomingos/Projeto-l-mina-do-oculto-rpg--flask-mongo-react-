import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./habilidades.css";


const HabilidadesPage = () => {

    const [tabIndex, setTabIndex] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };
    const BodyCard = () => {
        const data = [
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

        return (
            <Paper elevation={3} sx={{ padding: 2, mx: "auto", width: '100%', my: 1, }}>
                <Typography className="boxTextTitleText" variant="h6" gutterBottom>
                    Físico
                </Typography>
                <List >
                    {data.map((item, index) => (
                        <Accordion key={index} divider sx={{ mt: 0 }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography className="esteban" >{item.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="esteban">
                                {item.description}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </List>
            </Paper>
        );
    };
    const KnowledgeSkillsCard = () => {
        const data = [
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

        return (
            <Paper elevation={3} sx={{ padding: 2, mx: "auto", width: '100%', my: 1, }}>
                <Typography className="boxTextTitleText" variant="h6" gutterBottom>
                    Conhecimento
                </Typography>
                <List >
                    {data.map((item, index) => (
                        <Accordion key={index} divider sx={{ mt: 0 }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography className="esteban" >{item.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="esteban">
                                {item.description}
                            </AccordionDetails>
                        </Accordion>

                    ))}
                </List>
            </Paper>
        );
    };
    const ExplorationSkillsCard = () => {
        const data = [
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

        return (
            <Paper elevation={3} sx={{ padding: 2, mx: "auto", width: '100%', my: 1, }}>
                <Typography className="boxTextTitleText" variant="h6" gutterBottom>
                    Exploração
                </Typography>
                <List >
                    {data.map((item, index) => (
                        <Accordion key={index} divider sx={{ mt: 0 }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography className="esteban">{item.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="esteban">
                                {item.description}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </List>
            </Paper>
        );
    };
    const ArcanaCard = () => {
        const data = [
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

        return (
            <Paper elevation={3} sx={{ padding: 2, mx: "auto", width: '100%', my: 1 }}>
                <Typography className="boxTextTitleText" variant="h6" gutterBottom>
                    Arcana
                </Typography>
                <List >
                    {data.map((item, index) => (
                        <Accordion key={index} divider sx={{ mt: 0 }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography className="esteban" >{item.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="esteban">
                                {item.description}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </List>
            </Paper>
        );
    };
    const SocialCard = () => {
        const data = [
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

        return (
            <Paper elevation={3} sx={{ padding: 2, mx: "auto", width: '100%', my: 1 }}>
                <Typography className="boxTextTitleText" variant="h6" gutterBottom>
                    Social
                </Typography>
                <List >
                    {data.map((item, index) => (
                        <Accordion key={index} divider sx={{ mt: 0 }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography className="esteban" >{item.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="esteban">
                                {item.description}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </List>
            </Paper>
        );
    };
    const proficiencies = [
        {
            title: "Maestria em Armaduras e Escudos",
            description: `
            - Um ponto de proficiência permite o uso de armaduras leves, como couro, peles, tecidos reforçados e outros materiais leves que oferecem proteção básica. Essas armaduras são mais fáceis de se movimentar, mas oferecem menos proteção do que as armaduras pesadas. Também permite o uso de escudos simples.
            - Com este ponto adicional na proficiência de Armadura, o personagem é capaz de utilizar armaduras médias. Essas armaduras oferecem uma proteção moderada, porém, são mais pesadas e podem limitar a furtividade do personagem.
            - Ao alcançar o terceiro ponto nesta proficiência, o personagem ganha a Habilidade de utilizar armaduras pesadas. Essas armaduras fornecem a maior proteção possível, mas são as mais pesadas e restritivas, impactando a velocidade e furtividade do personagem.
          `
        },
        {
            title: "Condução de Veículos Terrestres",
            description: `
            Nota: Caso não possua essa proficiência o personagem tem desvantagem em todo e qualquer teste que envolva conduzir veículos terrestres.A capacidade de um personagem de usar montarias, carroças, charretes e outras formas de transporte tradicional terrestre. Criaturas só podem montar animais que sejam um tamanho maior que elas mesmas. Regalias podem usar essa proficiência como referência como parte de sua mecânica.

            - Um ponto nesta proficiência permite uso de montarias simples: cavalos, burros, mulas, camelos, ou qualquer montaria comum que usa uma sela e rédea simples e anda em quatro patas. Alguma região pode ser mais comum andar em cachorros como um mastiff ou em tigre. Se a criatura for terrestre tem alto nível de inteligência ou formato menos convencional é considerada exótica.
            - Um segundo ponto adicional permite o uso de carruagens, charretes, carroças e veículos de tração animal comuns.
            - Um terceiro ponto adicional nesta proficiência permite a condução de veículos terrestres de grande porte, como trens, carros de combate ou veículos blindados.
          `
        },
        {
            title: "Condução de Veículos Aquáticos",
            description: `
            Nota: Caso não possua essa proficiência o personagem tem desvantagem em todo e qualquer teste que envolva conduzir veículos aquáticos.

            A capacidade de um personagem de conduzir veículos aquáticos tradicionais como barcos, jangadas, navios e outros. Regalias podem usar essa Habilidade como referência como parte de sua mecânica.

            - Um ponto nesta proficiência permite a condução de embarcações simples: canoas, barcos a remo, jangadas, caiaques ou qualquer embarcação comum que usa uma remos ou o próprio corpo simples para remar. 
            - Um segundo ponto adicional permite a condução de escunas, pacotes e pequenas fragatas.
            - Um terceiro ponto nesta proficiência permite a condução de naus, caravelas, galeras e grandes barcos.
            - Um ponto adicional nesta proficiência permite a condução de embarcações maiores, como navios de guerra ou navios mercantes de grande porte.
          `
        },
        {
            title: "Condução Exótica",
            description: `
            Nota: Caso não possua essa proficiência o personagem tem desvantagem dupla em todo e qualquer teste que envolva conduzir veículos exóticos.

            A capacidade de um personagem de rapidamente se adaptar às complexidades de novas formas de veículos que encontra em uma jornada, ou que já foi exposto no passado. Regalias podem usar essa Habilidade como referência como parte de sua mecânica.

            - Um ponto nesta proficiência permite a condução de montarias consideradas exóticas.
            - Um segundo ponto adicional permite a condução de pequenos e médios veículos considerados exóticos, que andam sobre ou sob a terra e de veículos que navegam sobre as águas.
            - Um terceiro ponto nesta proficiência permite a condução de veículos exóticos que navegam sob as águas ou que voam.
            - Um quarto ponto adicional nesta proficiência permite a condução de veículos exóticos que possuam Habilidades especiais, como veículos subaquáticos capazes de explorar o fundo do oceano ou veículos voadores mágicos capazes de sair da atmosfera.
          `
        },
        {
            title: "Kit de Arrombamento",
            description: `
            A capacidade de usar ferramentas especiais para abrir fechaduras e cadeados. Para executar essa tarefa é realizado um teste usando a destreza da criatura.

            - Um primeiro ponto permite usar a ferramenta sem desvantagem .
            - Um segundo ponto permite adicionar seu valor de Habilidade de destreza ao rolamento em um teste para abrir uma tranca .
            - Um terceiro ponto permite usar apenas uma ação para realizar essa ação em combate.
            - Um quarto ponto adicional nesta proficiência permite desativar armadilhas complexas com um kit de arrombamento.
            - Um quinto ponto adicional nesta proficiência permite abrir fechaduras mágicas ou encantadas, que requerem conhecimento especializado e ferramentas aprimoradas. Também permite adicionar o valor de investigação ou percepção ao valor de destreza.
          `
        },
        {
            title: "Proficiência em Armas de Fogo",
            description: `
            A capacidade um personagem de usar especificamente armas de fogo, mesmo não sendo um combatente.
            - Um ponto nesta proficiência permite o uso básico de armas de fogo, como pistolas e rifles.
            - Um segundo ponto nesta proficiência permite usar armas de fogo exóticas ou experimentais, com habilidades especiais.
          `
        },
        {
            title: "Proficiência em Línguas Antigas",
            description: `
            - Um ponto nesta proficiência permite compreender e traduzir inscrições em línguas antigas que se relacionem com sua descendência.
            - Um segundo ponto adicional permite decifrar línguas antigas completamente desconhecidas após 1 hora de estudo.
            - Um terceiro ponto nesta proficiência permite aprender e falar línguas antigas, comunicando-se com seres de eras passadas após estudar por 24 horas a linguagem de alguma forma.
          `
        },
        {
            title: "Proficiência em Arqueologia",
            description: `
            A Proficiência em Arqueologia permite ao personagem se tornar um especialista em descobrir e estudar artefatos antigos. Com conhecimento teórico e Habilidades práticas, eles são capazes de identificar, desvendar e restaurar esses objetos valiosos, contribuindo para a preservação da história e da cultura do passado.\n
            - Um ponto nesta proficiência permite ao personagem identificar e catalogar artefatos antigos de valor histórico. Eles possuem conhecimento sobre diferentes culturas, períodos e estilos arquitetônicos, permitindo-lhes reconhecer e compreender a importância desses objetos. O personagem pode fazer testes de Habilidade para identificar corretamente os artefatos e determinar seu valor histórico e cultural. Adicionalmente ao possuir essa proficiência, o personagem recebe um bônus de +2 em todos os testes de Habilidade relacionados à identificação de artefatos, desvendar segredos em ruínas e restauração de artefatos. O personagem pode utilizar ferramentas de arqueologia, como pincéis, lentes de aumento e instrumentos de medição, para auxiliar em suas tarefas. Essas ferramentas fornecem um bônus adicional de +2 nos testes de Habilidade específicos relacionados à arqueologia. Ao descobrir e catalogar artefatos, o personagem pode obter recompensas adicionais, como ganhar conhecimento sobre eventos históricos relevantes, receber financiamento para futuras expedições ou ser convidado para participar de projetos arqueológicos renomados.

            - Um segundo ponto adicional amplia as Habilidades de arqueologia do personagem.o personagem recebe um bônus de +2 em todos os testes de Habilidade relacionados a testes de investigação de ruínas e descoberta de tesouros. esse valor estaca com o primeiro bônus.

            - No terceiro ponto nesta proficiência, o personagem adquire habilidades avançadas de restauração e conservação de artefatos arqueológicos danificados. Eles possuem conhecimento sobre técnicas de preservação, como limpeza, estabilização e restauração de objetos antigos. O personagem pode fazer testes de Habilidade para restaurar adequadamente os artefatos danificados, garantindo sua integridade e aumentando seu valor histórico. Além disso, o bônus de +2 agora se aplica a todos os testes de Habilidade relacionados à restauração de artefatos.
          `
        },
        {
            title: "Proficiência em Liderança",
            description: `
            A Proficiência em Liderança capacita o personagem a se tornar um líder eficaz, inspirando e coordenando seus aliados para alcançar objetivos comuns. Essa habilidade não apenas fortalece o grupo em termos de combate, mas também permite ao personagem liderar e comandar grandes grupos de seguidores.\n

            - Um ponto nesta proficiência permite ao personagem inspirar e motivar seus aliados, concedendo bônus em testes e combate. O personagem é capaz de usar uma ação para para elevar o moral do grupo, incentivando-os a dar o melhor de si. Isso se reflete em um bônus de +2 em testes de Habilidade, no próximo minuto, realizados por aliados próximos. Pode usar essa ação 3 vezes por descanso longo.

            - Um segundo ponto adicional amplia as habilidades de liderança do personagem. Agora, eles são capazes de coordenar táticas e estratégias em combate, melhorando a eficiência do grupo como um todo.o personagem pode, como uma ação, realizar um testes de habilidade de intuição ou investigação para avaliar a situação do campo de batalha, identificar pontos fracos dos inimigos e fornecer orientações táticas para seus aliados. Isso resulta em um bônus adicional de +2 nas rolagens de ataque de todos os membros do grupo sob o comando do personagem.  Pode usar essa ação 3 vezes por descanso longo.
            Ao possuir um segundo ponto nessa proficiência, o personagem recebe um bônus de +2 em todos os testes de Habilidade relacionados a persuasão e negociação.

            - No terceiro ponto nesta proficiência, o personagem adquire habilidades de liderança avançadas. Eles são capazes de liderar grandes grupos de seguidores, comandar exércitos ou liderar organizações. O personagem pode realizar testes de habilidade para inspirar e influenciar um grande número de pessoas, mantendo sua lealdade e obediência. Sob a liderança do personagem, esses seguidores se tornam mais eficazes em combate e nas atividades relacionadas ao objetivo da organização. Isso resulta em um bônus adicional de +2 em todos os testes de Habilidade realizados por seguidores e um bônus de +2 nas rolagens de ataque e dano de todos os membros do grupo sob o comando do personagem.
          `
        },
        {
            title: "Proficiência em Armas Exóticas",
            description: `
            O personagem recebeu treinamento, ou descobriu sozinho treinando muito, como usar efetivamente armas exóticas:

            - Um ponto nessa proficiência o personagem adquire proficiência com uma arma da lista de armas exóticas que não seja uma arma de fogo.
            - Um segundo ponto nessa proficiência o personagem adquire proficiência com mais duas armas da lista de armas exóticas que não sejam armas de fogo.
            - Um terceiro ponto nessa proficiência permite o uso de qualquer arma exótica que não seja uma arma de fogo.

          `
        },
        {
            title: "Proficiência em Esgrima",
            description: `
            Um ponto nessa proficiência, o personagem recebe o treinamento e a habilidade de lutar com espadas (não pesadas), adagas, floretes e sabres. Desde que não sejam armas exóticas.
          `
        },
        {
            title: "Proficiência em Arco e Besta",
            description: `
           Um ponto nessa proficiência permite ao personagem utilizar arcos e bestas. 
          `
        },
        {
            title: "Proficiência em Disfarce",
            description: `
           O personagem se torna capaz de usar disfarces para as mais diversas necessidades. Quando o personagem usa um disfarce o mestre pede um teste de enganação com dificuldade definida pelo contexto. quanto mais pontos de proficiência mais fácil o teste será.

            - Um ponto nesta proficiência permite ao personagem criar disfarces simples para ocultar sua identidade em situações básicas. O personagem pode alterar sua aparência usando maquiagem, adereços e roupas adequadas. +2 em testes de furtividade e enganação enquanto disfarçado.

            - Um segundo ponto adicional permite ao personagem criar disfarces mais elaborados e convincentes, enganando observadores atentos. O personagem pode imitar características físicas específicas, como altura, peso, voz e até mesmo traços faciais. +2 em testes de furtividade e enganação enquanto disfarçado.

            - Um terceiro ponto nesta proficiência permite ao personagem se infiltrar em locais protegidos com maior facilidade.o personagem é capaz de imitar o comportamento e os trejeitos de uma pessoa ou criatura específica, tornando-se praticamente indistinguível dela. +10 em testes de furtividade e enganação enquanto disfarçado.

          `
        },
        {
            title: "Proficiência Contra Ataques em Área",
            description: `
            -Um ponto nessa proficiência concede a opção de, ao sofrer um ataque em área, o personagem fazer um teste de reflexo (Agilidade), como uma reação, e reduzir o dano em um valor igual a metade do seu valor de Fortitude.

            -Um segundo ponto aumenta a redução de dano para igual ao valor de Fortitude.
            
            -Um terceiro ponto  aumenta a redução de dano para igual  2x ao valor de Fortitude.

          `
        },
        {
            title: "Proficiência em Combate Anti-conjuradores",
            description: `
          - Um ponto nesta proficiência permite ao personagem reconhecer sinais de magia e identificar conjuradores. Ele pode detectar a presença de magia ao seu redor e discernir quando alguém está lançando um feitiço ou utilizando habilidades mágicas. Se uma criatura conjurar qualquer Magia ou Feitiço (Regalias com essas tags) em uma distância dentro de seu alcance de ameaça, o personagem pode realizar um ataque de oportunidade.
          
          - Um segundo ponto adicional aumenta a resistência do personagem contra magia. Efeitos mágicos que possuem uma chance de sucesso em porcentagem  tem 10% menos chance de ter sucesso.
          
          - Um terceiro ponto nesta proficiência permite ao personagem interromper o efeito de Magias ou Feitiços. Ao realizar ataques contra um conjurador o personagem pode tentar desfazer um Feitiço ou Magia que tenha duração maior que instantâneo, conjurada pelo mesmo. Cada ataque que acertar tem 10% de chance de desfazer o efeito da habilidade. Se o personagem impedir um efeito mágico de acontecer ele recebe um ponto de magia temporário até o próximo descanso longo ou curto.

          `
        }
    ];

    // Componente de Acordions
    const ProficienciesPage = () => {
        return (
            <Box sx={{ mt: 4 }}>
                <Typography className="bigBoxTextClasses" sx={{ py: 2 }}>
                    Atenção, para comprar proficiências um jogador deve usar um dos seguintes meios: usar dos 40 pontos da distribuição inicial ao criar o personagem (2 pontos para cada ponto de proficiência),  dos 4 pontos de proficiência (exclusivos para isso recebidos na criação de personagem), 2 pontos de Regalia para cada ponto de proficiência ou receber através de profissões , classes, espécies ou especializações.
                </Typography>
                <Paper sx={{ p: 2 }}>
                    {proficiencies.map((prof, index) => (

                        <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className="esteban">{prof.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography lassName="esteban" variant="body1" sx={{ whiteSpace: "pre-line" }}>
                                    {prof.description}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                    ))}
                </Paper>
            </Box>
        );
    };


    return (
        <Box sx={{ minHeight: '700px', width: '100%' }} >

            <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
                <Typography variant="h4" className="MainTitleC">HABILIDADES E PROFICIÊNCIAS</Typography>

                <Paper sx={{ mt: 2, p: 2 }}>
                    <Tabs value={tabIndex} onChange={handleChange} centered className="tabs">
                        <Tab className="tabs" label="Regras Gerais" />
                        <Tab className="tabs" label="Testes em Grupo" />
                        <Tab className="tabs" label="Dificuldade" />
                        <Tab className="tabs" label="Falhas Críticas" />
                        <Tab className="tabs" label="Sucessos Críticos" />
                    </Tabs>

                    <Box sx={{ p: 2 }}>
                        {tabIndex === 0 && (
                            <Typography className="bigBoxTextClasses">
                                Um personagem com zero pontos em uma Habilidade não é proficiente nesta Habilidade. Essa informação é relevante para as regras, habilidades e ações que exigem que o personagem seja proficiente com a habilidade.Um jogador só pode pedir ao mestre testes em Habilidades que sejam proficientes, caso contrário somente fará testes que lhe forem exigidos pelas situações enfrentadas no jogo.
                            </Typography>
                        )}
                        {tabIndex === 1 && (
                            <Typography className="bigBoxTextClasses">
                                Todos os envolvidos fazem o mesmo teste. O mestre estipula quantos sucessos entre os jogadores resultam no sucesso do grupo. Um rolamento de sucesso cŕitico (20 no d20) vale por dois sucessos, enquanto um rolamento de falha cŕitica (1 no d20) vale por dois fracassos.
                            </Typography>
                        )}
                        {tabIndex === 2 && (
                            <Typography className="bigBoxTextClasses">
                                Um teste de Habilidade terá seu valor de acordo com a dificuldade para executar o que está sendo pedido. O mestre irá determinar o que é fácil,  difícil ou se o rolamento é desnecessário. O rolamento pode não fazer sentido se a dificuldade for abaixo do valor mínimo que um personagem pode rolar ou maior que o máximo.
                                A tabela abaixo é usada como base para decisão do valor de  dificuldade, mas a palavra final é do mestre no momento em que é feito o rolamento do teste. <br /><br />

                                <strong>Tabela de referência:</strong>
                                <ul>
                                    <li lassName="bigBoxTextClasses">Muito fácil: 1 a 6</li>
                                    <li lassName="bigBoxTextClasses">Fácil: 7 a 10</li>
                                    <li lassName="bigBoxTextClasses">Normal: 11 a 15</li>
                                    <li lassName="bigBoxTextClasses">Difícil: 16 a 20</li>
                                    <li lassName="bigBoxTextClasses">Muito difícil: 21 a 30</li>
                                    <li lassName="bigBoxTextClasses">Quase impossível: 31 a 40</li>
                                </ul>
                            </Typography>
                        )}
                        {tabIndex === 3 && (
                            <Typography className="bigBoxTextClasses">
                                Uma falha crítica pode ou não ter resultados além de não executar a Habilidade, isso fica a critério do mestre. Cada situação pode ser avaliada de maneira diferente . Essa regra vale para todas as Habilidades que não afetem rolamentos de acerto de ataque, tanto mágico quanto físico.<br /><br />
                                Aqui estão algumas opções interessantes e variadas para o que pode acontecer quando um personagem rola uma falha crítica:
                                <ul>
                                    <li>
                                        Perde o equilíbrio:o personagem tropeça ou escorrega, caindo no chão e ficando na condição caído até o próximo turno.</li>
                                    <li>Dano a aliado: O ataque do personagem erra o alvo e atinge um aliado próximo, causando 1d4 de dano do tipo do ataque.</li>
                                    <li> Manuseio estranho de equipamento: A arma do personagem fica mal empunhada de alguma forma, causando desvantagem até o fim de seu turno.</li>
                                    <li>Auto-infligido:o personagem erra o ataque e acidentalmente se fere, sofrendo um ponto de dano.</li>
                                    <li>Perde um item:o personagem deixa cair um item importante no calor do momento, que pode rolar para fora de alcance.</li>
                                    <li>Confusão ou desorientação:o personagem fica momentaneamente desorientado ou confuso, sofrendo desvantagem em seu próximo teste ou ataque.</li>
                                    <li>Alarme involuntário: O movimento desastrado do personagem faz barulho, alertando inimigos adicionais ou atraindo a atenção indesejada.</li>
                                    <li>Interferência ambiental: O ataque erra e causa um efeito ambiental indesejado, como derrubar uma estante de poções ou acionar uma armadilha.</li>
                                    <li>Consequência social: Se a falha ocorre em um contexto social, o personagem pode ofender alguém importante ou causar uma gafe embaraçosa.</li>
                                </ul>

                            </Typography>
                        )}
                        {tabIndex === 4 && (
                            <Typography className="bigBoxTextClasses">
                                Um sucesso cŕitico nunca se configura como sucesso garantido, para um sucesso deve se passar no teste superando ou rolando um número igual ao valor de dificuldade.Considerando essa informação, no entanto,  cada 10 pontos atingidos acima do valor de dificuldade pode conceder benefícios extras de acordo com o mestre.<br /><br />
                                <ul>
                                    <li lassName="bigBoxTextClasses"><strong>Efeito Secundário Positivo:</strong> Além do sucesso principal, ocorre um efeito secundário positivo. Por exemplo, um ataque de espada que também desarma o oponente ou uma tentativa de intimidação que causa medo adicional a outros inimigos próximos.</li>
                                    <li lassName="bigBoxTextClasses"><strong>Recurso Recuperado:</strong>o personagem recupera parcialmente um recurso gasto, como pontos de magia, stamina, ou uma habilidade especial.</li>
                                    <li lassName="bigBoxTextClasses"><strong> Informação Adicional:</strong> O sucesso crítico concede ao personagem informações extras ou uma visão mais detalhada da situação, como descobrir uma fraqueza do inimigo ou obter conhecimento oculto.</li>
                                    <li lassName="bigBoxTextClasses"><strong>Melhoria Temporária:</strong>o personagem ganha um bônus temporário em uma habilidade relacionada ao teste. Por exemplo, +2 em testes de Força por um curto período após um sucesso em um teste de Atletismo.</li>
                                    <li lassName="bigBoxTextClasses"><strong>     Impacto Ambiental Favorável: </strong>O sucesso crítico altera o ambiente de maneira benéfica, como encontrar uma cobertura perfeita durante um combate ou descobrir um atalho durante uma perseguição.</li>
                                    <li lassName="bigBoxTextClasses"><strong>Aliado Inspirado:</strong> O sucesso crítico inspira um aliado próximo, concedendo-lhe uma vantagem em seu próximo teste ou ataque.</li>

                                </ul>


                            </Typography>
                        )}
                    </Box>
                </Paper>
                <Typography className="boxTextTitleText" variant="h5" gutterBottom>
                    Habilidades
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'start', flexFlow: 'row wrap', justifyContent: 'center', width: '100%', mx: 'auto' }}>
                    <BodyCard /><KnowledgeSkillsCard />  <ExplorationSkillsCard /><ArcanaCard /><SocialCard />
                </Box>
                <Typography className="boxTextTitleText" variant="h5" gutterBottom>
                    Proficiências
                </Typography>
                <ProficienciesPage />
            </Box>

            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>
    );
};

export default HabilidadesPage;
