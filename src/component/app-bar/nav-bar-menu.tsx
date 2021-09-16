import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Divider, ListItemIcon, ListItemText, Menu, MenuItem, Typography, useMediaQuery, useTheme,
} from '@material-ui/core';
import { FiEyeOff, FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';
import { NavBarMenuPropType } from '../../type/prop/nav-bar/menu';

import { useAuth0 } from '../../util/auth0/auth0-context';
import { isAuthenticated, getUser } from '../../store/session/session.selector';
import { displayPage } from './display-page';
import { pages } from './pages';
import { useStyles } from './nav-bar-menu.styles';

export const NavBarMenu: FunctionComponent<NavBarMenuPropType> = ( { anchor, setAnchor }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const authenticated = useSelector(isAuthenticated);
  const handleMenuClose = () => { setAnchor(null); };
  const { login, logout } = useAuth0();
  const user = useSelector(getUser);
  const onLogin = () => {
    login({});
    handleMenuClose();
  };
  const onLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <Menu
      anchorEl={anchor}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      id='nav-bar-menu'
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={Boolean(anchor)}
      onClose={handleMenuClose}
      classes={{ list: classes.list, paper: classes.paper }}
    >
      { authenticated ? <Typography className={classes.profile}>Kevin Roy</Typography> : null }
      { authenticated ? <Divider classes={{ root: classes.divider}} /> : null }
      { isMobile ?
        pages.filter(displayPage(authenticated, user)).map((page) => {
          const IconComponent = page.icon;
          return (
            <MenuItem component={NavLink} key={page.path} to={page.path} onClick={handleMenuClose}>
              <ListItemIcon classes={{ root: classes.icon }}><IconComponent /></ListItemIcon>
              <ListItemText primary={page.name} />
            </MenuItem>
          );
        }) :
        null }
      { isMobile ? <Divider classes={{ root: classes.divider }} /> : null }
      { authenticated ? (
        <MenuItem component={NavLink} to="/profile" onClick={handleMenuClose}>
          <ListItemIcon classes={{ root: classes.icon }}><FiUser /></ListItemIcon>
          <ListItemText primary="Profile"/>
        </MenuItem>
      ) : null }
      <MenuItem component={NavLink} to="/privacy" onClick={handleMenuClose}>
        <ListItemIcon classes={{ root: classes.icon }}><FiEyeOff /></ListItemIcon>
        <ListItemText primary="Privacy"/>
      </MenuItem>
      <Divider classes={{ root: classes.divider}} />
      { authenticated ? (
        <MenuItem onClick={onLogout}>
          <ListItemIcon classes={{ root: classes.icon }}><FiLogOut /></ListItemIcon>
          <ListItemText primary="Logout"/>
        </MenuItem>
      ) : (
        <MenuItem onClick={onLogin}>
          <ListItemIcon classes={{ root: classes.icon }}><FiLogIn /></ListItemIcon>
          <ListItemText primary="Login"/>
        </MenuItem>
      )}
    </Menu>
  );
};
