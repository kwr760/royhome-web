import { act, renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { TicTacToeProvider, useTicTacToe } from '../../../../src/feature/tictactoe/context';
import { reset, takeTurn } from '../../../../src/feature/tictactoe/context/context.actions';
import {
  initialGame,
  initialPlayers,
  initialStatus,
} from '../../../../src/feature/tictactoe/context/tictactoe.constant';
import { ActionsType, PlayerType, StateType } from '../../../../src/feature/tictactoe/type/tictactoe';

describe('feature/tictactoe/context/index', () => {
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
      players: initialPlayers,
      game: initialGame,
      status: initialStatus,
    };
    const wrapper = ({ children }: { children: ReactNode}) => <TicTacToeProvider>{children}</TicTacToeProvider>;

    // Act
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    // Assert
    expect(result.current.state).toEqual(expectedState);
  });
  it('should call takeTurn', () => {
    // Arrange
    const expectedState = {
      players: initialPlayers,
      game: [
        [null, null, null],
        [null, 1, null],
        [null, null, null],
      ],
      status: {
        ...initialStatus,
        turn: 1 as PlayerType,
      },
    };
    const wrapper = ({ children }: { children: ReactNode}) => <TicTacToeProvider>{children}</TicTacToeProvider>;
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const {dispatch} = result.current;
      dispatch(takeTurn({row: 1, col: 1, player: 1}));
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(expectedState);
  });
  it('should call reset', () => {
    // Arrange
    const initialState = {
      players: initialPlayers,
      game: [
        [1, null, 1],
        [null, 1, 0],
        [null, null, 0],
      ],
      status: {
        ...initialStatus,
        turn: 1 as PlayerType,
      },
    } as StateType;
    const expectedState = {
      players: initialPlayers,
      game: initialGame,
      status: initialStatus,
    };
    const wrapper = ({ children }: { children: ReactNode}) =>
      <TicTacToeProvider state={initialState}>{children}</TicTacToeProvider>;
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const { dispatch } = result.current;
      dispatch( reset());
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(expectedState);
  });
  it('should call return initialState with unknown type', () => {
    // Arrange
    const initialState = {
      players: initialPlayers,
      game: [
        [1, null, 1],
        [null, 1, 0],
        [null, null, 0],
      ],
      status: {
        ...initialStatus,
        turn: 1 as PlayerType,
      },
    } as StateType;
    const wrapper = ({ children }: { children: ReactNode}) =>
      <TicTacToeProvider state={initialState}>{children}</TicTacToeProvider>;
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const { dispatch } = result.current;
      dispatch( {type: 'unknown'} as unknown as ActionsType);
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(initialState);
  });
});
