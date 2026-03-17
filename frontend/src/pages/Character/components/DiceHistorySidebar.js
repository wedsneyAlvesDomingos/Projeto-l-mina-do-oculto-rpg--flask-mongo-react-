import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';

const DiceHistorySidebar = React.memo(({ diceHistory, onClear }) => (
    <Paper sx={{
        position: 'sticky', top: 16, height: 'calc(100vh - 120px)', display: 'flex',
        flexDirection: 'column', backgroundColor: 'var(--surface-paper)', border: '2px solid var(--text-muted)',
        borderRadius: 2, overflow: 'hidden'
    }}>
        {/* Header */}
        <Box sx={{ p: 1.5, backgroundColor: 'var(--footer-bg)', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CasinoIcon />
            <Typography className="esteban" sx={{ fontWeight: 'bold', fontSize: '14px' }}>Histórico de Rolagens</Typography>
            <Typography variant="caption" sx={{ ml: 'auto', backgroundColor: 'var(--text-muted)', px: 1, borderRadius: 1 }}>{diceHistory.length}</Typography>
        </Box>

        {/* Lista */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 1, display: 'flex', flexDirection: 'column-reverse', gap: 1 }}>
            {diceHistory.length === 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-primary)' }}>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
                        🎲 Nenhuma rolagem<br />ainda realizada
                    </Typography>
                </Box>
            ) : (
                [...diceHistory].reverse().map((roll, idx) => (
                    <Paper key={idx} elevation={1} sx={{
                        p: 1.5, borderRadius: 2,
                        backgroundColor: roll.isCriticalHit ? 'rgba(187,129,48,0.12)' : roll.isCriticalFail ? 'rgba(147,28,74,0.12)' : 'var(--surface-raised)',
                        borderLeft: `4px solid ${roll.isCriticalHit ? '#BB8130' : roll.isCriticalFail ? '#931C4A' : '#756A34'}`,
                        animation: idx === diceHistory.length - 1 ? 'fadeIn 0.3s ease-in' : 'none',
                        '@keyframes fadeIn': { from: { opacity: 0, transform: 'translateY(-10px)' }, to: { opacity: 1, transform: 'translateY(0)' } }
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '13px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    {roll.label || 'Rolagem'}{roll.isCriticalHit && <span>🎯</span>}{roll.isCriticalFail && <span>💀</span>}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'var(--text-primary)' }}>
                                    {roll.quantity}d{roll.sides}{roll.bonus !== 0 && (roll.bonus > 0 ? `+${roll.bonus}` : roll.bonus)}
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '20px', lineHeight: 1, color: roll.isCriticalHit ? '#BB8130' : roll.isCriticalFail ? '#931C4A' : 'var(--text-primary)' }}>
                                    {roll.total}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="caption" sx={{ color: 'var(--text-primary)', fontSize: '10px' }}>{roll.timestamp}</Typography>
                    </Paper>
                ))
            )}
        </Box>

        {/* Footer */}
        {diceHistory.length > 0 && (
            <Box sx={{ p: 1, borderTop: '1px solid #756A3466', textAlign: 'center' }}>
                <Button size="small" onClick={onClear} sx={{ color: 'var(--text-primary)', fontSize: '11px' }}>
                    Limpar Histórico
                </Button>
            </Box>
        )}
    </Paper>
));

export default DiceHistorySidebar;
