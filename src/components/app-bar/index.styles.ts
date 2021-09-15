import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
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
  }),
);
