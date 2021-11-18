import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import type { Store } from 'redux';
import { ThemeProvider } from '@mui/styles';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';

import Profile from '../../src/components/profile';
import { createStore } from '../../src/store/create-store';
import { themeLight } from '../../src/theme-light';
import { StateType } from '../../src/type/state/state';

describe('components/profile', () => {
  const getProfile = (store: Store) => (
    <Provider store={store}>
      <ThemeProvider theme={themeLight}>
        <Router>
          <Profile />
        </Router>
      </ThemeProvider>
    </Provider>
  );
  it('should render profile', async () => {
    // Arrange
    const state: StateType = {
      session: {
        isLoading: false,
        expiration: 1,
        darkMode: 'dark-mode',
        authenticated: true,
        user: {
          nickname: 'Nickname',
          picture: 'Picture',
          email: 'User Email',
        },
      },
      resume: {
        email: 'Resume Email',
        resumes: {},
      },
    };
    const store = createStore(state);

    // Act
    const { getByText, getByAltText } = render(getProfile(store));

    // Assert
    await waitFor(() => getByAltText('Profile'));
    getByText(/Nickname/);
    getByText(/Picture/);
    getByText(/email/);
  });
});
