
import dayjs from 'dayjs';
import { Paper, Typography, Box, Grid, Chip, Tooltip, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { PieChart } from '@mui/x-charts/PieChart';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import "./char.css";
import Avatar from '@mui/material/Avatar';
import UIcon from "../../assets/images/userIcon.png";
import search from "../../assets/icons/search.png";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';

const CharPage = () => {
    const baseUrl = process.env.REACT_APP_LISTEN_ADDRESS;
    const navigate = useNavigate();
    function irParaCriacaoDePersonagem() {
        navigate(`/criarPersonagem`);
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    const especiesMap = {
        'meioDemonio': 'Meio Demônio',
        'humano': 'Humano',
        'elfo': 'Elfo',
        'anao': 'Anão',
        'feerico': 'Feérico',
        'draconiano': 'Draconiano',
        'meioElfo': 'Meio Elfo',
        'meioGenio': 'Meio Gênio',
        'meioCelestial': 'Meio Celestial',
        'meioTroll': 'Meio Troll',
        'bestial': 'Bestial',
        'troll': 'Troll',
        'constructo': 'Constructo',
        'halfling': 'Halfling',
    };

    const ListaDePersonagens = () => {
        const [personagens, setPersonagens] = useState([]);
        const [erro, setErro] = useState('');
        const [searchTerm, setSearchTerm] = useState('');

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

        const filteredPersonagens = personagens.filter(char => 
            char.nome_personagem?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            char.classe?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            especiesMap[char.especie]?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const charcterTagTemplate = (char) => {
            const especie = especiesMap[char.especie] || char.especie;
            
            // Calcular algumas estatísticas principais
            const mainStats = char.habilidades ? [
                { label: 'FOR', value: char.habilidades['Força'] || 0 },
                { label: 'AGI', value: char.habilidades['Agilidade'] || 0 },
                { label: 'INT', value: char.habilidades['Inteligência'] || char.habilidades['Intuição'] || 0 },
                { label: 'FORT', value: char.habilidades['Fortitude'] || 0 },
            ] : [];

            return (
                <Card
                    key={char.id}
                    sx={{
                        width: '280px',
                        minHeight: '380px',
                        background: 'linear-gradient(180deg, #fcfcfc 0%, #f5f5f5 100%)',
                        borderRadius: '16px',
                        border: '2px solid #756A34',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'visible',
                        '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 16px 32px rgba(0,0,0,0.2)',
                            borderColor: '#BB8130',
                        }
                    }}
                >
                    {/* Nível Badge */}
                    <Box sx={{
                        position: 'absolute',
                        top: -15,
                        right: 15,
                        background: 'linear-gradient(135deg, #756A34 0%, #BB8130 100%)',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '3px solid white',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    }}>
                        <Typography sx={{ color: 'white', fontSize: '10px', lineHeight: 1 }}>Nv.</Typography>
                        <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '18px', lineHeight: 1 }}>{char.nivel}</Typography>
                    </Box>

                    {/* Header com imagem */}
                    <Box sx={{
                        background: 'linear-gradient(135deg, #162A22 0%, #40150A 100%)',
                        borderRadius: '14px 14px 0 0',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Box sx={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            border: '4px solid #BB8130',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        }}>
                            <img 
                                src={char.image || UIcon} 
                                alt={char.nome_personagem}
                                style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: 'cover',
                                }} 
                            />
                        </Box>
                        <Typography className="esteban" sx={{ 
                            color: 'white', 
                            fontSize: '20px', 
                            fontWeight: 'bold',
                            mt: 1,
                            textAlign: 'center',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}>
                            {char.nome_personagem}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                            <Chip 
                                label={especie} 
                                size="small" 
                                sx={{ 
                                    backgroundColor: '#BB813099', 
                                    color: 'white',
                                    fontSize: '11px'
                                }} 
                            />
                            <Chip 
                                label={char.classe || 'Aprendiz'} 
                                size="small" 
                                sx={{ 
                                    backgroundColor: '#756A3499', 
                                    color: 'white',
                                    fontSize: '11px'
                                }} 
                            />
                        </Box>
                    </Box>

                    {/* Conteúdo */}
                    <CardContent sx={{ p: 2 }}>
                        {/* Antecedente */}
                        <Box sx={{ mb: 2 }}>
                            <Typography className="esteban" sx={{ 
                                fontSize: '12px', 
                                color: '#666',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5
                            }}>
                                <StarIcon sx={{ fontSize: 14 }} /> Antecedente
                            </Typography>
                            <Typography className="esteban" sx={{ 
                                fontSize: '14px', 
                                fontWeight: 'bold',
                                color: '#40150A'
                            }}>
                                {char.antecedente?.nome || 'Não definido'}
                            </Typography>
                        </Box>

                        {/* Stats principais */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-around',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px',
                            p: 1,
                            mb: 2
                        }}>
                            {mainStats.map((stat, idx) => (
                                <Tooltip key={idx} title={stat.label} arrow>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography sx={{ 
                                            fontSize: '10px', 
                                            color: '#666',
                                            fontWeight: 'bold'
                                        }}>
                                            {stat.label}
                                        </Typography>
                                        <Chip 
                                            label={stat.value >= 0 ? `+${stat.value}` : stat.value}
                                            size="small"
                                            sx={{
                                                backgroundColor: stat.value > 0 ? '#4caf50' : stat.value < 0 ? '#f44336' : '#9e9e9e',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '11px',
                                                height: '22px'
                                            }}
                                        />
                                    </Box>
                                </Tooltip>
                            ))}
                        </Box>

                        {/* Dinheiro */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#fff8e1',
                            borderRadius: '8px',
                            p: 1,
                        }}>
                            <Typography className="esteban" sx={{ fontSize: '12px', color: '#666' }}>
                                💰 Dinheiro
                            </Typography>
                            <Typography className="esteban" sx={{ 
                                fontSize: '14px', 
                                fontWeight: 'bold',
                                color: '#BB8130'
                            }}>
                                {parseFloat(char.dinheiro || 0).toFixed(2)} M.O
                            </Typography>
                        </Box>
                    </CardContent>

                    {/* Ações */}
                    <CardActions sx={{ 
                        justifyContent: 'center', 
                        borderTop: '1px solid #e0e0e0',
                        p: 1.5
                    }}>
                        <Button
                            variant="contained"
                            startIcon={<VisibilityIcon />}
                            href={`/character/fichaDoPersonagem/página?id=${char.id}`}
                            sx={{
                                background: 'linear-gradient(135deg, #162A22 0%, #40150A 100%)',
                                color: 'white',
                                fontFamily: '"Esteban", serif',
                                borderRadius: '20px',
                                px: 3,
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1e3a2f 0%, #5a1f0d 100%)',
                                }
                            }}
                        >
                            Ver Ficha
                        </Button>
                    </CardActions>
                </Card>
            );
        };

        if (erro) {
            return <div>Erro: {erro}</div>;
        }

        return (
            <Box sx={{ width: '100%' }}>
                {/* Barra de pesquisa melhorada */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: 2, 
                    mb: 4,
                    flexWrap: 'wrap'
                }}>
                    <TextField 
                        label="Pesquisar personagem" 
                        size="small" 
                        variant="outlined" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ 
                            background: '#ffffff', 
                            width: "300px",
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                            }
                        }} 
                    />
                    <Button 
                        onClick={irParaCriacaoDePersonagem} 
                        variant="contained"
                        startIcon={<PersonIcon />}
                        sx={{ 
                            background: 'linear-gradient(135deg, #162A22 0%, #40150A 100%)',
                            color: '#ffffff', 
                            borderRadius: '20px',
                            px: 3,
                            fontFamily: '"Esteban", serif',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #1e3a2f 0%, #5a1f0d 100%)',
                            }
                        }}
                    > 
                        + Novo personagem
                    </Button>
                </Box>

                {/* Grid de personagens */}
                <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 3, 
                    justifyContent: 'center',
                    p: 2
                }}>
                    {filteredPersonagens.length === 0 ? (
                        <Paper sx={{ 
                            p: 4, 
                            textAlign: 'center',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '16px',
                            border: '2px dashed #756A34'
                        }}>
                            <PersonIcon sx={{ fontSize: 60, color: '#756A34', mb: 2 }} />
                            <Typography className="esteban" variant="h6" sx={{ color: '#666' }}>
                                {searchTerm ? 'Nenhum personagem encontrado' : 'Você ainda não tem personagens'}
                            </Typography>
                            <Typography className="esteban" sx={{ color: '#999', mb: 2 }}>
                                {searchTerm ? 'Tente outra busca' : 'Crie seu primeiro personagem para começar sua aventura!'}
                            </Typography>
                            {!searchTerm && (
                                <Button 
                                    variant="contained"
                                    onClick={irParaCriacaoDePersonagem}
                                    sx={{
                                        background: 'linear-gradient(135deg, #756A34 0%, #BB8130 100%)',
                                        fontFamily: '"Esteban", serif',
                                    }}
                                >
                                    Criar Personagem
                                </Button>
                            )}
                        </Paper>
                    ) : (
                        filteredPersonagens.map(char => charcterTagTemplate(char))
                    )}
                </Box>
            </Box>
        );
    };


    return (

        <Box sx={{ minHeight: '100vh', width: '100%', pb: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                <Typography className="esteban" variant="h4" sx={{ textAlign: 'center', my: '30px', color: '#40150A' }}>
                    Meus Personagens
                </Typography>
            </Box>
            <Grid container spacing={1} sx={{ p: 4, width: '90%', m: 'auto', minHeight: '700px' }} >
                <Grid item xs={12} sx={{ p: 2, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'flex-start' }}>
                    <ListaDePersonagens />
                </Grid>

            </Grid>
            <Box sx={{ background: 'linear-gradient(135deg, #162A22 0%, #40150A 100%)', p: 1.5, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', width: "100%", bottom: 0 }}>
                <Typography sx={{ color: '#fff', fontSize: '12px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>

    );
}

export default CharPage;
