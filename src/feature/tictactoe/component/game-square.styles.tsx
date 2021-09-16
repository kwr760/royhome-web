import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      paddingBottom: '100%',
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
      textAlign: 'center',
    },
  }),
);
