import React, { FunctionComponent, memo } from 'react';
import { Container } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import { TicTacToeProvider } from '../context/context.provider';
import { styles } from '../styles/tictactoe.styles';
import GameHeader from './game-header';
import GameBoard from './game-board';

interface Props {
  sessionId: string;
}
type TicTacToeProps = Props & WithStyles<typeof styles>;
const TicTacToeComponent: FunctionComponent<TicTacToeProps> = ({sessionId, classes}) => {
  return (
    <TicTacToeProvider sessionId={sessionId}>
      <Container className={classes.container}>
        <GameHeader />
        <GameBoard />
      </Container>
    </TicTacToeProvider>
  );
};

export default memo(withStyles(styles)(TicTacToeComponent));
