import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
    Card, CardHeader, CardContent, Grid, Box, Typography, Chip,
    Checkbox, Tooltip, Paper, Snackbar, Alert,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CasinoIcon from '@mui/icons-material/Casino';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { EditableField } from './EditableField';
import { atualizarPersonagem } from '../../../services/apiV2';
import { gruposHabilidades } from '../../../data/constants';

/* ── GrupoHeader — Cabeçalho de cada grupo com checkbox ── */
const GrupoHeader = ({ grupo, isChecked, canCheck, onToggle, nivel }) => {
    const tooltipText = isChecked
        ? 'Grupo marcado — +1 em cada habilidade deste grupo. Clique para desmarcar.'
        : canCheck
            ? 'Marcar este grupo para +1 em cada habilidade'
            : nivel >= 7
                ? 'Você já marcou o máximo de 3 grupos para o seu nível'
                : 'Limite de 2 grupos (nível 1–6). A partir do nível 7 pode marcar 3.';

    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 2, py: 1,
            backgroundColor: grupo.borderColor,
            borderRadius: '8px 8px 0 0',
        }}>
            <Typography className="esteban" sx={{
                color: 'white', fontWeight: 'bold', fontSize: '14px',
                display: 'flex', alignItems: 'center', gap: 1,
            }}>
                {grupo.title}
                {isChecked && <CheckCircleIcon sx={{ fontSize: 16, color: '#8BC34A' }} />}
            </Typography>
            <Tooltip title={tooltipText} arrow>
                <span>
                    <Checkbox
                        size="small"
                        checked={isChecked}
                        disabled={!isChecked && !canCheck}
                        onChange={() => onToggle(grupo.key, !isChecked)}
                        sx={{
                            color: 'rgba(255,255,255,0.7)',
                            '&.Mui-checked': { color: '#8BC34A' },
                            p: 0,
                        }}
                    />
                </span>
            </Tooltip>
        </Box>
    );
};

/* ── HabilidadeBox — Card individual de habilidade ── */
const HabilidadeBox = ({ name, value, borderColor, editMode, updateField, rollSkillCheck }) => (
    <Box
        onClick={() => !editMode && rollSkillCheck(value, name)}
        sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 1.5, py: 0.75, borderRadius: 1,
            backgroundColor: value !== 0 ? 'var(--surface-raised)' : 'var(--surface-default)',
            border: `1px solid ${borderColor}33`,
            cursor: editMode ? 'default' : 'pointer',
            transition: 'all 0.2s',
            '&:hover': editMode ? {} : {
                transform: 'scale(1.02)', boxShadow: 2,
                backgroundColor: 'var(--surface-raised)',
            },
        }}
    >
        <Typography className="esteban" variant="body2" sx={{
            fontSize: '12px', color: 'var(--text-primary)', fontWeight: value !== 0 ? 600 : 400,
        }}>
            {name}
        </Typography>
        {editMode ? (
            <EditableField type="number" size="small" value={value}
                onChange={(val) => updateField(`habilidades.${name}`, parseInt(val) || 0)}
                sx={{ width: '55px' }} inputProps={{ style: { textAlign: 'center', padding: '3px', fontSize: '13px' } }} />
        ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CasinoIcon sx={{ fontSize: 12, color: borderColor, opacity: 0.6 }} />
                <Chip label={value >= 0 ? `+${value}` : value} size="small" sx={{
                    backgroundColor: value > 0 ? '#454E30' : value < 0 ? '#931C4A' : '#756A34',
                    color: 'white', fontWeight: 'bold', minWidth: '40px', height: '22px',
                    '& .MuiChip-label': { fontSize: '11px', px: 1 },
                }} />
            </Box>
        )}
    </Box>
);

/* ══════════════════════════════════════════════════════════
   Componente Principal — Habilidades agrupadas com checkbox
   ══════════════════════════════════════════════════════════ */
const HabilidadesSection = React.memo(({
    character, editMode, sectionStyle, cardHeaderStyle,
    updateField, rollSkillCheck, baseUrl, setCharacter,
}) => {
    const habilidades = character.habilidades || {};
    const nivel = character.nivel || character['nível'] || 1;
    const gruposMarcados = character.grupos_marcados || {};

    const [snack, setSnack] = useState({ open: false, msg: '', severity: 'info' });

    /* Máximo de grupos: 2 no nível 1-6, 3 no nível 7+ */
    const maxGrupos = nivel >= 7 ? 3 : 2;
    const totalMarcados = Object.values(gruposMarcados).filter(Boolean).length;

    /* ── Downgrade de nível: remover grupo excedente automaticamente ── */
    useEffect(() => {
        if (totalMarcados > maxGrupos && setCharacter) {
            const gruposMarcadosKeys = Object.entries(gruposMarcados)
                .filter(([, v]) => v)
                .map(([k]) => k);

            /* Remove o último grupo marcado (o mais recente adicionado) */
            const grupoParaRemover = gruposMarcadosKeys[gruposMarcadosKeys.length - 1];
            const grupo = gruposHabilidades.find(g => g.key === grupoParaRemover);
            if (!grupo) return;

            setCharacter(prev => {
                if (!prev) return prev;
                const novosGrupos = { ...(prev.grupos_marcados || {}), [grupoParaRemover]: false };
                const novasHabilidades = { ...(prev.habilidades || {}) };
                grupo.data.forEach(hab => {
                    novasHabilidades[hab.title] = Math.max(0, (novasHabilidades[hab.title] || 0) - 1);
                });
                const habSanitizadas = Object.fromEntries(
                    Object.entries(novasHabilidades).filter(([k]) => k && k.trim() !== '')
                );
                const updated = { ...prev, grupos_marcados: novosGrupos, habilidades: habSanitizadas };
                /* Auto-save a remoção */
                if (updated.id) {
                    atualizarPersonagem(updated.id, updated)
                        .catch(err => console.error('Erro ao auto-salvar downgrade grupo:', err));
                }
                return updated;
            });

            setSnack({
                open: true,
                msg: `Nível reduzido! Grupo "${grupo.title}" desmarcado (máx. ${maxGrupos} grupos).`,
                severity: 'warning',
            });
        }
    }, [maxGrupos, totalMarcados]); // eslint-disable-line react-hooks/exhaustive-deps

    /* ── Auto-save dos grupos marcados ── */
    const autoSave = useCallback(async (updatedChar) => {
        if (!updatedChar?.id) return;
        try {
            await atualizarPersonagem(updatedChar.id, updatedChar);
        } catch (err) {
            console.error('Erro ao auto-salvar grupos marcados:', err);
        }
    }, []);

    /* ── Toggle de grupo ── */
    const handleToggleGrupo = useCallback((grupoKey, novoStatus) => {
        if (!setCharacter) return;

        const grupo = gruposHabilidades.find(g => g.key === grupoKey);
        if (!grupo) return;

        /* Verificar limites */
        if (novoStatus && totalMarcados >= maxGrupos) {
            setSnack({
                open: true,
                msg: maxGrupos === 2
                    ? 'Máximo de 2 grupos no nível 1-6. A partir do nível 7 pode marcar mais um.'
                    : 'Máximo de 3 grupos atingido.',
                severity: 'warning',
            });
            return;
        }

        setCharacter(prev => {
            if (!prev) return prev;
            const novosGrupos = { ...(prev.grupos_marcados || {}), [grupoKey]: novoStatus };
            const novasHabilidades = { ...(prev.habilidades || {}) };

            /* +1 ou -1 em cada habilidade do grupo */
            const delta = novoStatus ? 1 : -1;
            grupo.data.forEach(hab => {
                const nomeHab = hab.title;
                novasHabilidades[nomeHab] = (novasHabilidades[nomeHab] || 0) + delta;
            });

            /* Sanitizar chaves vazias */
            const habSanitizadas = Object.fromEntries(
                Object.entries(novasHabilidades).filter(([k]) => k && k.trim() !== '')
            );

            const updated = {
                ...prev,
                grupos_marcados: novosGrupos,
                habilidades: habSanitizadas,
            };
            autoSave(updated);
            return updated;
        });

        setSnack({
            open: true,
            msg: novoStatus
                ? `+1 em todas as habilidades de ${grupo.title}!`
                : `Removido bônus do grupo ${grupo.title}`,
            severity: novoStatus ? 'success' : 'info',
        });
    }, [setCharacter, totalMarcados, maxGrupos, autoSave]);

    /* ── Organizar habilidades em grupos ── */
    const gruposRenderizados = useMemo(() => {
        return gruposHabilidades.map(grupo => ({
            ...grupo,
            habilidadesDoGrupo: grupo.data.map(hab => ({
                name: hab.title,
                value: habilidades[hab.title] ?? 0,
            })),
        }));
    }, [habilidades]);

    /* Habilidades que não pertencem a nenhum grupo (edge case) */
    const habNosGrupos = useMemo(() => {
        const set = new Set();
        gruposHabilidades.forEach(g => g.data.forEach(h => set.add(h.title)));
        return set;
    }, []);
    const habsOrfas = useMemo(() =>
        Object.entries(habilidades).filter(([k]) => k && k.trim() && !habNosGrupos.has(k)),
        [habilidades, habNosGrupos]
    );

    return (
        <Card sx={sectionStyle}>
            <CardHeader sx={cardHeaderStyle} titleTypographyProps={{ component: 'div' }} title={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography className="esteban" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FitnessCenterIcon /> Habilidades
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                            label={`Grupos: ${totalMarcados}/${maxGrupos}`}
                            size="small"
                            sx={{
                                backgroundColor: totalMarcados >= maxGrupos ? '#454E30' : '#756A34',
                                color: 'white', fontWeight: 'bold', fontSize: '11px',
                            }}
                        />
                        {nivel >= 7 && (
                            <Chip label="Nv.7+" size="small" variant="outlined"
                                sx={{ fontSize: '10px', borderColor: '#BB8130', color: '#BB8130' }} />
                        )}
                    </Box>
                </Box>
            } />
            <CardContent>
                <Typography className="esteban" variant="body2" sx={{ color: 'var(--text-primary)', mb: 1, textAlign: 'center', fontSize: '11px' }}>
                    💡 Clique em uma habilidade para rolar um teste (d20 + modificador)
                </Typography>
                <Typography className="esteban" variant="body2" sx={{ color: 'var(--text-primary)', mb: 2, textAlign: 'center', fontSize: '11px', fontStyle: 'italic' }}>
                    Marque até {maxGrupos} grupos para receber +1 em cada habilidade do grupo.
                    {nivel < 7 && ' A partir do nível 7 poderá marcar um terceiro grupo.'}
                </Typography>

                <Grid container spacing={2}>
                    {gruposRenderizados.map((grupo) => (
                        <Grid item xs={12} sm={6} md={4} lg={2.4} key={grupo.key}>
                            <Paper elevation={2} sx={{
                                borderRadius: 2, overflow: 'hidden',
                                border: `1px solid ${grupo.borderColor}33`,
                                transition: 'box-shadow 0.2s',
                                '&:hover': { boxShadow: 4 },
                            }}>
                                <GrupoHeader
                                    grupo={grupo}
                                    isChecked={!!gruposMarcados[grupo.key]}
                                    canCheck={totalMarcados < maxGrupos}
                                    onToggle={handleToggleGrupo}
                                    nivel={nivel}
                                />
                                <Box sx={{
                                    display: 'flex', flexDirection: 'column', gap: 0.5,
                                    p: 1, backgroundColor: 'var(--surface-default)',
                                }}>
                                    {grupo.habilidadesDoGrupo.map(hab => (
                                        <HabilidadeBox
                                            key={hab.name}
                                            name={hab.name}
                                            value={hab.value}
                                            borderColor={grupo.borderColor}
                                            editMode={editMode}
                                            updateField={updateField}
                                            rollSkillCheck={rollSkillCheck}
                                        />
                                    ))}
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Habilidades órfãs (não pertencentes a nenhum grupo) */}
                {habsOrfas.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography className="esteban" variant="subtitle2" sx={{ color: 'var(--text-primary)', mb: 1 }}>
                            Outras Habilidades
                        </Typography>
                        <Grid container spacing={1}>
                            {habsOrfas.map(([key, value]) => (
                                <Grid item xs={6} sm={4} md={3} key={key}>
                                    <HabilidadeBox
                                        name={key}
                                        value={value}
                                        borderColor="#756A34"
                                        editMode={editMode}
                                        updateField={updateField}
                                        rollSkillCheck={rollSkillCheck}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </CardContent>

            {/* Feedback */}
            <Snackbar open={snack.open} autoHideDuration={3000}
                onClose={() => setSnack(s => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={() => setSnack(s => ({ ...s, open: false }))}
                    severity={snack.severity} variant="filled" sx={{ width: '100%', fontSize: '12px' }}>
                    {snack.msg}
                </Alert>
            </Snackbar>
        </Card>
    );
});

export default HabilidadesSection;
