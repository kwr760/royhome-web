import { ThemeProvider } from '@mui/styles';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import GameBoard from '../../../../src/features/tictactoe/components/game-board';
import { useTicTacToe } from '../../../../src/features/tictactoe/context/context.provider';
import {
  ActionEnum,
  GameStateEnum,
  PlayerEnum,
  PlayerTypeEnum,
} from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import {
  initialPlayerOne,
  initialPlayerTwo,
  initialState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { themeLight } from '../../../../src/theme-light';

jest.mock( '../../../../src/features/tictactoe/components/game-square',
  () => jest.fn(() => <div>Game Square</div>),
);
jest.mock('../../../../src/features/tictactoe/context/context.provider');

describe('feature/tictactoe/component/game-board', () => {
  const dispatch = jest.fn();
  const getComponent = () => {
    return (
      <ThemeProvider theme={themeLight}>
        <GameBoard />
      </ThemeProvider>
    );
  };
  beforeEach(() => {
    dispatch.mockReset();
  });

  it('should render', () => {
    // Arrange/Act
    const state = {
      ...initialState,
    };
    (useTicTacToe as jest.Mock).mockReturnValue({
      state,
      dispatch,
    });
    const { getAllByText } = render(getComponent());

    // Assert
    const squares = getAllByText(/Game Square/);
    expect(squares.length).toBe(9);
  });
  it('should render after computer one', async () => {
    // Arrange/Act
    const state = {
      ...initialState,
      gameState: GameStateEnum.Active,
      playerOne: {
        ...initialPlayerOne,
        type: PlayerTypeEnum.Computer,
      },
    };
    const expectedDispatch = {
      payload: {
        player: PlayerEnum.One,
        position: expect.any(Number),
      },
      type: ActionEnum.TakeTurn,
    };
    (useTicTacToe as jest.Mock).mockReturnValue({
      state,
      dispatch,
    });
    const { getAllByText } = await render(getComponent());

    // Assert
    const squares = getAllByText(/Game Square/);
    expect(squares.length).toBe(9);
    expect(dispatch).toBeCalledWith(expectedDispatch);
  });
  it('should render after computer two', async () => {
    // Arrange/Act
    const state = {
      ...initialState,
      gameState: GameStateEnum.Active,
      turn: PlayerEnum.Two,
      playerTwo: {
        ...initialPlayerTwo,
        type: PlayerTypeEnum.Computer,
      },
    };
    const expectedDispatch = {
      payload: {
        player: PlayerEnum.Two,
        position: expect.any(Number),
      },
      type: ActionEnum.TakeTurn,
    };
    (useTicTacToe as jest.Mock).mockReturnValue({
      state,
      dispatch,
    });
    const { getAllByText } = await render(getComponent());

    // Assert
    const squares = getAllByText(/Game Square/);
    expect(squares.length).toBe(9);
    expect(dispatch).toBeCalledWith(expectedDispatch);
  });
  it('should render disabled and click to display setup', async () => {
    // Arrange/Act
    const state = {
      ...initialState,
      gameState: GameStateEnum.Exit,
    };
    (useTicTacToe as jest.Mock).mockReturnValue({
      state,
      dispatch,
    });
    const { getByText, getAllByText } = await render(getComponent());
    fireEvent.click(getAllByText('Game Square')[0]);

    // Assert
    getByText(/Play Game/);
  });
  it('should render the message', async () => {
    // Arrange/Act
    const state = {
      ...initialState,
      gameState: GameStateEnum.Message,
    };
    (useTicTacToe as jest.Mock).mockReturnValue({
      state,
      dispatch,
    });
    const { getByText } = await render(getComponent());

    // Assert
    getByText(/The game has yet to begin/);
  });
});
