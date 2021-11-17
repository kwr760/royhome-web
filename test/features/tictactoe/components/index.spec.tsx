import React from 'react';
import { render } from '@testing-library/react';
import TicTacToe from '../../../../src/features/tictactoe/components/tictactoe';

jest.mock('../../../../src/features/tictactoe/components/game-board',
  () => jest.fn(() => 'Game Board'),
);
jest.mock( '../../../../src/features/tictactoe/components/game-header',
  () => jest.fn(() => 'Game Header'),
);
jest.mock( '../../../../src/features/tictactoe/components/game-footer',
  () => jest.fn(() => 'Game Footer'),
);

describe('features/tictactoe/components', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(<TicTacToe />);

    // Assert - fake test - test nothing
    getByText(/Game Board/);
    getByText(/Game Header/);
    getByText(/Game Footer/);
  });
});
