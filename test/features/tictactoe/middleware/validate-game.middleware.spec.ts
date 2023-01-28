import { ActionTypes } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
import {
  ActionEnum, GameStateEnum, MessageActionEnum, PublishEnum,
} from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { evaluateGame } from '../../../../src/features/tictactoe/functions/evaluate-game';
import { validateGameMiddleware } from '../../../../src/features/tictactoe/middleware/validate-game.middleware';

jest.mock('../../../../src/features/tictactoe/functions/evaluate-game');

describe('feature/tictactoe/middleware/validate-game.middleware', () => {
  it('should determine if game is invalid - too different', () => {
    // Arrange
    const action = {
      type: ActionEnum.Remote,
      payload: {
        message: JSON.stringify(
          {
            action: MessageActionEnum.TakeTurn,
            game: {
              board: 'XXX------',
            },
          },
        ),
      },
    } as ActionTypes;
    const state = {
      sessionId: 'session-id',
      remote: true,
      board: '---------',
      client: {
        publish: jest.fn(),
      },
    };
    const expectedPublish = {
      destination: PublishEnum.End,
      body: JSON.stringify({
        sessionId: 'session-id',
        reason: GameStateEnum.Mismatch,
      }),
    };

    (evaluateGame as jest.Mock).mockReturnValue({ gameState: GameStateEnum.Completed });

    // Act
    const resultState = validateGameMiddleware(action, state as unknown as StateType);

    // Assert
    expect(state).toEqual(resultState);
    expect(state.client.publish).toBeCalledWith(expectedPublish);
  });
  it('should determine if game is invalid - out of sync', () => {
    // Arrange
    const action = {
      type: ActionEnum.Remote,
      payload: {
        message: JSON.stringify(
          {
            action: MessageActionEnum.TakeTurn,
            game: {
              board: 'XXX-OX---',
            },
          },
        ),
      },
    } as ActionTypes;
    const state = {
      sessionId: 'session-id',
      remote: true,
      board: 'XXX-OO---',
      client: {
        publish: jest.fn(),
      },
    };
    const expectedPublish = {
      destination: PublishEnum.End,
      body: JSON.stringify({
        sessionId: 'session-id',
        reason: GameStateEnum.Mismatch,
      }),
    };

    (evaluateGame as jest.Mock).mockReturnValue({ gameState: GameStateEnum.Completed });

    // Act
    const resultState = validateGameMiddleware(action, state as unknown as StateType);

    // Assert
    expect(state).toEqual(resultState);
    expect(state.client.publish).toBeCalledWith(expectedPublish);
  });
  it('should determine if game is valid', () => {
    // Arrange
    const action = {
      type: ActionEnum.Remote,
      payload: {
        message: JSON.stringify(
          {
            action: MessageActionEnum.TakeTurn,
            game: { },
          },
        ),
      },
    } as ActionTypes;
    const state = {
      sessionId: 'session-id',
      remote: true,
      board: 'XXX-OO---',
      client: {
        publish: jest.fn(),
      },
    };

    (evaluateGame as jest.Mock).mockReturnValue({ gameState: GameStateEnum.Completed });

    // Act
    const resultState = validateGameMiddleware(action, state as unknown as StateType);

    // Assert
    expect(state).toEqual(resultState);
    expect(state.client.publish).not.toBeCalled();
  });
});
