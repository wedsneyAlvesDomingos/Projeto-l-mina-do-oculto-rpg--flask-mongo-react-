
import dayjs from 'dayjs';
import AppFooter from '../../componentes/Footer/Footer';
import { Paper, Typography, Box, Grid } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import "./home.css";
import LDO from "../../assets/images/LDO.png";
import feather from "../../assets/images/image-from-rawpixel-id-6605206-png.png";
import helmet from "../../assets/images/image-from-rawpixel-id-6439958-png.png";
import puppet from "../../assets/images/image-from-rawpixel-id-6553179-png.png";
import linkOut from "../../assets/icons/linkout.png";

const HomePage = () => {

    return (

        <Box sx={{ minHeight: '700px', width: '100%' }}>
            {/* ── Título principal ── */}
            <Box sx={{ pb: 1, pt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{
                    fontFamily: '"Viaoda Libre", "Viaoda_Libre variant0", serif',
                    fontWeight: 400,
                    fontSize: { xs: '1.1rem', sm: '1.4rem', md: '1.7rem' },
                    color: 'var(--color-title)',
                    letterSpacing: '0.08em',
                    lineHeight: 1.2,
                }}>
                    Bem-vindo ao
                </Typography>
                <Typography sx={{
                    fontFamily: '"Viaoda Libre", "Viaoda_Libre variant0", serif',
                    fontWeight: 700,
                    fontSize: { xs: '2.4rem', sm: '3.5rem', md: '4.5rem' },
                    color: 'var(--color-title)',
                    letterSpacing: '0.05em',
                    lineHeight: 1,
                    textShadow: '0 2px 8px rgba(0,0,0,0.18)',
                }}>
                    Lâmina do Oculto RPG
                </Typography>
            </Box>

            <Grid container spacing={1} sx={{ p: 4, width: '70%', m: 'auto' }} >
                <Grid item xs={6} sx={{ p: 2, display: 'flex', flexFlow: 'column wrap', justifyContent: 'space-between' }}>
                    <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: 'var(--panel-bg)', minHeight: '100px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid var(--panel-border)', height: '48%', position: 'relative' }}>
                        <a href={"/howtomakeacharacter"}><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} ></img></a>
                        <img src={feather} style={{ width: '22%', }} ></img>

                        <Typography className="boxTextHome">Como jogar?  Confira o guia
                            de criação de personagens!</Typography>
                    </Paper>
                    <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: 'var(--panel-bg)', minHeight: '100px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid var(--panel-border)', height: '48%', position: 'relative' }}>
                        <a href="/HowToMakeYourOwnGames"><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} ></img></a>
                        <img src={helmet} style={{ width: '22%', }} ></img>
                        <Typography className="boxTextHome">Dicas de como usar regras para criar o próprio jogo, do seu jeito.</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} sx={{ p: 2, }}>
                    <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column', background: 'var(--panel-bg)', minHeight: '300px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid var(--panel-border)', height: '100%', position: 'relative' }}>
                        <a href="/whatisLDO"><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} ></img></a>
                        <img src={LDO} style={{ width: '90%', }} ></img>
                        <Typography className="bigBoxText">O que é lâmina do oculto e o porquê criar um novo jogo de interpretação de mesa.</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} sx={{ p: 2 }}>
                    <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: 'var(--panel-bg)', minHeight: '200px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid var(--panel-border)', height: '48%', position: 'relative' }}>
                        <a href="/HowToMakeStories"><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} ></img></a>
                        <img src={puppet} style={{ width: '22%', maxWidth: '' }} ></img>
                        <Typography className="boxTextHome">Como criar boas histórias e deixar a mecânica ajudar a contar a história.</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3} sx={{ p: 2 }}>
                    <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: 'var(--panel-bg)', minHeight: '200px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid var(--panel-border)', height: '48%', position: 'relative' }}>
                        <a href="/character"><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} ></img></a>
                        <Typography className="boxTextHome">Crie e gerencie seu personagem!</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3} sx={{ p: 2 }}>
                    <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: 'var(--panel-bg)', minHeight: '200px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid var(--panel-border)', height: '48%', position: 'relative' }}>
                        <a href="/wiki"><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} ></img></a>
                        <Typography className="boxTextHome">Descubra sobre as regras do jogo em nossa wiki.</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <AppFooter position="fixed" />
        </Box>

    );
}

export default HomePage;
