import { LOG_LEVELS } from '../../../../src/contracts/constants/log-levels.constants';
import Logger from '../../../../src/util/logger/browser';
import { log } from '../../../../src/util/logger/browser/log';

jest.mock('../../../../src/util/logger/browser/log');

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
