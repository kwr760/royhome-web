import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';

export const styles = (theme: Theme) =>
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
    school: {
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
  });
