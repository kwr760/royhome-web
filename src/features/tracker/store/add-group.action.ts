import { type Dispatch } from '@reduxjs/toolkit';
import { clearLoading, setLoading } from '../../../store/session/session.slice';
import { callApi } from '../../../util/api/call-api';
import { ApiConfigs } from '../contracts/tracker.constants';
import { Group } from '../contracts/tracker.model';
import { trackerSlice } from './tracker.slice';

const addGroupApi = async (dispatch: Dispatch, group: Group) => {
  const {
    addGroup,
    storeFailure,
  } = trackerSlice.actions;
  try {
    dispatch(setLoading());
    const response = await callApi(ApiConfigs.CREATE_GROUP, {
      payload: {
        ...group,
      },
    });
    dispatch(addGroup(response.data));
  } catch (err) {
    const errorMsg = (err as Error).toString();
    dispatch(storeFailure(errorMsg));
  }
  dispatch(clearLoading());
};

export { addGroupApi };
