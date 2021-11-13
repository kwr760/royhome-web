import { PlayerEnum, StatusEnum } from '../constants/tictactoe.constant';
import { CheckGameReturn, GameType } from '../types/tictactoe';
import { findWinner } from './find-winner';
import { isGameOver } from './is-game-over';

export const checkGame = (game: GameType): CheckGameReturn => {
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