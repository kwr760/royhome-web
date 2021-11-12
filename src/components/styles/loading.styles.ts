import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

export const styles = (): StyleRules =>
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
  });
