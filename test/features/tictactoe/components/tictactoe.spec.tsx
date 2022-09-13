import React from 'react';
import { render } from '@testing-library/react';
import TicTacToe from '../../../../src/features/tictactoe/components/tictactoe';

jest.mock('../../../../src/features/tictactoe/components/game-board',
  () => jest.fn(() => 'Game Board'),
);
jest.mock( '../../../../src/features/tictactoe/components/game-header',
  () => jest.fn(() => 'Game Header'),
);

describe('features/tictactoe/components', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(<TicTacToe sessionId="session-id" />);

    // Assert - fake test - test nothing
    getByText(/Game Board/);
  });
});
