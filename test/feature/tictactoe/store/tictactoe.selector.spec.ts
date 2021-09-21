import { useSelector } from 'react-redux';

import { getSquare, getPlayers, getPlayerTurn } from '../../../../src/feature/tictactoe/store/tictactoe.selector';

jest.mock('react-redux');

describe('feature/tictactoe/store/tictactoe.selector', () => {
  it('should return square', () => {
    // Arrange
    const mockState = {
      tictactoe: {
        game: [
          [1, 0, 1],
          [0, 0, 0],
          [1, 1, 1],
        ],
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const owner = useSelector(getSquare(2,1));

    // Assert
    expect(owner).toEqual(1);
  });
  it('should return current player', () => {
    // Arrange
    const mockState = {
      tictactoe: {
        playerTurn: 1,
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const turn = useSelector(getPlayerTurn);

    // Assert
    expect(turn).toEqual(1);
  });
  it('should return players', () => {
    // Arrange
    const mockState = {
      tictactoe: {
        players: ['Player #A', 'Player #B'],
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const players = useSelector(getPlayers);

    // Assert
    expect(players).toEqual(['Player #A', 'Player #B']);
  });
});
