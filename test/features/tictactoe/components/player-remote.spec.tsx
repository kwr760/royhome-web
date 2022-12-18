import React from 'react';
import PlayerRemote from '../../../../src/features/tictactoe/components/player-remote';
import { updatePlayer } from '../../../../src/features/tictactoe/context/context.actions';
import {
  PlayerEnum,
  PlayerStateEnum,
  PlayerTypeEnum,
} from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { fireEvent, render, screen } from '../utils/testing-library';

jest.mock('../../../../src/features/tictactoe/context/context.actions');

describe('features/tictactoe/components/player-remote', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should display the player-remote control', () => {
    // Arrange
    const player = {
      name: 'Player #1',
      playerState: PlayerStateEnum.Active,
      type: PlayerTypeEnum.Human,
      piece: PlayerEnum.One,
      remote: false,
    };
    const expectedChange = {
      player: {
        ...player,
        remote: true,
      },
      position: PlayerEnum.One,
    };

    // Act
    render(<PlayerRemote player={player} />);
    fireEvent.click(screen.getByRole(/checkbox/));

    // Assert
    expect(updatePlayer).toBeCalledWith(expectedChange);
  });
});
