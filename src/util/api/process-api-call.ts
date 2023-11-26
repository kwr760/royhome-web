import { type Dispatch } from '@reduxjs/toolkit';
import { type ApiConfigWithDispatch, type ApiDetailsType } from '../../contracts/api/api';
import { clearLoading, setLoading } from '../../store/session/session.slice';
import { callApi } from './call-api';

const processApiCall = async (dispatch: Dispatch, apiConfig: ApiConfigWithDispatch, details: ApiDetailsType ) => {
  const { successAction, failureAction} = apiConfig;
  try {
    dispatch(setLoading());
    const response = await callApi(apiConfig, details);
    dispatch(clearLoading());
    dispatch(successAction(response.data));
  } catch (err) {
    dispatch(clearLoading());
    const errorMsg = (err as Error).toString();
    dispatch(failureAction(errorMsg));
  }
};

export { processApiCall };
