import { ThemeProvider } from '@mui/styles';
import { fireEvent, render, renderHook } from '@testing-library/react';
import React, { ReactNode } from 'react';
import GameStatus from '../../../../src/features/tictactoe/components/game-status';
import { logger } from '../../../../src/features/tictactoe/middleware/logger.middleware';
import { TicTacToeProvider, useTicTacToe } from '../../../../src/features/tictactoe/context/context.provider';
import { MiddleWareFunction } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
import { GameStateEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { initialState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { themeLight } from '../../../../src/theme-light';

describe('feature/tictactoe/context/context.provider', () => {
  const getComponent = (
    state: StateType,
    reducer: React.Reducer<unknown, unknown>,
    beforeWare: MiddleWareFunction[],
    afterWare: MiddleWareFunction[],
  ) => {
    return (
      <ThemeProvider theme={themeLight}>
        <TicTacToeProvider
          sessionId={'session-id'}
          state={state}
          reducer={reducer}
          beforeware={beforeWare}
          afterware={afterWare}
        >
          <GameStatus />
        </TicTacToeProvider>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    jest.resetAllMocks();
    global.console.log = jest.fn();
    global.console.error = jest.fn();
  });

  it('should throw exception without provider', () => {
    // Arrange
    const wrapper = ({ children }: { children: ReactNode}) => <>{children}</>;
    const expectedError = Error('useTicTacToe must be used within a TicTacToeProvider');

    // Act
    try {
      renderHook(() => useTicTacToe(), {wrapper});
      expect(false).toBe(true);
    } catch (error) {
      // Assert
      expect(error).toEqual(expectedError);
    }
  });
  it('should set context with default state', () => {
    // Arrange
    const expectedState = {
      ...initialState,
      sessionId: 'session-id',
    };
    const wrapper = ({ children }: { children: ReactNode}) =>
      <TicTacToeProvider
        sessionId="session-id"
        afterware={[logger()]}
      >
        {children}
      </TicTacToeProvider>;

    // Act
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    // Assert
    expect(result.current.state).toEqual(expectedState);
  });
  it('should set provide with before and after ware', () => {
    // Arrange
    const beforeLogger = logger('before');
    const afterLogger = logger('after');
    const mockState = {
      ...initialState,
      gameState: GameStateEnum.Welcome,
    };
    const reducer = jest.fn(() => ( mockState ));
    const log = {
      payload: {
        payload: {
          gameState: GameStateEnum.Exit,
        },
        type: 'updateGameStatus',
      },
      state: {
        board: '---------',
        client: null,
        gameState: GameStateEnum.Welcome,
        playerOne: {
          name: 'Player #1',
          piece: 'X',
          playerState: 'active',
          type: 'human',
        },
        playerTwo: {
          name: expect.any(String),
          piece: 'O',
          playerState: 'wait',
          type: 'human',
        },
        sessionId: 'session-id',
        turn: 'X',
        remote: false,
      },
    };

    // Act
    const { getAllByRole } = render(getComponent(mockState, reducer, [beforeLogger], [afterLogger]));
    const buttons = getAllByRole('button');
    fireEvent.click(buttons[0]);

    // Assert
    expect(global.console.log).toHaveBeenNthCalledWith(1, 'action->state before', log.payload, expect.anything());
    expect(global.console.log).toHaveBeenNthCalledWith(2, 'action->state after', log.payload, expect.anything());
  });
});
