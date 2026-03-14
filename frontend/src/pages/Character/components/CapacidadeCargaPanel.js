import React from 'react';
import {
    Paper, Grid, Box, Typography, Chip, Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getInformacoesCarga, calcularDanoArmaPorTamanho } from '../../../data/constants';

const CapacidadeCargaPanel = React.memo(({ character, sx: sxOverride }) => {
    const habilidades = character.habilidades || {};
    const forca = habilidades['Força'] || 0;
    const alturaCm = character.altura || 170;
    const equipamentos = character.equipamentos || [];

    const infoCarga = getInformacoesCarga(alturaCm, forca, equipamentos);
    const { tamanho, capacidade, cargaAtual, status } = infoCarga;
    const modArma = calcularDanoArmaPorTamanho(tamanho.id, '1d8', false);

    return (
        <Paper sx={{ p: 2, mb: 2, backgroundColor: 'var(--surface-default)', border: `2px solid ${status.cor}`, borderRadius: 2, ...sxOverride }}>
            <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold', color: 'var(--text-primary)', mb: 2 }}>
                📦 Capacidade de Carga
            </Typography>
            <Grid container spacing={2}>
                {/* Tamanho */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 1.5, backgroundColor: 'var(--surface-paper)', borderRadius: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: 'var(--text-primary)', fontWeight: 'bold', mb: 1 }}>📏 Tamanho</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Chip label={tamanho.nome} sx={{ backgroundColor: 'var(--surface-default)', color: 'var(--text-primary)', fontWeight: 'bold', border: '1px solid var(--panel-border)' }} />
                            <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>({tamanho.descricao})</Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: 'var(--text-primary)', display: 'block' }}>Altura: {alturaCm} cm • Força: {forca}</Typography>
                    </Paper>
                </Grid>
                {/* Carga */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 1.5, backgroundColor: 'var(--surface-paper)', borderRadius: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: 'var(--text-primary)', fontWeight: 'bold', mb: 1 }}>{status.icone} Carga Atual</Typography>
                        <Box sx={{ mb: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: status.cor }}>{cargaAtual.cargaTotal.toFixed(1)} kg</Typography>
                                <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>/ {capacidade.capacidadeMaxima} kg</Typography>
                            </Box>
                            <Box sx={{ width: '100%', height: 10, backgroundColor: 'var(--surface-raised)', borderRadius: 5, overflow: 'hidden' }}>
                                <Box sx={{ width: `${Math.min(status.porcentagem, 100)}%`, height: '100%', backgroundColor: status.cor, transition: 'width 0.3s' }} />
                            </Box>
                            <Typography variant="caption" sx={{ color: status.cor, fontWeight: 'bold', display: 'block', mt: 0.5 }}>
                                {status.porcentagem.toFixed(0)}% - {status.descricao}
                            </Typography>
                        </Box>
                        {status.penalidade !== 0 && <Chip label={`Penalidade: ${status.penalidade}`} size="small" sx={{ backgroundColor: status.cor, color: 'white' }} />}
                    </Paper>
                </Grid>
                {/* Armas por tamanho */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 1.5, backgroundColor: 'var(--surface-paper)', borderRadius: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: 'var(--text-primary)', fontWeight: 'bold', mb: 1 }}>⚔️ Armas por Tamanho</Typography>
                        <Typography variant="body2" sx={{ color: 'var(--text-primary)', mb: 1 }}>{modArma.descricao}</Typography>
                        {modArma.custoMultiplicador !== 1 && (
                            <Chip label={modArma.custoMultiplicador === 0.5 ? 'Metade do preço' : 'Dobro do preço'} size="small"
                                sx={{ backgroundColor: modArma.custoMultiplicador === 0.5 ? '#454E30' : '#931C4A', color: 'white' }} />
                        )}
                    </Paper>
                </Grid>
                {/* Detalhes dos itens */}
                {cargaAtual.itensComPeso.length > 0 && (
                    <Grid item xs={12}>
                        <Accordion sx={{ backgroundColor: 'var(--surface-paper)' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                                    📋 Detalhes dos Itens ({cargaAtual.itensComPeso.length} itens com peso)
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                    {cargaAtual.itensComPeso.map((item, idx) => (
                                        <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', p: 0.5, backgroundColor: idx % 2 === 0 ? '#f5f5f5' : 'white', borderRadius: 1 }}>
                                            <Typography variant="body2">{item.nome} {item.quantidade > 1 && `(x${item.quantidade})`}</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{item.pesoTotal.toFixed(1)} kg</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                )}
            </Grid>
        </Paper>
    );
});

export default CapacidadeCargaPanel;
