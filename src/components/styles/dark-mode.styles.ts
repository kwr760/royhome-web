import { emphasize } from '@mui/material';
import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    button: {
      margin: theme.spacing(3),
      border: theme.spacing(0),
      lineHeight: '1.2',
      borderRadius: '1rem',
      paddingRight: '0.5rem',
      paddingLeft: '0.5rem',
      minWidth: 0,
      color: theme.palette.secondary.main,
      outline: 'none',
      '&:hover, &:focus&:hover': {
        color: emphasize(theme.palette.secondary.main, 0.4),
        background: emphasize(theme.palette.primary.dark, 0.2),
        borderRadius: '1rem',
        outline: 'none',
      },
      '&:focus': {
        borderRadius: '1rem',
        outline: 'none',
      },
    },
    moonFix: {
      marginBottom: '0.125rem',
    },
  });

export { styles };
