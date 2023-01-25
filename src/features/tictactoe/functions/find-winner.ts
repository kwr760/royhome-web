import { wins } from '../contracts/tictactoe.constant';
import { PieceEnum } from '../contracts/tictactoe.enum';
import { BoardType } from '../contracts/tictactoe.context';

const findWinner = (board: BoardType): PieceEnum => {
  for (const possibleWin of wins) {
    const checkSquares = possibleWin.map(index => board[index]);
    for (const player of [PieceEnum.X, PieceEnum.O]) {
      if (checkSquares.every(v => v === player)) {
        return player;
      }
    }
  }

  return PieceEnum.Neither;
};

export { findWinner };
