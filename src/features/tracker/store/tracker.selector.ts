import { createSelector } from 'reselect';
import { State } from '../../../contracts/state.models';
import { type TrackerStateType } from '../contracts/tracker.state';

const selectTracker = (state: State) => state.tracker;

const getGroups = createSelector(
  selectTracker,
  (tracker: TrackerStateType) => tracker.groups,
);

const getGroupById = (groupId: string) => createSelector(
  selectTracker,
  (tracker: TrackerStateType) => tracker.groups.find((group) => group.groupId === groupId),
);

const getActivityById = (groupId: string, activityId: string) => createSelector(
  selectTracker,
  (tracker: TrackerStateType) => {
    const group = tracker.groups.find((group) => group.groupId === groupId);
    return group?.activities.find(activity => activity.activityId === activityId);
  },
);

export { getGroups, getGroupById, getActivityById };
