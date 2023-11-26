import { type Dispatch } from '@reduxjs/toolkit';
import { clearLoading, setLoading } from '../../../store/session/session.slice';
import { callApi } from '../../../util/api/call-api';
import { ApiConfigs } from '../contracts/tracker.constants';
import { trackerSlice } from './tracker.slice';

const fetchTracker = async (dispatch: Dispatch, userId: string) => {
  const { getTrackerSuccess, getTrackerFailure } = trackerSlice.actions;
  try {
    dispatch(setLoading());
    const response = await callApi(ApiConfigs.GET_GROUPS, {
      params: {
        userId,
      },
    });
    dispatch(getTrackerSuccess(response.data));
  } catch (err) {
    const errorMsg = (err as Error).toString();
    dispatch(getTrackerFailure(errorMsg));
  }
  dispatch(clearLoading());
};

export { fetchTracker };
