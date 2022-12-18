import { renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { takeTurn } from '../../../../src/features/tictactoe/context/context.actions';
import { TicTacToeProvider } from '../../../../src/features/tictactoe/context/context.provider';
import { GameStateEnum, PlayerEnum, PlayerTypeEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import {
  initialPlayerOne,
  initialPlayerTwo,
  initialState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { useAI } from '../../../../src/features/tictactoe/hooks/use-ai';

jest
  .mock('../../../../src/features/tictactoe/context/context.actions');

describe('feature/tictactoe/hooks/use-ai', () => {
  const createWrapper = (testState: StateType | undefined) => {
    // eslint-disable-next-line react/display-name
    return ({ children }: { children: ReactNode }) =>
      <TicTacToeProvider sessionId="" user={{}} state={testState}>{children}</TicTacToeProvider>;
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should determine X turn', () => {
    // Arrange
    const state = {
      ...initialState,
      gameState: GameStateEnum.Active,
      turn: PlayerEnum.One,
      playerOne: {
        ...initialPlayerOne,
        type: PlayerTypeEnum.Computer,
      },
    };
    const expectedTakeTurn = {
      player: PlayerEnum.One,
      position: 4,
    };

    // Act
    const wrapper = createWrapper(state);
    renderHook(() => useAI(), { wrapper });

    // Assert
    expect(takeTurn).toBeCalledWith(expectedTakeTurn);
  });
  it('should determine O turn', () => {
    // Arrange
    const state = {
      ...initialState,
      gameState: GameStateEnum.Active,
      turn: PlayerEnum.Two,
      playerTwo: {
        ...initialPlayerTwo,
        type: PlayerTypeEnum.Computer,
      },
    };
    const expectedTakeTurn = {
      player: PlayerEnum.Two,
      position: 4,
    };

    // Act
    const wrapper = createWrapper(state);
    renderHook(() => useAI(), { wrapper });

    // Assert
    expect(takeTurn).toBeCalledWith(expectedTakeTurn);
  });
});
