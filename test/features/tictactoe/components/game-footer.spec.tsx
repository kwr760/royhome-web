import { ThemeProvider } from '@mui/styles';
import React, { Reducer } from 'react';
import { fireEvent, render } from '@testing-library/react';
import GameFooter from '../../../../src/features/tictactoe/components/game-footer';
import { TicTacToeProvider } from '../../../../src/features/tictactoe/context';
import {
  ActionEnum,
  initialGame,
  initialPlayers,
  PlayerEnum,
  StatusEnum,
} from '../../../../src/features/tictactoe/constants/tictactoe.constant';
import { StateType } from '../../../../src/features/tictactoe/types/tictactoe';
import theme from '../../../../src/theme-light';

describe('feature/tictactoe/component/game-footer', () => {
  const emptyReducer = jest.fn();
  const getComponent = (initialState: StateType, reducer: Reducer<unknown, unknown>) => {
    return (
      <ThemeProvider theme={theme}>
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
