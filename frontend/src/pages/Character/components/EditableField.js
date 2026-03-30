import React, { useState, useEffect, memo } from 'react';
import { TextField, IconButton } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';

/* Estilos de truncate para inputs de texto (não multiline) */
const truncateSx = {
    '& .MuiInputBase-input:not(:focus)': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

// Componente de Input controlado que evita re-renders excessivos
export const EditableField = memo(({ 
    value, 
    onChange, 
    type = 'text', 
    label, 
    fullWidth, 
    multiline, 
    rows, 
    size, 
    InputProps, 
    sx, 
    inputProps 
}) => {
    const [localValue, setLocalValue] = useState(value);
    
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleBlur = () => {
        if (localValue !== value) {
            onChange(localValue);
        }
    };

    const handleChange = (e) => {
        const newValue = type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value;
        setLocalValue(newValue);
    };

    const mergedSx = multiline ? sx : { ...truncateSx, ...sx };

    return (
        <TextField
            type={type}
            label={label}
            fullWidth={fullWidth}
            multiline={multiline}
            rows={rows}
            size={size}
            value={localValue ?? ''}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={InputProps}
            sx={mergedSx}
            inputProps={inputProps}
        />
    );
});

// Componente de botão de rolagem de dado
export const DiceButton = ({ 
    diceString, 
    label, 
    color = 'primary', 
    size = 'small', 
    fullRoll = false, 
    bonus = 0, 
    icon = null,
    onClick,
    disabled = false
}) => (
    <IconButton
        size={size}
        onClick={onClick}
        disabled={disabled}
        sx={{
            backgroundColor: `${color}.main`,
            color: 'white',
            '&:hover': { backgroundColor: `${color}.dark` },
            animation: disabled ? 'pulse 0.3s infinite' : 'none',
            ml: 0.5
        }}
        title={fullRoll ? `Rolar d20+${bonus}` : `Rolar ${diceString}`}
    >
        {icon || <CasinoIcon fontSize="small" />}
    </IconButton>
);

export default EditableField;
