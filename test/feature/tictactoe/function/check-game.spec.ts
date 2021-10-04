import { checkGame } from '../../../../src/feature/tictactoe/function/check-game';
import { GameType, PlayerIndex } from '../../../../src/feature/tictactoe/type/state/tictactoe';

type TestTuple = {game: GameType, expected: PlayerIndex};

describe('feature/tictactoe/component/check-game', () => {
  describe('should determine a column win', () => {
    // Arrange
    const cases: TestTuple[] = [
      {
        game: [[1, null, null], [1, null, null], [1, null, null]],
        expected: 1,
      },
      {
        game: [[null, 0, null], [1, 0, 1], [null, 0, null]],
        expected: 0,
      },
      {
        game: [[null, null, 1], [null, null, 1], [0, 0, 1]],
        expected: 1,
      },
      {
        game: [[null, null, null], [null, 0, null], [null, null, 1]],
        expected: null,
      },
    ];

    cases.forEach(({ game, expected }: TestTuple) => {
      it(`should check game - ${JSON.stringify(game)} : ${expected}`, () => {
        expect(checkGame(game)).toEqual(expected);
      });
    });
  });
  describe('should determine a row win', () => {
    // Arrange
    const cases: TestTuple[] = [
      {
        game: [[1, 1, 1], [null, null, null], [null, null, null]],
        expected: 1,
      },
      {
        game: [[null, -1, -1], [0, 0, 0], [-1, 0, -1]],
        expected: 0,
      },
      {
        game: [[-1, -1, 1], [-1, -1, 1], [1, 1, 1]],
        expected: 1,
      },
      {
        game: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]],
        expected: -1,
      },
    ];

    cases.forEach(({ game, expected }: TestTuple) => {
      it(`should check game - ${JSON.stringify(game)} : ${expected}`, () => {
        expect(checkGame(game)).toEqual(expected);
      });
    });
  });
  describe('should determine a diagonal win', () => {
    // Arrange
    const cases: TestTuple[] = [
      {
        game: [[1, -1, -1], [-1, 1, - 1], [-1, -1, 1]],
        expected: 1,
      },
      {
        game: [[-1, -1, 0], [-1, 0, -1], [0, -1, -1]],
        expected: 0,
      },
      {
        game: [[0, -1, -1], [1, -1, -1], [-1, -1, -1]],
        expected: -1,
      },
      {
        game: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]],
        expected: -1,
      },
    ];

    cases.forEach(({ game, expected }: TestTuple) => {
      it(`should check game - ${JSON.stringify(game)} : ${expected}`, () => {
        expect(checkGame(game)).toEqual(expected);
      });
    });
  });

  it('should determine a win', () => {
    // Arrange
    const game: GameType = [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1],
    ];

    // Act
    const winner = checkGame(game);

    // Assert
    expect(winner).toBe(-1);
  });
});
