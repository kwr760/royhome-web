import {
  ActionEnum,
  GameStateEnum,
  PieceEnum, PublishEnum,
} from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { takeTurnMiddleware } from '../../../../src/features/tictactoe/middleware/take-turn.middleware';

describe('feature/tictactoe/middleware/evaluate-game.middleware', () => {
  it('should determine if game is completed', () => {
    // Arrange
    const actionType: ActionEnum = ActionEnum.TakeTurn;
    const action = {
      type: actionType,
      payload: {
        position: 0,
        player: PieceEnum.X,
      },
    };
    const state = {
      sessionId: 'session-id',
      remote: true,
      board: '---------',
      client: {
        publish: jest.fn(),
      },
    };
    const expected = {
      ...state,
      gameState: GameStateEnum.Wait,
    };
    const expectedPublish = {
      destination: PublishEnum.Turn,
      body: JSON.stringify({
        sessionId: 'session-id',
        board: 'X--------',
      }),
    };

    // Act
    const resultState = takeTurnMiddleware(action, state as unknown as StateType);

    // Assert
    expect(expected).toEqual(resultState);
    expect(state.client.publish).toBeCalledWith(expectedPublish);
  });
});
