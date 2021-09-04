import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
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
  }),
);
