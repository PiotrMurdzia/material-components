import { createTheme } from '@mui/material/styles';

// Light theme as default; structure prepared for dark mode extension later
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' }
  },
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
  }
});


