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
    getCondicaoResumo,
    getCondicoesComFlag,
    getCondicoesComDanoRecorrente,
    isCondicaoIncapacitante,
    aplicarCondicao,
    removerCondicao,
} from '../../../data/constants';

/* ─────────────────────────────────────────────────────────
   Ícones por categoria
   ───────────────────────────────────────────────────────── */
const CATEGORIA_ICONS = {
    'Debilitação Física': '🦴',
    'Controle & Incapacitação': '⛓️',
    'Dano Contínuo': '🔥',
    'Mental & Sensorial': '🧠',
    'Ambiental': '🌪️',
    'Proteção & Bônus': '🛡️',
};

/* ─────────────────────────────────────────────────────────
   Subcomponente: Resumo de penalidades ativas
   ───────────────────────────────────────────────────────── */
const PenaltySummary = ({ condicoesAtivas }) => {
    const resumo = useMemo(() => {
        const pen = { defesa: 0, ataques: 0, testes: 0, velocidade: 0, percepcao: 0 };
        const flags = new Set();

        condicoesAtivas.forEach(({ condObj }) => {
            if (!condObj) return;
            // Penalidades numéricas: só a pior prevalece por tipo
            if (condObj.penalidades) {
                Object.entries(condObj.penalidades).forEach(([key, val]) => {
                    if (typeof val === 'number' && val < pen[key]) pen[key] = val;
                });
            }
            // Flags booleanas (semAcoes, desvantagemAtaques, etc.)
            if (condObj.flags) {
                Object.entries(condObj.flags).forEach(([k, v]) => {
                    if (v === true) flags.add(k);
                });
            }
        });

        return { pen, flags: [...flags] };
    }, [condicoesAtivas]);

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
                    <Chip icon={<SpeedIcon sx={{ fontSize: 14 }} />} label={`Velocidade ${resumo.pen.velocidade}`} size="small"
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
    const hasLevels = condObj?.stackRegra === 'acumula' || (typeof value === 'number' && value > 1);
    const hasDano = condObj?.danoRecorrente && condObj.danoRecorrente.valor;
    const incapacitante = condObj ? isCondicaoIncapacitante(condObj.id) : false;

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
                    backgroundColor: '#40150A', color: 'white',
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
                        {typeof value === 'number' && value > 1 ? ` (${value})` : ''}
                    </Typography>
                    {hasDano && (
                        <Tooltip title={`Dano: ${condObj.danoRecorrente.valor} ${condObj.danoRecorrente.tipo}`} arrow>
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
            {condObj?.penalidades && (
                <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                    {condObj.penalidades.defesa && (
                        <Chip label={`Def ${condObj.penalidades.defesa}`} size="small"
                            sx={{ height: '16px', fontSize: '10px', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' }} />
                    )}
                    {condObj.penalidades.ataques && (
                        <Chip label={`Atq ${condObj.penalidades.ataques}`} size="small"
                            sx={{ height: '16px', fontSize: '10px', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' }} />
                    )}
                    {condObj.penalidades.velocidade && (
                        <Chip label={`Vel ${condObj.penalidades.velocidade}`} size="small"
                            sx={{ height: '16px', fontSize: '10px', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' }} />
                    )}
                    {condObj.penalidades.testes && (
                        <Chip label={`Tes ${condObj.penalidades.testes}`} size="small"
                            sx={{ height: '16px', fontSize: '10px', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' }} />
                    )}
                    {condObj.penalidades.percepcao && (
                        <Chip label={`Per ${condObj.penalidades.percepcao}`} size="small"
                            sx={{ height: '16px', fontSize: '10px', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' }} />
                    )}
                </Box>
            )}

            {/* Detalhes expandidos */}
            <Collapse in={expanded} timeout="auto">
                <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid rgba(255,255,255,0.3)' }}>
                    <Typography variant="body2" sx={{ fontSize: '12px', opacity: 0.9 }}>
                        {condObj?.descricao || 'Sem descrição disponível.'}
                    </Typography>

                    {isAuto && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.7, fontStyle: 'italic' }}>
                            ⚡ Aplicada automaticamente por: {fonteAuto}
                        </Typography>
                    )}

                    {hasDano && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: '#FFD54F', fontWeight: 'bold' }}>
                            🔥 Dano Recorrente: {condObj.danoRecorrente.valor} ({condObj.danoRecorrente.tipo})
                            {condObj.danoRecorrente.momento === 'inicioTurno' ? ' no início do turno' : ' no fim do turno'}
                        </Typography>
                    )}

                    {condObj?.cura && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.8 }}>
                            💊 Cura: {condObj.cura}
                        </Typography>
                    )}

                    {/* Flags ativas */}
                    {condObj?.flags && Object.entries(condObj.flags).some(([, v]) => v) && (
                        <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', gap: 0.3 }}>
                            {condObj.flags.semAcoes && <Chip label="Sem Ações" size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: 'rgba(255,23,68,0.6)', color: 'white' }} />}
                            {condObj.flags.semReacoes && <Chip label="Sem Reações" size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: 'rgba(255,23,68,0.4)', color: 'white' }} />}
                            {condObj.flags.semMovimento && <Chip label="Sem Movimento" size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: 'rgba(255,23,68,0.4)', color: 'white' }} />}
                            {condObj.flags.desvantagemAtaques && <Chip label="Desv. Ataques" size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: 'rgba(255,152,0,0.5)', color: 'white' }} />}
                            {condObj.flags.vantagemContraAlvo && <Chip label="Vant. Contra" size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: 'rgba(255,152,0,0.5)', color: 'white' }} />}
                        </Box>
                    )}

                    {/* Controle de nível para condições empilháveis */}
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
                                inputProps={{ min: 0, max: 20 }}
                            />
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
        const cats = Object.entries(categoriasCondicoes).map(([catNome, catCondicoes]) => ({
            nome: catNome,
            icon: CATEGORIA_ICONS[catNome] || '📋',
            cor: CORES_CONDICOES[catNome] || '#756A34',
            condicoes: catCondicoes.filter(c =>
                !filtro || c.toLowerCase().includes(filtro.toLowerCase())
            ),
        }));
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
                    '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: '#f5f3eb' },
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
                                backgroundColor: isOpen ? cat.cor : '#f5f3eb',
                                color: isOpen ? 'white' : '#40150A',
                                borderRadius: 1.5,
                                transition: 'all 0.2s',
                                '&:hover': { backgroundColor: isOpen ? cat.cor : '#ebe8dd', transform: 'scale(1.005)' },
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
                                    const hasLevels = condObj.stackRegra === 'acumula';

                                    return (
                                        <Grid item xs={12} sm={6} md={4} key={condNome}>
                                            <Paper
                                                sx={{
                                                    p: 1.5,
                                                    backgroundColor: isActive ? condObj.cor : 'white',
                                                    color: isActive ? 'white' : '#40150A',
                                                    borderRadius: 2,
                                                    border: `2px solid ${isActive ? condObj.cor : '#756A3444'}`,
                                                    cursor: 'pointer',
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
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ fontSize: '11px', opacity: 0.8, mt: 0.5 }}>
                                                            {condObj.descricao?.substring(0, 80)}{condObj.descricao?.length > 80 ? '...' : ''}
                                                        </Typography>
                                                    </Box>
                                                    {hasLevels && (
                                                        <TextField
                                                            type="number" size="small"
                                                            value={condicoesAtivas[condNome] || ''}
                                                            onChange={(e) => onSetLevel(condNome, parseInt(e.target.value) || 0)}
                                                            onClick={(e) => e.stopPropagation()}
                                                            sx={{
                                                                width: '50px', ml: 1,
                                                                '& .MuiInputBase-input': {
                                                                    textAlign: 'center', padding: '4px',
                                                                    color: isActive ? 'white' : 'inherit',
                                                                },
                                                            }}
                                                            inputProps={{ min: 0, max: 20 }}
                                                            placeholder="Nv"
                                                        />
                                                    )}
                                                </Box>
                                                {/* Mini-info de penalidades */}
                                                {condObj.penalidades && (
                                                    <Box sx={{ display: 'flex', gap: 0.3, mt: 0.5, flexWrap: 'wrap' }}>
                                                        {Object.entries(condObj.penalidades).filter(([, v]) => v).map(([k, v]) => (
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
}) => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState(null);

    // ── Condições base do personagem ──
    const condicoesBase = character?.condicoes || {};

    // ── Condições automáticas (ex: Cego por escuridão) ──
    const condicoesAutomaticas = useMemo(() => {
        const auto = {};
        if (nivelLuz === 'escuridao' && !character?.visao_no_escuro) {
            auto['Cego'] = 'escuridão';
        }
        return auto;
    }, [nivelLuz, character?.visao_no_escuro]);

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
            newCondicoes[conditionName] = level;
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

    // ── Condições com dano recorrente ativas ──
    const danoRecorrenteAtivo = useMemo(() => {
        return Object.entries(condicoes)
            .map(([key]) => condicoesDisponiveis[key])
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
                title={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            ⚠️ Condições Ativas
                            <Badge
                                badgeContent={Object.keys(condicoes).length}
                                color="error"
                                sx={{ ml: 1 }}
                            >
                                <Box sx={{ width: 4 }} />
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
                {hasCondicoes && <PenaltySummary condicoesAtivas={condicoesEnriquecidas} />}

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
                            <Typography key={c.id} variant="caption" sx={{ display: 'block', color: '#BF360C' }}>
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
                    <Typography className="esteban" sx={{ textAlign: 'center', color: '#454E30', mb: showPicker ? 2 : 0 }}>
                        ✓ Nenhuma condição ativa
                    </Typography>
                )}

                {/* Picker de Condições */}
                {showPicker && (
                    <Box sx={{ mt: 2 }}>
                        <Divider sx={{ mb: 2 }} />
                        <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1 }}>
                            📋 Adicionar/Remover Condições
                        </Typography>
                        <Typography className="esteban" variant="body2" sx={{ color: '#5B1F0F', mb: 2, fontStyle: 'italic' }}>
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
