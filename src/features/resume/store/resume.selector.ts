import { createSelector } from 'reselect';
import { State } from '../../../contracts/state.models';
import { ResumeStateType } from '../contracts/resume.state';

const getResume = createSelector(
  (state: State) => state.resume,
  (resume: ResumeStateType) => resume.resumes[resume.email],
);

export { getResume };
