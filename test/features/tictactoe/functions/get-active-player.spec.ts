import { PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import {
  initialPlayerOne,
  initialPlayerTwo,
  initialTicTacToeState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { Player, TicTacToeStateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { getActivePlayer } from '../../../../src/features/tictactoe/functions/get-active-player';

type TestTuple = {
  state: TicTacToeStateType,
  expected: Player | undefined,
};
describe('feature/tictactoe/functions/get-active-player', () => {
  // Arrange
  const cases = [
    {
      state: {
        ...initialTicTacToeState,
        turn: PlayerEnum.One,
      },
      expected: initialPlayerOne,
    },
    {
      state: {
        ...initialTicTacToeState,
        turn: PlayerEnum.Two,
      },
      expected: initialPlayerTwo,
    },
    {
      state: {
        ...initialTicTacToeState,
        turn: PlayerEnum.Neither,
      },
      expected: undefined,
    },
  ];

  cases.forEach(({ state, expected }: TestTuple) => {
    it(`should find which player won => ${JSON.stringify(expected)}`, () => {
      expect(getActivePlayer(state)).toEqual(expected);
    });
  });
});
