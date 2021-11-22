import { act, renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { reset, takeTurn } from '../../../../src/features/tictactoe/context/context.actions';
import { TicTacToeProvider, useTicTacToe } from '../../../../src/features/tictactoe/context/context.provider';
import { GameStateEnum, PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { initialTicTacToeState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { ActionsType } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
import { TicTacToeStateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';

describe('feature/tictactoe/context/context.reducer', () => {
  it('should call takeTurn as One', () => {
    // Arrange
    const initialState = {
      ...initialTicTacToeState,
      board: 'O-O-XOX-X',
      turn: PlayerEnum.One,
    } as TicTacToeStateType;
    const expectedState = {
      ...initialTicTacToeState,
      board: 'O-O-XOXXX',
      turn: PlayerEnum.Two,
      gameState: GameStateEnum.Win,
    };
    const wrapper = ({ children }: { children: ReactNode }) =>
      <TicTacToeProvider state={initialState}>{children}</TicTacToeProvider>;
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
    const initialState = {
      ...initialTicTacToeState,
      board: 'O-OO-OXOX',
      turn: PlayerEnum.Two,
    } as TicTacToeStateType;
    const expectedState = {
      ...initialTicTacToeState,
      board: 'O-OOOOXOX',
      gameState: GameStateEnum.Win,
    };
    const wrapper = ({ children }: { children: ReactNode }) =>
      <TicTacToeProvider state={initialState}>{children}</TicTacToeProvider>;
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
      turn: PlayerEnum.Two,
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
  it('should return state when unknown', () => {
    // Arrange
    const initialState = {
      ...initialTicTacToeState,
      board: 'X-X-XO--O',
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
