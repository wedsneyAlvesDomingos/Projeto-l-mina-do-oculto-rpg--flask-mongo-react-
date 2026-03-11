import React from 'react';
import {
    Box, Grid, Paper, Typography, TextField, IconButton,
    Accordion, AccordionSummary, AccordionDetails,
    Chip, Select, MenuItem, FormControl, InputLabel, Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import UIcon from '../../../assets/images/userIcon.png';
import { especiesMap, determinarTamanho } from '../../../data/constants';
import EditableField from './EditableField';

/* Campo de moeda inline — evita repetição 4× */
const MoedaInput = ({ label, value, onChange, color, bgColor }) => (
    <Grid item xs={6} sm={3}>
        <Box sx={{ textAlign: 'center', p: 0.5, backgroundColor: bgColor, borderRadius: 1 }}>
            <Typography variant="caption" sx={{ color: '#5B1F0F', display: 'block', fontSize: '10px' }}>{label}</Typography>
            <TextField
                type="number"
                size="small"
                variant="standard"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                InputProps={{ disableUnderline: false, sx: { color: `${color} !important` } }}
                inputProps={{ min: 0, style: { textAlign: 'center', fontWeight: 'bold', color, fontSize: '16px' } }}
                sx={{
                    width: '60px',
                    '& input': { color: `${color} !important` },
                    '& .MuiInput-underline:before': { borderBottomColor: 'transparent' },
                    '& .MuiInput-underline:hover:before': { borderBottomColor: `${color} !important` },
                    '& .MuiInput-underline:after': { borderBottomColor: color },
                }}
            />
        </Box>
    </Grid>
);

const CharacterHeader = ({
    character, editMode, setEditMode,
    sectionStyle, cardHeaderStyle,
    updateField, handleSave, handleCancel, atualizarMoeda,
    fileInputRef, handleImageDrop, handleDragOver, handleImageButtonClick, handleImageFileChange,
}) => (
    <Paper elevation={4} sx={{ ...sectionStyle, mb: 3, overflow: 'hidden' }}>
        {/* Header bar */}
        <Box sx={cardHeaderStyle}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
                <Typography className="esteban" variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon /> Informações do Personagem
                </Typography>
                {!editMode ? (
                    <IconButton onClick={() => setEditMode(true)} sx={{ color: 'white' }}><EditIcon /></IconButton>
                ) : (
                    <Box>
                        <IconButton onClick={handleSave} sx={{ color: '#454E30' }}><SaveIcon /></IconButton>
                        <IconButton onClick={handleCancel} sx={{ color: '#931C4A' }}><CancelIcon /></IconButton>
                    </Box>
                )}
            </Box>
        </Box>

        <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
                {/* Imagem */}
                <Grid item xs={12} md={3}>
                    {editMode ? (
                        <Box
                            onDrop={handleImageDrop}
                            onDragOver={handleDragOver}
                            onClick={handleImageButtonClick}
                            sx={{
                                border: '2px dashed #BB8130', borderRadius: 2, padding: 2,
                                textAlign: 'center', bgcolor: '#756A3422', position: 'relative',
                                minHeight: '200px', display: 'flex', flexDirection: 'column',
                                justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': { bgcolor: '#756A3444', borderColor: '#40150A' },
                            }}
                        >
                            <Typography className="esteban" variant="body2" sx={{ mb: 1, color: '#40150A' }}>
                                Arraste e solte uma imagem aqui
                            </Typography>
                            <Typography className="esteban" variant="body2" sx={{ color: '#BB8130', fontWeight: 'bold' }}>
                                ou clique para selecionar
                            </Typography>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageFileChange} style={{ display: 'none' }} />
                            {character.image && (
                                <Box component="img" src={character.image} alt="Imagem do personagem"
                                    sx={{ mt: 2, maxWidth: '100%', maxHeight: '250px', borderRadius: 1, border: '2px solid #BB8130' }}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            )}
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: 'center' }}>
                            <img src={character.image || UIcon} alt="Character"
                                style={{ width: '250px', height: '250px', border: '3px solid #BB8130', borderRadius: '10%', objectFit: 'cover' }}
                            />
                        </Box>
                    )}
                </Grid>

                {/* Dados básicos */}
                <Grid item xs={12} md={9}>
                    <Grid container spacing={2}>
                        {/* Nome */}
                        <Grid item xs={12} md={6}>
                            {editMode ? (
                                <EditableField fullWidth label="Nome do Personagem" value={character.nome_personagem || ''} onChange={(val) => updateField('nome_personagem', val)} />
                            ) : (
                                <Typography className="esteban" variant="h4" sx={{ color: '#40150A', fontWeight: 'bold' }}>{character.nome_personagem}</Typography>
                            )}
                        </Grid>
                        {/* Nível */}
                        <Grid item xs={6} md={2}>
                            {editMode ? (
                                <EditableField fullWidth type="number" label="Nível" value={character.nivel || 1} onChange={(val) => updateField('nivel', parseInt(val) || 1)} />
                            ) : (
                                <Box sx={{ background: '#756A34', borderRadius: 2, p: 1, textAlign: 'center' }}>
                                    <Typography className="esteban" sx={{ color: 'white', fontSize: '12px' }}>Nível</Typography>
                                    <Typography className="esteban" sx={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>{character.nivel}</Typography>
                                </Box>
                            )}
                        </Grid>
                        {/* Moedas */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{ backgroundColor: '#f5ede4', borderRadius: 2, p: 1.5, border: '1px solid #BB8130' }}>
                                <Typography className="esteban" sx={{ color: '#40150A', fontSize: '12px', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <LocalAtmIcon fontSize="small" /> Moedas
                                </Typography>
                                <Grid container spacing={1}>
                                    <MoedaInput label="Platina" value={character.moedas?.platina || 0} onChange={(v) => atualizarMoeda('platina', v)} color="#756A34" bgColor="#e0e5e0" />
                                    <MoedaInput label="Ouro"    value={character.moedas?.ouro || 0}    onChange={(v) => atualizarMoeda('ouro', v)}    color="#BB8130" bgColor="#f5ebe3" />
                                    <MoedaInput label="Prata"   value={character.moedas?.prata || 0}   onChange={(v) => atualizarMoeda('prata', v)}   color="#666"    bgColor="#e8e8e8" />
                                    <MoedaInput label="Cobre"   value={character.moedas?.cobre || 0}   onChange={(v) => atualizarMoeda('cobre', v)}   color="#8B4513" bgColor="#f0dcc8" />
                                </Grid>
                                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#756A34', textAlign: 'center', fontSize: '10px' }}>
                                    Total: {((character.moedas?.platina || 0) * 1000 + (character.moedas?.ouro || 0) * 100 + (character.moedas?.prata || 0) * 10 + (character.moedas?.cobre || 0)) / 100} M.O
                                </Typography>
                            </Box>
                        </Grid>
                        {/* Classe */}
                        <Grid item xs={6} md={3}>
                            {editMode ? (
                                <EditableField fullWidth label="Classe" value={character.classe || ''} onChange={(val) => updateField('classe', val)} />
                            ) : (
                                <Box>
                                    <Typography className="esteban" sx={{ color: '#5B1F0F', fontSize: '12px' }}>Classe</Typography>
                                    <Typography className="esteban" sx={{ fontWeight: 'bold' }}>{character.classe || 'Aprendiz'}</Typography>
                                </Box>
                            )}
                        </Grid>
                        {/* Espécie */}
                        <Grid item xs={6} md={3}>
                            {editMode ? (
                                <FormControl fullWidth>
                                    <InputLabel>Espécie</InputLabel>
                                    <Select value={character.especie || ''} label="Espécie" onChange={(e) => updateField('especie', e.target.value)}>
                                        {Object.entries(especiesMap).map(([key, value]) => (
                                            <MenuItem key={key} value={key}>{value}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ) : (
                                <Box>
                                    <Typography className="esteban" sx={{ color: '#5B1F0F', fontSize: '12px' }}>Espécie</Typography>
                                    <Typography className="esteban" sx={{ fontWeight: 'bold' }}>{especiesMap[character.especie] || character.especie}</Typography>
                                </Box>
                            )}
                        </Grid>
                        {/* Gênero */}
                        <Grid item xs={6} md={3}>
                            {editMode ? (
                                <FormControl fullWidth>
                                    <InputLabel>Gênero</InputLabel>
                                    <Select value={character.genero || ''} label="Gênero" onChange={(e) => updateField('genero', e.target.value)}>
                                        <MenuItem value="Masculino">Masculino</MenuItem>
                                        <MenuItem value="Feminino">Feminino</MenuItem>
                                        <MenuItem value="Outro">Outro</MenuItem>
                                    </Select>
                                </FormControl>
                            ) : (
                                <Box>
                                    <Typography className="esteban" sx={{ color: '#5B1F0F', fontSize: '12px' }}>Gênero</Typography>
                                    <Typography className="esteban" sx={{ fontWeight: 'bold' }}>{character.genero}</Typography>
                                </Box>
                            )}
                        </Grid>
                        {/* Idade */}
                        <Grid item xs={6} md={3}>
                            {editMode ? (
                                <EditableField fullWidth type="number" label="Idade" value={character.idade || 0} onChange={(val) => updateField('idade', parseInt(val) || 0)} />
                            ) : (
                                <Box>
                                    <Typography className="esteban" sx={{ color: '#5B1F0F', fontSize: '12px' }}>Idade</Typography>
                                    <Typography className="esteban" sx={{ fontWeight: 'bold' }}>{character.idade} anos</Typography>
                                </Box>
                            )}
                        </Grid>
                        {/* Altura */}
                        <Grid item xs={6} md={3}>
                            {editMode ? (
                                <EditableField fullWidth type="number" label="Altura (cm)" value={character.altura || 170} onChange={(val) => updateField('altura', parseInt(val) || 170)} inputProps={{ min: 1, max: 5000 }} />
                            ) : (
                                <Tooltip title={<Box><Typography variant="caption" sx={{ fontWeight: 'bold' }}>Tamanho: {determinarTamanho(character.altura || 170).nome}</Typography><Typography variant="caption" sx={{ display: 'block' }}>{determinarTamanho(character.altura || 170).descricao}</Typography></Box>} arrow>
                                    <Box sx={{ cursor: 'help' }}>
                                        <Typography className="esteban" sx={{ color: '#5B1F0F', fontSize: '12px' }}>Altura</Typography>
                                        <Typography className="esteban" sx={{ fontWeight: 'bold' }}>
                                            {character.altura || 170} cm
                                            <Chip label={determinarTamanho(character.altura || 170).nome} size="small" sx={{ ml: 1, fontSize: '10px', height: '18px', backgroundColor: '#f5ebe3' }} />
                                        </Typography>
                                    </Box>
                                </Tooltip>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* Antecedente & Descrição */}
            <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Accordion sx={{ backgroundColor: '#f5f3eb', borderLeft: '4px solid #AB6422' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold', color: '#40150A' }}>
                                    <HistoryEduIcon fontSize="small" /> Antecedente: {character.antecedente?.nome || 'Não definido'}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: '#faf8f5' }}>
                                {editMode ? (
                                    <>
                                        <EditableField fullWidth label="Nome do Antecedente" value={character.antecedente?.nome || ''} onChange={(val) => updateField('antecedente.nome', val)} sx={{ mb: 2 }} />
                                        <EditableField fullWidth multiline rows={4} label="Descrição do Antecedente" value={character.antecedente?.descricao || ''} onChange={(val) => updateField('antecedente.descricao', val)} />
                                    </>
                                ) : (
                                    <Typography className="esteban" variant="body2" sx={{ wordBreak: 'break-word', lineHeight: 1.6, color: '#5B1F0F' }}>
                                        {character.antecedente?.descricao || 'Sem descrição'}
                                    </Typography>
                                )}
                                {character.antecedente?.habilidades && character.antecedente.habilidades.length > 0 && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography className="esteban" variant="subtitle2" sx={{ color: '#40150A', mb: 1, fontWeight: 'bold' }}>Habilidades do Antecedente:</Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {character.antecedente.habilidades.map((hab, idx) => (
                                                <Chip key={idx} label={hab} size="small" sx={{ backgroundColor: hab.includes('-') ? '#931C4A' : '#454E30', color: 'white' }} />
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Accordion sx={{ backgroundColor: '#f5f3eb', borderLeft: '4px solid #162A22' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold', color: '#40150A' }}>
                                    <PersonIcon fontSize="small" /> Descrição do Personagem
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: '#faf8f5' }}>
                                {editMode ? (
                                    <EditableField fullWidth multiline rows={6} label="Descrição" value={character.descricao || ''} onChange={(val) => updateField('descricao', val)} />
                                ) : (
                                    <Typography className="esteban" variant="body2" sx={{ wordBreak: 'break-word', lineHeight: 1.6, color: '#5B1F0F' }}>
                                        {character.descricao || 'Sem descrição'}
                                    </Typography>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Paper>
);

export default CharacterHeader;
