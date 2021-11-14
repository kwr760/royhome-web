import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

export const styles = (theme: Theme): StyleRules => {
  const borderColor = theme.palette.primary.dark;
  const borderLength = theme.spacing(.5);

  return createStyles({
    grid: {
      border: `${borderLength} solid ${borderColor}`,
      borderRadius: theme.spacing(1),
    },
    row: {
    },
    item: {
      position: 'relative',
      display: 'block',
    },
  });
};
