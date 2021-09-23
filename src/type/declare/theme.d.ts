import { Custom, CustomOptions } from '../theme';

declare module '@material-ui/core/styles/createTheme' {
  interface ThemeOptions {
    custom?: CustomOptions;
  }
  interface Theme {
    custom: Custom;
  }
}
