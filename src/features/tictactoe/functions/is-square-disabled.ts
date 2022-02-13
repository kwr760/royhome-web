import { GameStateEnum, PlayerEnum } from '../contracts/tictactoe.enum';

const isSquareDisabled = (gameState: GameStateEnum, owner: PlayerEnum): boolean => {
  return gameState === GameStateEnum.Active && owner !== PlayerEnum.Neither;
};

export { isSquareDisabled };
