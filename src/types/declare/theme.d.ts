import { Custom, CustomOptions } from '../theme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    custom?: CustomOptions;
  }
  interface Theme {
    custom: Custom;
  }
}
