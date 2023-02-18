import 'core-js';
import React, { useEffect, FunctionComponent } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';
import type { Store } from 'redux';

import { AuthProvider } from './util/auth0/auth0-spa';
import { config } from './contracts/constants/auth0.constants';
import Theme from './Theme';
import { createStore } from './store/create-store';
import { removeJssStyle } from './util/remove-jss-style';

interface Props {
  store: Store;
}
const Main: FunctionComponent<Props> = ({ store }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    removeJssStyle(jssStyles);
    const preloadedState = document.querySelector('#preloaded-state');
    removeJssStyle(preloadedState);
  }, []);

  const { origin } = window.location;
  const redirect = {
    redirect_uri: origin,
  };
  return (
    <Provider store={store}>
      <AuthProvider
        domain={config.domain}
        clientId={config.clientId}
        authorizationParams={redirect}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        <Router>
          <Theme />
        </Router>
      </AuthProvider>
    </Provider>
  );
};

loadableReady(() => {
  const root = document.getElementById('main');
  if (root !== null) {
    const preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;
    const store = createStore(preloadedState);
    hydrateRoot(root, <Main store={store} />);
  }
});

