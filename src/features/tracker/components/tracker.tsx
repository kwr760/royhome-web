import { Container } from '@mui/material';
import { withStyles, type WithStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { styles } from '../styles/tracker.styles';

type TrackerProps = WithStyles<typeof styles>;
const TrackerContainer: FunctionComponent<TrackerProps> = ({classes}) => {
  return (
    <Container className={classes.container}>
      This is a tracker.
    </Container>
  );
};

export default memo(withStyles(styles)(TrackerContainer));
