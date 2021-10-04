import tictactoeReducer, {
  initialGame,
  initialPlayers,
  takeTurn,
} from '../../../../src/feature/tictactoe/store/tictactoe.slice';
import { checkGame} from '../../../../src/feature/tictactoe/function/check-game';
import { TicTacToeStateType } from '../../../../src/feature/tictactoe/type/state/tictactoe';

jest
  .mock('../../../../src/util/api/call-api')
  .mock('../../../../src/feature/tictactoe/function/check-game');

describe('feature/tictactoe/store/tictactoe.slice', () => {
  const initialState: TicTacToeStateType = {
    playerTurn: 0,
    players: [ ...initialPlayers ],
    game: [ ...initialGame ],
  };

  it('should call takeTurn without winner',  () => {
    // Arrange
    const action = {
      row: 1,
      col: 2,
      player: 0,
    };
    (checkGame as jest.Mock).mockReturnValue(null);
    const expected = {
      playerTurn: 1,
      players: ['Player #1', 'Player #2'],
      game: [
        [null,null,null],
        [null,null,0],
        [null,null,null],
      ],
    };

    // Act
    const result = tictactoeReducer(initialState, takeTurn(action));

    // Assert
    expect(result).toEqual(expected);
  });
  it('should call takeTurn with winner',  () => {
    // Arrange
    (checkGame as jest.Mock).mockReturnValue(null);
    const expected = {
      playerTurn: 0,
      players: ['Player #1', 'Player #2'],
      winner: 0,
      game: [
        [0,0,0],
        [1,1,null],
        [null,null,null],
      ],
    };

    // Act
    let state = tictactoeReducer(initialState, takeTurn({ row: 0, col: 0, player: 0 }));
    state = tictactoeReducer(state, takeTurn({ row: 1, col: 0, player: 1 }));
    state = tictactoeReducer(state, takeTurn({ row: 0, col: 1, player: 0 }));
    state = tictactoeReducer(state, takeTurn({ row: 1, col: 1, player: 1 }));
    (checkGame as jest.Mock).mockReturnValue(0);
    state = tictactoeReducer(state, takeTurn({ row: 0, col: 2, player: 0 }));

    // Assert
    expect(state).toEqual(expected);
  });
});
