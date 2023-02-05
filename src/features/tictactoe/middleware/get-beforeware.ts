import { MiddleWareFunction } from '../contracts/tictactoe.context';
import { evaluateGameMiddleware } from './evaluate-game.middleware';
import { startGameMiddleware } from './start-game.middleware';
import { takeTurnMiddleware } from './take-turn.middleware';
import { updateGameStateMiddleware } from './update-game-state.middleware';

const getBeforeware = (): MiddleWareFunction[] => {
  return [
    startGameMiddleware,
    updateGameStateMiddleware,
    takeTurnMiddleware,
    evaluateGameMiddleware,
  ];
};

export { getBeforeware };
