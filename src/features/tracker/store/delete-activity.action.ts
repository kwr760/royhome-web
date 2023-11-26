import { type Dispatch } from '@reduxjs/toolkit';
import { type AnyAction } from 'redux';
import { ApiParams } from '../../../contracts/api/api';
import { clearLoading, setLoading } from '../../../store/session/session.slice';
import { callApi } from '../../../util/api/call-api';
import { ApiConfigs } from '../contracts/tracker.constants';
import { Activity } from '../contracts/tracker.model';
import { trackerSlice } from './tracker.slice';

const deleteActivityApi = async (dispatch: Dispatch, activity: Activity) => {
  const {
    removeActivity,
    storeFailure,
  } = trackerSlice.actions;
  try {
    const storePayload = { groupId: activity?.group?.groupId, activityId: activity.activityId } as unknown as AnyAction;
    dispatch(setLoading());
    await callApi(ApiConfigs.DELETE_ACTIVITY, {
      params: {
        activityId: activity.activityId,
      } as ApiParams,
    });
    dispatch(removeActivity( storePayload ));
  } catch (err) {
    const errorMsg = (err as Error).toString();
    dispatch(storeFailure(errorMsg));
  }
  dispatch(clearLoading());
};

export { deleteActivityApi };
