import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

export const useStyles = makeStyles((theme: Theme) =>
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
  }),
);
