import { PlayerEnum, StatusEnum } from '../contracts/tictactoe.enum';
import { GameType } from '../contracts/tictactoe.context';
import { findWinner } from './find-winner';
import { isGameOver } from './is-game-over';

interface CheckGameReturn {
  status: StatusEnum,
  winner?: PlayerEnum,
}
const checkGame = (game: GameType): CheckGameReturn => {
  const winner = findWinner(game);
  if (winner !== PlayerEnum.None) {
    return {
      status: StatusEnum.Win,
      winner,
    };
  }

  if (isGameOver(game)) {
    return {
      status: StatusEnum.Tie,
    };
  }

  return {
    status: StatusEnum.Active,
  };
};

export { checkGame };
