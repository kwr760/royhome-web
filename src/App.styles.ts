import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

export const styles = (theme: Theme): StyleRules =>
  createStyles({
    paper: {
      color: theme.color.foreground.base,
      background: theme.color.background.paper,
      boxShadow: theme.color.banner.boxShadow,
      padding: 0,
      flexGrow: 1,
      overflow: 'auto',
      '@media print': {
        overflow: 'visible',
        boxShadow: 'none',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(0),
        width: '880px',
      },
    },
    app: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: theme.color.background.base,
    },
  });
