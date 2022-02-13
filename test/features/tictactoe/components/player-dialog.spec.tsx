import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from '@mui/styles';
import PlayerDialog from '../../../../src/features/tictactoe/components/player-dialog';
import { PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import {
  initialPlayerOne,
  initialTicTacToeState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { TicTacToeProvider } from '../../../../src/features/tictactoe/context/context.provider';
import { Player } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { themeLight } from '../../../../src/theme-light';

describe('feature/tictactoe/component/player-dialog', () => {
  const state = {
    ...initialTicTacToeState,
    turn: PlayerEnum.Two,
  };
  const reducer = jest.fn();
  const handleSubmit = jest.fn();
  let openDialog = true;
  const setOpenDialog = jest.fn(open => { openDialog = open; });
  const getComponent = (player: Player) => {
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
    // Arrange
    const player = initialPlayerOne;

    // Act
    const { getByText, getByLabelText } = render(getComponent(player));
    fireEvent.change(getByLabelText(/Name/), {target: {value: 'Test Name'}});
    fireEvent.click(getByText(/remote/));

    // Assert
    getByText(/Test Name/);
    expect(openDialog).toBe(true);
  });
  it('should render player #2', () => {
    // Arrange
    const player = initialPlayerOne;

    // Act
    const { getByText, getAllByText } = render(getComponent(player));
    fireEvent.click(getByText(/Cancel/));
    fireEvent.click(getAllByText(/Update/)[1]);

    // Assert
    getByText(/Player #1/);
    expect(openDialog).toBe(false);
    expect(handleSubmit).toBeCalled();
  });
});
