import { ThemeProvider } from '@mui/styles';
import React, { Reducer } from 'react';
import { fireEvent, render } from '@testing-library/react';
import GameFooter from '../../../../src/features/tictactoe/components/game-footer';
import { ActionEnum, GameStateEnum, PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { TicTacToeStateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { themeLight } from '../../../../src/theme-light';
import { initialTicTacToeState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { TicTacToeProvider } from '../../../../src/features/tictactoe/context/context.provider';

describe('feature/tictactoe/component/game-footer', () => {
  const emptyReducer = jest.fn();
  const getComponent = (initialState: TicTacToeStateType, reducer: Reducer<unknown, unknown>) => {
    return (
      <ThemeProvider theme={themeLight}>
        <TicTacToeProvider state={initialState} reducer={reducer}>
          <GameFooter />
        </TicTacToeProvider>
      </ThemeProvider>
    );
  };

  it('should render - Active', () => {
    // Arrange
    const state = {
      ...initialTicTacToeState,
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
      ...initialTicTacToeState,
      gameState: GameStateEnum.Win,
      turn: PlayerEnum.Two,
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
      ...initialTicTacToeState,
      gameState: GameStateEnum.Tie,
    };
    const reducer = jest.fn(() => (state));

    // Act
    const { getByText } = render(getComponent(state, reducer));

    await fireEvent.click(getByText(/Reset/));

    // Assert
    getByText(/Two losers/);
    expect(reducer).toBeCalledWith(state, { type: ActionEnum.Reset});
  });
});
