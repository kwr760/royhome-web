import { Tab, Tabs, useMediaQuery, useTheme } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { NavBarTabsPropType } from '../../types/prop/nav-bar/tabs';

import { isAuthenticated, getUser } from '../../store/session/session.selector';
import { displayPage } from './display-page';
import { pages } from './pages';
import { useStyles } from './nav-bar-tabs.styles';

export const NavBarTabs: FunctionComponent<NavBarTabsPropType> = ({ position, setPosition }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const authenticated = useSelector(isAuthenticated);
  const user = useSelector(getUser);

  const handleChange = (_event: React.ChangeEvent<unknown>, newValue: number) => {
    setPosition(newValue);
  };

  if (isMobile) {
    return null;
  }

  return (
    <Tabs
      value={position}
      onChange={handleChange}
      aria-label="tabs"
    >
      {
        pages.filter(displayPage(authenticated, user)).map((page) => {
          return <Tab component={NavLink} key={page.path} to={page.path} label={page.name} className={classes.tab} />;
        })
      }
    </Tabs>
  );
};
