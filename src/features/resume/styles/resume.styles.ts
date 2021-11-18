import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    container: {
      marginBottom: theme.spacing(3),
      '@media print': {
        paddingRight: theme.spacing(0),
        paddingLeft: theme.spacing(0),
      },
    },
  });

export { styles };
