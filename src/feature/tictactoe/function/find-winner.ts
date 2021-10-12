import { PlayerEnum, possibleWins } from '../constant/tictactoe.constant';
import { GameType } from '../type/tictactoe';

export const findWinner = (game: GameType): PlayerEnum => {
  for (const possibleWin of possibleWins) {
    const checkSquares = possibleWin.map(index => game[index]);
    for (const player of [PlayerEnum.One, PlayerEnum.Two]) {
      if (checkSquares.every(v => v === player)) {
        return player;
      }
    }
  }

  return PlayerEnum.None;
};
