import React, { useEffect, useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./char.css";
import fundoCabecalho from "../../assets/images/creatStories.png"


const CharacterSheet = () => {
    const params = new URLSearchParams(window.location.search);
    const valor = params.get('id');
    const [character, setCharacter] = useState({});
    const baseUrl = process.env.REACT_APP_LISTEN_ADDRESS;
    const [erro, setErro] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    useEffect(() => {
        if (!userId) return;

        fetch(`${baseUrl}/personagens/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar personagens');
                }
                return response.json();
            })
            .then(data => {
                let personagem;

                personagem = data.find(char => char.id === parseInt(valor))

                if (personagem) {
                    setCharacter(personagem);
                } else {
                    console.warn("Personagem não encontrado para o ID:", valor);
                }

            })
            .catch(error => {
                console.error(error);
                setErro(error.message);
            });
    }, [userId]);

    if (!character) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography className="esteban" variant="h6">Carregando ficha do personagem...</Typography>
            </Box>
        );
    }



    // Função auxiliar para renderizar objetos chave:valor em uma tabela
    // Função auxiliar atualizada para renderizar objetos chave:valor em uma tabela,
    // agora tratando valores que sejam objetos (renderiza recursivamente uma sub-tabela).
    const renderObjectTable = (obj) => (
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
            <Table size="small">
                <TableBody>
                    {Object.entries(obj).map(([key, value]) => {
                        // Se o valor for objeto (e não null), renderiza recursivamente outra tabela:
                        if (value !== null && typeof value === 'object') {
                            return (
                                <TableRow key={key}>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                                    >
                                        {key.replace(/_/g, ' ')}
                                    </TableCell>
                                    <TableCell>
                                        {/* Renderiza uma sub-tabela para esse objeto interno */}
                                        {renderObjectTable(value)}
                                    </TableCell>
                                </TableRow>
                            );
                        }

                        // Caso contrário (string, número, boolean, etc.), renderiza normalmente:
                        return (
                            <TableRow key={key}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                                >
                                    {key.replace(/_/g, ' ')}
                                </TableCell>
                                <TableCell>{String(value)}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );

    // Função auxiliar para renderizar arrays de objetos de equipamentos
    const renderEquipmentList = (list) => (
        <List dense>
            {list.map((item, idx) => (
                <ListItem key={idx} divider>
                    <ListItemText
                        primary={item.nome ? item.nome : `Item ${idx + 1}`}
                        secondary={
                            <>
                                {item.category && <Typography className="esteban" variant="caption">{item.category}</Typography>}
                                {item.dano && (
                                    <Typography className="esteban" variant="caption" component="span" sx={{ ml: 1 }}>
                                        Dano: {item.dano}
                                    </Typography>
                                )}
                                {item.critico !== undefined && (
                                    <Typography className="esteban" variant="caption" component="span" sx={{ ml: 1 }}>
                                        Crítico: {item.critico}
                                    </Typography>
                                )}
                                {item.bonusDefesa !== undefined && (
                                    <Typography className="esteban" variant="caption" component="span" sx={{ ml: 1 }}>
                                        Bônus Defesa: {item.bonusDefesa}
                                    </Typography>
                                )}
                            </>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );

    // Função auxiliar para renderizar regalias (pode adaptar conforme estrutura)
    const renderRegalias = (regaliasObj) => {
        // Se for array de objetos ou array dentro de array
        if (!regaliasObj) return null;
        if (Array.isArray(regaliasObj)) {
            return regaliasObj.map((entry, idx) => {
                if (Array.isArray(entry)) {
                    return entry.length > 0 ? (
                        <Box key={idx} mb={1}>
                            <Typography className="esteban" variant="subtitle2">Regalias de Espécie:</Typography>
                            <Box>
                                {entry.regalias?.map((r, i) => (
                                    <Chip key={i} label={r} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                                ))}
                            </Box>
                        </Box>
                    ) : null;
                } else {
                    // objeto único
                    return (
                        <Box key={idx} mb={1}>
                            <Typography className="esteban" variant="subtitle2">{entry.nome || `Entrada ${idx + 1}`}:</Typography>
                            {entry.habilidades && (
                                <Typography className="esteban" variant="body2">Habilidades: {entry.habilidades}</Typography>
                            )}
                            {entry.regalias && (
                                <Box>
                                    {entry.regalias.map((r, i) => (
                                        <Chip key={i} label={r} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                                    ))}
                                </Box>
                            )}
                        </Box>
                    );
                }
            });
        } else if (typeof regaliasObj === 'object') {
            return (
                <Box>
                    {Object.entries(regaliasObj).map(([key, val]) => (
                        <Box key={key} mb={1}>
                            <Typography className="esteban" variant="subtitle2" textTransform="capitalize">
                                {key.replace(/_/g, ' ')}:
                            </Typography>
                            {Array.isArray(val)
                                ? val.map((r, i) => (
                                    <Chip key={i} label={r} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                                ))
                                : typeof val === 'string'
                                    ? <Typography className="esteban" variant="body2">{val}</Typography>
                                    : renderObjectTable(val)}
                        </Box>
                    ))}
                </Box>
            );
        }
        return null;
    };

    return (
        <Box p={4} mx={4}>
            {/* Cabeçalho com Avatar e Informações Básicas */}
            <Paper elevation={3} sx={{
                p: 2, mb: 3,
                borderRight: '1px  solid #756A34',
                borderLeft: '1px  solid #756A34',
                borderRadius: '10px',
                backgroundColor: '#fcfcfcaa',

            }}>
                <Box container spacing={2} alignItems="center" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'start', flexWrap: 'wrap', gap: 4, }}>
                    <Box sx={{ width: '10%', minWidth: '100px' }}>
                        <img src={character.image} style={{ minWidth: '10px', width: '100%', height: 'auto', border: '2px solid #BB8130', borderRadius: '5%', marginBottom: '10%' }} />
                    </Box>
                    <Box xs sx={{ display: 'flex', flexDirection: 'column', height: '200px', width: '85%', justifyContent: 'start', minWidth: '300px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'left', p: 1, borderBottom: '1px dashed #7B331199', }}>
                            <Typography sx={{ width: '100%', }} className="esteban" variant="h3" gutterBottom>
                                <strong style={{ color: '#40150A', fontSize: '26px' }}>  {character.nome_personagem}</strong>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'left', p: 1, borderBottom: '1px dashed #7B331199', }}>
                            <Typography sx={{ width: '30%' }} className="esteban" variant="subtitle1">
                                <strong style={{ color: '#40150A' }}>Nível:</strong> {character.nivel}
                            </Typography>
                            <Typography sx={{ width: '30%' }} className="esteban" variant="subtitle1">
                                <strong style={{ color: '#40150A' }}>Classe:</strong>  {character.classe || 'Aprendiz'}
                            </Typography>

                            <Typography sx={{ width: '30%' }} className="esteban" variant="subtitle1">
                                <strong style={{ color: '#40150A' }}>Espécie:</strong> {character.especie}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'left', p: 1, borderBottom: '1px dashed #7B331199', }}>
                            <Typography sx={{ width: '30%' }} className="esteban" variant="subtitle1">
                                <strong style={{ color: '#40150A' }}>Gênero:</strong> {character.genero}
                            </Typography>
                            <Typography sx={{ width: '30%' }} className="esteban" variant="subtitle1">
                                <strong style={{ color: '#40150A' }}>Idade:</strong> {character.idade} anos</Typography>
                            <Typography sx={{ width: '30%' }} className="esteban" variant="subtitle1">
                                <strong style={{ color: '#40150A' }}>Dinheiro:</strong> {character.dinheiro} M.O
                            </Typography>
                        </Box>


                    </Box>

                </Box>
            </Paper>
            <Box sx={{ display: 'flex', gap: 4 }}>
                <Box sx={{
                    width: '30%', minWidth: '300px', hight: '300px',
                }}>
                    {character.antecedente && (<Accordion defaultExpanded sx={{
                        borderRight: '1px  solid #756A34',
                        borderLeft: '1px  solid #756A34',
                        borderRadius: '10px',
                        backgroundColor: '#fcfcfcaa',

                    }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className="esteban" variant="h6"> <strong style={{ color: '#40150A' }}>  Antecedente: </strong> {character.antecedente.nome} </Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                            <Box>
                                <Typography className='descriptionBox esteban' sx={{ wordBreak: 'break-word', height: '200px', overflowY: 'scroll' }} variant="body2">{character.antecedente.descricao || '—'}</Typography>
                            </Box>

                        </AccordionDetails>
                    </Accordion>)}

                </Box>
                <Box sx={{
                    width: '30%', minWidth: '300px', hight: '300px',
                }}>
                    {character.descricao && (<Accordion defaultExpanded sx={{

                        borderRight: '1px  solid #756A34',
                        borderLeft: '1px  solid #756A34',
                        borderRadius: '10px',
                        backgroundColor: '#fcfcfcaa',

                    }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className="esteban" variant="h6"> <strong style={{ color: '#40150A' }}>Descrição:  </strong>  </Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                            <Box>
                                <Typography className='descriptionBox esteban' sx={{ wordBreak: 'break-word', height: '200px', overflowY: 'scroll' }} variant="body2">{character.descricao}  </Typography>
                            </Box>

                        </AccordionDetails>
                    </Accordion>)}
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', gap: 4 }}>

                {/* Proficiências */}
                <Accordion sx={{

                    borderRight: '1px  solid #756A34',
                    borderLeft: '1px  solid #756A34',
                    borderRadius: '10px',
                    backgroundColor: '#fcfcfcaa',

                }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="esteban" variant="h6">Proficiências</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {character.proficiencias ? renderObjectTable(character.proficiencias) : <Typography className="esteban">—</Typography>}
                    </AccordionDetails>
                </Accordion>
                {/* Habilidades */}
                <Accordion defaultExpanded sx={{

                    borderRight: '1px  solid #756A34',
                    borderLeft: '1px  solid #756A34',
                    borderRadius: '10px',
                    backgroundColor: '#fcfcfcaa',

                }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="esteban" variant="h6">Habilidades</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {character.habilidades ? renderObjectTable(character.habilidades) : <Typography className="esteban">—</Typography>}
                    </AccordionDetails>
                </Accordion>
            </Box>



            <Divider sx={{ my: 2 }} />
            {/* Condições */}
            <Accordion sx={{

                borderRight: '1px  solid #756A34',
                borderLeft: '1px  solid #756A34',
                borderRadius: '10px',
                backgroundColor: '#fcfcfcaa',

            }}>

                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className="esteban" variant="h6">Condições</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {character.condicoes && Object.keys(character.condicoes).length > 0 ? (
                        renderObjectTable(character.condicoes)
                    ) : (
                        <Typography className="esteban" variant="body2">Nenhuma condição ativa.</Typography>
                    )}
                </AccordionDetails>
            </Accordion>
            <Divider sx={{ my: 2 }} />
            {/* Regalias */}
            <Accordion sx={{

                borderRight: '1px  solid #756A34',
                borderLeft: '1px  solid #756A34',
                borderRadius: '10px',
                backgroundColor: '#fcfcfcaa',

            }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className="esteban" variant="h6">Regalias</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box mb={2}>
                        <Typography className="esteban" variant="subtitle2">Pontos de Regalia: {character.pontos_de_regalia}</Typography>
                    </Box>
                    {/* Regalias de Aprendiz */}
                    {character.regalias_de_aprendiz && (
                        <Box mb={2}>
                            <Typography className="esteban" variant="subtitle2">Regalias de Aprendiz:</Typography>
                            {renderRegalias(character.regalias_de_aprendiz)}
                        </Box>
                    )}

                    {/* Regalias de Classe */}
                    {character.regalias_de_classe && (
                        <Box mb={2}>
                            <Typography className="esteban" variant="subtitle2">Regalias de Classe:</Typography>
                            {renderRegalias(character.regalias_de_classe)}
                        </Box>
                    )}

                    {/* Regalias de Specialization */}
                    {character.regalias_de_especialization && (
                        <Box mb={2}>
                            <Typography className="esteban" variant="subtitle2">
                                Regalias de Especialização:
                            </Typography>
                            {renderRegalias(character.regalias_de_especialization)}
                        </Box>
                    )}

                    {/* Regalias de Espécie */}
                    {character.regalias_de_especie && (
                        <Box mb={2}>
                            <Typography className="esteban" variant="subtitle2">Regalias de Espécie:</Typography>
                            {renderRegalias(character.regalias_de_especie)}
                        </Box>
                    )}

                    {/* Regalias de Profissão */}
                    {character.regalias_de_profissao && (
                        <Box mb={2}>
                            <Typography className="esteban" variant="subtitle2">Regalias de Profissão:</Typography>
                            {renderRegalias(character.regalias_de_profissao)}
                        </Box>
                    )}
                </AccordionDetails>
            </Accordion>

            <Divider sx={{ my: 2 }} />

            {/* Equipamentos */}
            <Accordion sx={{

                borderRight: '1px  solid #756A34',
                borderLeft: '1px  solid #756A34',
                borderRadius: '10px',
                backgroundColor: '#fcfcfcaa',

            }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className="esteban" variant="h6">Equipamentos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {character.equipamentos && character.equipamentos.length > 0 ? (
                        renderEquipmentList(character.equipamentos)
                    ) : (
                        <Typography className="esteban" variant="body2">Sem equipamentos cadastrados.</Typography>
                    )}
                </AccordionDetails>
            </Accordion>

            <Divider sx={{ my: 2 }} />

            {/* Datas de Criação/Atualização */}
            <Box textAlign="right" mt={2} sx={{ background: '#162A22', borderRadius: '10px', p: 1, color: 'white', }}>
                <Typography className="esteban" variant="caption" display="block" sx={{ fontSize: '12px !important' }}>
                    <strong>Criado em:</strong> {new Date(character.criado_em).toLocaleString('pt-BR')} / <strong>Atualizado em:</strong> {new Date(character.atualizado_em).toLocaleString('pt-BR')}
                </Typography>
            </Box>
        </Box>
    );
};

export default CharacterSheet;
