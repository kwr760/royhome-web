import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

export const styles = (theme: Theme): StyleRules => {
  const borderColor = theme.palette.primary.dark;
  const borderLength = theme.spacing(1);

  return createStyles({
    square: {
      width: '100%',
      textAlign: 'center',
      paddingBottom: '100%',
      border: `${borderLength} solid ${borderColor}`,
      borderRadius: 0,
      boxShadow: 'none',
    },
    label: {
      color: theme.palette.primary.dark,
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  });
};
