import { ResumeStateType } from '../../features/resume/contracts/resume.state';
import { SessionStateType } from './session';

export interface StateType {
  session: SessionStateType,
  resume: ResumeStateType,
}
