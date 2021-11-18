import { LOG_LEVELS } from '../../../../src/util/logger/logger-levels';
import Logger from '../../../../src/util/logger/server';
import { log } from '../../../../src/util/logger/server/log';

jest.mock('../../../../src/util/logger/server/log');

describe('server/logger/index', () => {
  test.each([
    [Logger.debug, LOG_LEVELS.DEBUG],
    [Logger.log, LOG_LEVELS.INFO],
    [Logger.warning, LOG_LEVELS.WARN],
    [Logger.error, LOG_LEVELS.ERROR],
    [Logger.fatal, LOG_LEVELS.FATAL],
  ])(
    'Each method should call the log with the right logType', (logger, logType) => {
      // Arrange/Act
      logger('Test Message');

      // Assert
      expect(log).toBeCalledWith({
        logType,
        msg: 'Test Message',
      });
    },
  );
});
