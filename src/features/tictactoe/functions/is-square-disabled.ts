import { GameStateEnum, PlayerEnum } from '../contracts/tictactoe.enum';

const isSquareDisabled = (gameState: GameStateEnum, owner: PlayerEnum): boolean => {
  if (gameState !== GameStateEnum.Active) {
    return false;
  }
  return owner !== PlayerEnum.Neither;
};

export { isSquareDisabled };
