import LOG_LEVELS from '../../util/logger/logger-levels';
import { DOCKER } from '../release-environments';

const env = {
  release: DOCKER,
  server: {
    enableHttps: false,
    apiUrl: 'http://localhost:5000',
  },
  log: {
    dir: './log',
    level: LOG_LEVELS.INFO,
    stdout: true,
    includePidFilename: false,
  },
};

export default env;
