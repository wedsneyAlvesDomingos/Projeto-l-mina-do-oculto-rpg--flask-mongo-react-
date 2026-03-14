import React from 'react';
import { Box, Typography, Paper, CardContent, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

// ============================================================
// AntecedenteCard — Card individual de antecedente
// ============================================================
const AntecedenteCard = ({ antecedente, selected, onSelect }) => (
    <Paper
        sx={{
            minWidth: 275,
            my: 2,
            p: 2,
            borderTop: "4px solid #162A22",
            borderBottom: "8px solid #162A22",
            height: '470px',
            position: 'relative',
            width: '23%'
        }}
        onClick={() => onSelect(antecedente)}
    >
        <CardContent>
            <FormControlLabel
                value={antecedente.nome}
                control={<Radio checked={selected} />}
                label=""
                sx={{ position: 'absolute', top: 8, right: 8 }}
            />

            <Typography className="boxTextTitle" variant="h6" component="div">
                {antecedente.nome}
            </Typography>

            <Box
                className="armaCard"
                sx={{
                    height: "150px",
                    overflowY: 'scroll',
                    p: 1,
                    border: "1px solid #5B1F0F",
                    borderRadius: '10px',
                    mt: 2,
                }}
            >
                <Typography className="bigBoxTextEquips">
                    {antecedente.descricao}
                </Typography>
            </Box>

            <ul>
                {antecedente.habilidades.map((hab, index) => (
                    <li className="bigBoxTextBG" key={index}>
                        {hab}
                    </li>
                ))}
            </ul>
        </CardContent>
    </Paper>
);

// ============================================================
// BackgroundTab — Tab 4 (Antecedente)
// ============================================================
const BackgroundTab = React.memo(function BackgroundTab({
    antecedentes,
    antecedenteSelecionado,
    handleAntecedenteChange,
}) {
    return (
        <FormControl component="fieldset">
            <RadioGroup>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'start', gap: 1 }}>
                    {antecedentes.map((ant) => (
                        <AntecedenteCard
                            key={ant.nome}
                            antecedente={ant}
                            selected={antecedenteSelecionado?.nome === ant.nome}
                            onSelect={handleAntecedenteChange}
                        />
                    ))}
                </Box>
            </RadioGroup>
        </FormControl>
    );
});

export default BackgroundTab;
