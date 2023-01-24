import {
  initialPlayerOne,
  initialPlayerTwo,
  initialState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { Player, StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { getWinner } from '../../../../src/features/tictactoe/functions/get-winner';

type TestTuple = {
  state: StateType,
  expected: Player | undefined,
};
describe('feature/tictactoe/functions/get-winner', () => {
  // Arrange
  const cases = [
    {
      state: {
        ...initialState,
        board: 'XXX------',
        playerOne: {
          ...initialPlayerOne,
        },
      },
      expected: {
        ...initialPlayerOne,
      },
    },
    {
      state: {
        ...initialState,
        board: 'XX-OOO---',
        playerTwo: {
          ...initialPlayerTwo,
        },
      },
      expected: {
        ...initialPlayerTwo,
      },
    },
    {
      state: { ...initialState },
      expected: undefined,
    },
  ];

  cases.forEach(({ state, expected }: TestTuple) => {
    it(`should find which player won => ${JSON.stringify(expected)}`, () => {
      expect(getWinner(state)).toEqual(expected);
    });
  });
});
