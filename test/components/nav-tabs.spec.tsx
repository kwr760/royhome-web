import { ThemeProvider } from '@mui/styles';
import React, { Dispatch, SetStateAction } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import type { Store } from 'redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mediaQuery from 'css-mediaquery';

import NavTabs from '../../src/components/nav-tabs';
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

describe('component/page/app-bar/nav-bar-tabs', () => {
  const mockStore = configureMockStore([thunk]);
  const getComponent = (store: Store, position: number, setPosition: Dispatch<SetStateAction<number>>) => (
    <Provider store={store}>
      <ThemeProvider theme={themeLight}>
        <Router>
          <NavTabs position={position} setPosition={setPosition} />
        </Router>
      </ThemeProvider>
    </Provider>
  );
  it('renders nav-tabs in browser', () => {
    // Arrange
    const state = {
      user: {
        name: 'Tester',
        context: {
          role: 'engineer',
        },
      },
      session: {
        authenticated: true,
      },
    };
    const store = mockStore(state);
    window.matchMedia = createMatchMedia(1024) as (q: string) => MediaQueryList;

    const position = 0;
    const setPosition = jest.fn() as Dispatch<SetStateAction<number>>;

    // Act
    const { getByText, getAllByRole } = render(getComponent(store, position, setPosition));
    const tabs = getAllByRole('tab');
    fireEvent.click(tabs[0]);
    // Assert
    getByText(/Resume/);
    getByText(/About/);
    getByText(/Author/);
    expect(setPosition).not.toBeCalled();

    // Assert
    fireEvent.click(tabs[1]);
    expect(setPosition).toBeCalledWith(1);
  });
  it('does not render nav-tabs in mobile', () => {
    // Arrange
    const state = {
      user: {
        name: 'Tester',
        context: {
          role: 'engineer',
        },
      },
      session: {
        authenticated: true,
      },
    };
    const store = mockStore(state);
    window.matchMedia = createMatchMedia(400) as (q: string) => MediaQueryList;

    const position = 0;
    const setPosition = jest.fn() as Dispatch<SetStateAction<number>>;

    // Act
    const { queryByText } = render(getComponent(store, position, setPosition));

    // Assert
    // getByText(/Resume/);
    expect(queryByText(/Resume/)).toBeNull();
  });
});
