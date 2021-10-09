import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { GameBoard } from '../../../../src/feature/tictactoe/component/game-board';
import Index from '../../../../src/feature/tictactoe/component';
import {
  initialGame,
  initialPlayers,
  initialStatus,
} from '../../../../src/feature/tictactoe/context/tictactoe.constant';

jest.mock('../../../../src/feature/tictactoe/component/game-board');

describe('feature/tictactoe/component', () => {
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
        players: [ ...initialPlayers ],
        game: [ ...initialGame ],
        status: { ...initialStatus },
      },
    };
    const store = mockStore(state);
    const { getByText } = render(getComponent(store));

    // Assert - fake test - test nothing
    getByText(/Game Board/);
  });
});
