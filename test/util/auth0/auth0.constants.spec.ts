import {
  COOKIE_JWT_PAYLOAD,
} from '../../../src/util/auth0/auth0.constants';

describe('util/auth0/constants', () => {
  it('should provide constants', () => {
    // Arrange/Act
    const expectedCookieJwtPayload = 'jwtPayload';

    // Assert
    expect(COOKIE_JWT_PAYLOAD).toEqual(expectedCookieJwtPayload);
  });
});
