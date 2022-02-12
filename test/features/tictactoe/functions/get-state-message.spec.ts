import {
  GameStateEnum,
  PlayerEnum,
  PlayerStateEnum,
} from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import {
  initialPlayerOne,
  initialPlayerTwo,
  initialTicTacToeState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { TicTacToeStateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { getStateMessage } from '../../../../src/features/tictactoe/functions/get-state-message';

type TestTuple = {
  state: TicTacToeStateType,
  expected: string,
};
describe('feature/tictactoe/functions/get-state-message', () => {
  // Arrange
  const cases = [
    {
      state: {
        ...initialTicTacToeState,
      },
      expected: 'The game is ready to be played',
    },
    {
      state: {
        ...initialTicTacToeState,
        gameState: GameStateEnum.Active,
      },
      expected: 'Player #1 take your turn',
    },
    {
      state: {
        ...initialTicTacToeState,
        gameState: GameStateEnum.Active,
        turn: PlayerEnum.Two,
      },
      expected: 'Player #2 take your turn',
    },
    {
      state: {
        ...initialTicTacToeState,
        gameState: GameStateEnum.Active,
        turn: PlayerEnum.Neither,
      },
      expected: 'undefined take your turn',
    },
    {
      state: {
        ...initialTicTacToeState,
        gameState: GameStateEnum.Win,
        playerOne: {
          ...initialPlayerOne,
          playerState: PlayerStateEnum.Winner,
        },
      },
      expected: 'Player #1 won the game',
    },
    {
      state: {
        ...initialTicTacToeState,
        gameState: GameStateEnum.Win,
        playerTwo: {
          ...initialPlayerTwo,
          playerState: PlayerStateEnum.Winner,
        },
      },
      expected: 'Player #2 won the game',
    },
    {
      state: {
        ...initialTicTacToeState,
        gameState: GameStateEnum.Win,
        turn: PlayerEnum.Neither,
        playerOne: {
          ...initialPlayerOne,
        },
      },
      expected: 'undefined won the game',
    },
    {
      state: {
        ...initialTicTacToeState,
        gameState: GameStateEnum.Tie,
      },
      expected: 'The game is a tie, there was no winner',
    },
  ];

  cases.forEach(({ state, expected }: TestTuple) => {
    it(`should find which player won => ${JSON.stringify(expected)}`, () => {
      expect(getStateMessage(state)).toEqual(expected);
    });
  });
});
