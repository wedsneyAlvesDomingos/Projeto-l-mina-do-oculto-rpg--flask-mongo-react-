import { Container, Grid,  Typography, Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import React, { useState, useEffect, useCallback } from 'react';
import "./ldop.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import knight from "../../assets/images/image-from-rawpixel-id-6503681-png.png";


const WhatIsLDO = () => {


    return (

        <Box className="esteban" sx={{ minHeight: '700px', width: '100%' }}>
            <Box sx={{width:"80%", mx:'auto'}}>
                {/* Título Principal */}
                <Box my={4}>
                    <Typography  className="boxTextTitle"  variant="h1"  align="center" gutterBottom>
                        Desbravando os Mundos dos Jogos de RPG de Mesa
                    </Typography>
                </Box>

                {/* Seção 1 - Introdução */}
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 3 }}>
                            <Typography  className="bigBoxTextGUIA" variant="h6" paragraph>
                                Bem-vindo ao universo dos Jogos de RPG de Mesa, ou TTRPGs, como são carinhosamente conhecidos por seus entusiastas. Neste livro, embarcaremos em uma jornada para explorar a imaginação, onde a magia, a aventura e os dilemas morais se entrelaçam de maneira única, dando vida aos mais variados cenários e personagens.
                            </Typography>
                            <Typography  className="bigBoxTextGUIA" variant="body1" paragraph>
                                Os TTRPGs são um mundo à parte, um reino de narrativas colaborativas onde sua criatividade é a única limitação.
                            </Typography>
                            <Typography  className="bigBoxTextGUIA" variant="body1" paragraph>
                                Mas o que exatamente são os TTRPGs? E quantas pessoas em todo o mundo jogam? Vamos explorar isso.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* Espaço para Ilustração */}
                        <Box
                            sx={{
                                height: 300,
                                backgroundColor: '#ccc',
                                borderRadius: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#fff',
                                fontSize: '20px',
                            }}
                        >
                            
                        </Box>
                    </Grid>
                </Grid>

                {/* Seção 2 - O Que São os TTRPGs? */}
                <Grid container spacing={4} my={4}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 3 }}>
                            <Typography  className="bigBoxTextGUIA" variant="h6" paragraph>
                                Os Jogos de RPG de Mesa são uma forma de entretenimento interativo e colaborativo, onde os jogadores assumem o papel de personagens fictícios e, com o auxílio de um Mestre de Jogo, embarcam em aventuras que podem variar de caçadas épicas por tesouros perdidos a intrigas políticas em mundos de fantasia.
                            </Typography>
                            <Typography  className="bigBoxTextGUIA" variant="body1" paragraph>
                                Em todo o mundo, milhões de pessoas se entregam a esse universo apaixonante. Estima-se que sua comunidade global abrace facilmente centenas de milhares de participantes dedicados.
                            </Typography>
                            <Typography  className="bigBoxTextGUIA" variant="body1" paragraph>
                                Um exemplo forte são os jogos ao vivo em plataformas como Youtube e Twitch, com transmissões que alcançam milhares de espectadores.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* Espaço para Ilustração */}
                        <Box
                            sx={{
                                height: 300,
                                backgroundColor: '#ccc',
                                borderRadius: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#fff',
                                fontSize: '20px',
                            }}
                        >
                            Ilustração de uma sessão de TTRPG
                        </Box>
                    </Grid>
                </Grid>

                {/* Seção 3 - O Sistema D20 */}
                <Grid container spacing={4} my={4}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 3 }}>
                            <Typography  className="bigBoxTextGUIA" variant="h6" paragraph>
                                Dentro deste vasto mundo de narrativas e possibilidades, existe uma ampla gama de sistemas de regras e abordagens. Entre eles, destaca-se o sistema genérico de D20, que utiliza um dado de vinte faces como pedra angular das mecânicas de jogo.
                            </Typography>
                            <Typography  className="bigBoxTextGUIA" variant="body1" paragraph>
                                O sistema D20 é amplamente adotado por sua simplicidade e versatilidade. Ele cria uma sensação de risco constante e recompensa, mantendo os jogadores sempre em suspense.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* Espaço para Ilustração */}
                        <Box
                            sx={{
                                height: 300,
                                backgroundColor: '#ccc',
                                borderRadius: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#fff',
                                fontSize: '20px',
                            }}
                        >
                            Ilustração do dado D20
                        </Box>
                    </Grid>
                </Grid>

                {/* Seção 4 - Sistema Lâmina do Oculto */}
                <Grid container  my={4}>
                    <Grid item xs={12}>
                        <Box sx={{ p: 0 }}>
                            <Typography  className="bigBoxTextGUIA" variant="h5" gutterBottom>
                                Sistema Lâmina do Oculto (LDO)
                            </Typography>
                            <Typography  className="bigBoxTextGUIA" variant="body1" paragraph>
                                O Sistema Lâmina do Oculto (LDO) é uma ferramenta excepcional para criar universos ricos em detalhes e aventuras emocionantes. Aqui estão as cinco vantagens cruciais de se aventurar no mundo com o LDO:
                            </Typography>
                            <Typography  className="bigBoxTextGUIA" variant="h6" paragraph>
                                1. Customização quase Ilimitada
                            </Typography>
                            <Typography  className="bigBoxTextGUIA" variant="body1" paragraph>
                                O LDO oferece uma variedade de opções para a criação de personagens, permitindo que você crie personagens verdadeiramente distintos.
                            </Typography>
                            <Typography  className="bigBoxTextGUIA" variant="h6" paragraph>
                                2. Mistura de Classes
                            </Typography>
                            <Typography  className="bigBoxTextGUIA" variant="body1" paragraph>
                                Diferente de sistemas mais rígidos, o LDO permite a fusão de classes, criando personagens híbridos.
                            </Typography>
                            <Typography  className="bigBoxTextGUIA" variant="h6" paragraph>
                                3. Flexibilidade Narrativa
                            </Typography>
                            <Typography  className="bigBoxTextGUIA" variant="body1" paragraph>
                                O LDO coloca a narrativa no centro do jogo, permitindo que os jogadores façam escolhas significativas que afetam a história.
                            </Typography>
                            <Typography  className="bigBoxTextGUIA" variant="h6" paragraph>
                                4. Aprofundamento de Fundo
                            </Typography>
                            <Typography  className="bigBoxTextGUIA" variant="body1" paragraph>
                                O sistema oferece ferramentas para desenvolver os antecedentes de seus personagens, criando histórias pessoais significativas.
                            </Typography>
                            <Typography  className="bigBoxTextGUIA" variant="h6" paragraph>
                                5. Empoderamento dos Jogadores
                            </Typography>
                            <Typography  className="bigBoxTextGUIA" variant="body1" paragraph>
                                Os jogadores têm maior controle sobre o rumo de suas aventuras, promovendo uma sensação de empoderamento.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Seção Final - Conclusão */}
                <Grid container spacing={4} my={4}>
                    <Grid item xs={12}>
                        <Box sx={{ p: 0 }}>
                            <Typography  className="bigBoxTextGUIA" variant="h6" paragraph>
                                Com o Sistema Lâmina do Oculto, o limite é apenas a sua própria imaginação. Portanto, mergulhe nesse mundo de alta fantasia e comece a forjar histórias incríveis. Esteja preparado para uma jornada emocionante, onde a magia da imaginação é a única fronteira que você jamais precisará atravessar.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', mt:8 }}>
                <Typography  sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box >

    );
}

export default WhatIsLDO;
