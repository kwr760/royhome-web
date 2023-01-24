import { renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { takeTurn } from '../../../../src/features/tictactoe/context/context.actions';
import { TicTacToeProvider } from '../../../../src/features/tictactoe/context/context.provider';
import { GameStateEnum, PieceEnum, PlayerTypeEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
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
      turn: PieceEnum.X,
      playerOne: {
        ...initialPlayerOne,
        type: PlayerTypeEnum.Computer,
      },
    };
    const expectedTakeTurn = {
      player: PieceEnum.X,
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
      turn: PieceEnum.O,
      playerTwo: {
        ...initialPlayerTwo,
        type: PlayerTypeEnum.Computer,
      },
    };
    const expectedTakeTurn = {
      player: PieceEnum.O,
      position: 4,
    };

    // Act
    const wrapper = createWrapper(state);
    renderHook(() => useAI(), { wrapper });

    // Assert
    expect(takeTurn).toBeCalledWith(expectedTakeTurn);
  });
});
