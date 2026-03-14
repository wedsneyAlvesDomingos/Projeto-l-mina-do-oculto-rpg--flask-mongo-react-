import React from 'react';
import {
    Card, CardHeader, CardContent, Grid, Box, Typography, Chip, Tooltip,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { EditableField } from './EditableField';
import { getProficiencia } from '../../../data/constants';

const ProficienciasSection = React.memo(({
    character, editMode, sectionStyle, cardHeaderStyle, updateField
}) => {
    const proficiencias = character.proficiencias || {};

    const getNivelTooltip = (key, currentValue) => {
        const profData = getProficiencia(key);
        if (!profData || !profData.niveis) return `Nível atual: ${currentValue}`;
        return (
            <Box sx={{ p: 1, maxWidth: 350 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, borderBottom: '1px solid rgba(255,255,255,0.3)', pb: 0.5 }}>
                    {profData.nome}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>{profData.descricao}</Typography>
                <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>Níveis:</Typography>
                {profData.niveis.map(({ nivel, descricao }) => (
                    <Box key={nivel} sx={{ mb: 0.5, pl: 1, borderLeft: currentValue >= nivel ? '2px solid #BB8130' : '2px solid rgba(255,255,255,0.2)', opacity: currentValue >= nivel ? 1 : 0.6 }}>
                        <Typography variant="caption" sx={{ fontWeight: currentValue >= nivel ? 'bold' : 'normal' }}>
                            Nível {nivel}: {descricao}
                        </Typography>
                    </Box>
                ))}
                {currentValue === 0 && <Typography variant="caption" sx={{ color: 'var(--text-primary)', display: 'block', mt: 1 }}>⚠️ Nenhum nível adquirido</Typography>}
            </Box>
        );
    };

    return (
        <Card sx={{ mt: 0, ...sectionStyle }}>
            <CardHeader sx={cardHeaderStyle} titleTypographyProps={{ component: 'div' }} title={
                <Typography className="esteban" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AutoAwesomeIcon /> Proficiências
                </Typography>
            } />
            <CardContent>
                <Grid container spacing={1}>
                    {Object.entries(proficiencias).map(([key, value]) => (
                        <Grid item xs={12} sm={6} md={4} key={key}>
                            <Tooltip title={getNivelTooltip(key, value)} placement="top" arrow enterDelay={300}
                                componentsProps={{ tooltip: { sx: { bgcolor: 'rgba(22, 42, 34, 0.95)', '& .MuiTooltip-arrow': { color: 'rgba(22, 42, 34, 0.95)' }, maxWidth: 400 } } }}>
                                <Box sx={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1,
                                    borderRadius: 1, backgroundColor: value !== 0 ? 'var(--surface-raised)' : 'var(--surface-default)',
                                    cursor: 'help', '&:hover': { backgroundColor: value !== 0 ? 'var(--surface-raised)' : 'var(--surface-default)' }
                                }}>
                                    <Typography className="esteban" variant="body2" sx={{ flex: 1 }}>{key.replace(/_/g, ' ')}</Typography>
                                    {editMode ? (
                                        <EditableField type="number" size="small" value={value}
                                            onChange={(val) => updateField(`proficiencias.${key}`, parseInt(val) || 0)}
                                            sx={{ width: '70px' }} inputProps={{ style: { textAlign: 'center' } }} />
                                    ) : (
                                        <Chip label={value >= 0 ? `+${value}` : value} size="small" sx={{
                                            backgroundColor: value > 0 ? '#454E30' : value < 0 ? '#931C4A' : '#756A34',
                                            color: 'white', fontWeight: 'bold', minWidth: '45px'
                                        }} />
                                    )}
                                </Box>
                            </Tooltip>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
});

export default ProficienciasSection;
