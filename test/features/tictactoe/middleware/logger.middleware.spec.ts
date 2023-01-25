import {
  ActionEnum,
  PieceEnum,
} from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { logger } from '../../../../src/features/tictactoe/middleware/logger.middleware';

jest.mock('../../../../src/features/tictactoe/functions/evaluate-game');

describe('feature/tictactoe/middleware/logger.middleware', () => {
  beforeEach(() => {
    global.console.log = jest.fn();
  });
  afterEach(() => {
    (global.console.log as jest.Mock).mockRestore();
  });
  it('should log an action', () => {
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
    };

    // Act
    logger('named')(action, state as unknown as StateType);

    // Assert
    expect(global.console.log).toBeCalledWith('action->state named', action, state);
  });
});
