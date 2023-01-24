import { PieceEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { BoardType } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
import { findWinner } from '../../../../src/features/tictactoe/functions/find-winner';

type TestTuple = {board: BoardType, expected: PieceEnum};

describe('feature/tictactoe/functions/find-winner', () => {
  // Arrange
  const cases: TestTuple[] = [
    {
      board: 'X--X--X--',
      expected: PieceEnum.X,
    },
    {
      board: 'OOO------',
      expected: PieceEnum.O,
    },
    {
      board: 'X-XX-----',
      expected: PieceEnum.Neither,
    },
    {
      board: 'O---O---O',
      expected: PieceEnum.O,
    },
    {
      board: '--O--O--O',
      expected: PieceEnum.O,
    },
    {
      board: 'X--X----X',
      expected: PieceEnum.Neither,
    },
  ];

  cases.forEach(({ board, expected }: TestTuple) => {
    it(`should find winner - ${board} : ${expected}`, () => {
      expect(findWinner(board)).toEqual(expected);
    });
  });
});
