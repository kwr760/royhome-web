import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => {
  const borderColor = theme.palette.primary.dark;
  const borderLength = theme.spacing(1);

  return createStyles({
    square: {
      width: '100%',
      textAlign: 'center',
      paddingBottom: '100%',
      border: `${borderLength}px solid ${borderColor}`,
      borderRadius: 0,
      // backgroundColor: 'transparent',
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
});
