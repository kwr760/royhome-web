import { ThemeProvider } from '@mui/styles';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import type { Store } from 'redux';

import Profile from '../../src/components/profile';
import { State } from '../../src/contracts/state.models';
import { TrackerActionEnum } from '../../src/features/tracker/contracts/tracker.enum';
import { createStore } from '../../src/store/create-store';
import { themeLight } from '../../src/theme-light';

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
    const state: State = {
      session: {
        isLoading: false,
        expiration: 1,
        darkMode: 'dark-mode',
        authenticated: true,
        user: {
          nickname: 'Nickname',
          picture: 'Picture',
          email: 'User Email',
          userId: 'id',
        },
      },
      resume: {
        email: 'Resume Email',
        resumes: {},
      },
      tracker: {
        groups: [],
        action: TrackerActionEnum.None,
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
