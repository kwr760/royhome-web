import React, { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, Container, AppBar, Toolbar } from '@material-ui/core';

import { findRouteTab } from './find-route-tab';
import { NavBarMenu } from './nav-bar-menu';
import { NavBarMenuButton } from './nav-bar-menu-button';
import { NavBarTabs } from './nav-bar-tabs';
import DarkButton from '../dark-button';
import { useStyles } from './index.styles';

import logo from '../../assets/images/browns-on-gray.png';


const NavBar: FunctionComponent = () => {
  const classes = useStyles();
  const location = useLocation();
  const initialTab = findRouteTab(location.pathname);
  const [position, setPosition] = React.useState<number>(initialTab);
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  return (
    <Container className={classes.grid}>
      <div className={classes.grow}>
        <AppBar className={classes.banner} position="static">
          <Toolbar>
            <Avatar alt="RoyHome" src={logo} className={classes.avator}/>
            <NavBarTabs position={position} setPosition={setPosition} />
            <div className={classes.grow} />
            <DarkButton />
            <NavBarMenuButton setAnchor={setAnchor} />
          </Toolbar>
        </AppBar>
        <NavBarMenu anchor={anchor} setAnchor={setAnchor} />
      </div>
    </Container>
  );
};

export default NavBar;
