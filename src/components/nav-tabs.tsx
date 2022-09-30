import React, { Dispatch, FunctionComponent, memo, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import { pageRoutes } from '../contracts/constants/pages.constants';
import { isAuthenticated, getUser } from '../store/session/session.selector';
import { displayPage } from './functions/display-page';
import { styles } from './styles/nav-tabs.styles';

interface Props {
  position: number;
  setPosition: Dispatch<SetStateAction<number>>;
}
type NavBarTabsProps = Props & WithStyles<typeof styles>;
const NavTabsComponent: FunctionComponent<NavBarTabsProps> = ({ position, setPosition, classes }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const authenticated = useSelector(isAuthenticated);
  const user = useSelector(getUser);

  const handleChange = (_event: React.SyntheticEvent, newValue: React.SetStateAction<number>) => {
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
      className={classes.tabs}
    >
      {
        pageRoutes.filter(displayPage(authenticated, user)).map((page) => {
          return <Tab
            component={NavLink}
            key={page.path}
            to={page.path}
            label={page.name}
            className={classes.tab}
            id={`tab-${page.name}`}
            aria-controls={`tab-${page.name}`}
          />;
        })
      }
    </Tabs>
  );
};

export default memo(withStyles(styles)(NavTabsComponent));
