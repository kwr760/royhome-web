import { GameStateEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { isGameActive } from '../../../../src/features/tictactoe/functions/is-game-active';

type TestTuple = {
  gameState: GameStateEnum,
  expected: boolean,
};
describe('feature/tictactoe/functions/is-game-active', () => {
  // Arrange
  const cases = [
    {
      gameState: GameStateEnum.Completed,
      expected: false,
    },
    {
      gameState: GameStateEnum.Wait,
      expected: false,
    },
    {
      gameState: GameStateEnum.Setup,
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
