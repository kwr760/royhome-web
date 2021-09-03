import React, { FunctionComponent } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';

import NavBar from './components/page/app-bar';
import Footer from './components/page/footer';
import CookieBanner from './components/page/cookie-banner';
import Loading from './components/page/loading';
import PrivateRoute from './components/page/private-route';
import ResumePage from './components/resume';
import { isLoading  } from './store/session/session.selector';
import { useStyles } from './App.styles';

const AboutPage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './components/about');
const AuthorPage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './components/author');
const PrivacyPage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './components/privacy');
const ProfilePage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './components/profile');
const TicTacToePage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './components/tictactoe');
const AboutLoadable = loadable(AboutPage, { ssr: true });
const AuthorLoadable = loadable(AuthorPage, { ssr: true });
const PrivacyLoadable = loadable(PrivacyPage, { ssr: true });
const ProfileLoadable = loadable(ProfilePage, { ssr: true });
const TicTacToeLoadable = loadable(TicTacToePage, { ssr: true });

/**
 * @return {string}
 */
const App: FunctionComponent<RouteComponentProps> = () => {
  const classes = useStyles();
  const loading = useSelector(isLoading);

  return (
    <>
      { loading ? <Loading /> : null }
      <div id="app" className={classes.app}>
        <a href="#main"><div className="sr-only">Skip to main</div></a>
        <NavBar />
        <Container id="main" className={classes.paper}>
          <Switch>
            <Route
              path="/"
              exact
              component={ResumePage}
            />
            <Route path="/about" component={AboutLoadable} />
            <Route path="/author" component={AuthorLoadable} />
            <Route path="/privacy" component={PrivacyLoadable} />
            <PrivateRoute
              path="/tictactoe"
              component={TicTacToeLoadable}
              userRole="engineer"
            />
            <PrivateRoute path="/profile" component={ProfileLoadable} />
          </Switch>
        </Container>
        <Footer />
        <CookieBanner />
      </div>
    </>
  );
};

export default App;
