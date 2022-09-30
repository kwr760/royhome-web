import type { Theme } from '@mui/material';
import { emphasize } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    iconButton: {
      color: theme.color.banner.control.base,
      borderRadius: '.25em',
      margin: theme.spacing(.5),
      padding: theme.spacing(.5),
      '&:hover, &:focus&:hover': {
        color: emphasize(theme.color.banner.control.base, 0.2),
        background: emphasize(theme.color.banner.control.background, 0.2),
      },
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  });

export { styles };
