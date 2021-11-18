import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ApiConfigs } from '../../contracts/api.contants';
import { initialSessionState } from '../../contracts/session.initial';
import { UserStateType } from '../../type/state/user';
import { UpdateSessionType, SaveSessionType } from '../../type/store/session';
import { AppThunk } from '../create-store';
import { callApi } from '../../util/api/call-api';
import logger from '../../util/logger/browser';


const sessionSlice = createSlice({
  name: 'session',
  initialState: initialSessionState,
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
    updateSession: (state, action: PayloadAction<UpdateSessionType>) => {
      const user = action.payload.user || state.user;
      Object.assign(state, {
        ...action.payload.session,
        user,
      });
    },
  },
});

const updateDarkMode = (darkMode: string): AppThunk => async dispatch => {
  const {updateSession} = sessionSlice.actions;
  try {
    const { data } = await callApi(ApiConfigs.SAVE_SESSION, {
      payload: {
        darkMode,
      },
    });
    const current = Date.now();
    const payload = {
      session: {
        ...data.output,
        authenticated: data.output.expiration > current,
      },
    };
    dispatch(updateSession(payload));
  } catch (err) {
    const errorMsg = (err as Error).toString();
    logger.error(errorMsg);
  }
};
const saveSession = (claim: SaveSessionType, user: UserStateType): AppThunk => async dispatch => {
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
    const errorMsg = (err as Error).toString();
    logger.error(errorMsg);
  }
};

const { updateAuthentication, updateLoading, setLoading, clearLoading } = sessionSlice.actions;
const sessionReducer = sessionSlice.reducer;

export { sessionReducer, clearLoading, saveSession, setLoading, updateAuthentication, updateDarkMode, updateLoading };
