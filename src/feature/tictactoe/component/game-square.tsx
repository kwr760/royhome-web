import { Box, Button, Typography } from '@material-ui/core';
import React, { FunctionComponent, useMemo } from 'react';
import { PlayerEnum, StatusEnum } from '../constant/tictactoe.constant';
import { useTicTacToe } from '../context';
import { takeTurn } from '../context/context.actions';
import { useStyles } from '../style/game-square.styles';
import { SquareProps } from '../type/tictactoe';

const isSquareDisabled = (status: StatusEnum, owner: PlayerEnum) => {
  return status !== StatusEnum.Active || owner !== PlayerEnum.None;
};

export const GameSquare: FunctionComponent<SquareProps> = ({position}) => {
  const classes = useStyles();
  const {
    state: {
      game,
      status,
      turn,
    },
    dispatch,
  } = useTicTacToe();
  const owner: PlayerEnum = game[position] as PlayerEnum;
  const disabled = isSquareDisabled(status, owner);
  const piece = (owner === PlayerEnum.None) ? '' : owner;

  return useMemo(() => {
    const clickAction = () => {
      dispatch(takeTurn({ position, player: turn }));
    };
    return (
      <Box>
        <Button className={classes.square} onClick={clickAction} disabled={disabled} key={`control-${position}`}>
          <Typography variant='h1' className={classes.label}>
            {piece}
          </Typography>
        </Button>
      </Box>
    );
  },
  [classes.label, classes.square, disabled, dispatch, owner, position, turn],
  );
};

export default GameSquare;
