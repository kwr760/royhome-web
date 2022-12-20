import React from 'react';
import PlayerControl from '../../../../src/features/tictactoe/components/player-control';
import {
  PlayerEnum,
  PlayerStateEnum,
  PlayerTypeEnum,
} from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { render, screen } from '../utils/testing-library';

jest
  .mock('../../../../src/features/tictactoe/components/player-name',
    () => jest.fn(() => 'Player Name'),
  )
  .mock('../../../../src/features/tictactoe/components/player-type',
    () => jest.fn(() => 'Player Type'),
  )
  .mock('../../../../src/features/tictactoe/components/player-remote',
    () => jest.fn(() => 'Remote'),
  );

describe('features/tictactoe/components/player-control', () => {
  it('should render', () => {
    // Arrange
    const player = {
      name: 'Player #1',
      playerState: PlayerStateEnum.Active,
      type: PlayerTypeEnum.Human,
      piece: PlayerEnum.One,
      remote: false,
    };

    // Act
    render(<PlayerControl player={player} displayRemote />);

    // Assert - fake test - test nothing
    screen.getByText(/Player Name/);
    screen.getByText(/Player Type/);
    screen.getByText(/Remote/);
  });
  it('should render without remote', () => {
    // Arrange
    const player = {
      name: 'Player #1',
      playerState: PlayerStateEnum.Active,
      type: PlayerTypeEnum.Human,
      piece: PlayerEnum.One,
      remote: false,
    };

    // Act
    render(<PlayerControl player={player} />);

    // Assert - fake test - test nothing
    screen.getByText(/Player Name/);
    screen.getByText(/Player Type/);
    expect(screen.queryByText(/Remote/)).toBeFalsy();
  });
});
