import { possibleWins } from '../contracts/tictactoe.constant';
import { PlayerEnum } from '../contracts/tictactoe.enum';
import { GameType } from '../contracts/tictactoe.context';

const findWinner = (game: GameType): PlayerEnum => {
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

export { findWinner };
