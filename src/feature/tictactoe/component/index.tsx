import { Container } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { TicTacToeProvider } from '../context';
import { GameHeader } from './game-header';
import { GameFooter } from './game-footer';
import { useStyles } from './index.styles';
import { GameBoard } from './game-board';

const TicTacToe: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <TicTacToeProvider>
      <Container className={classes.container}>
        <GameHeader />
        <GameBoard />
        <GameFooter />
      </Container>
    </TicTacToeProvider>
  );
};

export default TicTacToe;
