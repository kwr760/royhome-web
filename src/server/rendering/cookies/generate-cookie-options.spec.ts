import { generateCookieOptions } from './generate-cookie-options';
import env from '../../../config';

describe('server/rendering/cookies/generate-cookie-options', () => {
  it('should create options - no host', () => {
    // Arrange
    env.host = '';
    const expected = {
      domain: '',
      httpOnly: true,
      maxAge: 31536000000,
      secure: true,
    };

    // Act
    const result = generateCookieOptions();

    // Assert
    expect(result).toEqual(expected);
  });
  it('should create options with host', () => {
    // Arrange
    env.host = 'https://royk.us';
    const expected = {
      domain: 'royk.us',
      httpOnly: true,
      maxAge: 31536000000,
      secure: true,
    };

    // Act
    const result = generateCookieOptions();

    // Assert
    expect(result).toEqual(expected);
  });
});
