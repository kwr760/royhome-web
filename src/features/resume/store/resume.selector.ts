import { createSelector } from 'reselect';
import { StateType } from '../../../type/state/state';
import { ResumeStateType } from '../types/state/resume';

export const getResume = createSelector(
  (state: StateType) => state.resume,
  (resume: ResumeStateType) => resume.resumes[resume.email],
);
