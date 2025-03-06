
import dayjs from 'dayjs';
import { Paper, Typography, Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import { PieChart } from '@mui/x-charts/PieChart';
import React, { useState, useEffect, useCallback } from 'react';
import "./home.css";
import Title from "../../assets/images/image.png";
import LDO from "../../assets/images/LDO.png";
import feather from "../../assets/images/image-from-rawpixel-id-6605206-png.png";
import helmet from "../../assets/images/image-from-rawpixel-id-6439958-png.png";
import puppet from "../../assets/images/image-from-rawpixel-id-6553179-png.png";
import linkOut from "../../assets/icons/linkout.png";

const HomePage = () => {

    return (

        <Box sx={{ minHeight: '700px', width: '100%' }}>
            <Paper sx={{ pb: 1, pt: 3, display: 'flex', justifyContent: 'center', background: 'transparent', boxShadow: 'none' }}>
                <img src={Title} style={{ width: '50%', }} ></img>
            </Paper>

            <Grid container spacing={1} sx={{ p: 4, width: '70%', m: 'auto' }} >
                <Grid item xs={6} sx={{ p: 2, display: 'flex', flexFlow: 'column wrap', justifyContent: 'space-between' }}>
                    <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: '#756A34', minHeight: '100px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '48%', position: 'relative' }}>
                        <a href={"/howtomakeacharacter"}><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} ></img></a>
                        <img src={feather} style={{ width: '22%', }} ></img>

                        <Typography className="boxTextHome">Como jogar?  Confira o guia
                            de criação de personagens!</Typography>
                    </Paper>
                    <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: '#756A34', minHeight: '100px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '48%', position: 'relative' }}>
                        <a href="/HowToMakeYourOwnGames"><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} ></img></a>
                        <img src={helmet} style={{ width: '22%', }} ></img>
                        <Typography className="boxTextHome">Dicas de como usar regras para criar o próprio jogo, do seu jeito.</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} sx={{ p: 2, }}>
                    <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column', background: '#756A34', minHeight: '300px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '100%', position: 'relative' }}>
                        <a href="/whatisLDO"><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} ></img></a>
                        <img src={LDO} style={{ width: '90%', }} ></img>
                        <Typography className="bigBoxText">O que é lâmina do oculto e o porquê criar um novo jogo de interpretação de mesa.</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} sx={{ p: 2 }}>
                    <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: '#756A34', minHeight: '200px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '48%', position: 'relative' }}>
                        <a href=""><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} ></img></a>
                        <img src={puppet} style={{ width: '22%', maxWidth: '' }} ></img>
                        <Typography className="boxTextHome">Como criar boas histórias e deixar a mecânica ajudar a contar a história.</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3} sx={{ p: 2 }}>
                    <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: '#756A34', minHeight: '200px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '48%', position: 'relative' }}>
                        <a href=""><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} ></img></a>
                        <Typography className="boxTextHome">Crie e gerencie seu personagem!</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3} sx={{ p: 2 }}>
                    <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: '#756A34', minHeight: '200px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '48%', position: 'relative' }}>
                        <a href=""><img src={linkOut} style={{ width: '15px', position: 'absolute', top: '10px', right: '10px' }} ></img></a>
                        <Typography className="boxTextHome">Descubra sobre as regras do jogo em nossa wiki.</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>

    );
}

export default HomePage;
