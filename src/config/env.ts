import { merge } from 'lodash';
import { DEVELOPMENT, DOCKER, LOCAL, PRODUCTION } from '../contracts/constants/environments.constants';

import { base } from './env/base';
import { prod } from './env/prod';
import { docker } from './env/docker';
import { dev } from './env/dev';
import { local } from './env/local';

let mergedConfig;

const release = process.env['NODE_ENV'] || PRODUCTION;
switch (release) {
  case DEVELOPMENT:
    mergedConfig = merge({}, base, dev);
    break;
  case LOCAL:
    mergedConfig = merge({}, base, local);
    break;
  case DOCKER:
    mergedConfig = merge({}, base, docker);
    break;
  default:
    mergedConfig = merge({}, base, prod);
    break;
}

const env = mergedConfig;

export { env };

