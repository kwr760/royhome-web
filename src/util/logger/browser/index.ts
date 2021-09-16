import LOG_LEVELS from '../logger-levels';
import { LogMsgType } from '../../../type/logger';
import log from './log';

class Logger {
  writeLog = (msg: LogMsgType) => {
    log(msg);
  };

  debug = (msg: string) => {
    this.writeLog({
      logType: LOG_LEVELS.DEBUG,
      msg,
    });
  };

  log = (msg: string) => {
    this.writeLog({
      logType: LOG_LEVELS.INFO,
      msg,
    });
  };

  warning = (msg: string) => {
    this.writeLog({
      logType: LOG_LEVELS.WARN,
      msg,
    });
  };

  error = (msg: string) => {
    this.writeLog({
      logType: LOG_LEVELS.ERROR,
      msg,
    });
  };

  fatal = (msg: string) => {
    this.writeLog({
      logType: LOG_LEVELS.FATAL,
      msg,
    });
  };
}

export default new Logger();
