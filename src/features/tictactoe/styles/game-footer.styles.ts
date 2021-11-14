import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

export const styles = (theme: Theme): StyleRules => {
  const borderColor = theme.palette.primary.dark;
  const borderLength = theme.spacing(.5);

  return createStyles({
    footer: {
      padding: theme.spacing(1),
      border: `${borderLength} solid ${borderColor}`,
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.background.default,
    },
    button: {
      border: `${borderLength} solid ${borderColor}`,
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.dark,
    },
    status: {
      color: theme.palette.primary.dark,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });
};
