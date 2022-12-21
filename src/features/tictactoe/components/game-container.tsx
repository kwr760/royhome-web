import { Container } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { updateGameState } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum } from '../contracts/tictactoe.enum';
import { styles } from '../styles/tictactoe.styles';
import GameBoard from './game-board';
import GameControl from './game-control';
import GameStatus from './game-status';

type TicTacToeProps = WithStyles<typeof styles>;
const GameContainer: FunctionComponent<TicTacToeProps> = ({classes}) => {
  const { state, dispatch } = useTicTacToe();
  const { gameState } = state;
  const displayControl = () => {
    if (gameState === GameStateEnum.Exit) {
      dispatch(updateGameState(GameStateEnum.Setup));
    }
  };

  return (
    <Container className={classes.container} onClick={displayControl}>
      <GameControl />
      <GameStatus />
      <GameBoard />
    </Container>
  );
};

export default memo(withStyles(styles)(GameContainer));
