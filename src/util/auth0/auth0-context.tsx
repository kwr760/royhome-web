import React, { useContext } from 'react';
import { Auth0 } from '../../contracts/auth0.models';
import { noop } from '../noop';

const initialContext = {
  login: noop,
  logout: noop,
  getToken: noop,
};

const Auth0Context = React.createContext<Auth0>(initialContext);
const useAuth0 = (): Auth0 => useContext(Auth0Context);

export { Auth0Context, useAuth0 };
