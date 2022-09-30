import { ThemeProvider } from '@mui/styles';
import { fireEvent, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import GameStatus from '../../../../src/features/tictactoe/components/game-status';
import { logger } from '../../../../src/features/tictactoe/context/context.middleware';
import { TicTacToeProvider, useTicTacToe } from '../../../../src/features/tictactoe/context/context.provider';
import { MiddleWareFunction } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
import { initialState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { themeLight } from '../../../../src/theme-light';

describe('feature/tictactoe/context/context.provider', () => {
  let openStatus = true;
  const setOpenStatus = jest.fn(open => {
    openStatus = open;
  });
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
          <GameStatus
            openStatus={openStatus}
            setOpenStatus={setOpenStatus}
          />
        </TicTacToeProvider>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    jest.resetAllMocks();
    global.console.log = jest.fn();
  });

  it('should throw exception without provider', () => {
    // Arrange
    const wrapper = ({ children }: { children: ReactNode}) => <>{children}</>;
    const expectedError = Error('useTicTacToe must be used within a TicTacToeProvider');

    // Act
    const { result } = renderHook(() => useTicTacToe(), {wrapper});

    expect(result.error).toEqual(expectedError);
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
    };
    const reducer = jest.fn(() => ( mockState ));
    const log = {
      payload: {
        payload: {
          gameState: 'exit',
        },
        type: 'updateGameStatus',
      },
      state: {
        board: '---------',
        client: null,
        gameState: 'setup',
        playerOne: {
          name: 'Player #1',
          piece: 'X',
          playerState: 'active',
          type: 'human',
        },
        playerTwo: {
          name: 'Player #2',
          piece: 'O',
          playerState: 'wait',
          type: 'human',
        },
        sessionId: 'session-id',
        turn: 'X',
      },
    };
    const log1 = {
      ...log,
      name: 'action->state before',
    };
    const log2 = {
      ...log,
      name: 'action->state after',
      state: {
        ...log.state,
        sessionId: '',
      },
    };

    // Act
    const { getByRole } = render(getComponent(mockState, reducer, [beforeLogger], [afterLogger]));
    fireEvent.click(getByRole('button', { name: 'Exit'}));

    // Assert
    expect(global.console.log).toHaveBeenNthCalledWith(1, log1.name, log1.payload, log1.state );
    expect(global.console.log).toHaveBeenNthCalledWith(2, log2.name, log2.payload, log2.state );
  });
});
