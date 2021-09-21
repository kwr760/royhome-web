import tictactoeReducer, { incrementTurn, takeTurn } from '../../../../src/feature/tictactoe/store/tictactoe.slice';
import { TicTacToeStateType } from '../../../../src/feature/tictactoe/type/state/tictactoe';

jest.mock('../../../../src/util/api/call-api');

describe('feature/tictactoe/store/tictactoe.slice', () => {
  const initialState: TicTacToeStateType = {
    playerTurn: 1,
    players: ['Player #1', 'Player #2'],
    game: [
      [-1,-1,-1],
      [-1,-1,-1],
      [-1,-1,-1],
    ],
  } as TicTacToeStateType;

  it('should call incrementTurn', () => {
    // Arrange
    const expected = {
      playerTurn: 0,
      players: ['Player #1', 'Player #2'],
      game: [
        [-1,-1,-1],
        [-1,-1,-1],
        [-1,-1,-1],
      ],
    };

    // Act
    const newState = tictactoeReducer(initialState, incrementTurn());
    // Assert
    expect(newState).toEqual(expected);
    // Act
    const result = tictactoeReducer(newState, incrementTurn());
    // Assert
    expect(result).toEqual(initialState);
  });
  it('should call takeTurn',  () => {
    // Arrange
    const action = {
      row: 1,
      col: 2,
      player: 0,
    };
    const expected = {
      playerTurn: 1,
      players: ['Player #1', 'Player #2'],
      game: [
        [-1,-1,-1],
        [-1,-1,0],
        [-1,-1,-1],
      ],
    };

    // Act
    const result = tictactoeReducer(initialState, takeTurn(action));

    // Assert
    expect(result).toEqual(expected);
  });
});
