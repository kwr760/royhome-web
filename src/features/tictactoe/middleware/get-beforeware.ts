import { MiddleWareFunction } from '../contracts/tictactoe.context';
import { evaluateGameMiddleware } from './evaluate-game.middleware';
import { startGameMiddleware } from './start-game.middleware';
import { takeTurnMiddleware } from './take-turn.middleware';

const getBeforeware = (): MiddleWareFunction[] => {
  return [
    startGameMiddleware,
    takeTurnMiddleware,
    evaluateGameMiddleware,
  ];
};

export { getBeforeware };
