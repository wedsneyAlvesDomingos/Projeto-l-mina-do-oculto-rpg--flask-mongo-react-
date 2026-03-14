import { createTheme } from '@mui/material/styles';
import { colors, derived, gradients, typography } from './tokens';

const Darktheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: derived.bgDark,
      paper:   derived.bgDarkSurface,
    },
    primary: {
      main:         colors.gold,
      light:        colors.olive,
      dark:         colors.bronze,
      contrastText: '#fff',
    },
    secondary: {
      main:         colors.forest,
      light:        colors.moss,
      dark:         colors.midnight,
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
      primary:   derived.textOnDark,
      secondary: derived.textOnDarkMuted,
      disabled:  `${derived.textOnDarkMuted}88`,
    },
    divider: `${colors.olive}55`,
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
          background:      colors.midnight,
          backgroundImage: 'none',
          boxShadow:       '0 2px 8px rgba(0,0,0,0.4)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: derived.bgDarkSurface,
          boxShadow:       '0 3px 12px rgba(0,0,0,0.3)',
          border:          `1px solid ${colors.olive}55`,
          borderRadius:    '12px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: derived.bgDarkSurface,
          backgroundImage: 'none',
          boxShadow:       '0 2px 8px rgba(0,0,0,0.25)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: colors.gold,
          color:      '#fff',
          '&:hover':  { background: colors.bronze },
        },
        containedSecondary: {
          background: colors.forest,
          '&:hover':  { background: colors.moss },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: derived.textOnDark,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: derived.textOnDark,
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
          fontFamily:       typography.fontSerif,
          color:            derived.textOnDarkMuted,
          '&.Mui-selected': { color: colors.gold },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: colors.gold },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontFamily: typography.fontSerif,
            fontWeight: 'bold',
            color:      derived.textOnDark,
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root': {
            backgroundColor: '#1f2e1a',
            '&:nth-of-type(even)': { backgroundColor: '#2a3c28' },
            '&:hover':             { backgroundColor: `${colors.forest}44` },
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: derived.bgDarkAlt,
          '&:before':      { display: 'none' },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          fontFamily: typography.fontSerif,
          color:      derived.textOnDark,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border:       `2px solid ${colors.olive}`,
          borderRadius: '12px',
          background:   derived.bgDarkSurface,
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: `${derived.bgDarkSurface}cc`,
          borderColor:     `${colors.olive}55`,
          color:           derived.textOnDark,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: derived.bgDark,
          color:           derived.textOnDark,
          scrollbarColor:  `${colors.olive} ${derived.bgDark}`,
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-track': { background: derived.bgDark },
          '&::-webkit-scrollbar-thumb': {
            background:   colors.olive,
            borderRadius: '4px',
          },
        },
      },
    },
  },
});

export default Darktheme;