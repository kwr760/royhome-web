import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { FaAngleDoubleLeft as LeftArrow, FaAngleDoubleRight as RightArrow } from 'react-icons/fa';
import { GameInfo } from '../../../../src/feature/tictactoe/component/game-info';

jest.mock('react-icons/fa');

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
        game: [[null,null,null],[null,null,null],[null,null,null]],
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
        playerTurn: 0,
        players: ['Player #1', 'Player #2'],
        game: [[null,null,null],[null,null,null],[null,null,null]],
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
});
