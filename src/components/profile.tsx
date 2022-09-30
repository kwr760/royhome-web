import React, { FunctionComponent, memo } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';

import { getUser } from '../store/session/session.selector';
import { styles } from './styles/profile.styles';

type ProfileProps = WithStyles<typeof styles>;
const ProfileComponent: FunctionComponent<ProfileProps> = ({classes}) => {
  const user = useSelector(getUser);

  return (
    <Container className={classes.container}>
      <Grid container className={classes.grid}>
        <Grid item xs={12} sm={4} className={classes.center}>
          <img
            src={user.picture}
            alt="Profile"
            className={classes.picture}
          />
        </Grid>
        <Grid item xs={12} sm={8} >
          <h2 className={classes.header}>{user.name}</h2>
          <p className={classes.email}>{user.email}</p>
        </Grid>
      </Grid>
      <Grid container>
        <pre className={classes.pre}>
          <code className={classes.code}>
            {JSON.stringify(user, null, 2)}
          </code>
        </pre>
      </Grid>
    </Container>
  );
};

export default memo(withStyles(styles)(ProfileComponent));
