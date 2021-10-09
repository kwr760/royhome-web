import { Box, Button, Typography } from '@material-ui/core';
import React, { FunctionComponent, useMemo } from 'react';
import { useTicTacToe } from '../context';
import { takeTurn } from '../context/context.actions';
import { GameState } from '../context/tictactoe.constant';
import { SquareProps, SquareType, StateEnumType } from '../type/tictactoe';
import { useStyles } from './game-square.styles';

const isSquareDisabled = (gameState: StateEnumType, owner: SquareType) => {
  return gameState !== GameState.Active || owner !== null;
};

const getPiece = (owner: SquareType): string => {
  switch (owner) {
    case 0:
      return 'O';
    case 1:
      return 'X';
  }
  return '';
};

export const GameSquare: FunctionComponent<SquareProps> = ({row, col}) => {
  const classes = useStyles();
  const {
    state: {
      game,
      status,
    },
    dispatch,
  } = useTicTacToe();
  const owner = game[row][col];
  const piece = getPiece(owner);
  const disabled = isSquareDisabled(status.state, owner);

  return useMemo(() => {
    const clickAction = () => {
      dispatch(takeTurn({ row, col, player: status.turn }));
    };
    return (
      <Box>
        <Button className={classes.square} onClick={clickAction} disabled={disabled} key={`control-${row}-${col}`}>
          <Typography variant='h1' className={classes.label}>
            {piece}
          </Typography>
        </Button>
      </Box>
    );
  },
  [classes.label, classes.square, col, disabled, dispatch, piece, row, status.turn],
  );
};

export default GameSquare;
