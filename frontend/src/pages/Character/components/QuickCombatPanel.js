import React from 'react';
import {
    Box, Grid, Paper, Typography, Button, Chip,
    Accordion, AccordionSummary, AccordionDetails,
    Select, MenuItem, FormControl, InputLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CasinoIcon from '@mui/icons-material/Casino';

const QuickCombatPanel = ({
    character, statsDerivados,
    armasEquipadas, armaduraEquipada, escudoEquipado,
    equiparArma, equiparArmadura, equiparEscudo,
    rollDice, rollAttackWithAdvantage, rollSkillCheck, rollWeaponDamage,
}) => {
    if (!statsDerivados) return null;

    const habilidades    = character.habilidades || {};
    const equipamentos   = character.equipamentos || [];

    /* ── Filtros de equipamento ─────────────────────── */
    const armasDisponiveis = equipamentos.filter(e =>
        e.dano || e.category?.toLowerCase().includes('arma') || e.category?.toLowerCase().includes('weapon')
    );
    const armadurasDisponiveis = equipamentos.filter(e =>
        (e.category?.toLowerCase().includes('armadura') || e.defesa !== undefined || e.bonusDefesa !== undefined ||
         e.tipo?.toLowerCase().includes('leve') || e.tipo?.toLowerCase().includes('media') || e.tipo?.toLowerCase().includes('pesada'))
        && !e.category?.toLowerCase().includes('escudo')
    );
    const escudosDisponiveis = equipamentos.filter(e =>
        e.category?.toLowerCase().includes('escudo') || e.category?.toLowerCase().includes('shield')
    );

    /* ── Defesa calculada via pipeline ──────────────── */
    const { armaduraPesada, defesaArmadura, defesaEscudo } = statsDerivados;
    const defesaInfo = {
        defesaTotal: statsDerivados.defesaTotal,
        bonusAgilidade: statsDerivados.bonusDefAgi,
    };

    const habilidadesCombate = [
        { nome: 'Combate Corpo a Corpo', valor: habilidades['Combate Corpo a Corpo'] || 0, cor: '#7B3311' },
        { nome: 'Combate a Distância',   valor: habilidades['Combate a Distância'] || 0,   cor: '#454E30' },
        { nome: 'Combate Arcano',         valor: habilidades['Combate Arcano'] || 0,         cor: '#162A22' },
    ];

    const habilidadesUteis = [
        { nome: 'Atletismo',    valor: habilidades['Atletismo'] || 0 },
        { nome: 'Acrobacia',    valor: habilidades['Acrobacia'] || 0 },
        { nome: 'Furtividade',  valor: habilidades['Furtividade'] || 0 },
        { nome: 'Percepção',    valor: habilidades['Percepção'] || 0 },
        { nome: 'Intuição',     valor: habilidades['Intuição'] || 0 },
    ];

    return (
        <Paper sx={{ mb: 2, backgroundColor: '#f8f7f4', border: '2px solid #7B3311', borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ p: 2, backgroundColor: '#7B3311', color: 'white' }}>
                <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>⚔️ Combate Rápido</Typography>
            </Box>

            <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    {/* Defesa Calculada */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, backgroundColor: '#e5e8e4', borderLeft: '4px solid #2F3C29', mb: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={3}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="caption" sx={{ color: '#5B1F0F' }}>DEFESA TOTAL</Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2F3C29' }}>{defesaInfo.defesaTotal}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <Typography variant="caption" sx={{ color: '#5B1F0F', display: 'block' }}>
                                        {armaduraPesada
                                            ? `Armadura Pesada: ${defesaArmadura} | Escudo: +${defesaEscudo}`
                                            : `Base: 7 | Agilidade: +${defesaInfo.bonusAgilidade || 0} | Armadura: +${defesaArmadura} | Escudo: +${defesaEscudo}`
                                        }
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                                        {armaduraEquipada && <Chip size="small" label={`🛡️ ${armaduraEquipada.name}`} sx={{ backgroundColor: '#d5dbd4' }} />}
                                        {escudoEquipado && <Chip size="small" label={`🔰 ${escudoEquipado.name}`} sx={{ backgroundColor: '#d5dbd4' }} />}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Sistema de Equipar */}
                    <Grid item xs={12}>
                        <Accordion sx={{ backgroundColor: '#f5f3eb', mb: 1 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography sx={{ fontWeight: 'bold', color: '#40150A' }}>🎒 Equipar Itens</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Arma Principal</InputLabel>
                                            <Select value={armasEquipadas[0]?.name || ''} label="Arma Principal" onChange={(e) => { const a = armasDisponiveis.find(x => x.name === e.target.value); equiparArma(a || null, 0); }}>
                                                <MenuItem value="">Nenhuma</MenuItem>
                                                {armasDisponiveis.map((a, i) => <MenuItem key={i} value={a.name}>{a.name}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Arma Secundária</InputLabel>
                                            <Select value={armasEquipadas[1]?.name || ''} label="Arma Secundária" onChange={(e) => { const a = armasDisponiveis.find(x => x.name === e.target.value); equiparArma(a || null, 1); }}>
                                                <MenuItem value="">Nenhuma</MenuItem>
                                                {armasDisponiveis.map((a, i) => <MenuItem key={i} value={a.name}>{a.name}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Armadura</InputLabel>
                                            <Select value={armaduraEquipada?.name || ''} label="Armadura" onChange={(e) => { const a = armadurasDisponiveis.find(x => x.name === e.target.value); equiparArmadura(a || null); }}>
                                                <MenuItem value="">Nenhuma</MenuItem>
                                                {armadurasDisponiveis.map((a, i) => <MenuItem key={i} value={a.name}>{a.name} (+{a.defesa || 0})</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Escudo</InputLabel>
                                            <Select value={escudoEquipado?.name || ''} label="Escudo" onChange={(e) => { const a = escudosDisponiveis.find(x => x.name === e.target.value); equiparEscudo(a || null); }}>
                                                <MenuItem value="">Nenhum</MenuItem>
                                                {escudosDisponiveis.map((a, i) => <MenuItem key={i} value={a.name}>{a.name} (+{a.defesa || 0})</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                    {/* Armas Equipadas */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>🗡️ Armas Equipadas</Typography>
                        {(armasEquipadas[0] || armasEquipadas[1]) ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {armasEquipadas.filter(Boolean).map((arma, idx) => (
                                    <Paper key={idx} sx={{ p: 1.5, backgroundColor: '#f5ebe3', borderLeft: '4px solid #7B3311', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '14px', color: '#40150A' }}>{arma.name}</Typography>
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                                            {arma.dano && (
                                                <>
                                                    <Button size="small" variant="contained" startIcon={<CasinoIcon />} onClick={() => rollWeaponDamage(arma.dano, arma.name, false, arma)} sx={{ backgroundColor: '#931C4A', fontSize: '11px', '&:hover': { backgroundColor: '#7a1640' } }}>Dano: {arma.dano}</Button>
                                                    <Button size="small" variant="outlined" onClick={() => rollWeaponDamage(arma.dano, arma.name, true, arma)} sx={{ borderColor: '#7B3311', color: '#7B3311', fontSize: '11px' }}>💀 CRIT</Button>
                                                </>
                                            )}
                                            {arma.ataque && (
                                                <Button size="small" variant="contained" startIcon={<CasinoIcon />} onClick={() => rollDice(20, 1, parseInt(arma.ataque) || 0, `Ataque com ${arma.name}`)} sx={{ backgroundColor: '#162A22', fontSize: '11px', '&:hover': { backgroundColor: '#0d1a15' } }}>Ataque: +{arma.ataque}</Button>
                                            )}
                                            {arma.critico && <Typography variant="caption" sx={{ color: '#BB8130' }}>Crit: {arma.critico}</Typography>}
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                        ) : (
                            <Typography variant="body2" sx={{ color: '#756A34', fontStyle: 'italic' }}>Nenhuma arma equipada. Adicione armas em Equipamentos.</Typography>
                        )}
                    </Grid>

                    {/* Testes Rápidos */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>🎯 Testes Rápidos</Typography>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ color: '#5B1F0F', fontWeight: 'bold' }}>Ataques:</Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                                {habilidadesCombate.map((hab, idx) => (
                                    <Button key={idx} size="small" variant="contained" startIcon={<CasinoIcon />} onClick={() => rollAttackWithAdvantage(hab.valor, hab.nome)} sx={{ backgroundColor: hab.cor, fontSize: '11px', '&:hover': { filter: 'brightness(0.9)' } }}>
                                        {hab.nome.replace('Combate ', '')}: +{hab.valor}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ color: '#5B1F0F', fontWeight: 'bold' }}>Outros Testes:</Typography>
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                                {habilidadesUteis.map((hab, idx) => (
                                    <Button key={idx} size="small" variant="outlined" onClick={() => rollSkillCheck(hab.valor, hab.nome)} sx={{ borderColor: '#756A34', color: '#40150A', fontSize: '10px', py: 0.25, '&:hover': { backgroundColor: '#f5f3eb' } }}>
                                        {hab.nome}: +{hab.valor}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default QuickCombatPanel;
