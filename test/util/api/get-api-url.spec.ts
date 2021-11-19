/* eslint-disable @typescript-eslint/no-var-requires,@typescript-eslint/ban-ts-comment */
import { getApiUrl } from '../../../src/util/api/get-api-url';

describe('client/util/url/get-browser-url-info', () => {
  const savedGlobalLocation = global.location;

  afterEach(() => {
    global.location = savedGlobalLocation;
  });
  it('should create an url', () => {
    // Arrange
    const expected = 'https://api.royk.us';
    // @ts-ignore
    delete global.location;
    global.location = {
      host: 'www.royk.us',
      protocol: 'https:',
      href: 'https://www.royk.us',
    } as Location;

    // Act
    const result = getApiUrl();

    // Assert
    expect(result).toEqual(expected);
  });

  it('should return apiUrl for DOCKER', () => {
    jest.isolateModules(() => {
      process.env['NODE_ENV'] = 'docker';
      const { getApiUrl } = require('../../../src/util/api/get-api-url');
      const expected = 'http://localhost:5000';

      // Act
      const result = getApiUrl();

      // Assert
      expect(result).toEqual(expected);
    });
  });

  it('should return apiUrl for local', () => {
    jest.isolateModules(() => {
      process.env['NODE_ENV'] = 'local';
      const { getApiUrl } = require('../../../src/util/api/get-api-url');
      const expected = 'https://localhost:5000';

      // Act
      const result = getApiUrl();

      // Assert
      expect(result).toEqual(expected);
    });
  });
});
