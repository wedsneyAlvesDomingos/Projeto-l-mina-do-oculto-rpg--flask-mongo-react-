import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
    Card, CardHeader, CardContent, Box, Typography, Chip, Accordion,
    AccordionSummary, AccordionDetails, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, IconButton, Tabs, Tab, Paper, Snackbar, Alert,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import TimerIcon from '@mui/icons-material/Timer';
import CasinoIcon from '@mui/icons-material/Casino';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { EditableField } from './EditableField';
import {
    getRegaliaAprendiz, getOpcaoRegalia,
    getClassePrimaria, getEspecializacao, calcularPontosRegaliaTotal,
    classesPrimarias, especies,
} from '../../../data/constants';
import RegaliasShop, { calcularPontosGastos } from './RegaliasShop';

/* ── Constantes visuais para tipos de habilidade ── */
const TIPO_CONFIG = {
    ativa:   { label: 'Ativa',    color: '#E65100', bg: '#FFF3E0', border: '#FF9800' },
    passiva: { label: 'Passiva',  color: '#1565C0', bg: '#E3F2FD', border: '#42A5F5' },
    milagre: { label: 'Milagre',  color: '#F57F17', bg: '#FFFDE7', border: '#FFD54F' },
    magia:   { label: 'Magia',    color: '#6A1B9A', bg: '#F3E5F5', border: '#AB47BC' },
    feitico: { label: 'Feitiço',  color: '#283593', bg: '#E8EAF6', border: '#5C6BC0' },
    reacao:  { label: 'Reação',   color: '#00695C', bg: '#E0F2F1', border: '#26A69A' },
};

const HAB_LABELS = {
    combateCorpoACorpo: 'C. Corpo a Corpo', combateADistancia: 'C. a Distância',
    combateArcano: 'C. Arcano', forca: 'Força', destreza: 'Destreza',
    agilidade: 'Agilidade', fortitude: 'Fortitude', percepcao: 'Percepção',
    furtividade: 'Furtividade', intuicao: 'Intuição', persuasao: 'Persuasão',
    seducao: 'Sedução', enganacao: 'Enganação', performance: 'Performance',
    arcanismo: 'Arcanismo', ocultismo: 'Ocultismo', ritualismo: 'Ritualismo',
    teologia: 'Teologia', medicina: 'Medicina', natureza: 'Natureza',
    tecnologia: 'Tecnologia', arcanatec: 'Arcanatec', alquimia: 'Alquimia',
    atletismo: 'Atletismo', intimidacao: 'Intimidação', sobrevivencia: 'Sobrevivência',
    acrobacia: 'Acrobacia', historia: 'História', negociacao: 'Negociação',
    navegacao: 'Navegação', rastreamento: 'Rastreamento', investigacao: 'Investigação',
    jurisprudencia: 'Jurisprudência',
};

const PROF_LABELS = {
    armas_marciais: 'Armas Marciais', armaduras_leves: 'Armaduras Leves',
    armaduras_medias: 'Armaduras Médias', escudo_simples: 'Escudo Simples',
    kit_arrombamento: 'Ferramentas de Ladrão',
};

const formatCustoAcoes = (v) => {
    if (v === null || v === undefined) return null;
    if (v === 0) return 'Livre';
    if (v === 1) return '1 Ação';
    if (v === 2) return '2 Ações';
    if (v === 3) return 'Turno Completo';
    return `${v} Ações`;
};

/* ── Utilitários de dados ── */
/** Rola NdS+mod, retorna string "total [d1+d2+...]" */
const rollDice = (expr) => {
    if (expr == null) return '0';
    if (typeof expr === 'number') return String(expr);
    const str = String(expr).trim();
    const match = str.match(/^(\d+)d(\d+)([+-]\d+)?$/i);
    if (!match) return String(parseInt(str) || 0);
    const count = parseInt(match[1]);
    const sides = parseInt(match[2]);
    const mod = match[3] ? parseInt(match[3]) : 0;
    let total = mod;
    const rolls = [];
    for (let i = 0; i < count; i++) {
        const r = Math.floor(Math.random() * sides) + 1;
        total += r;
        rolls.push(r);
    }
    return count > 1 ? `${total} [${rolls.join('+')}]` : String(total);
};

/** Retorna apenas o número total */
const rollDiceTotal = (expr) => {
    if (expr == null) return 0;
    if (typeof expr === 'number') return expr;
    const str = String(expr).trim();
    const match = str.match(/^(\d+)d(\d+)([+-]\d+)?$/i);
    if (!match) return parseInt(str) || 0;
    const count = parseInt(match[1]);
    const sides = parseInt(match[2]);
    const mod = match[3] ? parseInt(match[3]) : 0;
    let total = mod;
    for (let i = 0; i < count; i++) total += Math.floor(Math.random() * sides) + 1;
    return total;
};

/** Resolve elemento aleatorio com 1d6 */
const resolveElemento = (tipoDano, tabelaElemento) => {
    if (!tipoDano) return null;
    if (tipoDano !== 'elemental_aleatorio') {
        return tipoDano.charAt(0).toUpperCase() + tipoDano.slice(1);
    }
    const NOMES = { 1: 'Fogo', 2: 'Gelo', 3: 'Terra', 4: 'Ar', 5: 'Raio', 6: 'Escolha' };
    const roll = Math.floor(Math.random() * 6) + 1;
    const elem = tabelaElemento?.[roll];
    return `${elem === 'escolha' ? 'Escolha do jogador' : (NOMES[roll] || elem || tipoDano)} (🎲${roll})`;
};

/** Computa uma expressão de dado e retorna { total, breakdown, sides } */
const computeDice = (expr) => {
    if (expr == null) return { total: 0, breakdown: null, sides: null };
    const str = String(expr).trim();
    const match = str.match(/^(\d+)d(\d+)([+-]\d+)?$/i);
    if (!match) {
        const v = parseInt(str) || 0;
        return { total: v, breakdown: null, sides: null };
    }
    const count = parseInt(match[1]);
    const sides = parseInt(match[2]);
    const mod = match[3] ? parseInt(match[3]) : 0;
    let total = mod;
    const breakdown = [];
    for (let i = 0; i < count; i++) {
        const r = Math.floor(Math.random() * sides) + 1;
        total += r;
        breakdown.push(r);
    }
    return { total, breakdown: breakdown.length > 1 ? breakdown : null, sides };
};

/* ─────────────────────────────────────────────────────────────
   DiceRollOverlay — overlay animado de rolagem de dados
   rollEntries: Array<{ label, display, final, sides, breakdown, tipo, extra }>
───────────────────────────────────────────────────────────── */
const OVERLAY_TIPO = {
    cura:     { color: '#43A047', emoji: '❤️' },
    cura_pe:  { color: '#1E88E5', emoji: '⚡' },
    dano:     { color: '#E53935', emoji: '💥' },
    chance:   { color: '#AB47BC', emoji: '🎲' },
    desconto: { color: '#FB8C00', emoji: '🪙' },
};

const DiceRollOverlay = React.memo(({ open, habNome, habTipo, rollEntries, onClose }) => {
    const [phase, setPhase] = React.useState(0); // 0=rolando, 1=revelado
    const [shuffled, setShuffled] = React.useState([]);
    const tipoConf = TIPO_CONFIG[habTipo] || TIPO_CONFIG.ativa;
    const hasDice = rollEntries?.some(e => e.sides != null && e.sides > 1);

    React.useEffect(() => {
        if (!open || !rollEntries?.length) return;
        if (!hasDice) {
            setPhase(1);
            const t = setTimeout(onClose, 2200);
            return () => clearTimeout(t);
        }
        setPhase(0);
        setShuffled(rollEntries.map(e => Math.floor(Math.random() * (e.sides || 6)) + 1));
        const shuffleInt = setInterval(() => {
            setShuffled(rollEntries.map(e => Math.floor(Math.random() * (e.sides || 20)) + 1));
        }, 75);
        const revealT = setTimeout(() => { clearInterval(shuffleInt); setPhase(1); }, 1200);
        const closeT  = setTimeout(onClose, 3800);
        return () => { clearInterval(shuffleInt); clearTimeout(revealT); clearTimeout(closeT); };
    }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!open || !rollEntries?.length) return null;

    return (
        <Box
            onClick={phase === 1 ? onClose : undefined}
            sx={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.72)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 9999,
                cursor: phase === 1 ? 'pointer' : 'default',
            }}
        >
            <Paper elevation={12} sx={{
                p: '20px 28px', borderRadius: '16px',
                minWidth: 260, maxWidth: 400,
                background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 100%)',
                border: `2px solid ${tipoConf.border}`,
                textAlign: 'center',
                boxShadow: `0 0 40px ${tipoConf.border}55`,
            }}>
                {/* Título */}
                <Typography sx={{
                    fontSize: '11px', fontWeight: 'bold', letterSpacing: '2px',
                    color: tipoConf.border, textTransform: 'uppercase', mb: 1.5,
                }}>
                    {phase === 0 ? '🎲 Rolando dados...' : `✨ ${habNome}`}
                </Typography>

                {/* Entradas */}
                {rollEntries.map((entry, i) => {
                    const oc = OVERLAY_TIPO[entry.tipo] || OVERLAY_TIPO.dano;
                    const displayNum = phase === 0 ? (shuffled[i] ?? '?') : entry.final;
                    const isSuccess = entry.extra?.sucesso;

                    return (
                        <Box key={i} sx={{
                            mt: i > 0 ? 1.5 : 0,
                            pt: i > 0 ? 1.5 : 0,
                            borderTop: i > 0 ? '1px dashed rgba(255,255,255,0.12)' : 'none',
                        }}>
                            {rollEntries.length > 1 && (
                                <Typography sx={{ fontSize: '9px', color: 'var(--text-primary)', mb: 0.2, letterSpacing: 1 }}>
                                    {entry.label?.toUpperCase()}
                                </Typography>
                            )}

                            <Typography sx={{
                                fontSize: rollEntries.length > 1 ? '44px' : '64px',
                                fontWeight: '900', lineHeight: 1,
                                fontFamily: '"Courier New", monospace',
                                color: phase === 0 ? '#FFD54F' : oc.color,
                                transition: 'color 0.35s',
                                animation: phase === 0
                                    ? 'diceShake 0.12s ease infinite'
                                    : 'dicePop 0.45s ease forwards',
                                '@keyframes diceShake': {
                                    '0%,100%': { transform: 'translateY(0)' },
                                    '50%':     { transform: 'translateY(-3px)' },
                                },
                                '@keyframes dicePop': {
                                    '0%':   { transform: 'scale(0.4)', opacity: 0 },
                                    '65%':  { transform: 'scale(1.18)' },
                                    '100%': { transform: 'scale(1)',   opacity: 1 },
                                },
                            }}>
                                {displayNum}
                            </Typography>

                            {phase === 1 && (
                                <Box sx={{ mt: 0.4 }}>
                                    {entry.breakdown?.length > 1 && (
                                        <Typography sx={{ fontSize: '11px', color: 'var(--text-primary)' }}>
                                            [{entry.breakdown.join(' + ')}]
                                        </Typography>
                                    )}
                                    {entry.tipo === 'chance' && (
                                        <Typography sx={{ fontSize: '12px', mt: 0.5, color: isSuccess ? '#81C784' : '#EF9A9A', fontWeight: 'bold' }}>
                                            {entry.final} / 100 &mdash; necessário ≤ {entry.extra?.chanceFinal}%
                                            <br />{isSuccess ? '✅ Sucesso!' : '❌ Falhou!'}
                                        </Typography>
                                    )}
                                    {entry.tipo === 'dano' && entry.extra?.elemento && (
                                        <Typography sx={{ fontSize: '11px', color: 'var(--text-primary)' }}>
                                            {entry.extra.elemento}
                                        </Typography>
                                    )}
                                    {(entry.tipo === 'cura' || entry.tipo === 'cura_pe') && (
                                        <Box>
                                            <Typography sx={{ fontSize: '11px', color: 'var(--text-primary)' }}>
                                                {entry.label}{entry.display && entry.display !== String(entry.final) ? ` (${entry.display})` : ''}
                                            </Typography>
                                            {entry.extra?.curadoReal != null && entry.extra.curadoReal !== entry.final && (
                                                <Typography sx={{ fontSize: '10px', color: 'var(--text-primary)', mt: 0.2 }}>
                                                    ⚠️ aplicado: +{entry.extra.curadoReal} (limite máximo)
                                                </Typography>
                                            )}
                                        </Box>
                                    )}
                                    {entry.tipo === 'desconto' && (
                                        <Typography sx={{ fontSize: '11px', color: 'var(--text-primary)' }}>
                                            {entry.extra?.linha}
                                        </Typography>
                                    )}
                                </Box>
                            )}
                        </Box>
                    );
                })}

                {phase === 1 && (
                    <Typography sx={{ fontSize: '9px', color: 'var(--text-primary)', mt: 2, letterSpacing: 1 }}>
                        CLIQUE PARA FECHAR
                    </Typography>
                )}
            </Paper>
        </Box>
    );
});

const RegaliasSection = React.memo(({ character, editMode, sectionStyle, cardHeaderStyle, updateField, baseUrl, setCharacter, statsDerivados, setDiceHistory }) => {
    const [expandedAccordions, setExpandedAccordions] = useState({});
    const [shopOpen, setShopOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [snack, setSnack] = useState({ open: false, msg: '', severity: 'info' });
    /** Estado por card: { [habNome]: { opcional: bool, magiaExtra: number } } */
    const [cardStates, setCardStates] = useState({});
    /** Modal de rolagem de dados */
    const [diceModal, setDiceModal] = useState({ open: false, habNome: '', habTipo: 'ativa', rollEntries: [], snackMsg: '', snackSeverity: 'success' });

    const getCardState = (key) => cardStates[key] || { opcional: false, magiaExtra: 0 };
    const setCardState = (key, updates) => setCardStates(prev => ({
        ...prev,
        [key]: { ...(prev[key] || { opcional: false, magiaExtra: 0 }), ...updates },
    }));

    const handleDiceModalClose = useCallback(() => {
        const { snackMsg, snackSeverity } = diceModal;
        setDiceModal(d => ({ ...d, open: false }));
        if (snackMsg) setTimeout(() => setSnack({ open: true, msg: snackMsg, severity: snackSeverity }), 80);
    }, [diceModal]);

    const handleAccordionChange = (panel) => (_e, isExpanded) => setExpandedAccordions(prev => ({ ...prev, [panel]: isExpanded }));

    const getDescricaoRegaliaEspecie = (nomeRegalia) => {
        for (const tipo of ['Psíquico', 'Vampiro', 'Mutante']) {
            const opcao = getOpcaoRegalia(tipo, nomeRegalia);
            if (opcao) return opcao.descricao;
        }
        return null;
    };

    /* ── Auto-save: persiste ao backend ── */
    const autoSave = useCallback(async (updatedChar) => {
        if (!updatedChar?.id || !baseUrl) return;
        try {
            await fetch(`${baseUrl}/personagens/${updatedChar.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedChar),
            });
        } catch (err) {
            console.error('Erro ao auto-salvar regalia:', err);
        }
    }, [baseUrl]);

    /* ── Usar habilidade: pré-computa rolls, aplica estado, abre modal → snackbar ── */
    const handleUsarHabilidade = useCallback((hab, opcoes = {}) => {
        if (!setCharacter) return;
        const { usarOpcional = false, magiaExtra = 0 } = opcoes;

        // Leitura dos recursos do personagem ATUAL (antes de qualquer alteração)
        const pmAtual  = character.pm_atual  ?? 0;
        const peAtual  = character.pe_atual  ?? 0;
        const pvAtual  = character.pv_atual  ?? 0;
        // Máximos derivados (calculados pelo hook da ficha, não do objeto bruto)
        const pvMax = statsDerivados?.pvMax ?? (character.pv_max ?? pvAtual);
        const peMax = statsDerivados?.peMax ?? (character.pe_max ?? peAtual);
        const pmMax = statsDerivados?.pmMax ?? (character.pm_max ?? pmAtual);

        const custoBase     = hab.custoMagia || 0;
        const custoOpcional = usarOpcional ? (hab.efeitoOpcional?.custoMagiaExtra || 0) : 0;
        const custoTotal    = custoBase + custoOpcional + magiaExtra;
        const custoEstamina = hab.custoEstamina || 0;

        // Validação imediata (sem abrir modal)
        if (custoTotal > pmAtual) {
            setSnack({ open: true, msg: `PM insuficiente para ${hab.nome}! Precisa ${custoTotal}, tem ${pmAtual}.`, severity: 'error' });
            return;
        }
        if (custoEstamina > peAtual) {
            setSnack({ open: true, msg: `Estamina insuficiente para ${hab.nome}!`, severity: 'error' });
            return;
        }

        // ── Pré-computa todas as rolagens (fora do setCharacter para capturar antes de mutar estado)
        const rollEntries = [];
        const partes = [];
        const custos = [];
        if (custoTotal   > 0) custos.push(`-${custoTotal} PM`);
        if (custoEstamina > 0) custos.push(`-${custoEstamina} PE`);

        let deltaPV = 0;
        let deltaGanhoPE = 0;   // PE ganho (cura), separado do custo

        // Cura PV principal
        if (hab.efeito?.curaHP != null) {
            const exprStr = String(hab.efeito.curaHP);
            const { total, breakdown, sides } = computeDice(exprStr);
            const pvDepois = Math.min(pvMax, pvAtual + total);
            const curado   = pvDepois - pvAtual;
            deltaPV = curado;
            rollEntries.push({ label: 'Cura PV', display: exprStr, final: total, sides, breakdown, tipo: 'cura', extra: { curadoReal: curado } });
            partes.push(`❤️ +${curado} PV`);
        }

        // Cura PE (opcional)
        if (usarOpcional && hab.efeitoOpcional?.curaEstamina != null) {
            const exprStr = String(hab.efeitoOpcional.curaEstamina);
            const { total, breakdown, sides } = computeDice(exprStr);
            const peDepois = Math.min(peMax, peAtual + total);
            const restaurado = peDepois - peAtual;
            deltaGanhoPE = restaurado;
            rollEntries.push({ label: 'Restaura PE', display: exprStr, final: total, sides, breakdown, tipo: 'cura_pe', extra: { curadoReal: restaurado } });
            partes.push(`⚡ +${restaurado} PE`);
        }

        // Dano principal
        if (hab.efeito?.dano) {
            const elemento = resolveElemento(hab.efeito.tipoDano, hab.efeito.tabelaElemento);
            const exprStr  = String(hab.efeito.dano);
            const custoMissilExtra = hab.escalamento?.custoMagiaPorMissilExtra;

            if (custoMissilExtra && magiaExtra > 0) {
                const totalMisseis = 1 + Math.floor(magiaExtra / custoMissilExtra);
                let totalDano = 0;
                const breakdown = [];
                let sides = null;
                for (let i = 0; i < totalMisseis; i++) {
                    const r = computeDice(exprStr);
                    totalDano += r.total;
                    breakdown.push(r.total);
                    if (!sides) sides = r.sides;
                }
                rollEntries.push({
                    label: `Dano (${totalMisseis} mísseis)`,
                    display: exprStr, final: totalDano,
                    sides, breakdown: breakdown.length > 1 ? breakdown : null,
                    tipo: 'dano', extra: { elemento },
                });
                partes.push(`🎲 ${totalMisseis}× ${exprStr} = ${totalDano}${elemento ? ` (${elemento})` : ''}`);
            } else {
                const { total, breakdown, sides } = computeDice(exprStr);
                rollEntries.push({ label: 'Dano', display: exprStr, final: total, sides, breakdown, tipo: 'dano', extra: { elemento } });
                partes.push(`🎲 ${exprStr} = ${total}${elemento ? ` (${elemento})` : ''}`);
            }
        }

        // Dano opcional (ex.: Abençoar Água em morto-vivo)
        if (usarOpcional && hab.efeitoOpcional?.dano) {
            const elem    = resolveElemento(hab.efeitoOpcional.tipoDano, null);
            const exprStr = String(hab.efeitoOpcional.dano);
            const { total, breakdown, sides } = computeDice(exprStr);
            rollEntries.push({ label: `Dano (${elem || 'sagrado'})`, display: exprStr, final: total, sides, breakdown, tipo: 'dano', extra: { elemento: elem } });
            partes.push(`🎲 ${exprStr} = ${total}${elem ? ` (${elem})` : ''}`);
        }

        // Chance de sucesso
        if (hab.efeito?.chanceSucesso != null) {
            const chanceBase  = hab.efeito.chanceSucesso;
            const bonusChance = (hab.escalamento?.bonusChancePorMagiaExtra && magiaExtra > 0)
                ? magiaExtra * hab.escalamento.bonusChancePorMagiaExtra : 0;
            const chanceFinal = Math.min(95, chanceBase + bonusChance);
            const rollVal = Math.floor(Math.random() * 100) + 1;
            const sucesso = rollVal <= chanceFinal;
            rollEntries.push({
                label: 'Teste de Chance', display: '1d100',
                final: rollVal, sides: 100, breakdown: null,
                tipo: 'chance', extra: { chanceFinal, sucesso, condicao: hab.efeito.condicao },
            });
            partes.push(`${rollVal}/100 — ${sucesso ? 'Sucesso!' : 'Falhou!'}`);
            if (sucesso && hab.efeito.condicao) partes.push(`💜 ${hab.efeito.condicao}`);
        }

        // Tabela de desconto (Barganhar)
        if (hab.efeito?.tabelaDesconto) {
            const rollVal = Math.floor(Math.random() * 20) + 1;
            const linha = hab.efeito.tabelaDesconto.find(l => {
                const [min, max] = l.rolagem.split('-').map(Number);
                return rollVal >= Math.max(1, min) && rollVal <= max;
            });
            const desconto = linha?.desconto ?? 0;
            rollEntries.push({
                label: 'Negociação', display: '1d20',
                final: rollVal, sides: 20, breakdown: null,
                tipo: 'desconto', extra: { desconto, linha: linha?.resultado || (desconto > 0 ? `Desconto: ${desconto}%` : 'Sem desconto (falha)') },
            });
            partes.push(`1d20 = ${rollVal} → ${desconto > 0 ? desconto + '%' : 'sem desconto'}`);
        }

        // ── Aplica mudanças de estado atomicamente
        setCharacter(prev => {
            if (!prev) return prev;
            const updated = { ...prev };
            if (custoTotal    > 0) updated.pm_atual = Math.max(0, (prev.pm_atual ?? 0) - custoTotal);
            if (custoEstamina > 0) updated.pe_atual = Math.max(0, (prev.pe_atual ?? 0) - custoEstamina);
            // Cura PV — respeita o máximo calculado
            if (deltaPV !== 0) updated.pv_atual = Math.min(pvMax, Math.max(0, (prev.pv_atual ?? 0) + deltaPV));
            // Cura PE — aplica sobre o pe_atual já descontado do custo
            if (deltaGanhoPE !== 0) updated.pe_atual = Math.min(peMax, Math.max(0, (updated.pe_atual ?? 0) + deltaGanhoPE));
            autoSave(updated);
            return updated;
        });

        // ── Registra as rolagens no histórico da ficha
        if (setDiceHistory && rollEntries.length > 0) {
            const ts = new Date().toLocaleTimeString();
            const histEntradas = rollEntries
                .filter(e => e.sides != null)
                .map(e => ({
                    label: `${hab.nome} — ${e.label}`,
                    rolls: e.breakdown ?? [e.final],
                    quantity: e.breakdown?.length ?? 1,
                    sides: e.sides,
                    bonus: 0,
                    total: e.final,
                    isAnimating: false,
                    isCriticalHit: e.tipo === 'chance' ? e.extra?.sucesso === true : false,
                    isCriticalFail: e.tipo === 'chance' ? e.extra?.sucesso === false : false,
                    timestamp: ts,
                }));
            if (histEntradas.length > 0) {
                setDiceHistory(prev => [...histEntradas, ...prev].slice(0, 50));
            }
        }

        // ── Exibe modal de dado (ou snackbar direto se sem rolagem)
        const severity  = partes.some(p => p.includes('Falhou')) ? 'warning' : 'success';
        const snackMsg  = `${hab.nome}${custos.length ? ` (${custos.join(', ')})` : ''}${partes.length ? ': ' + partes.join(' • ') : ' — aplicada!'}`;

        if (rollEntries.length > 0) {
            setDiceModal({ open: true, habNome: hab.nome, habTipo: hab.tipo, rollEntries, snackMsg, snackSeverity: severity });
        } else {
            setSnack({ open: true, msg: snackMsg, severity });
        }
    }, [character, statsDerivados, setCharacter, autoSave, setDiceHistory]);

    /* ── Spell-card de habilidade ── */
    const SpellCard = ({ hab, overrideSx = {} }) => {
        const habKey = hab.nome;
        const cs = getCardState(habKey);
        const tipoConf = TIPO_CONFIG[hab.tipo] || TIPO_CONFIG.ativa;
        const acaoLabel = formatCustoAcoes(hab.custoAcoes);

        // Recursos atuais
        const pmAtual = character.pm_atual ?? 0;
        const peAtual = character.pe_atual ?? 0;

        // Custo dinâmico baseado nas seleções do card
        const custoBase = hab.custoMagia || 0;
        const custoOpcional = cs.opcional ? (hab.efeitoOpcional?.custoMagiaExtra || 0) : 0;
        const custoTotal = custoBase + custoOpcional + (cs.magiaExtra || 0);
        const canAfford = custoTotal <= pmAtual && (hab.custoEstamina || 0) <= peAtual;
        const isUsable = hab.tipo !== 'passiva';

        // Flags de escalamento
        const hasScalingMissile = !!hab.escalamento?.custoMagiaPorMissilExtra;
        const hasScalingChance  = !!hab.escalamento?.bonusChancePorMagiaExtra;
        const pmDisponivel = pmAtual - custoBase;
        const missileCosto = hab.escalamento?.custoMagiaPorMissilExtra || 1;
        const maxMissilesExtra = hasScalingMissile
            ? Math.min(
                hab.efeito?.misseisMax ? hab.efeito.misseisMax - 1 : 4,
                Math.max(0, Math.floor(pmDisponivel / missileCosto))
              )
            : 0;
        const misseisSelecionados = cs.magiaExtra > 0 ? Math.floor(cs.magiaExtra / missileCosto) : 0;

        // Chance atualizada com escalamento
        const chanceBase = hab.efeito?.chanceSucesso;
        const chanceFinal = (chanceBase != null && hasScalingChance)
            ? Math.min(95, chanceBase + (cs.magiaExtra || 0) * hab.escalamento.bonusChancePorMagiaExtra)
            : chanceBase;

        // Exibe toggle opcional apenas para habilidades com efeitoOpcional real
        const hasOptional = !!(hab.efeitoOpcional && (
            hab.efeitoOpcional.custoMagiaExtra ||
            hab.efeitoOpcional.curaEstamina ||
            hab.efeitoOpcional.dano
        ));

        return (
            <Paper elevation={3} sx={{
                width: 260, minHeight: 270, display: 'flex', flexDirection: 'column',
                borderRadius: '10px', overflow: 'hidden', flexShrink: 0,
                border: `2px solid ${tipoConf.border}`,
                transition: 'transform 0.15s, box-shadow 0.15s',
                '&:hover': { transform: 'translateY(-3px)', boxShadow: 6 },
                ...overrideSx,
            }}>
                {/* ── Banner topo: tipo + custo recurso ── */}
                <Box sx={{ background: `linear-gradient(135deg, ${tipoConf.color} 0%, ${tipoConf.border} 100%)`, color: 'white', px: 1, py: 0.4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography className="esteban" sx={{ fontSize: '9px', fontWeight: 'bold', letterSpacing: 0.5 }}>{tipoConf.label.toUpperCase()}</Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                        {custoTotal > 0 && <Chip icon={<AutoAwesomeIcon sx={{ fontSize: 10, color: '#fff !important' }} />} label={`${custoTotal} PM`} size="small" sx={{ height: 16, fontSize: '8px', '& .MuiChip-icon': { ml: '2px', mr: '-2px' }, backgroundColor: 'rgba(255,255,255,0.25)', color: 'white', fontWeight: 'bold' }} />}
                        {hab.custoEstamina > 0 && <Chip icon={<BoltIcon sx={{ fontSize: 10, color: '#FFD54F !important' }} />} label={`${hab.custoEstamina} PE`} size="small" sx={{ height: 16, fontSize: '8px', '& .MuiChip-icon': { ml: '2px', mr: '-2px' }, backgroundColor: 'rgba(255,255,255,0.25)', color: 'white', fontWeight: 'bold' }} />}
                    </Box>
                </Box>
                {/* ── Nome ── */}
                <Box sx={{ px: 1, py: 0.5, backgroundColor: tipoConf.bg, borderBottom: `1px solid ${tipoConf.border}44` }}>
                    <Typography className="esteban" sx={{ fontSize: '11px', fontWeight: 'bold', color: tipoConf.color, lineHeight: 1.2 }}>{hab.nome}</Typography>
                </Box>
                {/* ── Mecânicas: ação, tempo, alcance, duração, limite ── */}
                <Box sx={{ display: 'flex', gap: '3px', flexWrap: 'wrap', px: 0.6, py: 0.4, backgroundColor: '#fafaf8', borderBottom: '1px solid #eee' }}>
                    {acaoLabel && <Chip icon={<AccessTimeIcon sx={{ fontSize: 9 }} />} label={`Ação: ${acaoLabel}`} size="small" sx={{ height: 17, fontSize: '8px', '& .MuiChip-icon': { ml: '2px' }, backgroundColor: '#EFEBE9', color: '#5D4037' }} />}
                    {hab.tempoExecucao && <Chip icon={<TimerIcon sx={{ fontSize: 9 }} />} label={`Tempo: ${hab.tempoExecucao}`} size="small" sx={{ height: 17, fontSize: '8px', '& .MuiChip-icon': { ml: '2px' }, backgroundColor: '#EFEBE9', color: '#5D4037' }} />}
                    {hab.alcance && <Chip icon={<GpsFixedIcon sx={{ fontSize: 9 }} />} label={`Alcance: ${hab.alcance}m`} size="small" sx={{ height: 17, fontSize: '8px', '& .MuiChip-icon': { ml: '2px' }, backgroundColor: '#E0F7FA', color: '#00695C' }} />}
                    {hab.duracao && <Chip icon={<TimerIcon sx={{ fontSize: 9 }} />} label={`Duração: ${hab.duracao}`} size="small" sx={{ height: 17, fontSize: '8px', '& .MuiChip-icon': { ml: '2px' }, backgroundColor: '#FFF8E1', color: '#F57F17' }} />}
                    {hab.limiteUso && <Chip label={`Limite: ${hab.limiteUso}`} size="small" sx={{ height: 17, fontSize: '8px', backgroundColor: '#FCE4EC', color: '#C62828' }} />}
                    {hab.limiteAcumulo && <Chip label={`Acúmulo: máx ${hab.limiteAcumulo}`} size="small" sx={{ height: 17, fontSize: '8px', backgroundColor: '#F3E5F5', color: '#4A148C' }} />}
                </Box>
                {/* ── Descrição + controles interativos ── */}
                <Box sx={{ px: 0.8, py: 0.6, flex: 1, overflowY: 'auto', '&::-webkit-scrollbar': { width: 3 }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: 2 } }}>
                    <Typography className="esteban" sx={{ fontSize: '8.5px', color: 'var(--text-primary)', lineHeight: 1.4 }}>{hab.descricao}</Typography>

                    {/* ── Toggle de efeito opcional ── */}
                    {hasOptional && (
                        <Box sx={{ mt: 0.5, pt: 0.4, borderTop: '1px dashed #ddd' }}>
                            <Box component="label" sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, cursor: 'pointer', userSelect: 'none' }}>
                                <input
                                    type="checkbox"
                                    checked={cs.opcional}
                                    onChange={e => setCardState(habKey, { opcional: e.target.checked })}
                                    style={{ marginTop: 2, cursor: 'pointer', accentColor: tipoConf.color }}
                                />
                                <Typography className="esteban" sx={{ fontSize: '8px', color: tipoConf.color, fontWeight: 'bold', lineHeight: 1.3 }}>
                                    Opcional {hab.efeitoOpcional.custoMagiaExtra ? `(+${hab.efeitoOpcional.custoMagiaExtra} PM)` : ''}:{' '}
                                    <span style={{ fontWeight: 'normal', color: 'var(--text-primary)' }}>
                                        {hab.efeitoOpcional.curaEstamina ? `+${hab.efeitoOpcional.curaEstamina} PE` : ''}
                                        {hab.efeitoOpcional.dano
                                            ? `${hab.efeitoOpcional.dano} dano ${hab.efeitoOpcional.tipoDano || ''}`
                                            : ''}
                                        {hab.efeitoOpcional.identificarEscola ? 'identifica escola de magia' : ''}
                                    </span>
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {/* ── Escalamento: mísseis extras ── */}
                    {hasScalingMissile && (
                        <Box sx={{ mt: 0.5, pt: 0.4, borderTop: '1px dashed #ddd', display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                            <Typography className="esteban" sx={{ fontSize: '8px', color: 'var(--text-primary)', flexShrink: 0 }}>Mísseis:</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                                <Button
                                    size="small"
                                    onClick={() => setCardState(habKey, { magiaExtra: Math.max(0, (cs.magiaExtra || 0) - missileCosto) })}
                                    disabled={(cs.magiaExtra || 0) <= 0}
                                    sx={{ minWidth: 18, width: 18, height: 18, p: 0, fontSize: '12px', fontWeight: 'bold', lineHeight: 1 }}
                                >−</Button>
                                <Typography className="esteban" sx={{ fontSize: '10px', fontWeight: 'bold', minWidth: 22, textAlign: 'center' }}>
                                    {1 + misseisSelecionados}×
                                </Typography>
                                <Button
                                    size="small"
                                    onClick={() => setCardState(habKey, { magiaExtra: (cs.magiaExtra || 0) + missileCosto })}
                                    disabled={misseisSelecionados >= maxMissilesExtra}
                                    sx={{ minWidth: 18, width: 18, height: 18, p: 0, fontSize: '12px', fontWeight: 'bold', lineHeight: 1 }}
                                >+</Button>
                            </Box>
                            <Typography className="esteban" sx={{ fontSize: '7px', color: 'var(--text-primary)' }}>
                                ({missileCosto} PM cada • máx {1 + maxMissilesExtra})
                            </Typography>
                        </Box>
                    )}

                    {/* ── Escalamento: chance (Azaralhar etc.) ── */}
                    {hasScalingChance && (
                        <Box sx={{ mt: 0.5, pt: 0.4, borderTop: '1px dashed #ddd', display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                            <Typography className="esteban" sx={{ fontSize: '8px', color: 'var(--text-primary)', flexShrink: 0 }}>PM extra:</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                                <Button
                                    size="small"
                                    onClick={() => setCardState(habKey, { magiaExtra: Math.max(0, (cs.magiaExtra || 0) - 1) })}
                                    disabled={(cs.magiaExtra || 0) <= 0}
                                    sx={{ minWidth: 18, width: 18, height: 18, p: 0, fontSize: '12px', fontWeight: 'bold', lineHeight: 1 }}
                                >−</Button>
                                <Typography className="esteban" sx={{ fontSize: '10px', fontWeight: 'bold', minWidth: 18, textAlign: 'center' }}>
                                    {cs.magiaExtra || 0}
                                </Typography>
                                <Button
                                    size="small"
                                    onClick={() => setCardState(habKey, { magiaExtra: (cs.magiaExtra || 0) + 1 })}
                                    disabled={(cs.magiaExtra || 0) >= pmDisponivel}
                                    sx={{ minWidth: 18, width: 18, height: 18, p: 0, fontSize: '12px', fontWeight: 'bold', lineHeight: 1 }}
                                >+</Button>
                            </Box>
                            <Typography className="esteban" sx={{ fontSize: '7.5px', color: tipoConf.color, fontWeight: 'bold' }}>
                                → {chanceFinal}% ({chanceBase}% base)
                            </Typography>
                        </Box>
                    )}
                </Box>
                {/* ── Rodapé: efeitos + botão Usar ── */}
                <Box sx={{ backgroundColor: '#f5f5f3', borderTop: `2px solid ${tipoConf.border}33`, mt: 'auto', px: 0.6, py: 0.4 }}>
                    <Box sx={{ display: 'flex', gap: '3px', flexWrap: 'wrap', mb: isUsable ? 0.4 : 0 }}>
                        {chanceFinal != null && (
                            <Chip icon={<CasinoIcon sx={{ fontSize: 9 }} />} label={`Sucesso: ${chanceFinal}%`} size="small"
                                sx={{ height: 17, fontSize: '8px', '& .MuiChip-icon': { ml: '2px' }, backgroundColor: '#E8F5E9', color: '#2E7D32', fontWeight: 'bold' }} />
                        )}
                        {hab.efeito?.dano && (
                            <Chip
                                label={`Dano: ${hab.efeito.dano}${hab.efeito.tipoDano ? ` (${hab.efeito.tipoDano === 'elemental_aleatorio' ? 'aleatório' : hab.efeito.tipoDano})` : ''}`}
                                size="small" sx={{ height: 17, fontSize: '8px', backgroundColor: '#FFEBEE', color: '#C62828', fontWeight: 'bold' }}
                            />
                        )}
                        {hab.efeito?.curaHP && (
                            <Chip label={`Cura: ${hab.efeito.curaHP} PV`} size="small"
                                sx={{ height: 17, fontSize: '8px', backgroundColor: '#FFCDD2', color: '#C62828' }} />
                        )}
                        {cs.opcional && hab.efeitoOpcional?.curaEstamina && (
                            <Chip label={`+${hab.efeitoOpcional.curaEstamina} PE`} size="small"
                                sx={{ height: 17, fontSize: '8px', backgroundColor: '#E3F2FD', color: '#1565C0' }} />
                        )}
                        {hab.efeito?.condicao && (
                            <Chip label={`Causa: ${hab.efeito.condicao}`} size="small"
                                sx={{ height: 17, fontSize: '8px', backgroundColor: '#EDE7F6', color: '#4527A0' }} />
                        )}
                        {hab.efeito?.tabelaDesconto && (
                            <Chip icon={<CasinoIcon sx={{ fontSize: 9 }} />} label="Rola 1d20" size="small"
                                sx={{ height: 17, fontSize: '8px', '& .MuiChip-icon': { ml: '2px' }, backgroundColor: '#FFF9C4', color: '#F57F17', fontWeight: 'bold' }} />
                        )}
                    </Box>
                    {isUsable && (
                        <Button
                            fullWidth size="small" variant="contained"
                            startIcon={<PlayArrowIcon sx={{ fontSize: 14 }} />}
                            disabled={!canAfford}
                            onClick={() => handleUsarHabilidade(hab, { usarOpcional: cs.opcional, magiaExtra: cs.magiaExtra || 0 })}
                            sx={{
                                height: 24, fontSize: '9px', fontWeight: 'bold', textTransform: 'none',
                                borderRadius: '0 0 8px 8px',
                                backgroundColor: canAfford ? tipoConf.color : '#bbb',
                                '&:hover': { backgroundColor: canAfford ? tipoConf.border : '#bbb' },
                                '&.Mui-disabled': { backgroundColor: '#e0e0e0', color: 'var(--text-primary)' },
                            }}
                        >
                            {canAfford
                                ? `Usar${custoTotal > 0 ? ` (-${custoTotal} PM)` : ''}`
                                : 'Sem recurso'}
                        </Button>
                    )}
                    {!isUsable && (
                        <Typography className="esteban" sx={{ fontSize: '8px', color: 'var(--text-primary)', textAlign: 'center', py: 0.3, fontStyle: 'italic' }}>
                            Efeito passivo — sempre ativo
                        </Typography>
                    )}
                </Box>
            </Paper>
        );
    };

    const [aprendizDetail, setAprendizDetail] = useState(null); // regalia aberta no modal de detalhes

    const renderRegaliasAprendiz = () => {
        const regalias = character.regalias_de_aprendiz?.RegaliasDeAprendizSelecionada || {};
        if (Object.keys(regalias).length === 0) return (
            <Box sx={{ textAlign: 'center', py: 3, color: 'var(--text-primary)' }}>
                <Typography className="esteban" sx={{ fontSize: '12px' }}>Nenhuma regalia de aprendiz adquirida.</Typography>
            </Box>
        );

        const rows = Object.entries(regalias).map(([key, regalia]) => {
            const fullData = getRegaliaAprendiz(regalia.id || key);
            return fullData ? { key, fullData } : null;
        }).filter(Boolean);

        return (
            <>
                <TableContainer component={Paper} sx={{ border: '1px solid #756A3444', borderRadius: 2, overflow: 'auto' }}>
                    <Table size="small" sx={{ minWidth: 400 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#2F3C29' }}>
                                <TableCell sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Regalia</TableCell>
                                <TableCell sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Bônus de Recursos</TableCell>
                                <TableCell sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Bônus & Proficiências</TableCell>
                                <TableCell align="center" sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Habilidades</TableCell>
                                <TableCell align="center" sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Detalhes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(({ key, fullData }, idx) => (
                                <TableRow
                                    key={key}
                                    sx={{
                                        backgroundColor: idx % 2 === 0 ? 'var(--surface-raised)' : 'var(--surface-default)',
                                        '&:hover': { backgroundColor: 'var(--surface-raised)' },
                                        transition: 'background-color .15s',
                                        borderLeft: '3px solid #454E30',
                                    }}
                                >
                                    {/* Nome */}
                                    <TableCell sx={{ fontFamily: 'Esteban, serif', fontWeight: 'bold', fontSize: 13, maxWidth: 160 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <StarIcon sx={{ fontSize: 13, color: 'var(--text-primary)' }} />
                                            <Typography sx={{ fontWeight: 'bold', fontSize: 13, fontFamily: 'Esteban, serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 140 }}>
                                                {fullData.nome}
                                            </Typography>
                                        </Box>
                                    </TableCell>

                                    {/* Bônus de Recursos (PV / PE / PM) */}
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                            {fullData.bonusPorRegalia?.pv > 0 && (
                                                <Chip icon={<FavoriteIcon sx={{ fontSize: 10, color: '#fff !important' }} />}
                                                    label={`+${fullData.bonusPorRegalia.pv} PV`} size="small"
                                                    sx={{ fontSize: 10, backgroundColor: '#C62828', color: 'white', '& .MuiChip-icon': { ml: '2px' } }} />
                                            )}
                                            {fullData.bonusPorRegalia?.estamina > 0 && (
                                                <Chip icon={<BoltIcon sx={{ fontSize: 10, color: '#FFD54F !important' }} />}
                                                    label={`+${fullData.bonusPorRegalia.estamina} PE`} size="small"
                                                    sx={{ fontSize: 10, backgroundColor: '#1565C0', color: 'white', '& .MuiChip-icon': { ml: '2px' } }} />
                                            )}
                                            {fullData.bonusPorRegalia?.magia > 0 && (
                                                <Chip icon={<AutoAwesomeIcon sx={{ fontSize: 10, color: '#CE93D8 !important' }} />}
                                                    label={`+${fullData.bonusPorRegalia.magia} PM`} size="small"
                                                    sx={{ fontSize: 10, backgroundColor: '#6A1B9A', color: 'white', '& .MuiChip-icon': { ml: '2px' } }} />
                                            )}
                                            {!fullData.bonusPorRegalia && <Typography sx={{ fontSize: 11, color: 'var(--text-primary)' }}>—</Typography>}
                                        </Box>
                                    </TableCell>

                                    {/* Bônus de Habilidades & Proficiências */}
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                            {fullData.escolhasHabilidades?.map((esc, i) => (
                                                <Chip key={`esc-${i}`}
                                                    className="chip-neutral"
                                                    label={`+${esc.pontos} ${esc.grupo.map(g => HAB_LABELS[g] || g).join('/')}`}
                                                    size="small" sx={{ fontSize: 10 }} />
                                            ))}
                                            {fullData.bonusHabilidades && Object.entries(fullData.bonusHabilidades).map(([k, v]) => (
                                                <Chip key={k}
                                                    className="chip-neutral"
                                                    label={`+${v} ${HAB_LABELS[k] || k}`}
                                                    size="small" sx={{ fontSize: 10 }} />
                                            ))}
                                            {fullData.proficienciasGanhas?.map((p, i) => (
                                                <Chip key={`p-${i}`}
                                                    className="chip-neutral"
                                                    label={PROF_LABELS[p] || p}
                                                    size="small" sx={{ fontSize: 10 }} />
                                            ))}
                                            {!fullData.escolhasHabilidades?.length && !fullData.bonusHabilidades && !fullData.proficienciasGanhas?.length && (
                                                <Typography sx={{ fontSize: 11, color: 'var(--text-primary)' }}>—</Typography>
                                            )}
                                        </Box>
                                    </TableCell>

                                    {/* Contagem de habilidades ganhas */}
                                    <TableCell align="center">
                                        {fullData.habilidadesGanhas?.length > 0 ? (
                                            <Chip
                                                label={`${fullData.habilidadesGanhas.length} hab.`}
                                                size="small"
                                                sx={{ fontSize: 10, fontWeight: 'bold' }}
                                            />
                                        ) : (
                                            <Typography sx={{ fontSize: 11, color: 'var(--text-primary)' }}>—</Typography>
                                        )}
                                    </TableCell>

                                    {/* Botão Usar */}
                                    <TableCell align="center">
                                        {fullData.habilidadesGanhas?.length > 0 ? (
                                            <Button
                                                size="small"
                                                variant="contained"
                                                startIcon={<PlayArrowIcon sx={{ fontSize: 13 }} />}
                                                onClick={() => setAprendizDetail(fullData)}
                                                sx={{
                                                    fontSize: 10, py: 0.25, px: 1, minWidth: 'auto',
                                                    backgroundColor: '#454E30', fontFamily: 'Esteban, serif',
                                                    '&:hover': { backgroundColor: '#2F3C29' },
                                                }}
                                            >
                                                Usar
                                            </Button>
                                        ) : (
                                            <Typography sx={{ fontSize: 11, color: 'var(--text-primary)' }}>—</Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* ── Modal: o próprio SpellCard é o modal ── */}
                <Dialog
                    open={Boolean(aprendizDetail)}
                    onClose={() => setAprendizDetail(null)}
                    maxWidth={false}
                    PaperProps={{
                        sx: {
                            p: 0,
                            overflow: 'visible',
                            background: 'transparent',
                            boxShadow: 'none',
                        }
                    }}
                >
                    <Box sx={{ position: 'relative', display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {/* Botão fechar flutuante */}
                        <IconButton
                            onClick={() => setAprendizDetail(null)}
                            size="small"
                            sx={{
                                position: 'absolute', top: -14, right: -14, zIndex: 10,
                                color: 'white', backgroundColor: 'rgba(0,0,0,0.55)',
                                '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
                                width: 26, height: 26,
                            }}
                        >
                            <CloseIcon sx={{ fontSize: 15 }} />
                        </IconButton>
                        {aprendizDetail?.habilidadesGanhas?.map((hab, i) => (
                            <SpellCard
                                key={i}
                                hab={hab}
                                overrideSx={aprendizDetail.habilidadesGanhas.length === 1
                                    ? { width: 300, '&:hover': { transform: 'none', boxShadow: 3 } }
                                    : {}
                                }
                            />
                        ))}
                    </Box>
                </Dialog>
            </>
        );
    };

    const [especieDetail, setEspecieDetail] = useState(null);   // { especie, regalias[] }
    const [profissaoDetail, setProfissaoDetail] = useState(null); // { nome, habilidades }
    const [classeDetail, setClasseDetail] = useState(null);       // { classDisplayName, rObj }

    const renderRegaliasEspecie = () => {
        const grupos = (character.regalias_de_especie || []).filter(r => r && r.especie);
        if (grupos.length === 0) return (
            <Box sx={{ textAlign: 'center', py: 3 }}>
                <Typography className="esteban" sx={{ fontSize: '12px', color: 'var(--text-primary)' }}>Nenhuma regalia de espécie adquirida.</Typography>
            </Box>
        );

        // Flatten: cada regalia individual vira uma linha
        const rows = grupos.flatMap(g =>
            (g.regalias || []).map(r => ({ especie: g.especie, nome: r, desc: getDescricaoRegaliaEspecie(r) }))
        );

        return (
            <>
                <TableContainer component={Paper} sx={{ border: '1px solid #AB642244', borderRadius: 2, overflow: 'auto' }}>
                    <Table size="small" sx={{ minWidth: 380 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#AB6422' }}>
                                <TableCell sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold' }}>Espécie</TableCell>
                                <TableCell sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold' }}>Regalia</TableCell>
                                <TableCell align="center" sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold' }}>Descrição</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, idx) => (
                                <TableRow key={idx} sx={{
                                    backgroundColor: idx % 2 === 0 ? 'var(--surface-raised)' : 'var(--surface-default)',
                                    '&:hover': { backgroundColor: 'var(--surface-raised)' },
                                    borderLeft: '3px solid #AB6422',
                                }}>
                                    <TableCell sx={{ fontFamily: 'Esteban, serif', fontSize: 12, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                                        {row.especie}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: 'Esteban, serif', fontWeight: 'bold', fontSize: 13 }}>
                                        {row.nome}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.desc ? (
                                            <Button size="small" variant="contained"
                                                startIcon={<InfoOutlinedIcon sx={{ fontSize: 13 }} />}
                                                onClick={() => setEspecieDetail(row)}
                                                sx={{ fontSize: 10, py: 0.25, px: 1, backgroundColor: '#AB6422', fontFamily: 'Esteban, serif', '&:hover': { backgroundColor: '#8B4513' } }}
                                            >
                                                Ver
                                            </Button>
                                        ) : (
                                            <Typography sx={{ fontSize: 11, color: 'var(--text-primary)' }}>—</Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Modal descrição espécie */}
                <Dialog open={Boolean(especieDetail)} onClose={() => setEspecieDetail(null)} maxWidth="sm" fullWidth
                    PaperProps={{ sx: { borderRadius: 3, border: '2px solid #AB6422' } }}>
                    <DialogTitle component="div" sx={{ background: 'linear-gradient(135deg, #8B4513 0%, #AB6422 100%)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                        <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>{especieDetail?.nome}</Typography>
                        <IconButton onClick={() => setEspecieDetail(null)} sx={{ color: '#fff' }} size="small"><CloseIcon /></IconButton>
                    </DialogTitle>
                    <DialogContent sx={{ backgroundColor: '#faf6f0', pt: 2 }}>
                        <Chip label={especieDetail?.especie} size="small" sx={{ backgroundColor: '#AB6422', color: 'white', mb: 1.5 }} />
                        <Typography className="esteban" variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.7, color: 'var(--text-primary)' }}>
                            {especieDetail?.desc}
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: '#faf6f0', borderTop: '1px solid #AB642244', px: 2, py: 1 }}>
                        <Button onClick={() => setEspecieDetail(null)} sx={{ color: '#8B4513', fontFamily: 'Esteban, serif' }}>Fechar</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    };

    const renderRegaliasProfissao = () => {
        const regalias = (character.regalias_de_profissao || []).filter(r => r && r.nome);
        if (regalias.length === 0) return (
            <Box sx={{ textAlign: 'center', py: 3 }}>
                <Typography className="esteban" sx={{ fontSize: '12px', color: 'var(--text-primary)' }}>Nenhuma regalia de profissão adquirida.</Typography>
            </Box>
        );

        return (
            <>
                <TableContainer component={Paper} sx={{ border: '1px solid #2F3C2944', borderRadius: 2, overflow: 'auto' }}>
                    <Table size="small" sx={{ minWidth: 380 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#2F3C29' }}>
                                <TableCell sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold' }}>Profissão</TableCell>
                                <TableCell align="center" sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold' }}>Habilidade</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {regalias.map((regalia, idx) => (
                                <TableRow key={idx} sx={{
                                    backgroundColor: idx % 2 === 0 ? 'var(--surface-raised)' : 'var(--surface-default)',
                                    '&:hover': { backgroundColor: 'var(--surface-raised)' },
                                    borderLeft: '3px solid #2F3C29',
                                }}>
                                    <TableCell sx={{ fontFamily: 'Esteban, serif', fontWeight: 'bold', fontSize: 13 }}>
                                        {regalia.nome}
                                    </TableCell>
                                    <TableCell align="center">
                                        {regalia.habilidades ? (
                                            <Button size="small" variant="contained"
                                                startIcon={<InfoOutlinedIcon sx={{ fontSize: 13 }} />}
                                                onClick={() => setProfissaoDetail(regalia)}
                                                sx={{ fontSize: 10, py: 0.25, px: 1, backgroundColor: '#2F3C29', fontFamily: 'Esteban, serif', '&:hover': { backgroundColor: '#162A22' } }}
                                            >
                                                Ver
                                            </Button>
                                        ) : (
                                            <Typography sx={{ fontSize: 11, color: 'var(--text-primary)' }}>—</Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Modal habilidade profissão */}
                <Dialog open={Boolean(profissaoDetail)} onClose={() => setProfissaoDetail(null)} maxWidth="sm" fullWidth
                    PaperProps={{ sx: { borderRadius: 3, border: '2px solid #2F3C29' } }}>
                    <DialogTitle component="div" sx={{ background: 'linear-gradient(135deg, #162A22 0%, #2F3C29 100%)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                        <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>{profissaoDetail?.nome}</Typography>
                        <IconButton onClick={() => setProfissaoDetail(null)} sx={{ color: '#fff' }} size="small"><CloseIcon /></IconButton>
                    </DialogTitle>
                    <DialogContent sx={{ backgroundColor: '#f2f4f1', pt: 2 }}>
                        <Typography className="esteban" variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.7, color: '#2F3C29' }}>
                            {profissaoDetail?.habilidades}
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: '#f2f4f1', borderTop: '1px solid #2F3C2944', px: 2, py: 1 }}>
                        <Button onClick={() => setProfissaoDetail(null)} sx={{ color: '#2F3C29', fontFamily: 'Esteban, serif' }}>Fechar</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    };

    const renderRegaliasClasse = () => {
        const regaliasClasse = character.regalias_de_classe;
        if (!regaliasClasse || Object.keys(regaliasClasse).length === 0) return (
            <Box sx={{ textAlign: 'center', py: 3 }}>
                <Typography className="esteban" sx={{ fontSize: '12px', color: 'var(--text-primary)' }}>Nenhuma regalia de classe adquirida.</Typography>
            </Box>
        );

        // Flatten: cada entrada de regalia dentro de cada classe vira uma linha
        const rows = Object.entries(regaliasClasse).flatMap(([classeId, classData]) => {
            const classeInfo = classesPrimarias.find(c => c.id === classeId);
            const classDisplayName = classeInfo?.nome || classeId.replace(/_/g, ' ');
            const arr = Array.isArray(classData) ? classData : (classData && typeof classData === 'object' ? Object.values(classData) : classData ? [classData] : []);
            return arr.map(r => {
                const rObj = typeof r === 'object' ? r : { nome: r };
                return { classDisplayName, rObj };
            });
        });

        return (
            <>
                <TableContainer component={Paper} sx={{ border: '1px solid #931C4A44', borderRadius: 2, overflow: 'auto' }}>
                    <Table size="small" sx={{ minWidth: 400 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#931C4A' }}>
                                <TableCell sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold' }}>Classe</TableCell>
                                <TableCell sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold' }}>Regalia</TableCell>
                                <TableCell align="center" sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold' }}>Tipo</TableCell>
                                <TableCell align="center" sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold' }}>Detalhes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(({ classDisplayName, rObj }, idx) => (
                                <TableRow key={idx} sx={{
                                    backgroundColor: idx % 2 === 0 ? 'var(--surface-raised)' : 'var(--surface-default)',
                                    '&:hover': { backgroundColor: 'var(--surface-raised)' },
                                    borderLeft: '3px solid #931C4A',
                                }}>
                                    <TableCell sx={{ fontFamily: 'Esteban, serif', fontSize: 12, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                                        {classDisplayName}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: 'Esteban, serif', fontWeight: 'bold', fontSize: 13, maxWidth: 180 }}>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: 13, fontFamily: 'Esteban, serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 170 }}>
                                            {rObj.nome}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        {rObj.autoIncluded
                                            ? <Chip label="Automática" size="small" sx={{ fontSize: 10, backgroundColor: '#4CAF50', color: 'white' }} />
                                            : <Chip label="Comprada" size="small" sx={{ fontSize: 10, backgroundColor: '#931C4A22', color: '#931C4A' }} />
                                        }
                                    </TableCell>
                                    <TableCell align="center">
                                        {(rObj.descricao || (rObj.habilidades && rObj.habilidades.length > 0)) ? (
                                            <Button size="small" variant="contained"
                                                startIcon={<InfoOutlinedIcon sx={{ fontSize: 13 }} />}
                                                onClick={() => setClasseDetail({ classDisplayName, rObj })}
                                                sx={{ fontSize: 10, py: 0.25, px: 1, backgroundColor: '#931C4A', fontFamily: 'Esteban, serif', '&:hover': { backgroundColor: '#7a1640' } }}
                                            >
                                                Ver
                                            </Button>
                                        ) : (
                                            <Typography sx={{ fontSize: 11, color: 'var(--text-primary)' }}>—</Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Modal detalhes classe */}
                <Dialog open={Boolean(classeDetail)} onClose={() => setClasseDetail(null)} maxWidth="sm" fullWidth
                    PaperProps={{ sx: { borderRadius: 3, border: '2px solid #931C4A' } }}>
                    <DialogTitle component="div" sx={{ background: 'linear-gradient(135deg, #7a1640 0%, #931C4A 100%)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                        <Box>
                            <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>{classeDetail?.rObj?.nome}</Typography>
                            <Typography className="esteban" sx={{ fontSize: 11, opacity: 0.8 }}>{classeDetail?.classDisplayName}</Typography>
                        </Box>
                        <IconButton onClick={() => setClasseDetail(null)} sx={{ color: '#fff' }} size="small"><CloseIcon /></IconButton>
                    </DialogTitle>
                    <DialogContent sx={{ backgroundColor: '#fdf5f8', pt: 2 }}>
                        {classeDetail?.rObj?.descricao && (
                            <Typography className="esteban" variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.7, color: '#5c3344', mb: classeDetail.rObj.habilidades?.length ? 2 : 0 }}>
                                {classeDetail.rObj.descricao}
                            </Typography>
                        )}
                        {classeDetail?.rObj?.habilidades?.length > 0 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {classeDetail.rObj.habilidades.map((sub, si) => (
                                    <Box key={si} sx={{ pl: 1, borderLeft: '3px solid #c48fa3', backgroundColor: 'var(--surface-paper)', borderRadius: 1, p: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                                            <Typography className="esteban" sx={{ fontWeight: 'bold', color: '#7a1640', fontSize: 13 }}>▸ {sub.nome}</Typography>
                                            {sub.tipo && <Chip label={sub.tipo} size="small" sx={{ height: 16, fontSize: 9, backgroundColor: '#f0d0dd', color: '#7a1640' }} />}
                                        </Box>
                                        <Typography className="esteban" variant="body2" sx={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.5 }}>{sub.descricao}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: '#fdf5f8', borderTop: '1px solid #931C4A44', px: 2, py: 1 }}>
                        <Button onClick={() => setClasseDetail(null)} sx={{ color: '#931C4A', fontFamily: 'Esteban, serif' }}>Fechar</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    };

    /* ── Pontos de regalia (total e gastos) ── */
    const pontosTotal = calcularPontosRegaliaTotal(character.nivel || 1);

    const pontosGastos = useMemo(() => calcularPontosGastos(character.regaliasCompradas), [character.regaliasCompradas]);

    const pontosRestantes = pontosTotal - pontosGastos;

    /* ── Contagens para tabs ── */
    const aprendizCount = Object.keys(character.regalias_de_aprendiz?.RegaliasDeAprendizSelecionada || {}).length;
    const especieCount = (character.regalias_de_especie || []).filter(r => r?.especie).length;
    const profissaoCount = (character.regalias_de_profissao || []).filter(r => r?.nome).length;
    const classeCount = Object.keys(character.regalias_de_classe || {}).length;

    /* ── Helper: aplicar bônus de regalia aos campos top-level do character ── */
    const aplicarBonusDeRegalia = (prev, bonus) => {
        if (!bonus) return {};
        const updates = {};
        if (bonus.pv) {
            updates.pv_regalia_classe = (prev.pv_regalia_classe || 0) + bonus.pv;
            updates.pv_atual = (prev.pv_atual !== undefined ? prev.pv_atual : 0) + bonus.pv;
        }
        if (bonus.estamina) {
            updates.pe_regalia_classe = (prev.pe_regalia_classe || 0) + bonus.estamina;
            updates.pe_atual = (prev.pe_atual !== undefined ? prev.pe_atual : 0) + bonus.estamina;
        }
        if (bonus.magia) {
            updates.pm_regalia_classe = (prev.pm_regalia_classe || 0) + bonus.magia;
            updates.pm_atual = (prev.pm_atual !== undefined ? prev.pm_atual : 0) + bonus.magia;
        }
        return updates;
    };

    /* ── Comprar regalia: batch atômico + auto-save ── */
    const handlePurchaseRegalia = useCallback((tipo, id, extra = {}) => {
        const custo = extra.custo || 1;

        // Usamos setCharacter(prev => ...) para garantir batch atômico
        if (setCharacter) {
            setCharacter(prev => {
                if (!prev) return prev;
                const updated = { ...prev };
                updated.regaliasCompradas = { ...(prev.regaliasCompradas || {}), [id]: custo };

                if (tipo === 'aprendiz') {
                    const reg = getRegaliaAprendiz(id);
                    if (reg) {
                        const aprendizAtual = { ...(prev.regalias_de_aprendiz?.RegaliasDeAprendizSelecionada || {}) };
                        if (!aprendizAtual[id]) aprendizAtual[id] = reg;
                        updated.regalias_de_aprendiz = { RegaliasDeAprendizSelecionada: aprendizAtual };
                        if (reg.bonusPorRegalia) Object.assign(updated, aplicarBonusDeRegalia(prev, reg.bonusPorRegalia));
                    }
                } else if (tipo === 'primaria') {
                    const classe = getClassePrimaria(id);
                    if (classe) {
                        const regaliasClasse = { ...(prev.regalias_de_classe || {}) };
                        if (!regaliasClasse[id]) {
                            regaliasClasse[id] = [{
                                nome: classe.habilidadeClasse?.nome || classe.nome,
                                descricao: classe.habilidadeClasse?.descricao || '',
                                habilidades: classe.habilidadeClasse?.subHabilidades || [],
                                opcoesPontosFeiticaria: classe.habilidadeClasse?.opcoesPontosFeiticaria || null,
                                autoIncluded: true,
                            }];
                        }
                        updated.regalias_de_classe = regaliasClasse;
                        if (classe.bonusPorRegalia) Object.assign(updated, aplicarBonusDeRegalia(prev, classe.bonusPorRegalia));
                    }
                } else if (tipo === 'arvore_nivel') {
                    if (extra.classeId && extra.nivelData) {
                        const regaliasClasse = { ...(prev.regalias_de_classe || {}) };
                        const classeEntries = [...(regaliasClasse[extra.classeId] || [])];
                        const nv = extra.nivelData;
                        // Montar descrição rica
                        let desc = '';
                        if (nv.bonusHabilidades && Object.keys(nv.bonusHabilidades).length > 0) {
                            desc += Object.entries(nv.bonusHabilidades).map(([k, v]) => `+${v} ${k}`).join(', ');
                        }
                        if (nv.escolhasHabilidades?.length > 0) {
                            const escs = nv.escolhasHabilidades.map(e => `+${e.pontos} ${e.grupo.join(' ou ')}`);
                            desc += (desc ? '; ' : '') + escs.join(', ');
                        }
                        if (nv.habilidadeGanha) {
                            desc += (desc ? '\n' : '') + `🎯 ${nv.habilidadeGanha.nome}: ${nv.habilidadeGanha.descricao || nv.habilidadeGanha.tipo || ''}`;
                        }
                        if (nv.proficienciasGanhas?.length > 0) {
                            desc += (desc ? '\n' : '') + `🛡️ Proficiências: ${nv.proficienciasGanhas.join(', ')}`;
                        }
                        classeEntries.push({
                            nome: `${extra.arvoreNome || ''} — Nível ${extra.nivel}`,
                            descricao: desc,
                        });
                        regaliasClasse[extra.classeId] = classeEntries;
                        updated.regalias_de_classe = regaliasClasse;
                        // Aplicar bônus da classe por cada regalia comprada
                        const classe = getClassePrimaria(extra.classeId);
                        if (classe?.bonusPorRegalia) Object.assign(updated, aplicarBonusDeRegalia(prev, classe.bonusPorRegalia));
                    }
                } else if (tipo === 'avulsa') {
                    if (extra.classeId && extra.avulsaData) {
                        const regaliasClasse = { ...(prev.regalias_de_classe || {}) };
                        const classeEntries = [...(regaliasClasse[extra.classeId] || [])];
                        classeEntries.push({
                            nome: extra.avulsaData.nome,
                            descricao: extra.avulsaData.descricao || '',
                        });
                        regaliasClasse[extra.classeId] = classeEntries;
                        updated.regalias_de_classe = regaliasClasse;
                        // Aplicar bônus da classe por cada regalia comprada
                        const classe = getClassePrimaria(extra.classeId);
                        if (classe?.bonusPorRegalia) Object.assign(updated, aplicarBonusDeRegalia(prev, classe.bonusPorRegalia));
                    }
                } else if (tipo === 'especializacao') {
                    const esp = getEspecializacao(id);
                    if (esp) {
                        const regaliasEsp = { ...(prev.regalias_de_especialization || {}) };
                        if (!regaliasEsp[id]) {
                            regaliasEsp[id] = [{ nome: esp.nome, descricao: esp.habilidadeClasse?.descricao || esp.descricao || '' }];
                        }
                        updated.regalias_de_especialization = regaliasEsp;
                        if (esp.bonusPorRegalia) Object.assign(updated, aplicarBonusDeRegalia(prev, esp.bonusPorRegalia));
                    }
                } else if (tipo === 'opcional') {
                    if (extra.tipo && extra.opcao) {
                        const regaliaOpcArr = [...(prev.regaliasOpcionais || [])];
                        const alreadyOwned = regaliaOpcArr.some(r => r.tipo === extra.tipo && r.opcao === extra.opcao);
                        if (!alreadyOwned) {
                            regaliaOpcArr.push({ tipo: extra.tipo, opcao: extra.opcao });
                        }
                        updated.regaliasOpcionais = regaliaOpcArr;
                    }
                } else if (tipo === 'especie_extra') {
                    // Regalias extras de espécie — cada uma é comprada individualmente, sem exclusividade
                    const novasCompradas = { ...(prev.regaliasCompradas || {}) };
                    novasCompradas[id] = custo;
                    updated.regaliasCompradas = novasCompradas;
                } else if (tipo === 'especie_subraca') {
                    if (extra.subracaNome) {
                        // Remove a sub-raça anterior (só uma ativa por vez)
                        const cleanedCompradas = Object.fromEntries(
                            Object.entries(prev.regaliasCompradas || {}).filter(([k]) => !k.startsWith('especie_subraca:'))
                        );
                        cleanedCompradas[id] = custo;
                        updated.regaliasCompradas = cleanedCompradas;

                        // Atualiza regalias_de_especie para refletir a nova sub-raça ativa
                        const especieNome = extra.especieNome || (especies[prev.especie]?.nome) || prev.especie || 'Humano';
                        const regEspecie = [...(prev.regalias_de_especie || [])];
                        const subracaNames = (especies[prev.especie]?.obrigatorias || []).map(s => s.nome);
                        // Encontrar índice da entrada de sub-raça (não é variante opcional)
                        const idx = regEspecie.findIndex(g => g?.regalias?.length > 0 && subracaNames.includes(g.regalias[0]));
                        const newEntry = { especie: especieNome, regalias: [extra.subracaNome] };
                        if (idx >= 0) {
                            regEspecie[idx] = newEntry;
                        } else {
                            regEspecie.push(newEntry);
                        }
                        updated.regalias_de_especie = regEspecie;
                    }
                }
                // Auto-save ao backend
                autoSave(updated);
                return updated;
            });
        }
    }, [setCharacter, autoSave]);

    return (
        <Card sx={{ mt: 0, ...sectionStyle }}>
            <CardHeader sx={cardHeaderStyle} titleTypographyProps={{ component: 'div' }} title={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography className="esteban" component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><StarIcon /> Regalias</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Button
                            variant="contained" size="small"
                            startIcon={<ShoppingCartIcon />}
                            onClick={() => setShopOpen(true)}
                            sx={{
                                backgroundColor: '#BB8130', fontSize: '12px', textTransform: 'none',
                                '&:hover': { backgroundColor: '#AB6422' },
                            }}
                        >
                            Loja de Regalias
                        </Button>
                        <Chip
                            label={`${pontosRestantes}/${pontosTotal} pts`}
                            sx={{
                                backgroundColor: pontosRestantes > 0 ? '#4CAF50' : '#f44336',
                                color: 'white', fontWeight: 'bold',
                            }}
                        />
                    </Box>
                </Box>
            } />
            <CardContent>
                {editMode && (
                    <EditableField type="number" label="Pontos de Regalia (Total)" value={pontosTotal}
                        onChange={(val) => updateField('pontos_de_regalia', Math.max(0, parseInt(val) || 0))} sx={{ mb: 2 }} />
                )}
                <Tabs value={activeTab} onChange={(_e, v) => setActiveTab(v)} variant="scrollable" scrollButtons="auto"
                    sx={{
                        borderBottom: '2px solid #d0c8b8', mb: 1.5, minHeight: 36,
                        '& .MuiTab-root': {
                            textTransform: 'none', fontWeight: 600, minHeight: 36, fontSize: '12px', py: 0.5,
                            color: 'var(--text-primary)', opacity: 1,
                            '&:hover': { color: 'var(--text-primary)', backgroundColor: 'rgba(187,129,48,0.06)' },
                        },
                        '& .Mui-selected': { color: 'var(--text-primary) !important', fontWeight: 'bold' },
                        '& .MuiTabs-indicator': { backgroundColor: '#BB8130', height: 3, borderRadius: '3px 3px 0 0' },
                    }}
                >
                    <Tab icon={<StarIcon sx={{ fontSize: 14 }} />} iconPosition="start"
                        label={`Aprendiz${aprendizCount ? ` (${aprendizCount})` : ''}`} />
                    <Tab label={`Espécie${especieCount ? ` (${especieCount})` : ''}`} />
                    <Tab label={`Profissão${profissaoCount ? ` (${profissaoCount})` : ''}`} />
                    <Tab label={`Classe${classeCount ? ` (${classeCount})` : ''}`} />
                </Tabs>
                <Box role="tabpanel">
                    {activeTab === 0 && renderRegaliasAprendiz()}
                    {activeTab === 1 && renderRegaliasEspecie()}
                    {activeTab === 2 && renderRegaliasProfissao()}
                    {activeTab === 3 && renderRegaliasClasse()}
                </Box>
            </CardContent>

            {/* ── Modal da Loja de Regalias ── */}
            <Dialog
                open={shopOpen}
                onClose={() => setShopOpen(false)}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: { maxHeight: '90vh', borderRadius: 3 },
                }}
            >
                <DialogTitle component="div" sx={{
                    background: 'linear-gradient(135deg, #BB8130 0%, #AB6422 50%, #756A34 100%)',
                    color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <Typography className="esteban" variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ShoppingCartIcon /> Loja de Regalias
                    </Typography>
                    <IconButton onClick={() => setShopOpen(false)} sx={{ color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    <RegaliasShop
                        character={character}
                        onPurchase={handlePurchaseRegalia}
                    />
                </DialogContent>
            </Dialog>

            {/* ── Modal animado de rolagem de dados ── */}
            <DiceRollOverlay
                open={diceModal.open}
                habNome={diceModal.habNome}
                habTipo={diceModal.habTipo}
                rollEntries={diceModal.rollEntries}
                onClose={handleDiceModalClose}
            />

            {/* ── Feedback de uso de habilidade ── */}
            <Snackbar open={snack.open} autoHideDuration={4500} onClose={() => setSnack(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={() => setSnack(s => ({ ...s, open: false }))} severity={snack.severity} variant="filled" sx={{ width: '100%', fontSize: '12px' }}>
                    {snack.msg}
                </Alert>
            </Snackbar>
        </Card>
    );
});

export default RegaliasSection;
