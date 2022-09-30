import React from 'react';
import { Auth0Provider } from '../../contracts/auth0.models';
import { AuthContext } from './auth0-context';
import { noop } from '../noop';

const AuthProvider: React.FC<Auth0Provider> = ({
  children,
}) => (
  <AuthContext.Provider
    value={{
      logout: noop,
      login: noop,
      getToken: noop,
    }}
  >
    {children}
  </AuthContext.Provider>
);

export { AuthProvider };
