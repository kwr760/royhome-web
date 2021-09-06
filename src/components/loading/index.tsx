import React, { FunctionComponent } from 'react';
import spinner from '../../assets/loading.svg';
import { useStyles } from './index.styles';

const Loading: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.spinner}>
      <img className={classes.loading} src={spinner} alt="Loading" />
    </div>
  );
};

export default Loading;
