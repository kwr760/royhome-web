import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, RouteComponentProps } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Store } from 'redux';

import { Auth0Context } from './util/auth0/auth0-context';
import App from './App';
import Loading from './components/loading';
import NavBar from './components/app-bar';
import Footer from './components/footer';
import Resume from './features/resume/components';
import About from './components/about';
import Author from './components/author';
import TicTacToe from './features/tictactoe/components';
import createStore from './store/create-store';
import themeLight from './theme-light';

jest.mock('@loadable/component');
jest.mock('axios', () => ({
  put: jest.fn().mockResolvedValue({}),
}));
jest.mock('./components/loading');
jest.mock('./components/app-bar');
jest.mock('./components/footer');
jest.mock('./resume/components');
jest.mock('./components/about');
jest.mock('./components/author');
jest.mock('./tictactoe/components');

describe('src/client/App', () => {
  const getApp = (store: Store, props: RouteComponentProps) => (
    <Provider store={store}>
      <ThemeProvider theme={themeLight}>
        <Auth0Context.Provider value={{
          login: () => {},
          logout: () => {},
          getToken: () => {},
        }}>
          <Router>
            <App {...props} />
          </Router>
        </Auth0Context.Provider>
      </ThemeProvider>
    </Provider>
  );
  const props = {} as unknown as RouteComponentProps;
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
    (Loading as jest.Mock).mockImplementation(() => <div>Loading</div>);
    (NavBar as jest.Mock).mockImplementation(() => <div>NavBar</div>);
    (Footer as jest.Mock).mockImplementation(() => <div>Footer</div>);
    (Resume as jest.Mock).mockImplementation(() => <div>Resume</div>);
    (About as jest.Mock).mockImplementation(() => <div>About</div>);
    (Author as jest.Mock).mockImplementation(() => <div>Author</div>);
    (TicTacToe as jest.Mock).mockImplementation(() => <div>Tic Tac Toe</div>);

    // Act
    const { container, getByText, queryByText } = render(getApp(store, props));

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
    const { getByText, queryByText } = render(getApp(store, props));

    // Assert
    getByText(/Loading/);
    expect(queryByText('Home')).toBeNull();
  });
});
