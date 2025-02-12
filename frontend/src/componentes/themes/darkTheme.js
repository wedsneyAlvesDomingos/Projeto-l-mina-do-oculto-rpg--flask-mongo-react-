import { createTheme} from '@mui/material/styles';

const Darktheme = createTheme({
  
    palette: {
      mode: 'dark',
      primary: {
        main: '#756A34',
      },
      secondary: {
        main: '#000000',
      },
    },
  
    components: {
      MuiDataGrid:{

      },
      MuiAppBar: {
        styleOverrides:
        {
          root: {
            backgroundColor: '#756A34',
            backgroundImage: 'none'
          }
  
        }
      },
     
    },
  
  })

  export default Darktheme; 