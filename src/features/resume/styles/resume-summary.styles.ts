import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

export const styles = (theme: Theme): StyleRules =>
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
  });
