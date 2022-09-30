import { ThemeProvider } from '@mui/styles';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import GameStatus from '../../../../src/features/tictactoe/components/game-status';
import { updateGameState } from '../../../../src/features/tictactoe/context/context.actions';
import { TicTacToeProvider } from '../../../../src/features/tictactoe/context/context.provider';
import { GameStateEnum, PlayerStateEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import {
  initialPlayerOne,
  initialPlayerTwo,
  initialState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { themeLight } from '../../../../src/theme-light';

jest.mock('../../../../src/features/tictactoe/context/context.actions');

describe('feature/tictactoe/component/game-status', () => {
  let openStatus = true;
  const setOpenStatus = jest.fn(open => {
    openStatus = open;
  });
  const getComponent = (state: StateType, reducer: React.Reducer<unknown, unknown>) => {
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
  it('should render message', () => {
    // Arrange
    const mockState = {
      ...initialState,
      gameState: GameStateEnum.Message,
    };
    const reducer = jest.fn(() => ( mockState ));

    // Act
    const { getByText } = render(getComponent(mockState, reducer));

    // Assert
    getByText(/The game has yet to begin./);
    expect(openStatus).toBe(true);
  });
  it('should render unknown', () => {
    // Arrange
    const mockState = {
      ...initialState,
    };
    const reducer = jest.fn(() => ( mockState ));

    // Act
    const { getByText } = render(getComponent(mockState, reducer));

    // Assert
    getByText(/Unknown state/);
    expect(openStatus).toBe(true);
  });
  it('should render tie', () => {
    // Arrange
    const mockState = {
      ...initialState,
      gameState: GameStateEnum.Completed,
    };
    const reducer = jest.fn(() => ( mockState ));

    // Act
    const { getByText } = render(getComponent(mockState, reducer));

    // Assert
    getByText(/The game ended in a tie./);
    expect(openStatus).toBe(true);
  });
  it('should render winner #1', () => {
    // Arrange
    const mockState = {
      ...initialState,
      gameState: GameStateEnum.Completed,
      playerOne: {
        ...initialPlayerOne,
        playerState: PlayerStateEnum.Winner,
      },
    };
    const reducer = jest.fn(() => ( mockState ));

    // Act
    const { getByText } = render(getComponent(mockState, reducer));

    // Assert
    getByText(/Player #1 is a winner./);
    expect(openStatus).toBe(true);
  });
  it('should render winner #2', () => {
    // Arrange
    const mockState = {
      ...initialState,
      gameState: GameStateEnum.Completed,
      playerTwo: {
        ...initialPlayerTwo,
        playerState: PlayerStateEnum.Winner,
      },
    };
    const reducer = jest.fn(() => ( mockState ));

    // Act
    const { getByText } = render(getComponent(mockState, reducer));

    // Assert
    getByText(/Player #2 is a winner./);
    expect(openStatus).toBe(true);
  });
  it('should dispatch updateGameState on Exit', () => {
    // Arrange
    const mockState = {
      ...initialState,
    };
    const reducer = jest.fn(() => ( mockState ));

    // Act
    const { getByRole } = render(getComponent(mockState, reducer));
    fireEvent.click(getByRole('button', { name: 'Exit'}));

    // Assert
    expect(updateGameState).toBeCalledWith(GameStateEnum.Exit);
    expect(setOpenStatus).toBeCalledWith(false);
  });
  it('should dispatch updateGameState on Setup', () => {
    // Arrange
    const mockState = {
      ...initialState,
    };
    const reducer = jest.fn(() => ( mockState ));

    // Act
    const { getByRole } = render(getComponent(mockState, reducer));
    fireEvent.click(getByRole('button', { name: 'Setup'}));

    // Assert
    expect(updateGameState).toBeCalledWith(GameStateEnum.Setup);
    expect(setOpenStatus).toBeCalledWith(false);
  });
});
