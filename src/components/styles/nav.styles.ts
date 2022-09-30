import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    container: {
      padding: 0,
      '@media print': {
        display: 'none',
      },
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      display: 'flex',
      marginRight: theme.spacing(3),
    },
    banner: {
      boxShadow: theme.color.banner.boxShadow,
      background: theme.color.banner.background.top,
      zIndex: 1,
    },
    grow: {
      flexGrow: 1,
    },
  });

export { styles };
