import { isGameOver } from '../../../../src/feature/tictactoe/function/is-game-over';

type TestTuple = {
  game: string,
  expected: boolean,
};

describe('feature/tictactoe/function/is-game-over', () => {
  // Arrange
  const cases = [
    {
      game: '---------',
      expected: false,
    },
    {
      game: '-XOXOXXOX',
      expected: false,
    },
    {
      game: 'XXXXXXXXX',
      expected: true,
    },
  ];

  cases.forEach(({ game, expected }: TestTuple) => {
    it(`should determine if game is over - ${game} : ${expected}`, () => {
      expect(isGameOver(game)).toBe(expected);
    });
  });
});
