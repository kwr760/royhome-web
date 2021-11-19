import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { DarkModes } from './contracts/constants/session.constants';
import { getDarkMode } from './store/session/session.selector';
import { themeLight } from './theme-light';
import { themeDark } from './theme-dark';
import App from './App';

/**
 * @return {string}
 */
const Theme: FunctionComponent = (props) => {
  const darkMode = useSelector(getDarkMode);
  const theme = (darkMode === DarkModes.DARK_MODE) ? themeDark : themeLight;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App {...props} />
    </ThemeProvider>
  );
};

export default Theme;
