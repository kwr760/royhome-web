import React from 'react';
import PlayerRemote from '../../../../src/features/tictactoe/components/player-remote';
import { updateRemoteGame } from '../../../../src/features/tictactoe/context/context.actions';
import { initialState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { fireEvent, render, screen } from '../utils/testing-library';

jest.mock('../../../../src/features/tictactoe/context/context.actions');

describe('features/tictactoe/components/player-remote', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should display the player-remote control', () => {
    // Arrange
    const state = {
      ...initialState,
    };
    const reducer = jest.fn(() => ( state ));

    // Act
    render(<PlayerRemote />, { state, reducer });
    fireEvent.click(screen.getByRole('checkbox'));

    // Assert
    expect(updateRemoteGame).toBeCalledWith(true);
  });
});
