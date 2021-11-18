/* eslint-disable @typescript-eslint/no-var-requires */
import { DEVELOPMENT, DOCKER, LOCAL, PRODUCTION } from '../../src/contracts/release-environments.constants';
import { LOG_LEVELS } from '../../src/util/logger/logger-levels';

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
        env: {
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
            deriveApiUrl: true,
          },
        },
      };

      // Act
      const prod = require('../../src/config/env');

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
        env: {
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
            deriveApiUrl: true,
          },
        },
      };

      // Act
      const dev = require('../../src/config/env');

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
        env: {
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
            includePidFilename: true,
          },
          server: {
            apiUrl: 'http://host.docker.internal:5000',
            cert: {
              cert: '/var/cert/royhome/fullchain.pem',
              key: '/var/cert/royhome/privkey.pem',
            },
            enableHttps: false,
            deriveApiUrl: true,
          },
        },
      };

      // Act
      const dev = require('../../src/config/env');

      // Assert
      expect(dev).toEqual(expected);
    });
  });

  describe('local', () => {
    beforeEach(() => {
      jest.resetModules();
      process.env.NODE_ENV = LOCAL;
    });

    afterEach(() => {
      process.env.NODE_ENV = NODE_ENV;
    });

    it('should load local as expected', async () => {
      // Arrange
      const expected = {
        env: {
          appName: 'royhome',
          auth0: {
            callbackUrl: 'http://localhost',
            clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
            domain: 'royk.auth0.com',
          },
          host: 'http://localhost',
          release: LOCAL,
          root: expect.stringContaining('web'),
          log: {
            dir: './log',
            level: LOG_LEVELS.DEBUG,
            stdout: true,
            includePidFilename: false,
          },
          server: {
            apiUrl: 'https://localhost:5000',
            cert: {
              cert: './cert/localhost.crt',
              key: './cert/localhost.key',
            },
            enableHttps: true,
            deriveApiUrl: false,
          },
        },
      };

      // Act
      const dev = require('../../src/config/env');

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
        env: {
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
            deriveApiUrl: true,
          },
        },
      };
      global.origin = '';

      // Act
      const prod = require('../../src/config/env');

      // Assert
      expect(prod).toEqual(expected);
    });
  });
});
