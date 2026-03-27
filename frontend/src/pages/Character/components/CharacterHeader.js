import React, { useState } from 'react';
import {
    Box, Paper, Typography, TextField, IconButton,
    Chip, Select, MenuItem, FormControl, InputLabel, Tooltip,
    Modal, Backdrop, Fade, useMediaQuery, useTheme, Grid,
    LinearProgress, Button, Dialog, DialogTitle, DialogContent,
    DialogActions, List, ListItem, ListItemButton, ListItemText,
    ListItemIcon, Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RestoreIcon from '@mui/icons-material/Restore';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UIcon from '../../../assets/images/userIcon.png';
import { especiesMap, determinarTamanho, calcularNivel, TABELA_XP_POR_NIVEL, calcularPontosRegaliaTotal, determinarClasseAtual } from '../../../data/constants';
import EditableField from './EditableField';

/* ── Espaçamentos padronizados (mesmo padrão CombatVitalSection) ── */
const SP = { gap: 1.5, p: 1.5, radius: 2 };

/* ── Campo de moeda inline ── */
const MoedaInput = ({ label, value, onChange, color, bgColor }) => (
    <Box sx={{ textAlign: 'center', p: 0.5, backgroundColor: bgColor, borderRadius: 1, flex: '1 1 50px', minWidth: 50 }}>
        <Typography variant="caption" sx={{ color: 'var(--text-primary)', display: 'block', fontSize: 10 }}>{label}</Typography>
        <TextField
            type="number" size="small" variant="standard"
            value={value} onChange={(e) => onChange(e.target.value)}
            InputProps={{ disableUnderline: false, sx: { color: `${color} !important` } }}
            inputProps={{ min: 0, inputMode: 'numeric', style: { textAlign: 'center', fontWeight: 'bold', color, fontSize: 16 } }}
            sx={{
                width: { xs: 44, sm: 55 },
                '& input': { color: `${color} !important` },
                '& .MuiInput-underline:before': { borderBottomColor: 'transparent' },
                '& .MuiInput-underline:hover:before': { borderBottomColor: `${color} !important` },
                '& .MuiInput-underline:after': { borderBottomColor: color },
            }}
        />
    </Box>
);

/* ── InfoChip — campo label+valor compacto ── */
const InfoChip = ({ label, children }) => (
    <Box sx={{ flex: '1 1 80px', minWidth: { xs: 60, sm: 80 }, minWidth: 0, overflow: 'hidden', wordBreak: 'break-word' }}>
        <Typography className="esteban" sx={{ color: 'var(--text-primary)', fontSize: 10, lineHeight: 1.2 }}>{label}</Typography>
        <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: 14, lineHeight: 1.3, overflowWrap: 'break-word' }}>{children}</Typography>
    </Box>
);

/* ════════════════════════════════════════════════════════════
   CharacterHeader — Layout compacto em flexbox
   ════════════════════════════════════════════════════════════ */
const CharacterHeader = ({
    character, editMode, setEditMode,
    sectionStyle, cardHeaderStyle,
    updateField, handleSave, handleCancel, atualizarMoeda,
    fileInputRef, handleImageDrop, handleDragOver, handleImageButtonClick, handleImageFileChange,
    levelSnapshots = [], handleRegressLevel, handleLevelUp,
}) => {
    const [avatarModalOpen, setAvatarModalOpen] = useState(false);
    const [regressDialogOpen, setRegressDialogOpen] = useState(false);
    const [regressConfirmLevel, setRegressConfirmLevel] = useState(null);
    const [levelUpDialogOpen, setLevelUpDialogOpen] = useState(false);
    const [levelUpInfo, setLevelUpInfo] = useState(null);
    const [levelUpLoading, setLevelUpLoading] = useState(false);
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const isSmallScreen = useMediaQuery('(max-width:300px)');
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

    const avatarSrc = character.image || UIcon;
    const tamanhoInfo = determinarTamanho(character.altura || 170);

    // ── XP & Nível ──────────────────────────────────────
    const xpAtual = character.experiencia || 0;
    const xpInfo = calcularNivel(xpAtual);
    const xpInicioNivel = xpInfo.nivel <= 1 ? 0 : TABELA_XP_POR_NIVEL[xpInfo.nivel - 2];
    const xpTotalNivel  = xpInfo.xpProximoNivel ? xpInfo.xpProximoNivel - xpInicioNivel : 1;
    const xpProgressPct = xpInfo.xpProximoNivel
        ? Math.min(100, ((xpAtual - xpInicioNivel) / xpTotalNivel) * 100)
        : 100;

    /** Atualiza XP e recalcula nível automaticamente */
    const handleXpChange = (val) => {
        const newXp = Math.max(0, parseInt(val) || 0);
        const info  = calcularNivel(newXp);
        updateField('experiencia', newXp);
        updateField('nivel', info.nivel);
    };

    return (
        <Paper elevation={4} sx={{ ...sectionStyle, mb: 2, overflow: 'hidden' }}>
            {/* ─── Header bar ── */}
            <Box sx={cardHeaderStyle}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, overflow: 'hidden' }}>
                        <PersonIcon sx={{ flexShrink: 0 }} />
                        <Typography className="esteban" variant="h6" component="div"
                            noWrap sx={{ fontSize: { xs: '0.8rem', sm: '1.25rem' } }}>
                            Informações do Personagem
                        </Typography>
                    </Box>
                    {!editMode ? (
                        <IconButton onClick={() => setEditMode(true)} sx={{ color: 'white' }}>
                            <EditIcon />
                        </IconButton>
                    ) : (
                        <Box>
                            <IconButton onClick={handleSave} sx={{ color: 'var(--text-primary)' }}><SaveIcon /></IconButton>
                            <IconButton onClick={handleCancel} sx={{ color: '#931C4A' }}><CancelIcon /></IconButton>
                        </Box>
                    )}
                </Box>
            </Box>

            <Box sx={{ p: { xs: 1, sm: 2 } }}>

                {/* ═══ Linha 1: Avatar | Dados básicos | Moedas ═══
                    xs (< 600px)  : empilhados verticalmente, avatar centralizado
                    sm (600-900)  : avatar auto | dados cresce | moedas auto
                    md (900-1200) : igual ao sm, chips em linha única
                    lg (1200px+)  : igual ao md
                ═══ */}
                <Grid container spacing={2} alignItems="flex-start">

                    {/* ── Avatar ── */}
                    <Grid item xs="auto"
                        sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}
                    >
                        {editMode ? (
                            <Box
                                onDrop={handleImageDrop}
                                onDragOver={handleDragOver}
                                onClick={handleImageButtonClick}
                                sx={{
                                    border: '2px dashed #BB8130', borderRadius: SP.radius, p: SP.p,
                                    textAlign: 'center', bgcolor: '#756A3422',
                                    width: 100, minHeight: 100,
                                    display: 'flex', flexDirection: 'column',
                                    justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    '&:hover': { bgcolor: '#756A3444', borderColor: '#40150A' },
                                }}
                            >
                                <Typography className="esteban" variant="body2" sx={{ color: 'var(--text-primary)', fontSize: 11 }}>
                                    Arraste uma imagem
                                </Typography>
                                <Typography className="esteban" variant="body2" sx={{ color: '#BB8130', fontWeight: 'bold', fontSize: 11 }}>
                                    ou clique para selecionar
                                </Typography>
                                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageFileChange} style={{ display: 'none' }} />
                                {character.image && (
                                    <Box component="img" src={character.image} alt="Imagem do personagem"
                                        sx={{
                                            mt: 1, width: '100%', maxWidth: 100, maxHeight: 100,
                                            borderRadius: 1, border: '2px solid #BB8130', objectFit: 'cover',
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                )}
                            </Box>
                        ) : (
                            <Box sx={{ position: 'relative' }}>
                                <Box
                                    onClick={() => setAvatarModalOpen(true)}
                                    sx={{
                                        width: { xs: 70, sm: 100 }, height: { xs: 70, sm: 100 },
                                        borderRadius: { xs: '50%', lg: '10%' }, overflow: 'hidden',
                                        border: '3px solid #BB8130', cursor: 'pointer',
                                        position: 'relative',
                                        '&:hover .zoom-icon': { opacity: 1 },
                                    }}
                                >
                                    <img src={avatarSrc} alt="Character"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <Box className="zoom-icon" sx={{
                                        position: 'absolute', inset: 0,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        backgroundColor: 'rgba(0,0,0,0.3)', opacity: 0,
                                        transition: 'opacity .2s',
                                    }}>
                                        <ZoomInIcon sx={{ color: 'white', fontSize: 28 }} />
                                    </Box>
                                </Box>

                                {/* Modal expandido — 800px */}
                                <Modal
                                    open={avatarModalOpen}
                                    onClose={() => setAvatarModalOpen(false)}
                                    closeAfterTransition
                                    slots={{ backdrop: Backdrop }}
                                    slotProps={{ backdrop: { timeout: 300 } }}
                                >
                                    <Fade in={avatarModalOpen}>
                                        <Box sx={{
                                            position: 'absolute', top: '50%', left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            bgcolor: 'var(--surface-paper)', borderRadius: 2,
                                            boxShadow: 24, p: 1,
                                            width: { xs: '92vw', sm: '80vw', md: '60vw', lg: 800 },
                                            maxWidth: 800, maxHeight: '90vh',
                                            outline: 'none',
                                        }}>
                                            <IconButton
                                                onClick={() => setAvatarModalOpen(false)}
                                                sx={{ position: 'absolute', top: 4, right: 4, bgcolor: '#00000044', color: 'white', '&:hover': { bgcolor: '#00000088' } }}
                                                size="small"
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                            <img src={avatarSrc} alt="Character"
                                                style={{
                                                    width: '100%', height: 'auto',
                                                    maxHeight: '85vh',
                                                    borderRadius: 8, objectFit: 'contain',
                                                }}
                                            />
                                        </Box>
                                    </Fade>
                                </Modal>
                            </Box>
                        )}
                    </Grid>

                    {/* ── Dados básicos ── */}
                    <Grid item xs sm>

                        {/* Nome + Nível
                            xs: Nome(9 cols) | Nível(3 cols)
                            sm+: Nome(10 cols) | Nível(2 cols)
                        */}
                        <Grid container spacing={1} alignItems="center" sx={{ mb: 0.75 }}>
                            <Grid item xs={9} sm={10}>
                                {editMode ? (
                                    <EditableField fullWidth label="Nome do Personagem"
                                        value={character.nome_personagem || ''}
                                        onChange={(val) => updateField('nome_personagem', val)} />
                                ) : (
                                    <Typography className="esteban" variant="h4" sx={{
                                    color: 'var(--text-primary)', fontWeight: 'bold',
                                        fontSize: { xs: '1rem', sm: '1.4rem', md: '2.125rem' },
                                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                    }}>
                                        {character.nome_personagem}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={3} sm={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 0.5 }}>
                                {editMode ? (
                                    <EditableField fullWidth type="number" label="Nível"
                                        value={character.nivel || 1}
                                        onChange={(val) => updateField('nivel', parseInt(val) || 1)} />
                                ) : (
                                    <>
                                        <Paper sx={{
                                            background: 'var(--panel-bg)', borderRadius: SP.radius,
                                            px: 1.5, py: 0.5, textAlign: 'center', width: 'fit-content',
                                        }}>
                                            <Typography className="esteban" sx={{ color: 'white', fontSize: 10, lineHeight: 1 }}>Nível</Typography>
                                            <Typography className="esteban" sx={{ color: 'white', fontWeight: 'bold', fontSize: 22, lineHeight: 1 }}>
                                                {character.nivel}
                                            </Typography>
                                        </Paper>
                                        {(character.nivel || 1) < 20 && (
                                            <Tooltip title="Subir de nível">
                                                <IconButton
                                                    size="small"
                                                    disabled={levelUpLoading}
                                                    onClick={async () => {
                                                        setLevelUpLoading(true);
                                                        const result = await handleLevelUp();
                                                        setLevelUpLoading(false);
                                                        if (result?.success) {
                                                            setLevelUpInfo(result);
                                                            setLevelUpDialogOpen(true);
                                                        }
                                                    }}
                                                    sx={{ color: isDark ? 'var(--text-primary)' : '#BB8130' }}
                                                >
                                                    <KeyboardDoubleArrowUpIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        {levelSnapshots.length > 0 && (
                                            <Tooltip title="Regredir nível">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => setRegressDialogOpen(true)}
                                                    sx={{ color: isDark ? 'var(--text-primary)' : '#931C4A' }}
                                                >
                                                    <RestoreIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </>
                                )}
                            </Grid>
                        </Grid>

                        {/* ── Barra de Experiência ── */}
                        {editMode ? (
                            <Box sx={{ mb: 1.5 }}>
                                <EditableField
                                    fullWidth type="number" label="Experiência (XP)"
                                    value={character.experiencia || 0}
                                    onChange={handleXpChange}
                                    inputProps={{ min: 0 }}
                                />
                            </Box>
                        ) : (
                            <Box sx={{ mb: 1.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.4 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <EmojiEventsIcon sx={{ fontSize: 13, color: '#BB8130' }} />
                                        <Typography sx={{ fontSize: 11, fontWeight: 'bold', color: 'var(--text-primary)' }}>XP</Typography>
                                        <Typography sx={{ fontSize: 11, color: 'var(--text-muted)' }}>
                                            {xpAtual.toLocaleString('pt-BR')}
                                            {xpInfo.xpProximoNivel
                                                ? ` / ${xpInfo.xpProximoNivel.toLocaleString('pt-BR')}`
                                                : ' — Nível máximo'}
                                        </Typography>
                                    </Box>
                                    {xpInfo.xpProximoNivel && (
                                        <Typography sx={{ fontSize: 10, color: 'var(--text-muted)' }}>
                                            {xpInfo.xpFaltando.toLocaleString('pt-BR')} p/ Nv {xpInfo.nivel + 1}
                                        </Typography>
                                    )}
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={xpProgressPct}
                                    sx={{
                                        height: 6, borderRadius: 3,
                                        backgroundColor: 'rgba(187,129,48,0.18)',
                                        '& .MuiLinearProgress-bar': {
                                            borderRadius: 3,
                                            background: xpProgressPct >= 100
                                                ? 'linear-gradient(90deg, #BB8130, #FFD700)'
                                                : 'linear-gradient(90deg, #756A34, #BB8130)',
                                        },
                                    }}
                                />
                            </Box>
                        )}

                        {/* Info chips — flex wrap: máximo de itens na mesma linha */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <Box sx={{ flex: '1 1 100px', minWidth: 80 }}>
                                {editMode ? (
                                    <EditableField fullWidth label="Classe"
                                        value={character.classe || ''}
                                        onChange={(val) => updateField('classe', val)} />
                                ) : (
                                    <InfoChip label="Classe">{determinarClasseAtual(character)}</InfoChip>
                                )}
                            </Box>

                            <Box sx={{ flex: '1 1 100px', minWidth: 80 }}>
                                {editMode ? (
                                    <FormControl fullWidth>
                                        <InputLabel>Espécie</InputLabel>
                                        <Select value={character.especie || ''} label="Espécie" onChange={(e) => updateField('especie', e.target.value)}>
                                            {Object.entries(especiesMap).map(([key, value]) => (
                                                <MenuItem key={key} value={key}>{value}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <InfoChip label="Espécie">{especiesMap[character.especie] || character.especie}</InfoChip>
                                )}
                            </Box>

                            <Box sx={{ flex: '1 1 80px', minWidth: 70 }}>
                                {editMode ? (
                                    <FormControl fullWidth>
                                        <InputLabel>Gênero</InputLabel>
                                        <Select value={character.genero || ''} label="Gênero" onChange={(e) => updateField('genero', e.target.value)}>
                                            <MenuItem value="Masculino">Masculino</MenuItem>
                                            <MenuItem value="Feminino">Feminino</MenuItem>
                                            <MenuItem value="Outro">Outro</MenuItem>
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <InfoChip label="Gênero">{character.genero}</InfoChip>
                                )}
                            </Box>

                            <Box sx={{ flex: '1 1 60px', minWidth: 50 }}>
                                {editMode ? (
                                    <EditableField fullWidth type="number" label="Idade"
                                        value={character.idade || 0}
                                        onChange={(val) => updateField('idade', parseInt(val) || 0)} />
                                ) : (
                                    <InfoChip label="Idade">{character.idade} anos</InfoChip>
                                )}
                            </Box>

                            <Box sx={{ flex: '1 1 70px', minWidth: 60 }}>
                                {editMode ? (
                                    <EditableField fullWidth type="number" label="Altura (cm)"
                                        value={character.altura || 170}
                                        onChange={(val) => updateField('altura', parseInt(val) || 170)}
                                        inputProps={{ min: 1, max: 5000 }} />
                                ) : (
                                    <Tooltip title={
                                        <Box>
                                            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Tamanho: {tamanhoInfo.nome}</Typography>
                                            <Typography variant="caption" sx={{ display: 'block' }}>{tamanhoInfo.descricao}</Typography>
                                        </Box>
                                    } arrow>
                                        <Box sx={{ cursor: 'help' }}>
                                            <Typography className="esteban" sx={{ color: 'var(--text-primary)', fontSize: 10, lineHeight: 1.2 }}>Altura</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: 14, lineHeight: 1.3 }}>
                                                    {character.altura || 170} cm
                                                </Typography>
                                                <Chip label={tamanhoInfo.nome} size="small"
                                                    sx={{ fontSize: 9, height: 18}} />
                                            </Box>
                                        </Box>
                                    </Tooltip>
                                )}
                            </Box>
                        </Box>

                    </Grid>{/* fim Dados básicos */}

                    {/* ── Moedas ── */}
                    <Grid item xs={12} sm="auto">
                        <Paper sx={{
                            p: { xs: 1, sm: SP.p }, px: { xs: 1.5, sm: 3 }, borderRadius: SP.radius,
                            backgroundColor: 'var(--surface-warm)', border: '1px solid #BB8130',
                        }}>
                            <Typography className="esteban" sx={{
                                color: 'var(--text-primary)', fontSize: 11, fontWeight: 'bold', mb: 0.75,
                                display: 'flex', alignItems: 'center', gap: 0.5,
                            }}>
                                <LocalAtmIcon sx={{ fontSize: 16 }} /> Moedas
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <MoedaInput label="Platina" value={character.moedas?.platina || 0} onChange={(v) => atualizarMoeda('platina', v)} color={isDark ? 'var(--text-primary)' : '#756A34'} bgColor={isDark ? 'var(--surface-default)' : '#e0e5e0'} />
                                <MoedaInput label="Ouro"    value={character.moedas?.ouro || 0}    onChange={(v) => atualizarMoeda('ouro', v)}    color={isDark ? 'var(--text-primary)' : '#BB8130'} bgColor={isDark ? 'var(--surface-warm)'    : '#f5ebe3'} />
                                <MoedaInput label="Prata"   value={character.moedas?.prata || 0}   onChange={(v) => atualizarMoeda('prata', v)}   color={isDark ? 'var(--text-primary)' : '#666'}    bgColor={isDark ? 'var(--surface-alt)'     : '#e8e8e8'} />
                                <MoedaInput label="Cobre"   value={character.moedas?.cobre || 0}   onChange={(v) => atualizarMoeda('cobre', v)}   color={isDark ? 'var(--text-primary)' : '#8B4513'} bgColor={isDark ? 'var(--surface-raised)'  : '#f0dcc8'} />
                            </Box>
                            <Typography variant="caption" sx={{
                                display: 'block', mt: 0.75, color: 'var(--text-primary)',
                                textAlign: 'center', fontSize: 10,
                            }}>
                                Total: {((character.moedas?.platina || 0) * 1000 + (character.moedas?.ouro || 0) * 100 + (character.moedas?.prata || 0) * 10 + (character.moedas?.cobre || 0)) / 100} M.O
                            </Typography>
                        </Paper>
                    </Grid>

                </Grid>{/* fim Linha 1 */}

                {/* ═══ Linha 2: Antecedente | Descrição
                    xs: empilhados (12 cada)
                    sm+: lado a lado (6 cada)
                ═══ */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>

                    <Box sx={{ flex: '1 1 280px', minWidth: 0 }}>
                        {isMdDown ? (
                            <Accordion defaultExpanded={false} sx={{
                                borderRadius: `${SP.radius * 4}px !important`, backgroundColor: 'var(--surface-default)',
                                borderLeft: '3px solid #AB6422', '&:before': { display: 'none' },
                                '&.Mui-expanded': { margin: 0 },
                            }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'var(--text-primary)' }} />}
                                    sx={{ minHeight: 36, '&.Mui-expanded': { minHeight: 36 }, '& .MuiAccordionSummary-content': { margin: '6px 0' } }}>
                                    <Typography className="esteban" sx={{
                                        display: 'flex', alignItems: 'center', gap: 0.5,
                                        fontWeight: 'bold', color: 'var(--text-primary)', fontSize: 13,
                                        overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                                    }}>
                                        <HistoryEduIcon sx={{ fontSize: 18, flexShrink: 0 }} />
                                        <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            Antecedente: {character.antecedente?.nome || 'Não definido'}
                                        </Box>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ pt: 0, px: 1.5, pb: 1.5 }}>
                                    {editMode ? (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <EditableField fullWidth label="Nome do Antecedente"
                                                value={character.antecedente?.nome || ''}
                                                onChange={(val) => updateField('antecedente.nome', val)} />
                                            <EditableField fullWidth multiline rows={3} label="Descrição do Antecedente"
                                                value={character.antecedente?.descricao || ''}
                                                onChange={(val) => updateField('antecedente.descricao', val)} />
                                        </Box>
                                    ) : (
                                        <Typography className="esteban" variant="body2" sx={{
                                            wordBreak: 'break-word', lineHeight: 1.6, color: 'var(--text-primary)', fontSize: 12,
                                        }}>
                                            {character.antecedente?.descricao || 'Sem descrição'}
                                        </Typography>
                                    )}
                                    {character.antecedente?.habilidades && character.antecedente.habilidades.length > 0 && (
                                        <Box sx={{ mt: 1 }}>
                                            <Typography className="esteban" variant="caption" sx={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: 10 }}>
                                                Habilidades:
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                                                {character.antecedente.habilidades.map((hab, idx) => (
                                                    <Chip key={idx} label={hab} size="small"
                                                        sx={{
                                                            backgroundColor: hab.includes('-') ? '#931C4A' : '#454E30',
                                                            color: 'white', fontSize: 10, height: 22,
                                                        }} />
                                                ))}
                                            </Box>
                                        </Box>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        ) : (
                            <Paper sx={{
                                p: SP.p, px: 3, borderRadius: SP.radius,
                                backgroundColor: 'var(--surface-default)', borderLeft: '3px solid #AB6422',
                                maxHeight: 220, overflowY: 'auto', overflowX: 'hidden',
                            }}>
                                <Typography className="esteban" sx={{
                                    display: 'flex', alignItems: 'center', gap: 0.5,
                                    fontWeight: 'bold', color: 'var(--text-primary)', fontSize: 13, mb: 1,
                                    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                                }}>
                                    <HistoryEduIcon sx={{ fontSize: 18, flexShrink: 0 }} />
                                    <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        Antecedente: {character.antecedente?.nome || 'Não definido'}
                                    </Box>
                                </Typography>
                                {editMode ? (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        <EditableField fullWidth label="Nome do Antecedente"
                                            value={character.antecedente?.nome || ''}
                                            onChange={(val) => updateField('antecedente.nome', val)} />
                                        <EditableField fullWidth multiline rows={3} label="Descrição do Antecedente"
                                            value={character.antecedente?.descricao || ''}
                                            onChange={(val) => updateField('antecedente.descricao', val)} />
                                    </Box>
                                ) : (
                                    <Typography className="esteban" variant="body2" sx={{
                                        wordBreak: 'break-word', lineHeight: 1.6, color: 'var(--text-primary)', fontSize: 12,
                                    }}>
                                        {character.antecedente?.descricao || 'Sem descrição'}
                                    </Typography>
                                )}
                                {character.antecedente?.habilidades && character.antecedente.habilidades.length > 0 && (
                                    <Box sx={{ mt: 1 }}>
                                        <Typography className="esteban" variant="caption" sx={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: 10 }}>
                                            Habilidades:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                                            {character.antecedente.habilidades.map((hab, idx) => (
                                                <Chip key={idx} label={hab} size="small"
                                                    sx={{
                                                        backgroundColor: hab.includes('-') ? '#931C4A' : '#454E30',
                                                        color: 'white', fontSize: 10, height: 22,
                                                    }} />
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                            </Paper>
                        )}
                    </Box>

                    <Box sx={{ flex: '1 1 280px', minWidth: 0 }}>
                        {isMdDown ? (
                            <Accordion defaultExpanded={false} sx={{
                                borderRadius: `${SP.radius * 4}px !important`, backgroundColor: 'var(--surface-default)',
                                borderLeft: '3px solid #162A22', '&:before': { display: 'none' },
                                '&.Mui-expanded': { margin: 0 },
                            }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'var(--text-primary)' }} />}
                                    sx={{ minHeight: 36, '&.Mui-expanded': { minHeight: 36 }, '& .MuiAccordionSummary-content': { margin: '6px 0' } }}>
                                    <Typography className="esteban" sx={{
                                        display: 'flex', alignItems: 'center', gap: 0.5,
                                        fontWeight: 'bold', color: 'var(--text-primary)', fontSize: 13,
                                        overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                                    }}>
                                        <PersonIcon sx={{ fontSize: 18, flexShrink: 0 }} />
                                        <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            Descrição do Personagem
                                        </Box>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ pt: 0, px: 1.5, pb: 1.5 }}>
                                    {editMode ? (
                                        <EditableField fullWidth multiline rows={5} label="Descrição"
                                            value={character.descricao || ''}
                                            onChange={(val) => updateField('descricao', val)} />
                                    ) : (
                                        <Typography className="esteban" variant="body2" sx={{
                                            wordBreak: 'break-word', lineHeight: 1.6, color: 'var(--text-primary)', fontSize: 12,
                                        }}>
                                            {character.descricao || 'Sem descrição'}
                                        </Typography>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        ) : (
                            <Paper sx={{
                                p: SP.p, px: 3, borderRadius: SP.radius,
                                backgroundColor: 'var(--surface-default)', borderLeft: '3px solid #162A22',
                                maxHeight: 220, overflowY: 'auto', overflowX: 'hidden',
                            }}>
                                <Typography className="esteban" sx={{
                                    display: 'flex', alignItems: 'center', gap: 0.5,
                                    fontWeight: 'bold', color: 'var(--text-primary)', fontSize: 13, mb: 1,
                                    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                                }}>
                                    <PersonIcon sx={{ fontSize: 18, flexShrink: 0 }} />
                                    <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        Descrição do Personagem
                                    </Box>
                                </Typography>
                                {editMode ? (
                                    <EditableField fullWidth multiline rows={5} label="Descrição"
                                        value={character.descricao || ''}
                                        onChange={(val) => updateField('descricao', val)} />
                                ) : (
                                    <Typography className="esteban" variant="body2" sx={{
                                        wordBreak: 'break-word', lineHeight: 1.6, color: 'var(--text-primary)', fontSize: 12,
                                    }}>
                                        {character.descricao || 'Sem descrição'}
                                    </Typography>
                                )}
                            </Paper>
                        )}
                    </Box>

                </Box>{/* fim Linha 2 */}

            </Box>

            {/* ═══ Dialog de Regressão de Nível ═══ */}
            <Dialog
                open={regressDialogOpen}
                onClose={() => { setRegressDialogOpen(false); setRegressConfirmLevel(null); }}
                maxWidth="xs" fullWidth
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <RestoreIcon /> Regredir Nível
                </DialogTitle>
                <DialogContent dividers>
                    {!regressConfirmLevel ? (
                        <>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                Selecione o nível para o qual deseja retornar. Tudo feito a partir desse nível será desfeito.
                            </Typography>
                            <List dense>
                                {levelSnapshots.map((snap) => (
                                    <ListItem key={snap.nivel} disablePadding>
                                        <ListItemButton onClick={() => setRegressConfirmLevel(snap.nivel)}>
                                            <ListItemIcon sx={{ minWidth: 36 }}>
                                                <RestoreIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`Voltar ao Nível ${snap.nivel - 1}`}
                                                secondary={`Desfaz evolução do nível ${snap.nivel} — Snapshot de ${new Date(snap.created_at).toLocaleDateString('pt-BR')}`}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </>
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 2 }}>
                            <WarningAmberIcon sx={{ fontSize: 48, color: '#BB8130', mb: 1 }} />
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Confirmar Regressão
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                O personagem voltará ao estado anterior ao <strong>Nível {regressConfirmLevel}</strong>.
                            </Typography>
                            <Typography variant="body2" color="error">
                                Todas as alterações feitas a partir desse nível serão perdidas permanentemente.
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setRegressDialogOpen(false); setRegressConfirmLevel(null); }}>
                        Cancelar
                    </Button>
                    {regressConfirmLevel && (
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<RestoreIcon />}
                            onClick={() => {
                                handleRegressLevel(regressConfirmLevel);
                                setRegressDialogOpen(false);
                                setRegressConfirmLevel(null);
                            }}
                        >
                            Regredir para Nível {regressConfirmLevel - 1}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>

            {/* ═══ Dialog de Level Up ═══ */}
            <Dialog
                open={levelUpDialogOpen}
                onClose={() => setLevelUpDialogOpen(false)}
                maxWidth="xs" fullWidth
            >
                <DialogTitle sx={{
                    display: 'flex', alignItems: 'center', gap: 1,
                    background: 'linear-gradient(135deg, #162A22 0%, #40150A 100%)',
                    color: 'white',
                }}>
                    <AutoAwesomeIcon sx={{ color: '#FFD700' }} /> Level Up!
                </DialogTitle>
                <DialogContent sx={{ pt: 3, textAlign: 'center' }}>
                    {levelUpInfo && (
                        <Box sx={{ py: 2 }}>
                            <KeyboardDoubleArrowUpIcon sx={{ fontSize: 56, color: '#BB8130', mb: 1 }} />
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'var(--text-primary)', mb: 1 }}>
                                Nível {levelUpInfo.novoNivel}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, color: 'var(--text-primary)' }}>
                                Seu personagem avançou para o <strong>Nível {levelUpInfo.novoNivel}</strong>!
                            </Typography>

                            <Paper sx={{
                                p: 2, borderRadius: 2, mb: 2,
                                backgroundColor: 'var(--surface-warm)',
                                border: '1px solid #BB8130',
                            }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'var(--text-primary)' }}>
                                    O que você ganha:
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                                    <AutoAwesomeIcon sx={{ color: '#FFD700', fontSize: 20 }} />
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#BB8130' }}>
                                        +{levelUpInfo.pontosGanhos} {levelUpInfo.pontosGanhos === 1 ? 'Ponto' : 'Pontos'} de Regalia
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
                                    Total de pontos de regalia: <strong>{levelUpInfo.pontosTotal}</strong>
                                </Typography>
                            </Paper>

                            <Typography variant="body2" sx={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                Use seus novos pontos de regalia para adquirir habilidades de classe, espécie ou profissão na seção de Regalias.
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => setLevelUpDialogOpen(false)}
                        sx={{
                            backgroundColor: '#BB8130',
                            '&:hover': { backgroundColor: '#40150A' },
                        }}
                    >
                        Entendido
                    </Button>
                </DialogActions>
            </Dialog>

        </Paper>
    );
};

export default CharacterHeader;
