import { PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import {
  initialPlayerOne,
  initialPlayerTwo,
  initialState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { Player, StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { getActivePlayer } from '../../../../src/features/tictactoe/functions/get-active-player';

type TestTuple = {
  state: StateType,
  expected: Player | undefined,
};
describe('feature/tictactoe/functions/get-active-player', () => {
  // Arrange
  const cases = [
    {
      state: {
        ...initialState,
        turn: PlayerEnum.One,
      },
      expected: initialPlayerOne,
    },
    {
      state: {
        ...initialState,
        turn: PlayerEnum.Two,
      },
      expected: initialPlayerTwo,
    },
    {
      state: {
        ...initialState,
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
