import React from 'react';
import TicTacToe from '../../../../src/features/tictactoe/components/tictactoe';
import { render } from '../utils/testing-library';

jest.mock('../../../../src/features/tictactoe/components/game-container',
  () => jest.fn(() => 'Game Container'),
);

describe('features/tictactoe/components', () => {
  it('should render', () => {
    // Arrange
    const user = {
      userId: 'user-id',
    };
    // Act
    const { getByText } = render(
      <TicTacToe
        sessionId="session-id"
        user={user}
      />,
    );

    // Assert - fake test - test nothing
    getByText(/Game Container/);
  });
});
