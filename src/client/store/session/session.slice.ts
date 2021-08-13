import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionStateType } from '../../../types/state/session';
import { UserStateType } from '../../../types/state/user';
import { UpdateSessionType, SaveSessionType } from '../../../types/store/session';
import { DarkModes } from './session.constants';
import { AppThunk } from '../create-store';
import { callApi } from '../../util/api/call-api';
import { ApiConfigs } from '../../../config/api';
import logger from '../../util/logger';

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
    updateSession: (state, action: PayloadAction<UpdateSessionType>) => {
      Object.assign(state, {
        ...action.payload.session,
        user: action.payload.user,
      });
    },
  },
});

export const saveSession = (claim: SaveSessionType, user: UserStateType): AppThunk => async dispatch => {
  const {updateSession} = sessionSlice.actions;
  try {
    const { data } = await callApi(ApiConfigs.SAVE_SESSION, {
      payload: {
        ...claim,
      },
    });
    const current = Date.now();
    const payload = {
      session: {
        ...data.output,
        authenticated: data.output.expiration > current,
      },
      user,
    };
    dispatch(updateSession(payload));
  } catch (err) {
    logger.error(err.toString());
  }
};

export const {updateAuthentication, updateLoading, updateDarkMode, setLoading, clearLoading} = sessionSlice.actions;
export default sessionSlice.reducer;
