import { PRODUCTION } from '../../contracts/constants/environments.constants';
import { LOG_LEVELS } from '../../contracts/constants/log-levels.constants';

const prod = {
  release: PRODUCTION,
  log: {
    level: LOG_LEVELS.WARN,
    stdout: false,
    includePidFilename: true,
  },
};

export { prod };
