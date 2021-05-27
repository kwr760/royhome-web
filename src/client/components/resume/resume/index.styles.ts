import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(3),
      '@media print': {
        paddingRight: theme.spacing(0),
        paddingLeft: theme.spacing(0),
      },
    },
  }),
);
