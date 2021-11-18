import { createSelector } from 'reselect';
import { StateType } from '../../type/state/state';
import { DarkModes } from '../../contracts/session.constants';

const isAuthenticated = createSelector(
  (state: StateType) => state.session,
  (session): boolean => session.authenticated || false,
);

const isLoading = createSelector(
  (state: StateType) => state.session,
  (session): boolean => session.isLoading || false,
);

const getDarkMode = createSelector(
  (state: StateType) => state.session,
  (session): string => session.darkMode || DarkModes.CLEAR_MODE,
);

const getUser = createSelector(
  (state: StateType) => state.session,
  (session) => session.user || {},
);

export { getDarkMode, getUser, isAuthenticated, isLoading };
