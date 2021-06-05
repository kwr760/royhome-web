import React, { FunctionComponent } from 'react';
import { Container, Grid } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { getUser } from '../../store/user/user.selector';
import { useStyles } from './index.styles';

const Profile: FunctionComponent = () => {
  const classes = useStyles();
  const user = useSelector(getUser);

  return (
    <Container>
      <Grid container className={classes.container}>
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

export default Profile;
