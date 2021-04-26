import LOG_LEVELS from '../../util/logger/logger-levels';

const env = {
  mode: 'development',
  log: {
    dir: './log',
    level: LOG_LEVELS.DEBUG,
    stdout: true,
    includePidFilename: false,
  },
};

export default env;
