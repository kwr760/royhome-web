import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

export const useStyles = makeStyles((theme: Theme) =>
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
        background: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        borderRadius: '1rem',
        outline: 'none',
      },
    },
    moonFix: {
      marginBottom: '0.125rem',
    },
  }),
);
