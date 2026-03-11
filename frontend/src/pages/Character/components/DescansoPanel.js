import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Grid, Paper, Typography, Button,
} from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';

const DescansoPanel = React.memo(({ open, onClose, onDescansoCurto, onDescansoLongo }) => (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#162A22', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
            <HotelIcon /> Sistema de Descanso
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
            <Typography variant="body2" sx={{ mb: 3, color: '#5B1F0F' }}>
                Escolha o tipo de descanso para recuperar seus recursos.
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, backgroundColor: '#f5f3eb', height: '100%' }}>
                        <Typography variant="h6" sx={{ color: '#454E30', fontWeight: 'bold', mb: 1 }}>Descanso Curto</Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: '#5B1F0F' }}>
                            Duração: 1 hora<br/>Intervalo: a cada 6 horas
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 2, color: '#756A34' }}>
                            Recupera:<br/>• 1/3 dos Pontos de Vida<br/>• 1/2 da Estamina<br/>• 1/2 dos Pontos de Magia
                        </Typography>
                        <Button variant="contained" fullWidth onClick={onDescansoCurto} sx={{ backgroundColor: '#454E30' }}>
                            Descansar (Curto)
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, backgroundColor: '#f5f3eb', height: '100%' }}>
                        <Typography variant="h6" sx={{ color: '#162A22', fontWeight: 'bold', mb: 1 }}>Descanso Longo</Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: '#5B1F0F' }}>
                            Duração: 6 horas de sono<br/>Intervalo: a cada 20 horas
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 2, color: '#756A34' }}>
                            Recupera:<br/>• Todos os Pontos de Vida<br/>• Toda a Estamina<br/>• Todos os Pontos de Magia<br/>• -1 nível de Cansaço
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 2, color: '#931C4A' }}>
                            Requer: Saco de dormir (ou ambiente seguro), 1 ração e 1L de água
                        </Typography>
                        <Button variant="contained" fullWidth onClick={onDescansoLongo} sx={{ backgroundColor: '#162A22' }}>
                            Descansar (Longo)
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Fechar</Button>
        </DialogActions>
    </Dialog>
));

export default DescansoPanel;
