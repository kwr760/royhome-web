import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';
import type { AnyAction } from 'redux';
import { initialTrackerState } from '../contracts/tracker.initial';
import { type Group, type Activity } from '../contracts/tracker.model';

const sortGroups = (a: Group, b: Group) => {
  if (a.name.toUpperCase() < b.name.toUpperCase()) {
    return -1;
  }
  if (a.name.toUpperCase() > b.name.toUpperCase()) {
    return 1;
  }
  return 0;
};
const sortActivities = (a: Activity, b: Activity) => {
  if (a.platform.toUpperCase() < b.platform.toUpperCase()) {
    return -1;
  }
  if (a.platform.toUpperCase() > b.platform.toUpperCase()) {
    return 1;
  }
  if (a.activity.toUpperCase() < b.activity.toUpperCase()) {
    return -1;
  }
  if (a.activity.toUpperCase() > b.activity.toUpperCase()) {
    return 1;
  }
  return 0;
};

const trackerSlice = createSlice({
  name: 'tracker',
  initialState: initialTrackerState,
  reducers: {
    getTrackerSuccess: (state, action: PayloadAction<AnyAction>) => {
      const { output: groups } = action.payload;
      groups.map((group: Group) => group.activities.sort(sortActivities));
      return {
        action: state.action,
        groups: groups.sort(sortGroups),
      };
    },
    getTrackerFailure: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    addGroup: (state, action: PayloadAction<AnyAction>) => {
      const newGroup = {
        ...action.payload.output,
        activities: [],
      };
      const newGroups = produce(state.groups, draft => {
        draft.push(newGroup);
      });
      return {
        ...state,
        groups: newGroups.sort(sortGroups),
      };
    },
    modifyGroup: (state, action: PayloadAction<AnyAction>) => {
      const newGroup = {
        ...action.payload,
      } as unknown as Group;
      const newGroups = produce(state.groups, draft => {
        const index = draft.findIndex((group: Group) => group.groupId === newGroup.groupId);
        if (index !== -1) {
          draft[index] = newGroup;
        }
      });
      return {
        ...state,
        groups: newGroups.sort(sortGroups),
      };
    },
    removeGroup: (state, action: PayloadAction<AnyAction>) => {
      const { groupId } = action.payload;
      const newGroups = produce(state.groups, draft => {
        const index = draft.findIndex(group => group.groupId === groupId);
        if (index !== -1) {
          draft.splice(index, 1);
        }
      });

      return {
        ...state,
        groups: newGroups,
      };
    },
    addActivity: (state, action: PayloadAction<AnyAction>) => {
      const { groupId, output } = action.payload;
      const newActivity = {
        ...output,
      };
      const newGroups = produce(state.groups, draft => {
        const index = draft.findIndex((group: Group) => group.groupId === groupId);
        if (index !== -1 ) {
          draft[index].activities.push(newActivity);
          draft[index].activities.sort(sortActivities);
        }
      });
      return {
        ...state,
        groups: newGroups,
      };
    },
    modifyActivity: (state, action: PayloadAction<AnyAction>) => {
      const { groupId, output } = action.payload;
      const changedActivity = {
        ...output,
      };
      const newGroups = produce(state.groups, draft => {
        const groupIndex = draft.findIndex((group: Group) => group.groupId === groupId);
        if (groupIndex !== -1 ) {
          const activityIndex = draft[groupIndex].activities.findIndex(
            (activity: Activity) => activity.activityId === changedActivity.activityId);
          draft[groupIndex].activities[activityIndex] = changedActivity;
          draft[groupIndex].activities.sort(sortActivities);
        }
      });
      return {
        ...state,
        groups: newGroups,
      };
    },
    removeActivity: (state, action: PayloadAction<AnyAction>) => {
      const { activityId, groupId } = action.payload;
      const newGroups = produce(state.groups, draft => {
        const groupIndex = draft.findIndex((group: Group) => group.groupId === groupId);
        if (groupIndex !== -1 ) {
          const activityIndex = draft[groupIndex].activities.findIndex(
            (activity: Activity) => activity.activityId === activityId);
          draft[groupIndex].activities.splice(activityIndex, 1);
        }
      });
      return {
        ...state,
        groups: newGroups,
      };
    },
    storeFailure: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

const trackerReducer = trackerSlice.reducer;

export {
  trackerSlice,
  trackerReducer,
};
