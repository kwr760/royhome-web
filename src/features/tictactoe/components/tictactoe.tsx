import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { Auth0User } from '../../../contracts/auth0.models';
import { logger } from '../context/context.middleware';
import { TicTacToeProvider } from '../context/context.provider';
import { styles } from '../styles/tictactoe.styles';
import GameContainer from './game-container';

interface Props {
  sessionId: string;
  user: Auth0User;
}
type TicTacToeProps = Props & WithStyles<typeof styles>;
const TicTacToeComponent: FunctionComponent<TicTacToeProps> = ({sessionId, user }) => {
  const afterware = [logger()];

  return (
    <TicTacToeProvider sessionId={sessionId} user={user} afterware={afterware}>
      <GameContainer />
    </TicTacToeProvider>
  );
};

export default memo(withStyles(styles)(TicTacToeComponent));
