import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./actions.css";


const Actionspage = () => {

    const acoes = [
        {
            title: "Abrir Fechadura",
            description: "Custa duas ações. Uma criatura proficiente com kit de arrombamento que as tenha em mãos, pode tentar arrombar uma fechadura usando suas Habilidades.  A dificuldade dessa ação depende da complexidade da fechadura. Alternativamente, um personagem pode tentar arrombar a porta com um golpe poderoso ou magia.A dificuldade dessa ação depende da porta e sua construção.",
        },
        {
            title: "Agarrar",
            description: "Iniciar um Agarrar: A criatura pode tentar agarrar um oponente realizando um teste de Força contra o teste de Força do adversário. Se for bem - sucedida, a criatura consegue agarrar a outra, colocando- a na condição Agarrado. Efeitos do Agarrar: Agarrado: A criatura agarrada tem sua velocidade reduzida a 0 e não pode se beneficiar de quaisquer bônus de velocidade.Ataques feitos contra a criatura agarrada recebem vantagem A criatura que realiza o agarrão pode mover a criatura agarrada, mas sua própria velocidade é reduzida pela metade durante esse movimento. Tentativas Adicionais no Mesmo Turno: Se uma criatura falhar em agarrar seu oponente e tentar novamente no mesmo turno, sofrerá uma penalidade cumulativa de - 2 pontos na próxima tentativa e em todas as subsequentes no mesmo turno. Tamanho das Criaturas: Não é possível agarrar uma criatura que seja dois tamanhos acima do seu próprio. Manter e Escapar de um Agarrar Manter o Agarrar: No início de cada um dos seus turnos, a criatura que está agarrando deve fazer um novo teste de Força contra o teste de Força da criatura agarrada. Se falhar, a criatura agarrada escapa e a condição de agarrado termina. Escapar de um Agarrar: Uma criatura agarrada pode usar sua ação escapar. Outras Ações Enquanto Agarrando: A criatura que está agarrando pode atacar a criatura agarrada com vantagem em ataques corpo a corpo. A criatura que está agarrando não pode usar as duas mãos para outras ações enquanto mantém o agarrão, a menos que tenha uma habilidade ou regalia que permita, ou tenha mais que dois braços.   Considerações Adicionais: Ações de Ajuda, outra criatura pode usar sua ação para ajudar uma criatura a escapar de um agarrão, fornecendo vantagem no teste de escape.Penalidades de Tamanho: Criaturas dois tamanhos maiores , ou mais, têm vantagem nos testes para manter o agarrão.",
},
    {
        title: "Atacar",
        description: "Uma criatura pode realizar um ataque como uma ação. Cada criatura pode atacar apenas uma vez por ação, a menos que possua uma Regalia que permita o contrário. Quando uma criatura realiza mais de uma ação “atacar” no mesmo turno, a partir da segunda vez que usar a ação atacar, os ataques feitos terão desvantagem. É importante destacar que Regalias que permitam realizar um ataque como parte de uma Habilidade também sofrem essa penalidade.Caso a criatura ao rolar o seu ataque role mais que 10 acima do valor de defesa do alvo ganha 1d4 de dano bônus em seu ataque. Caso a criatura ao rolar o seu ataque role mais que 15 acima do valor de defesa do alvo ganha  2 pontos de dano bônus em seu ataque. Caso a criatura ao rolar o seu ataque role mais que 20 acima do valor de defesa do alvo ganha  3 pontos de dano bônus em seu ataque.",
    },
    {
        title: "Buscar",
        description: "Um personagem pode, ao fazer um teste de percepção, tentar localizar visualmente um objeto, rota ou criatura...",
    },
    {
        title: "Buscar Cobertura",
        description: "Uma criatura pode se abrigar atrás de obstáculos físicos no ambiente em que se encontra para se proteger de projéteis...",
    },
    {
        title: "Comandar Animal",
        description: "Uma criatura que possui um companheiro animal ou que consegue tomar controle de um através de magia pode comandá-lo...",
    },
    {
        title: "Distrair",
        description: "Uma criatura pode distrair outra para ajudar seus aliados. Para isso, a criatura deve realizar uma ação que chame a atenção...",
    },
    ];

const AcoesComponent = () => {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Ações Primárias
            </Typography>
            {acoes.map((acao, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">{acao.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{acao.description}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}

        </div>
    );
};

return (
    <Box sx={{ minHeight: '700px', width: '100%' }} >

        <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
            <Typography className="MainTitleC" variant="h4" gutterBottom sx={{ my: 4 }}>
                Ações
            </Typography>
            <Typography className="bigBoxTextClasses" paragraph sx={{ py: 4 }}>
                Durante seu turno, todo personagem tem a capacidade de realizar três ações. As opções de ações disponíveis podem variar e são definidas de acordo com as regras do jogo. Recomenda-se consultar a seção específica sobre ações para obter informações detalhadas sobre as ações que podem ser tomadas.

            </Typography>

            <Paper sx={{ px: 2, py: 2, mb: 4, display: "flex", flexFlow: 'column wrap', justifyContent: 'center' }}>
                <Typography variant="h5" gutterBottom sx={{ pt: 1, textAlign: 'center' }}>
                    Condições
                </Typography>
                <Typography className="bigBoxTextClasses" paragraph sx={{ pb: 4, width: '90%' }}>
                    Atenção: Existem várias ações, magias, manobras, milagres e feitiços que causam algum tipo de efeito em seu alvo, alguns desses efeitos são chamados de condições. Estas condições são efeitos que afetam valores de Habilidade dentro e fora de combate. Para saber exatamente o que cada uma faz vá ao tópico de Condições e leia com atenção Fique atento com os  seguintes termos :

                </Typography>
                <Box sx={{ display: "flex", flexFlow: 'row wrap', justifyContent: 'center' }}>
                    <List sx={{ width: "28%" }}>
                        {["À Beira Da Morte", "Aterrorizado", "Cego", "Cansado", "Congelando", "Deitado", "Devagar",].map((condicao, index) => (
                            <ListItem key={index}>
                                <ListItemText className="bigBoxTextEquips" primary={condicao} />
                            </ListItem>
                        ))}

                    </List>
                    <List sx={{ width: "28%" }}>
                        {["Envenenado", "Obscurecido", "Escondido", "Enfraquecido", "Paralisado", "Queimando", "Restringido",].map((condicao, index) => (
                            <ListItem key={index}>
                                <ListItemText className="bigBoxTextEquips" primary={condicao} />
                            </ListItem>
                        ))}
                    </List>
                    <List sx={{ width: "28%" }}>
                        {["Sangrando", "Surdo", "Surpreso"].map((condicao, index) => (
                            <ListItem key={index}>
                                <ListItemText className="bigBoxTextEquips" primary={condicao} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Paper>
            <AcoesComponent />
        </Box>

        <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
        </Box>
    </Box>
);
};

export default Actionspage;
