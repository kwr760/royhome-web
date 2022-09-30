import { emphasize } from '@mui/material';
import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    darkness: {
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
            backgroundImage: `url('data:image/svg+xml;utf8,${theme.icon.moon}')`,
          },
          '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: emphasize(theme.color.banner.control.background, 0.4),
          },
        },
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: emphasize(theme.color.banner.control.background, 0.2),
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
          backgroundImage: `url('data:image/svg+xml;utf8,${theme.icon.sun}')`,
        },
      },
      '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: emphasize(theme.color.banner.control.background, 0.4),
        borderRadius: 20 / 2,
      },
    },
  });

export { styles };
