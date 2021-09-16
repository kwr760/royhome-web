import React, { useContext } from 'react';
import { Auth0ContextType } from '../../type/auth0';
import { noop } from '../noop';

const initialContext = {
  login: noop,
  logout: noop,
  getToken: noop,
};

export const Auth0Context = React.createContext<Auth0ContextType>(initialContext);
export const useAuth0 = (): Auth0ContextType => useContext(Auth0Context);
