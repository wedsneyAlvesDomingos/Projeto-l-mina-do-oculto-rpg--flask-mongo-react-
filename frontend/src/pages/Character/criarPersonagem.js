import React, { useState, useCallback, useRef } from 'react';
import dayjs from 'dayjs';
import { Box, Tabs, Tab, Typography, Paper, Tooltip, Grid, TextField, Button } from '@mui/material';
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
const Fisico = () => {
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

    const [values, setValues] = React.useState(
        Object.fromEntries(data.map((item) => [item.title, 0]))
    );

    const handleChange = (title, newValue) => {
        setValues((prev) => ({ ...prev, [title]: parseInt(newValue) }));
    };
    console.log(values);

    return (
        <Paper elevation={3} sx={{ padding: 2, mx: 0, width: "19.5%", my: 1, borderBottom: '10px solid #7B3311', }}>
            <Typography variant="h6" gutterBottom>
                Físico
                <Checkbox />
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {data.map((item, index) => (
                    <Box key={index} gap={2} sx={{ justifyContent: 'space-around', display: "flex", alignItems: "center" }}>
                        <Tooltip title={item.description} arrow placement="right">
                            <Typography sx={{ width: "200px", cursor: "help" }}>
                                {item.title}
                            </Typography>
                        </Tooltip>
                        <TextField
                            label="Valor"
                            type="number"
                            size="small"
                            value={values[item.title]}
                            onChange={(e) => handleChange(item.title, e.target.value)}
                            sx={{ width: "100px" }}
                            inputProps={{ min: 0 }}
                        />
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};
const Exploracao = () => {

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

    const [values, setValues] = React.useState(
        Object.fromEntries(data.map((item) => [item.title, 0]))
    );

    const handleChange = (title, newValue) => {
        setValues((prev) => ({ ...prev, [title]: parseInt(newValue) }));
    };
    console.log(values);

    return (
        <Paper elevation={3} sx={{ padding: 2, mx: 0, width: "19.5%", my: 1, borderBottom: '10px solid #7B3311', }}>
            <Typography variant="h6" gutterBottom>
                Exploração <Checkbox />
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {data.map((item, index) => (
                    <Box key={index} gap={2} sx={{ justifyContent: 'space-around', display: "flex", alignItems: "center" }}>
                        <Tooltip title={item.description} arrow placement="right">
                            <Typography sx={{ width: "200px", cursor: "help" }}>
                                {item.title}
                            </Typography>
                        </Tooltip>
                        <TextField
                            label="Valor"
                            type="number"
                            size="small"
                            value={values[item.title]}
                            onChange={(e) => handleChange(item.title, e.target.value)}
                            sx={{ width: "100px" }}
                            inputProps={{ min: 0 }}
                        />
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};
const Conhecimento = () => {

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
    const [values, setValues] = React.useState(
        Object.fromEntries(data.map((item) => [item.title, 0]))
    );

    const handleChange = (title, newValue) => {
        setValues((prev) => ({ ...prev, [title]: parseInt(newValue) }));
    };
    console.log(values);

    return (
        <Paper elevation={3} sx={{ padding: 2, mx: 0, width: "19.5%", my: 1, borderBottom: '10px solid #7B3311', }}>
            <Typography variant="h6" gutterBottom>
                Exploração <Checkbox />
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {data.map((item, index) => (
                    <Box key={index} gap={2} sx={{ justifyContent: 'space-around', display: "flex", alignItems: "center" }}>
                        <Tooltip title={item.description} arrow placement="right">
                            <Typography sx={{ width: "200px", cursor: "help" }}>
                                {item.title}
                            </Typography>
                        </Tooltip>
                        <TextField
                            label="Valor"
                            type="number"
                            size="small"
                            value={values[item.title]}
                            onChange={(e) => handleChange(item.title, e.target.value)}
                            sx={{ width: "100px" }}
                            inputProps={{ min: 0 }}
                        />
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};
const Arcana = () => {

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
    const [values, setValues] = React.useState(
        Object.fromEntries(data.map((item) => [item.title, 0]))
    );

    const handleChange = (title, newValue) => {
        setValues((prev) => ({ ...prev, [title]: parseInt(newValue) }));
    };
    console.log(values);

    return (
        <Paper elevation={3} sx={{ padding: 2, mx: 0, width: "19.5%", my: 1, borderBottom: '10px solid #7B3311', }}>
            <Typography variant="h6" gutterBottom>
                Arcana <Checkbox />
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {data.map((item, index) => (
                    <Box key={index} gap={2} sx={{ justifyContent: 'space-around', display: "flex", alignItems: "center" }}>
                        <Tooltip title={item.description} arrow placement="right">
                            <Typography sx={{ width: "200px", cursor: "help" }}>
                                {item.title}
                            </Typography>
                        </Tooltip>
                        <TextField
                            label="Valor"
                            type="number"
                            size="small"
                            value={values[item.title]}
                            onChange={(e) => handleChange(item.title, e.target.value)}
                            sx={{ width: "100px" }}
                            inputProps={{ min: 0 }}
                        />
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};
const Social = () => {

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
    const [values, setValues] = React.useState(
        Object.fromEntries(data.map((item) => [item.title, 0]))
    );

    const handleChange = (title, newValue) => {
        setValues((prev) => ({ ...prev, [title]: parseInt(newValue) }));
    };
    console.log(values);

    return (
        <Paper elevation={3} sx={{ padding: 2, mx: 0, width: "19.5%", my: 1, borderBottom: '10px solid #7B3311', }}>
            <Typography variant="h6" gutterBottom>
                Social <Checkbox />
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {data.map((item, index) => (
                    <Box key={index} gap={2} sx={{ justifyContent: 'space-around', display: "flex", alignItems: "center" }}>
                        <Tooltip title={item.description} arrow placement="right">
                            <Typography sx={{ width: "200px", cursor: "help" }}>
                                {item.title}
                            </Typography>
                        </Tooltip>
                        <TextField
                            label="Valor"
                            type="number"
                            size="small"
                            value={values[item.title]}
                            onChange={(e) => handleChange(item.title, e.target.value)}
                            sx={{ width: "100px" }}
                            inputProps={{ min: 0 }}
                        />
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};
const CharCreationPage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    const [tabRegrasIndex, setTabRegrasIndex] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabRegrasIndex(newValue);
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

    return (
        <Box sx={{ width: '100%', minHeight: '850px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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

                            Aloque 40 pontos em Habilidades ou Proficiências. Ao alocar os pontos de habilidade, siga as regras a seguir: a partir do sétimo será 4 pontos de habilidade por incremento (ao invés de 3).

                        </ListItem>
                        <ListItem sx={{ px: 0 }} className="esteban">
                            Depois do quarto incremento em uma Habilidade, são necessários 2 pontos de habilidade para o quinto incremento (ao invés de 1) , 3 para um sexto (ao invés de 2) e a partir do sétimo será 4 pontos de habilidade por incremento (ao invés de 3).

                        </ListItem>
                        <ListItem sx={{ px: 0 }} className="esteban">
                            O valor máximo de uma Habilidade é igual a 15. Se alguma Regalia lhe fornecer pontos em uma habilidade que já esteja no valor de 15, escolha outra habilidade do mesmo grupo (Físico, Conhecimento, Exploração, Arcana ou Social) para adicionar o ponto.

                        </ListItem>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Fisico />
                            <Exploracao />
                            <Conhecimento />
                            <Arcana />
                            <Social />
                        </Box>
                    </TabPanel>

                    <TabPanel value={tabIndex} index={2}>
                        <Typography>Selecione proficiências iniciais.</Typography>
                        {/* Adicionar checklist ou seletores de proficiências aqui */}
                    </TabPanel>

                    <TabPanel value={tabIndex} index={3}>
                        <Typography>Escolha regalias de espécie.</Typography>
                        {/* Inputs para regalias_de_especie */}
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
