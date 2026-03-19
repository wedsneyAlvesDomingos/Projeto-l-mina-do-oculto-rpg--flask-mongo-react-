import React from 'react';
import { Box, Typography, Grid, Tooltip, Button, Chip, Divider } from '@mui/material';

const EquipmentShopTab = React.memo(function EquipmentShopTab({
    categories,
    selectedItems, selectedItemsBG,
    handleChangeShop, handleRemove,
    totalSpent, goldLimit, inicialMoney,
}) {
    return (
        <Box sx={{ width: '80%', position: 'relative', marginBottom: '200px' }}>
            <Box my={4}>
                <Typography className="esteban" sx={{ color: '#7B3311 !important', fontSize: '22px !important' }} variant="h4" gutterBottom>
                    Loja de Itens
                </Typography>

                <Typography className="esteban" variant="h6" color={totalSpent() > goldLimit ? "error" : "primary"}>
                    Total: {totalSpent().toFixed(2)} M.O. / {inicialMoney} M.O.
                </Typography>
                <Typography className="esteban" sx={{ my: 2 }}>
                    Atenção:<br />
                    Armaduras pesadas requerem um mínimo de força, se usadas sem esse pré requisito sofre as seguintes penalidades:<br />
                    -1,5 m de velocidade de  movimento por ponto de força abaixo do requerido.<br />
                    -1 em rolamento de acerto de qualquer teste de combate por ponto de força abaixo do requerimento.<br />
                    Requer duas ações para usar a ação andar/correr ao invés de apenas uma.<br />

                    Armaduras pesadas, mesmo se atingir o requerimento de força, sofrem penalidade em testes de furtividade de -5 e armaduras médias sofrem uma penalidade de -2.<br />
                    Se uma criatura que não receber capacidade de usar um tipo de armadura usá-la mesmo assim se torna incapaz de conjurar magias, milagres, feitiços, manobras e quaisquer habilidades. Além disso, todo rolamento de habilidade possui desvantagem.
                </Typography>
                <Box mt={4} id="itensBG">
                    <Typography className="esteban" variant="h5">Itens de Antecedente:</Typography>
                    {selectedItemsBG.length === 0 ? (
                        <Typography className="esteban">Nenhum para este antecedente.</Typography>
                    ) : (
                        selectedItemsBG.map(item => (
                            <Chip
                                key={item.key}
                                id={item.name.split(" ")[0]}
                                label={`${item.name} x${item.quantity} (${(item.price * item.quantity).toFixed(2)} M.O.)`}
                                sx={{ m: 0.5 }}
                            />
                        ))
                    )}
                </Box>
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 36,
                        right: 16,
                        border: '2px solid #7B3311',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 3,
                        zIndex: 1000,
                        maxWidth: '300px',
                        minWidth: '200px',
                        overflowY: 'scroll',
                        height: '300px'
                    }}
                >
                    <Typography className="esteban" variant="h5" sx={{ color: '#7B3311 !important' }}>
                        Inventário
                    </Typography>
                    <Typography className="esteban" variant="subtitle" color={totalSpent() > goldLimit ? "error" : "primary"} sx={{ fontSize: '12px !important' }}>
                        Total: {totalSpent().toFixed(2)} M.O. / {inicialMoney} M.O.
                    </Typography>
                    <Box mt={1}>
                        <Typography className="esteban" sx={{ fontSize: '12px !important' }} variant="subtitle1">Itens Selecionados:</Typography>
                        {selectedItems.length === 0 ? (
                            <Typography className="esteban" sx={{ fontSize: '12px !important' }} variant="body2">Nenhum item selecionado.</Typography>
                        ) : (
                            selectedItems.map(item => (
                                <Chip
                                    key={item.key}
                                    label={` ${item.quantity}x ${item.name} (${(item.price * item.quantity).toFixed(2)} M.O.)`}
                                    onDelete={() => handleRemove(item)}
                                    sx={{ m: 0.5 }}
                                />
                            ))
                        )}
                    </Box>
                </Box>

                {Object.entries(categories).map(([category, items]) => (
                    <Box key={category} my={3}>
                        <Typography className="esteban" sx={{ color: 'var(--text-primary)', my: 3 }} variant="h6">{category}</Typography>
                        <Grid container spacing={1} sx={{ display: 'flex !important', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'start', gap: 1 }}>
                            {items.map(item => {
                                const key = `${category}-${item.name}`;
                                const selected = selectedItems.some(i => i.key === key);
                                const disabled = totalSpent() + item.price > goldLimit;
                                const forcaRequisito = item.forca ? `Requisito de força: ${item.forca}` : "";
                                return (
                                    item.description ?
                                        <Tooltip title={`${item.description} ${forcaRequisito}`} key={key}>
                                            <Box sx={{ width: 'fitContent', background: disabled ? "#ffffff11" : "" }}>
                                                <Button
                                                    className="esteban"
                                                    variant={selected ? "contained" : "outlined"}
                                                    color={disabled ? "inherit" : "primary"}
                                                    disabled={disabled}
                                                    onClick={() => handleChangeShop(category, item)}
                                                    sx={{ fontSize: '14px !important', background: selected ? "#40150A" : "" }}
                                                >
                                                    {item.name} ({item.price} M.O.)
                                                </Button>
                                            </Box>
                                        </Tooltip> :
                                        <Box sx={{ width: 'fitContent' }} key={key}>
                                            <Button
                                                className="esteban"
                                                variant={selected ? "contained" : "outlined"}
                                                color={disabled ? "inherit" : "primary"}
                                                disabled={disabled}
                                                onClick={() => handleChangeShop(category, item)}
                                                sx={{ fontSize: '14px !important', background: selected ? "#40150A" : "" }}
                                            >
                                                {item.name} ({item.price} M.O.)
                                            </Button>
                                        </Box>
                                );
                            })}
                        </Grid>
                        <Divider sx={{ my: 2 }} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
});

export default EquipmentShopTab;
