import { DOCKER } from '../../contracts/constants/environments.constants';
import { LOG_LEVELS } from '../../contracts/constants/log-levels.constants';

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
