import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      padding: theme.spacing(3),
      backgroundColor: theme.palette.background.paper,
    },
    row: {
    },
    item: {
      padding: theme.spacing(1),
    },
  }),
);
