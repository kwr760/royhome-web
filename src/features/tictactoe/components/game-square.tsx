import React, { FunctionComponent, memo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';

import { useTicTacToe } from '../context/context';
import { takeTurn } from '../context/context.actions';
import { PlayerEnum, StatusEnum } from '../contracts/tictactoe.enum';
import { styles } from '../styles/game-square.styles';

const isSquareDisabled = (status: StatusEnum, owner: PlayerEnum) => {
  return status !== StatusEnum.Active || owner !== PlayerEnum.None;
};

interface Props {
  position: number;
}
type GameSquareProps = Props & WithStyles<typeof styles>;
export const GameSquareComponent: FunctionComponent<GameSquareProps> = ({position, classes}) => {
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
};

export default memo(withStyles(styles)(GameSquareComponent));
