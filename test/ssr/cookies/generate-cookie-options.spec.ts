import { Request } from 'express';
import { generateCookieOptions } from '../../../src/ssr/cookies/generate-cookie-options';

describe('server/rendering/cookies/generate-cookie-options', () => {
  const req = {
    header: jest.fn(),
  };
  it('should create options - no host', () => {
    // Arrange
    const expected = {
      domain: 'royk.us',
      httpOnly: true,
      maxAge: 31536000000,
      secure: true,
    };

    // Act
    const result = generateCookieOptions(req as unknown as Request);

    // Assert
    expect(result).toEqual(expected);
  });
  it('should create options with host', () => {
    // Arrange
    const expected = {
      domain: 'royhome.net',
      httpOnly: true,
      maxAge: 31536000000,
      secure: true,
    };
    req.header = jest.fn(() => 'royhome.net');

    // Act
    const result = generateCookieOptions(req as unknown as Request);

    // Assert
    expect(result).toEqual(expected);
  });
});
