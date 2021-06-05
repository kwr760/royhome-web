import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      color: theme.palette.primary.dark,
      alignItems: 'center',
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left',
      },
    },
    picture: {
      boxShadow: theme.custom.boxShadow,
      borderRadius: '50%',
    },
    email: {
      color: theme.palette.primary.dark,
      margin: '1px',
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        marginLeft: '2rem',
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: 0,
      },
    },
    header: {
      margin: '1px',
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        marginLeft: '2rem',
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: 0,
      },
    },
    center: {
      textAlign: 'center',
    },
    code: {
      fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
    },
    pre: {
      borderRadius: '0.25rem',
      width: '100%',
      backgroundColor: theme.palette.background.default,
      padding: '1rem',
      boxShadow: theme.custom.boxShadow,
      color: theme.palette.primary.dark,
    },
  }),
);
