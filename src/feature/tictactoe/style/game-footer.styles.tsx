import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => {
  const borderColor = theme.palette.primary.dark;
  const borderLength = theme.spacing(.5);

  return createStyles({
    footer: {
      padding: theme.spacing(1),
      border: `${borderLength}px solid ${borderColor}`,
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.background.default,
    },
    button: {
      border: `${borderLength}px solid ${borderColor}`,
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
});

