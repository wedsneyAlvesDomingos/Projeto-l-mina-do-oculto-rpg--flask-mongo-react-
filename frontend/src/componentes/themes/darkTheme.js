import { createTheme} from '@mui/material/styles';

const Darktheme = createTheme({
  
    palette: {
      mode: 'dark',
      primary: {
        main: '#21838f',
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
            backgroundColor: '#21838f',
            backgroundImage: 'none'
          }
  
        }
      },
     
    },
  
  })

  export default Darktheme; 