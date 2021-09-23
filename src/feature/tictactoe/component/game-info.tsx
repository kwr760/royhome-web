import { Grid, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { getPlayerTurn, getPlayers } from '../store/tictactoe.selector';
import { useStyles } from './game-info.styles';

export const GameInfo: FunctionComponent = () => {
  const classes = useStyles();
  const turn = useSelector(getPlayerTurn);
  const players = useSelector(getPlayers);
  return (
    <Grid justifyContent="space-between" container className={classes.grid}>
      <Grid item>
        <Typography>{players[0]}</Typography>
      </Grid>
      <Grid item>
        <Typography>The current turn is: {turn}</Typography>
      </Grid>
      <Grid item>
        <Typography>{players[1]}</Typography>
      </Grid>
    </Grid>
  );
};

export default GameInfo;
