import React, { FunctionComponent, memo } from 'react';
import { Container } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import { logger } from '../context/context.middleware';
import { TicTacToeProvider } from '../context/context.provider';
import { styles } from '../styles/tictactoe.styles';
import GameBoard from './game-board';

interface Props {
  sessionId: string;
}
type TicTacToeProps = Props & WithStyles<typeof styles>;
const TicTacToeComponent: FunctionComponent<TicTacToeProps> = ({sessionId, classes}) => {
  const afterware = [logger()];
  return (
    <TicTacToeProvider sessionId={sessionId} afterware={afterware}>
      <Container className={classes.container}>
        <GameBoard />
      </Container>
    </TicTacToeProvider>
  );
};

export default memo(withStyles(styles)(TicTacToeComponent));
