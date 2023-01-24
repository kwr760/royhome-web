import type { Theme } from '@mui/material';
import { emphasize } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules => {
  return createStyles({
    tooltip: {
      color: theme.color.foreground.base,
      backgroundColor: theme.color.background.paper,
    },
    remote: {
      marginTop: theme.spacing(4),
      marginRight: theme.spacing(1),
      display: 'flex',
      justifyContent: 'right',
    },
    switch: {
      padding: theme.spacing(1),
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
      marginTop: theme.spacing(1),
    },
  });
};

export { styles };
