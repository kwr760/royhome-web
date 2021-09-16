import React from 'react';
import { render } from '@testing-library/react';
import GameBoard from './game-board';
import GameSquare from './game-square';

jest.mock('./game-square');

describe('component/tictactoe/game-board', () => {
  beforeEach(() => {
    (GameSquare as jest.Mock).mockReturnValue('Game Square');
  });
  it('should render', () => {
    // Arrange/Act
    const { getAllByText } = render(
      <GameBoard />,
    );

    // Assert
    const squares = getAllByText(/Game Square/);
    expect(squares.length).toBe(9);
  });
});
