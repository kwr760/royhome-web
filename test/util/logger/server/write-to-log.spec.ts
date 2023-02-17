import { appendFile } from 'fs';
import { writeToLog } from '../../../../src/util/logger/server/write-to-log';

jest.mock('fs');

describe('server/logger/write-to-log', () => {
  beforeEach(() => {
    global.console.error = jest.fn();
  });
  afterEach(() => {
    (global.console.error as jest.Mock).mockRestore();
  });
  it('should write to the file', async () => {
    // Arrange
    (appendFile as unknown as jest.Mock).mockImplementation((_f, _m, cb) => {
      cb(null);
    });

    // Act
    await writeToLog('filename', 'message');

    // Assert
    expect(appendFile).toBeCalledWith('filename', 'message\n', expect.any(Function));
  });
  it('should throw error on failure', async () => {
    // Arrange
    (appendFile as unknown as jest.Mock).mockImplementation( (f, m, cb) => {
      const msg = f + ' - ' + m;
      cb(new Error(msg));
    });

    // Act
    try {
      await writeToLog('filename', 'message');
      expect(false).toBe(true);
    } catch (e) {
      expect(e).toEqual(Error('filename - message\n'));
    }
  });
});
