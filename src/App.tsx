import React, { FunctionComponent, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import loadable from '@loadable/component';

import { styles } from './App.styles';
import Nav from './components/nav';
import Footer from './components/footer';
import CookieBanner from './components/cookie-banner';
import Loading from './components/loading';
import ProtectRoute from './components/protect-route';
import Resume from './features/resume/components/resume-page';
import { isLoading  } from './store/session/session.selector';

const AboutPage = /* #__LOADABLE__ */ () =>
  import(/* webpackPrefetch: true */ './components/about');
const AuthorPage = /* #__LOADABLE__ */ () =>
  import(/* webpackPrefetch: true */ './components/author');
const PrivacyPage = /* #__LOADABLE__ */ () =>
  import(/* webpackPrefetch: true */ './components/privacy');
const ProfilePage = /* #__LOADABLE__ */ () =>
  import(/* webpackPrefetch: true */ './components/profile');
const TicTacToePage = /* #__LOADABLE__ */ () =>
  import(/* webpackPrefetch: true */ './features/tictactoe/components/tictactoe');
const AboutLoadable = loadable(AboutPage, { ssr: false });
const AuthorLoadable = loadable(AuthorPage, { ssr: false });
const PrivacyLoadable = loadable(PrivacyPage, { ssr: false });
const ProfileLoadable = loadable(ProfilePage, { ssr: true });
const TicTacToeLoadable = loadable(TicTacToePage, { ssr: true });

type AppProps = WithStyles<typeof styles>;
const AppComponent: FunctionComponent<AppProps> = ({classes}) => {
  const loading = useSelector(isLoading);

  return (
    <>
      {/*<React.StrictMode>*/}
      { loading ? <Loading /> : null }
      <div id="app" className={classes.app}>
        <a href="#main"><div className="sr-only">Skip to main</div></a>
        <Nav />
        <Container id="main" className={classes.paper}>
          <Routes>
            <Route path="/" element={<Resume />} />
            <Route path="about" element={<AboutLoadable />} />
            <Route path="author" element={<AuthorLoadable />} />
            <Route path="privacy" element={<PrivacyLoadable />} />
            <Route path="tictactoe" element={<ProtectRoute><TicTacToeLoadable /></ProtectRoute>} />
            <Route path="profile" element={<ProtectRoute><ProfileLoadable /></ProtectRoute>} />
          </Routes>
        </Container>
        <Footer />
        <CookieBanner />
      </div>
    </>
  );
};

export default memo(withStyles(styles)(AppComponent));
