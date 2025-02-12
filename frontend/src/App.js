import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import Darktheme from './componentes/themes/darkTheme';
import lightTheme from './componentes/themes/lightTheme';
import { DarkModeProvider, useDarkModeValue } from './hooks/darkmode';

function AppContent() {
  const { isDarkMode } = useDarkModeValue();

  return (
    <React.Fragment>
      <ThemeProvider theme={isDarkMode ? Darktheme : lightTheme}>
        <CssBaseline />

        <AppRoutes />

      </ThemeProvider>
    </React.Fragment>
  );
}
function App() {
  return (

    <DarkModeProvider>

      <AppContent />
    </DarkModeProvider>
  );
}

export default App;