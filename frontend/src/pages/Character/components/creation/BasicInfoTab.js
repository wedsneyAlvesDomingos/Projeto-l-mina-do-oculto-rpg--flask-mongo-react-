import React from 'react';
import { Grid, TextField, Tooltip, Typography, Box, Button, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';

const BasicInfoTab = React.memo(function BasicInfoTab({
    charName, setCharName,
    age, setAge,
    gender, setGender,
    altura, setAltura,
    charDiscription, setCharDiscription,
    image,
    handleDrop, handleDragOver, handleButtonClick, handleFileChange,
    fileInputRef,
    formErrors,
}) {
    return (
        <Grid container spacing={2} sx={{ minHeight: '400px' }}>
            {/* Imagem: aparece primeiro em telas md ou menores */}
            <Grid item xs={12} lg={6} order={{ xs: 1, lg: 2 }}>
                <Box
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    sx={{
                        border: '2px dashed #BB8130',
                        borderRadius: 2,
                        padding: 2,
                        textAlign: 'center',
                        bgcolor: '#756A3422',
                        position: 'relative',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: '600px'
                    }}
                >
                    <Box>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Arraste e solte uma imagem aqui
                        </Typography>
                        <Button variant="text" sx={{ width: 'fit-content', marginX: 'auto' }} onClick={handleButtonClick}>
                            Selecionar imagem
                        </Button>
                    </Box>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    {image && (
                        <Box
                            component="img"
                            src={image}
                            alt="Imagem do personagem"
                            sx={{ mt: 2, maxWidth: '50%', margin: '0 auto', borderRadius: 1, maxHeight: '300px' }}
                        />
                    )}
                </Box>
            </Grid>
            {/* Inputs: aparece segundo em telas md ou menores */}
            <Grid item xs={12} lg={6} order={{ xs: 2, lg: 1 }}>
                <Grid container spacing={{ xs: 3, md: 2 }} sx={{ height: '100%' }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Nome do Personagem *"
                            name="nome_personagem"
                            value={charName}
                            onChange={(e) => { setCharName(e.target.value) }}
                            error={!!formErrors?.nome}
                            helperText={formErrors?.nome}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {age == 18 ?
                            <Tooltip title="Idade mínima para fazer sentido estar em um aventura no sistema LDO.">
                                <TextField
                                    fullWidth
                                    type="number"
                                    inputProps={{ min: 18, inputMode: 'numeric' }}
                                    label="idade"
                                    name="idade"
                                    defaultValue="18"
                                    value={age}
                                    onChange={(e) => { setAge(e.target.value) }}
                                />
                            </Tooltip> :
                            <TextField
                                fullWidth
                                type="number"
                                inputProps={{ min: 18, inputMode: 'numeric' }}
                                label="idade"
                                name="idade"
                                defaultValue="18"
                                value={age}
                                onChange={(e) => { setAge(e.target.value) }}
                            />
                        }
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required error={!!formErrors?.genero}>
                            <InputLabel>Gênero *</InputLabel>
                            <Select
                                value={gender}
                                label="Gênero *"
                                name="genero"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value="Masculino">Masculino</MenuItem>
                                <MenuItem value="Feminino">Feminino</MenuItem>
                                <MenuItem value="Outro">Outro</MenuItem>
                            </Select>
                            {formErrors?.genero && <FormHelperText>{formErrors.genero}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Altura (cm)"
                            name="altura"
                            value={altura}
                            onChange={(e) => { setAltura(parseInt(e.target.value) || 170) }}
                            inputProps={{ min: 10, max: 5000, inputMode: 'numeric' }}
                            helperText={`Tamanho: ${altura <= 60 ? 'Minúsculo' : altura <= 130 ? 'Pequeno' : altura <= 220 ? 'Médio' : altura <= 350 ? 'Grande' : altura <= 600 ? 'Muito Grande' : altura <= 1200 ? 'Gigante' : 'Colossal'}`}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Nível" name="nivel" defaultValue={1} disabled />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField multiline rows={9} fullWidth label="Descrição" name="descricao" sx={{ height: '250px' }} value={charDiscription} onChange={(e) => { setCharDiscription(e.target.value) }} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
});

export default BasicInfoTab;
