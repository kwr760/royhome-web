import { env } from '../../../config/env';
import { LogMsgType } from '../../../contracts/logger.models';

import { getConsole } from '../get-console';
import { writeToServer } from './write-to-server';

const log = ({ logType, msg }: LogMsgType): void => {
  const {
    level: logLevel,
    stdout: displayToScreen,
  } = env.log;

  if (logType.level >= logLevel.level) {
    writeToServer({ logType, msg });

    if (displayToScreen) {
      const consoleCb = getConsole(logType);
      consoleCb(msg);
    }
  }
};

export { log };
