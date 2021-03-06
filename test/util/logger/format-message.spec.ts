import { LOG_LEVELS } from '../../../src/contracts/constants/log-levels.constants';
import { formatMessage } from '../../../src/util/logger/format-message';

describe('util/logger/format-message', () => {
  it('should format a message', () => {
    // Arrange
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => new Date('2000-01-01T01:01:01.000').valueOf());

    // Act
    const result = formatMessage(LOG_LEVELS.ERROR, 'The log message');

    // Assert
    expect(result).toMatch(/^2000-01-01_01:01:01.000:/);
    expect(result).toMatch(/:ERROR:"The log message"$/);
  });
});
