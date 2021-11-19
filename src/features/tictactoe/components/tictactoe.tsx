import React, { FunctionComponent, memo } from 'react';
import { Container } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';

import { TicTacToeProvider } from '../context/context.reducer';
import { styles } from '../styles/tictactoe.styles';
import GameHeader from './game-header';
import GameFooter from './game-footer';
import GameBoard from './game-board';

type TicTacToeProps = WithStyles<typeof styles>;
const TicTacToeComponent: FunctionComponent<TicTacToeProps> = ({classes}) => {
  return (
    <TicTacToeProvider>
      <Container className={classes.container}>
        <GameHeader />
        <GameBoard />
        <GameFooter />
      </Container>
    </TicTacToeProvider>
  );
};

export default memo(withStyles(styles)(TicTacToeComponent));
