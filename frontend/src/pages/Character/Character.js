
import dayjs from 'dayjs';
import { Paper, Typography, Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import { PieChart } from '@mui/x-charts/PieChart';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import "./char.css";
import Avatar from '@mui/material/Avatar';
import UIcon from "../../assets/images/userIcon.png";
import search from "../../assets/icons/search.png";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const CharPage = () => {
    const baseUrl = process.env.REACT_APP_LISTEN_ADDRESS;
    const navigate = useNavigate();
    function irParaCriacaoDePersonagem() {
        navigate(`/criarPersonagem`);
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const ListaDePersonagens = () => {
        const [personagens, setPersonagens] = useState([]);
        const [erro, setErro] = useState(null);

        useEffect(() => {
            if (!userId) return;

            fetch(`${baseUrl}/personagens/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao buscar personagens');
                    }
                    return response.json();
                })
                .then(data => {
                    setPersonagens(data);
                })
                .catch(error => {
                    console.error(error);
                    setErro(error.message);
                });
        }, [userId]);

        const charcterTagTemplate = (char) => {

            var especie;
            switch (char.especie) {
                case 'meioDemonio':
                    especie = 'Meio Demônio';
                    break;

                default:
                    break;
            }

            return (
                <a
                    key={char.id}
                    href={`/character/fichaDoPersonagem/página?id=${char.id}`}
                    style={{ textDecoration: 'none' }}
                >
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: 'column',
                            alignItems: "center",
                            width: 'fit-content',
                            p: 1,
                            justifyContent: "center",
                            background: '#756A34',
                            minHeight: '300px',
                            minWidth: '200px',
                            borderRadius: '24px',
                            borderBottom: '5px solid #BB8130',
                            position: 'relative',
                            marginBottom: '10px'
                        }}
                    >
                        <img src={char.image} style={{ width: '150px', height: '150px', border: '2px solid #BB8130', borderRadius: '5%', marginBottom: '10%' }} />
                        <Box sx={{width:'100%', display: "flex",
                            flexDirection: 'column',
                            alignItems: "center", }}>
                            <Typography className="boxTextChar" sx={{ color: 'white', fontSize: '20px !important' }}>
                                {char.nome_personagem} / {char.nivel}
                            </Typography>
                            <Typography className="esteban" sx={{ color: 'white', fontSize: '12px !important' }}> {especie} <br /> {char.antecedente.nome}</Typography>
                        </Box>

                    </Paper>
                </a>
            );
        };

        if (erro) {
            return <div>Erro: {erro}</div>;
        }

        return (
            <div style={{ width: '100%', display:'flex', gap:'10px' }}>
                {personagens.length === 0 ? (
                    <p>Nenhum personagem encontrado.</p>
                ) : (
                    personagens.map(char => charcterTagTemplate(char))
                )}
            </div>
        );
    };


    return (

        <Box sx={{ minHeight: '700px', width: '100%', }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                <Typography className="esteban" variant="h4" sx={{ textAlign: 'center', my: '30px' }}>Wiki</Typography>
                <Box sx={{ width: '40%', display: 'flex', justifyContent: "center" }}>
                    <TextField label="Pesquisar" size="small" variant="outlined" sx={{ background: '#ffffff', width: "100%" }} id="searchBar" />

                    <Button className="esteban" sx={{ background: '#162A22', color: '#ffffff', p: 1, width: '10%' }}><img src={search} style={{ width: '20px' }} /></Button>
                    <Button onClick={irParaCriacaoDePersonagem} id="criarButtom" className="esteban " sx={{ background: '#162A22', color: '#ffffff', p: 1, width: '10%' }}> + Novo personagem</Button>
                </Box>
            </Box>
            <Grid container spacing={1} sx={{ p: 4, width: '70%', m: 'auto', minHeight: '700px' }} >
                <Grid item xs={12} sx={{ p: 2, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }}>
                    <ListaDePersonagens />
                </Grid>

            </Grid>
            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', width: "100%", bottom: 0 }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>

    );
}

export default CharPage;
