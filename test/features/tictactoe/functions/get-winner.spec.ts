import { PlayerStateEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import {
  initialPlayerOne,
  initialPlayerTwo,
  initialTicTacToeState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { Player, TicTacToeStateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { getWinner } from '../../../../src/features/tictactoe/functions/get-winner';

type TestTuple = {
  state: TicTacToeStateType,
  expected: Player | undefined,
};
describe('feature/tictactoe/functions/get-winner', () => {
  // Arrange
  const cases = [
    {
      state: {
        ...initialTicTacToeState,
        playerOne: {
          ...initialPlayerOne,
          playerState: PlayerStateEnum.Winner,
        },
      },
      expected: {
        ...initialPlayerOne,
        playerState: PlayerStateEnum.Winner,
      },
    },
    {
      state: {
        ...initialTicTacToeState,
        playerTwo: {
          ...initialPlayerTwo,
          playerState: PlayerStateEnum.Winner,
        },
      },
      expected: {
        ...initialPlayerTwo,
        playerState: PlayerStateEnum.Winner,
      },
    },
    {
      state: { ...initialTicTacToeState },
      expected: undefined,
    },
  ];

  cases.forEach(({ state, expected }: TestTuple) => {
    it(`should find which player won => ${JSON.stringify(expected)}`, () => {
      expect(getWinner(state)).toEqual(expected);
    });
  });
});
