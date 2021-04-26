import path from 'path';

const rootPath = path.normalize(`${__dirname}/../../..`);

const currentHost = global.origin || 'https://royk.us';

const env = (host: string) => ({
  appName: 'roy-home',
  host,
  root: rootPath,
  port: {
    web: 3000,
    api: 5000,
  },
  api: {
    url: 'https://api.royk.us',
  },
  cert: {
    key: '/var/cert/royhome/privkey.pem',
    cert: '/var/cert/royhome/fullchain.pem',
  },
  auth0: {
    domain: 'royk.auth0.com',
    clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
    audience: 'http://royk.us',
    callbackUrl: `${host}`,
  },
});

export default env(currentHost);
