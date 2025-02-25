
import dayjs from 'dayjs';
import { Paper, Typography, Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import { PieChart } from '@mui/x-charts/PieChart';
import React, { useState, useEffect, useCallback } from 'react';
import "./wiki.css";
import Title from "../../assets/images/image.png";
import LDO from "../../assets/images/LDO.png";
import feather from "../../assets/images/image-from-rawpixel-id-6605206-png.png";
import helmet from "../../assets/images/image-from-rawpixel-id-6439958-png.png";
import puppet from "../../assets/images/image-from-rawpixel-id-6553179-png.png";
import linkOut from "../../assets/icons/linkout.png";
import search from "../../assets/icons/search.png";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const WikiPage = () => {



    return (

        <Box sx={{ minHeight: '700px', width: '100%', }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                <Typography className="esteban" variant="h4" sx={{ textAlign: 'center', my: '30px' }}>Wiki</Typography>
                <Box sx={{ width: '40%', display: 'flex', justifyContent: "center" }}>
                    <TextField label="Pesquisar" size="small" variant="outlined" sx={{ background: '#ffffff', width: "100%" }} id="searchBar" />
                    <Button className="esteban" sx={{ background: '#162A22', color: '#ffffff', p: 1, width: '10%' }}><img src={search} style={{ width: '20px' }} /></Button>
                </Box>
            </Box>
            <Grid container spacing={1} sx={{ p: 4, width: '70%', m: 'auto', minHeight: '700px' }} >
                <Grid item xs={6} sx={{ p: 2, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }}>
                    <Paper sx={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Classes</Typography>
                    </Paper>
                    <Paper sx={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Antecedentes</Typography>
                    </Paper>
                    <Paper sx={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Habilidades e Proficiências</Typography>
                    </Paper>
                    <Paper sx={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Profissões</Typography>
                    </Paper>
                    <Paper sx={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Regras Gerais</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} sx={{ p: 2, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }}>
                    <Paper sx={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Equipamentos e Itens</Typography>
                    </Paper>
                    <Paper sx={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Açoes</Typography>
                    </Paper>
                    <Paper sx={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Espécies</Typography>
                    </Paper>
                    <Paper sx={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Condições</Typography>
                    </Paper>
                    <Paper sx={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Regras de Combate</Typography>
                    </Paper>
                </Grid>

            </Grid>
            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>

    );
}

export default WikiPage;
