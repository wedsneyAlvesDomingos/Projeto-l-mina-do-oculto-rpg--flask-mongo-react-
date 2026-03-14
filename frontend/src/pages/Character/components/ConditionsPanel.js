import React, { useState, useMemo, useCallback } from 'react';
import {
    Box, Card, CardHeader, CardContent, Grid, Paper, Typography,
    IconButton, Chip, Tooltip, Divider, TextField, Collapse,
    Badge, LinearProgress, Button, Dialog, DialogTitle, DialogContent,
    DialogActions, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import WarningIcon from '@mui/icons-material/Warning';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ShieldIcon from '@mui/icons-material/Shield';
import SpeedIcon from '@mui/icons-material/Speed';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import TimerIcon from '@mui/icons-material/Timer';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import {
    condicoesDisponiveis,
    condicoesArray,
    CORES_CONDICOES,
    categoriasCondicoes,
    getCondicao,
    getCondicoesPorCategoria,
    getCondicaoParaNivel,
    getCondicaoResumo,
    getCondicoesComFlag,
    getCondicoesComDanoRecorrente,
    isCondicaoIncapacitante,
    resolverCondicoesImplicitas,
    aplicarCondicao,
    removerCondicao,
} from '../../../data/constants';

/* ─────────────────────────────────────────────────────────
   Ícones por categoria
   ───────────────────────────────────────────────────────── */
const CATEGORIA_ICONS = {
    'incapacitante': '⛓️',
    'mental': '🧠',
    'fisica': '🦴',
    'magica': '🔮',
    'ambiente': '🌪️',
    'progressiva': '🔥',
};

/* ─────────────────────────────────────────────────────────
   Subcomponente: Resumo de penalidades ativas
   ───────────────────────────────────────────────────────── */
const PenaltySummary = ({ condicoesAtivas, modificadoresAutoritativos }) => {
    const resumo = useMemo(() => {
        // Se temos modificadores autoritativos (do hook central), usar esses
        if (modificadoresAutoritativos) {
            const mod = modificadoresAutoritativos.modificadores || {};
            const vel = modificadoresAutoritativos.velocidade || {};
            const flags = [];
            if (modificadoresAutoritativos.flags) {
                Object.entries(modificadoresAutoritativos.flags).forEach(([k, v]) => {
                    if (v === true) flags.push(k);
                });
            }
            // Adicionar flags de vantagem/desvantagem de ataque
            if (modificadoresAutoritativos.vantagensAtaque > 0) flags.push('vantagemAtaques');
            if (modificadoresAutoritativos.desvantagensAtaque > 0) flags.push('desvantagemAtaques');
            return {
                pen: {
                    defesa: mod.defesa || 0,
                    ataques: mod.ataques || 0,
                    testes: mod.testes || 0,
                    velocidade: vel.zero ? -999 : vel.metade ? -50 : (vel.reducao || 0),
                    percepcao: mod.percepcao || 0,
                },
                flags,
                resumoTexto: modificadoresAutoritativos.resumoTexto || [],
            };
        }
        // Fallback: calcular localmente
        const pen = { defesa: 0, ataques: 0, testes: 0, velocidade: 0, percepcao: 0 };
        const flags = new Set();

        condicoesAtivas.forEach(({ condObj, value }) => {
            if (!condObj) return;
            // Para condições progressivas com níveis, usar penalidades do nível ativo
            let effectiveCond = condObj;
            if (condObj.niveisDetalhes && typeof value === 'number' && value >= 1) {
                effectiveCond = getCondicaoParaNivel(condObj.id || condObj.nome, value) || condObj;
            }
            // Penalidades numéricas: só a pior prevalece por tipo
            if (effectiveCond.penalidades) {
                Object.entries(effectiveCond.penalidades).forEach(([key, val]) => {
                    if (typeof val === 'number' && val < pen[key]) pen[key] = val;
                });
            }
            // Flags booleanas (semAcoes, desvantagemAtaques, etc.)
            if (effectiveCond.flags) {
                Object.entries(effectiveCond.flags).forEach(([k, v]) => {
                    if (v === true) flags.add(k);
                });
            }
        });

        return { pen, flags: [...flags] };
    }, [condicoesAtivas, modificadoresAutoritativos]);

    const hasPenalties = Object.values(resumo.pen).some(v => v !== 0) || resumo.flags.length > 0;
    if (!hasPenalties) return null;

    const flagLabels = {
        semAcoes: '🚫 Sem Ações',
        semReacoes: '🚫 Sem Reações',
        semMovimento: '🚫 Sem Movimento',
        semConcentracao: '🚫 Sem Concentração',
        desvantagemAtaques: '↓ Desv. Ataques',
        vantagemContraAlvo: '↑ Vant. Contra (inimigos)',
        vantagemAtaques: '↑ Vant. Ataques',
        desvantagemContraAlvo: '↓ Desv. Contra (inimigos)',
        imuneADano: '🛡️ Imune a Dano',
        criticoReduzido: '↓ Crítico Reduzido',
    };

    return (
        <Paper sx={{
            p: 1.5, mb: 2,
            background: 'linear-gradient(135deg, rgba(147,28,74,0.08) 0%, rgba(91,31,15,0.08) 100%)',
            border: '1px solid rgba(147,28,74,0.25)',
            borderRadius: 2,
        }}>
            <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#931C4A', mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <WarningIcon sx={{ fontSize: 16 }} /> Penalidades Acumuladas
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                {resumo.pen.defesa !== 0 && (
                    <Chip icon={<ShieldIcon sx={{ fontSize: 14 }} />} label={`Defesa ${resumo.pen.defesa}`} size="small"
                        sx={{ backgroundColor: '#931C4A', color: 'white', fontWeight: 'bold', fontSize: '11px' }} />
                )}
                {resumo.pen.ataques !== 0 && (
                    <Chip icon={<LocalFireDepartmentIcon sx={{ fontSize: 14 }} />} label={`Ataques ${resumo.pen.ataques}`} size="small"
                        sx={{ backgroundColor: '#B23E3E', color: 'white', fontWeight: 'bold', fontSize: '11px' }} />
                )}
                {resumo.pen.testes !== 0 && (
                    <Chip label={`Testes ${resumo.pen.testes}`} size="small"
                        sx={{ backgroundColor: '#8B6914', color: 'white', fontWeight: 'bold', fontSize: '11px' }} />
                )}
                {resumo.pen.velocidade !== 0 && (
                    <Chip icon={<SpeedIcon sx={{ fontSize: 14 }} />}
                        label={resumo.pen.velocidade === -999 ? 'Velocidade: 0 (imóvel)' : resumo.pen.velocidade === -50 ? 'Velocidade: metade' : `Velocidade ${resumo.pen.velocidade}`}
                        size="small"
                        sx={{ backgroundColor: '#2E5C4F', color: 'white', fontWeight: 'bold', fontSize: '11px' }} />
                )}
                {resumo.pen.percepcao !== 0 && (
                    <Chip icon={<VisibilityIcon sx={{ fontSize: 14 }} />} label={`Percepção ${resumo.pen.percepcao}`} size="small"
                        sx={{ backgroundColor: '#4A3080', color: 'white', fontWeight: 'bold', fontSize: '11px' }} />
                )}
                {resumo.flags.map(f => (
                    <Chip key={f} icon={<BlockIcon sx={{ fontSize: 14 }} />}
                        label={flagLabels[f] || f} size="small"
                        sx={{ backgroundColor: '#5B1F0F', color: 'white', fontSize: '11px' }} />
                ))}
            </Box>
        </Paper>
    );
};

/* ─────────────────────────────────────────────────────────
   Subcomponente: Card individual de condição ativa
   ───────────────────────────────────────────────────────── */
const ConditionCard = ({ condKey, value, condObj, isAuto, fonteAuto, onRemove, onSetLevel }) => {
    const [expanded, setExpanded] = useState(false);
    const hasLevels = condObj?.niveis > 0;
    const hasDano = condObj?.danoRecorrente && condObj.danoRecorrente.valor;
    const incapacitante = condObj ? isCondicaoIncapacitante(condObj.id) : false;

    // Resolve level-specific data for progressive conditions
    const effectiveCond = useMemo(() => {
        if (hasLevels && typeof value === 'number' && value >= 1 && condObj?.niveisDetalhes) {
            return getCondicaoParaNivel(condObj.id || condKey, value) || condObj;
        }
        return condObj;
    }, [condObj, condKey, value, hasLevels]);

    const effectiveDano = effectiveCond?.danoRecorrente && effectiveCond.danoRecorrente.valor;
    const levelLabel = hasLevels && effectiveCond?.nomeNivel ? ` — ${effectiveCond.nomeNivel}` : '';

    return (
        <Paper
            className="condition-card"
            sx={{
                p: 1.5,
                backgroundColor: condObj?.cor || '#931C4A',
                color: 'white',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 },
                border: isAuto ? '2px dashed rgba(255,255,255,0.5)' : 'none',
                position: 'relative',
                overflow: 'visible',
            }}
            onClick={() => setExpanded(!expanded)}
        >
            {/* Badge automática */}
            {isAuto && (
                <Chip label="AUTO" size="small" sx={{
                    position: 'absolute', top: -8, right: -8,
                    backgroundColor: 'var(--footer-bg)', color: 'white',
                    fontSize: '9px', height: '16px', fontWeight: 'bold',
                }} />
            )}

            {/* Badge incapacitante */}
            {incapacitante && !isAuto && (
                <Chip label="⚠" size="small" sx={{
                    position: 'absolute', top: -8, left: -8,
                    backgroundColor: '#FF1744', color: 'white',
                    fontSize: '12px', height: '18px', width: '18px',
                    '& .MuiChip-label': { p: 0 },
                }} />
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flex: 1 }}>
                    <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                        {isAuto && '🔒 '}{condKey}
                        {hasLevels && typeof value === 'number' ? ` (${value}/${condObj.niveis})` : ''}
                        {levelLabel}
                    </Typography>
                    {effectiveDano && (
                        <Tooltip title={`Dano: ${effectiveCond.danoRecorrente.valor} ${effectiveCond.danoRecorrente.tipo}`} arrow>
                            <LocalFireDepartmentIcon sx={{ fontSize: 14, opacity: 0.8 }} />
                        </Tooltip>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {condObj?.duracao && (
                        <Tooltip title={`Duração: ${condObj.duracao}`} arrow>
                            <TimerIcon sx={{ fontSize: 14, opacity: 0.7 }} />
                        </Tooltip>
                    )}
                    {!isAuto && (
                        <IconButton size="small"
                            onClick={(e) => { e.stopPropagation(); onRemove(condKey); }}
                            sx={{ color: 'white', p: 0.5 }}
                        >
                            <CancelIcon fontSize="small" />
                        </IconButton>
                    )}
                    {expanded ? <ExpandLessIcon sx={{ fontSize: 16 }} /> : <ExpandMoreIcon sx={{ fontSize: 16 }} />}
                </Box>
            </Box>

            {/* Penalidades resumidas em uma linha */}
            {effectiveCond?.penalidades && (
                <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                    {effectiveCond.penalidades.defesa && (
                        <Chip label={`Def ${effectiveCond.penalidades.defesa}`} size="small"
                            sx={{ height: '16px', fontSize: '10px', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' }} />
                    )}
                    {effectiveCond.penalidades.ataques && (
                        <Chip label={`Atq ${effectiveCond.penalidades.ataques}`} size="small"
                            sx={{ height: '16px', fontSize: '10px', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' }} />
                    )}
                    {effectiveCond.penalidades.velocidade && (
                        <Chip label={`Vel ${effectiveCond.penalidades.velocidade}`} size="small"
                            sx={{ height: '16px', fontSize: '10px', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' }} />
                    )}
                    {effectiveCond.penalidades.testes && (
                        <Chip label={`Tes ${effectiveCond.penalidades.testes}`} size="small"
                            sx={{ height: '16px', fontSize: '10px', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' }} />
                    )}
                    {effectiveCond.penalidades.percepcao && (
                        <Chip label={`Per ${effectiveCond.penalidades.percepcao}`} size="small"
                            sx={{ height: '16px', fontSize: '10px', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' }} />
                    )}
                </Box>
            )}

            {/* Ações reduzidas (Congelando) */}
            {effectiveCond?.acoesReduzidas > 0 && (
                <Box sx={{ mt: 0.5 }}>
                    <Chip label={`-${effectiveCond.acoesReduzidas} ação(ões)/turno`} size="small"
                        sx={{ height: '16px', fontSize: '10px', backgroundColor: 'rgba(255,23,68,0.5)', color: 'white' }} />
                </Box>
            )}

            {/* Condição aplicada (Congelando ≥9: Atordoado, etc.) */}
            {effectiveCond?.condicaoAplicada && (
                <Box sx={{ mt: 0.5 }}>
                    <Chip label={`⚠ ${effectiveCond.condicaoAplicada}`} size="small"
                        sx={{ height: '18px', fontSize: '10px', backgroundColor: 'rgba(255,23,68,0.7)', color: 'white', fontWeight: 'bold' }} />
                </Box>
            )}

            {/* Detalhes expandidos */}
            <Collapse in={expanded} timeout="auto">
                <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid rgba(255,255,255,0.3)' }}>
                    <Typography variant="body2" sx={{ fontSize: '12px', opacity: 0.9 }}>
                        {effectiveCond?.descricao || condObj?.descricao || 'Sem descrição disponível.'}
                    </Typography>

                    {isAuto && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.7, fontStyle: 'italic' }}>
                            ⚡ Aplicada automaticamente por: {fonteAuto}
                        </Typography>
                    )}

                    {effectiveDano && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'var(--text-primary)', fontWeight: 'bold' }}>
                            🔥 Dano Recorrente: {effectiveCond.danoRecorrente.valor} ({effectiveCond.danoRecorrente.tipo})
                            {effectiveCond.danoRecorrente.momento === 'inicioTurno' ? ' no início do turno' : ' no fim do turno'}
                        </Typography>
                    )}

                    {condObj?.cura && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.8 }}>
                            💊 Cura: {condObj.cura}
                        </Typography>
                    )}

                    {/* Flags ativas */}
                    {effectiveCond?.flags && Object.entries(effectiveCond.flags).some(([, v]) => v) && (
                        <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', gap: 0.3 }}>
                            {effectiveCond.flags.semAcoes && <Chip label="Sem Ações" size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: 'rgba(255,23,68,0.6)', color: 'white' }} />}
                            {effectiveCond.flags.semReacoes && <Chip label="Sem Reações" size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: 'rgba(255,23,68,0.4)', color: 'white' }} />}
                            {effectiveCond.flags.semMovimento && <Chip label="Sem Movimento" size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: 'rgba(255,23,68,0.4)', color: 'white' }} />}
                            {effectiveCond.flags.desvantagemAtaques && <Chip label="Desv. Ataques" size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: 'rgba(255,152,0,0.5)', color: 'white' }} />}
                            {effectiveCond.flags.vantagemContraAlvo && <Chip label="Vant. Contra" size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: 'rgba(255,152,0,0.5)', color: 'white' }} />}
                        </Box>
                    )}

                    {/* Controle de nível para condições com níveis */}
                    {hasLevels && !isAuto && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>Nível:</Typography>
                            <TextField
                                type="number" size="small"
                                value={typeof value === 'number' ? value : 1}
                                onChange={(e) => { e.stopPropagation(); onSetLevel(condKey, parseInt(e.target.value) || 0); }}
                                onClick={(e) => e.stopPropagation()}
                                sx={{
                                    width: '55px',
                                    '& .MuiInputBase-input': { textAlign: 'center', padding: '4px', color: 'white', fontSize: '13px' },
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.4)' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.7)' },
                                }}
                                inputProps={{ min: 0, max: condObj?.niveis || 20 }}
                            />
                            <Typography variant="caption" sx={{ opacity: 0.6 }}>/ {condObj?.niveis || '?'}</Typography>

                            {/* Barra de progressão visual */}
                            <Box sx={{ flex: 1, ml: 1 }}>
                                <LinearProgress
                                    variant="determinate"
                                    value={((typeof value === 'number' ? value : 1) / (condObj?.niveis || 1)) * 100}
                                    sx={{
                                        height: 6, borderRadius: 3,
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: ((typeof value === 'number' ? value : 1) / (condObj?.niveis || 1)) > 0.7 ? '#FF1744' : '#FFD54F',
                                            borderRadius: 3,
                                        },
                                    }}
                                />
                            </Box>
                        </Box>
                    )}
                </Box>
            </Collapse>
        </Paper>
    );
};

/* ─────────────────────────────────────────────────────────
   Subcomponente: Picker de condições por categoria
   ───────────────────────────────────────────────────────── */
const ConditionPicker = ({ condicoesAtivas, onToggle, onSetLevel }) => {
    const [categoriaAberta, setCategoriaAberta] = useState(null);
    const [filtro, setFiltro] = useState('');

    const categorias = useMemo(() => {
        const cats = categoriasCondicoes.map((cat) => {
            const condsDoGrupo = getCondicoesPorCategoria(cat.id);
            const nomes = condsDoGrupo.map(c => c.nome).filter(n =>
                !filtro || n.toLowerCase().includes(filtro.toLowerCase())
            );
            return {
                nome: cat.nome,
                id: cat.id,
                icon: CATEGORIA_ICONS[cat.id] || '📋',
                cor: cat.cor || CORES_CONDICOES[cat.id] || '#756A34',
                condicoes: nomes,
            };
        });
        return cats.filter(c => c.condicoes.length > 0);
    }, [filtro]);

    return (
        <Box>
            <TextField
                fullWidth size="small"
                placeholder="🔍 Filtrar condições..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: 'var(--surface-default)' },
                }}
            />

            {categorias.map(cat => {
                const isOpen = categoriaAberta === cat.nome;
                return (
                    <Box key={cat.nome} sx={{ mb: 1 }}>
                        <Paper
                            sx={{
                                p: 1.5,
                                cursor: 'pointer',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                backgroundColor: isOpen ? cat.cor : 'var(--surface-default)',
                                color: isOpen ? 'white' : 'var(--text-primary)',
                                borderRadius: 1.5,
                                transition: 'all 0.2s',
                                '&:hover': { backgroundColor: isOpen ? cat.cor : 'var(--surface-default)', transform: 'scale(1.005)' },
                            }}
                            onClick={() => setCategoriaAberta(isOpen ? null : cat.nome)}
                        >
                            <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                                {cat.icon} {cat.nome} ({cat.condicoes.length})
                            </Typography>
                            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Paper>

                        <Collapse in={isOpen} timeout="auto">
                            <Grid container spacing={1} sx={{ p: 1.5 }}>
                                {cat.condicoes.map(condNome => {
                                    const condObj = condicoesDisponiveis[condNome];
                                    if (!condObj) return null;
                                    const isActive = condicoesAtivas.hasOwnProperty(condNome);
                                    const hasLevels = condObj.niveis > 0;
                                    const currentLevel = typeof condicoesAtivas[condNome] === 'number' ? condicoesAtivas[condNome] : 0;

                                    // Get level-specific data for active progressive conditions
                                    const displayCond = (hasLevels && isActive && currentLevel >= 1 && condObj.niveisDetalhes)
                                        ? (getCondicaoParaNivel(condObj.id, currentLevel) || condObj)
                                        : condObj;

                                    return (
                                        <Grid item xs={12} sm={6} md={4} key={condNome}>
                                            <Paper
                                                sx={{
                                                    p: 1.5,
                                                    backgroundColor: isActive ? condObj.cor : 'var(--surface-default)',
                                                    color: isActive ? 'white' : 'var(--text-primary)',
                                                    borderRadius: 2,
                                                    border: `2px solid ${isActive ? condObj.cor : '#756A3444'}`,
                                                    cursor: hasLevels ? 'default' : 'pointer',
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        borderColor: condObj.cor,
                                                        transform: 'scale(1.02)',
                                                        boxShadow: 2,
                                                    },
                                                }}
                                                onClick={() => !hasLevels && onToggle(condNome)}
                                            >
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '13px' }}>
                                                            {isActive ? '✓ ' : ''}{condNome}
                                                            {hasLevels && isActive ? ` (${currentLevel}/${condObj.niveis})` : ''}
                                                            {hasLevels && isActive && displayCond.nomeNivel ? ` — ${displayCond.nomeNivel}` : ''}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ fontSize: '11px', opacity: 0.8, mt: 0.5 }}>
                                                            {hasLevels && isActive && displayCond.descricao
                                                                ? displayCond.descricao
                                                                : (condObj.descricao?.substring(0, 80) + (condObj.descricao?.length > 80 ? '...' : ''))
                                                            }
                                                        </Typography>
                                                    </Box>
                                                    {hasLevels && (
                                                        <TextField
                                                            type="number" size="small"
                                                            value={currentLevel || ''}
                                                            onChange={(e) => onSetLevel(condNome, parseInt(e.target.value) || 0)}
                                                            onClick={(e) => e.stopPropagation()}
                                                            sx={{
                                                                width: '50px', ml: 1,
                                                                '& .MuiInputBase-input': {
                                                                    textAlign: 'center', padding: '4px',
                                                                    color: isActive ? 'white' : 'inherit',
                                                                },
                                                            }}
                                                            inputProps={{ min: 0, max: condObj.niveis }}
                                                            placeholder="Nv"
                                                        />
                                                    )}
                                                </Box>

                                                {/* Progress bar for progressive conditions */}
                                                {hasLevels && isActive && currentLevel > 0 && (
                                                    <Box sx={{ mt: 0.8 }}>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={(currentLevel / condObj.niveis) * 100}
                                                            sx={{
                                                                height: 4, borderRadius: 2,
                                                                backgroundColor: 'rgba(255,255,255,0.2)',
                                                                '& .MuiLinearProgress-bar': {
                                                                    backgroundColor: (currentLevel / condObj.niveis) > 0.7 ? '#FF1744' : '#FFD54F',
                                                                    borderRadius: 2,
                                                                },
                                                            }}
                                                        />
                                                    </Box>
                                                )}

                                                {/* Mini-info de penalidades (use level-specific for active progressive) */}
                                                {displayCond.penalidades && (
                                                    <Box sx={{ display: 'flex', gap: 0.3, mt: 0.5, flexWrap: 'wrap' }}>
                                                        {Object.entries(displayCond.penalidades).filter(([, v]) => v).map(([k, v]) => (
                                                            <Chip key={k} label={`${k.substring(0, 3)} ${v > 0 ? '+' : ''}${v}`}
                                                                size="small"
                                                                sx={{
                                                                    height: '14px', fontSize: '9px',
                                                                    backgroundColor: isActive ? 'rgba(0,0,0,0.3)' : 'rgba(147,28,74,0.15)',
                                                                    color: isActive ? 'white' : '#931C4A',
                                                                }} />
                                                        ))}
                                                    </Box>
                                                )}

                                                {/* Dano recorrente info for active progressive */}
                                                {displayCond.danoRecorrente?.valor && (
                                                    <Typography variant="caption" sx={{ display: 'block', mt: 0.3, opacity: 0.8, fontSize: '10px', color: isActive ? '#FFD54F' : '#E65100' }}>
                                                        🔥 {displayCond.danoRecorrente.valor} {displayCond.danoRecorrente.tipo}
                                                    </Typography>
                                                )}

                                                {/* Applied condition warning (Congelando ≥9) */}
                                                {displayCond.condicaoAplicada && (
                                                    <Chip label={`⚠ ${displayCond.condicaoAplicada}`} size="small"
                                                        sx={{ mt: 0.5, height: '16px', fontSize: '9px', backgroundColor: 'rgba(255,23,68,0.7)', color: 'white', fontWeight: 'bold' }} />
                                                )}

                                                {condObj.duracao && (
                                                    <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.6, fontSize: '10px' }}>
                                                        ⏱️ {condObj.duracao}
                                                    </Typography>
                                                )}
                                            </Paper>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Collapse>
                    </Box>
                );
            })}
        </Box>
    );
};

/* ═══════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL: ConditionsPanel
   Gerenciamento completo de condições ativas na ficha
   ═══════════════════════════════════════════════════════════ */
const ConditionsPanel = ({
    character,
    nivelLuz,
    sectionStyle,
    cardHeaderStyle,
    saveConditions,
    condicoesModificadores,
}) => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState(null);

    // ── Condições base do personagem ──
    const condicoesBase = character?.condicoes || {};

    // ── Condições automáticas (ex: Cego por escuridão) ──
    const condicoesAmbientais = useMemo(() => {
        const auto = {};
        if (nivelLuz === 'escuridao' && !character?.visao_no_escuro) {
            auto['Cego'] = 'escuridão';
        }
        return auto;
    }, [nivelLuz, character?.visao_no_escuro]);

    // ── Condições implícitas (ex: Escondido→Obscurecido, Paralisado→Atordoado) ──
    const condicoesImplicitasMap = useMemo(() => {
        // Merge base + ambientais para resolver cadeias completas
        const todasManuais = { ...condicoesBase, ...condicoesAmbientais };
        return resolverCondicoesImplicitas(todasManuais);
    }, [condicoesBase, condicoesAmbientais]);

    // ── Todas as automáticas (ambientais + implícitas) ──
    const condicoesAutomaticas = useMemo(() => ({
        ...condicoesAmbientais,
        ...condicoesImplicitasMap,
    }), [condicoesAmbientais, condicoesImplicitasMap]);

    // ── Condições combinadas (base + auto) ──
    const condicoes = useMemo(() => ({
        ...condicoesBase,
        ...condicoesAutomaticas,
    }), [condicoesBase, condicoesAutomaticas]);

    const hasCondicoes = Object.keys(condicoes).length > 0;

    // ── Lista enriquecida para o PenaltySummary ──
    const condicoesEnriquecidas = useMemo(() =>
        Object.entries(condicoes).map(([key, value]) => ({
            key,
            value,
            condObj: condicoesDisponiveis[key] || null,
        })),
        [condicoes]
    );

    // ── Handlers ──
    const toggleCondition = useCallback((conditionName) => {
        if (condicoesAutomaticas[conditionName]) return;
        const newCondicoes = { ...condicoesBase };
        if (newCondicoes[conditionName]) {
            delete newCondicoes[conditionName];
        } else {
            newCondicoes[conditionName] = true;
        }
        saveConditions(newCondicoes);
    }, [condicoesBase, condicoesAutomaticas, saveConditions]);

    const setConditionLevel = useCallback((conditionName, level) => {
        if (condicoesAutomaticas[conditionName]) return;
        const newCondicoes = { ...condicoesBase };
        if (level === 0 || level === '') {
            delete newCondicoes[conditionName];
        } else {
            // Enforce max level
            const condObj = condicoesDisponiveis[conditionName];
            const maxLevel = condObj?.niveis || 20;
            newCondicoes[conditionName] = Math.min(Math.max(1, level), maxLevel);
        }
        saveConditions(newCondicoes);
    }, [condicoesBase, condicoesAutomaticas, saveConditions]);

    const removeCondition = useCallback((conditionName) => {
        if (condicoesAutomaticas[conditionName]) return;
        const newCondicoes = { ...condicoesBase };
        delete newCondicoes[conditionName];
        saveConditions(newCondicoes);
    }, [condicoesBase, condicoesAutomaticas, saveConditions]);

    const isCondicaoAutomatica = useCallback((name) => {
        return condicoesAutomaticas.hasOwnProperty(name);
    }, [condicoesAutomaticas]);

    // ── Contagem por categoria ──
    const contagemPorCategoria = useMemo(() => {
        const contagem = {};
        Object.keys(condicoes).forEach(key => {
            const condObj = condicoesDisponiveis[key];
            if (condObj?.categoria) {
                contagem[condObj.categoria] = (contagem[condObj.categoria] || 0) + 1;
            }
        });
        return contagem;
    }, [condicoes]);

    // ── Condições com dano recorrente ativas (level-aware) ──
    const danoRecorrenteAtivo = useMemo(() => {
        return Object.entries(condicoes)
            .map(([key, value]) => {
                const condObj = condicoesDisponiveis[key];
                if (!condObj) return null;
                // For progressive conditions, get the level-specific damage
                if (condObj.niveisDetalhes && typeof value === 'number' && value >= 1) {
                    const lvlCond = getCondicaoParaNivel(condObj.id, value);
                    return lvlCond || condObj;
                }
                return condObj;
            })
            .filter(c => c?.danoRecorrente?.valor);
    }, [condicoes]);

    if (!character) return null;

    return (
        <Card sx={{ ...sectionStyle, mt: 2 }}>
            <CardHeader
                sx={{
                    ...cardHeaderStyle,
                    background: hasCondicoes
                        ? 'linear-gradient(135deg, #931C4A 0%, #5B1F0F 100%)'
                        : cardHeaderStyle.background,
                }}
                titleTypographyProps={{ component: 'div' }}
                title={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Typography className="esteban" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            ⚠️ Condições Ativas
                            <Badge
                                badgeContent={Object.keys(condicoes).length}
                                color="error"
                                sx={{ ml: 1 }}
                            >
                                <Box component="span" sx={{ width: 4 }} />
                            </Badge>
                            {Object.keys(condicoesAutomaticas).length > 0 && (
                                <Chip
                                    label={`${Object.keys(condicoesAutomaticas).length} auto`}
                                    size="small"
                                    sx={{ backgroundColor: 'rgba(255,255,255,0.3)', color: 'white', fontSize: '10px', height: '18px' }}
                                />
                            )}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            {/* Indicadores de categoria no header */}
                            {Object.entries(contagemPorCategoria).map(([cat, count]) => (
                                <Tooltip key={cat} title={`${cat}: ${count}`} arrow>
                                    <Chip
                                        label={`${CATEGORIA_ICONS[cat] || '📋'} ${count}`}
                                        size="small"
                                        sx={{
                                            backgroundColor: CORES_CONDICOES[cat] || '#756A34',
                                            color: 'white',
                                            fontSize: '10px',
                                            height: '20px',
                                        }}
                                    />
                                </Tooltip>
                            ))}
                            <IconButton
                                onClick={() => setShowPicker(!showPicker)}
                                sx={{ color: 'white' }}
                                title={showPicker ? 'Fechar lista' : 'Gerenciar condições'}
                            >
                                {showPicker ? <CancelIcon /> : <EditIcon />}
                            </IconButton>
                        </Box>
                    </Box>
                }
            />
            <CardContent>
                {/* Resumo de Penalidades */}
                {hasCondicoes && <PenaltySummary condicoesAtivas={condicoesEnriquecidas} modificadoresAutoritativos={condicoesModificadores} />}

                {/* Alerta de dano recorrente */}
                {danoRecorrenteAtivo.length > 0 && (
                    <Paper sx={{
                        p: 1.5, mb: 2,
                        background: 'linear-gradient(135deg, rgba(255,87,34,0.1) 0%, rgba(255,152,0,0.1) 100%)',
                        border: '1px solid rgba(255,87,34,0.3)',
                        borderRadius: 2,
                    }}>
                        <Typography className="esteban" variant="subtitle2" sx={{
                            fontWeight: 'bold', color: '#E65100', mb: 0.5,
                            display: 'flex', alignItems: 'center', gap: 0.5,
                        }}>
                            <LocalFireDepartmentIcon sx={{ fontSize: 16 }} /> Dano Recorrente Ativo
                        </Typography>
                        {danoRecorrenteAtivo.map(c => (
                            <Typography key={c.id} variant="caption" sx={{ display: 'block', color: 'var(--text-primary)' }}>
                                • {c.descricao?.split('.')[0] || c.id}: <strong>{c.danoRecorrente.valor} {c.danoRecorrente.tipo}</strong>
                                {' '}({c.danoRecorrente.momento === 'inicioTurno' ? 'início do turno' : 'fim do turno'})
                            </Typography>
                        ))}
                    </Paper>
                )}

                {/* Condições Ativas */}
                {hasCondicoes ? (
                    <Box sx={{ mb: showPicker ? 3 : 0 }}>
                        <Grid container spacing={1}>
                            {Object.entries(condicoes).map(([key, value]) => {
                                const condObj = condicoesDisponiveis[key] || {};
                                const isAuto = isCondicaoAutomatica(key);
                                const fonteAuto = isAuto ? condicoesAutomaticas[key] : null;

                                return (
                                    <Grid item xs={12} sm={6} md={4} key={key}>
                                        <ConditionCard
                                            condKey={key}
                                            value={value}
                                            condObj={condObj}
                                            isAuto={isAuto}
                                            fonteAuto={fonteAuto}
                                            onRemove={removeCondition}
                                            onSetLevel={setConditionLevel}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                ) : (
                    <Typography className="esteban" sx={{ textAlign: 'center', color: 'var(--text-primary)', mb: showPicker ? 2 : 0 }}>
                        ✓ Nenhuma condição ativa
                    </Typography>
                )}

                {/* Picker de Condições */}
                {showPicker && (
                    <Box sx={{ mt: 2 }}>
                        <Divider sx={{ mb: 2 }} />
                        <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: 'var(--text-primary)', mb: 1 }}>
                            📋 Adicionar/Remover Condições
                        </Typography>
                        <Typography className="esteban" variant="body2" sx={{ color: 'var(--text-primary)', mb: 2, fontStyle: 'italic' }}>
                            💡 Apenas a maior penalidade ou bônus de acerto/defesa é aplicada. Outros efeitos são cumulativos.
                        </Typography>
                        <ConditionPicker
                            condicoesAtivas={condicoes}
                            onToggle={toggleCondition}
                            onSetLevel={setConditionLevel}
                        />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default ConditionsPanel;
