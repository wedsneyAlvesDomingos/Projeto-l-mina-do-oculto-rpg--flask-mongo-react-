import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./conditions.css";


const ConditionsPage = () => {


    const condicoes = [
        {
            titulo: 'Atordoado',
            descricao: `Uma criatura atordoada não pode se mover, reagir, conjurar magias, usar feitiços e tem sua defesa reduzida em 2 pontos. Se a fonte da condição não especificar a duração da condição ela dura 1 rodada.`
        },
        {
            titulo: 'Cego',
            descricao: `Uma criatura cega não consegue ver o ambiente ou outras criaturas ao seu redor, dificultando sua navegação e percepção. Testes de Habilidades que envolvem atacar, investigar, rastrear, perceber e ler sofrem uma penalidade de 3 pontos. Ao lutar contra um inimigo cego, o atacante é considerado Obscurecido. Se a fonte da condição não especificar a duração da condição ela dura 2 rodadas.`
        },
        {
            titulo: 'Cansado',
            descricao: `Cansaço Leve:o personagem está começando a se sentir fatigado. -1 em todas as jogadas de ataque e habilidade.\n
Cansaço Moderado:o personagem está claramente cansado. -2 em todas as jogadas de ataque e habilidade.
-1,5 metros de velocidade de movimento. Mínimo de 1,5 metros por ação de movimento.\n
Cansaço Sufocante:o personagem está se esforçando muito para continuar. -3 em todas as jogadas de ataque e habilidade.
-1,5 metros de velocidade de movimento. Mínimo de 1,5 metros por ação de movimento.\n
Cansaço Avassalador:o personagem está à beira do colapso. -4 em todas as jogadas de ataque e habilidade.
-1,5 metros de velocidade de movimento. Mínimo de 1,5 metros por ação de movimento.\n
Cansaço Esmagador:o personagem mal consegue se manter de pé. -5 em todas as jogadas de ataque e habilidade.
-3  metros de velocidade de movimento. Mínimo de 1,5 metros por ação de movimento.\n
Cansaço Exaustivo:o personagem está à beira do desmaio. -6 em todas as jogadas de ataque e habilidade.
-3 metros de velocidade de movimento. Mínimo de 1,5 metros por ação de movimento.\n
Cansaço Desesperador:o personagem está completamente esgotado,. -7 em todas as jogadas de ataque e habilidade. Além disso, o personagem sofre 3 pontos de dano devido ao esforço excessivo no início de cada rodada que realiza qualquer ação em um combate.\n
-4,5 metros de velocidade de movimento. Mínimo de 1,5 metros por ação de movimento.
`
        },
        {
            titulo: 'Envenenado',
            descricao: `Uma criatura envenenada sofre dano de veneno a cada turno, até que o efeito acabe ou seja utilizado um antídoto. O dano depende do tipo de veneno. Além disso, dependendo do veneno utilizado, a criatura pode sofrer outros efeitos, que também terminam com a duração do veneno ou ao utilizar um antídoto. `
        },
        {
            titulo: 'Restringido',
            descricao: `A criatura tem seu movimento reduzido a zero e todos os ataques sofrem desvantagem no rolamento de ataque. Além disso, se uma criatura restringir fisicamente a outra,a criatura restringida perde uma ação por turno, a menos que consiga escapar ou o efeito termine. Se conseguir escapar usando uma ação de escapar, ele recupera a ação perdida no mesmo turno. Se a fonte da condição não especificar a duração da condição ela dura 2 rodadas.`
        },
        {
            titulo: 'Deitado',
            descricao: `Uma criatura está deitada quando seu corpo está na posição horizontal em contato com uma superfície paralela, que não esteja na vertical. Um personagem deitado sofre uma penalidade de 1 ponto em seu valor de acerto para todos os ataques. Para levantar, um personagem deitado precisa usar uma ação de movimento. Outros personagens têm um bônus de 1 ponto para acertar um personagem deitado em um ataque corpo a corpo e uma penalidade de 1 ponto para ataques à distância.`
        },
        {
            titulo: 'Incapacitado',
            descricao: `Uma criatura incapacitada cai ao chão na condição deitada e fica atordoada. Se a fonte da condição não especificar a duração da condição ela dura 2 rodadas.`
        },
        {
            titulo: 'Surdo',
            descricao: `Uma criatura surda perde a capacidade de compreender ou perceber informações por meio do som. Se uma Habilidade requer que o personagem ouça para obter benefícios, um personagem surdo não os recebe. Um personagem surdo sofre uma penalidade de -5 em testes de percepção que envolvam som. Se a criatura também estiver cega, sofre uma penalidade adicional de -10 em qualquer teste de Habilidade.`
        },
        {
            titulo: 'Sangrando',
            descricao: `Uma criatura entra na condição de sangramento se sofrer dano de certas armas ou Habilidades. Nessa condição, a criatura sofre 2 pontos de dano ao iniciar seu turno, até ser tratada uma ação usando um teste de medicina 12, ou curada por magia.`
        },
        {
            titulo: 'Paralisado',
            descricao: `Uma criatura paralisada está Atordoada e seu corpo se trava. Todo ataque corpo a corpo contra uma criatura paralisada recebe vantagem no rolamento de ataque. Se a fonte da condição não especificar a duração da condição ela dura 2 rodadas.`
        },
        {
            titulo: 'Aterrorizado',
            descricao: `Uma criatura aterrorizada sofre uma penalidade de -1 em todos os testes de Habilidade que realizar e é obrigada a gastar sua primeira ação em cada turno para se mover o mais longe possível da fonte de terror, até que a condição termine ou o alvo seja incapacitado. Se a fonte da condição não especificar a duração da condição ela dura 2 rodadas.`
        },
        {
            titulo: 'À Beira da Morte',
            descricao: `À Beira da Morte:\n
                Uma criatura que está à beira da morte está gravemente ferida e pode estar em perigo de morrer. Normalmente atinge esse estado quando seus pontos de vida atingem ou são reduzidos abaixo de zero. Na condição de estar à beira da morte, a criatura está incapacitada e deve fazer testes de morte e estabilização.\n
                Durante o turno de uma criatura à beira da morte, ela deve fazer um teste de morte. O teste de morte é um Rolamento de um d20 com as seguintes regras:\n
                Se o resultado do teste de morte for 10 ou mais, a criatura tem sucesso em um teste de estabilização.\n
                Se o resultado do teste de morte for 9 ou menos,ou a criatura sofrer  um total de pelo menos 5 de dano após entrar na condição,  a criatura falha em um teste de estabilização. A criatura sofre uma falha a cada 5 de dano que tomar neste estado, mesmo no mesmo ataque.\n
                Se o resultado do teste de morte for 1, é considerado uma falha crítica, e a criatura sofre dois fracassos de estabilização.\n
                Se o resultado do teste de morte for 20, é considerado um sucesso crítico, e a criatura estabiliza automaticamente e recupera seu valor de fortitude em pontos de vida.\n
                Uma criatura à beira da morte pode receber cura mágica ou estabilização de outro personagem. Se a criatura receber qualquer cura, ela recupera pontos de vida e não precisa fazer mais testes de morte. Se a criatura for estabilizada por outra pessoa usando uma ação de estabilização, ela não precisa mais fazer testes de morte, mas ainda estará paralisada e à beira da morte até receber cura adequada.\n
                Caso a criatura falhe em três testes de morte, ela morre. Se a criatura obtiver cinco sucessos, ela estabiliza e não precisa fazer mais testes de morte. A estabilização também pode ocorrer se a criatura receber cura ou estabilização de outra fonte.
`
        },
        {
            titulo: 'Congelando',
            descricao: `Uma criatura na condição de congelamento passa por uma sequência de eventos progressivos. Para sair dessa condição, é preciso estar ao alcance de uma forte fonte de calor por uma rodada inteira, como uma grande fogueira, ser colocado em chamas ou estar próximo de uma fonte de lava. Outra criatura também pode ajudar com magias, milagres, feitiços ou a criatura na condição pode esperar até que o efeito acabe, caso não seja fatal. À medida que as rodadas passam, e a fonte do congelamento persiste, a criatura congela cada vez mais e sofre penalidades, conforme descrito abaixo:\n
            1ª Rodada: Redução de 1,5 metros na velocidade de movimento.\n
            2ª Rodada: Efeito anterior +desvantagem em rolamentos de ataques.\n
            3ª Rodada: Redução de 3 metros na velocidade de movimento +desvantagem em rolamentos de ataques.\n
            4ª Rodada: Redução de 3 metros na velocidade de movimento +desvantagem em rolamentos de ataques + uma ação a menos por turno.\n
            5ª Rodada: Redução de 4,5 metros na velocidade de movimento + desvantagem em rolamentos de ataques + uma ação a menos por turno.\n
            6ª Rodada: Redução de 6 metros na velocidade de movimento + desvantagem em rolamentos de ataques + duas ações a menos por turno.\n
            7ª Rodada: Redução de 7,5 metros na velocidade de movimento+desvantagem em rolamentos de ataques + duas ações a menos por turno.\n
            8ª Rodada: Redução de 9 metros na velocidade de movimento + desvantagem em rolamentos de ataques + duas ações a menos por turno.\n
            9ª Rodada: A criatura entra na condição de Atordoado.\n
            15ª Rodada: A criatura entra na condição de Paralisado.\n
            20ª Rodada: A criatura entra na condição de À Beira da Morte.
`
        },
        {
            titulo: 'Queimando',
            descricao: `Nível 1: Uma criatura queimando está ativamente em chamas ou em contato com algum material incandescente. Essa criatura recebe 1d4 de dano a cada rodada em que fica em contato com fogo, como mencionado anteriormente. Para sair dessa condição, o personagem deve apagar as chamas de alguma forma, como jogar água, entrar na água ou rolar no chão, ou deve sair do contato com o material incandescente.\n
            Nível 2: Uma criatura queimando está ativamente em chamas ou em contato com algum material incandescente. Essa criatura recebe 1d6 pontos de dano a cada rodada em que fica em contato com fogo, como mencionado anteriormente. Para sair dessa condição, o personagem deve apagar as chamas de alguma forma, como jogar água, entrar na água ou rolar no chão, ou deve sair do contato com o material incandescente.\n
            Nível 3: Uma criatura queimando está ativamente em chamas ou em contato com algum material incandescente. Essa criatura recebe 2d6 pontos de dano a cada rodada em que fica em contato com fogo, como mencionado anteriormente\n
            Queimando em lava:\n
            Parcialmente submergida ou em contato com lava: A criatura sofre 6d6 pontos de dano a cada rodada.\n
            Grande parte submergida ou em contato com lava: A criatura sofre 12d6 pontos de dano por rodada.
`
        },
        {
            titulo: 'Obscurecido',
            descricao: `Uma criatura na condição obscurecida está além da visão de outras criaturas e não pode ser atingida por habilidades que exijam que o alvo seja uma criatura que possa ser vista. Além disso, a criatura ganha +1 de bônus de acerto e em testes de Furtividade.
`
        },
        {
            titulo: 'Escondido',
            descricao: `Uma criatura na condição escondida está obscurecida. Uma criatura é considerada escondida quando outras conseguem perceber normalmente, mas não sabem onde a criatura está escondida. Uma criatura escondida fora de combate ao atacar uma criatura deixa seu alvo em condição Surpreso. Além disso, a criatura ganha vantagem no rolamento de ataque.`
        },
        {
            titulo: 'Surpreso',
            descricao: `Uma criatura surpresa não pode agir ou reagir até sair desse estado. Ela tem seu valor de defesa reduzido em 2, e ataques contra ela têm a chance de serem críticos um número abaixo do valor necessário no d20 para serem considerados um crítico. Uma criatura não está mais na condição surpresa  quando um turno de combate passar e a criatura conseguir perceber seus inimigos. Por exemplo, se uma criatura surpreende outra com um ataque de uma adaga que tem uma margem de crítico de 19, na condição surpreendida, a adaga ataca criticamente em um rolamento de 18 ou maior no d20.`
        },
        {
            titulo: 'Devagar',
            descricao: `Uma criatura na condição devagar possui metade de seu movimento,  só pode realizar um ataque por ação e tem um custo extra de 1 ação para cada ação tomada. Ao realizar qualquer ação que consuma duas ações, uma criatura nesta condição, consome três de suas ações (e assim por diante).`
        }
    ];

    const Condicoes = () => {
        return (
            <Box  sx={{width:'90%', mt: 4, mb: 6 , mx:'auto'}}>
                <Typography className="MainTitleC" variant="h4" gutterBottom>
                    Condições
                </Typography>
                <Box  sx={{ my: 4 }}>
          
                        <Typography className="boxTextTitle" variant="h5" gutterBottom>
                            Condições em RPG de Mesa
                        </Typography>
                        <Typography  className="bigBoxTextClasses" variant="body1">
                            No coração de muitos sistemas de RPG de mesa, as condições representam mais do que simples estados temporários de personagens —
                            elas são o motor por trás da imprevisibilidade, profundidade tática e drama do combate. Trata-se de um conjunto de efeitos
                            narrativos e mecânicos que alteram diretamente a forma como uma criatura interage com o mundo ao seu redor e com os outros
                            personagens, abrindo espaço para estratégias criativas, decisões significativas e reviravoltas marcantes em batalha.
                        </Typography>
             
                </Box>

                <Box sx={{my:2}}>

                        <Typography className="boxTextTitle" variant="h6">O Que São Condições?</Typography>


                        <Typography  className="bigBoxTextClasses" variant="body2">
                            Condições são estados específicos que afetam um personagem ou criatura, temporariamente ou até que sejam tratados. Elas podem
                            surgir a partir de diversas fontes: manobras de combate bem-sucedidas, feitiços e magias poderosas, milagres divinos ou até
                            elementos do ambiente, como fogo, gelo, venenos ou armadilhas. Uma condição pode prejudicar, enfraquecer, restringir ou até
                            incapacitar uma criatura — mas também pode, em certos casos, servir como oportunidade para ações táticas ou combos mais
                            elaborados.
                        </Typography>

                </Box>

                <Box sx={{my:2}}>
                  
                        <Typography className="boxTextTitle" variant="h6">Por Que Usar Condições?</Typography>
                   
               
                        <Typography  className="bigBoxTextClasses" variant="body2">
                            O uso de condições em TTRPGs serve a vários propósitos fundamentais:
                            <ul>
                                <li>
                                    <strong>Tornar o combate mais dinâmico:</strong> Envolve controle, movimentação, manipulação de estado e interrupção de ações.
                                </li>
                                <li>
                                    <strong>Encorajar decisões inteligentes:</strong> Um personagem pode infligir uma condição debilitante para impedir ações perigosas.
                                </li>
                                <li>
                                    <strong>Favorecer o jogo em equipe:</strong> Condições criam oportunidades de colaboração tática e sinergia entre personagens.
                                </li>
                            </ul>
                        </Typography>
                   
                </Box>
                <Typography variant="body2"  className="bigBoxTextClasses" color="text.secondary" sx={{ mb: 2 }}>
                    Lembrete: Apenas a maior penalidade ou bônus de acerto ou defesa é aplicada em uma criatura. Os outros efeitos são sim cumulativos.
                </Typography>
                <Box>
                    {condicoes.map((cond, index) => (
                        <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className="boxTextTitle" variant="h6">{cond.titulo}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography  className="bigBoxTextClasses" style={{ whiteSpace: 'pre-line' }}>
                                    {cond.descricao}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Box>
        );
    }
    return (
        <Box sx={{ minHeight: '700px', width: '100%' }} >
            <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
                <Condicoes />
            </Box>

            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>
    );
};

export default ConditionsPage;
