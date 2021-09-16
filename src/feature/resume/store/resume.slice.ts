import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { ResumeStateType } from '../type/state/resume';
import { callApi } from '../../../util/api/call-api';
import { ApiConfigs } from '../../../config/api';
import { setLoading, clearLoading } from '../../../store/session/session.slice';
import { AppThunk } from '../../../store/create-store';

const initialState: ResumeStateType = {
  email: 'kroy760@gmail.com',
  resumes: {},
} as ResumeStateType;

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
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

export const fetchResume = (email: string): AppThunk => async dispatch => {
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
    dispatch(getResumeFailure(err.toString()));
  }
};

export default resumeSlice.reducer;
