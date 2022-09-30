import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    paper: {
      backgroundColor: theme.color.background.paper,
      borderColor: theme.color.foreground.base,
      border: '1px solid',
    },
    list: {
      color: theme.color.foreground.base,
      paddingTop: 0,
      paddingBottom: 0,
    },
    icon: {
      color: theme.color.foreground.base,
    },
    divider: {
      backgroundColor: theme.color.foreground.base,
    },
    profile: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  });

export { styles };
