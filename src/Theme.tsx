import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { DarkModes } from './store/session/session.constants';
import { getDarkMode } from './store/session/session.selector';
import lightTheme from './theme-light';
import darkTheme from './theme-dark';
import App from './App';

/**
 * @return {string}
 */
const Theme: FunctionComponent = (props) => {
  const darkMode = useSelector(getDarkMode);
  const theme = (darkMode === DarkModes.DARK_MODE) ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App {...props} />
    </ThemeProvider>
  );
};

export default Theme;
