import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { FaAngleDoubleLeft as LeftArrow, FaAngleDoubleRight as RightArrow } from 'react-icons/fa';
import { GameHeader } from '../../../../src/feature/tictactoe/component/game-header';
import { GameState, initialGame, initialPlayers } from '../../../../src/feature/tictactoe/store/tictactoe.constant';

jest.mock('react-icons/fa');

describe('feature/tictactoe/component/game-info', () => {
  const mockStore = configureMockStore([thunk]);
  const getComponent = (store: Store) => (
    <Provider store={store}>
      <GameHeader />
    </Provider>
  );
  it('should render', () => {
    // Arrange
    const state = {
      tictactoe: {
        players: initialPlayers,
        game: initialGame,
        status: {
          turn: 1,
        },
      },
    };
    (RightArrow as jest.Mock).mockImplementation(() => 'Right Arrow');
    const store = mockStore(state);

    // Act
    const { getByText } = render(getComponent(store));

    // Assert
    getByText(/Player #1/);
    getByText(/Right Arrow/);
    getByText(/Player #2/);
  });
  it('should render as Left Arrow', () => {
    // Arrange
    const state = {
      tictactoe: {
        players: initialPlayers,
        game: initialGame,
        status: {
          turn: 0,
        },
      },
    };
    (LeftArrow as jest.Mock).mockImplementation(() => 'Left Arrow');
    const store = mockStore(state);

    // Act
    const { getByText } = render(getComponent(store));

    // Assert
    getByText(/Player #1/);
    getByText(/Left Arrow/);
    getByText(/Player #2/);
  });
  it('should render as Tie', () => {
    // Arrange
    const state = {
      tictactoe: {
        players: initialPlayers,
        game: initialGame,
        status: {
          state: GameState.Tie,
          turn: 0,
        },
      },
    };
    (LeftArrow as jest.Mock).mockImplementation(() => 'Left Arrow');
    const store = mockStore(state);

    // Act
    const { getByText } = render(getComponent(store));

    // Assert
    const playerOneClassName = getByText(/Player #1/).className;
    expect(playerOneClassName).toContain('loser');
    const playerTwoClassName = getByText(/Player #2/).className;
    expect(playerTwoClassName).toContain('loser');
  });
  it('should render as Win', () => {
    // Arrange
    const state = {
      tictactoe: {
        players: initialPlayers,
        game: initialGame,
        status: {
          state: GameState.Win,
          turn: 0,
          winner: 1,
        },
      },
    };
    (LeftArrow as jest.Mock).mockImplementation(() => 'Left Arrow');
    const store = mockStore(state);

    // Act
    const { getByText } = render(getComponent(store));

    // Assert
    const playerOneClassName = getByText(/Player #1/).className;
    expect(playerOneClassName).toContain('loser');
    const playerTwoClassName = getByText(/Player #2/).className;
    expect(playerTwoClassName).toContain('winner');
  });
});
