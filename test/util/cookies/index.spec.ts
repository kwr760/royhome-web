import Cookies from 'universal-cookie';
import { ACKNOWLEDGED_COOKIE_USE_COOKIE, getCookie, setCookie } from '../../../src/util/cookies';

describe('src/client/util/cookies', () => {
  const cookies = new Cookies();

  it('should getCookie', () => {
    // Arrange
    const expected = 'true';
    cookies.set(ACKNOWLEDGED_COOKIE_USE_COOKIE, expected);

    // Act
    const result = getCookie(ACKNOWLEDGED_COOKIE_USE_COOKIE);

    // Assert
    expect(result).toBe(expected);
  });

  it('should setCookie', () => {
    // Arrange
    const expected = 'true';
    cookies.set(ACKNOWLEDGED_COOKIE_USE_COOKIE, 'bad');

    // Act
    setCookie(ACKNOWLEDGED_COOKIE_USE_COOKIE, expected);

    // Assert
    expect(cookies.get(ACKNOWLEDGED_COOKIE_USE_COOKIE)).toBe(expected);
  });
});
