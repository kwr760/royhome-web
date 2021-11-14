import React, { FunctionComponent, memo } from 'react';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import spinner from '../assets/loading.svg';
import { styles } from './styles/loading.styles';

type LoadingProps = WithStyles<typeof styles>;
const LoadingComponent: FunctionComponent<LoadingProps> = ({classes}) => {
  return (
    <div className={classes.spinner}>
      <img className={classes.loading} src={spinner} alt="Loading" />
    </div>
  );
};

export default memo(withStyles(styles)(LoadingComponent));
