import { GameStateEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { isGameActive } from '../../../../src/features/tictactoe/functions/is-game-active';

type TestTuple = {
  gameState: GameStateEnum,
  expected: boolean,
};
describe('feature/tictactoe/function/is-game-active', () => {
  // Arrange
  const cases = [
    {
      gameState: GameStateEnum.Win,
      expected: false,
    },
    {
      gameState: GameStateEnum.Tie,
      expected: false,
    },
    {
      gameState: GameStateEnum.Think,
      expected: false,
    },
    {
      gameState: GameStateEnum.Ready,
      expected: false,
    },
    {
      gameState: GameStateEnum.Active,
      expected: true,
    },
  ];

  cases.forEach(({ gameState, expected }: TestTuple) => {
    it(`should determine if game is active - ${gameState} => ${expected}`, () => {
      expect(isGameActive(gameState)).toBe(expected);
    });
  });
});
