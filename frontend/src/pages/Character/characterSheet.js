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


const CharacterSheet = () => {
    const params = new URLSearchParams(window.location.search);
    const valor = params.get('id');
    const [character, setCharacter] = useState(null);
    const baseUrl = process.env.REACT_APP_LISTEN_ADDRESS;
    const [erro, setErro] = useState(null);
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
                    console.log(personagem);
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
                <Typography variant="h6">Carregando ficha do personagem...</Typography>
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
                                {item.category && <Typography variant="caption">{item.category}</Typography>}
                                {item.dano && (
                                    <Typography variant="caption" component="span" sx={{ ml: 1 }}>
                                        Dano: {item.dano}
                                    </Typography>
                                )}
                                {item.critico !== undefined && (
                                    <Typography variant="caption" component="span" sx={{ ml: 1 }}>
                                        Crítico: {item.critico}
                                    </Typography>
                                )}
                                {item.bonusDefesa !== undefined && (
                                    <Typography variant="caption" component="span" sx={{ ml: 1 }}>
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
                            <Typography variant="subtitle2">Regalias de Espécie:</Typography>
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
                            <Typography variant="subtitle2">{entry.nome || `Entrada ${idx + 1}`}:</Typography>
                            {entry.habilidades && (
                                <Typography variant="body2">Habilidades: {entry.habilidades}</Typography>
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
                            <Typography variant="subtitle2" textTransform="capitalize">
                                {key.replace(/_/g, ' ')}:
                            </Typography>
                            {Array.isArray(val)
                                ? val.map((r, i) => (
                                    <Chip key={i} label={r} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                                ))
                                : typeof val === 'string'
                                    ? <Typography variant="body2">{val}</Typography>
                                    : renderObjectTable(val)}
                        </Box>
                    ))}
                </Box>
            );
        }
        return null;
    };

    return (
        <Box p={2}>
            {/* Cabeçalho com Avatar e Informações Básicas */}
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <img src={character.image} style={{ width: '150px', height: '150px', border: '2px solid #BB8130', borderRadius: '5%', marginBottom: '10%' }} />
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h4" gutterBottom>
                            {character.nome_personagem}
                        </Typography>
                        <Typography variant="subtitle1">
                            Nível {character.nivel} – Classe: {character.classe || 'Nenhuma definida'}
                        </Typography>
                        <Typography variant="subtitle1">
                            Espécie: {character.especie} • Gênero: {character.genero}
                        </Typography>
                        <Typography variant="subtitle1">Idade: {character.idade} anos</Typography>
                        <Typography variant="subtitle1">Dinheiro: {character.dinheiro} moedas</Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Descrição e Antecedentes */}
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Descrição e Antecedentes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {character.descricao && (
                        <Box mb={2}>
                            <Typography variant="subtitle2" gutterBottom>
                                Descrição:
                            </Typography>
                            <Typography variant="body2">{character.descricao}</Typography>
                        </Box>
                    )}
                    {character.antecedentes && (
                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Antecedente: {character.antecedentes.nome}
                            </Typography>
                            <Typography variant="body2">{character.antecedentes.descricao || '—'}</Typography>
                        </Box>
                    )}
                </AccordionDetails>
            </Accordion>

            <Divider sx={{ my: 2 }} />

            {/* Habilidades */}
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Habilidades</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {character.habilidades ? renderObjectTable(character.habilidades) : <Typography>—</Typography>}
                </AccordionDetails>
            </Accordion>

            {/* Proficiências */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Proficiências</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {character.proficiencias ? renderObjectTable(character.proficiencias) : <Typography>—</Typography>}
                </AccordionDetails>
            </Accordion>

            {/* Condições */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Condições</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {character.condicoes && Object.keys(character.condicoes).length > 0 ? (
                        renderObjectTable(character.condicoes)
                    ) : (
                        <Typography variant="body2">Nenhuma condição ativa.</Typography>
                    )}
                </AccordionDetails>
            </Accordion>

            {/* Regalias */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Regalias</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box mb={2}>
                        <Typography variant="subtitle2">Pontos de Regalia: {character.pontos_de_regalia}</Typography>
                    </Box>
                    {/* Regalias de Aprendiz */}
                    {character.regalias_de_aprendiz && (
                        <Box mb={2}>
                            <Typography variant="subtitle2">Regalias de Aprendiz:</Typography>
                            {renderRegalias(character.regalias_de_aprendiz)}
                        </Box>
                    )}

                    {/* Regalias de Classe */}
                    {character.regalias_de_classe && (
                        <Box mb={2}>
                            <Typography variant="subtitle2">Regalias de Classe:</Typography>
                            {renderRegalias(character.regalias_de_classe)}
                        </Box>
                    )}

                    {/* Regalias de Specialization */}
                    {character.regalias_de_especialization && (
                        <Box mb={2}>
                            <Typography variant="subtitle2">
                                Regalias de Especialização:
                            </Typography>
                            {renderRegalias(character.regalias_de_especialization)}
                        </Box>
                    )}

                    {/* Regalias de Espécie */}
                    {character.regalias_de_especie && (
                        <Box mb={2}>
                            <Typography variant="subtitle2">Regalias de Espécie:</Typography>
                            {renderRegalias(character.regalias_de_especie)}
                        </Box>
                    )}

                    {/* Regalias de Profissão */}
                    {character.regalias_de_profissao && (
                        <Box mb={2}>
                            <Typography variant="subtitle2">Regalias de Profissão:</Typography>
                            {renderRegalias(character.regalias_de_profissao)}
                        </Box>
                    )}
                </AccordionDetails>
            </Accordion>

            <Divider sx={{ my: 2 }} />

            {/* Equipamentos */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Equipamentos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {character.equipamentos && character.equipamentos.length > 0 ? (
                        renderEquipmentList(character.equipamentos)
                    ) : (
                        <Typography variant="body2">Sem equipamentos cadastrados.</Typography>
                    )}
                </AccordionDetails>
            </Accordion>

            <Divider sx={{ my: 2 }} />

            {/* Datas de Criação/Atualização */}
            <Box textAlign="right" mt={2}>
                <Typography variant="caption" display="block">
                    Criado em: {new Date(character.criou_em).toLocaleString('pt-BR')}
                </Typography>
                <Typography variant="caption" display="block">
                    Atualizado em: {new Date(character.atualizou_em).toLocaleString('pt-BR')}
                </Typography>
            </Box>
        </Box>
    );
};

export default CharacterSheet;
