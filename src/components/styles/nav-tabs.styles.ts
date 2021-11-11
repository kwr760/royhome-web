import { emphasize } from '@mui/material';
import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';

export const styles = (theme: Theme) =>
  createStyles({
    tab: {
      color: theme.palette.secondary.main,
      '&:hover, &:focus&:hover': {
        color: emphasize(theme.palette.secondary.main, 0.4),
        background: emphasize(theme.palette.primary.dark, 0.2),
        borderRadius: '.25em',
      },
    },
  });
