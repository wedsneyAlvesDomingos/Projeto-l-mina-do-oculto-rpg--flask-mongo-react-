
import dayjs from 'dayjs';
import AppFooter from '../../componentes/Footer/Footer';
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
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { colors } from '../../componentes/themes/tokens';
import { determinarClasseAtual } from '../../data/constants';

/* Mapa de abreviações para os nomes das habilidades */
const ABREV_HAB = {
    'Fortitude': 'FORT', 'Força': 'FOR', 'Agilidade': 'AGI',
    'Combate Corpo a Corpo': 'CCC', 'Combate à Distância': 'CAD',
    'Atletismo': 'ATL', 'Acrobacia': 'ACR', 'Destreza': 'DES',
    'Furtividade': 'FURT', 'Investigação': 'INV', 'Rastreamento': 'RSTR',
    'Percepção': 'PERC', 'Sobrevivência': 'SOBR', 'Lidar com Animais': 'LCA',
    'Navegação': 'NAV', 'Armadilhas': 'ARM', 'História': 'HIST',
    'Intuição': 'INTU', 'Natureza': 'NAT', 'Medicina': 'MED',
    'Jurisprudência': 'JUR', 'Teologia': 'TEO', 'Tecnologia': 'TEC',
    'Arcanismo': 'ARC', 'Alquimia': 'ALQ', 'Ritualismo': 'RIT',
    'Ocultismo': 'OCU', 'Arcanatec': 'ATEC', 'Combate Arcano': 'CARC',
    'Enganação': 'ENG', 'Persuasão': 'PERS', 'Performance': 'PERF',
    'Intimidação': 'INTM', 'Sedução': 'SED', 'Negociação': 'NEG',
};

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
        const [deleteConfirm, setDeleteConfirm] = useState(null);

        const handleDeletePersonagem = async (charId) => {
            try {
                const response = await fetch(`${baseUrl}/personagens/${charId}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Erro ao remover personagem');
                setPersonagens(prev => prev.filter(p => p.id !== charId));
                setDeleteConfirm(null);
            } catch (error) {
                console.error(error);
                setErro('Erro ao remover personagem');
                setDeleteConfirm(null);
            }
        };

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
            
            // Top 6 habilidades com maior valor
            const top6 = char.habilidades
                ? Object.entries(char.habilidades)
                    .filter(([, v]) => v > 0)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 6)
                    .map(([nome, value]) => ({
                        nome,
                        label: ABREV_HAB[nome] || nome.slice(0, 4).toUpperCase(),
                        value,
                    }))
                : [];

            return (
                <Card
                    key={char.id}
                    sx={{
                        width: '280px',
                        minHeight: '380px',
                        borderRadius: '16px',
                        border: '2px solid #756A34',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'visible',
                        '&:hover': {
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
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        overflow: 'hidden',
                        maxWidth: '100%',
                        boxSizing: 'border-box',
                    }}>
                        <Box sx={{
                            width: '150px',
                            height: '150px',
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
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5, justifyContent: 'center', maxWidth: '100%' }}>
                            <Chip 
                                label={especie} 
                                size="small" 
                                sx={{ 
                                    backgroundColor: '#BB813099', 
                                    color: 'white',
                                    fontSize: '11px',
                                    maxWidth: '100%',
                                    p:1,
                                    '& .MuiChip-label': { whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }
                                }} 
                            />
                            <Chip 
                                label={determinarClasseAtual(char)} 
                                size="small" 
                                sx={{ 
                                    backgroundColor: '#756A3499', 
                                    color: 'white',
                                    fontSize: '11px',
                                    maxWidth: '100%',
                                    p:2,
                                    '& .MuiChip-label': { whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }
                                }} 
                            />
                        </Box>
                    </Box>

                    {/* Conteúdo */}
                    <CardContent sx={{ p: 2 }}>
                        {/* Antecedente */}
                        <Box sx={{ mb: 2, width: '100%',display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '8px', p: 1 }}>
                            <Typography className="esteban" sx={{ 
                                fontSize: '12px', 
                                color: 'var(--text-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5
                            }}>
                                <StarIcon sx={{ fontSize: 14 }} /> Antecedente
                            </Typography>
                            <Typography className="esteban" sx={{ 
                                fontSize: '14px', 
                                fontWeight: 'bold',
                                color: 'var(--text-primary)'
                            }}>
                                {char.antecedente?.nome || 'Não definido'}
                            </Typography>
                        </Box>

                        {/* Top 6 habilidades */}
                        {top6.length > 0 && (
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 0.5,
                                justifyContent: 'center',
                                border: '1px solid',
                                borderRadius: '8px',
                                p: 2,
                                mb: 2,
                            }}>
                                {top6.map((stat, idx) => (
                                    <Tooltip key={idx} title={stat.nome} arrow>
                                        <Box sx={{ textAlign: 'center', flex: '1 1 30%', minWidth: '52px' }}>
                                            <Typography sx={{
                                                fontSize: '10px',
                                                color: 'var(--text-muted)',
                                                fontWeight: 'bold',
                                                lineHeight: 1.2,
                                            }}>
                                                {stat.label}
                                            </Typography>
                                            <Chip
                                                label={stat.value}
                                                size="small"
                                                sx={{
                                                    backgroundColor: colors.forest,
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '11px',
                                                    height: '22px',
                                                }}
                                            />
                                        </Box>
                                    </Tooltip>
                                ))}
                            </Box>
                        )}

                        {/* Dinheiro */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderRadius: '8px',
                            p: 1,
                        }}>
                            <Typography className="esteban" sx={{ fontSize: '12px', color: 'var(--text-primary)' }}>
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
                        p: 1.5,
                        gap: 1,
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
                        <Tooltip title="Remover Ficha" arrow>
                            <IconButton
                                onClick={() => setDeleteConfirm(char)}
                                sx={{
                                    color: colors.scarlet,
                                    backgroundColor: `${colors.gold}99`,
                                    borderRadius: '50% !important',
                                    '&:hover': {
                                        backgroundColor: `${colors.gold}ff`,
                                    },
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
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
                            borderRadius: '16px',
                            border: '2px dashed #756A34'
                        }}>
                            <PersonIcon sx={{ fontSize: 60, color: '#756A34', mb: 2 }} />
                            <Typography className="esteban" variant="h6" sx={{ color: 'var(--text-primary)' }}>
                                {searchTerm ? 'Nenhum personagem encontrado' : 'Você ainda não tem personagens'}
                            </Typography>
                            <Typography className="esteban" sx={{ color: 'var(--text-primary)', mb: 2 }}>
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

                {/* Dialog de confirmação para remover ficha */}
                <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} maxWidth="xs" fullWidth>
                    <DialogTitle sx={{ color: '#b71c1c', fontFamily: '"Esteban", serif' }}>
                        Remover Personagem
                    </DialogTitle>
                    <DialogContent>
                        <Typography sx={{ fontFamily: '"Esteban", serif' }}>
                            Tem certeza que deseja remover <strong>{deleteConfirm?.nome_personagem}</strong>?
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--text-primary)', mt: 1 }}>
                            Esta ação não pode ser desfeita.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteConfirm(null)} sx={{ color: '#756A34' }}>
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleDeletePersonagem(deleteConfirm.id)}
                            sx={{
                                backgroundColor: '#b71c1c',
                                '&:hover': { backgroundColor: '#7f0000' },
                            }}
                        >
                            Remover
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    };


    return (

        <Box sx={{ minHeight: '100vh', width: '100%', pb: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                <Typography className="esteban" variant="h4" sx={{ textAlign: 'center', my: '30px', color: 'var(--text-primary)' }}>
                    Meus Personagens
                </Typography>
            </Box>
            <Grid container spacing={1} sx={{ p: 4, width: '90%', m: 'auto', minHeight: '700px' }} >
                <Grid item xs={12} sx={{ p: 2, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'flex-start' }}>
                    <ListaDePersonagens />
                </Grid>

            </Grid>
            <AppFooter position="fixed" />
        </Box>

    );
}

export default CharPage;
