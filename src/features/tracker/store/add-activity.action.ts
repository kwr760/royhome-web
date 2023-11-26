import { type Dispatch } from '@reduxjs/toolkit';
import { clearLoading, setLoading } from '../../../store/session/session.slice';
import { callApi } from '../../../util/api/call-api';
import { ApiConfigs } from '../contracts/tracker.constants';
import { type Activity } from '../contracts/tracker.model';
import { trackerSlice } from './tracker.slice';

const addActivityApi = async (dispatch: Dispatch, activity: Activity) => {
  const {
    addActivity,
    storeFailure,
  } = trackerSlice.actions;
  try {
    dispatch(setLoading());
    const response = await callApi(ApiConfigs.CREATE_ACTIVITY, {
      payload: {
        ...activity,
      },
    });
    const storePayload = {
      groupId: activity?.group?.groupId,
      ...response.data,
    };
    dispatch(addActivity(storePayload));
  } catch (err) {
    const errorMsg = (err as Error).toString();
    dispatch(storeFailure(errorMsg));
  }
  dispatch(clearLoading());
};

export { addActivityApi };
