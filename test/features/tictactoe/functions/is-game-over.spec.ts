import { BoardType } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
import { isGameOver } from '../../../../src/features/tictactoe/functions/is-game-over';

type TestTuple = {
  board: BoardType,
  expected: boolean,
};

describe('feature/tictactoe/functions/is-game-over', () => {
  // Arrange
  const cases = [
    {
      board: '---------',
      expected: false,
    },
    {
      board: '-XOXOXXOX',
      expected: false,
    },
    {
      board: 'XXXXXXXXX',
      expected: true,
    },
  ];

  cases.forEach(({ board, expected }: TestTuple) => {
    it(`should determine if game is over - ${board} : ${expected}`, () => {
      expect(isGameOver(board)).toBe(expected);
    });
  });
});
