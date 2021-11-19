import { createSelector } from 'reselect';
import { DarkModes } from '../../contracts/constants/session.constants';
import { State } from '../../contracts/state.models';

const isAuthenticated = createSelector(
  (state: State) => state.session,
  (session): boolean => session.authenticated || false,
);

const isLoading = createSelector(
  (state: State) => state.session,
  (session): boolean => session.isLoading || false,
);

const getDarkMode = createSelector(
  (state: State) => state.session,
  (session): string => session.darkMode || DarkModes.CLEAR_MODE,
);

const getUser = createSelector(
  (state: State) => state.session,
  (session) => session.user || {},
);

export { getDarkMode, getUser, isAuthenticated, isLoading };
