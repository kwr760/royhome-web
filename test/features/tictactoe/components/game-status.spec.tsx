import React from 'react';
import GameStatus from '../../../../src/features/tictactoe/components/game-status';
import { updateGameState } from '../../../../src/features/tictactoe/context/context.actions';
import { GameStateEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { initialPlayerOne, initialState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { fireEvent, render, screen } from '../utils/testing-library';

jest.mock('../../../../src/features/tictactoe/context/context.actions');

describe('feature/tictactoe/component/game-status', () => {
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
    render(<GameStatus />, {
      state: mockState,
      reducer,
    });

    // Assert
    screen.getByText(/The game has yet to begin./);
  });
  it('should render wait', () => {
    // Arrange
    const mockState = {
      ...initialState,
      gameState: GameStateEnum.Wait,
    };
    const reducer = jest.fn(() => ( mockState ));

    // Act
    render(<GameStatus />, {
      state: mockState,
      reducer,
    });

    // Assert
    screen.getByText(/Waiting for your opponent./);
  });
  it('should render mismatch', () => {
    // Arrange
    const mockState = {
      ...initialState,
      gameState: GameStateEnum.Mismatch,
    };
    const reducer = jest.fn(() => ( mockState ));

    // Act
    render(<GameStatus />, {
      state: mockState,
      reducer,
    });

    // Assert
    screen.getByText(/The game ended since there was a problem./);
  });
  it('should render unknown', () => {
    // Arrange
    const mockState = {
      ...initialState,
    };
    const reducer = jest.fn(() => ( mockState ));

    // Act
    const { container } = render(<GameStatus />, {
      state: mockState,
      reducer,
    });

    // Assert
    expect(container.firstChild).toBeNull();
  });
  it('should render tie', () => {
    // Arrange
    const mockState = {
      ...initialState,
      gameState: GameStateEnum.Completed,
    };
    const reducer = jest.fn(() => ( mockState ));

    // Act
    render(<GameStatus />, {
      state: mockState,
      reducer,
    });

    // Assert
    screen.getByText(/The game ended in a tie./);
  });
  it('should render winner #1', () => {
    // Arrange
    const mockState = {
      ...initialState,
      gameState: GameStateEnum.Completed,
      board: 'XXXOO----',
      playerOne: {
        ...initialPlayerOne,
      },
    };
    const reducer = jest.fn(() => ( mockState ));

    // Act
    render(<GameStatus />, {
      state: mockState,
      reducer,
    });

    // Assert
    screen.getByText(/Player #1 is the winner./);
  });
  it('should dispatch updateGameState on Exit', () => {
    // Arrange
    const mockState = {
      ...initialState,
      gameState: GameStateEnum.Message,
    };
    const reducer = jest.fn(() => ( mockState ));

    // Act
    render(<GameStatus />, {
      state: mockState,
      reducer,
    });
    fireEvent.click(screen.getByText('Exit'));

    // Assert
    expect(updateGameState).toBeCalledWith(GameStateEnum.Exit);
  });
  it('should dispatch updateGameState on Setup', () => {
    // Arrange
    const mockState = {
      ...initialState,
      gameState: GameStateEnum.Message,
    };
    const reducer = jest.fn(() => ( mockState ));

    // Act
    render(<GameStatus />, {
      state: mockState,
      reducer,
    });
    fireEvent.click(screen.getByText('Setup'));

    // Assert
    expect(updateGameState).toBeCalledWith(GameStateEnum.Setup);
  });
});
