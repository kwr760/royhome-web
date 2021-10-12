import React, { Reducer } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { GameSquare } from '../../../../src/feature/tictactoe/component/game-square';
import { TicTacToeProvider } from '../../../../src/feature/tictactoe/context';
import {
  ActionEnum,
  initialPlayers,
  initialStatus,
  PlayerEnum,
} from '../../../../src/feature/tictactoe/constant/tictactoe.constant';
import { StateType } from '../../../../src/feature/tictactoe/type/tictactoe';

describe('feature/tictactoe/component/game-square', () => {
  const emptyReducer = jest.fn();
  const getComponent = (initialState: StateType, reducer: Reducer<unknown, unknown>) => {
    return (
      <TicTacToeProvider state={initialState} reducer={reducer}>
        <GameSquare position={5} />
      </TicTacToeProvider>
    );
  };
  it('should render', () => {
    // Arrange
    const state = {
      players: [ ...initialPlayers ],
      game: '---------',
      status: initialStatus,
      turn: PlayerEnum.Two,
    };
    const expectedPayload = {
      position: 5,
      player: PlayerEnum.Two,
    };
    const reducer = jest.fn(() => (state));

    // Act
    const { getByRole } = render(getComponent(state, reducer));
    const button = getByRole(/button/);
    getByRole(/heading/);
    fireEvent.click(button);

    // Assert
    expect(reducer).toBeCalledWith(state, { type: ActionEnum.takeTurn, payload: expectedPayload});
  });
  it('should render - O', () => {
    // Arrange
    const state = {
      players: initialPlayers,
      game: '-----O---',
      status: initialStatus,
      turn: PlayerEnum.Two,
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
      game: '-----X---',
      status: initialStatus,
      turn: PlayerEnum.One,
    };

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    getByText(/X/);
  });
});
