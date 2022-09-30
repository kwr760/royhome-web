import type { Theme } from '@mui/material';
import { darken, emphasize } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules => {
  return createStyles({
    dialog: {
      '& .MuiDialog-paper': {
        backgroundColor: theme.color.background.paper,
      },
    },
    nameInput: {
      // color: theme.color.foreground.base,
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
    playerTypeGroup: {
      margin: theme.spacing(1),
      width: '-webkit-fill-available',
      justifyContent: 'space-between',
      display: 'flex',
    },
    buttonBar: {
      justifyContent: 'space-between',
    },
    playerType: {
      width: 62,
      height: 34,
      padding: 7,
      margin: theme.spacing(1),
      '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
          transform: 'translateX(22px)',
          '& .MuiSwitch-thumb:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,${theme.icon.user}')`,
          },
          '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: emphasize(theme.color.control.base, 0.6),
          },
        },
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: theme.color.control.base,
        width: theme.spacing(4),
        height: theme.spacing(4),
        '&:before': {
          content: '\'\'',
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url('data:image/svg+xml;utf8,${theme.icon.monitor}')`,
        },
      },
      '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: emphasize(theme.color.control.base, 0.6),
        borderRadius: 20 / 2,
      },
    },
    remote: {
      padding: 8,
      '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: emphasize(theme.color.control.base, 0.6),
        borderRadius: 22 / 2,
        '&:before, &:after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 16,
          height: 16,
        },
        '&:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,${theme.icon.check}')`,
          left: 12,
        },
        '&:after': {
          backgroundImage: `url('data:image/svg+xml;utf8,${theme.icon.minus}')`,
          right: 12,
        },
      },
      '& .Mui-checked+.MuiSwitch-track': {
        opacity: 1,
        backgroundColor: emphasize(theme.color.control.base, 0.6),
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: theme.color.control.base,
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
      },
    },
    icon: {
      color: theme.color.foreground.base,
    },
    button: {
      color: theme.color.foreground.base,
    },
  });
};

export { styles };
