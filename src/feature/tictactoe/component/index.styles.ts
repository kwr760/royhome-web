import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      flexGrow: 1,
      paddingTop: '5%',
      paddingLeft: '15%',
      paddingRight: '15%',
    },
  }),
);
