import React from 'react';
import { Box, Typography, Paper, Tooltip, TextField } from '@mui/material';

// ============================================================
// ProfBox — Caixa de proficiência individual
// ============================================================
const ProfBox = ({ nome, descricao, notas, niveis, value, onChange, remainingPoints, borderColor = '#7B3311' }) => (
    <Paper
        elevation={3}
        sx={{ padding: 2, mx: 0, width: '24.5%', my: 1, borderBottom: `6px solid ${borderColor}` }}
    >
        <Tooltip
            title={descricao}
            placement="top"
            arrow
            enterDelay={300}
        >
            <Typography variant="h6" gutterBottom sx={{ cursor: 'help' }}>
                {nome}
            </Typography>
        </Tooltip>
        <Typography variant="body2" gutterBottom>
            {descricao}
        </Typography>
        {notas?.length > 0 && (
            <Box mb={1}>
                {notas.map((nota, idx) => (
                    <Typography key={idx} variant="caption" display="block">
                        • {nota}
                    </Typography>
                ))}
            </Box>
        )}
        <Box display="flex" alignItems="center" gap={1} mt={1}>
            <TextField
                label="Nível"
                type="number"
                size="small"
                value={value}
                onChange={(e) => {
                    const val = Math.max(0, parseInt(e.target.value) || 0);
                    onChange(nome, val);
                }}
                inputProps={{ min: 0, max: niveis.length, step: 1 }}
                sx={{ width: '80px' }}
            />
            <Typography variant="body2" color={remainingPoints === 0 ? 'error' : 'textSecondary'}>
                Restam: {remainingPoints}
            </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={1} mt={1}>
            {niveis.map(({ nivel, descricao: nivelDesc }) => (
                <Tooltip
                    key={nivel}
                    title={
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                Nível {nivel}
                            </Typography>
                            <Typography variant="body2">
                                {nivelDesc}
                            </Typography>
                            {value < nivel && (
                                <Typography variant="caption" sx={{ color: 'var(--text-primary)', display: 'block', mt: 1 }}>
                                    ⚠️ Você precisa de {nivel - value} ponto(s) a mais para desbloquear
                                </Typography>
                            )}
                        </Box>
                    }
                    placement="right"
                    arrow
                    enterDelay={200}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            opacity: value >= nivel ? 1 : 0.5,
                            cursor: 'help',
                            '&:hover': {
                                backgroundColor: value >= nivel ? 'rgba(187, 129, 48, 0.1)' : 'rgba(0,0,0,0.05)',
                                borderRadius: 1,
                                px: 0.5
                            }
                        }}
                    >
                        {nivel}. {nivelDesc}
                    </Typography>
                </Tooltip>
            ))}
        </Box>
    </Paper>
);

// ============================================================
// ProficienciesTab — Tab 3 (Proficiências)
// ============================================================
const ProficienciesTab = React.memo(function ProficienciesTab({
    proficiencias,
    values,
    handleProficienciaChange,
    remainingProfPoints,
}) {
    return (
        <>
            <Typography>Selecione proficiências iniciais.</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box display="flex" flexWrap="wrap" sx={{ justifyContent: 'start', gap: 1, width: '100%' }}>
                    {proficiencias.map((prof, idx) => (
                        <ProfBox
                            key={idx}
                            nome={prof.nome}
                            descricao={prof.descricao}
                            notas={prof.notas}
                            niveis={prof.niveis}
                            value={values[prof.nome]}
                            onChange={handleProficienciaChange}
                            remainingPoints={remainingProfPoints}
                            borderColor={prof.borderColor}
                        />
                    ))}
                </Box>
            </Box>
        </>
    );
});

export default ProficienciesTab;
