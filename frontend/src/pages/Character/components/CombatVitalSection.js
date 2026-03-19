import React from 'react';
import {
    Box, Paper, Typography, TextField, Button, Chip, Divider,
    IconButton, Select, MenuItem, FormControl, InputLabel, useTheme,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ShieldIcon from '@mui/icons-material/Shield';
import SpeedIcon from '@mui/icons-material/Speed';
import CasinoIcon from '@mui/icons-material/Casino';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import HotelIcon from '@mui/icons-material/Hotel';
import { calcularVantagemDesvantagem, TIPOS_DANO, calcularDanoElemental } from '../../../data/constants';
import { atualizarPersonagem } from '../../../services/apiV2';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HealingIcon from '@mui/icons-material/Healing';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

/* ── Espaçamentos padronizados ─────────────────── */
const SP = { gap: 1.5, p: 1.5, radius: 2 };

/* ── Inline editable number (clique → input → blur salva) ── */
const InlineNum = ({ value, color, fontSize = '22px', onCommit }) => {
    const [editing, setEditing] = React.useState(false);
    const [local, setLocal]     = React.useState(value);
    React.useEffect(() => setLocal(value), [value]);
    const commit = () => { onCommit(parseInt(local) || 0); setEditing(false); };
    if (editing) return (
        <TextField type="number" size="small" value={local}
            onChange={e => setLocal(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && e.target.blur()}
            autoFocus sx={{ width: 55 }}
            inputProps={{ style: { textAlign: 'center', padding: '2px 4px', fontSize, fontWeight: 'bold', color } }} />
    );
    return (
        <Typography className="esteban" onClick={() => setEditing(true)}
            sx={{ color, fontWeight: 'bold', fontSize, cursor: 'pointer', lineHeight: 1,
                '&:hover': { textDecoration: 'underline', opacity: .8 } }}
            title="Clique para editar">{value}</Typography>
    );
};

/* ── VitalCard — card compacto com recurso vital + temp + breakdown ── */
const VitalCard = ({
    icon, label, atual, max, tempVal, color, bgColor,
    fieldAtual, fieldMax, fieldTemp, breakdown,
    editMode, updateField, onLive,
}) => {
    const clamp = (v, mn, mx) => Math.max(mn, Math.min(mx, v));
    const commitAtual = v => { const c = clamp(v, 0, max); updateField(fieldAtual, c); onLive?.(fieldAtual, c); };
    const commitTemp  = v => { const c = Math.max(0, v);    updateField(fieldTemp, c);  onLive?.(fieldTemp, c); };

    return (
        <Paper sx={{
            p: SP.p, borderRadius: SP.radius, background: bgColor,
            border: `2px solid ${color}`, boxShadow: `0 3px 10px ${color}22`,
            display: 'flex', flexDirection: 'column', gap: 0.5,
            flex: '1 1 0', minWidth: 150,
        }}>
            {/* Cabeçalho */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                {icon}
                <Typography className="esteban" sx={{ color, fontSize: 11, fontWeight: 'bold', letterSpacing: .3 }}>
                    {label}
                </Typography>
            </Box>
            {/* Valor principal: atual / max */}
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, justifyContent: 'center' }}>
                <InlineNum value={atual} color={color} onCommit={commitAtual} />
                <Typography sx={{ color, fontSize: 13 }}>
                    / {editMode
                        ? <InlineNum value={max} color={color} fontSize="13px"
                              onCommit={v => updateField(fieldMax, Math.max(0, v))} />
                        : max}
                </Typography>
            </Box>
            {/* Temp dentro do card */}
            <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 0.5, borderTop: `1px dashed ${color}55`, pt: 0.5,
            }}>
                <Typography sx={{ color, fontSize: 9, fontWeight: 'bold', opacity: .7 }}>TEMP</Typography>
                <InlineNum value={tempVal} color={color} fontSize="14px" onCommit={commitTemp} />
            </Box>
            {/* Breakdown de fontes */}
            {breakdown && (
                <Typography variant="caption" sx={{
                    color: 'var(--text-primary)', fontSize: 9, textAlign: 'center',
                    opacity: .75, lineHeight: 1.3,
                }}>
                    {breakdown}
                </Typography>
            )}
        </Paper>
    );
};

/* ── SmallStat — Defesa / Velocidade / Iniciativa compacto ── */
const SmallStat = ({ icon, label, value, sub, color, bgColor }) => (
    <Paper sx={{
        p: SP.p, borderRadius: SP.radius, background: bgColor,
        border: `2px solid ${color}`, textAlign: 'center',
        flex: '1 1 0', minWidth: 110,
        boxShadow: `0 3px 10px ${color}22`,
    }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: .5 }}>{icon}</Box>
        <Typography className="esteban" sx={{ color, fontSize: 10, fontWeight: 'bold' }}>{label}</Typography>
        <Typography className="esteban" sx={{ color, fontWeight: 'bold', fontSize: 22, lineHeight: 1 }}>{value}</Typography>
        {sub && <Typography variant="caption" sx={{ color: 'var(--text-primary)', fontSize: 9, display: 'block', opacity: .7 }}>{sub}</Typography>}
    </Paper>
);

/* ── Label legível para tipo de dano ── */
const DANO_LABELS = {
    cortante: 'Cortante', perfurante: 'Perfurante', impacto: 'Impacto',
    fogo: 'Fogo', gelo: 'Gelo', raio: 'Raio',
    terra: 'Terra', veneno: 'Veneno', necrotico: 'Necrótico',
    sombrio: 'Sombrio', arcano: 'Arcano', sagrado: 'Sagrado',
};

/* ── Elementos válidos para afinidade do personagem (encantamento de armadura) ── */
const ELEMENTOS_PERSONAGEM = [
    { value: '', label: 'Nenhum' },
    { value: 'fogo', label: '🔥 Fogo' },
    { value: 'gelo', label: '❄️ Gelo' },
    { value: 'raio', label: '⚡ Raio' },
    { value: 'terra', label: '🪨 Terra' },
    { value: 'sombrio', label: '🌑 Sombrio' },
    { value: 'sagrado', label: '✨ Sagrado' },
    { value: 'necrotico', label: '💀 Necrótico' },
    { value: 'arcano', label: '🔮 Arcano' },
];

/* ── HealDamageBar — input + botões Curar / Sofrer Dano ── */
const HealDamageBar = ({ pvAtual, pvMax, pvTemp, elementoPersonagem, updateField, onLive, isDark }) => {
    const [valor, setValor]         = React.useState('');
    const [tipoDano, setTipoDano]   = React.useState('');
    const [menuOpen, setMenuOpen]   = React.useState(false);
    const [feedback, setFeedback]   = React.useState(null);

    const numValor = Math.max(0, parseInt(valor) || 0);

    const aplicarCura = () => {
        if (numValor <= 0) return;
        const novo = Math.min(pvAtual + numValor, pvMax);
        updateField('pv_atual', novo);
        onLive?.('pv_atual', novo);
        setValor('');
        setFeedback(null);
    };

    const aplicarDano = () => {
        if (numValor <= 0 || !tipoDano) return;

        // Calcular dano com interação elemental
        const resultado = calcularDanoElemental(numValor, tipoDano, elementoPersonagem);
        const danoCalculado = resultado.danoFinal;

        // Se o resultado é cura (ex: necrótico vs necrótico)
        if (resultado.modificador === 'cura') {
            const novo = Math.min(pvAtual + Math.abs(danoCalculado), pvMax);
            updateField('pv_atual', novo);
            onLive?.('pv_atual', novo);
            setFeedback({ tipo: 'cura', texto: resultado.descricao });
            setValor('');
            setTipoDano('');
            return;
        }

        // Se imune
        if (resultado.modificador === 'imune') {
            setFeedback({ tipo: 'imune', texto: resultado.descricao });
            setValor('');
            setTipoDano('');
            return;
        }

        // Feedback de modificador
        if (resultado.descricao) {
            setFeedback({
                tipo: resultado.modificador,
                texto: `${resultado.descricao} → ${danoCalculado} de dano`,
            });
        } else {
            setFeedback(null);
        }

        let danoRestante = danoCalculado;
        let novoTemp = pvTemp;
        // Dano absorvido primeiro pela vida temporária
        if (novoTemp > 0) {
            const absorvido = Math.min(novoTemp, danoRestante);
            novoTemp -= absorvido;
            danoRestante -= absorvido;
            updateField('pv_temp', novoTemp);
            onLive?.('pv_temp', novoTemp);
        }
        const novoPv = Math.max(0, pvAtual - danoRestante);
        updateField('pv_atual', novoPv);
        onLive?.('pv_atual', novoPv);
        setValor('');
        setTipoDano('');
    };

    // Limpar feedback após 4s
    React.useEffect(() => {
        if (!feedback) return;
        const t = setTimeout(() => setFeedback(null), 4000);
        return () => clearTimeout(t);
    }, [feedback]);

    return (
        <Paper sx={{
            p: SP.p, borderRadius: SP.radius,
            backgroundColor: isDark ? 'var(--surface-default)' : '#f9f6f2',
            border: '1px solid var(--panel-border)',
            display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap',
        }}>
            {/* Botão Curar */}
            <Button
                size="small" variant="contained"
                startIcon={<HealingIcon sx={{ fontSize: 16 }} />}
                disabled={numValor <= 0 || pvAtual >= pvMax}
                onClick={aplicarCura}
                sx={{
                    backgroundColor: '#2e7d32', fontFamily: 'Esteban, serif', fontSize: 12,
                    textTransform: 'none', order: { xs: 2, sm: 1 },
                    '&:hover': { backgroundColor: '#1b5e20' },
                    '&.Mui-disabled': { backgroundColor: isDark ? '#1a2e1a' : '#c8e6c9', color: isDark ? '#555' : '#a5d6a7' },
                }}
            >
                Curar
            </Button>

            {/* Input de valor */}
            <TextField
                type="number"
                size="small"
                placeholder="Valor"
                value={valor}
                onChange={e => setValor(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        if (tipoDano) aplicarDano();
                        else if (numValor > 0) aplicarCura();
                    }
                }}
                inputProps={{ min: 0, style: { textAlign: 'center', padding: '6px 8px', fontFamily: 'Esteban, serif' } }}
                sx={{ width: 90, order: { xs: 1, sm: 2 }, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            {/* Select tipo de dano + Botão Sofrer Dano */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, order: { xs: 3, sm: 3 } }}>
                <FormControl size="small" sx={{ minWidth: 130 }}>
                    <InputLabel sx={{ fontFamily: 'Esteban, serif', fontSize: 13 }}>Tipo de Dano</InputLabel>
                    <Select
                        value={tipoDano}
                        label="Tipo de Dano"
                        open={menuOpen}
                        onOpen={() => setMenuOpen(true)}
                        onClose={() => setMenuOpen(false)}
                        onChange={e => setTipoDano(e.target.value)}
                        sx={{ fontSize: 12, fontFamily: 'Esteban, serif', backgroundColor: isDark ? 'var(--input-bg)' : 'white' }}
                    >
                        {TIPOS_DANO.map(t => (
                            <MenuItem key={t} value={t} sx={{ fontSize: 12, fontFamily: 'Esteban, serif' }}>
                                {DANO_LABELS[t] || t}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    size="small" variant="contained"
                    startIcon={<LocalFireDepartmentIcon sx={{ fontSize: 16 }} />}
                    disabled={numValor <= 0 || !tipoDano}
                    onClick={aplicarDano}
                    sx={{
                        backgroundColor: '#931C4A', fontFamily: 'Esteban, serif', fontSize: 12,
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#7a1640' },
                        '&.Mui-disabled': { backgroundColor: isDark ? '#2e1020' : '#f8d7e3', color: isDark ? '#555' : '#e1a3b8' },
                    }}
                >
                    Sofrer Dano
                </Button>
            </Box>

            {/* Elemento do Personagem */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, order: { xs: 4, sm: 4 } }}>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel sx={{ fontFamily: 'Esteban, serif', fontSize: 13 }}>Elemento</InputLabel>
                    <Select
                        value={elementoPersonagem || ''}
                        label="Elemento"
                        onChange={e => {
                            updateField('elemento_personagem', e.target.value);
                            onLive?.('elemento_personagem', e.target.value);
                        }}
                        sx={{ fontSize: 12, fontFamily: 'Esteban, serif', backgroundColor: isDark ? 'var(--input-bg)' : 'white' }}
                    >
                        {ELEMENTOS_PERSONAGEM.map(el => (
                            <MenuItem key={el.value} value={el.value} sx={{ fontSize: 12, fontFamily: 'Esteban, serif' }}>
                                {el.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Feedback elemental */}
            {feedback && (
                <Typography className="esteban" sx={{
                    width: '100%', order: 5, fontSize: 11, fontWeight: 'bold', px: 1, py: 0.5,
                    borderRadius: 1, textAlign: 'center',
                    ...(feedback.tipo === 'forte' && { color: '#d32f2f', backgroundColor: isDark ? '#3a1010' : '#ffebee' }),
                    ...(feedback.tipo === 'fraco' && { color: '#1565c0', backgroundColor: isDark ? '#0d1a2e' : '#e3f2fd' }),
                    ...(feedback.tipo === 'imune' && { color: '#6a1b9a', backgroundColor: isDark ? '#1a102e' : '#f3e5f5' }),
                    ...(feedback.tipo === 'cura' && { color: '#2e7d32', backgroundColor: isDark ? '#102e1a' : '#e8f5e9' }),
                }}>
                    {feedback.texto}
                </Typography>
            )}
        </Paper>
    );
};

/* ════════════════════════════════════════════════════════════
   CombatVitalSection — Layout compacto em flexbox
   ════════════════════════════════════════════════════════════ */
const CombatVitalSection = ({
    character, editMode, statsDerivados,
    sectionStyle, cardHeaderStyle, updateField,
    baseUrl, setCharacter,
    armasEquipadas, armaduraEquipada, escudoEquipado,
    equiparArma, equiparArmadura, equiparEscudo,
    rollDice, rollAttackWithAdvantage, rollSkillCheck, rollWeaponDamage,
    vantagens, setVantagens, desvantagens, setDesvantagens,
    nivelLuz, setNivelLuz, dadoSelecionado, setDadoSelecionado,
    quantidadeDados, setQuantidadeDados, diceRolling,
    onRollCustom, onRollD20, getPenalidadeLuzAtual, DADOS_DISPONIVEIS,
    aplicarDescansoCurto, aplicarDescansoLongo,
}) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const iniciativaColor = isDark ? 'var(--text-primary)' : '#5B1F0F';
    const iniciativaBg    = isDark ? 'var(--surface-warm)'  : '#ebe5e3';

    /* ── Auto-save individual ── */
    const handleLive = React.useCallback(async (field, value) => {
        if (!character?.id) return;
        try {
            await atualizarPersonagem(character.id, { ...character, [field]: value });
        } catch (e) { console.error('Erro save:', e); }
    }, [character]);

    if (!statsDerivados) return null;

    const {
        pvMax, peMax, pmMax, pvAtual, peAtual, pmAtual,
        especieBaseVida = 0, regaliaClasseVida = 0,
        regaliaClasseEstamina = 0, regaliaClasseMagia = 0,
        defesaTotal, velocidadeTotal: velocidade, iniciativa, velocidadeInfo,
        armaduraPesada, defesaArmadura, defesaEscudo, bonusDefAgi,
        fortitude = 0, agilidade = 0, percepcao = 0, arcanismo = 0, atletismo = 0,
        penalidadesForca,
    } = statsDerivados;

    const habilidades  = character.habilidades || {};
    const equipamentos = character.equipamentos || [];

    const corpoACorpo = habilidades['Combate Corpo a Corpo'] || 0;
    const distancia   = habilidades['Combate a Distância'] || 0;
    const arcano      = habilidades['Combate Arcano'] || 0;

    const atkCards = [
        { label: 'Corpo a Corpo', bonus: corpoACorpo, color: isDark ? 'var(--text-primary)' : '#7B3311', bg: isDark ? 'var(--surface-warm)'    : '#f5ebe3' },
        { label: 'À Distância',   bonus: distancia,    color: 'var(--text-primary)',                   bg: isDark ? 'var(--surface-default)' : '#e8eae5' },
        { label: 'Arcano',        bonus: arcano,       color: isDark ? 'var(--text-primary)' : '#162A22', bg: isDark ? 'var(--surface-alt)'     : '#e3e7e5' },
    ];

    const habilidadesUteis = [
        { nome: 'Atletismo',   valor: habilidades['Atletismo'] || 0 },
        { nome: 'Acrobacia',   valor: habilidades['Acrobacia'] || 0 },
        { nome: 'Furtividade', valor: habilidades['Furtividade'] || 0 },
        { nome: 'Percepção',   valor: habilidades['Percepção'] || 0 },
        { nome: 'Intuição',    valor: habilidades['Intuição'] || 0 },
    ];

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

    const vantagemInfo = vantagens !== undefined ? calcularVantagemDesvantagem(vantagens, desvantagens) : null;
    const luzInfo = getPenalidadeLuzAtual ? getPenalidadeLuzAtual() : null;

    return (
        <Paper elevation={4} sx={{ ...sectionStyle, mb: 2, overflow: 'hidden' }}>
            {/* ─── Header ── */}
            <Box sx={cardHeaderStyle}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CasinoIcon />
                        <Typography className="esteban" variant="h6" component="div">
                            Atributos Vitais &amp; Combate
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            size="small"
                            variant="contained"
                            startIcon={<HotelIcon fontSize="small" />}
                            onClick={aplicarDescansoCurto}
                            sx={{
                                backgroundColor: '#454E30', fontFamily: 'Esteban, serif', fontSize: 11,
                                '&:hover': { backgroundColor: '#2F3C29' },
                            }}
                        >
                            Descanso Curto
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            startIcon={<HotelIcon fontSize="small" />}
                            onClick={aplicarDescansoLongo}
                            sx={{
                                backgroundColor: '#162A22', fontFamily: 'Esteban, serif', fontSize: 11,
                                '&:hover': { backgroundColor: '#0d1a15' },
                            }}
                        >
                            Descanso Longo
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>

                {/* ═══ 1. Pontos Vitais — flexbox em linha ═══ */}
                <Box sx={{ display: 'flex', gap: SP.gap, flexWrap: 'wrap' }}>
                    <VitalCard
                        icon={<FavoriteIcon sx={{ color: '#931C4A', fontSize: 22 }} />}
                        label="VIDA (PV)" atual={pvAtual} max={pvMax}
                        tempVal={character.pv_temp || 0}
                        color={isDark ? 'var(--text-primary)' : '#931C4A'} bgColor={isDark ? 'var(--surface-warm)' : '#f8e8ed'}
                        fieldAtual="pv_atual" fieldMax="pv_base_especie" fieldTemp="pv_temp"
                        breakdown={`Base ${especieBaseVida} + Fort ×2 (${fortitude * 2}) + Classe ${regaliaClasseVida}`}
                        editMode={editMode} updateField={updateField} onLive={handleLive}
                    />

                    <VitalCard
                        icon={<BoltIcon sx={{ color: '#AB6422', fontSize: 22 }} />}
                        label="ESTAMINA (PE)" atual={peAtual} max={peMax}
                        tempVal={character.pe_temp || 0}
                        color={isDark ? 'var(--text-primary)' : '#AB6422'} bgColor={isDark ? 'var(--surface-default)' : '#f5ede4'}
                        fieldAtual="pe_atual" fieldMax="pe_regalia_classe" fieldTemp="pe_temp"
                        breakdown={`10 + Atletismo ${atletismo}${atletismo >= 10 ? ' + Bônus 5' : ''} + Classe ${regaliaClasseEstamina}`}
                        editMode={editMode} updateField={updateField} onLive={handleLive}
                    />

                    <VitalCard
                        icon={<AutoFixHighIcon sx={{ color: 'var(--text-primary)', fontSize: 22 }} />}
                        label="MAGIA (PM)" atual={pmAtual} max={pmMax}
                        tempVal={character.pm_temp || 0}
                        color={isDark ? 'var(--text-primary)' : '#454E30'} bgColor={isDark ? 'var(--surface-alt)' : '#e8eae5'}
                        fieldAtual="pm_atual" fieldMax="pm_regalia_classe" fieldTemp="pm_temp"
                        breakdown={`Arcanismo ${arcanismo}${arcanismo >= 10 ? ' + Bônus 5' : ''} + Classe ${regaliaClasseMagia}`}
                        editMode={editMode} updateField={updateField} onLive={handleLive}
                    />

                    {/* Defesa */}
                    <Paper sx={{
                        p: SP.p, borderRadius: SP.radius, background: isDark ? 'var(--surface-warm)' : '#e5e8e4',
                        border: '2px solid #2F3C29', flex: '1 1 0', minWidth: 150,
                        display: 'flex', flexDirection: 'column', gap: 0.5,
                        boxShadow: '0 3px 10px #2F3C2922',
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: .75 }}>
                            <ShieldIcon sx={{ color: isDark ? 'var(--text-primary)' : '#2F3C29', fontSize: 22 }} />
                            <Typography className="esteban" sx={{ color: isDark ? 'var(--text-primary)' : '#2F3C29', fontSize: 11, fontWeight: 'bold' }}>
                                DEFESA
                            </Typography>
                        </Box>
                        <Typography className="esteban" sx={{
                            color: isDark ? 'var(--text-primary)' : '#2F3C29', fontWeight: 'bold', fontSize: 22,
                            textAlign: 'center', lineHeight: 1,
                        }}>
                            {defesaTotal}
                        </Typography>
                        <Typography variant="caption" sx={{
                            color: 'var(--text-primary)', fontSize: 9, textAlign: 'center', opacity: .75,
                        }}>
                            {armaduraPesada
                                ? `Pesada ${defesaArmadura} + Escudo ${defesaEscudo}`
                                : `7 + Agi ${bonusDefAgi || 0} + Arm ${defesaArmadura} + Esc ${defesaEscudo}`}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: .5, flexWrap: 'wrap', justifyContent: 'center' }}>
                            {armaduraEquipada && <Chip size="small" label={`🛡️ ${armaduraEquipada.name}`} sx={{ backgroundColor: isDark ? 'var(--surface-raised)' : '#d5dbd4', fontSize: 10, height: 20 }} />}
                            {escudoEquipado && <Chip size="small" label={`🔰 ${escudoEquipado.name}`} sx={{ backgroundColor: isDark ? 'var(--surface-raised)' : '#d5dbd4', fontSize: 10, height: 20 }} />}
                        </Box>
                    </Paper>

                    {/* Velocidade */}
                    <SmallStat
                        icon={<SpeedIcon sx={{ color: isDark ? 'var(--text-primary)' : '#756A34', fontSize: 22 }} />}
                        label="VELOCIDADE" value={`${velocidade}m`}
                        color={isDark ? 'var(--text-primary)' : '#756A34'} bgColor={isDark ? 'var(--surface-alt)' : '#edecd8'}
                        sub={velocidadeInfo
                            ? `Base ${velocidadeInfo.baseEspecie || '-'} + Agi ${velocidadeInfo.bonusAgilidade || 0}`
                            : null}
                    />

                    {/* Iniciativa */}
                    <SmallStat
                        icon={<CasinoIcon sx={{ color: 'var(--text-primary)', fontSize: 22 }} />}
                        label="INICIATIVA" value={`+${iniciativa}`}
                        color={iniciativaColor} bgColor={iniciativaBg}
                        sub={`Agi ${agilidade} + Per ${percepcao}`}
                    />
                </Box>

                {/* ═══ Cura / Dano rápido ═══ */}
                <HealDamageBar
                    pvAtual={pvAtual} pvMax={pvMax}
                    pvTemp={character.pv_temp || 0}
                    elementoPersonagem={character.elemento_personagem || ''}
                    updateField={updateField}
                    onLive={handleLive}
                    isDark={isDark}
                />

                {/* Alerta: penalidade de forca em armadura pesada */}
                {penalidadesForca && !penalidadesForca.atendido && (
                    <Box sx={{
                        display: 'flex', alignItems: 'flex-start', gap: 1,
                        backgroundColor: isDark ? '#3a1a00' : '#fff3e0',
                        border: '1px solid #e65100',
                        borderRadius: 2, px: 1.5, py: 1,
                    }}>
                        <WarningAmberIcon sx={{ color: '#e65100', fontSize: 18, mt: '2px', flexShrink: 0 }} />
                        <Box>
                            <Typography className="esteban" sx={{ fontSize: 11, fontWeight: 'bold', color: '#e65100' }}>
                                Forca insuficiente para {armaduraEquipada?.name} (req. {penalidadesForca.requisitoForca}, tem {penalidadesForca.requisitoForca - penalidadesForca.pontosFaltando})
                            </Typography>
                            <Typography className="esteban" sx={{ fontSize: 10, color: isDark ? '#ffcc80' : '#bf360c', mt: 0.25 }}>
                                {'-'}{Math.abs(penalidadesForca.penalidadeVelocidadeExtra)}m velocidade (ja aplicado)
                                {'  •  -'}{Math.abs(penalidadesForca.penalidadeAcerto)} em testes de combate
                                {'  •  andar/correr custa 2 acoes'}
                            </Typography>
                        </Box>
                    </Box>
                )}

                {/* ═══ 2. Equipar Itens (Box) + Armas Equipadas — lado a lado ═══ */}
                <Box sx={{ display: 'flex', gap: SP.gap, flexWrap: 'wrap' }}>
                    {/* Equipar Itens */}
                    <Paper sx={{ p: SP.p, borderRadius: SP.radius, flex: '1 1 280px', backgroundColor: 'var(--surface-default)' }}>
                        <Typography className="esteban" sx={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: 13, mb: 1 }}>
                            🎒 Equipar Itens
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <FormControl size="small" sx={{ flex: '1 1 120px' }}>
                                    <InputLabel>Arma Principal</InputLabel>
                                    <Select value={armasEquipadas[0]?.name || ''} label="Arma Principal"
                                        onChange={e => equiparArma(armasDisponiveis.find(x => x.name === e.target.value) || null, 0)}>
                                        <MenuItem value="">Nenhuma</MenuItem>
                                        {armasDisponiveis.map((a, i) => <MenuItem key={i} value={a.name}>{a.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <FormControl size="small" sx={{ flex: '1 1 120px' }}>
                                    <InputLabel>Arma Secundária</InputLabel>
                                    <Select value={armasEquipadas[1]?.name || ''} label="Arma Secundária"
                                        onChange={e => equiparArma(armasDisponiveis.find(x => x.name === e.target.value) || null, 1)}>
                                        <MenuItem value="">Nenhuma</MenuItem>
                                        {armasDisponiveis.map((a, i) => <MenuItem key={i} value={a.name}>{a.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <FormControl size="small" sx={{ flex: '1 1 120px' }}>
                                    <InputLabel>Armadura</InputLabel>
                                    <Select value={armaduraEquipada?.name || ''} label="Armadura"
                                        onChange={e => equiparArmadura(armadurasDisponiveis.find(x => x.name === e.target.value) || null)}>
                                        <MenuItem value="">Nenhuma</MenuItem>
                                        {armadurasDisponiveis.map((a, i) => <MenuItem key={i} value={a.name}>{a.name} (+{a.defesa || 0})</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <FormControl size="small" sx={{ flex: '1 1 120px' }}>
                                    <InputLabel>Escudo</InputLabel>
                                    <Select value={escudoEquipado?.name || ''} label="Escudo"
                                        onChange={e => equiparEscudo(escudosDisponiveis.find(x => x.name === e.target.value) || null)}>
                                        <MenuItem value="">Nenhum</MenuItem>
                                        {escudosDisponiveis.map((a, i) => <MenuItem key={i} value={a.name}>{a.name} (+{a.defesa || 0})</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Paper>

                    {/* Armas Equipadas */}
                    <Paper sx={{ p: SP.p, borderRadius: SP.radius, flex: '1 1 280px', backgroundColor: 'var(--surface-default)' }}>
                        <Typography className="esteban" sx={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: 13, mb: 1 }}>
                            🗡️ Armas Equipadas
                        </Typography>
                        {(armasEquipadas[0] || armasEquipadas[1]) ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {armasEquipadas.filter(Boolean).map((arma, idx) => (
                                    <Paper key={idx} sx={{
                                        p: 1, backgroundColor: isDark ? 'var(--surface-warm)' : '#f5ebe3',
                                        borderLeft: '3px solid #7B3311',
                                        display: 'flex', flexDirection: 'column', gap: .5,
                                    }}>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: 13, color: 'var(--text-primary)' }}>
                                            {arma.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: .75, flexWrap: 'wrap', alignItems: 'center' }}>
                                            {arma.dano && <>
                                                <Button size="small" variant="contained" startIcon={<CasinoIcon />}
                                                    onClick={() => rollWeaponDamage(arma.dano, arma.name, false, arma)}
                                                    sx={{ backgroundColor: '#931C4A', fontSize: 10, py: .25, '&:hover': { backgroundColor: '#7a1640' } }}>
                                                    Dano: {arma.dano}
                                                </Button>
                                                <Button size="small" variant="outlined"
                                                    onClick={() => rollWeaponDamage(arma.dano, arma.name, true, arma)}
                                                    sx={{ borderColor: '#7B3311', color: isDark ? 'var(--text-primary)' : '#7B3311', fontSize: 10, py: .25 }}>
                                                    💀 CRIT
                                                </Button>
                                            </>}
                                            {arma.ataque && (
                                                <Button size="small" variant="contained" startIcon={<CasinoIcon />}
                                                    onClick={() => rollAttackWithAdvantage(parseInt(arma.ataque) || 0, `Ataque com ${arma.name}`)}
                                                    sx={{ backgroundColor: 'var(--action-bg)', fontSize: 10, py: .25, '&:hover': { backgroundColor: '#0d1a15' } }}>
                                                    Ataque: +{arma.ataque}
                                                </Button>
                                            )}
                                            {arma.critico && (
                                                <Typography variant="caption" sx={{ color: isDark ? 'var(--text-muted)' : '#BB8130', fontSize: 10 }}>
                                                    Crit: {arma.critico}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                        ) : (
                            <Typography variant="body2" sx={{ color: isDark ? 'var(--text-muted)' : '#756A34', fontStyle: 'italic', fontSize: 12 }}>
                                Nenhuma arma equipada.
                            </Typography>
                        )}
                    </Paper>
                </Box>

                {/* ═══ 3. Testes Rápidos + Config Combate — lado a lado ═══ */}
                <Box sx={{ display: 'flex', gap: SP.gap, flexWrap: 'wrap' }}>
                    {/* Testes Rápidos */}
                    <Paper sx={{ p: SP.p, borderRadius: SP.radius, flex: '1 1 280px', backgroundColor: 'var(--surface-default)' }}>
                        <Typography className="esteban" sx={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: 13, mb: 1 }}>
                            🎯 Testes Rápidos
                        </Typography>

                        <Typography variant="caption" sx={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: 10 }}>
                            Ataques:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: .75, mt: .5, mb: 1, flexWrap: 'wrap' }}>
                            {atkCards.map(atk => (
                                <Paper key={atk.label}
                                    onClick={() => rollAttackWithAdvantage(atk.bonus, atk.label)}
                                    sx={{
                                        p: 1, flex: '1 1 80px', textAlign: 'center',
                                        backgroundColor: atk.bg, borderLeft: `3px solid ${atk.color}`,
                                        cursor: 'pointer', transition: 'all .15s',
                                        '&:hover': { transform: 'scale(1.02)', boxShadow: 3 },
                                    }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: .25 }}>
                                        <CasinoIcon sx={{ color: atk.color, fontSize: 14 }} />
                                        <Typography className="esteban" sx={{ fontSize: 10, color: atk.color }}>
                                            {atk.label}
                                        </Typography>
                                    </Box>
                                    <Typography className="esteban" sx={{
                                        fontWeight: 'bold', fontSize: 16, color: atk.color, lineHeight: 1,
                                    }}>
                                        d20 +{atk.bonus}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>

                        <Paper onClick={() => rollDice(20, 1, iniciativa, 'Iniciativa')}
                            sx={{
                                p: 1, textAlign: 'center', backgroundColor: 'var(--surface-alt)',
                                borderLeft: '3px solid var(--color-title)', cursor: 'pointer',
                                transition: 'all .15s', mb: 1,
                                '&:hover': { transform: 'scale(1.01)', boxShadow: 3 },
                            }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: .5 }}>
                                <CasinoIcon sx={{ color: 'var(--text-primary)', fontSize: 14 }} />
                                <Typography className="esteban" sx={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: 13 }}>
                                    Iniciativa: d20 +{iniciativa}
                                </Typography>
                            </Box>
                        </Paper>

                        <Typography variant="caption" sx={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: 10 }}>
                            Outros:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: .5, flexWrap: 'wrap', mt: .5 }}>
                            {habilidadesUteis.map((h, i) => (
                                <Button key={i} size="small" variant="outlined"
                                    onClick={() => rollSkillCheck(h.valor, h.nome)}
                                    sx={{
                                        borderColor: '#756A34', color: 'var(--text-primary)', fontSize: 9,
                                        py: 0, minWidth: 0,
                                        '&:hover': { backgroundColor: 'var(--surface-default)' },
                                    }}>
                                    {h.nome}: +{h.valor}
                                </Button>
                            ))}
                        </Box>
                    </Paper>

                    {/* Config Combate */}
                    {vantagemInfo && (
                        <Paper sx={{ p: SP.p, borderRadius: SP.radius, flex: '1 1 280px', backgroundColor: 'var(--surface-default)' }}>
                            <Typography className="esteban" sx={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: 13, mb: 1 }}>
                                ⚙️ Configurações de Combate
                            </Typography>

                            {/* Vantagem / Desvantagem */}
                            <Typography variant="caption" sx={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: 10 }}>
                                Vantagem / Desvantagem
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 1, mt: .5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: .5 }}>
                                    <Typography variant="body2" sx={{ color: 'var(--text-primary)', fontSize: 11 }}>Vant:</Typography>
                                    <IconButton size="small" onClick={() => setVantagens(Math.max(0, vantagens - 1))} disabled={vantagens === 0}>
                                        <Typography sx={{ fontSize: 14 }}>-</Typography>
                                    </IconButton>
                                    <Chip label={vantagens} color="success" size="small" sx={{ height: 20, fontSize: 11 }} />
                                    <IconButton size="small" onClick={() => setVantagens(vantagens + 1)}>
                                        <Typography sx={{ fontSize: 14 }}>+</Typography>
                                    </IconButton>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: .5 }}>
                                    <Typography variant="body2" sx={{ color: isDark ? 'var(--text-primary)' : '#931C4A', fontSize: 11 }}>Desv:</Typography>
                                    <IconButton size="small" onClick={() => setDesvantagens(Math.max(0, desvantagens - 1))} disabled={desvantagens === 0}>
                                        <Typography sx={{ fontSize: 14 }}>-</Typography>
                                    </IconButton>
                                    <Chip label={desvantagens} color="error" size="small" sx={{ height: 20, fontSize: 11 }} />
                                    <IconButton size="small" onClick={() => setDesvantagens(desvantagens + 1)}>
                                        <Typography sx={{ fontSize: 14 }}>+</Typography>
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography variant="caption" sx={{
                                color: 'var(--text-primary)', fontStyle: 'italic', fontSize: 9, display: 'block', mb: 1,
                            }}>
                                {vantagemInfo.descricao}
                            </Typography>

                            {/* Iluminação */}
                            <Typography variant="caption" sx={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: 10 }}>
                                Iluminação
                            </Typography>
                            <FormControl size="small" sx={{ mt: .5, mb: 1, width: '100%' }}>
                                <Select value={nivelLuz} onChange={e => setNivelLuz(e.target.value)}
                                    sx={{ backgroundColor: isDark ? 'var(--input-bg)' : 'white', fontSize: 12 }}>
                                    <MenuItem value="completa">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: .5 }}>
                                            <WbSunnyIcon sx={{ color: '#BB8130', fontSize: 16 }} /> Luz Completa
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="meia_luz">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: .5 }}>
                                            <NightsStayIcon sx={{ color: '#756A34', fontSize: 16 }} /> Meia Luz (-1)
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="escuridao">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: .5 }}>
                                            <NightsStayIcon sx={{ color: 'var(--text-primary)', fontSize: 16 }} /> Escuridão (Cego)
                                        </Box>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            {luzInfo && (
                                <Typography variant="caption" sx={{
                                    color: 'var(--text-primary)', fontStyle: 'italic', fontSize: 9, display: 'block', mb: 1,
                                }}>
                                    {luzInfo.nivelEfetivo}
                                    {luzInfo.penalidade > 0 && ` • -${luzInfo.penalidade}`}
                                    {luzInfo.condicaoCego && ' • Cego'}
                                </Typography>
                            )}

                            {/* Rolagem Custom */}
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="caption" sx={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: 10 }}>
                                🎲 Rolagem de Dados
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mt: .5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: .5 }}>
                                    <IconButton size="small"
                                        onClick={() => setQuantidadeDados(Math.max(1, quantidadeDados - 1))}
                                        disabled={quantidadeDados <= 1}>
                                        <Typography sx={{ fontSize: 14 }}>-</Typography>
                                    </IconButton>
                                    <Chip label={quantidadeDados} size="small" sx={{ minWidth: 28, height: 20, fontSize: 11 }} />
                                    <IconButton size="small"
                                        onClick={() => setQuantidadeDados(Math.min(20, quantidadeDados + 1))}
                                        disabled={quantidadeDados >= 20}>
                                        <Typography sx={{ fontSize: 14 }}>+</Typography>
                                    </IconButton>
                                </Box>
                                <FormControl size="small" sx={{ minWidth: 80 }}>
                                    <Select value={dadoSelecionado}
                                        onChange={e => setDadoSelecionado(e.target.value)}
                                        sx={{ backgroundColor: isDark ? 'var(--input-bg)' : 'white', fontSize: 12 }}>
                                        {DADOS_DISPONIVEIS.map(d => (
                                            <MenuItem key={d.valor} value={d.valor}>{d.nome}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button size="small" variant="contained"
                                    startIcon={<CasinoIcon sx={{ fontSize: 14 }} />}
                                    onClick={onRollCustom} disabled={diceRolling}
                                    sx={{ backgroundColor: 'var(--action-bg)', fontSize: 10, py: .25, '&:hover': { backgroundColor: '#0d1a15' } }}>
                                    {quantidadeDados}d{dadoSelecionado}
                                </Button>
                                <Button size="small" variant="outlined"
                                    startIcon={<CasinoIcon sx={{ fontSize: 14 }} />}
                                    onClick={() => onRollD20(0, 'Teste d20', vantagens, desvantagens)}
                                    disabled={diceRolling}
                                    sx={{
                                        fontSize: 10, py: .25,
                                        borderColor: vantagemInfo.tipo === 'vantagem' ? '#454E30' : vantagemInfo.tipo === 'desvantagem' ? '#931C4A' : '#162A22',
                                        color: isDark ? 'var(--text-primary)' : vantagemInfo.tipo === 'vantagem' ? '#454E30' : vantagemInfo.tipo === 'desvantagem' ? '#931C4A' : '#162A22',
                                    }}>
                                    d20 {vantagemInfo.tipo !== 'normal' && `(${vantagemInfo.dados}d20)`}
                                </Button>
                            </Box>
                        </Paper>
                    )}
                </Box>

            </Box>
        </Paper>
    );
};

export default CombatVitalSection;
