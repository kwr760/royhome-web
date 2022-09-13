import mediaQuery from 'css-mediaquery';
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
  initialState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { TicTacToeProvider } from '../../../../src/features/tictactoe/context/context.provider';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { themeLight } from '../../../../src/theme-light';
import { ticTacToeReducer } from '../../../../src/features/tictactoe/context/context.reducer';

function createMatchMedia(width: number) {
  return (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  }) as unknown as MediaQueryList;
}
jest.mock( '../../../../src/features/tictactoe/components/remote-dialog',
  () => jest.fn(() => <div>Remote Dialog</div>),
);

describe('features/tictactoe/components/game-header', () => {
  const emptyReducer = jest.fn();
  const getComponent = (testState: StateType, reducer: Reducer<unknown, unknown>) => {
    return (
      <ThemeProvider theme={themeLight}>
        <TicTacToeProvider state={testState} reducer={reducer}>
          <GameHeader />
        </TicTacToeProvider>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    window.matchMedia = createMatchMedia(1024) as (q: string) => MediaQueryList;
    global.console.log = jest.fn();
  });
  afterEach(() => {
    window.matchMedia = createMatchMedia(400) as (q: string) => MediaQueryList;
    (global.console.log as jest.Mock).mockRestore();
  });
  it('should render update and cancel of player #1', async () => {
    // Arrange
    const state = {
      ...initialState,
      turn: PlayerEnum.Two,
    };

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));
    fireEvent.click(getByText(/Player #1/));
    fireEvent.click(getByText(/Cancel/));
    await waitForElementToBeRemoved(getByText(/Cancel/));

    // Assert
    getByText(/Player #1/);
    getByText(/Start/);
    getByText(/Player #2/);
  });
  it('should render update and cancel of player #1', async () => {
    // Arrange
    const state = {
      ...initialState,
    };

    // Act
    const { getByText, getAllByText } = render(getComponent(state, ticTacToeReducer as Reducer<unknown, unknown>));
    fireEvent.click(getByText(/Player #1/));
    fireEvent.click(getAllByText(/Update/)[0]);
    await waitForElementToBeRemoved(getByText(/Cancel/));

    // Assert
    getByText(/Player #1/);
    getByText(/Start/);
    getByText(/Player #2/);
  });
  it('should render update and cancel of player #2', async () => {
    // Arrange
    window.matchMedia = createMatchMedia(400) as (q: string) => MediaQueryList;
    const state = {
      ...initialState,
    };

    // Act
    const { getByText, getAllByText } = render(getComponent(state, ticTacToeReducer as Reducer<unknown, unknown>));
    fireEvent.click(getByText(/O/));
    fireEvent.click(getAllByText(/Update/)[0]);
    await waitForElementToBeRemoved(getByText(/Cancel/));

    // Assert
    getByText(/X/);
    getByText(/Start/);
    getByText(/O/);
  });
  it('should render as Tie', () => {
    // Arrange
    const state = {
      ...initialState,
      gameState: GameStateEnum.Completed,
    };

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    getByText(/Player #1/);
    getByText(/Player #2/);
    getByText(/The game is a tie, there was no winner/);
  });
  it('should render One as Completed', () => {
    // Arrange
    const state = {
      ...initialState,
      gameState: GameStateEnum.Completed,
      playerOne: {
        ...initialPlayerOne,
        playerState: PlayerStateEnum.Winner,
      },
    };

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    // getByText(/Player #1 - \(X\)/);
    getByText(/Player #2/);
    getByText(/Player #1 won the game/);
  });
  it('should render Two as Completed', () => {
    // Arrange
    const state = {
      ...initialState,
      gameState: GameStateEnum.Completed,
      playerTwo: {
        ...initialPlayerTwo,
        playerState: PlayerStateEnum.Winner,
      },
    };

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    getByText(/Player #1/);
    // getByText(/Player #2/);
    getByText(/Player #2 won the game/);
  });
  it('should click start game', () => {
    // Arrange
    const state = {
      ...initialState,
    };

    // Act // Assert
    const { getByText } = render(getComponent(state, ticTacToeReducer as Reducer<unknown, unknown>));
    const startButton = getByText(/Start/);
    fireEvent.click(startButton);
    const resetButton = getByText(/Reset/);
    fireEvent.click(resetButton);
    getByText(/Start/);
  });
  it('should click reset game on tie', () => {
    // Arrange
    const state = {
      ...initialState,
      gameState: GameStateEnum.Completed,
    };

    // Act // Assert
    const { getByText } = render(getComponent(state, ticTacToeReducer as Reducer<unknown, unknown>));
    const resetButton = getByText(/Reset/);
    fireEvent.click(resetButton);
    getByText(/Start/);
  });
  it('should click reset game on completed', () => {
    // Arrange
    const state = {
      ...initialState,
      gameState: GameStateEnum.Completed,
    };

    // Act // Assert
    const { getByText } = render(getComponent(state, ticTacToeReducer as Reducer<unknown, unknown>));
    const resetButton = getByText(/Reset/);
    fireEvent.click(resetButton);
    getByText(/Start/);
  });
});
