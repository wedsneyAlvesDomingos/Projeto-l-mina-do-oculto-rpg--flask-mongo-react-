import React, { useState } from 'react';
import {
    Box, Typography, Tooltip, Chip, IconButton,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Linha individual de item na tabela
const ItemRow = React.memo(function ItemRow({ item, category, selectedItems, handleChangeShop, handleRemove, totalSpent, goldLimit }) {
    const key = `${category}-${item.name}`;
    const sel = selectedItems.find(i => i.key === key);
    const qty = sel ? sel.quantity : 0;
    const canAdd = totalSpent() + item.price <= goldLimit;

    const extraInfo = [
        item.defesa && `Def: ${item.defesa}`,
        item.forca && `Força req: ${item.forca}`,
        item.dano && `Dano: ${item.dano}`,
    ].filter(Boolean).join(' | ');

    return (
        <TableRow sx={{ backgroundColor: qty > 0 ? '#756A3412' : 'transparent' }}>
            <TableCell sx={{ py: 1 }}>
                {item.description ? (
                    <Tooltip title={item.description} arrow placement="right">
                        <Typography variant="body2" className="esteban" sx={{ cursor: 'help' }}>
                            {item.name}
                        </Typography>
                    </Tooltip>
                ) : (
                    <Typography variant="body2" className="esteban">{item.name}</Typography>
                )}
                {extraInfo && (
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        {extraInfo}
                    </Typography>
                )}
            </TableCell>
            <TableCell align="right" sx={{ py: 1, whiteSpace: 'nowrap' }}>
                <Typography variant="body2" className="esteban">{item.price}</Typography>
            </TableCell>
            <TableCell align="center" sx={{ py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                    <IconButton
                        size="small"
                        disabled={qty === 0}
                        onClick={() => handleRemove(sel)}
                        sx={{ color: '#7B3311', '&:disabled': { opacity: 0.3 } }}
                    >
                        <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2" className="esteban" sx={{ minWidth: 20, textAlign: 'center', fontWeight: 'bold' }}>
                        {qty}
                    </Typography>
                    <IconButton
                        size="small"
                        disabled={!canAdd}
                        onClick={() => handleChangeShop(category, item)}
                        sx={{ color: '#2E7D32', '&:disabled': { opacity: 0.3 } }}
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Box>
            </TableCell>
            <TableCell align="right" sx={{ py: 1, whiteSpace: 'nowrap' }}>
                <Typography variant="body2" className="esteban" sx={{ fontWeight: qty > 0 ? 'bold' : 'normal' }}>
                    {qty > 0 ? `${(item.price * qty).toFixed(2)}` : '—'}
                </Typography>
            </TableCell>
        </TableRow>
    );
});

// Seção de categoria com collapse
const CategorySection = React.memo(function CategorySection({
    category, items, selectedItems, handleChangeShop, handleRemove, totalSpent, goldLimit,
}) {
    const [open, setOpen] = useState(true);
    const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    const categoryQty = sorted.reduce((acc, item) => {
        const sel = selectedItems.find(i => i.key === `${category}-${item.name}`);
        return acc + (sel ? sel.quantity : 0);
    }, 0);

    return (
        <Paper elevation={1} sx={{ mb: 0, flex: '1 1 370px', maxWidth: 510, minWidth: 310, height: 420, border: '1px solid #7B331133', borderRadius: 2, overflow: 'hidden', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Box
                onClick={() => setOpen(prev => !prev)}
                sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    cursor: 'pointer', py: 1, px: 1.5,
                    borderBottom: '2px solid #7B3311',
                    '&:hover': { backgroundColor: '#756A3411' },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#7B3311' }}>
                        {category}
                    </Typography>
                    {categoryQty > 0 && (
                        <Chip label={`${categoryQty} selecionado(s)`} size="small" sx={{ backgroundColor: '#756A34', color: '#fff', fontSize: '11px' }} />
                    )}
                </Box>
                {open ? <ExpandLessIcon sx={{ color: '#7B3311' }} /> : <ExpandMoreIcon sx={{ color: '#7B3311' }} />}
            </Box>
            {open && (
                <TableContainer className="equipTableScroll" sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow sx={{ '& th': { fontWeight: 'bold', color: '#162A22', fontSize: '12px', py: 0.5, backgroundColor: '#C4A265' } }}>
                                <TableCell>Nome</TableCell>
                                <TableCell align="right">M.O.</TableCell>
                                <TableCell align="center">QTD.</TableCell>
                                <TableCell align="right">Gasto</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sorted.map(item => (
                                <ItemRow
                                    key={`${category}-${item.name}`}
                                    item={item} category={category}
                                    selectedItems={selectedItems}
                                    handleChangeShop={handleChangeShop}
                                    handleRemove={handleRemove}
                                    totalSpent={totalSpent}
                                    goldLimit={goldLimit}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Paper>
    );
});

const EquipmentShopTab = React.memo(function EquipmentShopTab({
    categories,
    selectedItems, selectedItemsBG,
    handleChangeShop, handleRemove,
    totalSpent, goldLimit, inicialMoney,
}) {
    const remaining = (inicialMoney - totalSpent()).toFixed(2);
    const overBudget = totalSpent() > goldLimit;

    return (
        <Box sx={{ width: '100%', position: 'relative', marginBottom: '200px' }}>
            <Box my={4}>
                <Typography className="esteban" sx={{ color: '#7B3311 !important', fontSize: '22px !important' }} variant="h4" gutterBottom>
                    Loja de Itens
                </Typography>

                <Typography className="esteban" sx={{ my: 2 }}>
                    Atenção:<br />
                    Armaduras pesadas requerem um mínimo de força, se usadas sem esse pré requisito sofre as seguintes penalidades:<br />
                    -1,5 m de velocidade de movimento por ponto de força abaixo do requerido.<br />
                    -1 em rolamento de acerto de qualquer teste de combate por ponto de força abaixo do requerimento.<br />
                    Requer duas ações para usar a ação andar/correr ao invés de apenas uma.<br />
                    Armaduras pesadas, mesmo se atingir o requerimento de força, sofrem penalidade em testes de furtividade de -5 e armaduras médias sofrem uma penalidade de -2.<br />
                    Se uma criatura que não receber capacidade de usar um tipo de armadura usá-la mesmo assim se torna incapaz de conjurar magias, milagres, feitiços, manobras e quaisquer habilidades. Além disso, todo rolamento de habilidade possui desvantagem.
                </Typography>

                {/* Resumo financeiro + inventário */}
                <Paper
                    elevation={2}
                    sx={{
                        position: { xs: 'relative', md: 'sticky' },
                        top: { md: 0 },
                        zIndex: 10,
                        p: 2, mb: 3,
                        border: '2px solid #7B3311',
                        borderRadius: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography className="esteban" variant="h6" color={overBudget ? "error" : "primary"}>
                            Total: {totalSpent().toFixed(2)} M.O. / {inicialMoney} M.O.
                        </Typography>
                        <Typography className="esteban" variant="body2" sx={{ color: overBudget ? '#d32f2f' : '#2E7D32' }}>
                            Restante: {remaining} M.O.
                        </Typography>
                    </Box>

                    {/* Itens de antecedente */}
                    {selectedItemsBG.length > 0 && (
                        <Box sx={{ mb: 1 }}>
                            <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold' }}>Itens de Antecedente:</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selectedItemsBG.map(item => (
                                    <Chip
                                        key={item.key}
                                        label={`${item.name} x${item.quantity}`}
                                        size="small"
                                        sx={{ m: 0.25, backgroundColor: '#e8f5e9' }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    )}

                    {/* Inventário comprado */}
                    <Box>
                        <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                            Inventário ({selectedItems.reduce((a, i) => a + i.quantity, 0)} itens):
                        </Typography>
                        {selectedItems.length === 0 ? (
                            <Typography className="esteban" variant="body2" sx={{ color: 'text.secondary' }}>
                                Nenhum item selecionado.
                            </Typography>
                        ) : (
                            <TableContainer sx={{ maxHeight: 200 }}>
                                <Table size="small">
                                    <TableBody>
                                        {selectedItems.map(item => (
                                            <TableRow key={item.key} sx={{ '& td': { py: 0.25, border: 0 } }}>
                                                <TableCell>
                                                    <Typography variant="body2" className="esteban">{item.name}</Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                                        <IconButton size="small" onClick={() => handleRemove(item)} sx={{ color: '#7B3311', p: 0.25 }}>
                                                            <RemoveIcon sx={{ fontSize: 16 }} />
                                                        </IconButton>
                                                        <Typography variant="body2" className="esteban" sx={{ fontWeight: 'bold', minWidth: 16, textAlign: 'center' }}>
                                                            {item.quantity}
                                                        </Typography>
                                                        <IconButton
                                                            size="small"
                                                            disabled={totalSpent() + item.price > goldLimit}
                                                            onClick={() => handleChangeShop(item.category, item)}
                                                            sx={{ color: '#2E7D32', p: 0.25 }}
                                                        >
                                                            <AddIcon sx={{ fontSize: 16 }} />
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2" className="esteban">
                                                        {(item.price * item.quantity).toFixed(2)} M.O.
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>
                </Paper>

                {/* Tabelas por categoria */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
                    {Object.entries(categories)
                        .sort(([a], [b]) => a.localeCompare(b, 'pt-BR'))
                        .map(([category, items]) => (
                            <CategorySection
                                key={category}
                                category={category}
                                items={items}
                                selectedItems={selectedItems}
                                handleChangeShop={handleChangeShop}
                                handleRemove={handleRemove}
                                totalSpent={totalSpent}
                                goldLimit={goldLimit}
                            />
                        ))}
                </Box>
            </Box>
        </Box>
    );
});

export default EquipmentShopTab;
