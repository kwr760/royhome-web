import { ThemeProvider } from '@mui/styles';
import React, { Dispatch, SetStateAction } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import type { Store } from 'redux';
import thunk from 'redux-thunk';
import { fireEvent, render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';

import NavMenuButton from '../../src/components/nav-menu-button';
import { themeLight } from '../../src/theme-light';

describe('components/nav-menu-button', () => {
  const mockStore = configureMockStore([thunk]);
  const getComponent = (store: Store, setAnchor: Dispatch<SetStateAction<HTMLElement | null>>) => (
    <Provider store={store}>
      <ThemeProvider theme={themeLight}>
        <Router>
          <NavMenuButton setAnchor={setAnchor} />
        </Router>
      </ThemeProvider>
    </Provider>
  );
  it('renders navbar menu button', () => {
    // Arrange
    const state = {
      user: {},
      session: {
        authenticated: true,
      },
    };
    const store = mockStore(state);

    const setAnchor = jest.fn() as Dispatch<SetStateAction<HTMLElement | null>>;

    // Act
    const { getByRole } = render(getComponent(store, setAnchor));
    fireEvent.click(getByRole('button'));

    // Assert
    expect(setAnchor).toBeCalled();
  });
  it('renders navbar menu button', () => {
    // Arrange
    const state = {
      user: {
        picture: 'picture',
      },
      session: {
        authenticated: false,
      },
    };
    const store = mockStore(state);

    const setAnchor = jest.fn() as Dispatch<SetStateAction<HTMLElement | null>>;

    // Act
    const { getByRole } = render(getComponent(store, setAnchor));

    // Assert
    getByRole('button');
  });
});
