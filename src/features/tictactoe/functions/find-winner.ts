import { wins } from '../contracts/tictactoe.constant';
import { PlayerEnum } from '../contracts/tictactoe.enum';
import { BoardType } from '../contracts/tictactoe.context';

const findWinner = (board: BoardType): PlayerEnum => {
  for (const possibleWin of wins) {
    const checkSquares = possibleWin.map(index => board[index]);
    for (const player of [PlayerEnum.One, PlayerEnum.Two]) {
      if (checkSquares.every(v => v === player)) {
        return player;
      }
    }
  }

  return PlayerEnum.Neither;
};

export { findWinner };
