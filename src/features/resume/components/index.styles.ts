import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
    },
  }),
);
