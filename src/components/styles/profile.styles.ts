import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    container: {
      padding: theme.spacing(3),
    },
    grid: {
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
  });

export { styles };
