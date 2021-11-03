import LOG_LEVELS from '../../util/logger/logger-levels';
import { LOCAL } from '../release-environments';

const env = {
  release: LOCAL,
  log: {
    dir: './log',
    level: LOG_LEVELS.DEBUG,
    stdout: true,
    includePidFilename: false,
  },
  server: {
    cert: {
      key: './cert/localhost.key',
      cert: './cert/localhost.crt',
    },
    apiUrl: 'https://localhost:5000',
    deriveApiUrl: false,
  },
};

export default env;
