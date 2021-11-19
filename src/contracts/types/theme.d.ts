import { Custom, CustomOptions } from '../theme.models';

declare module '@mui/material/styles/createTheme' {

  interface ThemeOptions {
    custom?: CustomOptions;
  }
  interface Theme {
    custom: Custom;
  }
}
