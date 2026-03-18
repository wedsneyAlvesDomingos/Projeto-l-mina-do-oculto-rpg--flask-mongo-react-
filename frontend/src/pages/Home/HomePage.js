
import dayjs from 'dayjs';
import AppFooter from '../../componentes/Footer/Footer';
import { Paper, Typography, Box } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import "./home.css";
import LDO from "../../assets/images/LDO.png";
import feather from "../../assets/images/image-from-rawpixel-id-6605206-png.png";
import helmet from "../../assets/images/image-from-rawpixel-id-6439958-png.png";
import puppet from "../../assets/images/image-from-rawpixel-id-6553179-png.png";
import linkOut from "../../assets/icons/linkout.png";

const HomePage = () => {

    return (

        <Box sx={{ minHeight: '100vh', width: '100%', pb: 6 }}>
            {/* ── Título principal ── */}
            <Box sx={{ pb: 1, pt: 4, px: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
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

            {/* ── Cards grid via flexbox ── */}
            <Box sx={{ p: { xs: 2, sm: 4 }, width: { xs: '95%', sm: '85%', md: '70%' }, m: 'auto' }}>

                {/* Linha 1: dois cards lado a lado (mobile: coluna) */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
                    {/* Coluna esquerda: dois cards empilhados */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                        <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' }, background: 'var(--panel-bg)', minHeight: { xs: '120px', sm: '100px' }, borderRadius: '24px', borderBottom: '5px solid var(--panel-border)', flex: 1, position: 'relative', p: 2 }}>
                            <a href="/howtomakeacharacter"><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} alt="link" /></a>
                            <img src={feather} style={{ width: '22%', minWidth: '60px' }} alt="feather" />
                            <Typography className="boxTextHome">Como jogar? Confira o guia de criação de personagens!</Typography>
                        </Paper>
                        <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' }, background: 'var(--panel-bg)', minHeight: { xs: '120px', sm: '100px' }, borderRadius: '24px', borderBottom: '5px solid var(--panel-border)', flex: 1, position: 'relative', p: 2 }}>
                            <a href="/HowToMakeYourOwnGames"><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} alt="link" /></a>
                            <img src={helmet} style={{ width: '22%', minWidth: '60px' }} alt="helmet" />
                            <Typography className="boxTextHome">Dicas de como usar regras para criar o próprio jogo, do seu jeito.</Typography>
                        </Paper>
                    </Box>

                    {/* Coluna direita: card grande LDO */}
                    <Box sx={{ flex: 1 }}>
                        <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: 'var(--panel-bg)', minHeight: { xs: '200px', sm: '300px' }, borderRadius: '24px', borderBottom: '5px solid var(--panel-border)', height: '100%', position: 'relative', p: 2 }}>
                            <a href="/whatisLDO"><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} alt="link" /></a>
                            <img src={LDO} style={{ width: '90%', maxWidth: '100%' }} alt="LDO" />
                            <Typography className="bigBoxText">O que é lâmina do oculto e o porquê criar um novo jogo de interpretação de mesa.</Typography>
                        </Paper>
                    </Box>
                </Box>

                {/* Linha 2: três cards (mobile: coluna) */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                    {/* Card histórias */}
                    <Box sx={{ flex: 2 }}>
                        <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' }, background: 'var(--panel-bg)', minHeight: { xs: '150px', sm: '200px' }, borderRadius: '24px', borderBottom: '5px solid var(--panel-border)', height: '100%', position: 'relative', p: 2 }}>
                            <a href="/HowToMakeStories"><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} alt="link" /></a>
                            <img src={puppet} style={{ width: '22%', minWidth: '60px' }} alt="puppet" />
                            <Typography className="boxTextHome">Como criar boas histórias e deixar a mecânica ajudar a contar a história.</Typography>
                        </Paper>
                    </Box>

                    {/* Card personagem */}
                    <Box sx={{ flex: 1 }}>
                        <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: 'var(--panel-bg)', minHeight: { xs: '150px', sm: '200px' }, borderRadius: '24px', borderBottom: '5px solid var(--panel-border)', height: '100%', position: 'relative', p: 2 }}>
                            <a href="/character"><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} alt="link" /></a>
                            <Typography className="boxTextHome">Crie e gerencie seu personagem!</Typography>
                        </Paper>
                    </Box>

                    {/* Card wiki */}
                    <Box sx={{ flex: 1 }}>
                        <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: 'var(--panel-bg)', minHeight: { xs: '150px', sm: '200px' }, borderRadius: '24px', borderBottom: '5px solid var(--panel-border)', height: '100%', position: 'relative', p: 2 }}>
                            <a href="/wiki"><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} alt="link" /></a>
                            <Typography className="boxTextHome">Descubra sobre as regras do jogo em nossa wiki.</Typography>
                        </Paper>
                    </Box>
                </Box>

            </Box>
            <AppFooter />
        </Box>

    );
}

export default HomePage;
