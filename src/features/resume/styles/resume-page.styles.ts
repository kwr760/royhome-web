import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
    },
  });
