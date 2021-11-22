import { PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { GameType } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
import { findWinner } from '../../../../src/features/tictactoe/functions/find-winner';

type TestTuple = {game: GameType, expected: PlayerEnum};

describe('feature/tictactoe/function/find-winner', () => {
  // Arrange
  const cases: TestTuple[] = [
    {
      game: 'X--X--X--',
      expected: PlayerEnum.One,
    },
    {
      game: 'OOO------',
      expected: PlayerEnum.Two,
    },
    {
      game: 'X-XX-----',
      expected: PlayerEnum.Neither,
    },
    {
      game: 'O---O---O',
      expected: PlayerEnum.Two,
    },
    {
      game: '--O--O--O',
      expected: PlayerEnum.Two,
    },
    {
      game: 'X--X----X',
      expected: PlayerEnum.Neither,
    },
  ];

  cases.forEach(({ game, expected }: TestTuple) => {
    it(`should find winner - ${game} : ${expected}`, () => {
      expect(findWinner(game)).toEqual(expected);
    });
  });
});
