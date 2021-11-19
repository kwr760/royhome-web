import React from 'react';
import { Auth0Provider } from '../../contracts/auth0.models';
import { Auth0Context } from './auth0-context';
import { noop } from '../noop';

const Auth0Provider: React.FC<Auth0Provider> = ({
  children,
}) => (
  <Auth0Context.Provider
    value={{
      logout: noop,
      login: noop,
      getToken: noop,
    }}
  >
    {children}
  </Auth0Context.Provider>
);

export { Auth0Provider };
