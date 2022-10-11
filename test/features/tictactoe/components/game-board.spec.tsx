import React from 'react';
import GameBoard from '../../../../src/features/tictactoe/components/game-board';
import { render, screen } from '../utils/testing-library';

jest.mock( '../../../../src/features/tictactoe/components/game-square',
  () => jest.fn(() => <div>Game Square</div>),
)
  .mock('../../../../src/features/tictactoe/hooks/use-ai')
  .mock('../../../../src/features/tictactoe/hooks/use-websocket')
;

describe('feature/tictactoe/component/game-board', () => {
  it('should render', () => {
    // Arrange // Act
    render(<GameBoard />);

    // Assert
    const squares = screen.getAllByText(/Game Square/);
    expect(squares.length).toBe(9);
  });
});
