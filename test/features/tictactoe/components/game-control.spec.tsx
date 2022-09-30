import { ThemeProvider } from '@mui/styles';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import GameControl from '../../../../src/features/tictactoe/components/game-control';
import { startGame, updateGameState, updatePlayer } from '../../../../src/features/tictactoe/context/context.actions';
import { TicTacToeProvider } from '../../../../src/features/tictactoe/context/context.provider';

import { GameStateEnum, PlayerTypeEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { initialPlayerTwo, initialState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { themeLight } from '../../../../src/theme-light';

jest.mock('../../../../src/features/tictactoe/context/context.actions');

describe('feature/tictactoe/component/game-control', () => {
  let openDialog = true;
  const setOpenDialog = jest.fn(open => {
    openDialog = open;
  });
  const getComponent = (state: StateType, reducer: React.Reducer<unknown, unknown>) => {
    return (
      <ThemeProvider theme={themeLight}>
        <TicTacToeProvider state={state} reducer={reducer}>
          <GameControl
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        </TicTacToeProvider>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    jest.resetAllMocks();
    global.console.log = jest.fn();
  });
  it('should render', () => {
    // Arrange
    const state = {
      ...initialState,
    };
    const reducer = jest.fn(() => ( state ));

    // Act
    const { getByLabelText } = render(getComponent(state, reducer));

    // Assert
    getByLabelText(/Player X/);
    getByLabelText(/Player O/);
    expect(openDialog).toBe(true);
  });
  it('should dispatch updateGameState on Close', () => {
    // Arrange
    const state = {
      ...initialState,
    };
    const reducer = jest.fn(() => ( state ));

    // Act
    const { getByRole } = render(getComponent(state, reducer));
    fireEvent.click(getByRole('button', { name: 'Close'}));

    // Assert
    expect(updateGameState).toBeCalledWith(GameStateEnum.Message);
    expect(setOpenDialog).toBeCalledWith(false);
  });
  it('should dispatch updateGame on Play Game', () => {
    // Arrange
    const state = {
      ...initialState,
    };
    const reducer = jest.fn(() => ( state ));
    const expectNameXChange = {
      player: {
        name: 'First',
        piece: 'X',
        playerState: 'active',
        type: 'human',
      },
      position: 'X',
    };
    const expectNameOChange = {
      player: {
        name: 'Second',
        piece: 'O',
        playerState: 'wait',
        type: 'human',
      },
      position: 'O',
    };

    // Act
    const { getByLabelText, getByRole, rerender } = render(getComponent(state, reducer));
    fireEvent.blur(getByLabelText(/Player X/), {target: {value: 'First'}});
    fireEvent.blur(getByLabelText(/Player O/), {target: {value: 'Second'}});
    fireEvent.click(getByRole('button', { name: 'Play Game'}));
    rerender(getComponent(state, reducer));

    // Assert
    expect(startGame).toBeCalled();
    expect(setOpenDialog).toBeCalledWith(false);
    expect(updatePlayer).toHaveBeenNthCalledWith(1, expectNameXChange);
    expect(updatePlayer).toHaveBeenNthCalledWith(2, expectNameOChange);
  });
  it('should dispatch updateGame on Change player one type', () => {
    // Arrange
    const state = {
      ...initialState,
    };
    const reducer = jest.fn(() => (state));
    const expectTypeXChange = {
      player: {
        name: 'Player #1',
        piece: 'X',
        playerState: 'active',
        type: 'computer',
      },
      position: 'X',
    };

    // Act
    const { getByTestId } = render(getComponent(state, reducer));
    fireEvent.click(getByTestId(/player-one-type/));

    // Assert
    expect(updatePlayer).toHaveBeenNthCalledWith(1, expectTypeXChange);
  });
  it('should dispatch updateGame on Change player two type', () => {
    // Arrange
    const state = {
      ...initialState,
      playerTwo: {
        ...initialPlayerTwo,
        type: PlayerTypeEnum.Computer,
      },
    };
    const reducer = jest.fn(() => (state));
    const expectTypeOChange = {
      player: {
        name: 'Player #2',
        piece: 'O',
        playerState: 'wait',
        type: 'human',
      },
      position: 'O',
    };

    // Act
    const { getByTestId } = render(getComponent(state, reducer));
    fireEvent.click(getByTestId(/player-two-type/));

    // Assert
    expect(updatePlayer).toHaveBeenCalledWith(expectTypeOChange);
  });
});
