import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

export const styles = (theme: Theme): StyleRules =>
  createStyles({
    container: {
      padding: theme.spacing(3),
    },
  });
