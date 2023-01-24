import React from 'react';
import GameSquare from '../../../../src/features/tictactoe/components/game-square';
import { ActionEnum, GameStateEnum, PieceEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { initialState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { fireEvent, render, screen } from '../utils/testing-library';

describe('feature/tictactoe/component/game-square', () => {
  beforeEach(() => {
    global.console.log = jest.fn();
  });
  afterEach(() => {
    (global.console.log as jest.Mock).mockRestore();
  });
  it('should render and click as button', () => {
    // Arrange
    const state = {
      ...initialState,
      board: '---------',
      gameState: GameStateEnum.Active,
      sessionId: 'session-id',
    };
    const expectedPayload = {
      position: 5,
      player: PieceEnum.X,
    };
    const reducer = jest.fn(() => (state));

    // Act
    render(<GameSquare position={5} />, {
      state,
      reducer,
    });
    const button = screen.getByRole(/button/);
    screen.getByRole(/heading/);
    fireEvent.click(button);

    // Assert
    expect(reducer).toBeCalledWith(state, { type: ActionEnum.TakeTurn, payload: expectedPayload});
  });
  it('should render - O', () => {
    // Arrange
    const state = {
      ...initialState,
      board: '-----O---',
    };

    // Act
    render(<GameSquare position={5} />, {
      state,
    });

    // Assert
    screen.getByText(/O/);
  });
  it('should render - X', () => {
    // Arrange
    const state = {
      ...initialState,
      board: '-----X---',
    };

    // Act
    render(<GameSquare position={5} />, {
      state,
    });

    // Assert
    screen.getByText(/X/);
  });
});
