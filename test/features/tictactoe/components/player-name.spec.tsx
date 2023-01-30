import React from 'react';
import PlayerName from '../../../../src/features/tictactoe/components/player-name';
import { updatePlayer } from '../../../../src/features/tictactoe/context/context.actions';
import {
  PieceEnum,
  PlayerTypeEnum,
} from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { fireEvent, render, screen } from '../utils/testing-library';

jest.mock('../../../../src/features/tictactoe/context/context.actions');

describe('features/tictactoe/components/player-name', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should display the player-name control', () => {
    // Arrange
    const player = {
      name: 'Player #1',
      type: PlayerTypeEnum.Human,
      piece: PieceEnum.X,
      remote: false,
    };
    const expectedChange = {
      player: {
        name: 'First',
        piece: PieceEnum.X,
        type: PlayerTypeEnum.Human,
        remote: false,
      },
      position: PieceEnum.X,
    };

    // Act
    render(<PlayerName player={player} />);
    fireEvent.blur(screen.getByLabelText(/Player X/), {target: {value: 'First'}});

    // Assert
    expect(updatePlayer).toBeCalledWith(expectedChange);
  });
});
