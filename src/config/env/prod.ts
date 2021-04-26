import LOG_LEVELS from '../../util/logger/logger-levels';

const env = {
  mode: 'production',
  log: {
    dir: '/var/log/royhome-web',
    level: LOG_LEVELS.WARN,
    stdout: false,
    includePidFilename: true,
  },
};

export default env;
