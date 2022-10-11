import React from 'react';
import GameStatus from '../../../../src/features/tictactoe/components/game-status';
import { updateGameState } from '../../../../src/features/tictactoe/context/context.actions';
import { GameStateEnum, PlayerStateEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import {
  initialPlayerOne,
  initialPlayerTwo,
  initialState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
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
      playerOne: {
        ...initialPlayerOne,
        playerState: PlayerStateEnum.Winner,
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
    render(<GameStatus />, {
      state: mockState,
      reducer,
    });

    // Assert
    screen.getByText(/Player #2 is the winner./);
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
    fireEvent.click(screen.getByRole('button', { name: 'Exit'}));

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
    fireEvent.click(screen.getByRole('button', { name: 'Setup'}));

    // Assert
    expect(updateGameState).toBeCalledWith(GameStateEnum.Setup);
  });
});
