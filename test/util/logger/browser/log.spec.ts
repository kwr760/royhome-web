import { env } from '../../../../src/config/env';
import { LOG_LEVELS } from '../../../../src/contracts/constants/log-levels.constants';
import { getConsole } from '../../../../src/util/logger/get-console';
import { formatMessage } from '../../../../src/util/logger/format-message';
import { log } from '../../../../src/util/logger/browser/log';
import { writeToServer } from '../../../../src/util/logger/browser/write-to-server';

jest.mock('../../../../src/util/logger/format-message');
jest.mock('../../../../src/util/logger/browser/write-to-server');
jest.mock('../../../../src/util/logger/get-console');

describe('server/logger/log', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should not log anything', () => {
    // Arrange
    env.log = {
      dir: 'dir_name',
      level: LOG_LEVELS.WARN,
      stdout: true,
      includePidFilename: false,
    };
    const msg = 'Log message';
    const logMsg = {
      logType: LOG_LEVELS.INFO,
      msg,
    };

    // Act
    log(logMsg);

    // Assert
    expect(writeToServer).not.toBeCalled();
  });
  it('should log and display', () => {
    // Arrange
    env.log = {
      dir: 'dir_name',
      level: LOG_LEVELS.WARN,
      stdout: true,
      includePidFilename: false,
    };
    const consoleMock = jest.fn();
    (getConsole as unknown as jest.Mock).mockReturnValue((msg: string) => consoleMock(msg));
    const formattedMessage = 'formatted_message';
    (formatMessage as jest.Mock).mockReturnValue(formattedMessage);
    const msg = 'Log message';
    const logMsg = {
      logType: LOG_LEVELS.WARN,
      msg,
    };

    // Act
    log(logMsg);

    // Assert
    expect(writeToServer).toBeCalledWith(logMsg);
    expect(getConsole).toBeCalledWith(LOG_LEVELS.WARN);
    expect(consoleMock).toBeCalledWith(msg);
  });
  it('should log and not display', () => {
    // Arrange
    env.log = {
      dir: 'dir_name',
      level: LOG_LEVELS.WARN,
      stdout: false,
      includePidFilename: false,
    };
    const consoleMock = jest.fn();
    (getConsole as jest.Mock).mockReturnValue((msg: string) => consoleMock(msg));
    const formattedMessage = 'formatted_message';
    (formatMessage as jest.Mock).mockReturnValue(formattedMessage);
    const msg = 'Log message';
    const logMsg = {
      logType: LOG_LEVELS.ERROR,
      msg,
    };

    // Act
    log(logMsg);

    // Assert
    expect(writeToServer).toBeCalledWith(logMsg);
    expect(getConsole).not.toBeCalled();
    expect(consoleMock).not.toBeCalled();
  });
});
