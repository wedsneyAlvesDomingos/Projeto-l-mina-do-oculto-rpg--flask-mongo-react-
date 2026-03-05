import React from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Card,
    CardHeader,
    CardContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Button,
    IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useCharacter } from './CharacterContext';
import { EditableField } from './EditableField';

const EquipamentosSection = () => {
    const {
        character,
        editMode,
        sectionStyle,
        cardHeaderStyle,
        updateField,
        armasEquipadas,
        armaduraEquipada,
        escudoEquipado,
        equiparArma,
        equiparArmadura,
        equiparEscudo,
        desequiparArmadura,
        desequiparEscudo,
        rollDice,
        rollWeaponDamage,
        isAcuidadeWeapon,
        hasAcuidadeRegalia,
    } = useCharacter();

    if (!character) return null;

    const equipamentos = character.equipamentos || [];

    const categorias = {};
    equipamentos.forEach(item => {
        const cat = item.category || 'Outros';
        if (!categorias[cat]) categorias[cat] = [];
        categorias[cat].push(item);
    });

    const handleRemoveEquipamento = (index) => {
        const newEquipamentos = [...equipamentos];
        newEquipamentos.splice(index, 1);
        updateField('equipamentos', newEquipamentos);
    };

    const handleUpdateEquipamento = (index, field, value) => {
        const newEquipamentos = [...equipamentos];
        newEquipamentos[index] = { ...newEquipamentos[index], [field]: value };
        updateField('equipamentos', newEquipamentos);
    };

    // Funções auxiliares para verificar se item está equipado
    const isArmaEquipada = (item) => {
        return armasEquipadas.some(arma => arma && arma.name === item.name);
    };

    const isArmaduraEquipada = (item) => {
        return armaduraEquipada && armaduraEquipada.name === item.name;
    };

    const isEscudoEquipado = (item) => {
        return escudoEquipado && escudoEquipado.name === item.name;
    };

    // Verificar tipo de item
    const isArma = (item) => {
        return item.dano || 
            item.category?.toLowerCase().includes('arma') ||
            item.category?.toLowerCase().includes('weapon');
    };

    const isArmadura = (item) => {
        return (item.category?.toLowerCase().includes('armadura') || 
            item.defesa !== undefined || 
            item.bonusDefesa !== undefined ||
            item.tipo?.toLowerCase().includes('leve') ||
            item.tipo?.toLowerCase().includes('media') ||
            item.tipo?.toLowerCase().includes('pesada')) &&
            !item.category?.toLowerCase().includes('escudo');
    };

    const isEscudo = (item) => {
        return item.category?.toLowerCase().includes('escudo') ||
            item.category?.toLowerCase().includes('shield');
    };

    // Função para equipar/desequipar item
    const handleEquiparItem = (item) => {
        // IMPORTANTE: Verificar escudo primeiro, depois armadura, depois arma
        if (isEscudo(item)) {
            if (isEscudoEquipado(item)) {
                desequiparEscudo();
            } else {
                equiparEscudo(item);
            }
        } else if (isArmadura(item)) {
            if (isArmaduraEquipada(item)) {
                desequiparArmadura();
            } else {
                equiparArmadura(item);
            }
        } else if (isArma(item)) {
            if (isArmaEquipada(item)) {
                // Desequipar
                const slot = armasEquipadas.findIndex(a => a && a.name === item.name);
                if (slot !== -1) equiparArma(null, slot);
            } else {
                // Equipar no primeiro slot vazio, ou slot 0 se ambos ocupados
                const slotVazio = armasEquipadas.findIndex(a => !a);
                equiparArma(item, slotVazio !== -1 ? slotVazio : 0);
            }
        }
    };

    // Verificar se item é equipável e se está equipado
    const getEquipStatus = (item) => {
        if (isEscudo(item)) return { equipavel: true, equipado: isEscudoEquipado(item), tipo: 'escudo' };
        if (isArmadura(item)) return { equipavel: true, equipado: isArmaduraEquipada(item), tipo: 'armadura' };
        if (isArma(item)) return { equipavel: true, equipado: isArmaEquipada(item), tipo: 'arma' };
        return { equipavel: false, equipado: false, tipo: null };
    };

    return (
        <Card sx={{ ...sectionStyle, mt: 2 }}>
            <CardHeader
                sx={cardHeaderStyle}
                title={
                    <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <InventoryIcon /> Equipamentos ({equipamentos.length})
                    </Typography>
                }
            />
            <CardContent>
                {Object.entries(categorias).map(([categoria, items]) => (
                    <Accordion key={categoria} defaultExpanded sx={{ mb: 1, backgroundColor: '#f5f3eb' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A' }}>
                                {categoria} ({items.length})
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                {items.map((item, idx) => {
                                    const globalIndex = equipamentos.findIndex(e => e.key === item.key);
                                    const equipStatus = getEquipStatus(item);
                                    return (
                                        <Grid item xs={12} md={6} lg={4} key={item.key || idx}>
                                            <Paper sx={{ 
                                                p: 2, 
                                                borderLeft: equipStatus.equipado ? '4px solid #2F3C29' : '4px solid #756A34',
                                                backgroundColor: equipStatus.equipado ? '#e8f0e8' : 'inherit',
                                                transition: 'all 0.2s ease'
                                            }}>
                                                {editMode ? (
                                                    <>
                                                        <EditableField
                                                            fullWidth
                                                            size="small"
                                                            label="Nome"
                                                            value={item.name || ''}
                                                            onChange={(val) => handleUpdateEquipamento(globalIndex, 'name', val)}
                                                            sx={{ mb: 1 }}
                                                        />
                                                        <EditableField
                                                            fullWidth
                                                            size="small"
                                                            type="number"
                                                            label="Quantidade"
                                                            value={item.quantity || 1}
                                                            onChange={(val) => handleUpdateEquipamento(globalIndex, 'quantity', parseInt(val) || 1)}
                                                            sx={{ mb: 1 }}
                                                        />
                                                        <IconButton 
                                                            size="small" 
                                                            color="error"
                                                            onClick={() => handleRemoveEquipamento(globalIndex)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                                            {item.name} {item.quantity > 1 && `(x${item.quantity})`}
                                                        </Typography>
                                                        {item.description && (
                                                            <Typography className="esteban" variant="body2" sx={{ color: '#5B1F0F', mt: 0.5 }}>
                                                                {item.description}
                                                            </Typography>
                                                        )}
                                                        <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                                                            {/* Botões de rolagem para armas */}
                                                            {item.dano && (
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                    <Chip 
                                                                        size="small" 
                                                                        label={`🎲 Dano: ${item.dano}${isAcuidadeWeapon && isAcuidadeWeapon(item) && hasAcuidadeRegalia && hasAcuidadeRegalia() ? ' (Acuidade)' : ''}`} 
                                                                        color="error"
                                                                        onClick={() => rollWeaponDamage(item.dano, item.name, false, item)}
                                                                        sx={{ cursor: 'pointer', '&:hover': { transform: 'scale(1.05)' } }}
                                                                        title={`Clique para rolar dano`}
                                                                    />
                                                                    <Chip 
                                                                        size="small" 
                                                                        label="💀 CRIT"
                                                                        sx={{ 
                                                                            backgroundColor: '#7B3311', 
                                                                            color: 'white',
                                                                            cursor: 'pointer',
                                                                            '&:hover': { transform: 'scale(1.05)' }
                                                                        }}
                                                                        onClick={() => rollWeaponDamage(item.dano, item.name, true, item)}
                                                                        title="Rolar dano crítico (dobrado)"
                                                                    />
                                                                </Box>
                                                            )}
                                                            {item.ataque && (
                                                                <Chip 
                                                                    size="small" 
                                                                    label={`🎯 Ataque: d20+${item.ataque}`}
                                                                    sx={{ 
                                                                        backgroundColor: '#162A22', 
                                                                        color: 'white',
                                                                        cursor: 'pointer',
                                                                        '&:hover': { transform: 'scale(1.05)' }
                                                                    }}
                                                                    onClick={() => rollDice(20, 1, parseInt(item.ataque) || 0, `Ataque com ${item.name}`)}
                                                                    title="Rolar ataque"
                                                                />
                                                            )}
                                                            {item.critico && <Chip size="small" label={`Crítico: ${item.critico}`} color="warning" />}
                                                            {(item.defesa || item.bonusDefesa) && (
                                                                <Chip 
                                                                    size="small" 
                                                                    label={item.tipo?.toLowerCase() === 'pesada' 
                                                                        ? `🛡️ Defesa: ${item.defesa}` 
                                                                        : `🛡️ Defesa: +${item.bonusDefesa || item.defesa}`
                                                                    } 
                                                                    color="primary" 
                                                                />
                                                            )}
                                                            {item.price && <Chip size="small" label={`${item.price} M.O`} variant="outlined" />}
                                                            
                                                            {/* Botão Equipar/Desequipar */}
                                                            {equipStatus.equipavel && (
                                                                <>
                                                                    {equipStatus.equipado ? (
                                                                        <Chip 
                                                                            size="small" 
                                                                            label="✓ Equipado"
                                                                            onDelete={() => handleEquiparItem(item)}
                                                                            sx={{ 
                                                                                backgroundColor: '#2F3C29', 
                                                                                color: 'white',
                                                                                fontWeight: 'bold',
                                                                                '& .MuiChip-deleteIcon': { color: 'white' }
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <Button
                                                                            size="small"
                                                                            variant="outlined"
                                                                            onClick={() => handleEquiparItem(item)}
                                                                            sx={{ 
                                                                                borderColor: '#756A34', 
                                                                                color: '#40150A',
                                                                                fontSize: '11px',
                                                                                py: 0.25,
                                                                                minWidth: 'auto'
                                                                            }}
                                                                        >
                                                                            Equipar
                                                                        </Button>
                                                                    )}
                                                                </>
                                                            )}
                                                        </Box>
                                                    </>
                                                )}
                                            </Paper>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                ))}
                {equipamentos.length === 0 && (
                    <Typography className="esteban" sx={{ textAlign: 'center', color: '#5B1F0F' }}>
                        Nenhum equipamento cadastrado.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default EquipamentosSection;
