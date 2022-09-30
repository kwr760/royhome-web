interface LogType {
  level: number,
  name: string,
}

interface LogMsgType {
  logType: LogType,
  msg: string,
}

export type { LogType, LogMsgType };
