import type { Theme } from '@mui/material';
import { darken, emphasize } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules => {
  return createStyles({
    nameInput: {
      margin: theme.spacing(1),
      width: '-webkit-fill-available',
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: darken(theme.color.foreground.base, .2),
          color: darken(theme.color.foreground.base, .2),
        },
        '&:hover fieldset': {
          borderColor: emphasize(theme.color.foreground.base, 0),
        },
        '&.Mui-focused fieldset': {
          borderColor: emphasize(theme.color.foreground.base, .2),
        },
      },
      '& .MuiInputLabel-root': {
        color: darken(theme.color.foreground.base, .2),
      },
      '& .MuiOutlinedInput-input': {
        color: theme.color.foreground.base,
      },
    },
  });
};

export { styles };
