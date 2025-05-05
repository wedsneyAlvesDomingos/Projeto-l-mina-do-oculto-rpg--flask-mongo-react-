
import { Paper, Box, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import React, { useState, useEffect, useCallback } from 'react';
import "./HTMC.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import knight from "../../assets/images/image-from-rawpixel-id-6503681-png.png";


const HowToMakeCharPage = () => {
    const SkillsCard = () => {
        const data = [
            {
                title: "Habilidades e Proficiências",
                description:
                    "Um personagem sem pontos em uma habilidade não é proficiente e só pode testar habilidades que domina."
            },
            {
                title: "Testes em Grupo",
                description:
                    "Todos fazem o mesmo teste, e o mestre define quantos sucessos são necessários. Sucesso crítico (20) conta como dois sucessos, e falha crítica (1) como dois fracassos."
            },
            {
                title: "Dificuldade dos Testes",
                description:
                    "O mestre define se um teste é necessário e sua dificuldade com base na tabela de dificuldade."
            },
            {
                title: "Falha Crítica",
                description:
                    "Pode gerar consequências adicionais, como queda, dano a aliados, perda de itens, barulho indesejado ou confusão."
            },
            {
                title: "Sucesso Crítico",
                description:
                    "Não garante sucesso automático, mas pode gerar efeitos extras se superar a dificuldade em 10+ pontos."
            }
        ];

        return (
            <Paper elevation={3} sx={{ padding: 2, maxWidth: 500, mx: "auto", width: '50%', my: 1, }}>
                <Typography className="esteban" variant="h6" gutterBottom>
                    Resumo: Habilidades e Testes
                </Typography>
                <List sx={{ overflowY: 'scroll', height: "400px" }}>
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
    const BodyCard = () => {
        const data = [
            {
                title: "Fortitude",
                description:
                    "Relacionada à vitalidade e pontos de vida do personagem. A cada ponto adicional de fortitude, o personagem ganha 2 pontos de vida. Também é usada para resistir a venenos, doenças e desgaste físico. Com 10 pontos, o personagem ganha +2 em testes de fortitude."
            },
            {
                title: "Força",
                description:
                    "Determina a capacidade de carga e o dano em ataques físicos corpo a corpo. Usada para testes de resistência, como segurar ou levantar objetos pesados. Com 10 pontos, o personagem ganha um bônus de carga e +2 em testes de força."
            },
            {
                title: "Agilidade",
                description:
                    "Relacionada à velocidade do personagem, influencia a velocidade de movimento em combate e o Valor de Defesa. Também afeta a iniciativa de combate e testes de reflexo. Com 10 pontos, o personagem ganha +2 em testes de reflexo."
            },
            {
                title: "Combate Corpo a Corpo",
                description:
                    "Relacionada à habilidade de lutar com armas corpo a corpo, determina o Valor de Acerto. Regalias podem usá-la como referência."
            },
            {
                title: "Combate a Distância",
                description:
                    "Relacionada à habilidade de lutar com armas de disparo ou arremesso, também determina o Valor de Acerto. Regalias podem usá-la como referência."
            },
            {
                title: "Atletismo",
                description:
                    "Relacionada à capacidade atlética, como saltos, natação e escalada. Também influencia a estamina inicial. Com 10 pontos, o personagem ganha +5 de estamina e pode nadar e escalar sem redução na velocidade."
            },
            {
                title: "Acrobacia",
                description:
                    "Relacionada a manobras como saltos, equilíbrio e malabarismo. Com 10 pontos, o personagem ganha +2 em testes de equilíbrio e não sofre dano de quedas de até 9 metros."
            },
            {
                title: "Destreza",
                description:
                    "Relacionada à habilidade manual e precisão em tarefas como desamarrar cordas e abrir fechaduras. Também afeta o dano de ataques à distância. Com 10 pontos, o personagem ganha +2 em testes para operar ferramentas com precisão."
            }
        ];

        return (
            <Paper elevation={3} sx={{ padding: 2, maxWidth: 500, mx: "auto", width: '50%', my: 1, }}>
                <Typography className="esteban" variant="h6" gutterBottom>
                    Resumo: Habilidades Físicas
                </Typography>
                <List sx={{ overflowY: 'scroll', height: "400px" }}>
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
                    "Essa Habilidade está relacionada à capacidade de um personagem lembrar de fatos, descrições e definições que já ouviram, viram acontecer ou leram. Os assuntos que essa Habilidade cobre são eventos históricos, conhecimentos gerais da sociedade, e qualquer assunto que não seja sobre a natureza e o sobrenatural. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade, o personagem consegue usar a ação Recordar Conhecimento(história) enquanto realiza qualquer outra ação em seu turno. Além disso, ganha um ponto nas proficiências Línguas Antigas e Arqueologia."
            },
            {
                title: "Intuição",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem entender uma situação ou a intenção de uma pessoa, ou mais, associando sua percepção com suas experiências pessoais. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade, o personagem consegue usar a ação Ler Ambiente enquanto realiza qualquer outra ação em seu turno."
            },
            {
                title: "Natureza",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem em reconhecer os mais diversos aspectos e informações de plantas, animais, biomas, fungos, rochas e todos as coisas que façam parte da natureza. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade, o personagem se torna um especialista em identificação de plantas e animais. Ganha a capacidade de, sem necessidade de um teste, reconhecer e nomear qualquer espécie encontrada em seu ambiente natural, identificando suas características, propriedades medicinais e qualquer uso relevante. Se o personagem for usar a Habilidade Natureza na ação Recordar Conhecimento, ele automaticamente tem sucesso, mas usar uma ação ainda é necessário."
            },
            {
                title: "Medicina",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem reconhecer doenças, tratar ferimentos e enfermidades. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 5 pontos nessa Habilidade, o personagem cura o valor dessa Habilidade em pontos de vida quando usar um kit médico ou de herbalista. Ao atingir 10 pontos nessa Habilidade, o personagem consegue usar a ação de turno completo 'Primeiros socorros' como apenas uma ação."
            },
            {
                title: "Jurisprudência (Política e leis)",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem de entender as leis e ordem de sociedades estruturadas de maneira que tenham leis. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade, o personagem consegue realizar uma análise detalhada de evidências, argumentos e precedentes legais, concedendo um bônus de +4 em testes de Investigação, Persuasão ou Intuição relacionados a leis de uma sociedade."
            },
            {
                title: "Teologia",
                description:
                    "Essa Habilidade está relacionada ao conhecimento que o personagem tem sobre as Religiões existentes, suas histórias, doutrinas e capacidades. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade, o personagem consegue usar a ação Recordar Conhecimento(Teologia) enquanto realiza qualquer outra ação em seu turno. Também recebe um bônus fixo de +4 em todos os testes desta habilidade."
            },
            {
                title: "Tecnologia",
                description:
                    "Essa Habilidade está relacionada ao conhecimento sobre mecânica, física e matemática. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade, o personagem consegue usar a ação Recordar Conhecimento(Tecnologia) enquanto realiza qualquer outra ação em seu turno. Também se torna capaz de usar a ação de turno completo Desabilitar / Habilitar Dispositivo como duas ações."
            }
        ];

        return (
            <Paper elevation={3} sx={{ padding: 2, maxWidth: 500, mx: "auto", width: '50%', my: 1, }}>
                <Typography className="esteban" variant="h6" gutterBottom>
                    Resumo: Habilidades de Conhecimento
                </Typography>
                <List sx={{ overflowY: 'scroll', height: "400px" }}>
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
                    "Essa Habilidade está relacionada à capacidade de um personagem de se esconder dos olhos e/ou ouvidos de outras criaturas. Ao atingir 10 pontos nessa Habilidade o personagem consegue usar a ação Esconder Objeto como ação livre uma vez em seu turno. Também consegue usar a ação Esconder ao mesmo tempo que uma ação de movimento, lembre-se que existem condições para estar na condição Escondido. Além disso, não sofre penalidade de movimento ao usar a ação esgueirar-se."
            },
            {
                title: "Investigação",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem de procurar e vasculhar um ambiente, móvel (mesa, armário, etc.) ou objeto (uma caixa sem fechadura, uma esfera que parece um quebra cabeça e outros objetos fora do comum). Ao atingir 10 pontos nessa Habilidade o personagem consegue usar investigação ao usar as ações Buscar e Ler Ambiente. Também consegue, ao gastar uma ação em combate, analisar seu adversário e procurar por uma abertura ou ponto fraco em sua defesa para ganhar um bônus em seu próximo ataque igual a +2."
            },
            {
                title: "Rastreamento",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem de seguir pegadas, cheiros e outras pistas deixadas por uma criatura ou veículo. Ao atingir 10 pontos nessa Habilidade o personagem consegue antecipar os movimentos e intenções de criaturas, permitindo-lhe maior chance de evitar emboscadas e embates desfavoráveis. Ele recebe um bônus de +4 em testes relacionados à prevenção de emboscadas (percepção ou investigação), identificação de comportamentos de caça (lidar com animais, percepção ou intuição) e testes de reflexo para evitar armadilhas. Além disso, o personagem consegue usar Rastreamento ao usar as ações Buscar e Ler Ambiente, ao invés de percepção ou intuição."
            },
            {
                title: "Percepção",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem de discernir o que interessa entre os sons do ambiente, do que ele consegue ver e do que ele consegue sentir ao toque. Ao atingir 10 pontos nessa Habilidade o personagem consegue utilizar o seu valor de percepção ao invés dos valores em investigação ou rastreamento, ao realizar os testes citados. Além de ficar imune à condição surpreso."
            },
            {
                title: "Sobrevivência",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem de procurar por abrigo (ou montar um), procurar comida, encontrar água e outros recursos em qualquer situação, mas principalmente na natureza. Ao atingir 10 pontos nessa Habilidade o personagem se torna um especialista em sobreviver em terrenos perigosos e traiçoeiros, como pântanos, florestas densas ou desertos. Ele recebe um bônus de +4 em testes para navegar por esses terrenos, evitar armadilhas naturais e encontrar rotas seguras, o personagem também se torna capaz de, uma vez por descanso longo, tirar um nível da condição cansado ao realizar um descanso curto."
            },
            {
                title: "Lidar com animais",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem de transmitir um pedido, aviso ou outras formas de se comunicar, e relacionar, com um animal sem o uso de magia. Ao atingir 10 pontos nessa Habilidade o personagem adquire habilidades básicas de tratamento de ferimentos em animais. Ele pode aplicar a ação de turno completo Primeiros Socorros em animais feridos gastando apenas uma ação, o personagem também se torna um mestre na montaria de animais e ao montar animais não treinados consegue guiá-los em combate sem precisar realizar testes para controlar seus movimentos e ações."
            },
            {
                title: "Navegação",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem de encontrar o caminho com base na posição do sol, estrelas e referências geográficas caso saiba o caminho ou tenha um mapa. Ao atingir 10 pontos nessa Habilidade o personagem adquire a capacidade de sempre saber que direção é o norte, e se já tiver passado por um caminho antes o personagem não fica perdido (no caminho mencionado). Além disso, recebe +2 em testes de navegação que envolvam passar em áreas obscurecidas por nevoeiros e outros fenômenos naturais (ou não) que impedem a visão."
            },
            {
                title: "Armadilhas",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem de encontrar e desarmar armadilhas em um ambiente. Ao implantar armadilhas, então um teste com esta habilidade é feito e o resultado determina a dificuldade para desarmá-la. Ao atingir 10 pontos nessa Habilidade o personagem se torna capaz de usar a ação de turno completo Desabilitar / Habilitar Dispositivo como uma ação desde que esteja desarmando ou armando uma armadilha. Além disso, o personagem consegue reduzir o dano de armadilhas, caso caia em uma, em metade. Se a armadilha causar mais algum efeito em seu corpo além de dano, o personagem pode escolher evitar esse efeito uma vez por dia."
            }
        ];

        return (
            <Paper elevation={3} sx={{ padding: 2, maxWidth: 500, mx: "auto", width: '50%', my: 1, }}>
                <Typography className="esteban" variant="h6" gutterBottom>
                    Resumo: Habilidades de Exploração
                </Typography>
                <List sx={{ overflowY: 'scroll', height: "400px" }}>
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
                    "Essa Habilidade está relacionada ao conhecimento de um personagem sobre os mais diversos usos de um ritual. Um Ritual pode ser feito por um ou mais pessoas dependendo do objetivo final. Rituais podem ser feitos para selar, proteger, invocar, observar, abençoar, amaldiçoar, comunicar ou fortalecer um objeto, criatura ou lugar. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem consegue diminuir o custo dos materiais de um ritual em 5 vezes. Além disso, ao realizar um ritual o personagem recebe, uma vez por descanso longo, os benefícios de um descanso curto."
            },
            {
                title: "Ocultismo",
                description:
                    "Essa Habilidade está relacionada ao conhecimento de um personagem sobre o tema. O oculto engloba demônios, maldições, magia de sangue, magia negra, pactos e mortos vivos. Para saber se um objeto é amaldiçoado é essa Habilidade que se usa. Com um sucesso, a dificuldade é determinada pelo mestre, em um teste de ocultismo o personagem descobre se um item está amaldiçoado, qual a maldição e como quebrá-la. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem consegue usar itens amaldiçoados sem ser afetado pela maldição. O personagem também consegue usar a ação Recordar conhecimento(ocultismo) como parte de outra ação."
            },
            {
                title: "Arcanatec",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem de identificar um objeto mágico. Em um sucesso, no teste de Habilidade, é possível identificar um objeto mágico, aprendendo o que ele faz e quais os seus pré requisitos. Essa Habilidade também está relacionada à capacidade de um personagem encontrar e usar ou desarmar uma armadilha mágica. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem consegue, sem a necessidade de um teste, identificar uma falsificação de um item mágico. Se um item mágico estiver danificado, o personagem pode consertá-lo ou pelo menos saber o que é necessário para tal. Além disso, o personagem consegue equipar um item mágico, de qualquer categoria, a mais que o previamente estipulado no tópico de itens mágicos. Ao atingir 10 pontos nessa Habilidade o personagem também se torna capaz de usar a ação de turno completo Desabilitar / Habilitar Dispositivo como uma ação, desde que esteja desarmando ou armando uma armadilha mágica. Além disso, o personagem consegue diminuir o dano de armadilhas mágicas, caso caia em uma, pela metade. Se a armadilha causar mais algum efeito, além de dano, em seu corpo é possível evitar esse efeito uma vez por descanso longo."
            },
            {
                title: "Combate Arcano",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem de lutar com magias, feitiços e milagres e determina o seu Valor de Acerto. Regalias podem usar essa Habilidade como referência como parte de sua mecânica."
            }
        ];

        return (
            <Paper elevation={3} sx={{ padding: 2, maxWidth: 500, mx: "auto", width: '50%', my: 1 }}>
                <Typography className="esteban" variant="h6" gutterBottom>
                    Resumo: ARCANA
                </Typography>
                <List sx={{ overflowY: 'scroll', height: "400px" }}>
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
                    "Essa Habilidade está relacionada à capacidade de um personagem de convencer outras criaturas de suas mentiras, seja através da fala ou de ações. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem se torna capaz de usar as ações Fintar ou Distrair ao mesmo tempo que uma ação de movimento."
            },
            {
                title: "Persuasão",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem convencer outras criaturas de seus argumentos, seja através da fala ou de ações. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem se torna capaz de usar a ação Pedir ao mesmo tempo que outra ação. Além disso, ganha um ponto na proficiência Liderança."
            },
            {
                title: "Performance",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem de dançar, cantar, atuar, recitar um poema ou tocar um instrumento. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Os primeiros 5 pontos definem suas capacidades artísticas. Ao atingir 10 pontos nessa Habilidade o personagem se torna capaz de usar as ações Performar e Distrair ao mesmo tempo que uma ação de movimento."
            },
            {
                title: "Intimidação",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem intimidar outras criaturas, seja através da fala ou de ações. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem se torna capaz de usar as ações Intimidar ou Distrair ao mesmo tempo que ação de movimento, Derrubar, Agarrar, Atacar, Derrubar ou Preparar. Além disso, pode usar a ação Intimidar em número de criaturas igual ao valor desta habilidade ao mesmo tempo, desde que estejam dentro do campo de visão e possam ver e ouvir o personagem."
            },
            {
                title: "Sedução",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem seduzir outras criaturas, seja através da fala ou de ações. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem se torna capaz de apresentar-se com uma beleza estonteante e uma presença cativante. Sua aparência física se torna irresistível aos olhos de quem o vê, atraindo olhares e o interesse das pessoas ao seu redor. Todos os testes da aba Social ganham vantagem contra alvos que tenham compatibilidade de atração pelo personagem. O alvo se torna disposto a fazer Pequenos favores que não sejam claramente perigosos ou fora de seu alcance."
            },
            {
                title: "Negociação",
                description:
                    "Essa Habilidade está relacionada à capacidade de um personagem lidar com outras criaturas em uma situação de troca ou conflito. Regalias podem usar essa Habilidade como referência como parte de sua mecânica. Ao atingir 10 pontos nessa Habilidade o personagem recebe um bônus de +2 em testes de Persuasão, Enganação, Investigação, História e Intuição que beneficiem a conclusão de uma negociação. O personagem também consegue tentar usar seu turno em combate para negociar termos para uma trégua entre as partes, em um sucesso no teste de Habilidade Negociação, com dificuldade definida pelo mestre, define se a luta acaba ou se é interrompida apenas por um turno, onde ninguém pode usar ações ou reações maliciosas um contra o outro."
            }
        ];

        return (
            <Paper elevation={3} sx={{ padding: 2, maxWidth: 500, mx: "auto", width: '50%', my: 1 }}>
                <Typography className="esteban" variant="h6" gutterBottom>
                    Resumo: Habilidades Sociais
                </Typography>
                <List sx={{ overflowY: 'scroll', height: "400px" }}>
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

    return (
        <Box >
            <Box sx={{ minHeight: '700px', width: '80%', mx: 'auto' }}>
                <Typography variant="h2" className="MainTitleMC" sx={{ my: 8 }}>Guia de criação de personagens</Typography>
                <Box sx={{ width: "20%", margin: "auto" }}>
                    <img style={{ width: "100%" }} src={knight} />
                </Box>
                <Typography variant="h5" className="boxTextTitleText" sx={{ margin: "auto" }}>
                    Bem-vindo ao guia passo a passo para criar seu personagem! Aqui, você aprenderá a construir um personagem único, escolhendo suas habilidades, espécie, profissão e classe. Este sistema permite uma personalização profunda, garantindo que seu personagem evolua conforme suas escolhas ao longo da aventura.
                </Typography>
                <Typography variant="h5" className="boxTextTitleText" sx={{ mx: "auto", mb: 3 }}>
                    Desde a seleção de habilidades e proficiências até a progressão em classes e especializações, cada decisão impactará o desenvolvimento do seu personagem no jogo. Siga as etapas abaixo e crie um herói à sua maneira!
                </Typography>
                <Typography variant="h4" className="boxTextTitle" sx={{ mx: "auto", mb: 3 }}>
                    Regalias e Pontos de Regalia
                </Typography>
                <Typography className="bigBoxTextGUIAMC" >
                    No sistema de Regalias, o personagem pode adquirir Regalias de Classe, Regalias de Profissão, Proficiências ou Regalias de Espécie usando Pontos de Regalia. O personagem recebe pontos de Regalia ao passar de nível com seu personagem.
                </Typography>
                <Typography className="bigBoxTextGUIAMC" >
                    No primeiro nível, o personagem começa com 4 Pontos de Regalia, no segundo nível recebe mais 4 e a partir do terceiro nível, quando os pré requisitos para escolher uma classe são preenchidos, recebe 2 Pontos de Regalia por nível. Um personagem no nível 20 terá um total de 44 Pontos de Regalia, por exemplo.
                </Typography>
                <Typography className="bigBoxTextGUIAMC" >
                    Dos quatro Pontos de Regalia do primeiro nível, três deles já estão pré-determinados. O primeiro ponto deve ser usado obrigatoriamente para comprar uma Regalia de Espécie, o segundo ponto para uma Regalia da Classe Aprendiz e o terceiro ponto para uma Regalia da Profissão escolhida. O quarto ponto pode ser gasto onde quiser e, assim como nos próximos níveis, e até mesmo guardá-lo para os próximos níveis com a intenção de comprar Regalias mais caras. Essa estrutura garante que os personagens tenham uma base sólida e equilibrada em termos de espécie, classe e profissão, promovendo diversidade e consistência no desenvolvimento inicial. Além disso, a flexibilidade do quarto ponto permite personalização e planejamento estratégico a longo prazo, incentivando a criação de personagens únicos e adaptáveis.
                </Typography>
                <Typography className="bigBoxTextGUIAMC" >
                    As Regalias podem conceder várias Habilidades. Existem dois tipos principais de Regalias: passivas e ativas. Regalias passivas não precisam de pontos de Estâmina ou Magia para funcionar, apenas dependem da situação certa. Algumas Regalias passivas estão sempre ativas, enquanto outras precisam de uma ou mais condições específicas para funcionar, como usar uma ação específica.
                </Typography>
                <Typography className="bigBoxTextGUIAMC" >
                    Por outro lado, as Regalias ativas são Habilidades que exigem a ativação por meio de uma ação ou mais, quase sempre com o gasto de pontos de Estâmina ou Magia. Essas Regalias podem ser ações normais ou reações a eventos específicos.
                </Typography>
                <Typography className="bigBoxTextGUIAMC" >
                    É importante observar as descrições e requisitos das Regalias ao escolhê-las, pois algumas podem oferecer ataques especiais ou efeitos únicos, enquanto outras podem proporcionar benefícios passivos ou suporte. Certifique-se de entender como as Regalias funcionam e como elas se encaixam no estilo de jogo do seu personagem.

                </Typography>

                <Typography variant="h4" className="boxTextTitle">Como Começar?</Typography>
                <Typography variant="h6" className="boxTextTitle">Habilidades</Typography>
                <Typography className="bigBoxTextGUIAMC">
                    Muito importante entender como funcionam o sistema de Habilidades e pontos de habilidade no sistema para tomar decisões informadas. A seguir estão as prncipais informações relacionadas a habilidades e como elas funionão em jogo. Ao lado encontramos uma leve eplicação sobre os grupose de habilidade.
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'start', flexFlow: 'row wrap', justifyContent: 'center', width: '100%', mx: 'auto' }}>
                    <SkillsCard /><BodyCard /><KnowledgeSkillsCard />  <ExplorationSkillsCard /><ArcanaCard /><SocialCard />
                </Box>
                <Typography variant="h6" className="boxTextTitle">Distribuição inicial de pontos</Typography>
                <List sx={{ margin: "auto", px: 0 }}>

                    <ListItem sx={{ px: 0 }} className="esteban">
                        Escolha dois dos Grupos de Habilidade (Físico, Conhecimento, Exploração, Arcana ou Social). Receba 1 ponto de habilidade em cada uma das Habilidades do Grupo. Esses incrementos são considerados os primeiros incrementos para propósitos de distribuição de pontos de Habilidade.
                        Ao atingir o Nível 7 escolha um nova aba, diferente das opções escolhidas no nível 1, para receber o mesmo incremento.<br />
                    </ListItem>
                    <ListItem sx={{ px: 0 }} className="esteban">

                        Aloque 40 pontos em Habilidades ou Proficiências. Ao alocar os pontos de habilidade, siga as regras a seguir: a partir do sétimo será 4 pontos de habilidade por incremento (ao invés de 3).

                    </ListItem>
                    <ListItem sx={{ px: 0 }} className="esteban">
                        Depois do quarto incremento em uma Habilidade, são necessários 2 pontos de habilidade para o quinto incremento (ao invés de 1) , 3 para um sexto (ao invés de 2) e a partir do sétimo será 4 pontos de habilidade por incremento (ao invés de 3).

                    </ListItem>
                    <ListItem sx={{ px: 0 }} className="esteban">
                        O valor máximo de uma Habilidade é igual a 15. Se alguma Regalia lhe fornecer pontos em uma habilidade que já esteja no valor de 15, escolha outra habilidade do mesmo grupo (Físico, Conhecimento, Exploração, Arcana ou Social) para adicionar o ponto.

                    </ListItem>

                    <ListItem sx={{ px: 0 }} className="esteban">
                        O personagem ganha 4 pontos de proficiência, além dos 40 pontos de habilidade anteriores, para aplicar apenas em proficiências.

                    </ListItem>

                    <ListItem sx={{ px: 0 }} className="esteban">
                        Escolha um antecedente da lista, que fornecerá dinheiro inicial e pontos de habilidade para aplicar em habilidades de acordo com cada antecedente. Adicione esses pontos de habilidade após a distribuição dos 40  pontos de habilidade  inicial.

                    </ListItem>

                    <ListItem sx={{ px: 0 }} className="esteban">
                        Após distribuir os pontos de habilidade entre as opções, a única maneira de ganhar pontos de habilidade adicionais é através do sistema de Regalias, de Classe ou Espécie.

                    </ListItem>

                    <ListItem sx={{ px: 0 }} className="esteban">
                        Escolha a espécie do seu personagem. Cada espécie tem uma Regalia obrigatória inicial que ajuda a determinar o tipo de criatura que seu personagem é, dentro daquela espécie. O primeiro ponto compra uma das opções, após isso é preciso escolher fora da lista de regalias obrigatórias daquela espécie.
                    </ListItem>
                    <ListItem sx={{ px: 0 }} className="esteban">
                        Escolha uma profissão para o seu personagem. Aloque um ponto em uma das opções da profissão escolhida. A profissão é responsável por fornecer  a capacidade de criar itens de utilidade como armas, armaduras, poções e outras opções que podem te ajudar a criar o personagem do seu jeito da melhor forma  para a história.

                    </ListItem>

                    <ListItem sx={{ px: 0 }} className="esteban">
                        Para evoluir para uma das Classes Primárias (Combatente, Noviço(a), Iniciado(a) e Feiticeiro(a)), o personagem deve escolher a Regalia da classe Aprendiz correspondente e atingir o Nível 3 do personagem. Ao tentar comprar regalias de uma classe diferente da sua é necessário comprar regalia de aprendiz referente a classe, se ainda não tiver.

                    </ListItem>

                    <ListItem sx={{ px: 0 }} className="esteban">
                        Para alcançar uma das Especializações de Classe, o personagem deve adquirir 10 Regalias na Classe Primária requerida.Ao ler as classes é perceptível que existem Regalias que são em como uma corrente que uma é ligada a outra, e podem parecer uma regalia só com várias camadas, mas cada ponto gasto nessa corrente conta com uma regalia diferente. No caso de Especializações que vêm de uma combinação de Classes Primárias, cada uma tem um requisito específico de quantas Regalias são necessárias em cada classe.
                    </ListItem>

                    <ListItem sx={{ px: 0 }} className="esteban">
                        Um personagem pode escolher até duas especializações, mas pode escolher todas as classes desde que tenha a classe de aprendiz correspondente.
                    </ListItem>

                    <ListItem sx={{ px: 0, mb: 8 }} className="esteban">
                        Além disso, o personagem avança de nível quando atinge o valor de Pontos de Experiência cumulativo equivalente ou através do sistema de marco, que é decidido pelo grupo em conjunto com o mestre. Na tabela fornecida, estão os valores de Pontos de Experiência necessários para cada nível. O mestre pode alterar esses valores de acordo com o seu mundo e modo de jogo.
                    </ListItem>
                </List>

            </Box >
            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>

    );
}

export default HowToMakeCharPage;
