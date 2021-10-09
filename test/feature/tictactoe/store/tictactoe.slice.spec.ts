import { checkGame } from '../../../../src/feature/tictactoe/function/check-game';
import tictactoeReducer, { reset, takeTurn } from '../../../../src/feature/tictactoe/store/tictactoe.slice';
import {
  GameState,
  initialGame,
  initialPlayers,
  initialStatus,
} from '../../../../src/feature/tictactoe/store/tictactoe.constant';
import {
  ColumnIndexType, GameStatusType, GameType,
  PlayerIndex,
  RowIndexType,
  TicTacToeStateType,
} from '../../../../src/feature/tictactoe/type/tictactoe';

jest
  .mock('../../../../src/util/api/call-api')
  .mock('../../../../src/feature/tictactoe/function/check-game');

describe('feature/tictactoe/store/tictactoe.slice', () => {
  const initialState: TicTacToeStateType = {
    players: [ ...initialPlayers ],
    game: [ ...initialGame ],
    status: initialStatus,
  };

  it('should call takeTurn without winner',  () => {
    // Arrange
    const action = {
      row: 1 as RowIndexType,
      col: 2 as ColumnIndexType,
      player: 0 as PlayerIndex,
    };
    (checkGame as jest.Mock).mockReturnValue({ state: GameState.Active });
    const expected = {
      players: ['Player #1', 'Player #2'],
      game: [
        [null,null,null],
        [null,null,0],
        [null,null,null],
      ],
      status: {
        state: GameState.Active,
        turn: 1,
      },
    };

    // Act
    const result = tictactoeReducer(initialState, takeTurn(action));

    // Assert
    expect(result).toEqual(expected);
  });
  it('should call takeTurn with winner',  () => {
    // Arrange
    (checkGame as jest.Mock).mockReturnValue({ state: GameState.Active });
    const expected = {
      players: ['Player #1', 'Player #2'],
      game: [
        [0,0,0],
        [1,1,null],
        [null,null,null],
      ],
      status: {
        state: GameState.Win,
        winner: 0,
        turn: 1,
      },
    };

    // Act
    let state = tictactoeReducer(initialState, takeTurn({ row: 0, col: 0, player: 0 }));
    state = tictactoeReducer(state, takeTurn({ row: 1, col: 0, player: 1 }));
    state = tictactoeReducer(state, takeTurn({ row: 0, col: 1, player: 0 }));
    state = tictactoeReducer(state, takeTurn({ row: 1, col: 1, player: 1 }));
    (checkGame as jest.Mock).mockReturnValue({ state: GameState.Win, winner: 0 });
    state = tictactoeReducer(state, takeTurn({ row: 0, col: 2, player: 0 }));

    // Assert
    expect(state).toEqual(expected);
  });

  it('should call reset',  () => {
    // Arrange
    (checkGame as jest.Mock).mockReturnValue({ state: GameState.Active });
    const usedState = {
      players: ['Player #1', 'Player #2'],
      game: [
        [0,0,0],
        [1,1,null],
        [null,null,null],
      ] as GameType,
      status: {
        state: GameState.Win,
        winner: 0,
        turn: 1,
      } as GameStatusType,
    };


    // Act
    const state = tictactoeReducer(usedState, reset());

    // Assert
    expect(state).toEqual(initialState);
  });
});
