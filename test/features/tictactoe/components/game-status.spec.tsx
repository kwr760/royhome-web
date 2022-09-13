import { ThemeProvider } from '@mui/styles';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import GameStatus from '../../../../src/features/tictactoe/components/game-status';
import { updateGameState } from '../../../../src/features/tictactoe/context/context.actions';
import { TicTacToeProvider } from '../../../../src/features/tictactoe/context/context.provider';
import { GameStateEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { initialState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { themeLight } from '../../../../src/theme-light';

jest.mock('../../../../src/features/tictactoe/context/context.actions');

describe('feature/tictactoe/component/game-status', () => {
  const state = {
    ...initialState,
  };
  const reducer = jest.fn();
  let openStatus = true;
  const setOpenStatus = jest.fn(open => { openStatus = open; });
  const getComponent = () => {
    return (
      <ThemeProvider theme={themeLight}>
        <TicTacToeProvider state={state} reducer={reducer}>
          <GameStatus
            openStatus={openStatus}
            setOpenStatus={setOpenStatus}
          />
        </TicTacToeProvider>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    jest.resetAllMocks();
    global.console.log = jest.fn();
  });
  it('should render', () => {
    // Arrange // Act
    const { getByText } = render(getComponent());

    // Assert
    getByText(/The game has yet to begin./);
    expect(openStatus).toBe(true);
  });
  it('should dispatch updateGameState on Exit', () => {
    // Arrange // Act
    const { getByRole } = render(getComponent());
    fireEvent.click(getByRole('button', { name: 'Exit'}));

    // Assert
    expect(updateGameState).toBeCalledWith(GameStateEnum.Exit);
    expect(setOpenStatus).toBeCalledWith(false);
  });
  it('should dispatch updateGameState on Setup', () => {
    // Arrange // Act
    const { getByRole } = render(getComponent());
    fireEvent.click(getByRole('button', { name: 'Setup'}));

    // Assert
    expect(updateGameState).toBeCalledWith(GameStateEnum.Setup);
    expect(setOpenStatus).toBeCalledWith(false);
  });
});
