/* eslint-disable @typescript-eslint/no-var-requires,@typescript-eslint/ban-ts-comment */
import { getWssUrl } from '../../../../src/features/tictactoe/functions/get-wss-url';

describe('features/tictactoe/functions/get-wss-url', () => {
  const savedGlobalLocation = global.location;
  const expected = 'wss://api.royk.us/tictactoe';

  afterEach(() => {
    global.location = savedGlobalLocation;
  });
  it('should create an url', () => {
    // Arrange
    // @ts-ignore
    delete global.location;
    global.location = {
      host: 'www.royk.us',
      protocol: 'https:',
      href: 'https://www.royk.us',
    } as Location;

    // Act
    const result = getWssUrl('tictactoe');

    // Assert
    expect(result).toEqual(expected);
  });

  it('should return apiUrl for local', () => {
    jest.isolateModules(() => {
      process.env['NODE_ENV'] = 'local';
      const { getWssUrl } = require('../../../../src/features/tictactoe/functions/get-wss-url');

      // Act
      const result = getWssUrl('tictactoe');

      // Assert
      expect(result).toEqual(expected);
    });
  });
});
