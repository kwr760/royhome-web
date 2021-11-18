import { DEVELOPMENT } from '../../contracts/release-environments.constants';
import { LOG_LEVELS } from '../../util/logger/logger-levels';

const dev = {
  release: DEVELOPMENT,
  log: {
    dir: './log',
    level: LOG_LEVELS.DEBUG,
    stdout: true,
    includePidFilename: false,
  },
  server: {
    cert: {
      key: '/local/cert/royhome/privkey.pem',
      cert: '/local/cert/royhome/fullchain.pem',
    },
  },
};

export { dev };
