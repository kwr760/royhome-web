import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import PlayerDialog from '../../../../src/features/tictactoe/components/player-dialog';
import {
  initialGame,
  initialPlayers,
  PlayerEnum,
  StatusEnum,
} from '../../../../src/features/tictactoe/constants/tictactoe.constant';
import { TicTacToeProvider } from '../../../../src/features/tictactoe/context';

describe('feature/tictactoe/component/player-dialog', () => {
  const state = {
    players: initialPlayers,
    game: initialGame,
    status: StatusEnum.Active,
    turn: PlayerEnum.Two,
  };
  const reducer = jest.fn();
  let openDialog = true;
  const setOpenDialog = jest.fn(open => { openDialog = open; });
  const getComponent = (player: PlayerEnum) => {
    return (
      <TicTacToeProvider state={state} reducer={reducer}>
        <PlayerDialog player={player} openDialog={openDialog} setOpenDialog={setOpenDialog}/>
      </TicTacToeProvider>
    );
  };
  it('should render player #1', () => {
    // Arrange // Act
    const { getByText } = render(getComponent(PlayerEnum.One));

    // Assert
    getByText(/Player #1/);
    expect(openDialog).toBe(true);
  });
  it('should render player #2', () => {
    // Arrange // Act
    const { getByText } = render(getComponent(PlayerEnum.Two));
    fireEvent.click(getByText(/Cancel/));

    // Assert
    getByText(/Player #2/);
    expect(openDialog).toBe(false);
  });
});
