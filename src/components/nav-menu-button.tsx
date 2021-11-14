import React, { Dispatch, FunctionComponent, memo, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, IconButton } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { isAuthenticated, getUser } from '../store/session/session.selector';
import { styles } from './styles/nav-menu-button.styles';

interface Props {
  setAnchor:Dispatch<SetStateAction<null | HTMLElement>>;
}
type NavMenuButtonProps = Props & WithStyles<typeof styles>;
export const NavMenuButtonComponent: FunctionComponent<NavMenuButtonProps> = ({ setAnchor, classes }) => {
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

export default  memo(withStyles(styles)(NavMenuButtonComponent));
