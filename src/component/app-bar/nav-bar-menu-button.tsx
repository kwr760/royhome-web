import { Avatar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { NavBarMenuButtonPropType } from '../../type/prop/nav-bar/menu-button';
import { isAuthenticated, getUser } from '../../store/session/session.selector';
import { useStyles } from './nav-bar-menu-button.styles';

export const NavBarMenuButton: FunctionComponent<NavBarMenuButtonPropType> = ({ setAnchor }) => {
  const classes = useStyles();
  const authenticated = useSelector(isAuthenticated);
  const user = useSelector(getUser);
  const { picture: userPicture = '' } = user;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  return <IconButton
    aria-label="menu"
    aria-controls='nav-bar-menu'
    aria-haspopup="true"
    onClick={handleMenuOpen}
    className={classes.iconButton}
  >
    {
      authenticated ?
        <Avatar alt="loginPicture" src={userPicture} className={classes.large}/> :
        <MenuIcon fontSize="large" />
    }
  </IconButton>;
};
