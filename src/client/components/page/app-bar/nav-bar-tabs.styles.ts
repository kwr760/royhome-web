import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tab: {
      color: theme.palette.secondary.main,
      '&:hover, &:focus&:hover': {
        color: emphasize(theme.palette.secondary.main, 0.4),
        background: emphasize(theme.palette.primary.dark, 0.2),
        borderRadius: '.25em',
      },
    },
  }),
);
