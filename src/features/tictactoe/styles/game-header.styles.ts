import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules => {
  const borderColor = theme.color.foreground.base;
  const halfBorderLength = theme.spacing(.5);
  const quarterBorderLength = theme.spacing(.25);

  return createStyles({
    grid: {
      border: `${halfBorderLength} solid ${borderColor}`,
      borderRadius: theme.spacing(1),
      backgroundColor: theme.color.background.base,
    },
    button: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      border: `${quarterBorderLength} solid ${borderColor}`,
    },
    top: {
      justifyContent: 'space-between',
      padding: theme.spacing(.5),
      borderBottom: `${quarterBorderLength} solid ${borderColor}`,
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    bottom: {
      padding: theme.spacing(1),
      borderTop: `${quarterBorderLength} solid ${borderColor}`,
      justifyContent: 'center',
    },
  });
};

export { styles };
