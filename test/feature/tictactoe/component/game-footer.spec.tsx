import React, { Reducer } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { GameFooter } from '../../../../src/feature/tictactoe/component/game-footer';
import { TicTacToeProvider } from '../../../../src/feature/tictactoe/context';
import { ActionEnumType } from '../../../../src/feature/tictactoe/context/context.actions';
import { GameState, initialGame, initialPlayers } from '../../../../src/feature/tictactoe/context/tictactoe.constant';
import { PlayerType, StateType } from '../../../../src/feature/tictactoe/type/tictactoe';

describe('feature/tictactoe/component/game-footer', () => {
  const emptyReducer = jest.fn();
  const getComponent = (initialState: StateType, reducer: Reducer<unknown, unknown>) => {
    return (
      <TicTacToeProvider state={initialState} reducer={reducer}>
        <GameFooter />
      </TicTacToeProvider>
    );
  };

  it('should render - Active', () => {
    // Arrange
    const state = {
      players: initialPlayers,
      game: initialGame,
      status: {
        state: GameState.Active,
        turn: 0 as PlayerType,
      },
    };

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    getByText(/Reset/);
    getByText(/Game is being played/);
  });
  it('should render - Win', () => {
    // Arrange
    const state = {
      players: initialPlayers,
      game: initialGame,
      status: {
        state: GameState.Win,
        turn: 0 as PlayerType,
      },
    };

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    getByText(/Reset/);
    getByText(/There is a winner/);
  });
  it('should render - Tie', async () => {
    // Arrange
    const state = {
      players: initialPlayers,
      game: initialGame,
      status: {
        state: GameState.Tie,
        turn: 0 as PlayerType,
      },
    };
    const reducer = jest.fn(() => (state));

    // Act
    const { getByText } = render(getComponent(state, reducer));

    await fireEvent.click(getByText(/Reset/));

    // Assert
    getByText(/Two losers/);
    expect(reducer).toBeCalledWith(state, { type: ActionEnumType.reset});
  });
});
