import { createSelector } from 'reselect';
import { State } from '../../../contracts/state.models';
import { TrackerStateType } from '../contracts/tracker.state';

const getGroups = createSelector(
  (state: State) => state.tracker,
  (tracker: TrackerStateType) => tracker.groups,
);

export { getGroups };
