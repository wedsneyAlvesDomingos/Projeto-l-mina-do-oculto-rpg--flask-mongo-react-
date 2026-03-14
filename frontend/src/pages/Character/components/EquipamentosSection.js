import React, { useState, useMemo, useCallback } from 'react';
import {
    Box, Paper, Typography, Button, Chip, IconButton,
    Card, CardContent, CardHeader,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Tooltip, TextField,
    Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CapacidadeCargaPanel from './CapacidadeCargaPanel';
import InventoryIcon from '@mui/icons-material/Inventory';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShieldIcon from '@mui/icons-material/Shield';
import EditableField from './EditableField';
import { EquipmentShopTab } from './creation';
import { categories as equipmentCatalog } from '../../../data/constants';

/* ── Helpers de tipo ────────────────────────────────── */
const isArma     = (item) => item.dano || item.category?.toLowerCase().includes('arma') || item.category?.toLowerCase().includes('weapon');
const isArmadura = (item) => (item.category?.toLowerCase().includes('armadura') || item.defesa !== undefined || item.bonusDefesa !== undefined || item.tipo?.toLowerCase().includes('leve') || item.tipo?.toLowerCase().includes('media') || item.tipo?.toLowerCase().includes('pesada')) && !item.category?.toLowerCase().includes('escudo');
const isEscudo   = (item) => item.category?.toLowerCase().includes('escudo') || item.category?.toLowerCase().includes('shield');

const EquipamentosSection = ({
    character, editMode, sectionStyle, cardHeaderStyle, updateField,
    armasEquipadas, armaduraEquipada, escudoEquipado,
    equiparArma, equiparArmadura, desequiparArmadura,
    equiparEscudo, desequiparEscudo,
    rollDice, rollWeaponDamage, rollAttackWithAdvantage, isAcuidadeWeapon, hasAcuidadeRegalia,
}) => {
    const equipamentos = character.equipamentos || [];
    const moedas = character.moedas || { platina: 0, ouro: 0, prata: 0, cobre: 0 };
    const [shopOpen, setShopOpen] = useState(false);
    const [descItem, setDescItem] = useState(null); // item com descrição aberta

    /* ── Dinheiro total em M.O. (ouro) ──────────────── */
    const dinheiroTotal = useMemo(() =>
        (moedas.platina || 0) * 10 + (moedas.ouro || 0) + (moedas.prata || 0) / 10 + (moedas.cobre || 0) / 100
    , [moedas]);

    /* ── Carrinho da loja (itens selecionados no modal) */
    const [selectedItems, setSelectedItems] = useState([]);

    const totalSpent = useCallback(() =>
        selectedItems.reduce((acc, i) => acc + (i.price || 0) * (i.quantity || 1), 0)
    , [selectedItems]);

    /* toggle item no carrinho */
    const handleChangeShop = useCallback((category, item) => {
        const key = `${category}-${item.name}`;
        setSelectedItems(prev => {
            const existing = prev.find(i => i.key === key);
            if (existing) {
                return prev.map(i => i.key === key ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, key, category, quantity: 1 }];
        });
    }, []);

    const handleRemoveFromCart = useCallback((item) => {
        setSelectedItems(prev => prev.filter(i => i.key !== item.key));
    }, []);

    /* ── Confirmar compra: desconta ouro e adiciona itens ── */
    const handleConfirmPurchase = useCallback(() => {
        const custo = totalSpent();
        if (custo <= 0 || custo > dinheiroTotal) return;

        /* converter dinheiro total para cobre, subtrair, reconverter */
        const totalCobre = Math.round(
            (moedas.platina || 0) * 1000 + (moedas.ouro || 0) * 100 + (moedas.prata || 0) * 10 + (moedas.cobre || 0)
        );
        const custoCobre = Math.round(custo * 100);
        const restanteCobre = Math.max(0, totalCobre - custoCobre);
        const novasMoedas = {
            platina: Math.floor(restanteCobre / 1000),
            ouro: Math.floor((restanteCobre % 1000) / 100),
            prata: Math.floor((restanteCobre % 100) / 10),
            cobre: restanteCobre % 10,
        };

        /* criar itens de equipamento */
        const novosItens = selectedItems.map(si => ({
            key: `${si.category}-${si.name}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            name: si.name,
            category: si.category,
            quantity: si.quantity || 1,
            price: si.price || 0,
            dano: si.dano || '',
            ataque: si.ataque || '',
            critico: si.critico || '',
            defesa: si.defesa ?? '',
            bonusDefesa: si.bonusDefesa ?? '',
            tipo: si.tipo || '',
            peso: si.peso || '',
            tipoDano: si.tipoDano || '',
            alcance: si.alcance || '',
            maos: si.maos || '',
            categoriaProf: si.categoriaProf || '',
            propriedades: si.propriedades || [],
            efeitosEspeciais: si.efeitosEspeciais || [],
            forca: si.forca || '',
            penalidade: si.penalidade || null,
            description: si.description || '',
        }));

        updateField('equipamentos', [...equipamentos, ...novosItens]);
        updateField('moedas', novasMoedas);
        setSelectedItems([]);
        setShopOpen(false);
    }, [selectedItems, totalSpent, dinheiroTotal, moedas, equipamentos, updateField]);

    /* CRUD local */
    const handleRemoveEquipamento = (index) => { const ne = [...equipamentos]; ne.splice(index, 1); updateField('equipamentos', ne); };
    const handleUpdateEquipamento = (index, field, value) => { const ne = [...equipamentos]; ne[index] = { ...ne[index], [field]: value }; updateField('equipamentos', ne); };

    /* verificações de equipado */
    const isArmaEquipada     = (item) => armasEquipadas.some(a => a && a.name === item.name);
    const isArmaduraEquipada = (item) => armaduraEquipada && armaduraEquipada.name === item.name;
    const isEscudoEquipado   = (item) => escudoEquipado && escudoEquipado.name === item.name;

    /* Equipar / desequipar — ordem: escudo > armadura > arma */
    const handleEquiparItem = (item) => {
        if (isEscudo(item)) {
            isEscudoEquipado(item) ? desequiparEscudo() : equiparEscudo(item);
        } else if (isArmadura(item)) {
            isArmaduraEquipada(item) ? desequiparArmadura() : equiparArmadura(item);
        } else if (isArma(item)) {
            if (isArmaEquipada(item)) {
                const slot = armasEquipadas.findIndex(a => a && a.name === item.name);
                if (slot !== -1) equiparArma(null, slot);
            } else {
                const slotVazio = armasEquipadas.findIndex(a => !a);
                equiparArma(item, slotVazio !== -1 ? slotVazio : 0);
            }
        }
    };

    const getEquipStatus = (item) => {
        if (isEscudo(item))   return { equipavel: true, equipado: isEscudoEquipado(item), tipo: 'escudo' };
        if (isArmadura(item)) return { equipavel: true, equipado: isArmaduraEquipada(item), tipo: 'armadura' };
        if (isArma(item))     return { equipavel: true, equipado: isArmaEquipada(item), tipo: 'arma' };
        return { equipavel: false, equipado: false, tipo: null };
    };

    return (
        <Card sx={{ mt: 0, ...sectionStyle }}>
            {/* ── Cabeçalho ── */}
            <CardHeader
                sx={cardHeaderStyle}
                titleTypographyProps={{ component: 'div' }}
                title={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: 1 }}>
                        <Typography className="esteban" component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <InventoryIcon /> Inventário ({equipamentos.length})
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Chip
                                label={`💰 ${moedas.platina || 0}P  ${moedas.ouro || 0}O  ${moedas.prata || 0}P  ${moedas.cobre || 0}C`}
                                size="small"
                                sx={{ backgroundColor: '#756A34', color: '#fff', fontWeight: 'bold', fontSize: '11px' }}
                            />
                            <Button
                                size="small"
                                variant="contained"
                                onClick={() => { setSelectedItems([]); setShopOpen(true); }}
                                startIcon={<ShoppingCartIcon fontSize="small" />}
                                sx={{
                                    backgroundColor: '#454E30', fontFamily: 'Esteban, serif',
                                    '&:hover': { backgroundColor: '#2F3C29' },
                                }}
                            >
                                Loja de Itens
                            </Button>
                        </Box>
                    </Box>
                }
            />

            {/* ── Capacidade de Carga (accordion) ── */}
            <Accordion
                disableGutters
                elevation={0}
                sx={{
                    backgroundColor: 'var(--surface-default)',
                    borderBottom: '1px solid #756A3444',
                    '&:before': { display: 'none' },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: 'var(--text-primary)' }} />}
                    sx={{ px: 2, py: 0.5, minHeight: 40, '& .MuiAccordionSummary-content': { my: 0.5 } }}
                >
                    <Typography className="esteban" sx={{ fontSize: 13, fontWeight: 'bold', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        📦 Capacidade de Carga
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                    <CapacidadeCargaPanel character={character} sx={{ mb: 0, borderRadius: 0, border: 'none', borderTop: `1px solid #756A3444` }} />
                </AccordionDetails>
            </Accordion>

            {/* ── Tabela de Inventário ── */}
            <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                {equipamentos.length === 0 ? (
                    <Typography className="esteban" sx={{ textAlign: 'center', color: 'var(--text-primary)', py: 3 }}>
                        Nenhum equipamento cadastrado.
                    </Typography>
                ) : (
                    <TableContainer component={Paper} sx={{ border: '1px solid #756A3444', borderRadius: 2, overflow: 'auto' }}>
                        <Table size="small" sx={{ minWidth: 460 }}>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'var(--footer-bg)' }}>
                                    <TableCell sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Item</TableCell>
                                    <TableCell sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Categoria</TableCell>
                                    <TableCell align="center" sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Qtd</TableCell>
                                    <TableCell sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Atributos</TableCell>
                                    <TableCell align="center" sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Status</TableCell>
                                    <TableCell align="center" sx={{ color: '#fff', fontFamily: 'Esteban, serif', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {equipamentos.map((item, idx) => {
                                    const equipStatus = getEquipStatus(item);
                                    const rowBg = equipStatus.equipado
                                        ? '#e8f0e8'
                                        : idx % 2 === 0 ? 'var(--surface-raised)' : 'var(--surface-default)';

                                    return (
                                        <TableRow
                                            key={item.key || idx}
                                            sx={{
                                                backgroundColor: rowBg,
                                                '&:hover': { backgroundColor: 'var(--surface-raised)' },
                                                transition: 'background-color .15s',
                                                borderLeft: equipStatus.equipado ? '3px solid #2F3C29' : '3px solid transparent',
                                            }}
                                        >
                                            {/* Nome */}
                                            <TableCell sx={{ fontFamily: 'Esteban, serif', maxWidth: 160 }}>
                                                {editMode ? (
                                                    <EditableField
                                                        size="small" fullWidth label="Nome"
                                                        value={item.name || ''}
                                                        onChange={(val) => handleUpdateEquipamento(idx, 'name', val)}
                                                    />
                                                ) : (
                                                    <Typography sx={{ fontWeight: 'bold', fontSize: 13, fontFamily: 'Esteban, serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 150 }}>
                                                        {item.name || '—'}
                                                    </Typography>
                                                )}
                                            </TableCell>

                                            {/* Categoria */}
                                            <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                <Chip
                                                    label={item.category || 'Outros'}
                                                    size="small"
                                                    sx={{ fontSize: 10, backgroundColor: '#756A3422', color: 'var(--text-primary)' }}
                                                />
                                            </TableCell>

                                            {/* Qtd */}
                                            <TableCell align="center" sx={{ whiteSpace: 'nowrap', width: 64 }}>
                                                {editMode ? (
                                                    <TextField
                                                        type="number" size="small" variant="standard"
                                                        value={item.quantity || 1}
                                                        onChange={(e) => handleUpdateEquipamento(idx, 'quantity', parseInt(e.target.value) || 1)}
                                                        inputProps={{ min: 1, style: { textAlign: 'center', width: 40 } }}
                                                    />
                                                ) : (
                                                    <Typography sx={{ fontSize: 13, fontFamily: 'Esteban, serif', fontWeight: 'bold' }}>
                                                        {item.quantity || 1}
                                                    </Typography>
                                                )}
                                            </TableCell>

                                            {/* Atributos */}
                                            <TableCell>
                                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
                                                    {item.dano && (
                                                        <>
                                                            <Chip
                                                                size="small"
                                                                label={`🎲 ${item.dano}${isAcuidadeWeapon(item) && hasAcuidadeRegalia() ? ' ✦' : ''}`}
                                                                color="error"
                                                                onClick={() => rollWeaponDamage(item.dano, item.name, false, item)}
                                                                sx={{ cursor: 'pointer', fontSize: 10 }}
                                                            />
                                                            <Chip
                                                                size="small" label="💀"
                                                                sx={{ backgroundColor: '#7B3311', color: 'white', cursor: 'pointer', fontSize: 10 }}
                                                                onClick={() => rollWeaponDamage(item.dano, item.name, true, item)}
                                                            />
                                                        </>
                                                    )}
                                                    {item.ataque && (
                                                        <Chip
                                                            size="small"
                                                            label={`🎯 +${item.ataque}`}
                                                            sx={{ backgroundColor: '#162A22', color: 'white', cursor: 'pointer', fontSize: 10 }}
                                                            onClick={() => rollAttackWithAdvantage(parseInt(item.ataque) || 0, `Ataque com ${item.name}`)}
                                                        />
                                                    )}
                                                    {(item.defesa || item.bonusDefesa) && (
                                                        <Chip
                                                            size="small"
                                                            icon={<ShieldIcon sx={{ fontSize: '12px !important' }} />}
                                                            label={item.tipo?.toLowerCase() === 'pesada' ? `${item.defesa}` : `+${item.bonusDefesa || item.defesa}`}
                                                            color="primary"
                                                            sx={{ fontSize: 10 }}
                                                        />
                                                    )}
                                                    {item.critico && (
                                                        <Chip size="small" label={`C: ${item.critico}`} color="warning" sx={{ fontSize: 10 }} />
                                                    )}
                                                    {item.price > 0 && (
                                                        <Chip size="small" label={`${item.price} M.O`} variant="outlined" sx={{ fontSize: 10 }} />
                                                    )}
                                                </Box>
                                            </TableCell>

                                            {/* Status */}
                                            <TableCell align="center" sx={{ whiteSpace: 'nowrap', width: 90 }}>
                                                {equipStatus.equipado ? (
                                                    <Chip
                                                        size="small" label="✓ Equipado"
                                                        sx={{ backgroundColor: '#2F3C29', color: 'white', fontWeight: 'bold', fontSize: 10 }}
                                                    />
                                                ) : equipStatus.equipavel ? (
                                                    <Chip size="small" label="—" variant="outlined" sx={{ fontSize: 10, borderColor: '#ccc', color: 'var(--text-primary)' }} />
                                                ) : null}
                                            </TableCell>

                                            {/* Ações */}
                                            <TableCell align="center" sx={{ whiteSpace: 'nowrap', width: 130 }}>
                                                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                                    {/* Descrição */}
                                                    <Tooltip title="Ver descrição">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => setDescItem(item)}
                                                            sx={{ color: 'var(--text-primary)' }}
                                                        >
                                                            <InfoOutlinedIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>

                                                    {/* Equipar / Desequipar */}
                                                    {equipStatus.equipavel && (
                                                        <Tooltip title={equipStatus.equipado ? 'Desequipar' : 'Equipar'}>
                                                            <Button
                                                                size="small"
                                                                variant={equipStatus.equipado ? 'contained' : 'outlined'}
                                                                onClick={() => handleEquiparItem(item)}
                                                                sx={{
                                                                    fontSize: 10, py: 0.25, px: 0.75, minWidth: 'auto',
                                                                    ...(equipStatus.equipado
                                                                        ? { backgroundColor: '#2F3C29', color: 'white', '&:hover': { backgroundColor: '#162A22' } }
                                                                        : { borderColor: '#756A34', color: 'var(--text-primary)', '&:hover': { borderColor: '#40150A' } }
                                                                    ),
                                                                }}
                                                            >
                                                                {equipStatus.equipado ? 'Tirar' : 'Equipar'}
                                                            </Button>
                                                        </Tooltip>
                                                    )}

                                                    {/* Excluir (apenas editMode) */}
                                                    {editMode && (
                                                        <Tooltip title="Remover item">
                                                            <IconButton size="small" color="error" onClick={() => handleRemoveEquipamento(idx)}>
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </CardContent>

            {/* ── Modal: Descrição do Item ── */}
            <Dialog
                open={Boolean(descItem)}
                onClose={() => setDescItem(null)}
                maxWidth="sm"
                fullWidth
                PaperProps={{ sx: { borderRadius: 3, border: '2px solid #756A34' } }}
            >
                <DialogTitle component="div" sx={{
                    background: 'linear-gradient(135deg, #162A22 0%, #40150A 100%)',
                    color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    py: 1.5, fontFamily: 'Esteban, serif',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <InfoOutlinedIcon />
                        <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                            {descItem?.name}
                        </Typography>
                        {descItem?.quantity > 1 && (
                            <Chip label={`x${descItem.quantity}`} size="small" sx={{ backgroundColor: '#756A34', color: '#fff', fontSize: 11 }} />
                        )}
                    </Box>
                    <IconButton onClick={() => setDescItem(null)} sx={{ color: '#fff' }} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: 'var(--surface-raised)', pt: 2 }}>
                    {descItem && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {/* Categoria + Tipo */}
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', p: 1, backgroundColor: 'var(--surface-default)', borderRadius: 1 }}>
                                {descItem.category && <Chip label={descItem.category} size="small" sx={{ backgroundColor: '#756A3422', color: 'var(--text-primary)' }} />}
                                {descItem.tipo && <Chip label={descItem.tipo} size="small" sx={{ backgroundColor: '#162A2222', color: '#162A22' }} />}
                                {descItem.maos && <Chip label={`${descItem.maos} mão(s)`} size="small" variant="outlined" />}
                                {descItem.alcance && <Chip label={`Alcance: ${descItem.alcance}`} size="small" variant="outlined" />}
                                {descItem.peso && <Chip label={`Peso: ${descItem.peso}`} size="small" variant="outlined" />}
                            </Box>

                            {/* Stats principais */}
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', p: 1, backgroundColor: 'var(--surface-raised)', borderRadius: 1, border: '1px solid #756A3422' }}>
                                {descItem.dano && <Chip label={`🎲 Dano: ${descItem.dano}`} color="error" size="small" />}
                                {descItem.ataque && <Chip label={`🎯 Ataque: +${descItem.ataque}`} sx={{ backgroundColor: '#162A22', color: 'white' }} size="small" />}
                                {descItem.critico && <Chip label={`Crítico: ${descItem.critico}`} color="warning" size="small" />}
                                {descItem.tipoDano && <Chip label={`Tipo: ${descItem.tipoDano}`} variant="outlined" size="small" />}
                                {(descItem.defesa || descItem.bonusDefesa) && (
                                    <Chip
                                        icon={<ShieldIcon />}
                                        label={descItem.tipo?.toLowerCase() === 'pesada' ? `Defesa: ${descItem.defesa}` : `Defesa: +${descItem.bonusDefesa || descItem.defesa}`}
                                        color="primary" size="small"
                                    />
                                )}
                                {descItem.forca && <Chip label={`Força mín: ${descItem.forca}`} variant="outlined" size="small" />}
                                {descItem.penalidade && (() => {
                                    const pen = descItem.penalidade;
                                    const partes = [];
                                    if (typeof pen === 'object') {
                                        if (pen.velocidade && pen.velocidade !== 0) partes.push(`${pen.velocidade}m mov`);
                                        if (pen.furtividade && pen.furtividade !== 0) partes.push(`${pen.furtividade} furtiv`);
                                    } else {
                                        partes.push(String(pen));
                                    }
                                    return partes.length > 0
                                        ? <Chip label={`Penalidade: ${partes.join(' / ')}`} color="error" variant="outlined" size="small" />
                                        : null;
                                })()}
                                {descItem.categoriaProf && <Chip label={`Prof: ${descItem.categoriaProf}`} variant="outlined" size="small" />}
                                {descItem.price > 0 && <Chip label={`${descItem.price} M.O`} variant="outlined" size="small" />}
                            </Box>

                            {/* Propriedades */}
                            {descItem.propriedades?.length > 0 && (
                                <Box>
                                    <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: 12, color: 'var(--text-primary)', mb: 0.5 }}>Propriedades:</Typography>
                                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', p: 1, backgroundColor: '#f5ebe3', borderRadius: 1 }}>
                                        {descItem.propriedades.map((p, i) => {
                                            const label = typeof p === 'object' && p !== null
                                                ? Object.values(p).filter(Boolean).join(' — ')
                                                : String(p ?? '');
                                            return <Chip key={i} label={label} size="small" sx={{ backgroundColor: 'var(--surface-paper)', color: 'var(--text-primary)', fontSize: 11 }} />;
                                        })}
                                    </Box>
                                </Box>
                            )}

                            {/* Efeitos especiais */}
                            {descItem.efeitosEspeciais?.length > 0 && (
                                <Box>
                                    <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: 12, color: 'var(--text-primary)', mb: 0.5 }}>Efeitos Especiais:</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, p: 1, backgroundColor: 'var(--surface-default)', borderRadius: 1 }}>
                                        {descItem.efeitosEspeciais.map((e, i) => {
                                            if (typeof e === 'object' && e !== null) {
                                                const gatilho = e.gatilho || e.trigger || '';
                                                const efeito  = e.efeito  || e.effect  || Object.values(e).filter(Boolean).join(' — ');
                                                return (
                                                    <Box key={i} sx={{ backgroundColor: 'var(--surface-paper)', borderRadius: 1, px: 1.5, py: 0.75, borderLeft: '3px solid #2F3C29' }}>
                                                        {gatilho && (
                                                            <Typography sx={{ fontSize: 10, fontWeight: 'bold', color: 'var(--text-primary)', fontFamily: 'Esteban, serif' }}>
                                                                {gatilho}
                                                            </Typography>
                                                        )}
                                                        <Typography sx={{ fontSize: 12, color: 'var(--text-primary)', fontFamily: 'Esteban, serif', lineHeight: 1.5 }}>
                                                            {efeito}
                                                        </Typography>
                                                    </Box>
                                                );
                                            }
                                            return <Chip key={i} label={String(e ?? '')} size="small" sx={{ backgroundColor: 'var(--surface-paper)', color: 'var(--text-primary)', fontSize: 11 }} />;
                                        })}
                                    </Box>
                                </Box>
                            )}

                            {/* Descrição textual */}
                            <Box sx={{ backgroundColor: 'var(--surface-default)', borderLeft: '3px solid #756A34', borderRadius: 1, p: 1.5 }}>
                                <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: 12, color: 'var(--text-primary)', mb: 0.5 }}>Descrição:</Typography>
                                <Typography className="esteban" variant="body2" sx={{ color: 'var(--text-primary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                                    {descItem.description || 'Nenhuma descrição disponível.'}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ backgroundColor: 'var(--surface-raised)', borderTop: '1px solid #756A3444', px: 2, py: 1 }}>
                    {descItem && getEquipStatus(descItem).equipavel && (
                        <Button
                            variant={getEquipStatus(descItem).equipado ? 'contained' : 'outlined'}
                            size="small"
                            onClick={() => { handleEquiparItem(descItem); setDescItem(null); }}
                            sx={getEquipStatus(descItem).equipado
                                ? { backgroundColor: '#2F3C29', color: 'white', fontFamily: 'Esteban, serif', '&:hover': { backgroundColor: '#162A22' } }
                                : { borderColor: '#756A34', color: 'var(--text-primary)', fontFamily: 'Esteban, serif' }
                            }
                        >
                            {getEquipStatus(descItem).equipado ? 'Desequipar' : 'Equipar'}
                        </Button>
                    )}
                    <Button onClick={() => setDescItem(null)} sx={{ color: 'var(--text-primary)', fontFamily: 'Esteban, serif' }}>Fechar</Button>
                </DialogActions>
            </Dialog>

            {/* ── Modal Loja de Equipamentos ── */}
            <Dialog
                open={shopOpen}
                onClose={() => setShopOpen(false)}
                maxWidth="lg"
                fullWidth
                scroll="paper"
                PaperProps={{ sx: { borderRadius: 3, border: '2px solid #756A34', maxHeight: '90vh' } }}
            >
                <DialogTitle component="div" sx={{
                    background: 'linear-gradient(135deg, #2F3C29 0%, #454E30 50%, #756A34 100%)',
                    color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontFamily: 'Esteban, serif', fontSize: '1.3rem', py: 1.5,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ShoppingCartIcon /> Loja de Equipamentos
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                            label={`💰 Disponível: ${dinheiroTotal.toFixed(2)} M.O.`}
                            sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '12px' }}
                        />
                        <IconButton onClick={() => setShopOpen(false)} sx={{ color: 'var(--text-primary)' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers sx={{ backgroundColor: '#FAF6F0', p: 0, overflow: 'auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <EquipmentShopTab
                            categories={equipmentCatalog}
                            selectedItems={selectedItems}
                            selectedItemsBG={[]}
                            handleChangeShop={handleChangeShop}
                            handleRemove={handleRemoveFromCart}
                            totalSpent={totalSpent}
                            goldLimit={dinheiroTotal}
                            inicialMoney={dinheiroTotal.toFixed(2)}
                        />
                    </Box>
                </DialogContent>
                {selectedItems.length > 0 && (
                    <Box sx={{
                        p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        borderTop: '2px solid #756A34', backgroundColor: 'var(--surface-default)',
                    }}>
                        <Typography className="esteban" component="div" sx={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>
                            Total: {totalSpent().toFixed(2)} M.O. de {dinheiroTotal.toFixed(2)} M.O.
                            {totalSpent() > dinheiroTotal && (
                                <Chip label="Sem dinheiro suficiente!" size="small" color="error" sx={{ ml: 1, fontWeight: 'bold' }} />
                            )}
                        </Typography>
                        <Button
                            variant="contained"
                            disabled={totalSpent() > dinheiroTotal || totalSpent() <= 0}
                            onClick={handleConfirmPurchase}
                            sx={{
                                backgroundColor: '#2F3C29', fontFamily: 'Esteban, serif', fontSize: '14px',
                                '&:hover': { backgroundColor: '#454E30' },
                                '&.Mui-disabled': { backgroundColor: '#ccc' },
                            }}
                        >
                            ✅ Confirmar Compra ({selectedItems.length} {selectedItems.length === 1 ? 'item' : 'itens'})
                        </Button>
                    </Box>
                )}
            </Dialog>
        </Card>
    );
};

export default EquipamentosSection;
