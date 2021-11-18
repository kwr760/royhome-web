import { DOCKER } from '../../contracts/release-environments.constants';
import { LOG_LEVELS } from '../../util/logger/logger-levels';

const docker = {
  release: DOCKER,
  server: {
    enableHttps: false,
    apiUrl: 'http://host.docker.internal:5000',
  },
  log: {
    dir: './log',
    level: LOG_LEVELS.INFO,
    stdout: true,
    includePidFilename: true,
  },
};

export { docker };
