import {
  GameStateEnum,
  PlayerEnum,
  PlayerStateEnum,
  PlayerTypeEnum,
} from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import {
  initialPlayerOne,
  initialPlayerTwo,
  initialState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { getStateMessage } from '../../../../src/features/tictactoe/functions/get-state-message';

type TestTuple = {
  state: StateType,
  expected: string,
};
describe('feature/tictactoe/functions/get-state-message', () => {
  // Arrange
  const cases = [
    {
      state: {
        ...initialState,
      },
      expected: 'The game is ready to be played',
    },
    {
      state: {
        ...initialState,
        gameState: GameStateEnum.Active,
      },
      expected: 'Player #1 take your turn',
    },
    {
      state: {
        ...initialState,
        gameState: GameStateEnum.Active,
        turn: PlayerEnum.Two,
      },
      expected: 'Player #2 take your turn',
    },
    {
      state: {
        ...initialState,
        gameState: GameStateEnum.Active,
        turn: PlayerEnum.Neither,
      },
      expected: 'undefined take your turn',
    },
    {
      state: {
        ...initialState,
        gameState: GameStateEnum.Active,
        playerOne: {
          ...initialPlayerOne,
          type: PlayerTypeEnum.Computer,
        },
      },
      expected: 'Player #1 is thinking',
    },
    {
      state: {
        ...initialState,
        gameState: GameStateEnum.Active,
        turn: PlayerEnum.Two,
        playerTwo: {
          ...initialPlayerTwo,
          type: PlayerTypeEnum.Computer,
        },
      },
      expected: 'Player #2 is thinking',
    },
    {
      state: {
        ...initialState,
        gameState: GameStateEnum.Completed,
        playerOne: {
          ...initialPlayerOne,
          playerState: PlayerStateEnum.Winner,
        },
      },
      expected: 'Player #1 won the game',
    },
    {
      state: {
        ...initialState,
        gameState: GameStateEnum.Completed,
        playerTwo: {
          ...initialPlayerTwo,
          playerState: PlayerStateEnum.Winner,
        },
      },
      expected: 'Player #2 won the game',
    },
    {
      state: {
        ...initialState,
        gameState: GameStateEnum.Completed,
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
