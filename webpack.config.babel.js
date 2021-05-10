import { getClientConfig } from './webpack.client';
import { getServerConfig } from './webpack.server';

let config;
switch (process.env.NODE_ENV) {
  case 'development': {
    const browserConfig = getClientConfig('web');
    const ssrConfig = getClientConfig('node');
    config = [ browserConfig, ssrConfig ];
  }
    break;
  case 'production': {
    const browserConfig = getClientConfig('web');
    const ssrConfig = getClientConfig('node');
    const serverConfig = getServerConfig();
    config = [ browserConfig, ssrConfig, serverConfig ];
  }
    break;
  default: config = {};
}

export default config;
