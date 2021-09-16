import { Paper } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { useStyles } from './game-square.styles';
import { GameSquarePropType } from './game-square.types';

const GameSquare: FunctionComponent<GameSquarePropType> = ({row, column}) => {
  console.log(row, column);
  const classes = useStyles();
  return (
    <Paper className={classes.paper} />
  );
};

export default GameSquare;
