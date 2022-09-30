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
      boxShadow: theme.color.banner.boxShadow,
      borderRadius: '50%',
    },
    email: {
      color: theme.color.foreground.base,
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
      backgroundColor: theme.color.background.base,
      padding: '1rem',
      boxShadow: theme.color.banner.boxShadow,
    },
  });

export { styles };
