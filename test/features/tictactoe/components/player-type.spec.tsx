import React from 'react';
import PlayerType from '../../../../src/features/tictactoe/components/player-type';
import { updatePlayer } from '../../../../src/features/tictactoe/context/context.actions';
import {
  PlayerEnum,
  PlayerStateEnum,
  PlayerTypeEnum,
} from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { fireEvent, render, screen } from '../utils/testing-library';

jest.mock('../../../../src/features/tictactoe/context/context.actions');

describe('features/tictactoe/components/player-type', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should display the player-type control', () => {
    // Arrange
    const player = {
      name: 'Player #1',
      playerState: PlayerStateEnum.Active,
      type: PlayerTypeEnum.Human,
      piece: PlayerEnum.One,
    };
    const expectedChange = {
      player: {
        name: 'Player #1',
        piece: 'X',
        playerState: 'active',
        type: 'computer',
      },
      position: 'X',
    };

    // Act
    render(<PlayerType player={player} />);
    fireEvent.click(screen.getByTestId(/player-type/));

    // Assert
    expect(updatePlayer).toBeCalledWith(expectedChange);
  });
  it('should change back to human', () => {
    // Arrange
    const player = {
      name: 'Player #1',
      playerState: PlayerStateEnum.Active,
      type: PlayerTypeEnum.Computer,
      piece: PlayerEnum.One,
    };
    const expectedChange = {
      player: {
        name: 'Player #1',
        piece: PlayerEnum.One,
        playerState: PlayerStateEnum.Active,
        type: PlayerTypeEnum.Human,
      },
      position: PlayerEnum.One,
    };

    // Act
    render(<PlayerType player={player} />);
    fireEvent.click(screen.getByTestId(/player-type/));

    // Assert
    expect(updatePlayer).toBeCalledWith(expectedChange);
  });
});
