/* eslint-disable no-underscore-dangle */
import 'core-js';
import React, { FunctionComponent } from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';

import { Store } from 'redux';
import { StateType } from '../types/state.types';

import Auth0Provider from '../util/auth0/auth0-spa';
import { config } from '../util/auth0/auth0.constants';

import Theme from './Theme';
import createStore from './store/create-store';
import { removeJssStyle } from './util/remove-jss-style';

declare global {
  interface Window {
    __PRELOADED_STATE__?: StateType;
  }
}

interface Props {
  store: Store;
}
const Main: FunctionComponent<Props> = ({ store }) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    removeJssStyle(jssStyles);
  }, []);

  return (
    <Provider store={store}>
      <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        audience={config.audience}
        redirect_uri={window.location.origin}
      >
        <Router>
          <Route component={(props: RouteComponentProps) => <Theme {...props} />} />
        </Router>
      </Auth0Provider>
    </Provider>
  );
};

loadableReady(() => {
  const root = document.getElementById('main');
  if (root !== null) {
    const preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;
    const store = createStore(preloadedState);
    hydrate(<Main store={store} />, root);
  }
});

