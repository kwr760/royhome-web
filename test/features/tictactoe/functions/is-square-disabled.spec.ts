import { GameStateEnum, PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { isSquareDisabled } from '../../../../src/features/tictactoe/functions/is-square-disabled';

type TestTuple = {
  gameState: GameStateEnum,
  owner: PlayerEnum,
  expected: boolean,
};

describe('feature/tictactoe/functions/is-game-over', () => {
  // Arrange
  const cases = [
    {
      gameState: GameStateEnum.Completed,
      owner: PlayerEnum.Neither,
      expected: false,
    },
    {
      gameState: GameStateEnum.Completed,
      owner: PlayerEnum.Neither,
      expected: false,
    },
    {
      gameState: GameStateEnum.Wait,
      owner: PlayerEnum.Neither,
      expected: false,
    },
    {
      gameState: GameStateEnum.Setup,
      owner: PlayerEnum.Neither,
      expected: false,
    },
    {
      gameState: GameStateEnum.Active,
      owner: PlayerEnum.Neither,
      expected: false,
    },
    {
      gameState: GameStateEnum.Active,
      owner: PlayerEnum.One,
      expected: true,
    },
    {
      gameState: GameStateEnum.Active,
      owner: PlayerEnum.Two,
      expected: true,
    },
  ];

  cases.forEach(({ gameState, owner, expected }: TestTuple) => {
    it(`should determine if square can be changed by owner - ${gameState} : ${owner} => ${expected}`, () => {
      expect(isSquareDisabled(gameState, owner)).toBe(expected);
    });
  });
});
