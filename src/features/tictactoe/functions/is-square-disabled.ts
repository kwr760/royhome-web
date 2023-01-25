import { GameStateEnum, PieceEnum } from '../contracts/tictactoe.enum';

const isSquareDisabled = (gameState: GameStateEnum, owner: PieceEnum): boolean => {
  return gameState === GameStateEnum.Active && owner !== PieceEnum.Neither;
};

export { isSquareDisabled };
