import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * Footer padrão — Lâmina do Oculto
 *
 * Props:
 *  - position: 'static' (default) | 'absolute' | 'fixed'
 *  - credit:   string opcional (ex: "Art by John D Batten")
 */
const AppFooter = ({ credit }) => {
    return (
        <Box
            component="footer"
            sx={{
                background: '#40150A',
                width: '100%',
                position: 'fixed',
                bottom: 0,
                left: 0,
                zIndex: 1200,
                p: { xs: '6px 8px', sm: '4px 0' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: { xs: 0.5, sm: 1 },
            }}
        >
            <Typography sx={{ color: '#fff', fontSize: { xs: '9px', sm: '10px' }, textAlign: 'center' }}>
                © 2024 Lâmina do oculto. All rights reserved.
            </Typography>
            {credit && (
                <Typography sx={{ color: '#fff', fontSize: { xs: '9px', sm: '10px' }, textAlign: 'center' }}>
                    {credit}
                </Typography>
            )}
        </Box>
    );
};

export default AppFooter;
