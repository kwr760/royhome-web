import { generateCookieIds } from './generate-cookie-ids';

describe('server/rendering/cookies/generate-cookie-ids', () => {
  it('should create ids', () => {
    // Arrange/Act
    const browserId = undefined;
    const sessionId = undefined;

    // Act
    const result = generateCookieIds(browserId, sessionId);

    // Assert
    expect(result).toEqual({
      browserId: expect.any(String),
      sessionId: expect.any(String),
    });
  });

  it('should not create ids', () => {
    // Arrange/Act
    const browserId = 'browser-id';
    const sessionId = 'session-id';

    // Act
    const result = generateCookieIds(browserId, sessionId);

    // Assert
    expect(result).toEqual({ browserId, sessionId });
  });
});
