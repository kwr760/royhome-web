import { env } from '../../../config/env';
import { LogMsgType } from '../../../type/logger';
import { getConsole } from '../get-console';
import { formatMessage } from '../format-message';
import { getLogFilename } from './get-filename';
import { writeToLog } from './write-to-log';

const log = ({ logType, msg }: LogMsgType): void => {
  const {
    dir: logLocation,
    level: logLevel,
    stdout: displayToScreen,
  } = env.log;

  if (logType.level >= logLevel.level) {
    const logMessage = formatMessage(logType, msg);
    const logFile = getLogFilename(logLocation);

    writeToLog(logFile, logMessage);

    if (displayToScreen) {
      const consoleCb = getConsole(logType);
      consoleCb(logMessage);
    }
  }
};

export { log };
