import { renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { initWebSocket } from '../../../../src/features/tictactoe/context/context.actions';
import { TicTacToeProvider } from '../../../../src/features/tictactoe/context/context.provider';
import { initialState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { useWebsocket } from '../../../../src/features/tictactoe/hooks/use-websocket';

jest
  .mock('../../../../src/features/tictactoe/context/context.actions');

describe('feature/tictactoe/hooks/use-websocket', () => {
  const createWrapper = (testState: StateType | undefined) => {
    // eslint-disable-next-line react/display-name
    return ({ children }: { children: ReactNode }) =>
      <TicTacToeProvider sessionId="" user={{}} state={testState}>{children}</TicTacToeProvider>;
  };

  it('should determine a completed', () => {
    // Arrange
    const state = {
      ...initialState,
    };
    const expected = {
      callback: expect.any(Function),
      client: null,
      destination: '/session/',
    };

    // Act
    const wrapper = createWrapper(state);
    renderHook(() => useWebsocket(), { wrapper });

    // Assert
    expect(initWebSocket).toBeCalledWith(expected);
  });
});
