import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { StaticRouter as Router } from 'react-router-dom/server';
import type { Store } from 'redux';
import { AuthProvider } from './util/auth0/auth0-node';
import { config } from './contracts/constants/auth0.constants';
import Theme from './Theme';

interface Props {
  url?: string;
  store: Store;
}
const Main: FunctionComponent<Props> = ({ url = '', store }) => {
  return (
    <Provider store={store}>
      <AuthProvider
        domain={config.domain}
        client_id={config.clientId}
      >
        <Router location={url}>
          <Theme />
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default Main;
