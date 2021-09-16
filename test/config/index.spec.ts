/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import LOG_LEVELS from '../../src/util/logger/logger-levels';
import { DEVELOPMENT, DOCKER, PRODUCTION } from '../../src/config/release-environments';

describe('config/index', () => {
  const { NODE_ENV } = process.env;

  describe('production', () => {
    beforeEach(() => {
      jest.resetModules();
      process.env.NODE_ENV = PRODUCTION;
    });

    afterEach(() => {
      process.env.NODE_ENV = NODE_ENV;
    });

    it('should load prod as expected', () => {
      // Arrange
      const expected = {
        default: {
          appName: 'royhome',
          auth0: {
            callbackUrl: 'http://localhost',
            clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
            domain: 'royk.auth0.com',
          },
          host: 'http://localhost',
          release: PRODUCTION,
          root: expect.stringContaining('/royhome'),
          log: {
            dir: '/var/log/royhome',
            level: LOG_LEVELS.WARN,
            stdout: false,
            includePidFilename: true,
          },
          server: {
            apiUrl: 'https://api.royk.us',
            cert: {
              cert: '/var/cert/royhome/fullchain.pem',
              key: '/var/cert/royhome/privkey.pem',
            },
            enableHttps: true,
          },
        },
      };

      // Act
      const prod = require('../../src/config');

      // Assert
      expect(prod).toEqual(expected);
    });
  });

  describe('development', () => {
    beforeEach(() => {
      jest.resetModules();
      process.env.NODE_ENV = DEVELOPMENT;
    });

    afterEach(() => {
      process.env.NODE_ENV = NODE_ENV;
    });

    it('should load dev as expected', async () => {
      // Arrange
      const expected = {
        default: {
          appName: 'royhome',
          auth0: {
            callbackUrl: 'http://localhost',
            clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
            domain: 'royk.auth0.com',
          },
          host: 'http://localhost',
          release: DEVELOPMENT,
          root: expect.stringContaining('web'),
          log: {
            dir: './log',
            level: LOG_LEVELS.DEBUG,
            stdout: true,
            includePidFilename: false,
          },
          server: {
            apiUrl: 'https://api.royk.us',
            cert: {
              cert: expect.stringContaining('fullchain.pem'),
              key: expect.stringContaining('privkey.pem'),
            },
            enableHttps: true,
          },
        },
      };

      // Act
      const dev = require('../../src/config');

      // Assert
      expect(dev).toEqual(expected);
    });
  });

  describe('docker', () => {
    beforeEach(() => {
      jest.resetModules();
      process.env.NODE_ENV = DOCKER;
    });

    afterEach(() => {
      process.env.NODE_ENV = NODE_ENV;
    });

    it('should load docker as expected', async () => {
      // Arrange
      const expected = {
        default: {
          appName: 'royhome',
          auth0: {
            callbackUrl: 'http://localhost',
            clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
            domain: 'royk.auth0.com',
          },
          host: 'http://localhost',
          release: DOCKER,
          root: expect.stringContaining('web'),
          log: {
            dir: './log',
            level: LOG_LEVELS.INFO,
            stdout: true,
            includePidFilename: false,
          },
          server: {
            apiUrl: 'http://host.docker.internal:5000',
            cert: {
              cert: '/var/cert/royhome/fullchain.pem',
              key: '/var/cert/royhome/privkey.pem',
            },
            enableHttps: false,
          },
        },
      };

      // Act
      const dev = require('../../src/config');

      // Assert
      expect(dev).toEqual(expected);
    });
  });

  describe('unknown', () => {
    beforeEach(() => {
      jest.resetModules();
      delete process.env.NODE_ENV;
    });

    afterEach(() => {
      process.env.NODE_ENV = NODE_ENV;
    });

    it('should load prod if unknown', () => {
    // Arrange
      const expected = {
        default: {
          appName: 'royhome',
          auth0: {
            callbackUrl: 'https://royk.us',
            clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
            domain: 'royk.auth0.com',
          },
          host: 'https://royk.us',
          release: PRODUCTION,
          root: expect.stringContaining('web'),
          log: {
            dir: '/var/log/royhome',
            level: LOG_LEVELS.WARN,
            stdout: false,
            includePidFilename: true,
          },
          server: {
            apiUrl: 'https://api.royk.us',
            cert: {
              cert: '/var/cert/royhome/fullchain.pem',
              key: '/var/cert/royhome/privkey.pem',
            },
            enableHttps: true,
          },
        },
      };
      global.origin = '';

      // Act
      const prod = require('../../src/config');

      // Assert
      expect(prod).toEqual(expected);
    });
  });
});
