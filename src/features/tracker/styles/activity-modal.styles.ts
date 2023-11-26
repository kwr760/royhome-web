import { darken } from '@mui/material';
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
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      display: 'grid',
    },
    actions: {
      justifyContent: 'space-between',
    },
    button: {
      color: theme.color.foreground.base,
    },
    title: {
      color: theme.color.foreground.base,
    },
    checkbox: {
      color: theme.color.foreground.base,
      '& .Mui-checked': {
        color: darken(theme.color.foreground.base, .2),
      },
    },
    input: {
      margin: theme.spacing(1),
      width: '-webkit-fill-available',
      '& .MuiInputLabel-root': {
        color: darken(theme.color.foreground.base, .2),
      },
      '& .MuiFilledInput-root': {
        color: darken(theme.color.foreground.base, .2),
      },
      '& .MuiFilledInput-underline:after': {
        borderBottomColor:  darken(theme.color.foreground.base, .2),
      },
      '& .MuiFilledInput-underline:before': {
        borderBottomColor:  darken(theme.color.foreground.base, 0),
      },
      '&:hover .MuiFilledInput-underline:before': {
        borderBottomColor:  darken(theme.color.foreground.base, 0),
      },
    },
  });
};

export { styles };
