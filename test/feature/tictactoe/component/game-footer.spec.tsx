import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { GameFooter } from '../../../../src/feature/tictactoe/component/game-footer';
import { GameState, initialGame, initialPlayers } from '../../../../src/feature/tictactoe/store/tictactoe.constant';

jest.mock('react-icons/fa');

describe('feature/tictactoe/component/game-footer', () => {
  const mockStore = configureMockStore([thunk]);
  const getComponent = (store: Store) => (
    <Provider store={store}>
      <GameFooter />
    </Provider>
  );
  it('should render - Active', () => {
    // Arrange
    const state = {
      tictactoe: {
        players: initialPlayers,
        game: initialGame,
        status: {
          state: GameState.Active,
        },
      },
    };
    const store = mockStore(state);

    // Act
    const { getByText } = render(getComponent(store));

    // Assert
    getByText(/Reset/);
    getByText(/Game is being played/);
  });
  it('should render - Win', () => {
    // Arrange
    const state = {
      tictactoe: {
        players: initialPlayers,
        game: initialGame,
        status: {
          state: GameState.Win,
        },
      },
    };
    const store = mockStore(state);

    // Act
    const { getByText } = render(getComponent(store));

    // Assert
    getByText(/Reset/);
    getByText(/There is a winner/);
  });
  it('should render - Tie', async () => {
    // Arrange
    const state = {
      tictactoe: {
        players: initialPlayers,
        game: initialGame,
        status: {
          state: GameState.Tie,
        },
      },
    };
    const store = mockStore(state);

    // Act
    const { getByText } = render(getComponent(store));
    const actions = store.getActions();
    await fireEvent.click(getByText(/Reset/));

    // Assert
    getByText(/Two losers/);
    expect(actions.length).toEqual(1);
    expect(actions[0].type).toEqual('tictactoe/reset');
    expect(actions[0].payload).toBeUndefined();
  });
});
