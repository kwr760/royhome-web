import { act, renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { reset, takeTurn } from '../../../../src/features/tictactoe/context/context.actions';
import { TicTacToeProvider, useTicTacToe } from '../../../../src/features/tictactoe/context/context.provider';
import { PlayerEnum, TurnEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { initialTicTacToeState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { ActionsType } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
import { TicTacToeStateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';

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
      ...initialTicTacToeState,
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
      ...initialTicTacToeState,
      board: '-------O-',
      turn: TurnEnum.Two,
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
      ...initialTicTacToeState,
      board: '----X----',
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
      ...initialTicTacToeState,
      board: 'X-X-XO--O',
      turn: TurnEnum.Two,
    } as TicTacToeStateType;
    const expectedState = {
      ...initialTicTacToeState,
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
      ...initialTicTacToeState,
      board: 'X-X-XO--O',
      turn: TurnEnum.Two,
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
