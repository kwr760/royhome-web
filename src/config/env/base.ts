import path from 'path';

const rootPath = path.normalize(`${__dirname}/../../..`);
const currentHost = global.origin || 'https://royk.us';

const env = (host: string) => ({
  appName: 'royhome',
  host,
  root: rootPath,
  server: {
    enableHttps: true,
    cert: {
      key: '/var/cert/royhome/privkey.pem',
      cert: '/var/cert/royhome/fullchain.pem',
    },
    apiUrl: 'https://api.royk.us',
    deriveApiUrl: true,
  },
  log: {
    dir: '/var/log/royhome',
  },
  auth0: {
    domain: 'royk.auth0.com',
    clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
    callbackUrl: `${host}`,
  },
});

const base = env(currentHost);
export { base };
