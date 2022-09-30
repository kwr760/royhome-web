import { Icon, Color } from '../theme.models';

declare module '@mui/material/styles/createTheme' {
  interface ThemeOptions {
    color: Color;
    icon: Icon;
  }
  interface Theme {
    color: Color;
    icon: Icon;
  }
}
