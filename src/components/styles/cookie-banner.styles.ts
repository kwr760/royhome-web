import type { Theme } from '@mui/material';
import { emphasize } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    typography: {
      padding: theme.spacing(1),
      color: theme.color.banner.foreground.base,
    },
    button: {
      marginLeft: theme.spacing(1),
      background: emphasize(theme.color.banner.control.background, .2),
      '&:hover, &:focus&:hover': {
        background: emphasize(theme.color.banner.control.background, .1),
      },
    },
    banner: {
      display: 'flex',
      justifyContent: 'center',
      boxShadow: theme.color.banner.boxShadow,
      background: theme.color.banner.background.bottom,
      zIndex: 1,
      padding: '1rem',
      textAlign: 'center',
      '@media print': {
        display: 'none',
      },
    },
    link: {
      color: theme.palette.info.main,
    },
  });

export { styles };
