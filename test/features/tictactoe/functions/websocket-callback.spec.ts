import { remote } from '../../../../src/features/tictactoe/context/context.actions';
import { websocketCallback } from '../../../../src/features/tictactoe/functions/websocket-callback';

jest.mock('../../../../src/features/tictactoe/context/context.actions');

describe('feature/tictactoe/functions/websocket-callback', () => {
  it('should dispatch the callback', () => {
    // Arrange
    const msg = {
      body: 'test',
    };
    const dispatch = () => {};
    const expected = {
      message: 'test',
    };

    // Act
    const callback = websocketCallback(dispatch);
    callback(msg);

    // Assert
    expect(remote).toBeCalledWith(expected);
  });
});
