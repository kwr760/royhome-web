import React, { Reducer } from 'react';
import { ThemeProvider } from '@mui/styles';
import { fireEvent, render } from '@testing-library/react';
import GameSquare from '../../../../src/features/tictactoe/components/game-square';
import { TicTacToeProvider } from '../../../../src/features/tictactoe/context/context';
import { ActionEnum, PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { initialPlayers, initialStatus } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { TicTacToeStateType } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
import { themeLight } from '../../../../src/theme-light';

describe('feature/tictactoe/component/game-square', () => {
  const emptyReducer = jest.fn();
  const getComponent = (initialState: TicTacToeStateType, reducer: Reducer<unknown, unknown>) => {
    return (
      <ThemeProvider theme={themeLight}>
        <TicTacToeProvider state={initialState} reducer={reducer}>
          <GameSquare position={5} />
        </TicTacToeProvider>
      </ThemeProvider>
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
