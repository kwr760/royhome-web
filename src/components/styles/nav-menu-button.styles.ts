import { emphasize } from '@mui/material';
import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    iconButton: {
      color: theme.palette.primary.dark,
      borderRadius: '.25em',
      '&:hover, &:focus&:hover': {
        color: emphasize(theme.palette.secondary.main, 0.5),
        background: emphasize(theme.palette.primary.dark, 0.2),
      },
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  });

export { styles };
