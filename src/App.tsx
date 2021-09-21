import React, { FunctionComponent } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';

import NavBar from './component/app-bar';
import Footer from './component/footer';
import CookieBanner from './component/cookie-banner';
import Loading from './component/loading';
import PrivateRoute from './component/private-route';
import ResumePage from './feature/resume/component';
import { isLoading  } from './store/session/session.selector';
import { useStyles } from './App.styles';

const AboutPage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './component/about');
const AuthorPage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './component/author');
const PrivacyPage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './component/privacy');
const ProfilePage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './component/profile');
const TicTacToePage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './feature/tictactoe/component');
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
