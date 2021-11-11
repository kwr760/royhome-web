import { createStyles } from '@mui/styles';

export const styles = () =>
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
