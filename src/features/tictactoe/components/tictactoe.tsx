import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { Auth0User } from '../../../contracts/auth0.models';
import { TicTacToeProvider } from '../context/context.provider';
import { MiddleWareFunction } from '../contracts/tictactoe.context';
import { evaluateGameMiddleware } from '../middleware/evaluate-game.middleware';
import { logger } from '../middleware/logger.middleware';
import { startGameMiddleware } from '../middleware/start-game.middleware';
import { takeTurnMiddleware } from '../middleware/take-turn.middleware';
import { styles } from '../styles/tictactoe.styles';
import GameContainer from './game-container';

interface Props {
  sessionId: string;
  user: Auth0User;
}
type TicTacToeProps = Props & WithStyles<typeof styles>;
const TicTacToeComponent: FunctionComponent<TicTacToeProps> = ({sessionId, user }) => {
  const beforeware: MiddleWareFunction[] = [
    startGameMiddleware,
    takeTurnMiddleware,
    evaluateGameMiddleware,
  ];
  const afterware: MiddleWareFunction[] = [logger()];

  return (
    <TicTacToeProvider sessionId={sessionId} user={user} beforeware={beforeware} afterware={afterware}>
      <GameContainer />
    </TicTacToeProvider>
  );
};

export default memo(withStyles(styles)(TicTacToeComponent));
