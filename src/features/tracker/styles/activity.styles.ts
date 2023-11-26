import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

const styles = (): StyleRules => createStyles({
  noMarginVertical: {
    marginTop: 0,
    marginBottom: 0,
  },
  platform: {
    width: '30%',
  },
  activity: {
    width: '30%',
  },
  progress: {
    width: '30%',
  },
  edit: {
    width: '10%',
  },
  row: {
    display: 'flex',
    width: '100%',
  },
  editIcon: {
    marginLeft: '.5rem',
  },
});

export { styles };
