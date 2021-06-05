import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
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
  }),
);
