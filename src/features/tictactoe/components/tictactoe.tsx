import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { logger } from '../context/context.middleware';
import { TicTacToeProvider } from '../context/context.provider';
import { styles } from '../styles/tictactoe.styles';
import GameContainer from './game-container';

interface Props {
  sessionId: string;
}
type TicTacToeProps = Props & WithStyles<typeof styles>;
const TicTacToeComponent: FunctionComponent<TicTacToeProps> = ({sessionId }) => {
  const afterware = [logger()];

  return (
    <TicTacToeProvider sessionId={sessionId} afterware={afterware}>
      <GameContainer />
    </TicTacToeProvider>
  );
};

export default memo(withStyles(styles)(TicTacToeComponent));
