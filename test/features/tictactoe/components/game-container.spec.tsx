import React from 'react';
import GameContainer from '../../../../src/features/tictactoe/components/game-container';
import { updateGameState } from '../../../../src/features/tictactoe/context/context.actions';
import { GameStateEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { initialState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { fireEvent, render, screen } from '../utils/testing-library';

jest
  .mock('../../../../src/features/tictactoe/components/game-control',
    () => jest.fn(() => 'Game Control'),
  )
  .mock('../../../../src/features/tictactoe/components/game-status',
    () => jest.fn(() => 'Game Status'),
  )
  .mock('../../../../src/features/tictactoe/components/game-board',
    () => jest.fn(() => 'Game Board'),
  )
  .mock('../../../../src/features/tictactoe/context/context.actions');

describe('features/tictactoe/components/game-container', () => {
  it('should render', () => {
    // Arrange
    const state = {
      ...initialState,
      gameState: GameStateEnum.Exit,
    };
    const reducer = jest.fn(() => ( state ));

    // Act
    render(<GameContainer />, { state, reducer });
    fireEvent.click(screen.getByText(/Game Board/));

    // Assert - fake test - test nothing
    screen.getByText(/Game Control/);
    screen.getByText(/Game Status/);
    screen.getByText(/Game Board/);
    expect(updateGameState).toBeCalledWith(GameStateEnum.Setup);
  });
});
