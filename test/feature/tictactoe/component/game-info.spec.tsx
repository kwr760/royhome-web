import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { GameInfo } from '../../../../src/feature/tictactoe/component/game-info';

describe('feature/tictactoe/component/game-info', () => {
  const mockStore = configureMockStore([thunk]);
  const getComponent = (store: Store) => (
    <Provider store={store}>
      <GameInfo />
    </Provider>
  );
  it('should render', () => {
    // Arrange
    const state = {
      tictactoe: {
        playerTurn: 1,
        players: ['Player #1', 'Player #2'],
        game: [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]],
      },
    };
    const store = mockStore(state);

    // Act
    const { getByText } = render(getComponent(store));

    // Assert
    getByText(/Player #1/);
    getByText(/The current turn is:.*1/);
    getByText(/Player #2/);
  });
});
