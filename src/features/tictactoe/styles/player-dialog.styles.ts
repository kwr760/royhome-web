import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules => {
  return createStyles({
    nameInput: {
      margin: theme.spacing(1),
      width: '-webkit-fill-available',
    },
    playerTypeGroup: {
      margin: theme.spacing(1),
      width: '-webkit-fill-available',
    },
  });
};

export { styles };
