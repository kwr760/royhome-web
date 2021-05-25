import LOG_LEVELS from '../../util/logger/logger-levels';
import { DEVELOPMENT } from '../release-environments';

const env = {
  release: DEVELOPMENT,
  log: {
    dir: './log',
    level: LOG_LEVELS.DEBUG,
    stdout: true,
    includePidFilename: false,
  },
};

export default env;
