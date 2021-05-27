import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    spinner: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
    },
    loading: {
      position: 'absolute',
      top: '45%',
      width: '10%',
      height: '10%',
    },
  }),
);
