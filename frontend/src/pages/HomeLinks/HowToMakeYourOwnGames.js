import { Container, Grid, Typography, Box, Card, CardContent, CardMedia } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import "./ldop.css";
import creatStories from "../../assets/images/creatStories.png";
import createAHook from "../../assets/images/createAHook.png";
import developYourCharacters from "../../assets/images/developYourCharacters.png";
import structureYorStorie from "../../assets/images/structureYorStorie.png";



const HowToMakeYourOwnGames = () => {



    return (
        <Box className="esteban" sx={{ minHeight: '700px', width: '100%' }}>
        <Box className="esteban" sx={{ minHeight: '700px', width: '80%', margin:'auto' }}>
            <Box sx={{  padding: 4, width:'80%', m:'auto' }}>
                {/* Título da Página */}
                <Typography variant="h1" className="MainTitle" gutterBottom align="center">
                    Como Criar uma História de RPG
                </Typography>

                {/* Introdução */}
                <Typography className="bigBoxTextGUIA" paragraph>
                    Criar uma história de RPG envolvente e imersiva é o primeiro passo para uma grande aventura.
                    Neste guia, vamos explorar as etapas essenciais para dar vida à sua narrativa e criar uma jornada
                    inesquecível para seus jogadores.
                </Typography>

                {/* Passos para criar a história */}
                <Grid container spacing={3}>

                    {/* Passo 1: Defina o Mundo e o Cenário */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Card>
                            <CardMedia
                                component="img"
                                sx={{width:'50%', m:'auto'}}
                                image={creatStories} // Espaço para imagem do cenário
                                alt="Cenário de RPG"
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    1. Defina o Mundo e o Cenário
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Comece criando o mundo onde a aventura se passará. Será um reino medieval, uma cidade futurista ou
                                    um mundo pós-apocalíptico? Descreva os detalhes, desde a geografia até as culturas e as tecnologias presentes.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Passo 2: Crie o Gancho Inicial */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Card>
                            <CardMedia
                                component="img"
                                sx={{width:'50%', m:'auto'}}
                                image={createAHook} // Espaço para imagem de mistério
                                alt="Gancho da História"
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    2. Crie o Gancho Inicial
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Introduza um mistério ou conflito que dá início à aventura. Pode ser um artefato perdido, um inimigo
                                    ameaçador ou um evento inexplicável que os jogadores devem investigar.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Passo 3: Desenvolva os Personagens */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Card>
                            <CardMedia
                                component="img"
                                sx={{width:'50%', m:'auto'}}
                                image={developYourCharacters} // Espaço para imagem dos personagens
                                alt="Personagens de RPG"
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    3. Desenvolva os Personagens
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Crie personagens com histórias e motivações interessantes. Seus passados, objetivos e habilidades
                                    vão guiar as escolhas dentro da narrativa. Pense nos vilões e em como eles se conectam com o enredo.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Passo 4: Estruture a Aventura */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Card>
                            <CardMedia
                                component="img"
                                sx={{width:'50%', m:'auto'}}
                                image={structureYorStorie} // Espaço para imagem de aventura
                                alt="Estrutura de Aventura"
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    4. Estruture a Aventura
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Organize a aventura em etapas: introdução, desenvolvimento, clímax e conclusão. Planeje os obstáculos,
                                    reviravoltas e momentos de grande emoção para manter os jogadores envolvidos.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Passo 5: Crie Locais Importantes */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Card>
                            <CardMedia
                                component="img"
                                sx={{width:'50%', m:'auto'}}
                                image="https://via.placeholder.com/300x200?text=Locais+Importantes" // Espaço para imagem dos locais
                                alt="Locais Importantes"
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    5. Crie Locais Importantes
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Construa locais significativos para a história, como cidades, masmorras ou templos antigos. Cada lugar
                                    deve ter sua própria atmosfera e impacto na narrativa.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Passo 6: Prepare-se para Adaptação e Improviso */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Card>
                            <CardMedia
                                component="img"
                                sx={{width:'50%', m:'auto'}}
                                image="https://via.placeholder.com/300x200?text=Improviso" // Espaço para imagem de improviso
                                alt="Improviso"
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    6. Prepare-se para Adaptação e Improviso
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Prepare-se para mudanças inesperadas durante a jornada. O mais importante é estar pronto para se
                                    adaptar às escolhas dos jogadores, criando oportunidades e reviravoltas.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Box>
</Box>
            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 8 }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>Art by John D Batten</Typography>
            </Box>
        </Box >

    );
}

export default HowToMakeYourOwnGames;
