import React from 'react';
import {
    Box, Grid, Paper, Typography, TextField, Divider,
    Accordion, AccordionSummary, AccordionDetails, Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ShieldIcon from '@mui/icons-material/Shield';
import SpeedIcon from '@mui/icons-material/Speed';
import CasinoIcon from '@mui/icons-material/Casino';

/* ── Sub-componentes internos ─────────────────────── */

const StatBox = ({ icon, label, atual, max, color, bgColor, fieldAtual, fieldMax, editMode, updateField }) => {
    const [localAtual, setLocalAtual] = React.useState(atual);
    const [localMax, setLocalMax]     = React.useState(max);
    React.useEffect(() => { setLocalAtual(atual); }, [atual]);
    React.useEffect(() => { setLocalMax(max); }, [max]);

    return (
        <Paper sx={{ p: 2, borderRadius: 3, background: bgColor, border: `2px solid ${color}`, textAlign: 'center', minWidth: '120px', boxShadow: `0 4px 12px ${color}33` }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>{icon}</Box>
            <Typography className="esteban" sx={{ color, fontSize: '11px', fontWeight: 'bold', mb: 0.5 }}>{label}</Typography>
            {editMode ? (
                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                    <TextField type="number" size="small" value={localAtual} onChange={(e) => setLocalAtual(e.target.value)} onBlur={() => updateField(fieldAtual, parseInt(localAtual) || 0)} sx={{ width: '50px' }} inputProps={{ style: { textAlign: 'center', padding: '4px' } }} />
                    <Typography sx={{ color }}>/</Typography>
                    <TextField type="number" size="small" value={localMax} onChange={(e) => setLocalMax(e.target.value)} onBlur={() => updateField(fieldMax, parseInt(localMax) || 0)} sx={{ width: '50px' }} inputProps={{ style: { textAlign: 'center', padding: '4px' } }} />
                </Box>
            ) : (
                <Typography className="esteban" sx={{ color, fontWeight: 'bold', fontSize: '24px' }}>
                    {atual} <span style={{ fontSize: '14px' }}>/ {max}</span>
                </Typography>
            )}
        </Paper>
    );
};

const SingleStatBox = ({ icon, label, value, color, bgColor, field, parseFunc = parseInt, editMode, updateField }) => {
    const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) || 0 : value;
    const [localValue, setLocalValue] = React.useState(numericValue);
    React.useEffect(() => { setLocalValue(numericValue); }, [numericValue]);

    return (
        <Paper sx={{ p: 2, borderRadius: 3, background: bgColor, border: `2px solid ${color}`, textAlign: 'center', minWidth: '100px', boxShadow: `0 4px 12px ${color}33` }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>{icon}</Box>
            <Typography className="esteban" sx={{ color, fontSize: '11px', fontWeight: 'bold', mb: 0.5 }}>{label}</Typography>
            {editMode ? (
                <TextField type="number" size="small" value={localValue} onChange={(e) => setLocalValue(e.target.value)} onBlur={() => updateField(field, parseFunc(localValue) || 0)} sx={{ width: '60px' }} inputProps={{ style: { textAlign: 'center', padding: '4px' } }} />
            ) : (
                <Typography className="esteban" sx={{ color, fontWeight: 'bold', fontSize: '24px' }}>{value}</Typography>
            )}
        </Paper>
    );
};

/* ── Componente principal ─────────────────────────── */

const VitalStatsSection = ({
    character, editMode, statsDerivados,
    sectionStyle, cardHeaderStyle,
    updateField, rollDice, rollAttackWithAdvantage,
}) => {
    if (!statsDerivados) return null;

    const {
        pvMax: pvCalculado, peMax: peCalculado, pmMax: pmCalculado,
        pvAtual, peAtual, pmAtual,
        defesaTotal: defesa, velocidadeTotal: velocidade, iniciativa,
    } = statsDerivados;

    const habilidades  = character.habilidades || {};
    const corpoACorpo  = habilidades['Combate Corpo a Corpo'] || 0;
    const distancia    = habilidades['Combate a Distância'] || 0;
    const arcano       = habilidades['Combate Arcano'] || 0;

    const atkCards = [
        { label: 'Corpo a Corpo', bonus: corpoACorpo, color: '#7B3311', bg: '#f5ebe3' },
        { label: 'À Distância',   bonus: distancia,    color: '#454E30', bg: '#e8eae5' },
        { label: 'Arcano',        bonus: arcano,       color: '#162A22', bg: '#e3e7e5' },
    ];

    return (
        <Paper elevation={4} sx={{ ...sectionStyle, mb: 3, overflow: 'hidden' }}>
            <Box sx={cardHeaderStyle}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
                    <Typography className="esteban" variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CasinoIcon /> Atributos Vitais & Combate
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ p: 3 }}>
                {/* Pontos Vitais */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12}>
                        <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 2 }}>Pontos Vitais</Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <StatBox icon={<FavoriteIcon sx={{ color: '#931C4A', fontSize: 28 }} />} label="VIDA (PV)" atual={pvAtual} max={pvCalculado} color="#931C4A" bgColor="#f8e8ed" fieldAtual="pv_atual" fieldMax="pv_base_especie" editMode={editMode} updateField={updateField} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <StatBox icon={<BoltIcon sx={{ color: '#AB6422', fontSize: 28 }} />} label="ESTAMINA (PE)" atual={peAtual} max={peCalculado} color="#AB6422" bgColor="#f5ede4" fieldAtual="pe_atual" fieldMax="pe_regalia_classe" editMode={editMode} updateField={updateField} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <StatBox icon={<AutoFixHighIcon sx={{ color: '#454E30', fontSize: 28 }} />} label="MAGIA (PM)" atual={pmAtual} max={pmCalculado} color="#454E30" bgColor="#e8eae5" fieldAtual="pm_atual" fieldMax="pm_regalia_classe" editMode={editMode} updateField={updateField} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <SingleStatBox icon={<ShieldIcon sx={{ color: '#2F3C29', fontSize: 28 }} />} label="DEFESA" value={defesa} color="#2F3C29" bgColor="#e5e8e4" field="defesa" editMode={editMode} updateField={updateField} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <SingleStatBox icon={<SpeedIcon sx={{ color: '#756A34', fontSize: 28 }} />} label="VELOCIDADE" value={`${velocidade}m`} color="#756A34" bgColor="#edecd8" field="velocidade" parseFunc={parseFloat} editMode={editMode} updateField={updateField} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <SingleStatBox icon={<CasinoIcon sx={{ color: '#5B1F0F', fontSize: 28 }} />} label="INICIATIVA" value={`+${iniciativa}`} color="#5B1F0F" bgColor="#ebe5e3" field="iniciativa" editMode={editMode} updateField={updateField} />
                    </Grid>
                </Grid>

                {/* Bônus de Acerto */}
                <Divider sx={{ my: 2 }} />
                <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 2 }}>
                    Bônus de Acerto (D20 + Perícia) - Clique para rolar
                </Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    {atkCards.map((atk) => (
                        <Grid item xs={4} key={atk.label}>
                            <Paper
                                onClick={() => rollAttackWithAdvantage(atk.bonus, atk.label)}
                                sx={{ p: 2, textAlign: 'center', backgroundColor: atk.bg, borderLeft: `4px solid ${atk.color}`, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'scale(1.02)', boxShadow: 4 } }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                    <CasinoIcon sx={{ color: atk.color, fontSize: 20 }} />
                                    <Typography className="esteban" sx={{ fontSize: '12px', color: atk.color }}>{atk.label}</Typography>
                                </Box>
                                <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '20px', color: atk.color }}>
                                    d20 +{atk.bonus}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Rolagem de Iniciativa */}
                <Paper
                    onClick={() => rollDice(20, 1, iniciativa, 'Iniciativa')}
                    sx={{ p: 2, textAlign: 'center', backgroundColor: '#ebe5e3', borderLeft: '4px solid #5B1F0F', cursor: 'pointer', transition: 'all 0.2s', mb: 2, '&:hover': { transform: 'scale(1.01)', boxShadow: 4 } }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <CasinoIcon sx={{ color: '#5B1F0F', fontSize: 20 }} />
                        <Typography className="esteban" sx={{ fontWeight: 'bold', color: '#5B1F0F' }}>
                            Rolar Iniciativa: d20 +{iniciativa}
                        </Typography>
                    </Box>
                </Paper>

                {/* Referência rápida de combate */}
                <Accordion sx={{ backgroundColor: '#f5f3eb', mt: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="esteban" sx={{ fontWeight: 'bold', color: '#40150A' }}>📜 Regras de Combate (Referência Rápida)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#BB8130' }}>🎯 Acerto Crítico (Nat 20)</Typography>
                                    <Typography className="esteban" variant="body2">Dano total é dobrado.</Typography>
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#931C4A' }}>❌ Falha Crítica (Nat 1)</Typography>
                                    <Typography className="esteban" variant="body2">Acumula desgaste na arma (penalidades após 5, 10 e 20 falhas).</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2F3C29' }}>🛡️ Resultado do Confronto</Typography>
                                    <Typography className="esteban" variant="body2">
                                        • Acerto {'>'} Defesa: <strong>Dano Total</strong><br />
                                        • Acerto = Defesa: <strong>Metade do Dano</strong><br />
                                        • Acerto {'<'} Defesa: <strong>Erro (Dano Zero)</strong>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider sx={{ my: 1 }} />
                                <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#5B1F0F', mb: 1 }}>📊 Fórmulas de Cálculo</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    <Chip label="PV = Base Espécie + Regalia + (2×Fortitude)" size="small" sx={{ backgroundColor: '#f8e8ed', color: '#40150A' }} />
                                    <Chip label="PM = Regalia + Arcanismo" size="small" sx={{ backgroundColor: '#e8eae5', color: '#40150A' }} />
                                    <Chip label="PE = Regalia + Atletismo" size="small" sx={{ backgroundColor: '#f5ede4', color: '#40150A' }} />
                                    <Chip label="Defesa (Leve/Média) = 7 + Agi + Armadura + Escudo" size="small" sx={{ backgroundColor: '#e5e8e4', color: '#40150A' }} />
                                    <Chip label="Defesa (Pesada) = Armadura + Escudo (Sem base 7)" size="small" sx={{ backgroundColor: '#d5dbd4', color: '#40150A' }} />
                                    <Chip label="Velocidade = Base + (1,5m a cada 3 Agi, máx +6m)" size="small" sx={{ backgroundColor: '#edecd8', color: '#40150A' }} />
                                </Box>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Paper>
    );
};

export default VitalStatsSection;
