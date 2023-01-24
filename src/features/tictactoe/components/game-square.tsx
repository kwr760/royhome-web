import { Box, Button, Typography } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { takeTurn } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { PieceEnum } from '../contracts/tictactoe.enum';
import { getCurrentTurn } from '../functions/get-current-turn';
import { isSquareDisabled } from '../functions/is-square-disabled';
import { styles } from '../styles/game-square.styles';

interface Props {
  position: number;
}
type GameSquareProps = Props & WithStyles<typeof styles>;
export const GameSquareComponent: FunctionComponent<GameSquareProps> = ({position, classes}) => {
  const { state, dispatch } = useTicTacToe();
  const {
    board,
    gameState,
  } = state;
  const owner: PieceEnum = board[position] as PieceEnum;
  const disabled = isSquareDisabled(gameState, owner);
  const piece = (owner === PieceEnum.Neither) ? '' : owner;
  const clickAction = () => {
    const turn = getCurrentTurn(board);
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
