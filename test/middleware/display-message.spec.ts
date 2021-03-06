import { displayMessage } from '../../src/middleware/display-message';
import Logger from '../../src/util/logger/server';

describe('server/middleware/display-message', () => {
  it('should return a status when called', () => {
    // Arrange
    Logger.log = jest.fn();
    const msg = 'This is a test message';

    // Act
    displayMessage(msg);

    // Assert
    expect(Logger.log).toHaveBeenCalledWith(msg);
  });
});
