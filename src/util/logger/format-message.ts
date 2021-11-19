import { LogType } from '../../contracts/logger.models';
import { getCurrentDatetime } from '../datetime/get-current-datetime';

const formatMessage = (logType: LogType, msg: string): string => {
  const datetime = getCurrentDatetime();
  const { pid } = process;
  const logMsg = JSON.stringify(msg);
  return `${datetime}:${pid}:${logType.name}:${logMsg}`;
};

export { formatMessage };
