/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import LOG_LEVELS from '../util/logger/logger-levels';

describe('config/index', () => {
  const { NODE_ENV } = process.env;

  describe('production', () => {
    beforeEach(() => {
      jest.resetModules();
      process.env.NODE_ENV = 'production';
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
          mode: 'production',
          root: expect.stringContaining('/royhome'),
          cert: {
            cert: '/var/cert/royhome/fullchain.pem',
            key: '/var/cert/royhome/privkey.pem',
          },
          log: {
            dir: '/var/log/royhome',
            level: LOG_LEVELS.WARN,
            stdout: false,
            includePidFilename: true,
          },
          api: {
            url: 'https://api.royk.us',
          },
        },
      };

      // Act
      const prod = require('./index');

      // Assert
      expect(prod).toEqual(expected);
    });
  });

  describe('development', () => {
    beforeEach(() => {
      jest.resetModules();
      process.env.NODE_ENV = 'development';
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
          mode: 'development',
          root: expect.stringContaining('/royhome-web'),
          cert: {
            cert: '/var/cert/royhome/fullchain.pem',
            key: '/var/cert/royhome/privkey.pem',
          },
          log: {
            dir: './log',
            level: LOG_LEVELS.DEBUG,
            stdout: true,
            includePidFilename: false,
          },
          api: {
            url: 'https://api.royk.us',
          },
        },
      };

      // Act
      const dev = require('./index');

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
          mode: 'production',
          root: expect.stringContaining('/royhome-web'),
          cert: {
            cert: '/var/cert/royhome/fullchain.pem',
            key: '/var/cert/royhome/privkey.pem',
          },
          log: {
            dir: '/var/log/royhome',
            level: LOG_LEVELS.WARN,
            stdout: false,
            includePidFilename: true,
          },
          api: {
            url: 'https://api.royk.us',
          },
        },
      };
      global.origin = '';

      // Act
      const prod = require('./index');

      // Assert
      expect(prod).toEqual(expected);
    });
  });
});
