import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { GameBoard } from '../../../../src/feature/tictactoe/component/game-board';
import Index from '../../../../src/feature/tictactoe/component';

jest.mock('../../../../src/feature/tictactoe/component/game-board');

describe('component/tictactoe', () => {
  const mockStore = configureMockStore([thunk]);
  const getComponent = (store: Store) => (
    <Provider store={store}>
      <Index />
    </Provider>
  );
  beforeEach(() => {
    (GameBoard as jest.Mock).mockReturnValue('Game Board');
  });
  it('should render', () => {
    // Arrange/Act
    const state = {
      tictactoe: {
        playerTurn: 1,
        players: ['Player #1', 'Player #2'],
        game: [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]],
      },
    };
    const store = mockStore(state);
    const { getByText } = render(getComponent(store));

    // Assert - fake test - test nothing
    getByText(/Game Board/);
  });
});
