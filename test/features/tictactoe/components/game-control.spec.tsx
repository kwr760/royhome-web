import React from 'react';
import GameControl from '../../../../src/features/tictactoe/components/game-control';
import * as mockActions from '../../../../src/features/tictactoe/context/context.actions';
import { GameStateEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { initialState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { fireEvent, render, screen } from '../utils/testing-library';

jest
  .mock('../../../../src/features/tictactoe/components/player-control',
    () => jest.fn(() => 'Player Control' ),
  );

describe('feature/tictactoe/component/game-control', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    global.console.log = jest.fn();
  });
  it('should render', () => {
    // Arrange
    const state = {
      ...initialState,
    };
    const reducer = jest.fn(() => ( state ));

    // Act
    render(<GameControl />, { state, reducer });

    // Assert
    screen.getByText(/Player Control/);
  });
  it('should not render', () => {
    // Arrange
    const state = {
      ...initialState,
      gameState: GameStateEnum.Active,
    };
    const reducer = jest.fn(() => ( state ));

    // Act
    const { container } = render(<GameControl />, { state, reducer });

    // Assert
    expect(container.firstChild).toBeNull();
  });
  it('should dispatch updateGameState on Close', () => {
    // Arrange
    const state = {
      ...initialState,
    };
    const reducer = jest.fn(() => ( state ));
    jest.spyOn(mockActions, 'updateGameState');

    // Act
    render(<GameControl />, { state, reducer });
    fireEvent.click(screen.getByRole('button', { name: 'Close'}));

    // Assert
    expect(mockActions.updateGameState).toBeCalledWith(GameStateEnum.Message);
  });
  it('should dispatch startGame on Play Game', () => {
    // Arrange
    const state = {
      ...initialState,
    };
    const reducer = jest.fn(() => ( state ));
    jest.spyOn(mockActions, 'startGame');

    // Act
    render(<GameControl />, { state, reducer });
    fireEvent.click(screen.getByRole('button', { name: 'Play Game'}));

    // Assert
    expect(mockActions.startGame).toBeCalled();
  });
  it('should publish on on Play Game', () => {
    // Arrange
    const mockPublish = jest.fn();
    const state = {
      ...initialState,
      remote: true,
      client: {
        publish: mockPublish,
      },
    } as unknown as StateType;
    const reducer = jest.fn(() => ( state ));
    const expectedPublish = {
      destination: '/start',
      body: '{"sessionId":"session-id","name":"Player #1"}',
    };

    // Act
    render(<GameControl />, { state, reducer });
    fireEvent.click(screen.getByRole('button', { name: 'Play Game'}));

    // Assert
    expect(mockPublish).toBeCalledWith(expectedPublish);
  });
});
