import React from 'react';
import { render } from '@testing-library/react';
import GameSquare from '../../../../src/feature/tictactoe/component/game-square';

describe('feature/tictactoe/component/game-square', () => {
  it('should render', () => {
    // Arrange/Act
    const { queryByRole } = render(
      <GameSquare row={1} column={1} />,
    );

    // Assert - fake test - test nothing
    queryByRole(/Tic-Tac-Toe/);
  });
});
