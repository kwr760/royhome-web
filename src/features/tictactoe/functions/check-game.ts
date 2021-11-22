import { GameStateEnum, PlayerEnum } from '../contracts/tictactoe.enum';
import { GameType } from '../contracts/tictactoe.context';
import { findWinner } from './find-winner';
import { isGameOver } from './is-game-over';

interface CheckGameReturn {
  gameState: GameStateEnum,
  winner?: PlayerEnum,
}
const checkGame = (game: GameType): CheckGameReturn => {
  const winner = findWinner(game);
  if (winner !== PlayerEnum.Neither) {
    return {
      gameState: GameStateEnum.Win,
      winner,
    };
  }

  if (isGameOver(game)) {
    return {
      gameState: GameStateEnum.Tie,
    };
  }

  return {
    gameState: GameStateEnum.Active,
  };
};

export { checkGame };
