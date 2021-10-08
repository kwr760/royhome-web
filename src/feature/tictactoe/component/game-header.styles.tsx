import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => {
  const borderColor = theme.palette.primary.dark;
  const borderLength = theme.spacing(.5);

  return createStyles({
    grid: {
      padding: theme.spacing(1),
      border: `${borderLength}px solid ${borderColor}`,
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.background.default,
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
    player: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });
});

