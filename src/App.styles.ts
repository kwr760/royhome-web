import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      color: theme.palette.primary.dark,
      background: theme.palette.background.paper,
      boxShadow: theme.custom.boxShadow,
      // paddingTop: '1rem',
      padding: 0,
      flexGrow: 1,
      overflow: 'auto',
      '@media print': {
        overflow: 'visible',
        boxShadow: 'none',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(0),
        width: '880px',
      },
    },
    app: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    },
  }),
);
