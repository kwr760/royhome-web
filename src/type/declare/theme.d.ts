import { Custom, CustomOptions } from '../theme';

declare module '@mui/material/styles/createTheme' {
  interface ThemeOptions {
    custom?: CustomOptions;
  }
  interface Theme {
    custom: Custom;
  }
}
