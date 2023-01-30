import React from 'react';
import PlayerType from '../../../../src/features/tictactoe/components/player-type';
import { updatePlayer } from '../../../../src/features/tictactoe/context/context.actions';
import {
  PieceEnum,
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
      type: PlayerTypeEnum.Human,
      piece: PieceEnum.X,
      remote: false,
    };
    const expectedChange = {
      player: {
        name: 'Player #1',
        piece: 'X',
        type: 'computer',
        remote: false,
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
      type: PlayerTypeEnum.Computer,
      piece: PieceEnum.X,
      remote: false,
    };
    const expectedChange = {
      player: {
        name: 'Player #1',
        piece: PieceEnum.X,
        type: PlayerTypeEnum.Human,
        remote: false,
      },
      position: PieceEnum.X,
    };

    // Act
    render(<PlayerType player={player} />);
    fireEvent.click(screen.getByTestId(/player-type/));

    // Assert
    expect(updatePlayer).toBeCalledWith(expectedChange);
  });
});
