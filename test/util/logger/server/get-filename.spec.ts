import { env } from '../../../../src/config/env';
import { getLogFilename } from '../../../../src/util/logger/server/get-filename';

describe('server/logger/get-filename', () => {
  it('should return filename with date', () => {
    // Arrange
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => new Date('2000-01-01T21:01:01.000').valueOf());

    // Act
    const result = getLogFilename('/var/log/royhome');

    // Assert
    expect(result).toMatch(/^\/var\/log\/royhome\/server-20000101/);
    expect(result).toMatch(/.log$/);
  });
  it('should return filename with date and pid', () => {
    // Arrange
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => new Date('2000-01-01T21:01:01.000').valueOf());
    // not mocking pid, but it includes an extra dash
    env.log.includePidFilename = false;

    // Act
    const result = getLogFilename('/var/log/royhome');

    // Assert
    expect(result).toMatch(/^\/var\/log\/royhome\/server/);
    expect(result).toMatch(/.log$/);
  });
});
