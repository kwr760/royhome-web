import { env } from '../../../../src/config/env';
import { LOG_LEVELS } from '../../../../src/contracts/constants/log-levels.constants';
import { formatMessage } from '../../../../src/util/logger/format-message';
import { getConsole } from '../../../../src/util/logger/get-console';
import { log } from '../../../../src/util/logger/server/log';
import { writeToLog } from '../../../../src/util/logger/server/write-to-log';
import { getLogFilename } from '../../../../src/util/logger/server/get-filename';

jest.mock('../../../../src/util/logger/format-message');
jest.mock('../../../../src/util/logger/server/get-filename');
jest.mock('../../../../src/util/logger/server/write-to-log');
jest.mock('../../../../src/util/logger/get-console');

describe('server/logger/log', () => {
  afterEach(() => {
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
    expect(writeToLog).not.toBeCalled();
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
    (getConsole as jest.Mock).mockReturnValue((msg: string) => consoleMock(msg));
    const formattedMessage = 'formatted_message';
    (formatMessage as jest.Mock).mockReturnValue(formattedMessage);
    const logFilename = 'log_filename';
    (getLogFilename as jest.Mock).mockReturnValue(logFilename);
    const msg = 'Log message';
    const logMsg = {
      logType: LOG_LEVELS.WARN,
      msg,
    };

    // Act
    log(logMsg);

    // Assert
    expect(writeToLog).toBeCalledWith(logFilename, formattedMessage);
    expect(getConsole).toBeCalledWith(LOG_LEVELS.WARN);
    expect(consoleMock).toBeCalledWith(formattedMessage);
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
    const logFilename = 'log_filename';
    (getLogFilename as jest.Mock).mockReturnValue(logFilename);
    const msg = 'Log message';
    const logMsg = {
      logType: LOG_LEVELS.ERROR,
      msg,
    };

    // Act
    log(logMsg);

    // Assert
    expect(writeToLog).toBeCalledWith(logFilename, formattedMessage);
    expect(getConsole).not.toBeCalled();
    expect(consoleMock).not.toBeCalled();
  });
});
