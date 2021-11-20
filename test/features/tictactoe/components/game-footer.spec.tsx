import { ThemeProvider } from '@mui/styles';
import React, { Reducer } from 'react';
import { fireEvent, render } from '@testing-library/react';
import GameFooter from '../../../../src/features/tictactoe/components/game-footer';
import { ActionEnum, PlayerEnum, StatusEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { TicTacToeStateType } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
import { themeLight } from '../../../../src/theme-light';
import { initialGame, initialPlayers } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
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
      players: initialPlayers,
      game: initialGame,
      status: StatusEnum.Active,
      turn: PlayerEnum.One,
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
      status: StatusEnum.Win,
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
      players: initialPlayers,
      game: initialGame,
      status: StatusEnum.Tie,
      turn: PlayerEnum.One,
    };
    const reducer = jest.fn(() => (state));

    // Act
    const { getByText } = render(getComponent(state, reducer));

    await fireEvent.click(getByText(/Reset/));

    // Assert
    getByText(/Two losers/);
    expect(reducer).toBeCalledWith(state, { type: ActionEnum.reset});
  });
});
