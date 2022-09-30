import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    header: {
      marginBottom: '10px',
    },
    name: {
      fontSize: 'xx-large',
      fontWeight: 'bold',
      textAlign: 'center',
      order: 0,
      [theme.breakpoints.up('sm')]: {
        order: 4,
      },
      '@media print': {
        order: 4,
        flexGrow: 0,
        maxWidth: '33%',
        flexBasis: '33%',
      },
    },
    contact: {
      marginTop: 'auto',
      marginBottom: 'auto',
      fontSize: 'smaller',
      textAlign: 'center',
      order: 4,
      [theme.breakpoints.up('sm')]: {
        order: 8,
        textAlign: 'right',
      },
      '@media print': {
        order: 8,
        textAlign: 'right',
        flexGrow: 0,
        maxWidth: '33%',
        flexBasis: '33%',
      },
    },
    address: {
      marginTop: 'auto',
      marginBottom: 'auto',
      fontStyle: 'italic',
      fontSize: 'smaller',
      textAlign: 'center',
      order: 8,
      [theme.breakpoints.up('sm')]: {
        order: 0,
        textAlign: 'left',
      },
      '@media print': {
        order: 0,
        textAlign: 'left',
        flexGrow: 0,
        maxWidth: '33%',
        flexBasis: '33%',
      },
    },
    phone: {
      fontWeight: 'bolder',
    },
    email: {
    },
  });

export { styles };
