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
    content: {
      paddingTop: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
    actions: {
      justifyContent: 'space-between',
    },
    button: {
      color: theme.color.foreground.base,
    },
  });
};

export { styles };
