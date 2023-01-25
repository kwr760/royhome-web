import {
  ActionEnum,
  GameStateEnum,
  PublishEnum,
} from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { startGameMiddleware } from '../../../../src/features/tictactoe/middleware/start-game.middleware';

describe('feature/tictactoe/middleware/start-game.middleware', () => {
  it('should start a remote game', () => {
    // Arrange
    const actionType: ActionEnum = ActionEnum.Start;
    const action = {
      type: actionType,
      payload: {
        gameState: GameStateEnum.Wait,
      },
    };
    const state = {
      sessionId: 'session-id',
      remote: true,
      playerOne: {
        name: 'player',
      },
      client: {
        publish: jest.fn(),
      },
    };
    const expected = {
      ...state,
    };
    const expectedPublish = {
      destination: PublishEnum.Start,
      body: JSON.stringify({
        sessionId: 'session-id',
        name: 'player',
      }),
    };

    // Act
    const resultState = startGameMiddleware(action, state as unknown as StateType);

    // Assert
    expect(expected).toEqual(resultState);
    expect(state.client.publish).toBeCalledWith(expectedPublish);
  });
  it('should start a local game', () => {
    // Arrange
    const actionType: ActionEnum = ActionEnum.Start;
    const action = {
      type: actionType,
      payload: {
        gameState: GameStateEnum.Wait,
      },
    };
    const state = {
      sessionId: 'session-id',
      playerOne: {
        name: 'player',
      },
      client: {
        publish: jest.fn(),
      },
    };
    const expected = {
      ...state,
    };

    // Act
    const resultState = startGameMiddleware(action, state as unknown as StateType);

    // Assert
    expect(expected).toEqual(resultState);
    expect(state.client.publish).not.toBeCalled();
  });
});
