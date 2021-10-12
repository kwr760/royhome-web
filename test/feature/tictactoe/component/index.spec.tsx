import React from 'react';
import { render } from '@testing-library/react';
import { GameBoard } from '../../../../src/feature/tictactoe/component/game-board';
import Index from '../../../../src/feature/tictactoe/component';

jest.mock('../../../../src/feature/tictactoe/component/game-board');

describe('feature/tictactoe/component', () => {
  beforeEach(() => {
    (GameBoard as jest.Mock).mockReturnValue('Game Board');
  });
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(<Index />);

    // Assert - fake test - test nothing
    getByText(/Game Board/);
  });
});
