import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./especies.css";


const EspeciesPage = () => {

    function EspecieHumano() {
        const [tab, setTab] = useState(0);

        const handleChange = (event, newValue) => {
            setTab(newValue);
        };

        return (
            <Box sx={{ width: "100%", padding: "1rem" }}>
                <Typography variant="h4" className="MainTitleC">Espécies</Typography>

                <Typography className="bigBoxTextClasses" sx={{ mt: 2 }}>
                    A escolha da espécie em um TTRPG é crucial, pois molda a essência do personagem e influencia a narrativa. No Sistema Lâmina do Oculto (LDO), as regalias de espécie permitem uma customização única, tornando cada indivíduo de uma espécie singular e diversificado. Essas regalias refletem habilidades, traços culturais e vantagens peculiares, adicionando profundidade à caracterização e à interação com o mundo do jogo. Portanto, a escolha da espécie no LDO é uma promessa de aventuras únicas e uma oportunidade para destacar a individualidade do personagem.<br />
                    Cada espécie possui um grupo de Regalias que podem custar um ou mais Pontos de Regalia. O valor só será especificado quando custar pelo menos 2 pontos de Regalia.<br />


                </Typography>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h5" className="boxTextTitle" sx={{ mt: 4 }}>Humano</Typography>

                    <Tabs value={tab} onChange={handleChange} centered>
                        <Tab label="Descrição" className="tabs" />
                        <Tab label="Regalia Obrigatória" className="tabs" />
                        <Tab label="Regalias Opcionais" className="tabs" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>
                        <Typography className="bigBoxTextClasses">
                            Na vasta tapeçaria dos mundos, os seres humanos são frequentemente retratados como uma espécie de notável versatilidade. Eles são os sobreviventes por excelência, moldando-se e adaptando-se a uma miríade de circunstâncias desafiadoras, como a argila nas mãos de um habilidoso oleiro.<br />
                            A resiliência dos seres humanos é uma característica que os destaca. Diante de adversidades intransponíveis, eles não apenas resistem, mas florescem. Desafiando os elementos, as ameaças e as adversidades do destino, os humanos provaram ser mais do que meros mortais. Eles são a personificação da determinação, da vontade indomável de superar obstáculos e de encontrar maneiras de prosperar, não importa quão sombrio seja o cenário.<br />
                            Mas não é apenas a capacidade de sobrevivência que define os humanos. Sua capacidade destrutiva também é notável. Com criatividade e intelecto afiado, eles desvendam segredos, criam máquinas de guerra imponentes e dominam a magia como nenhuma outra espécie. Eles trazem a destruição, tanto com suas habilidades como com suas inovações, como uma força da natureza que molda o mundo ao seu redor.<br />
                            Assim, os seres humanos em um mundo representam mais do que simples mortais. Eles personificam a versatilidade, resiliência e capacidade destrutiva que reside no coração de todos nós. Eles nos lembram que, no jogo da vida e da imaginação, somos todos heróis em nossas próprias histórias, prontos para enfrentar o desconhecido, resistir à adversidade e moldar nosso destino à medida que avançamos corajosamente em direção ao desconhecido.
                        </Typography>
                        <Typography className="bigBoxTextClasses" style={{ marginTop: "1rem" }}>
                            <strong>Pontos de Vida Inicial:</strong> 10<br />
                        </Typography>
                        <Typography className="bigBoxTextClasses" style={{ marginTop: "1rem" }}>
                            <strong>Velocidade de Movimento:</strong> 6 metros<br />
                        </Typography>
                        <Typography className="bigBoxTextClasses" style={{ marginTop: "1rem" }}>
                            <strong>Tamanho:</strong> Médio
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Typography className="bigBoxTextEquipsHeader">Escolha um entre:</Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Prodígio Militar:</strong> Um humano que seja um prodígio militar pode realizar um teste de Percepção na mesma ação de atacar, a fim de identificar as fraquezas e forças do seu adversário. Ao passar no teste de habilidade com dificuldade estipulada pelo mestre, o humano ganha vantagem no rolamento de acerto deste e dos próximos ataques, e sua margem de cŕitico diminui em um até o final de seu turno atual. Ele pode executar essa leitura 3 vezes em um mesmo dia. O valor do teste pode ser alternativamente estipulado pela percepção do alvo, com um padrão de 10 + valor de percepção, se ele não tiver valor declarado, tome como base a dificuldade 15.<br />
                            Além disso, possui proficiência com espadas bastardas.

                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Gênio Acadêmico:</strong> Um humano que seja um gênio acadêmico possui um vasto conhecimento e memória excepcional. Um gênio acadêmico não esquece nada do que leu ou ouviu nos últimos 30 dias. Ele sempre sabe a hora do dia e a estação do ano. Gênios acadêmicos podem usar a ação Recordar Conhecimento enquanto realizam a ação Ler Ambiente ou Buscar Cobertura. Ele pode executar essa ação desta forma 5 vezes em um mesmo dia.
                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Faz Tudo:</strong> Um humano que seja um faz-tudo é um indivíduo que não se dedicou a dominar uma habilidade específica, mas aprendeu várias delas. Um faz-tudo pode realizar a ação Abrir fechadura e a ação Preparar com apenas uma ação, e a ação Desabilitar Dispositivo com  duas ações.  Ele pode escolher uma destas opções para executar desta maneira 3 vezes ao dia.<br/>
                            Ou pode escolher uma Proficiência para alocar 1 ponto.

                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography className="bigBoxTextEquipsHeader">Regalias:</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Sobrevivente do deserto:</strong> Reduz efeitos de exaustão por privação.</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Tatuagem Tribal (2 pontos de Regalia):</strong></Typography>
                        <ul className="bigBoxTextBG">
                            <li><strong>Falcão:</strong> Vantagem em Percepção visual até 100m</li>
                            <li><strong>Touro:</strong> Vantagem para mover obstáculos pesados</li>
                            <li><strong>Raposa:</strong> Vantagem para enganar perseguidores</li>
                            <li><strong>Tartaruga:</strong> Pode Buscar Cobertura junto ao movimento com escudo</li>
                        </ul>

                        <Typography className="bigBoxTextEquips"><strong>Pantaneiro:</strong> Ignora penalidade de terreno difícil em pântano. +2 em testes de Natureza relacionados.</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Determinação Humana (2 pontos de Regalia):</strong> Reroll 2x por dia em falhas; uma reação antes de cair à beira da morte (1x ao dia).</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Aumento de Habilidade:</strong> +2 em uma habilidade não combativa (ou que não seja Força, Destreza ou Agilidade).</Typography>
                    </TabPanel>
                </Paper>
            </Box>
        );
    }

    function TabPanel({ children, value, index }) {
        return (
            <div role="tabpanel" hidden={value !== index}>
                {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
            </div>
        );
    }

    return (
        <Box sx={{ minHeight: '700px', width: '100%' }} >
            <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>

                <EspecieHumano />
            </Box>

            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>
    );
};

export default EspeciesPage;
