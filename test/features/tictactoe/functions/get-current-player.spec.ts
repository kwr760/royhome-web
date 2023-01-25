import {
  initialPlayerOne,
  initialPlayerTwo,
  initialState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { Player, StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { getCurrentPlayer } from '../../../../src/features/tictactoe/functions/get-current-player';

type TestTuple = {
  state: StateType,
  expected: Player | undefined,
};
describe('feature/tictactoe/functions/get-current-player', () => {
  // Arrange
  const cases = [
    {
      state: {
        ...initialState,
      },
      expected: initialPlayerOne,
    },
    {
      state: {
        ...initialState,
        board: 'X--------',
      },
      expected: initialPlayerTwo,
    },
  ];

  cases.forEach(({ state, expected }: TestTuple) => {
    it(`should find which player won => ${JSON.stringify(expected)}`, () => {
      const { board, playerOne, playerTwo } = state;
      expect(getCurrentPlayer(board, playerOne, playerTwo)).toEqual(expected);
    });
  });
});
