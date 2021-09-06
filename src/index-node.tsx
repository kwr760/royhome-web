import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { StaticRouter as Router, Route, RouteComponentProps } from 'react-router-dom';
import { IndexPropType } from './types/prop';

import Auth0Provider from './util/auth0/auth0-node';
import { config } from './util/auth0/auth0.constants';
import Theme from './Theme';

const Main: FunctionComponent<IndexPropType> = ({ url, store }) => {
  return (
    <Provider store={store}>
      <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
      >
        <Router location={url} context={{}}>
          <Route component={
            (props: RouteComponentProps) => <Theme {...props} />
          }
          />
        </Router>
      </Auth0Provider>
    </Provider>
  );
};

export default Main;
