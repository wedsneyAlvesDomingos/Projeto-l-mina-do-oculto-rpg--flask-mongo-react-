/**
 * AntecedenteChoiceModal — Modal genérico para escolhas de antecedente
 * Renderiza radio buttons para escolhasHabilidades e escolhasProficiencias
 * lidos diretamente dos dados estruturados do antecedente.
 */
import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Modal, Button, FormControl, FormLabel,
    RadioGroup, FormControlLabel, Radio, Chip, Divider,
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '80vh',
    overflowY: 'auto',
    width: '50%',
    minWidth: 360,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
};

// Mapeamento de keys normalizadas (antecedentes.js) → display names (allValues keys)
const habKeyMap = {
    forca: 'Força', destreza: 'Destreza', fortitude: 'Fortitude',
    agilidade: 'Agilidade', percepcao: 'Percepção', acrobacia: 'Acrobacia',
    atletismo: 'Atletismo', medicina: 'Medicina', natureza: 'Natureza',
    historia: 'História', intuicao: 'Intuição', investigacao: 'Investigação',
    furtividade: 'Furtividade', intimidacao: 'Intimidação',
    negociacao: 'Negociação', persuasao: 'Persuasão', enganacao: 'Enganação',
    sobrevivencia: 'Sobrevivência', navegacao: 'Navegação',
    rastreamento: 'Rastreamento', performance: 'Performance',
    seducao: 'Sedução', ocultismo: 'Ocultismo', ritualismo: 'Ritualismo',
    arcanismo: 'Arcanismo', alquimia: 'Alquimia', arcanatec: 'Arcanatec',
    tecnologia: 'Tecnologia', teologia: 'Teologia', armadilhas: 'Armadilhas',
    combate_corpo_a_corpo: 'Combate Corpo a Corpo',
    combate_a_distancia: 'Combate a Distância',
    combate_arcano: 'Combate Arcano',
    lidar_com_animais: 'Lidar com animais',
    jurisprudencia: 'Jurisprudência (Política e leis)',
};

const profKeyMap = {
    armaduras: 'Maestria em Armaduras e Escudos',
    esgrima: 'Proficiência em Esgrima',
    ferreiro: 'Ferreiro', alfaiate: 'Alfaiate',
    marceneiro: 'Carpinteiro', joalheiro: 'Joalheiro',
    linguas_antigas: 'Proficiência em Línguas Antigas',
    disfarce: 'Proficiência em Disfarce',
    ferramentas_de_ladrao: 'Ferramentas de ladrão',
    veiculos_aquaticos: 'Condução de Veículos Aquáticos',
    veiculos_terrestres: 'Condução de Veículos Terrestres',
};

const AntecedenteChoiceModal = ({ open, onClose, antecedente, onConfirm }) => {
    const [habChoices, setHabChoices] = useState({});
    const [profChoices, setProfChoices] = useState({});

    // Reset choices when antecedente changes
    useEffect(() => {
        setHabChoices({});
        setProfChoices({});
    }, [antecedente?.nome]);

    if (!antecedente) return null;

    const { escolhasHabilidades = [], escolhasProficiencias = [], bonusEstruturado = [] } = antecedente;

    const allHabChosen = escolhasHabilidades.every((_, i) => habChoices[i]);
    const allProfChosen = escolhasProficiencias.every((_, i) => profChoices[i]);
    const allChosen = allHabChosen && allProfChosen;

    const handleConfirm = () => {
        const habilidades = escolhasHabilidades.map((esc, i) => ({
            nome: habKeyMap[habChoices[i]] || habChoices[i],
            pontos: esc.pontos,
        })).filter(h => h.nome);

        const proficiencias = escolhasProficiencias.map((esc, i) => ({
            nome: profKeyMap[profChoices[i]] || profChoices[i],
            pontos: esc.pontos,
        })).filter(p => p.nome);

        onConfirm({ habilidades, proficiencias });
        setHabChoices({});
        setProfChoices({});
    };

    const handleClose = () => {
        setHabChoices({});
        setProfChoices({});
        onClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h5" gutterBottom sx={{ color: '#162A22', fontWeight: 'bold' }} className="esteban">
                    {antecedente.nome}
                </Typography>

                <Typography variant="body2" sx={{ mb: 2 }} className="bigBoxTextClasses">
                    {antecedente.descricao}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {/* Bônus fixos (já aplicados automaticamente) */}
                {bonusEstruturado.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                            ✅ Bônus aplicados automaticamente:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {bonusEstruturado.map((b, i) => (
                                <Chip
                                    key={i}
                                    label={`${b.pontos > 0 ? '+' : ''}${b.pontos} ${habKeyMap[b.habilidade] || b.habilidade}`}
                                    size="small"
                                    color={b.pontos > 0 ? 'success' : 'error'}
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                    </Box>
                )}

                {/* Escolhas de habilidades */}
                {escolhasHabilidades.map((esc, index) => (
                    <Box key={`hab-${index}`} sx={{ mb: 2 }}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                                🎯 Escolha uma habilidade para receber +{esc.pontos} ponto{esc.pontos > 1 ? 's' : ''}:
                            </FormLabel>
                            <RadioGroup
                                value={habChoices[index] || ''}
                                onChange={(e) => setHabChoices(prev => ({ ...prev, [index]: e.target.value }))}
                            >
                                {esc.grupo.map(key => (
                                    <FormControlLabel
                                        key={key}
                                        value={key}
                                        control={<Radio />}
                                        label={habKeyMap[key] || key}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Box>
                ))}

                {/* Escolhas de proficiências */}
                {escolhasProficiencias.map((esc, index) => (
                    <Box key={`prof-${index}`} sx={{ mb: 2 }}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
                                🛡️ Escolha uma proficiência para receber +{esc.pontos} ponto{esc.pontos > 1 ? 's' : ''}:
                            </FormLabel>
                            <RadioGroup
                                value={profChoices[index] || ''}
                                onChange={(e) => setProfChoices(prev => ({ ...prev, [index]: e.target.value }))}
                            >
                                {esc.grupo.map(key => (
                                    <FormControlLabel
                                        key={key}
                                        value={key}
                                        control={<Radio />}
                                        label={profKeyMap[key] || key}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Box>
                ))}

                <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleConfirm}
                        disabled={!allChosen}
                        sx={{ backgroundColor: '#162A22', '&:hover': { backgroundColor: '#1e3a2e' } }}
                    >
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AntecedenteChoiceModal;
