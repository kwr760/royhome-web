import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      paddingTop: '5%',
      paddingLeft: '15%',
      paddingRight: '15%',
    },
    grid: {
      padding: theme.spacing(3),
      backgroundColor: theme.palette.background.paper,
    },
    row: {
    },
    item: {
      padding: theme.spacing(1),
    },
    paper: {
      paddingBottom: '100%',
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
      textAlign: 'center',
    },
  }),
);
