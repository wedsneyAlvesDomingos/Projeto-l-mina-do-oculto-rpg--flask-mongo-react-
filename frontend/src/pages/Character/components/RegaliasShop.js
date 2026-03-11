import React, { useState, useMemo, useCallback } from 'react';
import {
    Box, Card, CardHeader, CardContent, Grid, Paper, Typography,
    IconButton, Chip, Tooltip, Divider, Collapse, Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Accordion, AccordionSummary, AccordionDetails,
    LinearProgress, Alert, Badge,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import SchoolIcon from '@mui/icons-material/School';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import ScienceIcon from '@mui/icons-material/Science';

import {
    regaliasDeAprendiz,
    regaliasOpcionais,
    classesPrimarias,
    especializacoes,
    pontosRegaliaPorNivel,
    getRegaliaAprendiz,
    getClassePrimaria,
    getEspecializacao,
    validarPreRequisitosRegalia,
    getTiposRegaliasOpcionais,
} from '../../../data/constants';

/* ─────────────────────────────────────────────────────────
   Constantes de cor por tipo de regalia
   ───────────────────────────────────────────────────────── */
const CORES_TIPO = {
    aprendiz: '#454E30',
    opcional: '#6A1B9A',
    primaria: '#AB6422',
    especializacao: '#931C4A',
};

/* ─────────────────────────────────────────────────────────
   Subcomponente: Barra de pontos
   ───────────────────────────────────────────────────────── */
const PointsBar = ({ pontosTotal, pontosGastos }) => {
    const restantes = pontosTotal - pontosGastos;
    const porcentagem = pontosTotal > 0 ? (pontosGastos / pontosTotal) * 100 : 0;

    return (
        <Paper sx={{
            p: 2, mb: 2,
            background: 'linear-gradient(135deg, #162A22 0%, #40150A 100%)',
            borderRadius: 2, color: 'white',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                    ⭐ Pontos de Regalia
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip label={`Gastos: ${pontosGastos}`} size="small"
                        sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }} />
                    <Chip label={`Restantes: ${restantes}`} size="small"
                        sx={{
                            backgroundColor: restantes > 0 ? '#4CAF50' : '#f44336',
                            color: 'white', fontWeight: 'bold',
                        }} />
                    <Chip label={`Total: ${pontosTotal}`} size="small"
                        sx={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }} />
                </Box>
            </Box>
            <LinearProgress
                variant="determinate" value={Math.min(porcentagem, 100)}
                sx={{
                    height: 8, borderRadius: 4,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        background: porcentagem >= 100
                            ? 'linear-gradient(90deg, #f44336, #e91e63)'
                            : 'linear-gradient(90deg, #BB8130, #FFB74D)',
                    },
                }}
            />
        </Paper>
    );
};

/* ─────────────────────────────────────────────────────────
   Subcomponente: Card de regalia individual
   ───────────────────────────────────────────────────────── */
const RegaliaCard = ({ nome, descricao, custo, cor, owned, locked, lockMsg, onBuy, bonus, children }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Paper sx={{
            p: 2, borderRadius: 2,
            border: `2px solid ${owned ? cor : locked ? '#ccc' : cor + '66'}`,
            backgroundColor: owned ? cor + '12' : locked ? '#fafafa' : 'white',
            opacity: locked && !owned ? 0.7 : 1,
            transition: 'all 0.2s ease',
            '&:hover': { transform: locked ? 'none' : 'translateY(-2px)', boxShadow: locked ? 0 : 3 },
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                        {owned ? (
                            <CheckCircleIcon sx={{ fontSize: 18, color: cor }} />
                        ) : locked ? (
                            <LockIcon sx={{ fontSize: 18, color: '#999' }} />
                        ) : (
                            <LockOpenIcon sx={{ fontSize: 18, color: cor }} />
                        )}
                        <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '14px', color: owned ? cor : '#40150A' }}>
                            {nome}
                        </Typography>
                    </Box>
                    {custo !== undefined && (
                        <Chip label={`${custo} pt${custo !== 1 ? 's' : ''}`} size="small"
                            sx={{ height: '18px', fontSize: '10px', backgroundColor: cor + '22', color: cor, fontWeight: 'bold', mb: 0.5 }} />
                    )}
                </Box>

                {!owned && !locked && onBuy && (
                    <Button
                        variant="contained" size="small"
                        startIcon={<ShoppingCartIcon sx={{ fontSize: 14 }} />}
                        onClick={onBuy}
                        sx={{
                            backgroundColor: cor,
                            fontSize: '11px', textTransform: 'none',
                            '&:hover': { backgroundColor: cor, filter: 'brightness(1.15)' },
                        }}
                    >
                        Comprar
                    </Button>
                )}
                {locked && lockMsg && (
                    <Tooltip title={lockMsg} arrow>
                        <Chip label="Bloqueado" size="small" icon={<LockIcon sx={{ fontSize: 12 }} />}
                            sx={{ fontSize: '10px', height: '22px' }} />
                    </Tooltip>
                )}
            </Box>

            {/* Bônus resumidos */}
            {bonus && (
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                    {bonus.pv > 0 && <Chip label={`+${bonus.pv} PV`} size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: '#E53935', color: 'white' }} />}
                    {bonus.estamina > 0 && <Chip label={`+${bonus.estamina} Est`} size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: '#FFB300', color: '#40150A' }} />}
                    {bonus.magia > 0 && <Chip label={`+${bonus.magia} PM`} size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: '#1565C0', color: 'white' }} />}
                </Box>
            )}

            {/* Descrição expandível */}
            <Typography
                variant="body2"
                onClick={() => setExpanded(!expanded)}
                sx={{
                    mt: 0.5, fontSize: '12px', color: '#555',
                    cursor: 'pointer',
                    display: '-webkit-box',
                    WebkitLineClamp: expanded ? 'unset' : 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: expanded ? 'visible' : 'hidden',
                }}
            >
                {descricao}
            </Typography>

            {/* Conteúdo extra (árvores, habilidades, etc.) */}
            {expanded && children}
        </Paper>
    );
};

/* ─────────────────────────────────────────────────────────
   Subcomponente: Árvore de progressão de classe primária
   ───────────────────────────────────────────────────────── */
const ArvoreProgressao = ({ arvores, cor }) => {
    if (!arvores || arvores.length === 0) return null;

    return (
        <Box sx={{ mt: 1 }}>
            <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: cor, mb: 0.5, fontSize: '12px' }}>
                🌳 Árvores de Progressão
            </Typography>
            {arvores.map(arv => (
                <Accordion key={arv.id} sx={{ backgroundColor: '#fafaf5', mb: 0.5, '&:before': { display: 'none' } }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ minHeight: 36, '& .MuiAccordionSummary-content': { my: 0.5 } }}>
                        <Typography className="esteban" sx={{ fontSize: '12px', fontWeight: 'bold', color: cor }}>
                            {arv.nome} ({arv.niveis?.length || 0} níveis)
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0, pb: 1 }}>
                        {arv.niveis?.map((nv, i) => (
                            <Box key={i} sx={{
                                display: 'flex', alignItems: 'center', gap: 1, py: 0.3,
                                borderLeft: `3px solid ${cor}`, pl: 1, ml: 1, mb: 0.5,
                            }}>
                                <Chip label={`Nv ${nv.nivel}`} size="small"
                                    sx={{ height: '16px', fontSize: '9px', backgroundColor: cor + '22', color: cor, fontWeight: 'bold' }} />
                                <Typography variant="caption" sx={{ fontSize: '11px', color: '#555' }}>
                                    Custo: {nv.custo}pt
                                    {nv.bonusHabilidades && Object.keys(nv.bonusHabilidades).length > 0 &&
                                        ` • +${Object.entries(nv.bonusHabilidades).map(([k, v]) => `${v} ${k}`).join(', ')}`}
                                    {nv.habilidadeGanha && ` • 🎯 ${nv.habilidadeGanha.nome}`}
                                </Typography>
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

/* ═══════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL: RegaliasShop
   Interface de compra e visualização de regalias com validação
   ═══════════════════════════════════════════════════════════ */
const RegaliasShop = ({
    character,
    sectionStyle,
    cardHeaderStyle,
    onPurchase,   // callback(tipo, id, escolhas) para registrar compra
    readOnly = false,
}) => {
    const [secaoAberta, setSecaoAberta] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState(null);

    // ── Dados derivados ──
    const nivel = character?.nivel || 1;
    const pontosTotal = pontosRegaliaPorNivel(nivel);
    const pontosGastos = character?.pontosRegaliaGastos || 0;
    const pontosRestantes = pontosTotal - pontosGastos;
    const regaliasCompradas = character?.regaliasCompradas || {};
    const regaliasOpcCompradas = character?.regaliasOpcionais || [];

    // ── FichaState para validação ──
    const fichaState = useMemo(() => ({
        nivel,
        regaliasCompradas,
        pontosRegaliaGastos: pontosGastos,
    }), [nivel, regaliasCompradas, pontosGastos]);

    // ── Seções com contagens ──
    const secoes = useMemo(() => {
        const aprendizOwned = regaliasDeAprendiz.filter(r => regaliasCompradas[r.id]).length;
        const primariaOwned = classesPrimarias.filter(c => regaliasCompradas[c.id]).length;
        const especOwned = especializacoes.filter(e => regaliasCompradas[e.id]).length;
        const opcOwned = regaliasOpcCompradas.length;

        return [
            {
                id: 'aprendiz', label: 'Regalias de Aprendiz', icon: <SchoolIcon />,
                cor: CORES_TIPO.aprendiz, total: regaliasDeAprendiz.length, owned: aprendizOwned,
            },
            {
                id: 'opcional', label: 'Regalias Opcionais', icon: <ScienceIcon />,
                cor: CORES_TIPO.opcional, total: regaliasOpcionais.regalias_opcionais?.length || 0, owned: opcOwned,
            },
            {
                id: 'primaria', label: 'Classes Primárias', icon: <MilitaryTechIcon />,
                cor: CORES_TIPO.primaria, total: classesPrimarias.length, owned: primariaOwned,
            },
            {
                id: 'especializacao', label: 'Especializações', icon: <AutoAwesomeIcon />,
                cor: CORES_TIPO.especializacao, total: especializacoes.length, owned: especOwned,
            },
        ];
    }, [regaliasCompradas, regaliasOpcCompradas]);

    // ── Comprar regalia ──
    const handleBuy = useCallback((tipo, id, extra = {}) => {
        if (readOnly) return;
        setConfirmDialog({ tipo, id, extra });
    }, [readOnly]);

    const confirmBuy = useCallback(() => {
        if (confirmDialog && onPurchase) {
            onPurchase(confirmDialog.tipo, confirmDialog.id, confirmDialog.extra);
        }
        setConfirmDialog(null);
    }, [confirmDialog, onPurchase]);

    if (!character) return null;

    return (
        <Card sx={{ ...sectionStyle, mt: 2 }}>
            <CardHeader
                sx={{
                    ...cardHeaderStyle,
                    background: 'linear-gradient(135deg, #BB8130 0%, #AB6422 50%, #756A34 100%)',
                }}
                title={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            🛒 Loja de Regalias
                        </Typography>
                        <Chip
                            label={`${pontosRestantes} pts disponíveis`}
                            sx={{
                                backgroundColor: pontosRestantes > 0 ? 'rgba(76,175,80,0.8)' : 'rgba(244,67,54,0.8)',
                                color: 'white', fontWeight: 'bold', fontSize: '12px',
                            }}
                        />
                    </Box>
                }
            />
            <CardContent>
                {/* Barra de pontos */}
                <PointsBar pontosTotal={pontosTotal} pontosGastos={pontosGastos} />

                {/* Alerta de nível */}
                {nivel < 3 && (
                    <Alert severity="info" sx={{ mb: 2, fontSize: '12px' }}>
                        Classes Primárias e Especializações ficam disponíveis a partir do nível 3.
                    </Alert>
                )}

                {/* Seções */}
                {secoes.map(secao => {
                    const isOpen = secaoAberta === secao.id;
                    return (
                        <Box key={secao.id} sx={{ mb: 1.5 }}>
                            <Paper
                                sx={{
                                    p: 1.5, cursor: 'pointer',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    backgroundColor: isOpen ? secao.cor : '#f5f3eb',
                                    color: isOpen ? 'white' : '#40150A',
                                    borderRadius: 2,
                                    transition: 'all 0.2s',
                                    '&:hover': { backgroundColor: isOpen ? secao.cor : '#ebe8dd' },
                                }}
                                onClick={() => setSecaoAberta(isOpen ? null : secao.id)}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {secao.icon}
                                    <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                                        {secao.label}
                                    </Typography>
                                    <Chip
                                        label={`${secao.owned}/${secao.total}`}
                                        size="small"
                                        sx={{
                                            height: '20px', fontSize: '11px',
                                            backgroundColor: isOpen ? 'rgba(255,255,255,0.3)' : secao.cor + '22',
                                            color: isOpen ? 'white' : secao.cor,
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </Box>
                                <ExpandMoreIcon sx={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                            </Paper>

                            <Collapse in={isOpen} timeout="auto">
                                <Box sx={{ p: 1.5 }}>
                                    {/* ── Regalias de Aprendiz ── */}
                                    {secao.id === 'aprendiz' && (
                                        <Grid container spacing={1.5}>
                                            {regaliasDeAprendiz.map(reg => {
                                                const owned = !!regaliasCompradas[reg.id];
                                                const validation = validarPreRequisitosRegalia(fichaState, reg.id);
                                                return (
                                                    <Grid item xs={12} md={6} key={reg.id}>
                                                        <RegaliaCard
                                                            nome={reg.nome}
                                                            descricao={reg.descricao?.substring(0, 200) || ''}
                                                            custo={1}
                                                            cor={CORES_TIPO.aprendiz}
                                                            owned={owned}
                                                            locked={!validation.valido && !owned}
                                                            lockMsg={validation.mensagem}
                                                            onBuy={!readOnly ? () => handleBuy('aprendiz', reg.id) : null}
                                                            bonus={reg.bonusPorRegalia}
                                                        >
                                                            {/* Proficiências ganhas */}
                                                            {reg.proficienciasGanhas?.length > 0 && (
                                                                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.3 }}>
                                                                    <Typography variant="caption" sx={{ width: '100%', fontWeight: 'bold', color: '#40150A' }}>
                                                                        Proficiências:
                                                                    </Typography>
                                                                    {reg.proficienciasGanhas.map(p => (
                                                                        <Chip key={p} label={p} size="small"
                                                                            sx={{ height: '16px', fontSize: '9px', backgroundColor: '#e8f5e9', color: '#2E7D32' }} />
                                                                    ))}
                                                                </Box>
                                                            )}
                                                            {/* Habilidades ganhas */}
                                                            {reg.habilidadesGanhas?.length > 0 && (
                                                                <Box sx={{ mt: 0.5 }}>
                                                                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#40150A' }}>
                                                                        Habilidades:
                                                                    </Typography>
                                                                    {reg.habilidadesGanhas.map(h => (
                                                                        <Typography key={h.nome} variant="caption" sx={{ display: 'block', ml: 1, fontSize: '10px', color: '#555' }}>
                                                                            🎯 {h.nome} — {h.efeito?.substring(0, 80)}...
                                                                        </Typography>
                                                                    ))}
                                                                </Box>
                                                            )}
                                                        </RegaliaCard>
                                                    </Grid>
                                                );
                                            })}
                                        </Grid>
                                    )}

                                    {/* ── Regalias Opcionais ── */}
                                    {secao.id === 'opcional' && (
                                        <Grid container spacing={1.5}>
                                            {(regaliasOpcionais.regalias_opcionais || []).map(reg => {
                                                const owned = regaliasOpcCompradas.some(r =>
                                                    r.tipo === reg.tipo || r === reg.tipo
                                                );
                                                return (
                                                    <Grid item xs={12} key={reg.tipo}>
                                                        <RegaliaCard
                                                            nome={reg.tipo}
                                                            descricao={reg.descricao}
                                                            custo={reg.custo}
                                                            cor={CORES_TIPO.opcional}
                                                            owned={owned}
                                                            locked={pontosRestantes < reg.custo && !owned}
                                                            lockMsg={`Necessário ${reg.custo} pontos de regalia`}
                                                        >
                                                            {/* Opções dentro do tipo */}
                                                            {reg.opcoes && (
                                                                <Box sx={{ mt: 1 }}>
                                                                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#40150A' }}>
                                                                        Opções disponíveis:
                                                                    </Typography>
                                                                    <Grid container spacing={0.5} sx={{ mt: 0.5 }}>
                                                                        {reg.opcoes.map(opc => (
                                                                            <Grid item xs={12} sm={6} key={opc.nome}>
                                                                                <Paper sx={{
                                                                                    p: 1, backgroundColor: '#f9f7f2', borderRadius: 1,
                                                                                    border: '1px solid #ddd',
                                                                                }}>
                                                                                    <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '11px' }}>
                                                                                        {opc.nome}
                                                                                    </Typography>
                                                                                    <Typography variant="caption" sx={{ display: 'block', fontSize: '10px', color: '#666' }}>
                                                                                        {opc.descricao?.substring(0, 100)}{opc.descricao?.length > 100 ? '...' : ''}
                                                                                    </Typography>
                                                                                    {!owned && !readOnly && pontosRestantes >= reg.custo && (
                                                                                        <Button
                                                                                            size="small" variant="outlined"
                                                                                            onClick={() => handleBuy('opcional', reg.tipo, { opcao: opc.nome })}
                                                                                            sx={{
                                                                                                mt: 0.5, fontSize: '10px', textTransform: 'none',
                                                                                                borderColor: CORES_TIPO.opcional, color: CORES_TIPO.opcional,
                                                                                            }}
                                                                                        >
                                                                                            Escolher
                                                                                        </Button>
                                                                                    )}
                                                                                </Paper>
                                                                            </Grid>
                                                                        ))}
                                                                    </Grid>
                                                                </Box>
                                                            )}
                                                            {reg.observacao && (
                                                                <Alert severity="warning" sx={{ mt: 1, fontSize: '11px', py: 0 }}>
                                                                    {reg.observacao}
                                                                </Alert>
                                                            )}
                                                        </RegaliaCard>
                                                    </Grid>
                                                );
                                            })}
                                        </Grid>
                                    )}

                                    {/* ── Classes Primárias ── */}
                                    {secao.id === 'primaria' && (
                                        <Grid container spacing={1.5}>
                                            {classesPrimarias.map(classe => {
                                                const owned = !!regaliasCompradas[classe.id];
                                                const validation = validarPreRequisitosRegalia(fichaState, classe.id);
                                                return (
                                                    <Grid item xs={12} key={classe.id}>
                                                        <RegaliaCard
                                                            nome={classe.nome}
                                                            descricao={classe.habilidadeClasse?.descricao || ''}
                                                            custo={1}
                                                            cor={CORES_TIPO.primaria}
                                                            owned={owned}
                                                            locked={!validation.valido && !owned}
                                                            lockMsg={validation.mensagem}
                                                            onBuy={!readOnly ? () => handleBuy('primaria', classe.id) : null}
                                                            bonus={classe.bonusPorRegalia}
                                                        >
                                                            {/* Pré-requisitos */}
                                                            <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                                                <Chip
                                                                    label={`Nível mín: ${classe.preRequisitos?.nivelMinimo || '?'}`}
                                                                    size="small"
                                                                    sx={{
                                                                        height: '18px', fontSize: '10px',
                                                                        backgroundColor: nivel >= (classe.preRequisitos?.nivelMinimo || 0) ? '#e8f5e9' : '#ffebee',
                                                                        color: nivel >= (classe.preRequisitos?.nivelMinimo || 0) ? '#2E7D32' : '#C62828',
                                                                    }}
                                                                />
                                                                {classe.preRequisitos?.regaliaAprendiz && (
                                                                    <Chip
                                                                        label={`Req: ${classe.preRequisitos.regaliaAprendiz}`}
                                                                        size="small"
                                                                        sx={{
                                                                            height: '18px', fontSize: '10px',
                                                                            backgroundColor: regaliasCompradas[classe.preRequisitos.regaliaAprendiz] ? '#e8f5e9' : '#ffebee',
                                                                            color: regaliasCompradas[classe.preRequisitos.regaliaAprendiz] ? '#2E7D32' : '#C62828',
                                                                        }}
                                                                    />
                                                                )}
                                                            </Box>

                                                            {/* Árvores de progressão */}
                                                            <ArvoreProgressao arvores={classe.arvoresRegalia} cor={CORES_TIPO.primaria} />

                                                            {/* Regalias avulsas */}
                                                            {classe.regaliasAvulsas?.length > 0 && (
                                                                <Box sx={{ mt: 1 }}>
                                                                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: CORES_TIPO.primaria }}>
                                                                        Regalias Avulsas:
                                                                    </Typography>
                                                                    {classe.regaliasAvulsas.map(ra => (
                                                                        <Typography key={ra.id} variant="caption" sx={{ display: 'block', ml: 1, fontSize: '10px', color: '#555' }}>
                                                                            • {ra.nome} ({ra.custo}pt) — {ra.descricao?.substring(0, 60)}...
                                                                        </Typography>
                                                                    ))}
                                                                </Box>
                                                            )}
                                                        </RegaliaCard>
                                                    </Grid>
                                                );
                                            })}
                                        </Grid>
                                    )}

                                    {/* ── Especializações ── */}
                                    {secao.id === 'especializacao' && (
                                        <Grid container spacing={1.5}>
                                            {especializacoes.map(esp => {
                                                const owned = !!regaliasCompradas[esp.id];
                                                const validation = validarPreRequisitosRegalia(fichaState, esp.id);
                                                return (
                                                    <Grid item xs={12} key={esp.id}>
                                                        <RegaliaCard
                                                            nome={esp.nome}
                                                            descricao={esp.habilidadeClasse?.descricao || esp.descricao || ''}
                                                            custo={1}
                                                            cor={CORES_TIPO.especializacao}
                                                            owned={owned}
                                                            locked={!validation.valido && !owned}
                                                            lockMsg={validation.mensagem}
                                                            onBuy={!readOnly ? () => handleBuy('especializacao', esp.id) : null}
                                                            bonus={esp.bonusPorRegalia}
                                                        >
                                                            {/* Pré-requisitos de regalias primárias */}
                                                            {esp.preRequisitos?.regaliasPrimarias && (
                                                                <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                                                    {Object.entries(esp.preRequisitos.regaliasPrimarias).map(([classId, qtd]) => (
                                                                        <Chip
                                                                            key={classId}
                                                                            label={`${classId}: ${regaliasCompradas[classId] || 0}/${qtd}`}
                                                                            size="small"
                                                                            sx={{
                                                                                height: '18px', fontSize: '10px',
                                                                                backgroundColor: (regaliasCompradas[classId] || 0) >= qtd ? '#e8f5e9' : '#ffebee',
                                                                                color: (regaliasCompradas[classId] || 0) >= qtd ? '#2E7D32' : '#C62828',
                                                                            }}
                                                                        />
                                                                    ))}
                                                                </Box>
                                                            )}

                                                            {/* Árvores de progressão */}
                                                            <ArvoreProgressao arvores={esp.arvoresRegalia} cor={CORES_TIPO.especializacao} />
                                                        </RegaliaCard>
                                                    </Grid>
                                                );
                                            })}
                                        </Grid>
                                    )}
                                </Box>
                            </Collapse>
                        </Box>
                    );
                })}
            </CardContent>

            {/* Dialog de confirmação */}
            <Dialog open={!!confirmDialog} onClose={() => setConfirmDialog(null)} maxWidth="xs" fullWidth>
                <DialogTitle className="esteban" sx={{ color: '#40150A' }}>
                    Confirmar Compra
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2">
                        Deseja comprar esta regalia? Esta ação consumirá pontos de regalia.
                    </Typography>
                    {confirmDialog && (
                        <Alert severity="info" sx={{ mt: 1, fontSize: '12px' }}>
                            Tipo: <strong>{confirmDialog.tipo}</strong> • ID: <strong>{confirmDialog.id}</strong>
                            {confirmDialog.extra?.opcao && <> • Opção: <strong>{confirmDialog.extra.opcao}</strong></>}
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialog(null)} sx={{ color: '#756A34' }}>
                        Cancelar
                    </Button>
                    <Button variant="contained" onClick={confirmBuy}
                        sx={{ backgroundColor: '#BB8130', '&:hover': { backgroundColor: '#AB6422' } }}>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default RegaliasShop;
