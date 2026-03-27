import React, { useState, useMemo, useCallback } from 'react';
import {
    Box, Grid, Paper, Typography,
    Chip, Tooltip, Collapse, Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Accordion, AccordionSummary, AccordionDetails,
    LinearProgress, Alert,
} from '@mui/material';
import { colors, derived, gradients } from '../../../componentes/themes/tokens';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import ScienceIcon from '@mui/icons-material/Science';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PersonIcon from '@mui/icons-material/Person';

import {
    regaliasDeAprendiz,
    regaliasOpcionais,
    classesPrimarias,
    especializacoes,
    calcularPontosRegaliaTotal,
    validarPreRequisitosRegalia,
    especies,
    profissoes,
} from '../../../data/constants';
import WorkIcon from '@mui/icons-material/Work';

/* ─── Constantes de cor — derivadas do design token do tema escuro ─── */
const CORES_TIPO = {
    aprendiz:       colors.forest,
    especie:        colors.gold,
    opcional:       colors.olive,
    primaria:       colors.bronze,
    especializacao: colors.garnet,
    profissao:      '#8B6914',
};

/* ─── Labels legíveis para habilidades ─── */
const HABILIDADE_LABELS = {
    combateCorpoACorpo: 'Combate Corpo a Corpo',
    combateADistancia: 'Combate a Distância',
    combateArcano: 'Combate Arcano',
    forca: 'Força', destreza: 'Destreza', agilidade: 'Agilidade',
    fortitude: 'Fortitude', percepcao: 'Percepção', furtividade: 'Furtividade',
    intuicao: 'Intuição', persuasao: 'Persuasão', seducao: 'Sedução',
    enganacao: 'Enganação', performance: 'Performance',
    arcanismo: 'Arcanismo', ocultismo: 'Ocultismo', ritualismo: 'Ritualismo',
    teologia: 'Teologia', medicina: 'Medicina', natureza: 'Natureza',
    tecnologia: 'Tecnologia', arcanatec: 'Arcanatec', alquimia: 'Alquimia',
    atletismo: 'Atletismo', intimidacao: 'Intimidação', sobrevivencia: 'Sobrevivência',
    acrobacia: 'Acrobacia', historia: 'História',
};
const labelHab = (key) => HABILIDADE_LABELS[key] || key;

/* ─── Helpers para chaves compostas ─── */
export const arvoreKey = (classeId, arvoreId, nivel) => `arvore:${classeId}:${arvoreId}:${nivel}`;
export const avulsaKey = (classeId, avulsaId) => `avulsa:${classeId}:${avulsaId}`;
export const espAvulsaKey = (espId, avulsaId) => `esp_avulsa:${espId}:${avulsaId}`;
export const profissaoKey = (profNome, habNome) => `profissao:${profNome}:${habNome}`;

export const calcularPontosGastos = (regaliasCompradas) =>
    Object.values(regaliasCompradas || {}).reduce((acc, v) => acc + (typeof v === 'number' ? v : 1), 0);

/* ─── Barra de pontos ─── */
const PointsBar = ({ pontosTotal, pontosGastos }) => {
    const restantes = pontosTotal - pontosGastos;
    const pct = pontosTotal > 0 ? (pontosGastos / pontosTotal) * 100 : 0;
    return (
        <Paper sx={{ p: { xs: 1, sm: 1.5 }, mb: 1.5, borderRadius: 2,    }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5, flexWrap: 'wrap', gap: 0.5 }}>
                <Typography  sx={{ fontWeight: 'bold', fontSize: { xs: '13px', sm: '14px' },    }}>⭐ Pontos de Regalia</Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    <Chip label={`Gastos: ${pontosGastos}`} size="small" sx={{ border:2,borderColor: colors.olive, fontWeight: 'bold', fontSize: { xs: '10px', sm: '11px' }, height: { xs: '22px', sm: '24px' } }} />
                    <Chip label={`Restantes: ${restantes}`} size="small" sx={{ border:2,borderColor: restantes > 0 ? colors.forest : colors.garnet, fontWeight: 'bold', fontSize: { xs: '10px', sm: '11px' }, height: { xs: '22px', sm: '24px' } }} />
                    <Chip label={`Total: ${pontosTotal}`} size="small" sx={{ border:2,borderColor: colors.midnight, fontSize: { xs: '10px', sm: '11px' }, height: { xs: '22px', sm: '24px' } }} />
                </Box>
            </Box>
            <LinearProgress variant="determinate" value={Math.min(pct, 100)} sx={{
                height: 8, borderRadius: 4, backgroundColor: `${colors.olive}33`,
                '& .MuiLinearProgress-bar': { borderRadius: 4, background: pct >= 100 ? `linear-gradient(90deg, ${colors.garnet}, ${colors.scarlet})` : `linear-gradient(90deg, ${colors.gold}, ${colors.bronze})` },
            }} />
        </Paper>
    );
};

/* ─── Card de regalia ─── */
const RegaliaCard = ({ nome, descricao, custo, cor, owned, locked, lockMsg, onBuy, bonus, autoIncluded, children }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <Paper sx={{
            p: { xs: 1, sm: 1.25 }, borderRadius: 2,
            border: `2px solid ${owned || autoIncluded ? cor : locked ? colors.olive + '44' : cor + '66'}`,
            backgroundColor: owned || autoIncluded ? cor + '18' : locked ? derived.bgDarkAlt : derived.bgDarkSurface,
            opacity: locked && !owned ? 0.6 : 1,
            transition: 'all 0.2s ease',
            '&:hover': { transform: locked ? 'none' : 'translateY(-2px)', boxShadow: locked ? 0 : 3 },
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: { xs: 'wrap', sm: 'nowrap' }, gap: { xs: 0.5, sm: 0 } }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5, flexWrap: 'wrap' }}>
                        {autoIncluded ? <CardGiftcardIcon sx={{ fontSize: { xs: 16, sm: 16 }, color: cor }} />
                            : owned ? <CheckCircleIcon sx={{ fontSize: { xs: 16, sm: 16 }, color: cor }} />
                            : locked ? <LockIcon sx={{ fontSize: { xs: 16, sm: 16 }, color: derived.textOnDarkMuted }} />
                            : <LockOpenIcon sx={{ fontSize: { xs: 16, sm: 16 }, color: cor }} />}
                        <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: { xs: '12px', sm: '13px' }, color: owned || autoIncluded ? cor : derived.textOnDark }}>
                            {nome}
                        </Typography>
                        {autoIncluded && <Chip label="Incluída" size="small" sx={{ height: '18px', fontSize: '9px', backgroundColor: colors.forest,    fontWeight: 'bold' }} />}
                    </Box>
                    {custo !== undefined && !autoIncluded && (
                        <Chip label={`${custo} pt${custo !== 1 ? 's' : ''}`} size="small"
                            sx={{ height: '18px', fontSize: '10px', backgroundColor: cor + '22', color: cor, fontWeight: 'bold', mb: 0.5 }} />
                    )}
                </Box>
                {!owned && !locked && !autoIncluded && onBuy && (
                    <Button variant="contained" size="small" startIcon={<ShoppingCartIcon sx={{ fontSize: 12 }} />} onClick={onBuy}
                        sx={{ backgroundColor: cor,    fontSize: { xs: '10px', sm: '10px' }, textTransform: 'none', py: 0.5, px: 1, minWidth: 'auto', '&:hover': { backgroundColor: cor, filter: 'brightness(1.25)' } }}>
                        Comprar
                    </Button>
                )}
                {locked && lockMsg && (
                    <Tooltip title={lockMsg} arrow>
                        <Chip label="Bloqueado" size="small" icon={<LockIcon sx={{ fontSize: 12 }} />} sx={{ fontSize: '10px', height: '22px' }} />
                    </Tooltip>
                )}
            </Box>
            {bonus && (
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                    {bonus.pv > 0 && <Chip label={`+${bonus.pv} PV`} size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: colors.garnet,    }} />}
                    {bonus.estamina > 0 && <Chip label={`+${bonus.estamina} Est`} size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: colors.gold,    }} />}
                    {bonus.magia > 0 && <Chip label={`+${bonus.magia} PM`} size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: colors.midnight,    }} />}
                </Box>
            )}
            <Typography variant="body2" onClick={() => setExpanded(!expanded)} sx={{
                mt: 0.5, fontSize: { xs: '11px', sm: '11px' }, color: derived.textOnDarkMuted, cursor: 'pointer',
                display: '-webkit-box', WebkitLineClamp: expanded ? 'unset' : 2, WebkitBoxOrient: 'vertical', overflow: expanded ? 'visible' : 'hidden',
            }}>
                {descricao}
            </Typography>
            {expanded && children}
        </Paper>
    );
};

/* ─── Item de nível de árvore comprável ─── */
const NivelArvoreItem = ({ nv, cor, owned, canBuy, prevOwned, onBuy, ordemLivre }) => {
    const locked = !owned && !ordemLivre && !prevOwned;
    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 0.75 }, py: 0.5,
            borderLeft: `3px solid ${owned ? cor : locked ? colors.olive + '44' : cor + '88'}`,
            pl: { xs: 1, sm: 1.5 }, ml: { xs: 0.5, sm: 1 }, mb: 0.5, backgroundColor: owned ? cor + '18' : 'transparent', borderRadius: '0 4px 4px 0',
        }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                    {owned ? <CheckCircleIcon sx={{ fontSize: 14, color: cor }} /> : locked ? <LockIcon sx={{ fontSize: 14, color: derived.textOnDarkMuted }} /> : <LockOpenIcon sx={{ fontSize: 14, color: cor }} />}
                    <Chip label={`Nível ${nv.nivel}`} size="small" sx={{ height: '18px', fontSize: '10px', backgroundColor: owned ? cor + '33' : cor + '15', color: cor, fontWeight: 'bold' }} />
                    <Chip label={`${nv.custo} pt${nv.custo !== 1 ? 's' : ''}`} size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: `${colors.olive}22`, color: derived.textOnDarkMuted }} />
                </Box>
                <Typography variant="caption" component="div" sx={{ fontSize: { xs: '10px', sm: '10px' }, color: derived.textOnDarkMuted, mt: 0.3, wordBreak: 'break-word' }}>
                    {nv.bonusHabilidades && Object.keys(nv.bonusHabilidades).length > 0 &&
                        Object.entries(nv.bonusHabilidades).map(([k, v]) => `+${v} ${labelHab(k)}`).join(', ')}
                    {nv.escolhasHabilidades?.map((e, i) =>
                        `${(i > 0 || Object.keys(nv.bonusHabilidades || {}).length > 0) ? ', ' : ''}+${e.pontos} ${e.grupo.map(g => labelHab(g)).join(' ou ')}`
                    ).join('')}
                    {nv.habilidadeGanha && <><br />🎯 <strong>{nv.habilidadeGanha.nome}</strong> — {nv.habilidadeGanha.descricao?.substring(0, 120) || nv.habilidadeGanha.tipo || ''}{nv.habilidadeGanha.descricao?.length > 120 ? '…' : ''}</>}
                    {nv.proficienciasGanhas?.length > 0 && <><br />🛡️ Proficiências: {nv.proficienciasGanhas.join(', ')}</>}
                </Typography>
            </Box>
            {!owned && canBuy && (ordemLivre || prevOwned) && onBuy && (
                <Button variant="outlined" size="small" onClick={onBuy} sx={{
                    fontSize: '10px', textTransform: 'none', minWidth: 'auto', whiteSpace: 'nowrap',
                    borderColor: cor, color: cor, '&:hover': { backgroundColor: cor + '22', borderColor: cor },
                }}>
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Comprar </Box>Nv {nv.nivel}
                </Button>
            )}
        </Box>
    );
};

/* ═══════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL: RegaliasShop
   ═══════════════════════════════════════════════════════════ */
const RegaliasShop = ({ character, onPurchase, readOnly = false }) => {
    const [secaoAberta, setSecaoAberta] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState(null);

    const nivel = character?.nivel || 1;
    const regaliasCompradas = character?.regaliasCompradas || {};
    const regaliasOpcCompradas = character?.regaliasOpcionais || [];

    // ── Dados de espécie e regalias extras purchasáveis
    const especieKey = character?.especie || 'humano';
    const especieData = especies[especieKey] || null;
    const extrasEspecie = especieData?.regalias || [];

    // Sub-raça ativa = escolha feita na criação (obrigatória)
    const activeSubracaNome = useMemo(() => {
        const obrigatoriaNames = (especieData?.obrigatorias || []).map(s => s.nome);
        for (const g of (character?.regalias_de_especie || [])) {
            if (g?.regalias?.length > 0 && obrigatoriaNames.includes(g.regalias[0])) return g.regalias[0];
        }
        return null;
    }, [character?.regalias_de_especie, especieData]);

    const pontosTotal = calcularPontosRegaliaTotal(nivel);

    const pontosGastos = useMemo(() => calcularPontosGastos(regaliasCompradas), [regaliasCompradas]);
    const pontosRestantes = pontosTotal - pontosGastos;

    // Bridge: inclui regalias de aprendiz da criação + classes para validação
    const regaliasCompradasComAprendiz = useMemo(() => {
        const merged = { ...regaliasCompradas };
        const aprendizCriacao = character?.regalias_de_aprendiz?.RegaliasDeAprendizSelecionada || {};
        Object.keys(aprendizCriacao).forEach(id => { if (!merged[id]) merged[id] = 1; });
        const regaliasClasse = character?.regalias_de_classe || {};
        Object.keys(regaliasClasse).forEach(id => { if (!merged[id]) merged[id] = 1; });
        return merged;
    }, [regaliasCompradas, character?.regalias_de_aprendiz, character?.regalias_de_classe]);

    // Contar total de regalias investidas numa classe (classe + árvores + avulsas)
    const contarRegaliasClasse = useCallback((classeId) => {
        let count = regaliasCompradasComAprendiz[classeId] ? 1 : 0;
        Object.keys(regaliasCompradas).forEach(k => {
            if (k.startsWith(`arvore:${classeId}:`) || k.startsWith(`avulsa:${classeId}:`)) count += 1;
        });
        return count;
    }, [regaliasCompradas, regaliasCompradasComAprendiz]);

    // FichaState para validação — usa contagem total por classe
    const fichaState = useMemo(() => {
        const compradas = { ...regaliasCompradasComAprendiz };
        classesPrimarias.forEach(c => {
            const total = contarRegaliasClasse(c.id);
            if (total > 0) compradas[c.id] = total;
        });
        return { nivel, regaliasCompradas: compradas, pontosRegaliaGastos: pontosGastos };
    }, [nivel, regaliasCompradasComAprendiz, pontosGastos, contarRegaliasClasse]);

    // Seções
    // Habilidades de profissão já compradas (de qualquer profissão)
    const profHabsCompradas = useMemo(() => {
        const result = {};
        Object.keys(regaliasCompradas).forEach(k => {
            if (k.startsWith('profissao:')) result[k] = regaliasCompradas[k];
        });
        // Inclui habilidades obtidas na criação
        (character?.regalias_de_profissao || []).forEach(regProf => {
            if (regProf?.nome && regProf?.habilidades) {
                const habs = Array.isArray(regProf.habilidades) ? regProf.habilidades : [regProf.habilidades];
                habs.forEach(h => { result[profissaoKey(regProf.nome, h)] = 1; });
            }
        });
        return result;
    }, [regaliasCompradas, character?.regalias_de_profissao]);

    const secoes = useMemo(() => {
        const aprendizOwned = regaliasDeAprendiz.filter(r => regaliasCompradasComAprendiz[r.id]).length;
        const primariaOwned = classesPrimarias.filter(c => regaliasCompradasComAprendiz[c.id]).length;
        const especOwned = especializacoes.filter(e => regaliasCompradasComAprendiz[e.id]).length;
        // Contar opções individuais de espécie variante
        const totalOpcoes = (regaliasOpcionais.regalias_opcionais || []).reduce((acc, r) => acc + (r.opcoes?.length || 0), 0);
        const ownedShopOpcoes = regaliasOpcCompradas.filter(r => r?.tipo && r?.opcao).length;
        const ownedCreationOpcoes = (character?.regalias_de_especie || []).reduce((acc, g) => acc + (g?.regalias?.length || 0), 0);
        // Profissão: total de habilidades (todas) e compradas
        const totalHabsProf = profissoes.reduce((acc, p) => acc + (p.habilidades?.length || 0), 0);
        const ownedHabsProf = Object.keys(profHabsCompradas).length;
        return [
            { id: 'aprendiz', label: 'Regalias de Aprendiz', icon: <SchoolIcon />, cor: CORES_TIPO.aprendiz, total: regaliasDeAprendiz.length, owned: aprendizOwned },
            { id: 'especie_subraca', label: `Regalias de Espécie${especieData ? ` — ${especieData.nome}` : ''}`, icon: <PersonIcon />, cor: CORES_TIPO.especie, total: extrasEspecie.length, owned: extrasEspecie.filter(e => !!regaliasCompradas[`especie_extra:${e.id}`]).length },
            { id: 'opcional', label: 'Regalias de Espécie Variante', icon: <ScienceIcon />, cor: CORES_TIPO.opcional, total: totalOpcoes, owned: ownedShopOpcoes + ownedCreationOpcoes },
            { id: 'profissao', label: 'Regalias de Profissão', icon: <WorkIcon />, cor: CORES_TIPO.profissao, total: totalHabsProf, owned: ownedHabsProf },
            { id: 'primaria', label: 'Classes Primárias', icon: <MilitaryTechIcon />, cor: CORES_TIPO.primaria, total: classesPrimarias.length, owned: primariaOwned },
            { id: 'especializacao', label: 'Especializações', icon: <AutoAwesomeIcon />, cor: CORES_TIPO.especializacao, total: especializacoes.length, owned: especOwned },
        ];
    }, [regaliasCompradas, regaliasCompradasComAprendiz, regaliasOpcCompradas, character?.regalias_de_especie, extrasEspecie, especieData, profHabsCompradas]);

    const handleBuy = useCallback((tipo, id, extra = {}) => { if (!readOnly) setConfirmDialog({ tipo, id, extra }); }, [readOnly]);
    const confirmBuy = useCallback(() => { if (confirmDialog && onPurchase) onPurchase(confirmDialog.tipo, confirmDialog.id, confirmDialog.extra); setConfirmDialog(null); }, [confirmDialog, onPurchase]);

    const getConfirmDesc = () => {
        if (!confirmDialog) return '';
        const { tipo, extra } = confirmDialog;
        const custo = extra?.custo || 1;
        if (tipo === 'arvore_nivel') return `Comprar ${extra?.arvoreNome || ''} Nível ${extra?.nivel || '?'} (${custo} pt${custo !== 1 ? 's' : ''})`;
        if (tipo === 'avulsa') return `Comprar ${extra?.nome || ''} (${custo} pt${custo !== 1 ? 's' : ''})`;
        if (tipo === 'esp_avulsa') return `Comprar ${extra?.nome || ''} (${custo} pt${custo !== 1 ? 's' : ''})`;        if (tipo === 'especie_extra') return `Comprar Regalia de Espécie: ${extra?.nome || ''} (${custo} pt${custo !== 1 ? 's' : ''})`;
        if (tipo === 'profissao_hab') return `Comprar habilidade de profissão: ${extra?.nome || ''} (${custo} pt${custo !== 1 ? 's' : ''})`;
        if (tipo === 'primaria') return `Entrar na classe (${custo} pt) — você ganha a habilidade de classe automaticamente`;
        return `Comprar regalia (${custo} pt${custo !== 1 ? 's' : ''})`;
    };

    if (!character) return null;

    return (
        <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
            <PointsBar pontosTotal={pontosTotal} pontosGastos={pontosGastos} />

            {nivel < 3 && <Alert severity="info" sx={{ mb: 1.5, fontSize: '11px', backgroundColor: `${colors.midnight}cc`, '& .MuiAlert-icon': { color: colors.gold } }}>Classes Primárias e Especializações ficam disponíveis a partir do nível 3.</Alert>}

            {secoes.map(secao => {
                const isOpen = secaoAberta === secao.id;
                return (
                    <Box key={secao.id} sx={{ mb: 1 }}>
                        <Paper sx={{
                            p: { xs: 0.75, sm: 1 }, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            borderRadius: 2, transition: 'all 0.2s'
                        }} onClick={() => setSecaoAberta(isOpen ? null : secao.id)}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, flexWrap: 'wrap', minWidth: 0 }}>
                                {secao.icon}
                                <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: { xs: '12px', sm: '13px' } }}>{secao.label}</Typography>
                                <Chip label={`${secao.owned}/${secao.total}`} size="small" sx={{
                                    height: '18px', fontSize: '10px',
                                    color: isOpen ? derived.textOnDark : secao.cor, fontWeight: 'bold',
                                }} />
                            </Box>
                            <ExpandMoreIcon sx={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                        </Paper>

                                        <Collapse in={isOpen} timeout="auto">
                            <Box sx={{ p: { xs: 0.5, sm: 0.75 } }}>

                                {/* ── Aprendiz ── */}
                                {secao.id === 'aprendiz' && (
                                    <Grid container spacing={1.5}>
                                        {regaliasDeAprendiz.map(reg => {
                                            const owned = !!regaliasCompradasComAprendiz[reg.id];
                                            const validation = validarPreRequisitosRegalia(fichaState, reg.id);
                                            return (
                                                <Grid item xs={12} md={6} key={reg.id}>
                                                    <RegaliaCard nome={reg.nome} descricao={reg.descricao?.substring(0, 200) || ''} custo={1}
                                                        cor={CORES_TIPO.aprendiz} owned={owned} locked={!validation.valido && !owned} lockMsg={validation.mensagem}
                                                        onBuy={!owned && pontosRestantes >= 1 ? () => handleBuy('aprendiz', reg.id, { custo: 1 }) : null}
                                                        bonus={reg.bonusPorRegalia}>
                                                        {reg.proficienciasGanhas?.length > 0 && (
                                                            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.3 }}>
                                                                <Typography variant="caption" sx={{ width: '100%', fontWeight: 'bold'}}>Proficiências:</Typography>
                                                                {reg.proficienciasGanhas.map(p => <Chip key={p} label={p} size="small" sx={{ height: '16px', fontSize: '9px' }} />)}
                                                            </Box>
                                                        )}
                                                        {reg.habilidadesGanhas?.length > 0 && (
                                                            <Box sx={{ mt: 0.5 }}>
                                                                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Habilidades:</Typography>
                                                                {reg.habilidadesGanhas.map(h => {
                                                                    const eStr = typeof h.efeito === 'string' ? h.efeito : h.efeito ? JSON.stringify(h.efeito) : '';
                                                                    return <Typography key={h.nome} variant="caption" sx={{ display: 'block', ml: 1, fontSize: '10px' }}>🎯 {h.nome}{eStr ? ` — ${eStr.substring(0, 80)}${eStr.length > 80 ? '...' : ''}` : ''}</Typography>;
                                                                })}
                                                            </Box>
                                                        )}
                                                    </RegaliaCard>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                )}

                                {/* ── Regalias de Espécie Extras ── */}
                                {secao.id === 'especie_subraca' && (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                        {/* Banner informativo com a sub-raça ativa (escolhida na criação) */}
                                        {especieData && (
                                            <Paper sx={{ p: { xs: 1, sm: 1.25 }, mb: 0.5, backgroundColor: CORES_TIPO.especie + '18', borderLeft: `4px solid ${CORES_TIPO.especie}`, borderRadius: '0 8px 8px 0' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                                    <PersonIcon sx={{ fontSize: 16, }} />
                                                    <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                                                        Sub-raça ativa:
                                                    </Typography>
                                                    <Chip
                                                        label={activeSubracaNome || 'Não definida'}
                                                        size="small"
                                                        sx={{ height: '20px', fontSize: '11px', backgroundColor: CORES_TIPO.especie + '33', color: CORES_TIPO.especie, fontWeight: 'bold' }}
                                                    />
                                                </Box>
                                                    <Typography variant="body2" sx={{ fontSize: { xs: '10px', sm: '10px' }, mt: 0.5 }}>
                                                    A sub-raça é escolhida na criação do personagem e não pode ser alterada aqui. Abaixo estão as Regalias extras de espécie que podem ser compradas com Pontos de Regalia.
                                                </Typography>
                                            </Paper>
                                        )}
                                        {extrasEspecie.length === 0 && (
                                            <Typography variant="body2" sx={{ textAlign: 'center', py: 2 }}>
                                                Nenhuma regalia extra disponível para esta espécie.
                                            </Typography>
                                        )}
                                        <Grid container spacing={1.5}>
                                            {extrasEspecie.map(extra => {
                                                const isOwned = !!regaliasCompradas[`especie_extra:${extra.id}`];
                                                const custo = extra.custo || 1;
                                                const canAfford = pontosRestantes >= custo;
                                                return (
                                                    <Grid item xs={12} md={6} key={extra.id}>
                                                        <RegaliaCard
                                                            nome={extra.nome}
                                                            descricao={extra.descricao}
                                                            custo={isOwned ? undefined : custo}
                                                            cor={CORES_TIPO.especie}
                                                            owned={isOwned}
                                                            locked={!isOwned && !canAfford}
                                                            lockMsg="Pontos insuficientes"
                                                            onBuy={!isOwned && canAfford && !readOnly
                                                                ? () => handleBuy('especie_extra', `especie_extra:${extra.id}`, {
                                                                    nome: extra.nome,
                                                                    especieNome: especieData?.nome || especieKey,
                                                                    custo,
                                                                })
                                                                : null}
                                                        />
                                                    </Grid>
                                                );
                                            })}
                                        </Grid>
                                    </Box>
                                )}

                                {/* ── Regalias de Espécie Variante ── */}
                                {secao.id === 'opcional' && (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                        {(regaliasOpcionais.regalias_opcionais || []).map(reg => {
                                            const tipoKey = reg.tipo;
                                            const isCreationOwned = (nomeOpcao) =>
                                                (character?.regalias_de_especie || []).some(g => g?.regalias?.includes(nomeOpcao));
                                            const isShopOwned = (nomeOpcao) =>
                                                regaliasOpcCompradas.some(r => r.tipo === tipoKey && r.opcao === nomeOpcao);
                                            const ownedCount = (reg.opcoes || []).filter(o => isCreationOwned(o.nome) || isShopOwned(o.nome)).length;

                                            return (
                                                <Box key={tipoKey}>
                                                    {/* Cabeçalho do tipo */}
                                                    <Paper sx={{ p: { xs: 1, sm: 1.25 }, mb: 1, backgroundColor: CORES_TIPO.opcional + '18', borderLeft: `4px solid ${CORES_TIPO.opcional}`, borderRadius: '0 8px 8px 0' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
                                                            <ScienceIcon sx={{ fontSize: 16, color: CORES_TIPO.opcional }} />
                                                            <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: { xs: '12px', sm: '13px' }, color: CORES_TIPO.opcional }}>{tipoKey}</Typography>
                                                            <Chip label={`${reg.custo} pts por opção`} size="small" sx={{ height: '18px', fontSize: '10px', backgroundColor: CORES_TIPO.opcional + '22', color: CORES_TIPO.opcional, fontWeight: 'bold' }} />
                                                            {ownedCount > 0 && <Chip label={`${ownedCount} possuída${ownedCount !== 1 ? 's' : ''}`} size="small" sx={{ height: '18px', fontSize: '10px', backgroundColor: colors.forest,    fontWeight: 'bold' }} />}
                                                        </Box>
                                                        <Typography variant="body2" sx={{ fontSize: '11px', color: derived.textOnDarkMuted }}>{reg.descricao}</Typography>
                                                        {reg.penalidade && (
                                                            <Alert severity="warning" sx={{ mt: 0.5, py: 0, fontSize: '11px', backgroundColor: `${colors.garnet}22`, color: colors.garnet, '& .MuiAlert-icon': { color: colors.garnet } }}>
                                                                ⚠️ {reg.penalidade}
                                                            </Alert>
                                                        )}
                                                        {reg.observacao && (
                                                            <Alert severity="info" sx={{ mt: 0.5, py: 0, fontSize: '11px', backgroundColor: `${colors.midnight}44`,    '& .MuiAlert-icon': { color: colors.gold } }}>
                                                                {reg.observacao}
                                                            </Alert>
                                                        )}
                                                    </Paper>

                                                    {/* Cards individuais de cada opção */}
                                                    <Grid container spacing={1.5}>
                                                        {(reg.opcoes || []).map(opc => {
                                                            const ownedCreation = isCreationOwned(opc.nome);
                                                            const ownedShop = isShopOwned(opc.nome);
                                                            const canAfford = pontosRestantes >= reg.custo;
                                                            const opcKey = `opcional:${tipoKey}:${opc.nome}`;
                                                            return (
                                                                <Grid item xs={12} sm={6} key={opc.nome}>
                                                                    <RegaliaCard
                                                                        nome={opc.nome}
                                                                        descricao={opc.descricao}
                                                                        custo={reg.custo}
                                                                        cor={CORES_TIPO.opcional}
                                                                        owned={ownedShop}
                                                                        autoIncluded={ownedCreation}
                                                                        locked={!canAfford && !ownedShop && !ownedCreation}
                                                                        lockMsg={`Necessário ${reg.custo} pontos`}
                                                                        onBuy={!ownedShop && !ownedCreation && canAfford && !readOnly
                                                                            ? () => handleBuy('opcional', opcKey, { tipo: tipoKey, opcao: opc.nome, custo: reg.custo })
                                                                            : null}
                                                                    />
                                                                </Grid>
                                                            );
                                                        })}
                                                    </Grid>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                )}

                                {/* ── Regalias de Profissão ── */}
                                {secao.id === 'profissao' && (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                        {profissoes.map((prof) => {
                                            const profOwned = Object.keys(profHabsCompradas).some(k => k.startsWith(`profissao:${prof.nome}:`));
                                            return (
                                            <Accordion key={prof.nome} defaultExpanded={profOwned}
                                                sx={{ backgroundColor: derived.bgDarkAlt, border: `1px solid ${CORES_TIPO.profissao}33`, '&:before': { display: 'none' }, borderRadius: '8px !important', overflow: 'hidden' }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: CORES_TIPO.profissao }} />}
                                                    sx={{ px: { xs: 1, sm: 1.5 }, '& .MuiAccordionSummary-content': { alignItems: 'center', gap: 0.5, flexWrap: 'wrap', minWidth: 0 } }}>
                                                    <WorkIcon sx={{ fontSize: 14, color: CORES_TIPO.profissao }} />
                                                    <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: { xs: '11px', sm: '12px' }, color: CORES_TIPO.profissao }}>
                                                        {prof.nome}
                                                    </Typography>
                                                    {prof.rendaPorDia > 0 && (
                                                        <Chip label={`💰 ${prof.rendaPorDia} M.O./dia`} size="small"
                                                            sx={{ height: '18px', fontSize: '10px', backgroundColor: CORES_TIPO.profissao + '22', color: CORES_TIPO.profissao, fontWeight: 'bold' }} />
                                                    )}
                                                    {prof.chanceDeRisco && (
                                                        <Chip label={`⚠️ ${prof.chanceDeRisco}`} size="small"
                                                            sx={{ height: '18px', fontSize: '10px', backgroundColor: `${colors.garnet}22`, color: colors.garnet, fontWeight: 'bold' }} />
                                                    )}
                                                    {profOwned && (
                                                        <Chip label="✓" size="small"
                                                            sx={{ height: '18px', fontSize: '10px', backgroundColor: `${colors.forest}44`, color: colors.forest, fontWeight: 'bold' }} />
                                                    )}
                                                </AccordionSummary>
                                                <AccordionDetails sx={{ pt: 0, px: { xs: 0.75, sm: 1.25 }, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                    {/* Descrição */}
                                                    <Typography variant="body2" sx={{ fontSize: { xs: '10px', sm: '10px' }, color: derived.textOnDarkMuted }}>
                                                        {prof.descricao}
                                                    </Typography>
                                                    {prof.beneficiosFixos?.length > 0 && (
                                                        <Box>
                                                            <Typography variant="caption" sx={{ fontWeight: 'bold',    fontSize: '10px' }}>Benefícios Fixos:</Typography>
                                                            {prof.beneficiosFixos.map((b, i) => (
                                                                <Typography key={i} variant="caption" sx={{ display: 'block', ml: 1, fontSize: '10px', color: derived.textOnDarkMuted }}>• {b}</Typography>
                                                            ))}
                                                        </Box>
                                                    )}

                                                    {/* Lista de habilidades/regalias */}
                                                    <Grid container spacing={1.5}>
                                                        {(prof.habilidades || []).map((hab) => {
                                                            const key = profissaoKey(prof.nome, hab.nome);
                                                            const isOwned = !!profHabsCompradas[key];
                                                            const custo = hab.custoRegalia || 1;
                                                            const canAfford = pontosRestantes >= custo;
                                                            return (
                                                                <Grid item xs={12} md={6} key={hab.nome}>
                                                                    <RegaliaCard
                                                                        nome={hab.nome}
                                                                        descricao={hab.descricao}
                                                                        custo={isOwned ? undefined : custo}
                                                                        cor={CORES_TIPO.profissao}
                                                                        owned={isOwned}
                                                                        locked={!isOwned && !canAfford}
                                                                        lockMsg="Pontos insuficientes"
                                                                        onBuy={!isOwned && canAfford && !readOnly
                                                                            ? () => handleBuy('profissao_hab', key, {
                                                                                profNome: prof.nome,
                                                                                habNome: hab.nome,
                                                                                nome: hab.nome,
                                                                                custo,
                                                                                habData: hab,
                                                                            })
                                                                            : null}
                                                                    >
                                                                        {hab.efeitos?.length > 0 && (
                                                                            <Box sx={{ mt: 0.5 }}>
                                                                                <Typography variant="caption" sx={{ fontWeight: 'bold',    fontSize: '10px' }}>Efeitos:</Typography>
                                                                                {hab.efeitos.map((ef, i) => (
                                                                                    <Typography key={i} variant="caption" sx={{ display: 'block', ml: 1, fontSize: '10px', color: derived.textOnDarkMuted }}>• {ef}</Typography>
                                                                                ))}
                                                                            </Box>
                                                                        )}
                                                                    </RegaliaCard>
                                                                </Grid>
                                                            );
                                                        })}
                                                    </Grid>

                                                    {/* Tabelas de sucesso/materiais se existirem */}
                                                    {prof.chanceDeSucesso?.length > 0 && (
                                                        <Paper sx={{ p: { xs: 0.75, sm: 1 }, backgroundColor: derived.bgDarkAlt, borderRadius: 2 }}>
                                                            <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: { xs: '10px', sm: '11px' }, color: CORES_TIPO.profissao, mb: 0.5 }}>📊 Chances de Sucesso</Typography>
                                                            {prof.chanceDeSucesso.map((cs, i) => (
                                                                <Typography key={i} variant="caption" sx={{ display: 'block', fontSize: '10px', color: derived.textOnDarkMuted }}>
                                                                    • {cs.produto || cs.acao || cs.tentativa}: {cs.chance} ({cs.dificuldadeRolagem || cs.rolagem})
                                                                </Typography>
                                                            ))}
                                                        </Paper>
                                                    )}
                                                    {prof.tiposDeDano?.length > 0 && (
                                                        <Paper sx={{ p: { xs: 0.75, sm: 1 }, backgroundColor: derived.bgDarkAlt, borderRadius: 2 }}>
                                                            <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: { xs: '10px', sm: '11px' }, color: CORES_TIPO.profissao, mb: 0.5 }}>🔥 Tipos de Dano Elemental</Typography>
                                                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                                                {prof.tiposDeDano.map(t => (
                                                                    <Chip key={t} label={t} size="small" sx={{ height: '18px', fontSize: '10px', backgroundColor: CORES_TIPO.profissao + '22', color: CORES_TIPO.profissao }} />
                                                                ))}
                                                            </Box>
                                                        </Paper>
                                                    )}
                                                    {prof.materiaisEspeciais?.length > 0 && (
                                                        <Paper sx={{ p: { xs: 0.75, sm: 1 }, backgroundColor: derived.bgDarkAlt, borderRadius: 2 }}>
                                                            <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: { xs: '10px', sm: '11px' }, color: CORES_TIPO.profissao, mb: 0.5 }}>🪨 Materiais Especiais</Typography>
                                                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                                                {prof.materiaisEspeciais.map(m => (
                                                                    <Chip key={m} label={m} size="small" sx={{ height: '18px', fontSize: '10px', backgroundColor: CORES_TIPO.profissao + '22', color: CORES_TIPO.profissao }} />
                                                                ))}
                                                            </Box>
                                                        </Paper>
                                                    )}
                                                    {/* Poções do Herbalista */}
                                                    {prof.pocoes?.length > 0 && (
                                                        <Accordion sx={{ backgroundColor: derived.bgDarkAlt, '&:before': { display: 'none' } }}>
                                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                                <Typography className="esteban" sx={{ fontSize: '12px', fontWeight: 'bold', color: CORES_TIPO.profissao }}>
                                                                    🧪 Poções ({prof.pocoes.length})
                                                                </Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails sx={{ pt: 0 }}>
                                                                {prof.pocoes.map((p, i) => (
                                                                    <Box key={i} sx={{ mb: 1, pl: 1, borderLeft: `2px solid ${CORES_TIPO.profissao}44` }}>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                                                                            <Typography variant="caption" sx={{ fontWeight: 'bold',    fontSize: '11px' }}>{p.nome}</Typography>
                                                                            <Chip label={p.custo} size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: CORES_TIPO.profissao + '22', color: CORES_TIPO.profissao }} />
                                                                            {p.magica && <Chip label="Mágica" size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: `${colors.midnight}44`,    }} />}
                                                                            {p.alquimia && <Chip label="Alquimia" size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: `${colors.forest}44`,    }} />}
                                                                        </Box>
                                                                        <Typography variant="caption" sx={{ fontSize: '10px', color: derived.textOnDarkMuted }}>{p.efeito} ({p.duracao})</Typography>
                                                                </Box>
                                                            ))}
                                                        </AccordionDetails>
                                                    </Accordion>
                                                )}
                                                    {/* Venenos do Herbalista */}
                                                    {(prof.venenos?.length > 0 || prof.plantas?.length > 0 || prof.monstros?.length > 0) && (
                                                        <Accordion sx={{ backgroundColor: derived.bgDarkAlt, '&:before': { display: 'none' } }}>
                                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                                <Typography className="esteban" sx={{ fontSize: '12px', fontWeight: 'bold', color: CORES_TIPO.profissao }}>
                                                                    ☠️ Venenos ({(prof.venenos?.length || 0) + (prof.plantas?.length || 0) + (prof.monstros?.length || 0)})
                                                                </Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails sx={{ pt: 0 }}>
                                                                {[
                                                                    { label: '🐍 Animais', items: prof.venenos },
                                                                    { label: '🌿 Plantas', items: prof.plantas },
                                                                    { label: '🐉 Monstros', items: prof.monstros },
                                                                ].filter(g => g.items?.length > 0).map(grupo => (
                                                                    <Box key={grupo.label} sx={{ mb: 1 }}>
                                                                        <Typography variant="caption" sx={{ fontWeight: 'bold',    fontSize: '11px' }}>{grupo.label}</Typography>
                                                                        {grupo.items.map((v, i) => (
                                                                            <Box key={i} sx={{ ml: 1, mb: 0.5, pl: 1, borderLeft: `2px solid ${colors.garnet}44` }}>
                                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                                                                                    <Typography variant="caption" sx={{ fontWeight: 'bold',    fontSize: '10px' }}>{v.nome}</Typography>
                                                                                    <Chip label={v.custo} size="small" sx={{ height: '16px', fontSize: '9px' }} />
                                                                                    {v.testeFortitude && <Chip label={`Fort ≥${v.testeFortitude}`} size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: `${colors.garnet}22`, color: colors.garnet }} />}
                                                                                </Box>
                                                                                <Typography variant="caption" sx={{ fontSize: '10px', color: derived.textOnDarkMuted }}>{v.efeito}</Typography>
                                                                            </Box>
                                                                        ))}
                                                                    </Box>
                                                                ))}
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    )}
                                                </AccordionDetails>
                                            </Accordion>
                                            );
                                        })}
                                    </Box>
                                )}

                                {/* ── Classes Primárias (compra progressiva) ── */}
                                {secao.id === 'primaria' && (
                                    <Grid container spacing={1.5}>
                                        {classesPrimarias.map(classe => {
                                            const classOwned = !!regaliasCompradasComAprendiz[classe.id];
                                            const validation = validarPreRequisitosRegalia(fichaState, classe.id);
                                            const totalInvestido = contarRegaliasClasse(classe.id);
                                            const cor = CORES_TIPO.primaria;

                                            return (
                                                <Grid item xs={12} key={classe.id}>
                                                    {/* Card da classe — 1 pt para entrar */}
                                                    <RegaliaCard
                                                        nome={classe.nome}
                                                        descricao={`Ao entrar nesta classe, você ganha automaticamente: ${classe.habilidadeClasse?.nome || 'habilidade de classe'}.`}
                                                        custo={1} cor={cor} owned={classOwned}
                                                        locked={!validation.valido && !classOwned} lockMsg={validation.mensagem}
                                                        onBuy={!classOwned && pontosRestantes >= 1 ? () => handleBuy('primaria', classe.id, { custo: 1 }) : null}
                                                        bonus={classe.bonusPorRegalia}>
                                                        <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                                            <Chip label={`Nível mín: ${classe.preRequisitos?.nivelMinimo || '?'}`} size="small" sx={{
                                                                height: '18px', fontSize: '10px', backgroundColor: `${colors.midnight}cc`, color: derived.textOnDarkMuted,
                                                            }} />
                                                            {classe.preRequisitos?.regaliaAprendiz && (
                                                                <Chip label={`Req: ${regaliasDeAprendiz.find(r => r.id === classe.preRequisitos.regaliaAprendiz)?.nome || classe.preRequisitos.regaliaAprendiz}`} size="small" sx={{
                                                                    height: '18px', fontSize: '10px', backgroundColor: `${colors.olive}33`, color: derived.textOnDarkMuted,
                                                                }} />
                                                            )}
                                                            {classOwned && (
                                                                <Chip label={`${totalInvestido} regalia${totalInvestido !== 1 ? 's' : ''} investida${totalInvestido !== 1 ? 's' : ''}`}
                                                                    size="small" sx={{ height: '18px', fontSize: '10px', backgroundColor: cor + '33', color: cor, fontWeight: 'bold' }} />
                                                            )}
                                                        </Box>
                                                    </RegaliaCard>

                                                    {/* Se comprou a classe → mostrar habilidade auto + árvores + avulsas */}
                                                    {classOwned && (
                                                        <Box sx={{ ml: { xs: 0.5, sm: 1 }, mt: 1, borderLeft: `3px solid ${cor}`, pl: { xs: 0.75, sm: 1.5 } }}>
                                                            {/* Habilidade automática (sem custo) */}
                                                            {classe.habilidadeClasse && (
                                                                <Paper sx={{ p: { xs: 1, sm: 1.25 }, mb: 1, border: `1px solid ${colors.forest}`, borderRadius: 2, backgroundColor: `${colors.moss}44` }}>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                                                                        <CardGiftcardIcon sx={{ fontSize: 14, color: colors.forest }} />
                                                                        <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: { xs: '11px', sm: '12px' }, color: colors.forest }}>
                                                                            {classe.habilidadeClasse.nome}
                                                                        </Typography>
                                                                        <Chip label="Automática — sem custo" size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: colors.forest,    }} />
                                                                    </Box>
                                                                    <Typography variant="body2" sx={{ fontSize: { xs: '10px', sm: '10px' }, color: derived.textOnDarkMuted }}>{classe.habilidadeClasse.descricao}</Typography>
                                                                    {classe.habilidadeClasse.subHabilidades?.map(sub => (
                                                                        <Box key={sub.nome} sx={{ ml: 1, mt: 0.5 }}>
                                                                            <Typography variant="caption" sx={{ fontWeight: 'bold', color: colors.forest, fontSize: { xs: '10px', sm: '10px' } }}>• {sub.nome} ({sub.tipo})</Typography>
                                                                            <Typography variant="caption" sx={{ display: 'block', ml: 1.5, fontSize: '9px', color: derived.textOnDarkMuted }}>{sub.descricao}</Typography>
                                                                        </Box>
                                                                    ))}
                                                                </Paper>
                                                            )}

                                                            {/* Árvores — comprável nível a nível */}
                                                            {classe.arvoresRegalia?.length > 0 && (
                                                                <Box sx={{ mb: 1 }}>
                                                                    <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: { xs: '11px', sm: '12px' },    mb: 0.5 }}>🌳 Árvores de Progressão</Typography>
                                                                    {classe.arvoresRegalia.map(arv => (
                                                                        <Accordion key={arv.id} sx={{ backgroundColor: derived.bgDarkAlt, mb: 0.5, '&:before': { display: 'none' } }}>
                                                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ minHeight: 32, '& .MuiAccordionSummary-content': { my: 0.25 } }}>
                                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                                                                                    <Typography className="esteban" sx={{ fontSize: { xs: '11px', sm: '11px' }, fontWeight: 'bold', color: cor }}>{arv.nome}</Typography>
                                                                                    <Chip label={`${arv.niveis?.filter((_, i) => regaliasCompradas[arvoreKey(classe.id, arv.id, i + 1)]).length || 0}/${arv.niveis?.length || 0}`}
                                                                                        size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: cor + '22', color: cor }} />
                                                                                </Box>
                                                                            </AccordionSummary>
                                                                            <AccordionDetails sx={{ pt: 0, pb: 1 }}>
                                                                                {arv.niveis?.map((nv) => {
                                                                                    const key = arvoreKey(classe.id, arv.id, nv.nivel);
                                                                                    const nivelOwned = !!regaliasCompradas[key];
                                                                                    const prevOwned = nv.nivel === 1 || !!regaliasCompradas[arvoreKey(classe.id, arv.id, nv.nivel - 1)];
                                                                                    const canBuy = pontosRestantes >= nv.custo;
                                                                                    return (
                                                                                        <NivelArvoreItem key={key} nv={nv} cor={cor} owned={nivelOwned} canBuy={canBuy} prevOwned={prevOwned} ordemLivre={!!arv.ordemLivre}
                                                                                            onBuy={() => handleBuy('arvore_nivel', key, { classeId: classe.id, arvoreId: arv.id, arvoreNome: arv.nome, nivel: nv.nivel, custo: nv.custo, nivelData: nv })} />
                                                                                    );
                                                                                })}
                                                                            </AccordionDetails>
                                                                        </Accordion>
                                                                    ))}
                                                                </Box>
                                                            )}

                                                            {/* Avulsas — compráveis individualmente */}
                                                            {classe.regaliasAvulsas?.length > 0 && (
                                                                <Box sx={{ mb: 1 }}>
                                                                    <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: { xs: '11px', sm: '12px' },    mb: 0.5 }}>⚔️ Regalias Avulsas</Typography>
                                                                    <Grid container spacing={0.75}>
                                                                        {classe.regaliasAvulsas.map(ra => {
                                                                            const key = avulsaKey(classe.id, ra.id);
                                                                            const raOwned = !!regaliasCompradas[key];
                                                                            const canBuy = pontosRestantes >= ra.custo;
                                                                            return (
                                                                                <Grid item xs={12} sm={6} key={ra.id}>
                                                                                    <RegaliaCard nome={ra.nome} descricao={ra.descricao || ''} custo={ra.custo} cor={cor}
                                                                                        owned={raOwned} locked={!canBuy && !raOwned} lockMsg={`Necessário ${ra.custo} pt${ra.custo !== 1 ? 's' : ''}`}
                                                                                        onBuy={!raOwned && canBuy ? () => handleBuy('avulsa', key, { classeId: classe.id, avulsaId: ra.id, nome: ra.nome, custo: ra.custo, avulsaData: ra }) : null} />
                                                                                </Grid>
                                                                            );
                                                                        })}
                                                                    </Grid>
                                                                </Box>
                                                            )}
                                                        </Box>
                                                    )}
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                )}

                                {/* ── Especializações ── */}
                                {secao.id === 'especializacao' && (
                                    <Grid container spacing={1.5}>
                                        {especializacoes.map(esp => {
                                            const owned = !!regaliasCompradasComAprendiz[esp.id];
                                            const validation = validarPreRequisitosRegalia(fichaState, esp.id);
                                            const cor = CORES_TIPO.especializacao;
                                            return (
                                                <Grid item xs={12} key={esp.id}>
                                                    <RegaliaCard nome={esp.nome} descricao={esp.regaliaObrigatoria?.habilidadeClasse?.descricao || esp.descricao || ''} custo={1}
                                                        cor={cor} owned={owned} locked={!validation.valido && !owned} lockMsg={validation.mensagem}
                                                        onBuy={!owned && pontosRestantes >= 1 ? () => handleBuy('especializacao', esp.id, { custo: 1 }) : null}
                                                        bonus={esp.bonusPorRegalia}>
                                                        {esp.preRequisitos?.regaliasPrimarias && (
                                                            <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                                                {Object.entries(esp.preRequisitos.regaliasPrimarias).map(([classId, qtd]) => {
                                                                    const investido = contarRegaliasClasse(classId);
                                                                    const classNome = classesPrimarias.find(c => c.id === classId)?.nome || classId;
                                                                    return (
                                                                        <Chip key={classId} label={`${classNome}: ${investido}/${qtd}`} size="small" sx={{
                                                                            height: '18px', fontSize: '10px',
                                                                            backgroundColor: investido >= qtd ? `${colors.forest}44` : `${colors.garnet}33`,
                                                                            color: investido >= qtd ? colors.forest : colors.garnet,
                                                                        }} />
                                                                    );
                                                                })}
                                                            </Box>
                                                        )}
                                                    </RegaliaCard>

                                                    {/* Se comprou a especialização → mostrar habilidade auto + avulsas */}
                                                    {owned && (
                                                        <Box sx={{ ml: { xs: 0.5, sm: 1 }, mt: 1, borderLeft: `3px solid ${cor}`, pl: { xs: 0.75, sm: 1.5 } }}>
                                                            {/* Habilidade obrigatória (sem custo extra) */}
                                                            {esp.regaliaObrigatoria?.habilidadeClasse && (
                                                                <Paper sx={{ p: { xs: 1, sm: 1.25 }, mb: 1, border: `1px solid ${colors.forest}`, borderRadius: 2, backgroundColor: `${colors.moss}44` }}>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                                                                        <CardGiftcardIcon sx={{ fontSize: 14, color: colors.forest }} />
                                                                        <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: { xs: '11px', sm: '12px' }, color: colors.forest }}>
                                                                            {esp.regaliaObrigatoria.habilidadeClasse.nome}
                                                                        </Typography>
                                                                        <Chip label="Automática — sem custo" size="small" sx={{ height: '16px', fontSize: '9px', backgroundColor: colors.forest,    }} />
                                                                    </Box>
                                                                    <Typography variant="body2" sx={{ fontSize: { xs: '10px', sm: '10px' }, color: derived.textOnDarkMuted }}>{esp.regaliaObrigatoria.habilidadeClasse.descricao}</Typography>
                                                                </Paper>
                                                            )}

                                                            {/* Avulsas — compráveis individualmente */}
                                                            {esp.regaliasAvulsas?.length > 0 && (
                                                                <Box sx={{ mb: 1 }}>
                                                                    <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: { xs: '11px', sm: '12px' },    mb: 0.5 }}>⚔️ Regalias de Especialização</Typography>
                                                                    <Grid container spacing={0.75}>
                                                                        {esp.regaliasAvulsas.map(ra => {
                                                                            const key = espAvulsaKey(esp.id, ra.id);
                                                                            const raOwned = !!regaliasCompradas[key];
                                                                            const canBuy = pontosRestantes >= ra.custo;
                                                                            return (
                                                                                <Grid item xs={12} sm={6} key={ra.id}>
                                                                                    <RegaliaCard nome={ra.nome} descricao={ra.descricao || ''} custo={ra.custo} cor={cor}
                                                                                        owned={raOwned} locked={!canBuy && !raOwned} lockMsg={`Necessário ${ra.custo} pt${ra.custo !== 1 ? 's' : ''}`}
                                                                                        onBuy={!raOwned && canBuy ? () => handleBuy('esp_avulsa', key, { espId: esp.id, avulsaId: ra.id, nome: ra.nome, custo: ra.custo, avulsaData: ra }) : null} />
                                                                                </Grid>
                                                                            );
                                                                        })}
                                                                    </Grid>
                                                                </Box>
                                                            )}
                                                        </Box>
                                                    )}
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

            {/* Dialog de confirmação */}
            <Dialog open={!!confirmDialog} onClose={() => setConfirmDialog(null)} maxWidth="xs" fullWidth>
                <DialogTitle className="esteban" sx={{  }}>Confirmar Compra</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{}}>{getConfirmDesc()}</Typography>
                    <Typography variant="body2" sx={{ mt: 1, }}>Pontos restantes após compra: <strong style={{  }}>{pontosRestantes - (confirmDialog?.extra?.custo || 1)}</strong></Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialog(null)} sx={{ color: colors.olive }}>Cancelar</Button>
                    <Button variant="contained" onClick={confirmBuy} sx={{ backgroundColor: colors.gold, '&:hover': { backgroundColor: colors.bronze } }}>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default RegaliasShop;
