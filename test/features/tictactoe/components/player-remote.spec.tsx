import React from 'react';
import PlayerRemote from '../../../../src/features/tictactoe/components/player-remote';
import { render, screen } from '../utils/testing-library';

describe('features/tictactoe/components/player-remote', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should display the player-remote control', () => {
    // Arrange // Act
    render(<PlayerRemote />);

    // Assert
    screen.getByRole(/checkbox/);
  });
});
