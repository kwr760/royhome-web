import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    paper: {
      color: theme.palette.primary.dark,
      borderColor: theme.palette.primary.dark,
      border: '1px solid',
    },
    list: {
      color: theme.palette.primary.dark,
      paddingTop: 0,
      paddingBottom: 0,
    },
    icon: {
      color: theme.palette.primary.dark,
    },
    divider: {
      backgroundColor: theme.palette.primary.main,
    },
    profile: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  });

export { styles };
