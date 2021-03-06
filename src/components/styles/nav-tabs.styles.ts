import { emphasize } from '@mui/material';
import type { Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    tab: {
      color: theme.palette.secondary.main,
      '&:hover, &:focus&:hover': {
        color: emphasize(theme.palette.secondary.main, 0.4),
        background: emphasize(theme.palette.primary.dark, 0.2),
        borderRadius: '.25em',
      },
      '&.Mui-selected': {
        color: emphasize(theme.palette.secondary.main, 0.6),
      },
    },
    tabs: {
      '& .MuiTabs-indicator': {
        backgroundColor: emphasize(theme.palette.secondary.main, 0.6),
      },
    },
  });

export { styles };
