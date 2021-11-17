import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import type { Store } from 'redux';
import { ThemeProvider } from '@mui/styles';
import { render } from '@testing-library/react';

import { Auth0Context } from '../src/util/auth0/auth0-context';
import App from '../src/App';
import createStore from '../src/store/create-store';
import themeLight from '../src/theme-light';

jest.mock('@loadable/component');
jest.mock('axios', () => ({
  put: jest.fn().mockResolvedValue({}),
}));
jest.mock('../src/components/loading',
  () => jest.fn(() => <div>Loading</div>),
);
jest.mock('../src/components/nav',
  () => jest.fn(() => <div>NavBar</div>),
);
jest.mock('../src/components/footer',
  () => jest.fn(() => <div>Footer</div>),
);
jest.mock('../src/features/resume/components/resume-page',
  () => jest.fn(() => 'Resume'),
);
jest.mock('../src/components/about',
  () => jest.fn(() => 'About'),
);
jest.mock('../src/components/author',
  () => jest.fn(() => 'Author'),
);
jest.mock('../src/components/privacy',
  () => jest.fn(() => 'Privacy'),
);
jest.mock('../src/components/profile',
  () => jest.fn(() => 'Profile'),
);
jest.mock('../src/features/tictactoe/components/tictactoe',
  () => jest.fn(() => 'Tic Tac Toe'),
);

describe('src/App', () => {
  const context = {
    login: () => {},
    logout: () => {},
    getToken: () => {},
  };
  const getApp = (store: Store) => (
    <Provider store={store}>
      <ThemeProvider theme={themeLight}>
        <Auth0Context.Provider value={context}>
          <Router>
            <App />
          </Router>
        </Auth0Context.Provider>
      </ThemeProvider>
    </Provider>
  );
  beforeEach(() => {
    global.console.error = jest.fn();
    global.console.log = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders about page', () => {
    // Arrange
    const state = {
      session: {
        isLoading: false,
      },
    };
    const store = createStore(state);

    // Act
    const { container, getByText, queryByText } = render(getApp(store));

    // Assert
    getByText(/NavBar/);
    queryByText(/Index/);
    getByText(/Footer/);
    expect(queryByText('Loading')).toBeNull();
    expect((container.firstChild as HTMLElement).classList.contains('dark-theme')).toBe(false);
    expect((container.firstChild as HTMLElement).classList.contains('light-theme')).toBe(false);
  });
  it('renders loading', () => {
    // Arrange
    const state = {
      session: {
        isLoading: true,
      },
    };
    const store = createStore(state);

    // Act
    const { getByText, queryByText } = render(getApp(store));

    // Assert
    getByText(/Loading/);
    expect(queryByText('Home')).toBeNull();
  });
});
