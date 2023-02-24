import type { Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AnyAction } from 'redux';
import { clearLoading, setLoading } from '../../../store/session/session.slice';
import { callApi } from '../../../util/api/call-api';
import { ApiConfigs } from '../contracts/tracker.constants';
import { initialTrackerState } from '../contracts/tracker.initial';
import { TrackerStateType } from '../contracts/tracker.state';

const trackerSlice = createSlice({
  name: 'tracker',
  initialState: initialTrackerState,
  reducers: {
    getTrackerSuccess: (state: TrackerStateType, action: PayloadAction<AnyAction>) => {
      const { output: tracker } = action.payload;
      const { groups = []} = tracker;
      state.groups = groups;
    },
    getTrackerFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

const fetchTracker = async (dispatch: Dispatch, userId: string) => {
  const { getTrackerSuccess, getTrackerFailure } = trackerSlice.actions;
  try {
    dispatch(setLoading());
    const response = await callApi(ApiConfigs.GET_GROUPS, {
      params: {
        userId,
      },
    });
    dispatch(clearLoading());
    dispatch(getTrackerSuccess(response.data));
  } catch (err) {
    dispatch(clearLoading());
    const errorMsg = (err as Error).toString();
    dispatch(getTrackerFailure(errorMsg));
  }
};

const trackerReducer = trackerSlice.reducer;
export {
  trackerReducer,
  fetchTracker,
};
