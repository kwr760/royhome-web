import { Application } from 'express';
import fs from 'fs';
import spdy from 'spdy';
import startHttpsServer from '../../src/middleware/start-https';
import displayMessage from '../../src/middleware/display-message';

jest.mock('fs');
jest.mock('spdy');
jest.mock('../../src/middleware/display-message');

describe('server/middleware/start-https', () => {
  it('should create http server and call listen', () => {
    // Arrange
    const app = {};
    const port = 3000;
    (fs.readFileSync as jest.Mock)
      .mockReturnValueOnce('key')
      .mockReturnValueOnce('cert');
    (fs.writeFile as unknown as jest.Mock)
      .mockImplementation((_path, _contents, cb) => {
        cb(null);
      });
    const expectedCred = {
      key: 'key',
      cert: 'cert',
    };
    const mockServer = { listen: (_: unknown, cb: () => unknown) => { cb(); } };
    (spdy.createServer as jest.Mock).mockImplementation(() => mockServer);
    (displayMessage as jest.Mock).mockImplementation(() => jest.fn());

    // Act
    startHttpsServer(app as Application, port);

    // Assert
    expect(spdy.createServer).toHaveBeenCalledWith(expectedCred, app);
    expect(displayMessage).toHaveBeenCalled();
  });
  it('should create http server and call listen fails to write file', () => {
    // Arrange
    const app = {};
    const port = 3000;
    (fs.readFileSync as jest.Mock)
      .mockReturnValueOnce('key')
      .mockReturnValueOnce('cert');
    (fs.writeFile as unknown as jest.Mock)
      .mockImplementation((_path, _contents, cb) => {
        cb(new Error('Message'));
      });
    const expectedCred = {
      key: 'key',
      cert: 'cert',
    };
    const mockServer = { listen: (_: unknown, cb: () => unknown) => { cb(); } };
    (spdy.createServer as jest.Mock).mockImplementation(() => mockServer);
    (displayMessage as jest.Mock).mockImplementation(() => jest.fn());

    // Act
    try {
      startHttpsServer(app as Application, port);
    } catch (e) {
      expect(e.toString()).toBe('Error: Message');
    }

    // Assert
    expect(spdy.createServer).toHaveBeenCalledWith(expectedCred, app);
    expect(displayMessage).toHaveBeenCalled();
  });
});
