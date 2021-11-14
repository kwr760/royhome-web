import { emphasize } from '@mui/material';
import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

export const styles = (theme: Theme): StyleRules =>
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
  });
