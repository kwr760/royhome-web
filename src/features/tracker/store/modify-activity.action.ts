import { type Dispatch } from '@reduxjs/toolkit';
import { ApiParams } from '../../../contracts/api/api';
import { clearLoading, setLoading } from '../../../store/session/session.slice';
import { callApi } from '../../../util/api/call-api';
import { ApiConfigs } from '../contracts/tracker.constants';
import { Activity } from '../contracts/tracker.model';
import { trackerSlice } from './tracker.slice';

const modifyActivityApi = async (dispatch: Dispatch, activity: Activity) => {
  const {
    modifyActivity,
    storeFailure,
  } = trackerSlice.actions;
  try {
    dispatch(setLoading());
    const response = await callApi(ApiConfigs.MODIFY_ACTIVITY, {
      payload: {
        ...activity,
      },
      params: {
        activityId: activity.activityId,
      } as ApiParams,
    });
    const storePayload = {
      groupId: activity?.group?.groupId,
      ...response.data,
    };
    dispatch(modifyActivity(storePayload));
  } catch (err) {
    const errorMsg = (err as Error).toString();
    dispatch(storeFailure(errorMsg));
  }
  dispatch(clearLoading());
};

export { modifyActivityApi };
