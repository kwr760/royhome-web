import { PlayerEnum } from '../../../../src/features/tictactoe/constants/tictactoe.constant';
import { findWinner } from '../../../../src/features/tictactoe/functions/find-winner';
import { GameType } from '../../../../src/features/tictactoe/types/tictactoe';

type TestTuple = {game: GameType, expected: PlayerEnum};

describe('feature/tictactoe/function/find-winner', () => {
  // Arrange
  const cases: TestTuple[] = [
    {
      game: 'X--X--X--',
      expected: PlayerEnum.Two,
    },
    {
      game: 'OOO------',
      expected: PlayerEnum.One,
    },
    {
      game: 'X-XX-----',
      expected: PlayerEnum.None,
    },
    {
      game: 'O---O---O',
      expected: PlayerEnum.One,
    },
    {
      game: '--O--O--O',
      expected: PlayerEnum.One,
    },
    {
      game: 'X--X----X',
      expected: PlayerEnum.None,
    },
  ];

  cases.forEach(({ game, expected }: TestTuple) => {
    it(`should find winner - ${game} : ${expected}`, () => {
      expect(findWinner(game)).toEqual(expected);
    });
  });
});
