import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';

export const styles = (theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(1),
      color: theme.palette.secondary.light,
    },
    button: {
      margin: theme.spacing(1),
    },
    banner: {
      display: 'flex',
      justifyContent: 'center',
      boxShadow: theme.custom.boxShadow,
      background: theme.custom.backgroundGradient,
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
