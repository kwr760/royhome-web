import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingRight: 0,
      paddingLeft: 0,
      '@media print': {
        display: 'none',
      },
    },
    banner: {
      boxShadow: theme.custom.boxShadow,
      background: theme.custom.backgroundGradient,
      zIndex: 1,
      padding: '1rem',
      textAlign: 'center',
    },
    icon: {
      color: theme.palette.secondary.main,
      '&:hover, &:focus': {
        color: emphasize(theme.palette.secondary.main, 0.4),
      },
    },
  }),
);
