import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { render } from '@testing-library/react';
import themeLight from '../../src/theme-light';

import Nav from '../../src/components/nav';

jest.mock('../../src/components/nav-tabs',
  () => jest.fn(() => <div>Tabs</div>),
);
jest.mock('../../src/components/nav-menu',
  () => jest.fn(() => <div>Menu</div>),
);
jest.mock('../../src/components/nav-menu-button',
  () => jest.fn(() => <div>Button</div>),
);
jest.mock('../../src/components/dark-mode',
  () => jest.fn(() => <div>Dark</div>),
);
jest.mock('react-router', () => ({
  useLocation: () => ({
    pathname: 'localhost:3000/example/path',
  }),
}));

describe('components/nav', () => {
  it('renders nav', () => {
    // Arrange // Act
    const { getByText } = render(
      <ThemeProvider theme={themeLight}>
        <Nav />
      </ThemeProvider>,
    );

    // Assert
    getByText(/Tabs/);
    getByText(/Menu/);
    getByText(/Button/);
    getByText(/Dark/);
  });
});
