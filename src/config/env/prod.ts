import LOG_LEVELS from '../../util/logger/logger-levels';
import { PRODUCTION } from '../release-environments';

const env = {
  release: PRODUCTION,
  log: {
    level: LOG_LEVELS.WARN,
    stdout: false,
    includePidFilename: true,
  },
};

export default env;
