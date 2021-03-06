import path from 'path';

import { env } from '../../../config/env';
import { getCurrentDate } from '../../datetime/get-current-date';

const getLogFilename = (location: string): string => {
  const date = getCurrentDate();
  let filename = `${location}/server-${date}`;
  if (env.log.includePidFilename) {
    filename += `-${process.pid}`;
  }

  return path.resolve(`${filename}.log`);
};

export { getLogFilename };
