import React from 'react';
import { render } from '@testing-library/react';
import { GameBoard } from '../../../../src/feature/tictactoe/component/game-board';
import { GameSquare } from '../../../../src/feature/tictactoe/component/game-square';

jest.mock('../../../../src/feature/tictactoe/component/game-square');

describe('feature/tictactoe/component/game-board', () => {
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
