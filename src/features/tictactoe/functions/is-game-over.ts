import { PieceEnum } from '../contracts/tictactoe.enum';
import { BoardType } from '../contracts/tictactoe.context';

const isGameOver = (board: BoardType): boolean => {
  const squares = board.split('');
  return squares.filter(v => v === PieceEnum.Neither).length === 0;
};

export { isGameOver };
