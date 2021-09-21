import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { GameSquare } from '../../../../src/feature/tictactoe/component/game-square';

describe('feature/tictactoe/component/game-square', () => {
  const mockStore = configureMockStore([thunk]);
  const getComponent = (store: Store) => (
    <Provider store={store}>
      <GameSquare row={1} col={2} />
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
    const actions = store.getActions();
    const expectedPayload = {
      row: 1,
      col: 2,
      player: 1,
    };

    // Act
    const { getByRole } = render(getComponent(store));
    const button = getByRole(/button/);
    getByRole(/heading/);
    fireEvent.click(button);

    // Assert
    expect(actions.length).toEqual(2);
    expect(actions[0].type).toEqual('tictactoe/takeTurn');
    expect(actions[0].payload).toEqual(expectedPayload);
    expect(actions[1].type).toEqual('tictactoe/incrementTurn');
    expect(actions[1].payload).toBeUndefined();
  });
  it('should render - O', () => {
    // Arrange
    const state = {
      tictactoe: {
        playerTurn: 1,
        players: ['Player #1', 'Player #2'],
        game: [[-1,-1,-1],[-1,-1,0],[-1,-1,-1]],
      },
    };
    const store = mockStore(state);

    // Act
    const { getByText } = render(getComponent(store));

    // Assert
    getByText(/O/);
  });
  it('should render - X', () => {
    // Arrange
    const state = {
      tictactoe: {
        playerTurn: 1,
        players: ['Player #1', 'Player #2'],
        game: [[-1,-1,-1],[-1,-1,1],[-1,-1,-1]],
      },
    };
    const store = mockStore(state);

    // Act
    const { getByText } = render(getComponent(store));

    // Assert
    getByText(/X/);
  });
});
