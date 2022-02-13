import { act, renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import {
  resetGame,
  startGame,
  takeTurn,
  updatePlayer,
} from '../../../../src/features/tictactoe/context/context.actions';
import { TicTacToeProvider, useTicTacToe } from '../../../../src/features/tictactoe/context/context.provider';
import { ActionsType } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
import { GameStateEnum, PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import {
  initialPlayerOne, initialPlayerTwo,
  initialTicTacToeState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { TicTacToeStateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';

describe('feature/tictactoe/context/context.reducer', () => {
  it('should call takeTurn as One', () => {
    // Arrange
    const initialState = {
      ...initialTicTacToeState,
      board: 'O-O-XOX-X',
      turn: PlayerEnum.One,
      gameState: GameStateEnum.Active,
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
      gameState: GameStateEnum.Active,
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
  it('should not takeTurn if game is not Active', () => {
    // Arrange
    const initialState = {
      ...initialTicTacToeState,
      board: 'O-OO-OXOX',
      turn: PlayerEnum.Two,
      gameState: GameStateEnum.Ready,
    } as TicTacToeStateType;
    const wrapper = ({ children }: { children: ReactNode }) =>
      <TicTacToeProvider state={initialState}>{children}</TicTacToeProvider>;
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const {dispatch} = result.current;
      dispatch(takeTurn({position: 4, player: PlayerEnum.Two}));
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(initialState);
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
      dispatch( resetGame());
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(expectedState);
  });
  it('should call start', () => {
    // Arrange
    const initialState = {
      ...initialTicTacToeState,
    } as TicTacToeStateType;
    const expectedState = {
      ...initialTicTacToeState,
      gameState: GameStateEnum.Active,
    };
    const wrapper = ({ children }: { children: ReactNode}) =>
      <TicTacToeProvider state={initialState}>{children}</TicTacToeProvider>;
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const { dispatch } = result.current;
      dispatch( startGame());
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(expectedState);
  });
  it('should call update player #1', () => {
    // Arrange
    const initialState = {
      ...initialTicTacToeState,
      gameState: GameStateEnum.Active,
    } as TicTacToeStateType;
    const newPlayer = {
      ...initialPlayerOne,
      name: 'New Name',
    };
    const expectedState = {
      ...initialState,
      gameState: GameStateEnum.Active,
      playerOne: newPlayer,
    };
    const wrapper = ({ children }: { children: ReactNode}) =>
      <TicTacToeProvider state={initialState}>{children}</TicTacToeProvider>;
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const { dispatch } = result.current;
      dispatch( updatePlayer({ position: PlayerEnum.One, player: newPlayer }));
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(expectedState);
  });
  it('should call update player #2', () => {
    // Arrange
    const initialState = {
      ...initialTicTacToeState,
      gameState: GameStateEnum.Active,
    } as TicTacToeStateType;
    const newPlayer = {
      ...initialPlayerTwo,
      name: 'New Name',
    };
    const expectedState = {
      ...initialState,
      gameState: GameStateEnum.Active,
      playerTwo: newPlayer,
    };
    const wrapper = ({ children }: { children: ReactNode}) =>
      <TicTacToeProvider state={initialState}>{children}</TicTacToeProvider>;
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const { dispatch } = result.current;
      dispatch( updatePlayer({ position: PlayerEnum.Two, player: newPlayer }));
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
