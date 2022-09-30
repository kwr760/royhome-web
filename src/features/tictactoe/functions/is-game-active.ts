import { GameStateEnum } from '../contracts/tictactoe.enum';

const isGameActive = (gameState: GameStateEnum): boolean => {
  return gameState === GameStateEnum.Active;
};

export { isGameActive };
