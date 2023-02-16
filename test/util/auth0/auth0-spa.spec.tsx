import React from 'react';
import { useDispatch } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import createAuth0Client from '@auth0/auth0-spa-js';

import { AuthProvider } from '../../../src/util/auth0/auth0-spa';
import { useAuth } from '../../../src/util/auth0/auth0-context';

jest.mock('@auth0/auth0-spa-js');
jest.mock('react-redux');
jest.mock('../../../src/util/api/call-api');
jest.mock('../../../src/util/api/get-api-url');

describe('util/auth0/react-auth0-spa', () => {
  const testProvider = (coverage = false) => (
    <AuthProvider
      domain="domain"
      client_id="clientId"
      audience="audience"
      redirect_uri="/origin"
    >
      <TestConsumer coverage={coverage} />
    </AuthProvider>
  );

  const TestConsumer: React.FC<{ coverage: boolean; }> = ({ coverage = false }) => {
    const {
      login,
      getToken,
      logout,
    } = useAuth();

    if (coverage) {
      login({});
      getToken({});
    }

    return (
      <div>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    );
  };
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should login an authenticated provider', async () => {
    // Arrange
    (createAuth0Client as jest.Mock).mockResolvedValue({
      isAuthenticated: jest.fn(() => true),
      getUser: jest.fn(() => ({ name: 'Tester' })),
      logout: jest.fn(() => ({})),
      getIdTokenClaims: jest.fn(() => ({ exp: 999999999, 'http:\\royhome.net': { data: 'test data' } })),
    });
    const dispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    const expectedLoadingOn = { payload: undefined, type: 'session/setLoading' };
    const expectedLoadingOff = { payload: undefined, type: 'session/clearLoading' };

    // Act
    const { getByText } = render(testProvider());
    await waitFor(() => {});
    fireEvent.click(getByText(/Logout/));
    await waitFor(() => {});

    // Assert
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, expectedLoadingOn);
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedLoadingOff);
  });
  it('should login a limited authenticated provider', async () => {
    // Arrange
    (createAuth0Client as jest.Mock).mockResolvedValue({
      isAuthenticated: jest.fn(() => true),
      getUser: jest.fn(() => ({ name: 'Tester' })),
      logout: jest.fn(() => ({})),
      getIdTokenClaims: jest.fn(() => ({ 'http:\\royhome.net': { data: 'test data' } })),
    });
    const dispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    const expectedLoadingOn = { payload: undefined, type: 'session/setLoading' };
    const expectedLoadingOff = { payload: undefined, type: 'session/clearLoading' };

    // Act
    render(testProvider());
    await waitFor(() => {});

    // Assert
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, expectedLoadingOn);
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedLoadingOff);
  });
  it('should handle redirect callback', async () => {
    // Arrange
    const savedWindow = global.window;
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        pathname: 'code=',
        search: {
          includes: () => true,
        },
      },
    });
    (createAuth0Client as jest.Mock).mockResolvedValue({
      getUser: jest.fn(() => {}),
      loginWithRedirect: jest.fn(() => ({})),
      getTokenSilently: jest.fn(() => ({})),
      handleRedirectCallback: jest.fn(() => ({ test: 'kroy' })),
    });
    const dispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    const expectedLoadingOn = { payload: undefined, type: 'session/setLoading' };
    const expectedLoadingOff = { payload: undefined, type: 'session/clearLoading' };

    // Act
    render(testProvider(true));
    await waitFor(() => {});

    // Assert
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, expectedLoadingOn);
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedLoadingOff);
    global.window = savedWindow;
  });
});
