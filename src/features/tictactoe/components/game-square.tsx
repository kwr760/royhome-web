import { Box, Button, Typography } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';

import { takeTurn } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum, PlayerEnum, TurnEnum } from '../contracts/tictactoe.enum';
import { styles } from '../styles/game-square.styles';

const isSquareDisabled = (gameState: GameStateEnum, owner: PlayerEnum) => {
  return gameState !== GameStateEnum.Active || owner !== PlayerEnum.None;
};

interface Props {
  position: number;
}
type GameSquareProps = Props & WithStyles<typeof styles>;
export const GameSquareComponent: FunctionComponent<GameSquareProps> = ({position, classes}) => {
  const {
    state: {
      board,
      gameState,
      turn,
    },
    dispatch,
  } = useTicTacToe();
  const owner: PlayerEnum = board[position] as PlayerEnum;
  const disabled = isSquareDisabled(gameState, owner);
  const piece = (owner === PlayerEnum.None) ? '' : owner;
  const clickAction = () => {
    dispatch(takeTurn({ position, player: turn === TurnEnum.One ? PlayerEnum.One : PlayerEnum.Two }));
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
