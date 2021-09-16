import { Container } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { useStyles } from './index.styles';
import GameBoard from './game-board';

const TicTacToe: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <GameBoard />
    </Container>
  );
};

export default TicTacToe;
