import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionStateType } from '../../../types/state/session';
import { SaveSessionType } from '../../../types/store/session';
import { DarkModes } from './session.constants';
import { AppThunk } from '../create-store';
import { callApi } from '../../util/api/call-api';
import { ApiConfigs } from '../../../config/api';
import { AnyAction } from 'redux';

const initialState: SessionStateType = {
  authenticated: false,
  expiration: 0,
  isLoading: false,
  darkMode: DarkModes.CLEAR_MODE,
} as SessionStateType;

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    updateAuthentication: (
      state,
      action: PayloadAction<{ authenticated: boolean, expiration: number }>,
    ) => {
      state.authenticated = action.payload.authenticated;
      state.expiration = action.payload.expiration;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    clearLoading: (state) => {
      state.isLoading = false;
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateDarkMode: (state, action: PayloadAction<string>) => {
      state.darkMode = action.payload;
    },
    saveSessionSuccess: (_state, action: PayloadAction<AnyAction>) => {
      console.log(action.payload);
    },
    saveSessionFailure: (_state, action: PayloadAction<string>) => {
      console.log(action.payload);
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const saveSession = (claim: SaveSessionType): AppThunk => async dispatch => {
  const {saveSessionSuccess, saveSessionFailure} = sessionSlice.actions;
  try {
    const response = await callApi(ApiConfigs.SAVE_SESSION, {
      payload: {
        ...claim,
      },
    });
    dispatch(saveSessionSuccess(response.data));
  } catch (err) {
    dispatch(saveSessionFailure(err.toString()));
  }
};

export const {updateAuthentication, updateLoading, updateDarkMode, setLoading, clearLoading} = sessionSlice.actions;
export default sessionSlice.reducer;
