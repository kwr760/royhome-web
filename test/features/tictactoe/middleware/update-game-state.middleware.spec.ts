import { ActionTypes } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
import { ActionEnum, GameStateEnum, PublishEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { evaluateGame } from '../../../../src/features/tictactoe/functions/evaluate-game';
import { updateGameStateMiddleware } from '../../../../src/features/tictactoe/middleware/update-game-state.middleware';

jest.mock('../../../../src/features/tictactoe/functions/evaluate-game');

describe('feature/tictactoe/middleware/update-game-state.middleware', () => {
  it('should end the remote game', () => {
    // Arrange
    const action = {
      type: ActionEnum.UpdateGameState,
      payload: {
        gameState: GameStateEnum.Closed,
      },
    } as ActionTypes;
    const state = {
      sessionId: 'session-id',
      remote: true,
      client: {
        publish: jest.fn(),
      },
    };
    const expectedPublish = {
      destination: PublishEnum.End,
      body: JSON.stringify({
        sessionId: 'session-id',
        reason: GameStateEnum.Closed,
      }),
    };

    (evaluateGame as jest.Mock).mockReturnValue({ gameState: GameStateEnum.Completed });

    // Act
    const resultState = updateGameStateMiddleware(action, state as unknown as StateType);

    // Assert
    expect(state).toEqual(resultState);
    expect(state.client.publish).toBeCalledWith(expectedPublish);
  });
});
