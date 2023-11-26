import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (): StyleRules => createStyles({
  icon: {
    marginLeft: '.5rem',
  },
  groupHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'stretch',
    padding: 0,
    border: '1px solid',
    borderRadius: '5px',
  },
  first: {
    flexGrow: 0,
  },
  last: {
    flexGrow: 0,
  },
  list: {
    padding: 0,
  },
});

export { styles };
