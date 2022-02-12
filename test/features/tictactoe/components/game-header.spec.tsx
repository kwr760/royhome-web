import React, { Reducer } from 'react';
import { ThemeProvider } from '@mui/styles';
import { fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react';
import GameHeader from '../../../../src/features/tictactoe/components/game-header';
import {
  PlayerEnum,
  GameStateEnum,
  PlayerStateEnum,
} from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import {
  initialPlayerOne,
  initialPlayerTwo,
  initialTicTacToeState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { TicTacToeProvider } from '../../../../src/features/tictactoe/context/context.provider';
import { TicTacToeStateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { themeLight } from '../../../../src/theme-light';
import { ticTacToeReducer } from '../../../../src/features/tictactoe/context/context.reducer';

jest.mock('react-icons/fa');

describe('features/tictactoe/components/game-header', () => {
  const emptyReducer = jest.fn();
  const getComponent = (initialState: TicTacToeStateType, reducer: Reducer<unknown, unknown>) => {
    return (
      <ThemeProvider theme={themeLight}>
        <TicTacToeProvider state={initialState} reducer={reducer}>
          <GameHeader />
        </TicTacToeProvider>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    global.console.log = jest.fn();
  });
  afterEach(() => {
    (global.console.log as jest.Mock).mockRestore();
  });
  it('should render update and cancel of player #1', async () => {
    // Arrange
    const state = {
      ...initialTicTacToeState,
      turn: PlayerEnum.Two,
    };

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));
    fireEvent.click(getByText(/Player #1/));
    fireEvent.click(getByText(/Cancel/));
    await waitForElementToBeRemoved(getByText(/Cancel/));

    // Assert
    getByText(/Player #1/);
    getByText(/Start Game/);
    getByText(/Player #2/);
  });
  it('should render update and cancel of player #2', async () => {
    // Arrange
    const state = {
      ...initialTicTacToeState,
    };

    // Act
    const { getByText, getAllByText } = render(getComponent(state, emptyReducer));
    fireEvent.click(getByText(/Player #2/));
    fireEvent.click(getAllByText(/Update/)[1]);
    await waitForElementToBeRemoved(getByText(/Cancel/));

    // Assert
    getByText(/Player #1/);
    getByText(/Start Game/);
    getByText(/Player #2/);
  });
  it('should render as Tie', () => {
    // Arrange
    const state = {
      ...initialTicTacToeState,
      gameState: GameStateEnum.Tie,
    };

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    getByText(/Player #1/);
    getByText(/Player #2/);
    getByText(/The game is a tie, there was no winner/);
  });
  it('should render One as Win', () => {
    // Arrange
    const state = {
      ...initialTicTacToeState,
      gameState: GameStateEnum.Win,
      playerOne: {
        ...initialPlayerOne,
        playerState: PlayerStateEnum.Winner,
      },
    };

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    getByText(/Player #1 - \(X\)/);
    getByText(/Player #2 - \(O\)/);
    getByText(/Player #1 won the game/);
  });
  it('should render Two as Win', () => {
    // Arrange
    const state = {
      ...initialTicTacToeState,
      gameState: GameStateEnum.Win,
      playerTwo: {
        ...initialPlayerTwo,
        playerState: PlayerStateEnum.Winner,
      },
    };

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    getByText(/Player #1 - \(X\)/);
    getByText(/Player #2 - \(O\)/);
    getByText(/Player #2 won the game/);
  });
  it('should click start game', () => {
    // Arrange
    const state = {
      ...initialTicTacToeState,
    };

    // Act // Assert
    const { getByText } = render(getComponent(state, ticTacToeReducer as Reducer<unknown, unknown>));
    const startButton = getByText(/Start Game/);
    fireEvent.click(startButton);
    const resetButton = getByText(/Reset Game/);
    fireEvent.click(resetButton);
    getByText(/Start Game/);
  });
  it('should click reset game on tie', () => {
    // Arrange
    const state = {
      ...initialTicTacToeState,
      gameState: GameStateEnum.Tie,
    };

    // Act // Assert
    const { getByText } = render(getComponent(state, ticTacToeReducer as Reducer<unknown, unknown>));
    const resetButton = getByText(/Reset Game/);
    fireEvent.click(resetButton);
    getByText(/Start Game/);
  });
  it('should click reset game on win', () => {
    // Arrange
    const state = {
      ...initialTicTacToeState,
      gameState: GameStateEnum.Win,
    };

    // Act // Assert
    const { getByText } = render(getComponent(state, ticTacToeReducer as Reducer<unknown, unknown>));
    const resetButton = getByText(/Reset Game/);
    fireEvent.click(resetButton);
    getByText(/Start Game/);
  });
});
