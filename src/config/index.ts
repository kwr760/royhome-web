import { merge } from 'lodash';

import base from './env/base';
import prod from './env/prod';
import docker from './env/docker';
import dev from './env/dev';
import { DEVELOPMENT, DOCKER, PRODUCTION } from './release-environments';

let mergedConfig;

const release = process.env['NODE_ENV'] || PRODUCTION;
switch (release) {
  case DEVELOPMENT:
    mergedConfig = merge({}, base, dev);
    break;
  case DOCKER:
    mergedConfig = merge({}, base, docker);
    break;
  default:
    mergedConfig = merge({}, base, prod);
    break;
}

const env = mergedConfig;

export default env;
