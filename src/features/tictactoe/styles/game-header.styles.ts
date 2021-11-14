import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

export const styles = (theme: Theme): StyleRules => {
  const borderColor = theme.palette.primary.dark;
  const halfBorderLength = theme.spacing(.5);
  const quarterBorderLength = theme.spacing(.25);

  return createStyles({
    grid: {
      padding: theme.spacing(1),
      border: `${halfBorderLength} solid ${borderColor}`,
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.background.default,
    },
    player: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      border: `${quarterBorderLength} solid ${borderColor}`,
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.background.default,
    },
    icon: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    winner: {
      color: theme.palette.info.dark,
      fontWeight: theme.typography.fontWeightBold,
    },
    loser: {
      color: theme.palette.warning.main,
      fontWeight: theme.typography.fontWeightBold,
    },
    active: {
      fontWeight: theme.typography.fontWeightBold,
    },
    inactive: {
      fontWeight: theme.typography.fontWeightLight,
    },
  });
};
