
import dayjs from 'dayjs';
import { Paper, Typography, Box, Grid, Autocomplete } from '@mui/material';
import Card from '@mui/material/Card';
import { PieChart } from '@mui/x-charts/PieChart';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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

    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const options = [
        { label: 'Regras de Combate', path: '/regrasCombate' },
        { label: 'Combate', path: '/regrasCombate' },
        { label: 'Turno', path: '/regrasCombate' },
        { label: 'Rodada', path: '/regrasCombate' },
        { label: 'Turno e Rodada', path: '/regrasCombate' },
        { label: 'Iniciativa', path: '/regrasCombate' },
        { label: 'Ordem de Combate', path: '/regrasCombate' },
        { label: 'Dano', path: '/regrasCombate' },
        { label: 'Tipos de Dano', path: '/regrasCombate' },
        { label: 'Acerto', path: '/regrasCombate' },
        { label: 'Regras de Acerto', path: '/regrasCombate' },
        { label: 'Acerto Crítico', path: '/regrasCombate' },
        { label: 'Velocidade', path: '/regrasCombate' },
        { label: 'Velocidade de Movimento', path: '/regrasCombate' },
        { label: 'Defesa', path: '/regrasCombate' },
        { label: 'Regras de Defesa', path: '/regrasCombate' },
        { label: 'Regras de Velocidade', path: '/regrasCombate' },
        { label: 'Pontos de Magia', path: '/regrasCombate' },
        { label: 'Pontos de Estamina', path: '/regrasCombate' },
        { label: 'Magia', path: '/regrasCombate' },
        { label: 'Vida', path: '/regrasCombate' },
        { label: 'Estamina', path: '/regrasCombate' },
        { label: 'Proficiência em Armas', path: '/regrasCombate' },
        { label: 'Regras de Poções', path: '/regrasCombate' },
        { label: 'Regras de Poção', path: '/regrasCombate' },
        { label: 'Regras de Armas', path: '/regrasCombate' },
        { label: 'Combate Montado', path: '/regrasCombate' },
        { label: 'Regra de Montaria', path: '/regrasCombate' },
        { label: 'Ameaça', path: '/regrasCombate' },
        { label: 'Alcance', path: '/regrasCombate' },
        { label: 'Alcance e Ameaça', path: '/regrasCombate' },
        { label: 'Campo de Visão', path: '/regrasCombate' },
    ];

    const handleSearch = () => {
        const normalizedQuery = query
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/\s+/g, '');

        const found = options.find(opt =>
            opt.path.toLowerCase().includes(normalizedQuery)
        );

        if (found) {
            navigate(found.path);
        } else {
            navigate(`/pesquisa/${encodeURIComponent(normalizedQuery)}`);
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (

        <Box sx={{ minHeight: '700px', width: '100%', }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                <Typography className="esteban" variant="h4" sx={{ textAlign: 'center', my: '30px' }}>Wiki</Typography>
                <Box sx={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                    <Autocomplete
                        freeSolo
                        options={options}
                        getOptionLabel={(option) => option.label}
                        onChange={(event, newValue) => {
                            if (newValue && newValue.path) {
                                navigate(newValue.path);
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Pesquisar"
                                size="small"
                                variant="outlined"
                                sx={{ background: '#ffffff', width: '100%', minWidth:'350px' }}
                                id="searchBar"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        )}
                    />
                    <Button
                        className="esteban"
                        sx={{ background: '#162A22', color: '#ffffff', p: 1, width: '10%' }}
                        onClick={handleSearch}
                    >
                        <img src={search} alt="Search" style={{ width: '20px' }} />
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={1} sx={{ p: 4, width: '70%', m: 'auto', minHeight: '700px' }} >
                <Grid item xs={6} sx={{ p: 2, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }}>
                    <a href="/classes" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Classes</Typography>
                    </a>
                    <a href="/antecedentes" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Antecedentes</Typography>
                    </a>
                    <a href="/habilidades" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Habilidades e Proficiências</Typography>
                    </a>
                    <a href="/profissoes" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Profissões</Typography>
                    </a>
                    <a href="/regrasGerais" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Regras Gerais</Typography>
                    </a>
                </Grid>
                <Grid item xs={6} sx={{ p: 2, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }}>
                    <a href="/equipment" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Equipamentos e Itens</Typography>
                    </a>
                    <a href="/acoes" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Açoes</Typography>
                    </a>
                    <a href="/especies" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Espécies</Typography>
                    </a>
                    <a href="/condicoes" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Condições</Typography>
                    </a>
                    <a href="/regrasCombate" style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: "center", background: '#756A34', minHeight: '80px', minWidth: '100px', borderRadius: '24px', borderBottom: '5px solid #BB8130', height: '18%', position: 'relative' }}>
                        <Typography className="boxText">Regras de Combate</Typography>
                    </a>
                </Grid>

            </Grid>
            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>

    );
}

export default WikiPage;
