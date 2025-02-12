import { createTheme } from '@mui/material/styles';

// Criação do tema com a fonte Inter aplicada globalmente
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f0f0f0',
    },
    primary: {
      main: '#162A22',
    },
    secondary: {
      main: '#a3cfd8',
    },
  },

  typography: {
    fontFamily: 'Inter, sans-serif', // Aplicando a fonte Inter
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#756A34',
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#d6d6d622',
          boxShadow: '0 3px 5px 2px rgba(90, 95, 90, 0.1)',
          borderColor: '#162A22',
          border: 'solid 1px #162A2222',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#162A22',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#162A22',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 3px 5px 2px rgba(90, 95, 90, 0.15)',
          backgroundColor: '#ededed',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          boxShadow: '0 3px 5px 2px rgba(60, 60, 60, .08)',
          backgroundColor: '#d6d6d622',
          borderColor: '#756A34',
          color: '#000000',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: '#d6d6d622',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
  },
});

export default lightTheme;
