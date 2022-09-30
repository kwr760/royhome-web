import React, { useContext } from 'react';
import { Auth0Context } from '../../contracts/auth0.models';
import { noop } from '../noop';

const initialContext = {
  login: noop,
  logout: noop,
  getToken: noop,
};

const AuthContext = React.createContext<Auth0Context>(initialContext);
const useAuth = (): Auth0Context => useContext(AuthContext);

export { AuthContext, useAuth };
