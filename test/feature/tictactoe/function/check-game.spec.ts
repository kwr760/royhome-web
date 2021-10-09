import { checkGame } from '../../../../src/feature/tictactoe/function/check-game';
import { GameState } from '../../../../src/feature/tictactoe/context/tictactoe.constant';
import { CheckGameReturn, GameType } from '../../../../src/feature/tictactoe/type/tictactoe';

type TestTuple = {game: GameType, expected: CheckGameReturn};

describe('feature/tictactoe/component/check-game', () => {
  describe('should determine a column win', () => {
    // Arrange
    const cases: TestTuple[] = [
      {
        game: [[1, null, null], [1, null, null], [1, null, null]],
        expected: { state: GameState.Win, winner: 1 },
      },
      {
        game: [[null, 0, null], [1, 0, 1], [null, 0, null]],
        expected: { state: GameState.Win, winner: 0 },
      },
      {
        game: [[null, null, 1], [null, null, 1], [0, 0, 1]],
        expected: { state: GameState.Win, winner: 1 },
      },
      {
        game: [[null, null, null], [null, 0, null], [null, null, 1]],
        expected: { state: GameState.Active },
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
        expected: { state: GameState.Win, winner: 1 },
      },
      {
        game: [[null, null, null], [0, 0, 0], [null, 0, null]],
        expected: { state: GameState.Win, winner: 0 },
      },
      {
        game: [[null, null, 1], [null, null, 1], [1, 1, 1]],
        expected: { state: GameState.Win, winner: 1 },
      },
      {
        game: [[null, null, null], [null, null, null], [null, null, null]],
        expected: { state: GameState.Active },
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
        game: [[1, null, null], [null, 1, null], [null, null, 1]],
        expected: { state: GameState.Win, winner: 1 },
      },
      {
        game: [[null, null, 0], [null, 0, null], [0, null, null]],
        expected: { state: GameState.Win, winner: 0 },
      },
      {
        game: [[0, null, null], [1, null, null], [null, null, null]],
        expected: { state: GameState.Active },
      },
      {
        game: [[null, null, null], [null, null, null], [null, null, null]],
        expected: { state: GameState.Active },
      },
    ];

    cases.forEach(({ game, expected }: TestTuple) => {
      it(`should check game - ${JSON.stringify(game)} : ${expected}`, () => {
        expect(checkGame(game)).toEqual(expected);
      });
    });
  });

  it('should determine a tie', () => {
    // Arrange
    const game: GameType = [
      [0, 1, 1],
      [1, 0, 0],
      [0, 0, 1],
    ];

    // Act
    const winner = checkGame(game);

    // Assert
    expect(winner).toEqual({ state: GameState.Tie });
  });
  it('should determine that we are not done', () => {
    // Arrange
    const game: GameType = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];

    // Act
    const winner = checkGame(game);

    // Assert
    expect(winner).toEqual({ state: GameState.Active });
  });
});
