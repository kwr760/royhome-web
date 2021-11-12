import { createStyles } from '@mui/styles';
import type { StyleRules } from '@mui/styles/withStyles';

export const styles = (): StyleRules =>
  createStyles({
    container: {
      flexGrow: 1,
      paddingTop: '5%',
      paddingLeft: '15%',
      paddingRight: '15%',
    },
  });
