import { Box, Button, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayerTurn, getSquare } from '../store/tictactoe.selector';
import { incrementTurn, takeTurn } from '../store/tictactoe.slice';
import { useStyles } from './game-square.styles';
import { GameSquarePropType } from '../type/prop/game-square';

export const GameSquare: FunctionComponent<GameSquarePropType> = ({row, col}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const turn = useSelector(getPlayerTurn);
  const owner = useSelector(getSquare(row, col));
  const piece = owner === 0 ? 'O' : owner === 1 ? 'X' : '';
  const clickAction = () => {
    // console.log("clicked");
    dispatch(takeTurn({ row, col, player: turn }));
    dispatch(incrementTurn());
    // return true;
  };

  return (
    <Box>
      <Button className={classes.square} onClick={clickAction} key={`control-${row}-${col}`} >
        <Typography variant='h1' className={classes.label}>
          {piece}
        </Typography>
      </Button>
    </Box>
  );
};

export default GameSquare;
