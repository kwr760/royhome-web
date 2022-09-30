import type { Theme } from '@mui/material';
import { emphasize } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    container: {
      paddingRight: 0,
      paddingLeft: 0,
      '@media print': {
        display: 'none',
      },
    },
    banner: {
      boxShadow: theme.color.banner.boxShadow,
      background: theme.color.banner.background.bottom,
      zIndex: 1,
      padding: '1rem',
      textAlign: 'center',
    },
    icon: {
      color: theme.color.banner.control.base,
      '&:hover, &:focus': {
        color: emphasize(theme.color.banner.control.base, .5),
      },
    },
    typography: {
      padding: theme.spacing(1),
    },
    popover: {
      '& .MuiPaper-root': {
        backgroundColor: emphasize(theme.color.banner.control.background, .2),
      },
    },
    popoverContainer: {
      display: 'flex',
      background: emphasize(theme.color.banner.control.background, .2),
      color: emphasize(theme.color.banner.control.base, .5),
    },
    link: {
      color: theme.color.banner.control.base,
    },
    box: {
      display: 'flex',
      justifyContent: 'center',
    },
  });

export { styles };
