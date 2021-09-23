import { createTheme } from '@material-ui/core/styles';

const themeLight = createTheme({
  palette: {
    primary: {
      light: '#828fa4',
      main: '#556275',
      dark: '#2b3849',
    },
    secondary: {
      light: '#e1ccaa',
      main: '#af9b7b',
      dark: '#816f50',
    },
    background: {
      paper: '#fff6ed',
      default: '#fff2e4',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif',
    fontSize: 14,
  },
  custom: {
    backgroundGradient: 'linear-gradient(to bottom right, #191F27, #556275)',
    boxShadow: '0 0 4px 1px #af9b7b',
  },
});

export default themeLight;
