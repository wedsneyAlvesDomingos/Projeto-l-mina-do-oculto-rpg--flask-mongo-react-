import React, { useState } from 'react';
import {
    Card, CardHeader, CardContent, Box, Typography, Chip, Accordion,
    AccordionSummary, AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import { EditableField } from './EditableField';
import { getRegaliaAprendiz, getRegaliaAprendizPorNome, getOpcaoRegalia } from '../../../data/constants';

const RegaliasSection = React.memo(({ character, editMode, sectionStyle, cardHeaderStyle, updateField }) => {
    const [expandedAccordions, setExpandedAccordions] = useState({});
    const handleAccordionChange = (panel) => (_e, isExpanded) => setExpandedAccordions(prev => ({ ...prev, [panel]: isExpanded }));

    const getDescricaoRegalia = (regalia) => {
        if (regalia.id) { const r = getRegaliaAprendiz(regalia.id); if (r) return r.descricao; }
        if (regalia.nome) { const r = getRegaliaAprendizPorNome(regalia.nome); if (r) return r.descricao; }
        return regalia.descricao || 'Descrição não disponível';
    };

    const getDescricaoRegaliaEspecie = (nomeRegalia) => {
        for (const tipo of ['Psíquico', 'Vampiro', 'Mutante']) {
            const opcao = getOpcaoRegalia(tipo, nomeRegalia);
            if (opcao) return opcao.descricao;
        }
        return null;
    };

    const renderRegaliasAprendiz = () => {
        const regalias = character.regalias_de_aprendiz?.RegaliasDeAprendizSelecionada || {};
        if (Object.keys(regalias).length === 0) return null;
        return (
            <Box sx={{ mb: 2 }}>
                <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StarIcon fontSize="small" sx={{ color: '#454E30' }} /> Regalias de Aprendiz
                </Typography>
                {Object.entries(regalias).map(([key, regalia]) => {
                    const panelId = `aprendiz-${key}`;
                    return (
                        <Accordion key={key} expanded={expandedAccordions[panelId] || false} onChange={handleAccordionChange(panelId)}
                            sx={{ mb: 1, backgroundColor: '#e8eae5', '&:before': { display: 'none' }, borderLeft: '4px solid #454E30', borderRadius: '4px !important' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#454E30' }} />}
                                sx={{ '&:hover': { backgroundColor: '#dfe1dc' }, minHeight: '48px', '& .MuiAccordionSummary-content': { margin: '8px 0' } }}>
                                <Typography className="esteban" sx={{ fontWeight: 'bold', color: '#2F3C29' }}>{regalia.nome}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: '#f5f6f3', borderTop: '1px solid #c5c8c1' }}>
                                <Typography className="esteban" variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>{getDescricaoRegalia(regalia)}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </Box>
        );
    };

    const renderRegaliasEspecie = () => {
        const regalias = (character.regalias_de_especie || []).filter(r => r && r.especie);
        if (regalias.length === 0) return null;
        return (
            <Box sx={{ mb: 2 }}>
                <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StarIcon fontSize="small" sx={{ color: '#AB6422' }} /> Regalias de Espécie
                </Typography>
                {regalias.map((regalia, idx) => {
                    const panelId = `especie-${idx}`;
                    return (
                        <Accordion key={idx} expanded={expandedAccordions[panelId] || false} onChange={handleAccordionChange(panelId)}
                            sx={{ mb: 1, backgroundColor: '#f5ede4', '&:before': { display: 'none' }, borderLeft: '4px solid #AB6422', borderRadius: '4px !important' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#AB6422' }} />}
                                sx={{ '&:hover': { backgroundColor: '#efe5d8' }, minHeight: '48px', '& .MuiAccordionSummary-content': { margin: '8px 0' } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                    <Typography className="esteban" sx={{ fontWeight: 'bold', color: '#8B4513' }}>{regalia.especie}</Typography>
                                    <Chip label={`${regalia.regalias?.length || 0} regalia(s)`} size="small" sx={{ backgroundColor: '#AB6422', color: 'white', fontSize: '0.7rem' }} />
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: '#faf6f0', borderTop: '1px solid #ddd3c4' }}>
                                {regalia.regalias?.map((r, i) => {
                                    const desc = getDescricaoRegaliaEspecie(r);
                                    return (
                                        <Box key={i} sx={{ mb: 1.5, pb: 1.5, borderBottom: i < regalia.regalias.length - 1 ? '1px dashed #ddd3c4' : 'none' }}>
                                            <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#8B4513' }}>• {r}</Typography>
                                            {desc && <Typography className="esteban" variant="body2" sx={{ mt: 0.5, pl: 2, whiteSpace: 'pre-line', color: '#5c4033' }}>{desc}</Typography>}
                                        </Box>
                                    );
                                })}
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </Box>
        );
    };

    const renderRegaliasProfissao = () => {
        const regalias = (character.regalias_de_profissao || []).filter(r => r && r.nome);
        if (regalias.length === 0) return null;
        return (
            <Box sx={{ mb: 2 }}>
                <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StarIcon fontSize="small" sx={{ color: '#2F3C29' }} /> Regalias de Profissão
                </Typography>
                {regalias.map((regalia, idx) => {
                    const panelId = `profissao-${idx}`;
                    return (
                        <Accordion key={idx} expanded={expandedAccordions[panelId] || false} onChange={handleAccordionChange(panelId)}
                            sx={{ mb: 1, backgroundColor: '#e5e8e4', '&:before': { display: 'none' }, borderLeft: '4px solid #2F3C29', borderRadius: '4px !important' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#2F3C29' }} />}
                                sx={{ '&:hover': { backgroundColor: '#dde0da' }, minHeight: '48px', '& .MuiAccordionSummary-content': { margin: '8px 0' } }}>
                                <Typography className="esteban" sx={{ fontWeight: 'bold', color: '#2F3C29' }}>{regalia.nome}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: '#f2f4f1', borderTop: '1px solid #c8cbc5' }}>
                                <Typography className="esteban" variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                                    <strong>Habilidade:</strong> {regalia.habilidades}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </Box>
        );
    };

    const renderRegaliasClasse = () => {
        const regaliasClasse = character.regalias_de_classe;
        if (!regaliasClasse || Object.keys(regaliasClasse).length === 0) return null;
        return (
            <Box sx={{ mb: 2 }}>
                <Typography className="esteban" variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StarIcon fontSize="small" sx={{ color: '#931C4A' }} /> Regalias de Classe
                </Typography>
                {Object.entries(regaliasClasse).map(([className, classData], idx) => {
                    const panelId = `classe-${idx}`;
                    const regaliasArray = Array.isArray(classData) ? classData : (typeof classData === 'object' ? Object.values(classData) : [classData]);
                    return (
                        <Accordion key={idx} expanded={expandedAccordions[panelId] || false} onChange={handleAccordionChange(panelId)}
                            sx={{ mb: 1, backgroundColor: '#f8e8ed', '&:before': { display: 'none' }, borderLeft: '4px solid #931C4A', borderRadius: '4px !important' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#931C4A' }} />}
                                sx={{ '&:hover': { backgroundColor: '#f2dce4' }, minHeight: '48px', '& .MuiAccordionSummary-content': { margin: '8px 0' } }}>
                                <Typography className="esteban" sx={{ fontWeight: 'bold', color: '#931C4A' }}>{className.replace(/_/g, ' ')}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: '#fdf5f8', borderTop: '1px solid #e8c8d4' }}>
                                {regaliasArray.map((regalia, i) => {
                                    const rObj = typeof regalia === 'object' ? regalia : { nome: regalia };
                                    return (
                                        <Box key={i} sx={{ mb: 1.5, pb: 1.5, borderBottom: i < regaliasArray.length - 1 ? '1px dashed #e8c8d4' : 'none' }}>
                                            <Typography className="esteban" variant="subtitle2" sx={{ fontWeight: 'bold', color: '#7a1640' }}>• {rObj.nome || String(regalia)}</Typography>
                                            {rObj.descricao && <Typography className="esteban" variant="body2" sx={{ mt: 0.5, pl: 2, whiteSpace: 'pre-line', color: '#5c3344' }}>{rObj.descricao}</Typography>}
                                        </Box>
                                    );
                                })}
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </Box>
        );
    };

    return (
        <Card sx={{ ...sectionStyle, mt: 2 }}>
            <CardHeader sx={cardHeaderStyle} title={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography className="esteban" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><StarIcon /> Regalias</Typography>
                    <Chip label={`Pontos: ${character.pontos_de_regalia || 0}`} sx={{ backgroundColor: '#BB8130', color: 'white' }} />
                </Box>
            } />
            <CardContent>
                {editMode && (
                    <EditableField type="number" label="Pontos de Regalia" value={character.pontos_de_regalia || 0}
                        onChange={(val) => updateField('pontos_de_regalia', parseInt(val) || 0)} sx={{ mb: 2 }} />
                )}
                {renderRegaliasAprendiz()}
                {renderRegaliasEspecie()}
                {renderRegaliasProfissao()}
                {renderRegaliasClasse()}
            </CardContent>
        </Card>
    );
});

export default RegaliasSection;
