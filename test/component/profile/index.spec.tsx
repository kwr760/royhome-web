import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { Store } from 'redux';
import { initialGame, initialPlayers, initialPlayerTurn } from '../../../src/feature/tictactoe/store/tictactoe.slice';
import { StateType } from '../../../src/type/state/state';
import themeLight from '../../../src/theme-light';
import Profile from '../../../src/component/profile';
import createStore from '../../../src/store/create-store';

describe('feature/resume/componentprofile', () => {
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
      tictactoe: {
        playerTurn: initialPlayerTurn,
        players: [ ...initialPlayers ],
        game: [ ...initialGame ],
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
