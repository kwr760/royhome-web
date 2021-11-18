import React from 'react';
import { Provider } from 'react-redux';
import type { Store } from 'redux';
import { render } from '@testing-library/react';
import { createStore } from '../src/store/create-store';
import { DarkModes } from '../src/contracts/session.constants';
import Theme from '../src/Theme';

jest.mock('../src/App', () => jest.fn(() => <div>App</div>));

describe('src/client/Theme', () => {
  const getApp = (store: Store, props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
    <Provider store={store}>
      <Theme {...props} />
    </Provider>
  );
  const props = {};

  it('renders about page in light mode', () => {
    // Arrange
    const state = {
      session: {
        darkMode: DarkModes.CLEAR_MODE,
      },
    };
    const store = createStore(state);

    // Act
    const { getByText } = render(getApp(store, props));

    // Assert
    getByText(/App/);
  });
  it('renders about page in dark mode', () => {
    // Arrange
    const state = {
      session: {
        darkMode: DarkModes.DARK_MODE,
      },
    };
    const store = createStore(state);

    // Act
    const { getByText } = render(getApp(store, props));

    // Assert
    getByText(/App/);
  });
});
