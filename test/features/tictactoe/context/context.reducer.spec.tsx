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
  updateRemoteGame,
} from '../../../../src/features/tictactoe/context/context.actions';
import { TicTacToeProvider, useTicTacToe } from '../../../../src/features/tictactoe/context/context.provider';
import { messageReducer } from '../../../../src/features/tictactoe/context/message.reducer';
import { ActionTypes } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
import { GameStateEnum, PieceEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import {
  initialPlayerOne,
  initialPlayerTwo,
  initialState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';

jest
  .mock('../../../../src/features/tictactoe/context/context.stomp.ts')
  .mock('../../../../src/features/tictactoe/context/message.reducer.ts')
;

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
      gameState: GameStateEnum.Active,
    } as StateType;
    const expectedState = {
      ...initialState,
      board: '-------X-',
      gameState: GameStateEnum.Active,
    };
    const wrapper = createWrapper(testState);
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const {dispatch} = result.current;
      dispatch(takeTurn({position: 7, player: PieceEnum.X}));
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
      gameState: GameStateEnum.Active,
    } as StateType;
    const expectedState = {
      ...initialState,
      board: '----O----',
      gameState: GameStateEnum.Active,
    };
    const wrapper = createWrapper(testState);
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const {dispatch} = result.current;
      dispatch(takeTurn({position: 4, player: PieceEnum.O}));
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(expectedState);
  });
  it('should not takeTurn if game is not Active', () => {
    // Arrange
    const testState = {
      ...initialState,
      board: '----O----',
      gameState: GameStateEnum.Setup,
    } as StateType;
    const wrapper = createWrapper(testState);
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const {dispatch} = result.current;
      dispatch(takeTurn({position: 4, player: PieceEnum.O}));
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
      gameState: GameStateEnum.Wait,
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
      dispatch( updatePlayer({ position: PieceEnum.X, player: newPlayer }));
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
      dispatch( updatePlayer({ position: PieceEnum.O, player: newPlayer }));
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
    (messageReducer as jest.Mock).mockReturnValue(expectedState);
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
    } as StateType;
    const wrapper = createWrapper(testState);
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const { dispatch } = result.current;
      dispatch( {type: 'unknown'} as unknown as ActionTypes);
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
      gameState: GameStateEnum.Welcome,
    };
    const wrapper = createWrapper(testState);
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const { dispatch } = result.current;
      dispatch(updateGameState(GameStateEnum.Welcome));
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(expectedState);
  });
  it('should call updateRemoteGame', () => {
    // Arrange
    const testState = {
      ...initialState,
    } as StateType;
    const expectedState = {
      ...initialState,
      remote: true,
    };
    const wrapper = createWrapper(testState);
    const { result } = renderHook(() => useTicTacToe(), { wrapper });

    act(() => {
      const { dispatch } = result.current;
      dispatch(updateRemoteGame(true));
    });

    // Assert
    const { state } = result.current;
    expect(state).toEqual(expectedState);
  });
});
