import React, { useContext } from 'react';
import { Auth0ContextType } from '../../type/auth0';
import { noop } from '../noop';

const initialContext = {
  login: noop,
  logout: noop,
  getToken: noop,
};

const Auth0Context = React.createContext<Auth0ContextType>(initialContext);
const useAuth0 = (): Auth0ContextType => useContext(Auth0Context);

export { Auth0Context, useAuth0 };
