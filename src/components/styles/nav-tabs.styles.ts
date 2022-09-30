import type { Theme } from '@mui/material';
import { emphasize } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    tab: {
      color: theme.color.banner.control.base,
      '&:hover, &:focus&:hover': {
        color: emphasize(theme.color.banner.control.base, 0.2),
        background: emphasize(theme.color.banner.control.background, 0.2),
        borderRadius: '.25em',
      },
      '&.Mui-selected': {
        color: emphasize(theme.color.banner.control.base, 0.4),
      },
    },
    tabs: {
      '& .MuiTabs-indicator': {
        backgroundColor: emphasize(theme.color.banner.control.base, 0.4),
      },
    },
  });

export { styles };
