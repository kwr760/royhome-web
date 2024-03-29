/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import httpContext from 'express-http-context';
import { handleError } from '../src/middleware/handle-error';
import { notFound } from '../src/middleware/not-found';

import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
import { renderReact } from '../src/ssr/render-react';

import { startHttpsServer } from '../src/middleware/start-https';
import { startHttpServer } from '../src/middleware/start-http';

jest.mock('express');
jest.mock('cors');
jest.mock('helmet');
jest.mock('compression');
jest.mock('body-parser', () => ({
  json: jest.fn(),
  urlencoded: jest.fn(),
}));
jest.mock('cookie-parser');
jest.mock('express-http-context');
jest.mock('../src/middleware/start-https');
jest.mock('../src/middleware/start-http');
jest.mock('../src/middleware/handle-error');
jest.mock('../src/middleware/not-found');
jest.mock('../src/ssr/render-react');

describe('server/index', () => {
  const mockExpress = {
    get: jest.fn(),
    set: jest.fn(),
    use: jest.fn(),
    listen: jest.fn(),
    enable: jest.fn(),
  };
  const corsCb = jest.fn();
  const helmetCb = jest.fn();
  const compressionCb = jest.fn();
  const bodyParserJsonCb = jest.fn();
  const bodyParserUrlencodedCb = jest.fn();
  const cookieParserCb = jest.fn();
  const handleErrorCb = jest.fn();
  const notFoundCb = jest.fn();
  const renderReactCb = jest.fn();

  beforeEach(() => {
    (express as unknown as jest.Mock).mockReturnValue(mockExpress);
    (cors as jest.Mock).mockReturnValue(corsCb);
    (helmet as unknown as jest.Mock).mockReturnValue(helmetCb);
    (compression as unknown as jest.Mock).mockReturnValue(compressionCb);
    (bodyParser.json as jest.Mock).mockReturnValue(bodyParserJsonCb);
    (bodyParser.urlencoded as jest.Mock).mockReturnValue(bodyParserUrlencodedCb);
    (cookieParser as unknown as jest.Mock).mockReturnValue(cookieParserCb);
    (handleError as unknown as jest.Mock).mockReturnValue(handleErrorCb);
    (notFound as unknown as jest.Mock).mockReturnValue(notFoundCb);
    (renderReact as unknown as jest.Mock).mockReturnValue(renderReactCb);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start setup a basic server', () => {
    jest.isolateModules(() => {
      // Arrange/Act
      require('../src/server');
      const expectedHelmet = {
        crossOriginEmbedderPolicy: {
          policy: 'credentialless',
        },
        contentSecurityPolicy: {
          directives: {
            'connect-src': [
              '\'self\'',
              'wss:',
              '*.royk.us',
              '*.royhome.net',
              'royk.auth0.com',
            ],
            'frame-src': ['\'self\'', 'royk.auth0.com'],
            'script-src': ['\'self\'', '\'unsafe-inline\'', '*.royk.us', '*.royhome.net'],
            'img-src': [
              '\'self\'',
              'data:',
              'avatars.githubusercontent.com',
              's.gravatar.com',
              'cdn.auth0.com',
              '*.wp.com',
              '*.googleusercontent.com',
            ],
          },
          useDefaults: true,
        },
      };

      // Assert
      expect(mockExpress.set).toHaveBeenCalledWith('json spaces', 2);

      expect(mockExpress.enable).toHaveBeenCalledWith('etag');
      expect(mockExpress.enable).toHaveBeenCalledWith('query parser');

      expect(mockExpress.use).toHaveBeenCalledTimes(10);
      expect(cors).toHaveBeenCalledWith();
      expect(mockExpress.use).toHaveBeenCalledWith(corsCb);
      expect(helmet).toHaveBeenCalledWith(expectedHelmet);
      expect(mockExpress.use).toHaveBeenCalledWith(helmetCb);
      expect(compression).toHaveBeenCalledWith();
      expect(mockExpress.use).toHaveBeenCalledWith(compressionCb);
      expect(bodyParser.json).toHaveBeenCalledWith();
      expect(mockExpress.use).toHaveBeenCalledWith(bodyParserJsonCb);
      expect(bodyParser.urlencoded).toHaveBeenCalledWith({ extended: false });
      expect(mockExpress.use).toHaveBeenCalledWith(bodyParserUrlencodedCb);
      expect(cookieParser).toHaveBeenCalledWith();
      expect(mockExpress.use).toHaveBeenCalledWith(cookieParserCb);
      expect(mockExpress.use).toHaveBeenCalledWith(httpContext.middleware);
      expect(mockExpress.use).toHaveBeenCalledWith('/', undefined);
      expect(mockExpress.use).toHaveBeenCalledWith(handleError);
      expect(mockExpress.use).toHaveBeenCalledWith(notFound);

      expect(mockExpress.get).toHaveBeenCalledTimes(1);
      expect(mockExpress.get).toHaveBeenCalledWith('/*', renderReact);
    });
  });

  it('should start dev server', () => {
    // Arrange
    jest.isolateModules(() => {
      const { env } = require('../src/config/env');
      const { dev } = require('../src/config/env/dev');
      env.mode = dev.mode;

      // Act
      const { default: app } = require('../src/server');

      // Assert
      expect(startHttpsServer).toHaveBeenCalledWith(app, 3000);
      expect(startHttpServer).not.toHaveBeenCalled();
    });
  });

  it('should start prod server', () => {
    // Arrange
    jest.isolateModules(() => {
      const { env } = require('../src/config/env');
      const { prod } = require('../src/config/env/prod');
      env.mode = prod.mode;
      process.env.SERVER_PORT = '';

      // Act
      const { default: app } = require('../src/server');

      // Assert
      expect(mockExpress.use).toHaveBeenCalledTimes(10);
      expect(startHttpsServer).toHaveBeenCalledWith(app, 3000);
      expect(startHttpServer).not.toHaveBeenCalled();
    });
  });

  it('should start docker server', () => {
    // Arrange
    jest.isolateModules(() => {
      const { env } = require('../src/config/env');
      const { docker } = require('../src/config/env/docker');
      env.mode = docker.mode;
      env.server = docker.server;
      process.env.SERVER_PORT = '';

      // Act
      const { default: app } = require('../src/server');

      // Assert
      expect(mockExpress.use).toHaveBeenCalledTimes(10);
      expect(startHttpServer).toHaveBeenCalledWith(app, 3000);
      expect(startHttpsServer).not.toHaveBeenCalled();
    });
  });
});
