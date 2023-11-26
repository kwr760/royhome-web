import { type Dispatch } from '@reduxjs/toolkit';
import { type AnyAction } from 'redux';
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
    await callApi(ApiConfigs.MODIFY_GROUP, {
      payload: {
        userId: group.userId,
        name: group.name,
        activities: [],
      },
      params: {
        groupId: group.groupId,
      } as ApiParams,
    });
    dispatch(modifyGroup( group as unknown as AnyAction));
  } catch (err) {
    const errorMsg = (err as Error).toString();
    dispatch(storeFailure(errorMsg));
  }
  dispatch(clearLoading());
};

export { modifyGroupApi };
