import { GameStateEnum, PieceEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { isSquareDisabled } from '../../../../src/features/tictactoe/functions/is-square-disabled';

type TestTuple = {
  gameState: GameStateEnum,
  owner: PieceEnum,
  expected: boolean,
};

describe('feature/tictactoe/functions/is-game-over', () => {
  // Arrange
  const cases = [
    {
      gameState: GameStateEnum.Completed,
      owner: PieceEnum.Neither,
      expected: false,
    },
    {
      gameState: GameStateEnum.Completed,
      owner: PieceEnum.Neither,
      expected: false,
    },
    {
      gameState: GameStateEnum.Wait,
      owner: PieceEnum.Neither,
      expected: false,
    },
    {
      gameState: GameStateEnum.Setup,
      owner: PieceEnum.Neither,
      expected: false,
    },
    {
      gameState: GameStateEnum.Active,
      owner: PieceEnum.Neither,
      expected: false,
    },
    {
      gameState: GameStateEnum.Active,
      owner: PieceEnum.X,
      expected: true,
    },
    {
      gameState: GameStateEnum.Active,
      owner: PieceEnum.O,
      expected: true,
    },
  ];

  cases.forEach(({ gameState, owner, expected }: TestTuple) => {
    it(`should determine if square can be changed by owner - ${gameState} : ${owner} => ${expected}`, () => {
      expect(isSquareDisabled(gameState, owner)).toBe(expected);
    });
  });
});
