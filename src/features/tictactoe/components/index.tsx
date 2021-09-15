import { Container, Grid, Paper } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { useStyles } from './index.styles';

const TicTacToe: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid container className={classes.grid}>
        <Grid container item className={classes.row} xs={12}>
          <Grid item className={classes.item} xs={4}>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item className={classes.item} xs={4}>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item className={classes.item} xs={4}>
            <Paper className={classes.paper}></Paper>
          </Grid>
        </Grid>
        <Grid container item className={classes.row} xs={12}>
          <Grid item className={classes.item} xs={4}>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item className={classes.item} xs={4}>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item className={classes.item} xs={4}>
            <Paper className={classes.paper}></Paper>
          </Grid>
        </Grid>
        <Grid container item className={classes.row} xs={12}>
          <Grid item className={classes.item} xs={4}>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item className={classes.item} xs={4}>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item className={classes.item} xs={4}>
            <Paper className={classes.paper}></Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TicTacToe;
