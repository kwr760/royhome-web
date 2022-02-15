import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { render } from '@testing-library/react';
import GameBoard from '../../../../src/features/tictactoe/components/game-board';
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
import { useTicTacToe } from '../../../../src/features/tictactoe/context/context.provider';

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
});
