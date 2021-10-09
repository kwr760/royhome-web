import React, { Reducer } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { GameSquare } from '../../../../src/feature/tictactoe/component/game-square';
import { TicTacToeProvider } from '../../../../src/feature/tictactoe/context';
import { ActionEnumType } from '../../../../src/feature/tictactoe/context/context.actions';
import {
  initialGame,
  initialPlayers,
  initialStatus,
} from '../../../../src/feature/tictactoe/context/tictactoe.constant';
import { GameType, PlayerType, StateType } from '../../../../src/feature/tictactoe/type/tictactoe';

describe('feature/tictactoe/component/game-square', () => {
  const emptyReducer = jest.fn();
  const getComponent = (initialState: StateType, reducer: Reducer<unknown, unknown>) => {
    return (
      <TicTacToeProvider state={initialState} reducer={reducer}>
        <GameSquare row={1} col={2} />
      </TicTacToeProvider>
    );
  };
  it('should render', () => {
    // Arrange
    const state = {
      players: [ ...initialPlayers ],
      game: [ ...initialGame ],
      status: {
        ...initialStatus,
        turn: 1 as PlayerType,
      },
    };
    const expectedPayload = {
      row: 1,
      col: 2,
      player: 1,
    };
    const reducer = jest.fn(() => (state));

    // Act
    const { getByRole } = render(getComponent(state, reducer));
    const button = getByRole(/button/);
    getByRole(/heading/);
    fireEvent.click(button);

    // Assert
    expect(reducer).toBeCalledWith(state, { type: ActionEnumType.takeTurn, payload: expectedPayload});
  });
  it('should render - O', () => {
    // Arrange
    const state = {
      players: initialPlayers,
      game: [[null,null,null],[null,null,0],[null,null,null]] as GameType,
      status: {
        ...initialStatus,
        turn: 1 as PlayerType,
      },
    };

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    getByText(/O/);
  });
  it('should render - X', () => {
    // Arrange
    const state = {
      players: initialPlayers,
      game: [[null,null,null],[null,null,1],[null,null,null]] as GameType,
      status: {
        ...initialStatus,
        turn: 1 as PlayerType,
      },
    };

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    getByText(/X/);
  });
});
