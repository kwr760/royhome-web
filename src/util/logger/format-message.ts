import getCurrentDatetime from '../datetime/get-current-datetime';
import { LogType } from '../../type/logger';

const formatMessage = (logType: LogType, msg: string): string => {
  const datetime = getCurrentDatetime();
  const { pid } = process;
  const logMsg = JSON.stringify(msg);
  return `${datetime}:${pid}:${logType.name}:${logMsg}`;
};

export default formatMessage;
