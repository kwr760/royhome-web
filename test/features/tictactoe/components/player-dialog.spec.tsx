import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from '@mui/styles';
import PlayerDialog from '../../../../src/features/tictactoe/components/player-dialog';
import {
  initialGame,
  initialPlayers,
  PlayerEnum,
  StatusEnum,
} from '../../../../src/features/tictactoe/constants/tictactoe.constant';
import { TicTacToeProvider } from '../../../../src/features/tictactoe/context';
import themeLight from '../../../../src/theme-light';


describe('feature/tictactoe/component/player-dialog', () => {
  const state = {
    players: initialPlayers,
    game: initialGame,
    status: StatusEnum.Active,
    turn: PlayerEnum.Two,
  };
  const reducer = jest.fn();
  const handleSubmit = jest.fn();
  let openDialog = true;
  const setOpenDialog = jest.fn(open => { openDialog = open; });
  const getComponent = (player: PlayerEnum) => {
    return (
      <ThemeProvider theme={themeLight}>
        <TicTacToeProvider state={state} reducer={reducer}>
          <PlayerDialog
            player={player}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            handleSubmit={handleSubmit}
          />
        </TicTacToeProvider>
      </ThemeProvider>
    );
  };
  it('should render player #1', () => {
    // Arrange // Act
    const { getByText, getByLabelText } = render(getComponent(PlayerEnum.One));
    fireEvent.change(getByLabelText(/Name/), {target: {value: 'Test Name'}});
    fireEvent.click(getByText(/Remote/));

    // Assert
    getByText(/Test Name/);
    expect(openDialog).toBe(true);
  });
  it('should render player #2', () => {
    // Arrange // Act
    const { getByText, getAllByText } = render(getComponent(PlayerEnum.Two));
    fireEvent.click(getByText(/Cancel/));
    fireEvent.click(getAllByText(/Update/)[1]);

    // Assert
    getByText(/Player #2/);
    expect(openDialog).toBe(false);
    expect(handleSubmit).toBeCalled();
  });
});
