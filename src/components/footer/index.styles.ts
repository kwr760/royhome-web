import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
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
        color: emphasize(theme.palette.secondary.main, .5),
      },
    },
    typography: {
      padding: theme.spacing(1),
    },
    popover: {
      '& .MuiPaper-root': {
        backgroundColor: emphasize(theme.palette.primary.dark, .2),
      },
    },
    popoverRoot: {
      backgroundColor: 'red',
      borderRadius: '16px',
    },
    popoverContainer: {
      display: 'flex',
      background: emphasize(theme.palette.primary.dark, .2),
      color: emphasize(theme.palette.secondary.main, .5),
    },
    link: {
      color: theme.palette.secondary.main,
    },
    box: {
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);
