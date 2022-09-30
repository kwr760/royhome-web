import React, { Dispatch, FunctionComponent, memo, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Divider, ListItemIcon, ListItemText, Menu, MenuItem, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import { FiEyeOff, FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';
import { pageRoutes } from '../contracts/constants/pages.constants';

import { useAuth } from '../util/auth0/auth0-context';
import { isAuthenticated, getUser } from '../store/session/session.selector';
import { displayPage } from './functions/display-page';
import { styles } from './styles/nav-menu.styles';

interface Props {
  anchor: null | HTMLElement;
  setAnchor: Dispatch<SetStateAction<null | HTMLElement>>;
}
type NavMenuProps = Props & WithStyles<typeof styles>;
const NavMenuComponent: FunctionComponent<NavMenuProps> = ( { anchor, setAnchor, classes }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const authenticated = useSelector(isAuthenticated);
  const handleMenuClose = () => { setAnchor(null); };
  const { login, logout } = useAuth();
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
      // getContentAnchorEl={null}
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
        pageRoutes.filter(displayPage(authenticated, user)).map((page) => {
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

export default memo(withStyles(styles)(NavMenuComponent));
