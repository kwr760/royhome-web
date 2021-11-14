import { ThemeProvider } from '@mui/styles';
import React, { Dispatch, SetStateAction } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import type { Store } from 'redux';
import thunk from 'redux-thunk';
import { fireEvent, render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import mediaQuery from 'css-mediaquery';

import NavMenu from '../../src/components/nav-menu';
import themeLight from '../../src/theme-light';

function createMatchMedia(width: number) {
  return (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  }) as unknown as MediaQueryList;
}

declare global {
  interface Window {
    matchMedia: (query: string) => MediaQueryList;
  }
}

describe('component/page/app-bar/nav-bar-menu', () => {
  const mockStore = configureMockStore([thunk]);
  const getComponent = (
    store: Store,
    anchor: HTMLElement | null,
    setAnchor: Dispatch<SetStateAction<HTMLElement | null>>,
  ) => (
    <Provider store={store}>
      <ThemeProvider theme={themeLight}>
        <Router>
          <NavMenu anchor={anchor} setAnchor={setAnchor} />
        </Router>
      </ThemeProvider>
    </Provider>
  );
  it('renders app-bar-menu in browser', () => {
    // Arrange
    const anchor = null;
    const setAnchor = jest.fn();
    const state = {
      session: {
        authenticated: true,
      },
    };
    const store = mockStore(state);
    window.matchMedia = createMatchMedia(1024) as (q: string) => MediaQueryList;

    // Act
    const { getByText } = render(getComponent(store, anchor, setAnchor));
    fireEvent.click(getByText(/Logout/));

    // Assert
    getByText(/Kevin Roy/);
    getByText(/Profile/);
    getByText(/Privacy/);
    getByText(/Logout/);
  });
  it('renders app-bar-menu in mobile', () => {
    // Arrange
    const anchor = null;
    const setAnchor = jest.fn();
    const state = {
      session: {
        authenticated: false,
      },
    };
    const store = mockStore(state);
    window.matchMedia = createMatchMedia(400) as (q: string) => MediaQueryList;

    // Act
    const { getByText } = render(getComponent(store, anchor, setAnchor));
    fireEvent.click(getByText(/Login/));

    // Assert
    getByText(/Resume/);
    getByText(/About/);
    getByText(/Author/);
    getByText(/Privacy/);
    getByText(/Login/);
  });
});
