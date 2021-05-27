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
      background: theme.palette.primary.dark,
      color: theme.palette.secondary.main,
      outline: 'none',
      '&:hover, &:focus&:hover': {
        background: theme.palette.primary.light,
        color: emphasize(theme.palette.secondary.main, 0.4),
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
