import { PRODUCTION } from '../../contracts/release-environments.constants';
import { LOG_LEVELS } from '../../util/logger/logger-levels';

const prod = {
  release: PRODUCTION,
  log: {
    level: LOG_LEVELS.WARN,
    stdout: false,
    includePidFilename: true,
  },
};

export { prod };
