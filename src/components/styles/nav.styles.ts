import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: 0,
      '@media print': {
        display: 'none',
      },
    },
    avator: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      display: 'flex',
      marginRight: theme.spacing(3),
    },
    banner: {
      boxShadow: theme.custom.boxShadow,
      background: theme.custom.backgroundGradient,
      zIndex: 1,
    },
    grow: {
      flexGrow: 1,
    },
  });
