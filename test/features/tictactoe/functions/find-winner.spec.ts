import { PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { BoardType } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
import { findWinner } from '../../../../src/features/tictactoe/functions/find-winner';

type TestTuple = {board: BoardType, expected: PlayerEnum};

describe('feature/tictactoe/functions/find-winner', () => {
  // Arrange
  const cases: TestTuple[] = [
    {
      board: 'X--X--X--',
      expected: PlayerEnum.One,
    },
    {
      board: 'OOO------',
      expected: PlayerEnum.Two,
    },
    {
      board: 'X-XX-----',
      expected: PlayerEnum.Neither,
    },
    {
      board: 'O---O---O',
      expected: PlayerEnum.Two,
    },
    {
      board: '--O--O--O',
      expected: PlayerEnum.Two,
    },
    {
      board: 'X--X----X',
      expected: PlayerEnum.Neither,
    },
  ];

  cases.forEach(({ board, expected }: TestTuple) => {
    it(`should find winner - ${board} : ${expected}`, () => {
      expect(findWinner(board)).toEqual(expected);
    });
  });
});
