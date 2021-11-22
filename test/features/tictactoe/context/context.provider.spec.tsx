import { renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { TicTacToeProvider, useTicTacToe } from '../../../../src/features/tictactoe/context/context.provider';
import { initialTicTacToeState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';

describe('feature/tictactoe/context/context.provider', () => {
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
});
