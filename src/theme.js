import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#151414',
    },
    yellow: {
      main: '#FFE169',
      secondary: '#FFF79A',
    },
    brown: {
      main: '#80292D',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;