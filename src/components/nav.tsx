import React, { FunctionComponent, memo } from 'react';
import { useLocation } from 'react-router';
import { Avatar, Container, AppBar, Toolbar } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';

import { findRouteTab } from './functions/find-route-tab';
import NavMenu from './nav-menu';
import NavMenuButton from './nav-menu-button';
import NavTabs from './nav-tabs';
import DarkMode from './dark-mode';
import logo from '../assets/images/browns-on-gray.png';
import { styles } from './styles/nav.styles';

type NavProps = WithStyles<typeof styles>;
const NavComponent: FunctionComponent<NavProps> = ({classes}) => {
  const location = useLocation();
  const initialTab = findRouteTab(location.pathname);
  const [position, setPosition] = React.useState<number>(initialTab);
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  return (
    <Container className={classes.container}>
      <div className={classes.grow}>
        <AppBar className={classes.banner} position="static">
          <Toolbar>
            <Avatar alt="RoyHome" src={logo} className={classes.avator}/>
            <NavTabs position={position} setPosition={setPosition} />
            <div className={classes.grow} />
            <DarkMode />
            <NavMenuButton setAnchor={setAnchor} />
          </Toolbar>
        </AppBar>
        <NavMenu anchor={anchor} setAnchor={setAnchor} />
      </div>
    </Container>
  );
};

export default memo(withStyles(styles)(NavComponent));
