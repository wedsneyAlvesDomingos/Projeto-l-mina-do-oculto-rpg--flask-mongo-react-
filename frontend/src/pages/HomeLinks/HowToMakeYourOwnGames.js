import { Container, Grid, Typography, Box, Card, CardContent, CardMedia } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import "./ldop.css";
import creatStories from "../../assets/images/creatStories.png";
import createAHook from "../../assets/images/createAHook.png";
import developYourCharacters from "../../assets/images/developYourCharacters.png";
import structureYorStorie from "../../assets/images/structureYorStorie.png";
import importantPlaces from "../../assets/images/importantPlaces.png";
import improvMoments from "../../assets/images/improvMoments.png";



const HowToMakeYourOwnGames = () => {



    return (
        <Box className="esteban" sx={{ minHeight: '700px', width: '100%' }}>
            <Box className="esteban" sx={{ minHeight: '700px', width: '80%', margin: 'auto' }}>
                <Box sx={{ padding: 4, width: '80%', m: 'auto' }}>
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
                                    sx={{ width: '50%', m: 'auto' }}
                                    image={creatStories} // Espaço para imagem do cenário
                                    alt="Cenário de RPG"
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div" className="esteban">
                                        1. Defina o Mundo e o Cenário
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        O cenário de uma aventura é a base sobre a qual todas as histórias serão construídas.
                                        Antes de qualquer coisa, defina o tom do mundo: ele será sombrio e brutal, repleto de perigos constantes,
                                        ou mais fantasioso e heróico, onde aventureiros podem se tornar lendas?
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Considere o ambiente físico: vastos desertos queimados pelo sol, florestas ancestrais habitadas por seres míticos,
                                        cidades que se estendem por quilômetros no subsolo ou ruínas de civilizações esquecidas. A geografia influencia não só
                                        a estética do mundo, mas também a forma como os personagens interagem com ele e quais desafios enfrentarão.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Outro ponto crucial são as sociedades. Existem grandes reinos ou cidades-estado independentes? O governo é uma monarquia,
                                        uma democracia ou algo mais exótico, como um conselho de magos ou uma IA que controla tudo? Pense nas tradições, religiões,
                                        economia e no impacto que a magia ou tecnologia têm na vida cotidiana.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Além disso, construa um pano de fundo histórico. O mundo está em paz ou há uma guerra iminente? Existem profecias antigas,
                                        deuses esquecidos ou forças cósmicas atuando nos bastidores? Os jogadores devem sentir que o mundo não existe apenas para eles,
                                        mas que tem sua própria história e dinâmica, independente das ações do grupo.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Por fim, adicione elementos únicos que diferenciem seu cenário de outros já existentes. Talvez as estrelas do céu sejam diferentes
                                        todas as noites, cidades flutuem sobre oceanos de névoa ou os mortos tenham um papel ativo na sociedade. Pequenos detalhes fazem
                                        toda a diferença para tornar o mundo memorável e imersivo.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Passo 2: Crie o Gancho Inicial */}
                        <Grid item xs={12} sm={6} md={6}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '50%', m: 'auto' }}
                                    image={createAHook} // Espaço para imagem de mistério
                                    alt="Gancho da História"
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div" className="esteban">
                                        2. Crie o Gancho Inicial
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Toda grande aventura começa com um evento intrigante. O gancho inicial deve despertar a curiosidade dos jogadores
                                        e fornecer um motivo forte para que seus personagens se envolvam na história.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Existem várias formas de criar esse primeiro impulso narrativo. Um mistério antigo ressurgiu, como o desaparecimento de um
                                        artefato lendário ou o retorno inesperado de alguém que deveria estar morto? Um inimigo perigoso fez seu primeiro movimento,
                                        colocando cidades em alerta e obrigando os personagens a agir? Talvez um evento inexplicável tenha ocorrido — um eclipse que dura
                                        dias, uma cidade que desaparece sem deixar rastros ou um estranho surto de magia selvagem transformando pessoas em criaturas
                                        bizarras.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Um bom gancho inicial também se conecta ao mundo e ao cenário previamente definidos. Se seu mundo está em guerra, um tratado de paz
                                        pode ser quebrado por um ataque misterioso. Se a ambientação é uma metrópole cyberpunk, um hacker anônimo pode vazar arquivos secretos
                                        sobre um projeto obscuro.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Além disso, considere a relação do gancho com os personagens. Se houver algo que os envolva pessoalmente, o impacto será maior.
                                        O vilão pode ser um inimigo do passado de um dos jogadores, ou um dos personagens pode ser o único que pode decifrar uma pista essencial.
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="bigBoxTextGUIA">
                                        Seja qual for o gancho escolhido, ele deve criar uma sensação de urgência e curiosidade, garantindo que os jogadores queiram descobrir
                                        mais e mergulhar na trama.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Passo 3: Desenvolva os Personagens */}
                        <Grid item xs={12} sm={6} md={6}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '50%', m: 'auto' }}
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
                                    sx={{ width: '50%', m: 'auto' }}
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
                                    sx={{ width: '50%', m: 'auto' }}
                                    image={importantPlaces} // Espaço para imagem dos locais
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
                                    sx={{ width: '50%', m: 'auto' }}
                                    image={improvMoments}// Espaço para imagem de improviso
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
