import React from 'react';
import { Paper, Typography, Box, Chip, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CasinoIcon from '@mui/icons-material/Casino';

const DiceResultDisplay = React.memo(({ diceResult, onClose }) => {
    if (!diceResult) return null;

    const getBgColor = () => {
        if (diceResult.isCriticalHit) return 'linear-gradient(135deg, #BB8130 0%, #AB6422 100%)';
        if (diceResult.isCriticalFail) return 'linear-gradient(135deg, #5B1F0F 0%, #931C4A 100%)';
        return 'linear-gradient(135deg, #162A22 0%, #2F3C29 100%)';
    };

    return (
        <Paper elevation={8} sx={{
            position: 'fixed', top: 100, right: 20, zIndex: 1000, p: 3, borderRadius: 3,
            background: getBgColor(), color: 'white', minWidth: '200px',
            animation: diceResult.isAnimating ? 'shake 0.1s infinite' : 'none',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            border: diceResult.isCriticalHit ? '3px solid #BB8130' : diceResult.isCriticalFail ? '3px solid #931C4A' : 'none'
        }}>
            <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mb: 1 }}>
                {diceResult.label || 'Rolagem'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <CasinoIcon sx={{ fontSize: 40, animation: diceResult.isAnimating ? 'spin 0.2s infinite linear' : 'none' }} />
                <Typography variant="h3" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
                    {diceResult.total}
                </Typography>
            </Box>
            {diceResult.isCriticalHit && <Chip label="🎯 CRÍTICO!" sx={{ backgroundColor: '#BB8130', color: '#fff', fontWeight: 'bold', mb: 1 }} />}
            {diceResult.isCriticalFail && <Chip label="💀 FALHA CRÍTICA!" sx={{ backgroundColor: '#931C4A', color: '#fff', fontWeight: 'bold', mb: 1 }} />}
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {diceResult.quantity}d{diceResult.sides}
                {diceResult.bonus !== 0 && (diceResult.bonus > 0 ? `+${diceResult.bonus}` : diceResult.bonus)}
            </Typography>
            {diceResult.rolls && diceResult.rolls.length > 1 && (
                <Typography variant="caption" sx={{ display: 'block', opacity: 0.7 }}>[{diceResult.rolls.join(', ')}]</Typography>
            )}
            <IconButton size="small" onClick={onClose} sx={{ position: 'absolute', top: 4, right: 4, color: 'white' }}>
                <CancelIcon fontSize="small" />
            </IconButton>
        </Paper>
    );
});

export default DiceResultDisplay;
