import React from 'react';
import {
    Card, CardHeader, CardContent, Grid, Box, Typography, Chip,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CasinoIcon from '@mui/icons-material/Casino';
import { EditableField } from './EditableField';

const HabilidadesSection = React.memo(({
    character, editMode, sectionStyle, cardHeaderStyle, updateField, rollSkillCheck
}) => {
    const habilidades = character.habilidades || {};

    return (
        <Card sx={sectionStyle}>
            <CardHeader sx={cardHeaderStyle} title={
                <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FitnessCenterIcon /> Habilidades
                </Typography>
            } />
            <CardContent>
                <Typography className="esteban" variant="body2" sx={{ color: '#5B1F0F', mb: 2, textAlign: 'center' }}>
                    💡 Clique em uma habilidade para rolar um teste (d20 + modificador)
                </Typography>
                <Grid container spacing={2}>
                    {Object.entries(habilidades).map(([key, value]) => (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={key}>
                            <Box
                                onClick={() => !editMode && rollSkillCheck(value, key)}
                                sx={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1,
                                    borderRadius: 1, backgroundColor: value !== 0 ? '#edecd8' : '#f5f3eb',
                                    border: '1px solid #756A3466',
                                    cursor: editMode ? 'default' : 'pointer', transition: 'all 0.2s',
                                    '&:hover': editMode ? {} : { transform: 'scale(1.05)', boxShadow: 3, backgroundColor: value !== 0 ? '#e0dfc4' : '#edecd8' }
                                }}
                            >
                                <Typography className="esteban" variant="body2" sx={{ textAlign: 'center', fontSize: '11px', mb: 0.5, color: '#5B1F0F' }}>{key}</Typography>
                                {editMode ? (
                                    <EditableField type="number" size="small" value={value}
                                        onChange={(val) => updateField(`habilidades.${key}`, parseInt(val) || 0)}
                                        sx={{ width: '60px' }} inputProps={{ style: { textAlign: 'center', padding: '4px' } }} />
                                ) : (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <CasinoIcon sx={{ fontSize: 14, color: '#5B1F0F' }} />
                                        <Chip label={value >= 0 ? `+${value}` : value} size="small" sx={{
                                            backgroundColor: value > 0 ? '#454E30' : value < 0 ? '#931C4A' : '#756A34',
                                            color: 'white', fontWeight: 'bold', minWidth: '45px'
                                        }} />
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
});

export default HabilidadesSection;
