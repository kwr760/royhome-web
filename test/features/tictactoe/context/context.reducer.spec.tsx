import { act, renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import {
  initWebSocket,
  remote,
  resetGame,
  startGame,
  takeTurn,
  updateGameState,
  updatePlayer,
} from '../../../../src/features/tictactoe/context/context.actions';
import { TicTacToeProvider, useTicTacToe } from '../../../../src/features/tictactoe/context/context.provider';
import { ActionsType } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
import { GameStateEnum, PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import {
  initialPlayerOne,
  initialPlayerTwo,
  initialState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';

jest.mock('../../../../src/features/tictactoe/context/context.stomp.ts');

describe('feature/tictactoe/context/context.reducer', () => {
  const createWrapper = (testState: StateType | undefined) => {
    // eslint-disable-next-line react/display-name
    return ({ children }: { children: ReactNode }) =>
      <TicTacToeProvider sessionId="" user={{}} state={testState}>{children}</TicTacToeProvider>;
  };
  beforeEach(() => {
    global.console.log = jest.fn();
  });
  afterEach(() => {
    (global.console.log as jest.Mock).mockRestore();
  });
  it('should call takeTurn as One', () => {
    // Arrange
    const testState = {
      ...initialState,
      board: 'O-O-XOX-X',
      turn: PlayerEnum.One,
      gameState: GameStateEnum.Active,
    } as StateType;
    const expectedState = {
      ...initialState,
      board: 'O-O-XOXXX',
      turn: PlayerEnum.Two,
      gameState: GameStateEnum.Completed,
    };
    const wrapper = createWrapper(testState);
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
    const testState = {
      ...initialState,
      board: 'O-OO-OXOX',
      turn: PlayerEnum.Two,
      gameState: GameStateEnum.Active,
    } as StateType;
    const expectedState = {
      ...initialState,
      board: 'O-OOOOXOX',
      gameState: GameStateEnum.Completed,
    };
    const wrapper = createWrapper(testState);
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
    const testState = {
      ...initialState,
      board: 'O-OO-OXOX',
      turn: PlayerEnum.Two,
      gameState: GameStateEnum.Setup,
    } as StateType;
    const wrapper = createWrapper(testState);
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const {dispatch} = result.current;
      dispatch(takeTurn({position: 4, player: PlayerEnum.Two}));
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(testState);
  });
  it('should call reset', () => {
    // Arrange
    const testState = {
      ...initialState,
      board: 'X-X-XO--O',
      turn: PlayerEnum.Two,
    } as StateType;
    const expectedState = {
      ...initialState,
    };
    const wrapper = createWrapper(testState);
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
    const testState = {
      ...initialState,
    } as StateType;
    const expectedState = {
      ...initialState,
      gameState: GameStateEnum.Active,
    };
    const wrapper = createWrapper(testState);
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
    const testState = {
      ...initialState,
      gameState: GameStateEnum.Active,
    } as StateType;
    const newPlayer = {
      ...initialPlayerOne,
      name: 'New Name',
    };
    const expectedState = {
      ...initialState,
      gameState: GameStateEnum.Active,
      playerOne: newPlayer,
    };
    const wrapper = createWrapper(testState);
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
    const testState = {
      ...initialState,
      gameState: GameStateEnum.Active,
    } as StateType;
    const newPlayer = {
      ...initialPlayerTwo,
      name: 'New Name',
    };
    const expectedState = {
      ...initialState,
      gameState: GameStateEnum.Active,
      playerTwo: newPlayer,
    };
    const wrapper = createWrapper(testState);
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const { dispatch } = result.current;
      dispatch( updatePlayer({ position: PlayerEnum.Two, player: newPlayer }));
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(expectedState);
  });
  it('should call initWebSocket', () => {
    // Arrange
    const callback = jest.fn();
    const destination = 'game/session-id';
    const testState = {
      ...initialState,
    } as StateType;
    const expectedState = {
      ...initialState,
      client: undefined,
    };
    const wrapper = createWrapper(testState);
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const { dispatch } = result.current;
      dispatch( initWebSocket({ client: null, destination, callback } ));
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(expectedState);
    // expect(client).toBeCalledWith(destination);
  });
  it('should call remote', () => {
    // Arrange
    const message = 'This is a message';
    const testState = {
      ...initialState,
    } as StateType;
    const expectedState = {
      ...initialState,
      message,
    };
    const wrapper = createWrapper(testState);
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const { dispatch } = result.current;
      dispatch( remote({ message }));
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(expectedState);
  });
  it('should return state when unknown', () => {
    // Arrange
    const testState = {
      ...initialState,
      board: 'X-X-XO--O',
      turn: PlayerEnum.Two,
    } as StateType;
    const wrapper = createWrapper(testState);
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const { dispatch } = result.current;
      dispatch( {type: 'unknown'} as unknown as ActionsType);
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(testState);
  });
  it('should call updateGameState', () => {
    // Arrange
    const testState = {
      ...initialState,
    } as StateType;
    const expectedState = {
      ...initialState,
      gameState: GameStateEnum.Message,
    };
    const wrapper = createWrapper(testState);
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const { dispatch } = result.current;
      dispatch( updateGameState(GameStateEnum.Message));
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(expectedState);
  });
});
