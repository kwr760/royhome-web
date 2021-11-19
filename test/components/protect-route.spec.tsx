import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import type { Store } from 'redux';
import { render } from '@testing-library/react';
import { Auth0Context } from '../../src/contracts/auth0.models';

import { AuthContext } from '../../src/util/auth0/auth0-context';
import { hasNeededRole } from '../../src/util/auth0/has-needed-role';
import ProtectRoute from '../../src/components/protect-route';
import { createStore } from '../../src/store/create-store';

jest.mock('../../src/util/auth0/has-needed-role');

describe('components/protect-route', () => {
  const userRole = 'admin';
  const getPrivateRoute = (store: Store, auth: Auth0Context, role?: string, path = '/') => (
    <Router>
      <Provider store={store}>
        <AuthContext.Provider value={auth}>
          <Routes>
            {/*<PrivateRoute element={mockComponent} userRole={role} path={path} />*/}
            <Route element={<ProtectRoute userRole={role} ><div>Protected</div></ProtectRoute>} path={path} />
          </Routes>
        </AuthContext.Provider>
      </Provider>
    </Router>
  );

  it('should render with authentication and role', () => {
    // Arrange
    const auth = {} as unknown as Auth0Context;
    const state = {
      session: {
        authenticated: true,
      },
    };
    const store = createStore(state);
    (hasNeededRole as jest.Mock).mockReturnValue(true);

    // Act
    const { getByText } = render(getPrivateRoute(store, auth, userRole));

    // Assert
    getByText(/Protected/);
  });
  it('should render error message without role', () => {
    // Arrange
    const auth = {
      isAuthenticated: true,
    } as unknown as Auth0Context;
    const state = {
      session: {
        authenticated: true,
      },
    };
    const store = createStore(state);
    (hasNeededRole as jest.Mock).mockReturnValue(false);

    // Act
    const { getByText } = render(getPrivateRoute(store, auth, userRole));

    // Assert
    getByText(/admin/);
    getByText(/Unauthorized - You need the following role to view this page:/);
  });
  it('should render with authentication and without role', () => {
    // Arrange
    const auth = {} as unknown as Auth0Context;
    const state = {
      session: {
        authenticated: true,
      },
    };
    const store = createStore(state);
    (hasNeededRole as jest.Mock).mockReturnValue(true);

    // Act
    const { getByText } = render(getPrivateRoute(store, auth));

    // Assert
    getByText(/Protected/);
  });
});
