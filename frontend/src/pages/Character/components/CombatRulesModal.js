import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Grid, Box, Typography, Chip, Divider, Button, Tooltip,
    Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    DURACAO_RODADA_SEGUNDOS, ACOES_POR_TURNO, CAMPO_VISAO_GRAUS, ALCANCE_AMEACA_PADRAO,
    TIPOS_COBERTURA, TABELA_DANO_QUEDA,
    getAcoesPadrao, getAcoesMovimento, getReacoes, getAcoesLivres,
} from '../../../data/constants';

const ActionList = ({ actions, color = '#40150A', prefix = '' }) => (
    <List dense sx={{ py: 0 }}>
        {actions.map((acao) => (
            <ListItem key={acao.id} sx={{ py: 0.5, borderBottom: '1px solid #e0e0e0', '&:last-child': { borderBottom: 'none' } }}>
                <ListItemText
                    primary={<Typography sx={{ fontWeight: 'bold', fontSize: '13px', color }}>{prefix}{acao.nome}</Typography>}
                    secondary={
                        <Box>
                            <Typography variant="body2" sx={{ color: '#5B1F0F', fontSize: '12px' }}>{acao.descricao}</Typography>
                            {acao.teste && <Typography variant="caption" sx={{ color: '#756A34', fontStyle: 'italic' }}>Teste: {acao.teste}</Typography>}
                        </Box>
                    }
                />
            </ListItem>
        ))}
    </List>
);

const CombatRulesModal = React.memo(({ open, onClose }) => {
    const [expandedSection, setExpandedSection] = useState(null);
    const toggleSection = (s) => setExpandedSection(expandedSection === s ? null : s);

    const acoesPadrao = getAcoesPadrao();
    const acoesMovimento = getAcoesMovimento();
    const reacoes = getReacoes();
    const acoesLivres = getAcoesLivres();

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth PaperProps={{ sx: { maxHeight: '90vh' } }}>
            <DialogTitle sx={{ backgroundColor: '#756A34', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                📜 Regras Completas de Combate
            </DialogTitle>
            <DialogContent sx={{ p: 2, backgroundColor: '#f8f7f4' }}>
                {/* Turno e Rodada */}
                <Box sx={{ mb: 2, p: 2, backgroundColor: '#f0efe9', borderRadius: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1 }}>⏱️ Turno e Rodada</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}><Typography variant="body2" sx={{ color: '#5B1F0F' }}><strong>Rodada:</strong> {DURACAO_RODADA_SEGUNDOS} segundos</Typography></Grid>
                        <Grid item xs={12} md={4}><Typography variant="body2" sx={{ color: '#5B1F0F' }}><strong>Ações por turno:</strong> {ACOES_POR_TURNO}</Typography></Grid>
                        <Grid item xs={12} md={4}><Typography variant="body2" sx={{ color: '#5B1F0F' }}><strong>Campo de visão:</strong> {CAMPO_VISAO_GRAUS}° (cone)</Typography></Grid>
                    </Grid>
                </Box>

                {/* Sistema de Acerto */}
                <Box sx={{ mb: 2, p: 2, backgroundColor: '#f0efe9', borderRadius: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1 }}>🎯 Sistema de Acerto</Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ color: '#5B1F0F' }}><strong>Acerto:</strong> d20 + Perícia de Combate ≥ Defesa do alvo</Typography>
                            <Typography variant="body2" sx={{ color: '#5B1F0F' }}><strong>Empate:</strong> Dano reduzido pela metade</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ color: '#BB8130' }}><strong>Crítico:</strong> Natural 20 = dano ×2</Typography>
                            <Typography variant="body2" sx={{ color: '#931C4A' }}><strong>Falha Crítica:</strong> Natural 1 = erro automático</Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#454E30' }}>Bônus por superar defesa:</Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 0.5 }}>
                        <Chip label="+10 acima: +1d4 dano" size="small" sx={{ backgroundColor: '#e8eae5' }} />
                        <Chip label="+15 acima: +2 dano" size="small" sx={{ backgroundColor: '#e8eae5' }} />
                        <Chip label="+20 acima: +3 dano" size="small" sx={{ backgroundColor: '#e8eae5' }} />
                    </Box>
                </Box>

                {/* Cobertura */}
                <Box sx={{ mb: 2, p: 2, backgroundColor: '#f0efe9', borderRadius: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1 }}>🛡️ Cobertura</Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        {Object.values(TIPOS_COBERTURA).map((cob) => (
                            <Tooltip key={cob.id} title={cob.descricao}>
                                <Chip label={`${cob.nome} ${cob.bonusDefesa > 0 ? `(+${cob.bonusDefesa})` : cob.bloqueiaAtaques ? '(bloqueia)' : ''}`} size="small"
                                    sx={{ backgroundColor: cob.bloqueiaAtaques ? '#162A22' : cob.bonusDefesa > 0 ? '#454E30' : '#756A34', color: 'white' }} />
                            </Tooltip>
                        ))}
                    </Box>
                </Box>

                {/* Alcance de Ameaça */}
                <Box sx={{ mb: 2, p: 2, backgroundColor: '#f0efe9', borderRadius: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#40150A', mb: 1 }}>⚔️ Alcance de Ameaça (Corpo a Corpo)</Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Chip label={`Padrão: ${ALCANCE_AMEACA_PADRAO}m`} size="small" sx={{ backgroundColor: '#f5ebe3' }} />
                        <Chip label="Haste: 3m" size="small" sx={{ backgroundColor: '#f5ebe3' }} />
                        <Chip label="Com habilidades: até 4.5m" size="small" sx={{ backgroundColor: '#f5ebe3' }} />
                    </Box>
                </Box>

                {/* Dano de Queda */}
                <Accordion expanded={expandedSection === 'queda'} onChange={() => toggleSection('queda')} sx={{ mb: 1, backgroundColor: '#f5f3eb' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontWeight: 'bold', color: '#40150A' }}>📉 Dano de Queda</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={1}>
                            {TABELA_DANO_QUEDA.slice(0, 10).map((entry) => (
                                <Grid item xs={6} sm={3} key={entry.altura}>
                                    <Typography variant="body2" sx={{ color: '#5B1F0F' }}>{entry.altura}m = <strong>{entry.dano}</strong> dano</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                {/* Ações Padrão */}
                <Accordion expanded={expandedSection === 'padrao'} onChange={() => toggleSection('padrao')} sx={{ mb: 1, backgroundColor: '#f5f3eb' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontWeight: 'bold', color: '#40150A' }}>▶️ Ações Padrão (1 ação) - {acoesPadrao.length} ações</Typography>
                    </AccordionSummary>
                    <AccordionDetails><ActionList actions={acoesPadrao} /></AccordionDetails>
                </Accordion>

                {/* Ações de Movimento */}
                <Accordion expanded={expandedSection === 'movimento'} onChange={() => toggleSection('movimento')} sx={{ mb: 1, backgroundColor: '#f5f3eb' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontWeight: 'bold', color: '#40150A' }}>🏃 Ações de Movimento - {acoesMovimento.length} ações</Typography>
                    </AccordionSummary>
                    <AccordionDetails><ActionList actions={acoesMovimento} /></AccordionDetails>
                </Accordion>

                {/* Reações */}
                <Accordion expanded={expandedSection === 'reacao'} onChange={() => toggleSection('reacao')} sx={{ mb: 1, backgroundColor: '#f5f3eb' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontWeight: 'bold', color: '#40150A' }}>⚡ Reações (1 por rodada) - {reacoes.length} reações</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ActionList actions={reacoes} color="#BB8130" prefix="⚡ " />
                        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#756A34' }}>
                            Apenas 1 reação por rodada, a menos que uma regalia permita o contrário.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                {/* Ações Livres */}
                <Accordion expanded={expandedSection === 'livre'} onChange={() => toggleSection('livre')} sx={{ backgroundColor: '#f5f3eb' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontWeight: 'bold', color: '#40150A' }}>✨ Ações Livres (sem custo) - {acoesLivres.length} ações</Typography>
                    </AccordionSummary>
                    <AccordionDetails><ActionList actions={acoesLivres} color="#454E30" prefix="✨ " /></AccordionDetails>
                </Accordion>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: '#f0efe9' }}>
                <Button onClick={onClose} sx={{ color: '#40150A' }}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );
});

export default CombatRulesModal;
