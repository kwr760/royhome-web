import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { render } from '@testing-library/react';
import themeLight from '../../../src/theme-light';

import DarkButton from '../../../src/component/dark-button';
import NavBar from '../../../src/component/app-bar';
import { NavBarTabs } from '../../../src/component/app-bar/nav-bar-tabs';
import { NavBarMenu } from '../../../src/component/app-bar/nav-bar-menu';
import { NavBarMenuButton } from '../../../src/component/app-bar/nav-bar-menu-button';

jest.mock('../../../src/component/app-bar/nav-bar-tabs');
jest.mock('../../../src/component/app-bar/nav-bar-menu');
jest.mock('../../../src/component/app-bar/nav-bar-menu-button');
jest.mock('../../../src/component/dark-button');
jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: 'localhost:3000/example/path',
  }),
}));

describe('component/page/app-bar/index', () => {
  it('renders app-bar', () => {
    // Arrange
    (NavBarTabs as jest.Mock).mockImplementation(() => <div>NavBar Tabs</div>);
    (NavBarMenu as jest.Mock).mockImplementation(() => <div>NavBarMenu</div>);
    (NavBarMenuButton as jest.Mock).mockImplementation(() => <div>NavBar Menu Button</div>);
    (DarkButton as jest.Mock).mockImplementation(() => <div>Dark Button</div>);

    // Act
    const { getByText } = render(
      <ThemeProvider theme={themeLight}>
        <NavBar />
      </ThemeProvider>,
    );

    // Assert
    getByText(/NavBar Tabs/);
    getByText(/NavBarMenu/);
    getByText(/NavBar Menu Button/);
    getByText(/Dark Button/);
  });
});
