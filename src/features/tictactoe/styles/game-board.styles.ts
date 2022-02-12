import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules => {
  const borderColor = theme.palette.primary.dark;
  const borderLength = theme.spacing(.5);

  return createStyles({
    grid: {
      border: `${borderLength} solid ${borderColor}`,
      borderRadius: theme.spacing(1),
      position: 'relative',
    },
    gridDisabled: {
      opacity: '0.3',
      background: 'radial-gradient(rgba(0, 0, 0, .25) 0%, rgba(0, 0, 0, 0.25) 100%)',
    },
    row: {
    },
    item: {
      position: 'relative',
      display: 'block',
    },
    message: {
      color: theme.palette.primary.dark,
      position: 'absolute',
      left: '10%',
      width: '80%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
    },
  });
};

export { styles };
