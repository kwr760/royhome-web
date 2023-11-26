import { type Dispatch } from '@reduxjs/toolkit';
import { type AnyAction } from 'redux';
import { ApiParams } from '../../../contracts/api/api';
import { clearLoading, setLoading } from '../../../store/session/session.slice';
import { callApi } from '../../../util/api/call-api';
import { ApiConfigs } from '../contracts/tracker.constants';
import { trackerSlice } from './tracker.slice';

const deleteGroupApi = async (dispatch: Dispatch, groupId: string) => {
  const {
    removeGroup,
    storeFailure,
  } = trackerSlice.actions;
  try {
    dispatch(setLoading());
    await callApi(ApiConfigs.DELETE_GROUP, {
      params: {
        groupId: groupId,
      } as ApiParams,
    });
    dispatch(removeGroup( { groupId } as unknown as AnyAction));
  } catch (err) {
    const errorMsg = (err as Error).toString();
    dispatch(storeFailure(errorMsg));
  }
  dispatch(clearLoading());
};

export { deleteGroupApi };
