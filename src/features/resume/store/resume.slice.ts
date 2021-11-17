import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AnyAction } from 'redux';
import { callApi } from '../../../util/api/call-api';
import { ApiConfigs } from '../../../config/api';
import { setLoading, clearLoading } from '../../../store/session/session.slice';
import { AppThunk } from '../../../store/create-store';
import { initialResumeState } from '../contracts/resume.initial';
import { ResumeStateType } from '../contracts/resume.state';

const resumeSlice = createSlice({
  name: 'resume',
  initialState: initialResumeState,
  reducers: {
    getResumeSuccess: (state: ResumeStateType, action: PayloadAction<AnyAction>) => {
      const { output: resume } = action.payload;
      const { email = 'unknown'} = resume;
      state.email = email;
      state.resumes = {
        [email]: resume,
      };
    },
    getResumeFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

const fetchResume = (email: string): AppThunk => async dispatch => {
  const { getResumeSuccess, getResumeFailure } = resumeSlice.actions;
  try {
    dispatch(setLoading());
    const response = await callApi(ApiConfigs.GET_RESUME, {
      params: {
        email,
      },
    });
    dispatch(clearLoading());
    dispatch(getResumeSuccess(response.data));
  } catch (err) {
    dispatch(clearLoading());
    const errorMsg = (err as Error).toString();
    dispatch(getResumeFailure(errorMsg));
  }
};

const resumeReducer = resumeSlice.reducer;
export {
  resumeReducer,
  fetchResume,
};

// export default resumeSlice.reducer;
