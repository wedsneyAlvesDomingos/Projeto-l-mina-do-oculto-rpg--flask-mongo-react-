import React from 'react';
import { Box, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem } from '@mui/material';

const SpeciesTab = React.memo(function SpeciesTab({
    especieSelecionada, handleSpeciesChange,
    regaliaEscolhida, setRegaliaEscolhida,
    disableMutationOptModal,
    racas, regaliasOpcionais,
}) {
    return (
        <>
            <FormControl fullWidth margin="normal">
                <InputLabel id="select-especie-label">Espécie</InputLabel>
                <Select
                    labelId="select-especie-label"
                    label="Espécie"
                    value={especieSelecionada}
                    onChange={handleSpeciesChange}
                    sx={{ borderRadius: '4px 4px 4px' }}
                >
                    {Object.keys(racas).map((key) => (
                        <MenuItem key={key} value={key}>
                            {racas[key].nome}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography variant="h6">{racas[especieSelecionada].nome}</Typography>
            <Typography className="bigBoxTextClasses" paragraph>{racas[especieSelecionada].descricao}</Typography>
            <Box>
                <Typography className="bigBoxTextEquipsHeader" sx={{ mb: 2 }}>
                    Escolha uma entre:
                </Typography>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Regalia Obrigatória</FormLabel>
                    <RadioGroup
                        name="regalia-escolhida"
                        value={regaliaEscolhida.regalias}
                        onChange={(e) => {
                            setRegaliaEscolhida({ especie: racas[especieSelecionada].nome, regalias: [e.target.value] });
                        }}
                    >
                        {racas[especieSelecionada].obrigatorias.map((opcao) => (
                            <FormControlLabel
                                key={opcao.id}
                                value={opcao.nome}
                                control={<Radio />}
                                label={
                                    <div>
                                        <strong>{opcao.nome}</strong><br />
                                        <Typography variant="body2">{opcao.descricao}</Typography>
                                    </div>
                                }
                                sx={{ alignItems: 'flex-start', my: 2 }}
                            />
                        ))}
                        <Box>
                            <Typography variant="h6" className="bigBoxTextClasses" sx={{ mb: 2 }}>
                                REGALIAS OPCIONAIS DE ESPÉCIE
                            </Typography>
                            <Typography className="bigBoxTextClasses">
                                Aqui o jogador pode encontrar opções para personalizar ainda mais seus personagens. A seguir temos várias opções que podem substituir a Regalia obrigatória de uma espécie. Assim sendo, como um exemplo, o personagem pode ser humano e começar com uma das opções abaixo ao invés das que estão inicialmente disponíveis para ele.
                                Ao escolher uma das opções abaixo é proibido escolher uma das outras. Após trocar a regalia inicial de classe, adicione as outras opções que sobraram da lista de escolhas para regalias de sua espécie original.
                            </Typography>
                        </Box>
                        {regaliasOpcionais.regalias_opcionais.map((grupo) => (
                            <Box key={grupo.tipo} sx={{ mt: 3, display: 'flex', flexDirection: 'column', flexWrap: 'nowrap' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    Regalias Especiais - {grupo.tipo}
                                </Typography>
                                {grupo.observacao &&
                                    <Typography sx={{ mb: 1 }}>
                                        {grupo.observacao}
                                    </Typography>}
                                {grupo.penalidade &&
                                    <Typography sx={{ mb: 1 }}>
                                        {grupo.penalidade}
                                    </Typography>}
                                <Typography sx={{ mb: 1 }}>
                                    {grupo.descricao}
                                </Typography>
                                {grupo.opcoes.map((opcao) => (
                                    <FormControlLabel
                                        key={opcao.nome}
                                        value={opcao.nome}
                                        disabled={disableMutationOptModal === opcao.nome}
                                        control={<Radio />}
                                        label={
                                            <Box>
                                                <strong>{opcao.nome}</strong>
                                                <Typography variant="body2" sx={{ mt: 0.5 }}>
                                                    {opcao.descricao.trim()}
                                                </Typography>
                                            </Box>
                                        }
                                        sx={{ alignItems: 'flex-start', my: 1 }}
                                    />
                                ))}
                            </Box>
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>
        </>
    );
});

export default SpeciesTab;
