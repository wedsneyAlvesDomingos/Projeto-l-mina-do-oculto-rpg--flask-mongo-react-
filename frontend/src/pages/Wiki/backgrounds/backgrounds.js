import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./backgrounds.css";

// Importações centralizadas de dados
import { antecedentes } from '../../../data/constants';


const AntecendetesPage = () => {

    // Componente de card para cada antecedente
    const AntecedenteCard = ({ antecedente }) => (
        <Paper sx={{ minWidth: 275, m: 2, p: 2, borderTop: "4px solid #162A22", borderBottom: "8px solid #162A22", height: '470px', }}>
            <CardContent>
                <Typography className="boxTextTitle" variant="h6" component="div">
                    {antecedente.nome}
                </Typography>
                <Box className="armaCard" sx={{ height: "150px", overflowY: 'scroll', p: 1, border: "1px solid #5B1F0F", borderRadius: '10px' }}>
                    <Typography className="bigBoxTextEquips "  >
                        {antecedente.descricao}
                    </Typography>
                </Box>

                <ul>
                    {antecedente.habilidades.map((hab, index) => (
                        <li className="bigBoxTextBG" key={index}>{hab}</li>
                    ))}
                </ul>
            </CardContent>
        </Paper>
    );

    return (
        <Box sx={{ minHeight: '700px', width: '100%' }} >

            <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>
                <Typography className="MainTitleC" variant="h4" gutterBottom >
                    Antecedentes
                </Typography>
                <Typography className="boxTextTitle" variant="h5" gutterBottom >
                    A Importância do Antecedente na Ficha do Personagem
                </Typography>
                <Typography className="bigBoxTextClasses" paragraph >
                    O antecedente de um personagem desempenha um papel fundamental na construção de sua história e na definição de suas habilidades. Ele não apenas estabelece as bases do passado do personagem, mas também orienta suas decisões, ações e interações dentro do jogo. Através do antecedente, podemos entender de onde o personagem vem, que experiências moldaram sua vida e como ele enxerga o mundo ao seu redor.
                </Typography>
                <Typography className="bigBoxTextClasses" paragraph>
                    Esse contexto é essencial para a interpretação do personagem durante a aventura. Ele oferece uma motivação para o comportamento e as escolhas que o personagem faz, além de fornecer ao jogador ferramentas para dar mais profundidade e realismo ao seu papel. Atribuir habilidades específicas a um antecedente permite que o personagem se destaque em áreas que são relevantes para sua história, oferecendo uma maneira mais natural de se envolver com o ambiente e com os outros personagens.
                </Typography>
                <Typography className="bigBoxTextClasses" paragraph>
                    Assim, o antecedente não é apenas uma mecânica de jogo, mas também um elemento narrativo que dá significado a cada decisão tomada pelo personagem. Seja em situações de combate, exploração ou interação, o antecedente permite que o jogador explore um leque maior de possibilidades, com escolhas que são coerentes com a vida e as experiências de seu personagem.
                </Typography>
                <Typography className="bigBoxTextClasses" paragraph>
                    Todo antecedente começa com:
                    <ul>
                        <li>250 M.O.</li>
                        <li>Roupas simples</li>
                        <li> 5 Rações de Viagem</li>
                    </ul>
                </Typography>
                <Grid container spacing={2}>
                    {antecedentes.map((antecedente, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <AntecedenteCard antecedente={antecedente} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>
    );
};

export default AntecendetesPage;
