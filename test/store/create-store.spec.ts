import createStore from '../../src/store/create-store';
import { DarkModes } from '../../src/store/session/session.constants';

describe('store/configure', () => {
  const initialGame = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
  it('should configure the store without initialState', () => {
    // Arrange
    const expectedState = {
      session: {
        authenticated: false,
        expiration: 0,
        isLoading: false,
        darkMode: DarkModes.CLEAR_MODE,
      },
      resume: {
        email: 'kroy760@gmail.com',
        resumes: {},
      },
      tictactoe: {
        game: initialGame,
        playerTurn: 0,
        players: [
          'Player #1',
          'Player #2',
        ],
      },
    };

    // Act
    const store = createStore();

    // Assert
    expect(store.dispatch).toEqual(expect.any(Function));
    expect(store.getState()).toEqual(expectedState);
  });
  it('should configure the store', () => {
    // Arrange
    const state = {
      session: {
        authenticated: true,
        expiration: -1,
        isLoading: false,
        darkMode: DarkModes.CLEAR_MODE,
        user: {},
      },
      resume: {
        email: 'kroy760@gmail.com',
      },
      tictactoe: {
        game: initialGame,
        playerTurn: 0,
        players: [
          'Player #1',
          'Player #2',
        ],
      },
    };

    // Act
    const store = createStore(state);

    // Assert
    expect(store.dispatch).toEqual(expect.any(Function));
    expect(store.getState()).toEqual(state);
  });
});
