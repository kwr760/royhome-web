import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    title: {
      marginBottom: theme.spacing(3),
      textTransform: 'uppercase',
      fontSize: 'larger',
      fontWeight: 'bold',
      marginTop: '10px',
      borderBottom: '1px solid',
      '@media print': {
        flexGrow: 0,
        maxWidth: '100%',
        flexBasis: '100%',
      },
    },
    project: {
      '@media print': {
        flexGrow: 0,
        maxWidth: '75%',
        flexBasis: '75%',
      },
    },
    date: {
      textAlign: 'right',
      '@media print': {
        flexGrow: 0,
        maxWidth: '25%',
        flexBasis: '25%',
      },
    },
    description: {
      '@media print': {
        flexGrow: 0,
        maxWidth: '100%',
        flexBasis: '100%',
      },
    },
    link: {
    },
  });

export { styles };
