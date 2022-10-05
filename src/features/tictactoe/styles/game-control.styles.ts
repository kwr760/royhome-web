import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules => {
  return createStyles({
    dialog: {
      '& .MuiDialog-paper': {
        backgroundColor: theme.color.background.paper,
      },
    },
    buttonBar: {
      justifyContent: 'space-between',
    },
    button: {
      color: theme.color.foreground.base,
    },
  });
};

export { styles };
