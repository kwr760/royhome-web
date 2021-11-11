import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';

export const styles = (theme: Theme) => {
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
};
