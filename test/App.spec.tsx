import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, RouteComponentProps } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Store } from 'redux';

import { Auth0Context } from '../src/util/auth0/auth0-context';
import App from '../src/App';
import Loading from '../src/component/loading';
import NavBar from '../src/component/app-bar';
import Footer from '../src/component/footer';
import Resume from '../src/feature/resume/component';
import About from '../src/component/about';
import Author from '../src/component/author';
import TicTacToe from '../src/feature/tictactoe/component';
import createStore from '../src/store/create-store';
import themeLight from '../src/theme-light';

jest.mock('@loadable/component');
jest.mock('axios', () => ({
  put: jest.fn().mockResolvedValue({}),
}));
jest.mock('../src/component/loading');
jest.mock('../src/component/app-bar');
jest.mock('../src/component/footer');
jest.mock('../src/feature/resume/component');
jest.mock('../src/component/about');
jest.mock('../src/component/author');
jest.mock('../src/feature/tictactoe/component');

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
