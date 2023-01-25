import {
  ActionEnum, EndGameReasonEnum,
  GameStateEnum,
  PieceEnum, PublishEnum,
} from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { evaluateGame } from '../../../../src/features/tictactoe/functions/evaluate-game';
import { evaluateGameMiddleware } from '../../../../src/features/tictactoe/middleware/evaluate-game.middleware';

jest.mock('../../../../src/features/tictactoe/functions/evaluate-game');

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
      gameState: GameStateEnum.Completed,
    };
    const expectedPublish = {
      destination: PublishEnum.End,
      body: JSON.stringify({
        sessionId: 'session-id',
        reason: EndGameReasonEnum.Completed,
      }),
    };

    (evaluateGame as jest.Mock).mockReturnValue({ gameState: GameStateEnum.Completed });

    // Act
    const resultState = evaluateGameMiddleware(action, state as unknown as StateType);

    // Assert
    expect(expected).toEqual(resultState);
    expect(state.client.publish).toBeCalledWith(expectedPublish);
  });
});
