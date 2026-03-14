import { createTheme } from '@mui/material/styles';
import { colors, derived, gradients, typography } from './tokens';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: derived.bgPage,
      paper:   derived.bgSurface,
    },
    primary: {
      main:         colors.midnight,
      light:        colors.forest,
      dark:         colors.moss,
      contrastText: '#fff',
    },
    secondary: {
      main:         colors.gold,
      light:        colors.olive,
      dark:         colors.bronze,
      contrastText: '#fff',
    },
    error: {
      main: colors.garnet,
    },
    warning: {
      main: colors.scarlet,
    },
    info: {
      main: colors.olive,
    },
    success: {
      main: colors.moss,
    },
    text: {
      primary:   derived.textPrimary,
      secondary: derived.textSecondary,
      disabled:  derived.textMuted,
    },
    divider: derived.borderLight,
  },

  typography: {
    fontFamily: typography.fontSans,
    h1: { fontFamily: typography.fontSerif },
    h2: { fontFamily: typography.fontSerif },
    h3: { fontFamily: typography.fontSerif },
    h4: { fontFamily: typography.fontSerif },
    h5: { fontFamily: typography.fontSerif },
    h6: { fontFamily: typography.fontSerif },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background:      colors.forest,
          backgroundImage: 'none',
          boxShadow:       '0 2px 8px rgba(0,0,0,0.25)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: derived.bgSurface,
          boxShadow:       '0 3px 8px rgba(0,0,0,0.08)',
          border:          `1px solid ${derived.borderLight}`,
          borderRadius:    '12px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: derived.bgSurface,
          boxShadow:       '0 2px 6px rgba(0,0,0,0.07)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: colors.midnight,
          '&:hover':  { background: colors.moss },
        },
        containedSecondary: {
          background: colors.gold,
          '&:hover':  { background: colors.bronze },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: typography.fontSerif,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: typography.fontSerif,
          color:      colors.blood,
          '&.Mui-selected': { color: colors.gold },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: colors.olive },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontFamily: typography.fontSerif,
            fontWeight: 'bold',
            color:      '#fff',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: derived.bgSurface,
          '&:before':      { display: 'none' },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          fontFamily: typography.fontSerif,
          color:      derived.textPrimary,
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          boxShadow:       '0 2px 6px rgba(60,60,60,0.08)',
          backgroundColor: `${derived.bgSurface}22`,
          borderColor:     colors.olive,
          color:           '#000',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: { backgroundColor: 'transparent' },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border:       `2px solid ${colors.olive}`,
          borderRadius: '12px',
        },
      },
    },
  },
});

export default lightTheme;
