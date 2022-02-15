import React, { Reducer } from 'react';
import { ThemeProvider } from '@mui/styles';
import { fireEvent, render } from '@testing-library/react';
import GameSquare from '../../../../src/features/tictactoe/components/game-square';
import { ActionEnum, GameStateEnum, PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { initialState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { TicTacToeProvider } from '../../../../src/features/tictactoe/context/context.provider';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { themeLight } from '../../../../src/theme-light';

describe('feature/tictactoe/component/game-square', () => {
  const emptyReducer = jest.fn();
  const getComponent = (testState: StateType, reducer: Reducer<unknown, unknown>) => {
    return (
      <ThemeProvider theme={themeLight}>
        <TicTacToeProvider state={testState} reducer={reducer}>
          <GameSquare position={5} />
        </TicTacToeProvider>
      </ThemeProvider>
    );
  };
  it('should render and click as button', () => {
    // Arrange
    const state = {
      ...initialState,
      board: '---------',
      turn: PlayerEnum.Two,
      gameState: GameStateEnum.Active,
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
    expect(reducer).toBeCalledWith(state, { type: ActionEnum.TakeTurn, payload: expectedPayload});
  });
  it('should render - O', () => {
    // Arrange
    const state = {
      ...initialState,
      board: '-----O---',
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
      ...initialState,
      board: '-----X---',
    };

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    getByText(/X/);
  });
});
