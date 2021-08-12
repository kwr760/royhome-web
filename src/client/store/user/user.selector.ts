import { createSelector } from 'reselect';
import { StateType } from '../../../types/state/state';

export const getUser = createSelector(
  (state: StateType) => state.user,
  (user) => user,
);
