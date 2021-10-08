import { Box, Button, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGameStatus, getSquare } from '../store/tictactoe.selector';
import { takeTurn } from '../store/tictactoe.slice';
import { GameState } from '../store/tictactoe.constant';
import { GameSquarePropType, GameSquareType, GameStateType } from '../type/tictactoe';
import { useStyles } from './game-square.styles';

const isSquareDisabled = (gameState: GameStateType, owner: GameSquareType) => {
  return gameState !== GameState.Active || owner !== null;
};

const getPiece = (owner: GameSquareType): string => {
  switch (owner) {
    case 0:
      return 'O';
    case 1:
      return 'X';
  }
  return '';
};

export const GameSquare: FunctionComponent<GameSquarePropType> = ({row, col}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const gameStatus = useSelector(getGameStatus);
  const owner = useSelector(getSquare(row, col));

  const piece = getPiece(owner);
  const disabled = isSquareDisabled(gameStatus.state, owner);
  const clickAction = () => {
    dispatch(takeTurn({ row, col, player: gameStatus.turn }));
  };

  return (
    <Box>
      <Button className={classes.square} onClick={clickAction} disabled={disabled} key={`control-${row}-${col}`} >
        <Typography variant='h1' className={classes.label}>
          {piece}
        </Typography>
      </Button>
    </Box>
  );
};

export default GameSquare;
