import React from 'react';
import {
    Paper, Grid, Box, Typography, Chip, Divider, IconButton,
    Button, FormControl, Select, MenuItem,
} from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { calcularVantagemDesvantagem } from '../../../data/constants';

const CombatSettingsPanel = React.memo(({
    vantagens, setVantagens, desvantagens, setDesvantagens,
    nivelLuz, setNivelLuz, dadoSelecionado, setDadoSelecionado,
    quantidadeDados, setQuantidadeDados, diceRolling,
    onRollCustom, onRollD20, getPenalidadeLuzAtual, DADOS_DISPONIVEIS,
}) => {
    const vantagemInfo = calcularVantagemDesvantagem(vantagens, desvantagens);
    const luzInfo = getPenalidadeLuzAtual();

    return (
        <Paper sx={{ mb: 2, p: 2, backgroundColor: '#f5f3eb', border: '2px solid #40150A', borderRadius: 2 }}>
            <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold', color: '#40150A', mb: 2 }}>
                ⚔️ Configurações de Combate
            </Typography>
            <Grid container spacing={2}>
                {/* Vantagem / Desvantagem */}
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" sx={{ color: '#40150A', fontWeight: 'bold', mb: 1 }}>Vantagem / Desvantagem</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ color: '#454E30' }}>Vantagens:</Typography>
                            <IconButton size="small" onClick={() => setVantagens(Math.max(0, vantagens - 1))} disabled={vantagens === 0}><Typography>-</Typography></IconButton>
                            <Chip label={vantagens} color="success" size="small" />
                            <IconButton size="small" onClick={() => setVantagens(vantagens + 1)}><Typography>+</Typography></IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ color: '#931C4A' }}>Desvantagens:</Typography>
                            <IconButton size="small" onClick={() => setDesvantagens(Math.max(0, desvantagens - 1))} disabled={desvantagens === 0}><Typography>-</Typography></IconButton>
                            <Chip label={desvantagens} color="error" size="small" />
                            <IconButton size="small" onClick={() => setDesvantagens(desvantagens + 1)}><Typography>+</Typography></IconButton>
                        </Box>
                    </Box>
                    <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#5B1F0F', fontStyle: 'italic' }}>{vantagemInfo.descricao}</Typography>
                </Grid>
                {/* Nível de Luz */}
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" sx={{ color: '#40150A', fontWeight: 'bold', mb: 1 }}>Iluminação Atual</Typography>
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <Select value={nivelLuz} onChange={(e) => setNivelLuz(e.target.value)} sx={{ backgroundColor: 'white' }}>
                            <MenuItem value="completa"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><WbSunnyIcon sx={{ color: '#BB8130' }} /> Luz Completa</Box></MenuItem>
                            <MenuItem value="meia_luz"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><NightsStayIcon sx={{ color: '#756A34' }} /> Meia Luz (-1 em testes)</Box></MenuItem>
                            <MenuItem value="escuridao"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><NightsStayIcon sx={{ color: '#40150A' }} /> Escuridão (Cego)</Box></MenuItem>
                        </Select>
                    </FormControl>
                    <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#5B1F0F', fontStyle: 'italic' }}>
                        {luzInfo.nivelEfetivo}{luzInfo.penalidade > 0 && ` • Penalidade: -${luzInfo.penalidade}`}{luzInfo.condicaoCego && ' • Condição: Cego'}
                    </Typography>
                </Grid>
                {/* Rolagem Customizada */}
                <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle2" sx={{ color: '#40150A', fontWeight: 'bold', mb: 1 }}>🎲 Rolagem de Dados</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2">Qtd:</Typography>
                            <IconButton size="small" onClick={() => setQuantidadeDados(Math.max(1, quantidadeDados - 1))} disabled={quantidadeDados <= 1}><Typography>-</Typography></IconButton>
                            <Chip label={quantidadeDados} size="small" sx={{ minWidth: 32 }} />
                            <IconButton size="small" onClick={() => setQuantidadeDados(Math.min(20, quantidadeDados + 1))} disabled={quantidadeDados >= 20}><Typography>+</Typography></IconButton>
                        </Box>
                        <FormControl size="small" sx={{ minWidth: 100 }}>
                            <Select value={dadoSelecionado} onChange={(e) => setDadoSelecionado(e.target.value)} sx={{ backgroundColor: 'white' }}>
                                {DADOS_DISPONIVEIS.map(dado => <MenuItem key={dado.valor} value={dado.valor}>{dado.nome}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Button variant="contained" startIcon={<CasinoIcon />} onClick={onRollCustom} disabled={diceRolling}
                            sx={{ backgroundColor: '#162A22', '&:hover': { backgroundColor: '#0d1a15' } }}>
                            Rolar {quantidadeDados}d{dadoSelecionado}
                        </Button>
                        <Button variant="outlined" startIcon={<CasinoIcon />}
                            onClick={() => onRollD20(0, 'Teste d20', vantagens, desvantagens)} disabled={diceRolling}
                            sx={{
                                borderColor: vantagemInfo.tipo === 'vantagem' ? '#454E30' : vantagemInfo.tipo === 'desvantagem' ? '#931C4A' : '#162A22',
                                color: vantagemInfo.tipo === 'vantagem' ? '#454E30' : vantagemInfo.tipo === 'desvantagem' ? '#931C4A' : '#162A22',
                                '&:hover': { borderColor: vantagemInfo.tipo === 'vantagem' ? '#2F3C29' : vantagemInfo.tipo === 'desvantagem' ? '#5B1F0F' : '#0d1a15', backgroundColor: 'rgba(22, 42, 34, 0.08)' }
                            }}>
                            d20 {vantagemInfo.tipo !== 'normal' && `(${vantagemInfo.dados}d20)`}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
});

export default CombatSettingsPanel;
