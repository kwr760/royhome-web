import { type Dispatch } from '@reduxjs/toolkit';
import { ApiParams } from '../../../contracts/api/api';
import { clearLoading, setLoading } from '../../../store/session/session.slice';
import { callApi } from '../../../util/api/call-api';
import { ApiConfigs } from '../contracts/tracker.constants';
import { Group } from '../contracts/tracker.model';
import { trackerSlice } from './tracker.slice';

const modifyGroupApi = async (dispatch: Dispatch, group: Group) => {
  const {
    modifyGroup,
    storeFailure,
  } = trackerSlice.actions;
  try {
    dispatch(setLoading());
    const response = await callApi(ApiConfigs.MODIFY_GROUP, {
      payload: {
        ...group,
      },
      params: {
        groupId: group.groupId,
      } as ApiParams,
    });
    dispatch(modifyGroup(response.data));
  } catch (err) {
    const errorMsg = (err as Error).toString();
    dispatch(storeFailure(errorMsg));
  }
  dispatch(clearLoading());
};

export { modifyGroupApi };
