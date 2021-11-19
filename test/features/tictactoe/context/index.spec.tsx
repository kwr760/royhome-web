import { act, renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { TicTacToeProvider, useTicTacToe } from '../../../../src/features/tictactoe/context/context.reducer';
import { reset, takeTurn } from '../../../../src/features/tictactoe/context/context.actions';
import { PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import {
  initialGame,
  initialPlayers,
  initialStatus,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { ActionsType, TicTacToeStateType } from '../../../../src/features/tictactoe/contracts/tictactoe.context';

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
      turn: PlayerEnum.One,
    };
    const wrapper = ({ children }: { children: ReactNode}) => <TicTacToeProvider>{children}</TicTacToeProvider>;

    // Act
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    // Assert
    expect(result.current.state).toEqual(expectedState);
  });
  it('should call takeTurn as One', () => {
    // Arrange
    const expectedState = {
      players: initialPlayers,
      game: '-------O-',
      status: initialStatus,
      turn: PlayerEnum.Two,
    };
    const wrapper = ({ children }: { children: ReactNode}) => <TicTacToeProvider>{children}</TicTacToeProvider>;
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const {dispatch} = result.current;
      dispatch(takeTurn({position: 7, player: PlayerEnum.One}));
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(expectedState);
  });
  it('should call takeTurn as Two', () => {
    // Arrange
    const expectedState = {
      players: initialPlayers,
      game: '----X----',
      status: initialStatus,
      turn: PlayerEnum.One,
    };
    const wrapper = ({ children }: { children: ReactNode}) => <TicTacToeProvider>{children}</TicTacToeProvider>;
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const {dispatch} = result.current;
      dispatch(takeTurn({position: 4, player: PlayerEnum.Two}));
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(expectedState);
  });
  it('should call reset', () => {
    // Arrange
    const initialState = {
      players: initialPlayers,
      game: 'X-X-XO--O',
      status: initialStatus,
      turn: PlayerEnum.Two,
    } as TicTacToeStateType;
    const expectedState = {
      players: initialPlayers,
      game: initialGame,
      status: initialStatus,
      turn: PlayerEnum.One,
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
      game: 'X-X-XO--O',
      status: initialStatus,
      turn: PlayerEnum.Two,
    } as TicTacToeStateType;
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
