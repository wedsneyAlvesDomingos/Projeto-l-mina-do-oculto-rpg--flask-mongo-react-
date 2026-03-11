import React from 'react';
import { Box, Typography, Grid, Card, CardHeader, CardContent, FormControlLabel, Checkbox } from '@mui/material';

const ProfessionTab = React.memo(function ProfessionTab({
    profissoes,
    selectedId,
    handleToggle,
    professionRegAntecedente,
}) {
    return (
        <Box className="esteban" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                {profissoes.map((prof) => (
                    <Grid item xs={12} md={6} key={prof.nome}>
                        <Card
                            variant={selectedId.startsWith(prof.nome + '::') ? 'outlined' : 'elevation'}
                            sx={{
                                borderBottom: '6px solid #7B3311',
                                height: '320px',
                                overflowY: 'scroll',
                                background: '#EDEDED',
                                borderColor: selectedId.startsWith(prof.nome + '::') ? 'primary.main' : undefined
                            }}
                        >
                            <CardHeader title={prof.nome} subheader={`Ambiente: ${prof.ambiente || prof.ambienteEmprego}`} />
                            <CardContent>
                                <Typography sx={{ marginBottom: 4 }}>{prof.descricao}</Typography>
                                {prof.habilidades
                                    .filter(hab => {
                                        const nome = hab.nome;
                                        const nivelMatch = nome.match(/Nível (\d+)/i);
                                        if (nivelMatch && parseInt(nivelMatch[1], 10) >= 2) return false;
                                        const plusMatch = nome.match(/\+(\d+)/);
                                        if (plusMatch && parseInt(plusMatch[1], 10) >= 2) return false;
                                        return true;
                                    })
                                    .map((hab) => {
                                        const id = `${prof.nome}::${hab.nome}`;
                                        return (
                                            <Box key={id} mb={1}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={selectedId === id}
                                                            disabled={hab.nome === professionRegAntecedente.habilidades}
                                                            onChange={() => {
                                                                handleToggle(prof.nome, hab.nome);
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        <Box>
                                                            <Typography variant="subtitle2" component="div">
                                                                {hab.nome}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {hab.descricao}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />
                                            </Box>
                                        );
                                    })}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
});

export default ProfessionTab;
