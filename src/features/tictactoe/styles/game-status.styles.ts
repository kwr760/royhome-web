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
    message: {
      color: theme.color.foreground.base,
    },
    italics: {
      color: theme.color.foreground.base,
      fontStyle: 'italic',
    },
    tooltip: {
      color: theme.color.foreground.base,
      backgroundColor: theme.color.background.paper,
    },
  });
};

export { styles };
