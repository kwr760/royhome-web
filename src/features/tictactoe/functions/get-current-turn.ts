import { PieceEnum } from '../contracts/tictactoe.enum';

const getCurrentTurn = (board: string): PieceEnum => {
  const xCount = (board.match(/X/g)||[]).length;
  const oCount = (board.match(/O/g)||[]).length;
  return ((xCount - oCount) > 0) ? PieceEnum.O : PieceEnum.X;
};

export { getCurrentTurn };
