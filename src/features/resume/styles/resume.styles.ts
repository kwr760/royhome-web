import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(3),
      '@media print': {
        paddingRight: theme.spacing(0),
        paddingLeft: theme.spacing(0),
      },
    },
  });
