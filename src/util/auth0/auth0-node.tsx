import React from 'react';
import { Auth0Context } from './auth0-context';
import { Auth0ProviderType } from '../../type/auth0';
import { noop } from '../noop';

const Auth0Provider: React.FC<Auth0ProviderType> = ({
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

export default Auth0Provider;
