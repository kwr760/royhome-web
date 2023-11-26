import loadable from '@loadable/component';
import { Container } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { styles } from './App.styles';
import CookieBanner from './components/cookie-banner';
import Footer from './components/footer';
import Loading from './components/loading';
import Nav from './components/nav';
import ProtectRoute from './components/protect-route';
import Resume from './features/resume/components/resume-page';
import { getSessionId, getUser, isLoading } from './store/session/session.selector';

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
const TrackerPage = /* #__LOADABLE__ */ () =>
  import(/* webpackPrefetch: true */ './features/tracker/components/tracker');
const AboutLoadable = loadable(AboutPage, { ssr: false });
const AuthorLoadable = loadable(AuthorPage, { ssr: false });
const PrivacyLoadable = loadable(PrivacyPage, { ssr: false });
const ProfileLoadable = loadable(ProfilePage, { ssr: true });
const TicTacToeLoadable = loadable(TicTacToePage, { ssr: true });
const TrackerLoadable = loadable(TrackerPage, { ssr: true });

type AppProps = WithStyles<typeof styles>;
const AppComponent: FunctionComponent<AppProps> = ({classes}) => {
  const loading = useSelector(isLoading);
  const sessionId = useSelector(getSessionId);
  const user = useSelector(getUser);

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
            <Route path="tictactoe" element={<TicTacToeLoadable sessionId={sessionId} user={user} />} />
            <Route path="tracker" element={<ProtectRoute><TrackerLoadable /></ProtectRoute>} />
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
