import { useSelector } from 'react-redux';

import { isAuthenticated, isLoading, getDarkMode, getUser } from './session.selector';
import { DarkModes } from './session.constants';

jest.mock('react-redux');

describe('store/session/session.selector', () => {
  it('should return session information', () => {
    // Arrange
    const expectedAuthentication = true;
    const expectedLoading = true;
    const expectedDarkMode = DarkModes.DARK_MODE;
    const expectedUser = { user: 'user' };
    const mockState = {
      session: {
        authenticated: expectedAuthentication,
        isLoading: expectedLoading,
        darkMode: expectedDarkMode,
        user: expectedUser,
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const authenticated = useSelector(isAuthenticated);
    const loading = useSelector(isLoading);
    const darkMode = useSelector(getDarkMode);
    const user = useSelector(getUser);

    // Assert
    expect(authenticated).toEqual(expectedAuthentication);
    expect(loading).toEqual(expectedLoading);
    expect(darkMode).toEqual(expectedDarkMode);
    expect(user).toEqual(expectedUser);
  });
  it('should return session default', () => {
    // Arrange
    const expectedAuthentication = false;
    const expectedLoading = false;
    const expectedDarkMode = DarkModes.CLEAR_MODE;
    const expectedUser = {};
    const mockState = {
      session: {},
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const authenticated = useSelector(isAuthenticated);
    const loading = useSelector(isLoading);
    const darkMode = useSelector(getDarkMode);
    const user = useSelector(getUser);

    // Assert
    expect(authenticated).toEqual(expectedAuthentication);
    expect(loading).toEqual(expectedLoading);
    expect(darkMode).toEqual(expectedDarkMode);
    expect(user).toEqual(expectedUser);
  });
});
