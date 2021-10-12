import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => {
  const borderColor = theme.palette.primary.dark;
  const borderLength = theme.spacing(.5);

  return createStyles({
    grid: {
      border: `${borderLength}px solid ${borderColor}`,
      borderRadius: theme.spacing(1),
    },
    row: {
    },
    item: {
      position: 'relative',
      display: 'block',
    },
  });
});
