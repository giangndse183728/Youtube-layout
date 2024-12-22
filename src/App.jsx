import React from 'react';
import Home from './component/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import './AppStyle.css';

const theme = createTheme({
  typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App = () => {
  return (
    
    <ThemeProvider theme={theme}>  
    <Home/>
      </ThemeProvider>
      
    
  );
};

export default App;
