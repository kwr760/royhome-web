import React from 'react';
import { render } from '@testing-library/react';
import GameBoard from './game-board';
import Index from './index';

jest.mock('./game-board');

describe('component/tictactoe', () => {
  beforeEach(() => {
    (GameBoard as jest.Mock).mockReturnValue('Game Board');
  });
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <Index />,
    );

    // Assert - fake test - test nothing
    getByText(/Game Board/);
  });
});
