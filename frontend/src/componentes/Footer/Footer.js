import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * Footer padrão — Lâmina do Oculto
 *
 * Props:
 *  - position: 'static' (default) | 'absolute' | 'fixed'
 *  - credit:   string opcional (ex: "Art by John D Batten")
 */
const AppFooter = ({ position = 'static', credit }) => {
    const positionSx =
        position === 'absolute'
            ? { position: 'absolute', bottom: 0, left: 0 }
            : position === 'fixed'
            ? { position: 'fixed', bottom: 0, left: 0 }
            : {};

    return (
        <Box
            component="footer"
            sx={{
                background: '#40150A',
                width: '100%',
                maxHeight: '28px',
                flexShrink: 0,
                p: '4px 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...positionSx,
            }}
        >
            <Typography sx={{ color: '#fff', fontSize: '10px' }}>
                © 2024 Lâmina do oculto. All rights reserved.
            </Typography>
            {credit && (
                <Typography sx={{ color: '#fff', fontSize: '10px', ml: 2 }}>
                    {credit}
                </Typography>
            )}
        </Box>
    );
};

export default AppFooter;
