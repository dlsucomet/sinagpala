import { createTheme, responsiveFontSizes  } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
let theme = createTheme({
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
    orange: {
      main: '#FD811E'
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'RopaSans',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});

theme = responsiveFontSizes(theme);

export default theme;