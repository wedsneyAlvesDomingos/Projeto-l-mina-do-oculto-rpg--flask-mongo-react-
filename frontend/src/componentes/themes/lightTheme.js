import { createTheme } from '@mui/material/styles';
// Create light and dark themes
const lightTheme = createTheme({
  palette: {
    mode: 'light',

    background: {
      default: '#f0f0f0',

    }, // Substitua pela cor desejada

    primary: {
      main: '#21838f',
    },
    secondary: {
      main: '#a3cfd8',
    },

  },

  components: {

    MuiAppBar: {
      styleOverrides:
      {
        root: {
          backgroundColor: '#21838f',
          backgroundImage: 'none'
        }

      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#d6d6d622',
          boxShadow: '0 3px 5px 2px rgba(90, 95, 90, 0.1)', // Definindo a elevação
          borderColor: '#286b73',
          border: 'solid 1px #286b7322',

        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {

          backgroundColor: '#286b73',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {

          backgroundColor: '#286b73',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 3px 5px 2px rgba(90, 95, 90, 0.15)', // Definindo a elevação
          backgroundColor: '#ededed',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          boxShadow: '0 3px 5px 2px rgba(60, 60, 60, .08)', // Definindo a elevação
          backgroundColor: '#d6d6d622',
          borderColor: '#21838f',
          color: '#000000'
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