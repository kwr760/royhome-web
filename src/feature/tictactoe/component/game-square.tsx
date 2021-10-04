import { Box, Button, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayerTurn, getSquare, getWinner } from '../store/tictactoe.selector';
import { takeTurn } from '../store/tictactoe.slice';
import { PlayerIndex } from '../type/state/tictactoe';
import { useStyles } from './game-square.styles';
import { GameSquarePropType } from '../type/prop/game-square';

const isSquareDisabled = (winner: PlayerIndex, owner: PlayerIndex) => {
  return winner !== null || owner !== null;
};

const getPiece = (owner: PlayerIndex): string => {
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
  const turn = useSelector(getPlayerTurn);
  const owner = useSelector(getSquare(row, col));
  const winner = useSelector(getWinner);
  const piece = getPiece(owner);
  const disabled = isSquareDisabled(winner, owner);
  const clickAction = () => {
    dispatch(takeTurn({ row, col, player: turn }));
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
