import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions,
  GetTokenSilentlyOptions,
  RedirectLoginOptions,
} from '@auth0/auth0-spa-js';
import { Auth0ContextData, Auth0Provider, Auth0User } from '../../contracts/auth0.models';
import { SaveSessionType } from '../../contracts/store/session.store';
import { getDarkMode } from '../../store/session/session.selector';
import { env } from '../../config/env';
import { TOKEN_URL } from '../../contracts/constants/role.constants';
import { AuthContext } from './auth0-context';
import { setLoading, clearLoading, saveSession } from '../../store/session/session.slice';
import { noop } from '../noop';

const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState(
  {},
  document.title,
  window.location.pathname,
);

const initialContext = {
  loginWithRedirect: noop,
  logout: noop,
  getTokenSilently: noop,
} as Auth0Client;

const AuthProvider: React.FC<Auth0Provider> = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [auth0Client, setAuth0] = useState<Auth0Client>(initialContext);
  const darkMode = useSelector(getDarkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth0 = async () => {
      dispatch(setLoading());
      const auth0FromHook = await createAuth0Client(initOptions as Auth0ClientOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      let claim: SaveSessionType = {
        authenticated: false,
        expiration: 0,
        darkMode,
      };
      const user: Auth0User | undefined = await auth0FromHook.getUser();
      let context: Auth0ContextData | undefined;
      if (user) {
        const tokenClaims = await auth0FromHook.getIdTokenClaims();
        if (tokenClaims) {
          context = tokenClaims[TOKEN_URL];
          const expiration = (tokenClaims.exp || 0) * 1000;
          claim = {
            authenticated: true,
            expiration,
            darkMode,
            email: tokenClaims.email,
            context: JSON.stringify(context),
          };
        }
      }
      dispatch(saveSession(claim, { ...user, context } ));
      dispatch(clearLoading());
    };
    initAuth0();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode]);
  const logout = async (...p: unknown[]) => {
    const logoutProps = {
      ...p,
      returnTo: env.host,
    };
    await auth0Client.logout(logoutProps);
    dispatch(saveSession({authenticated: false, expiration: 0}, {}));
  };

  const login = (props: RedirectLoginOptions) => {
    return auth0Client.loginWithRedirect(props);
  };

  const getToken = (props: GetTokenSilentlyOptions) => {
    return auth0Client.getTokenSilently(props);
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        login,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
