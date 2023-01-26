import { LOCAL } from '../../contracts/constants/environments.constants';
import { LOG_LEVELS } from '../../contracts/constants/log-levels.constants';

const local = {
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
    deriveUrl: false,
  },
};

export { local };
