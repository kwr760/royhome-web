import { SessionStateType } from './session';
import { ResumeStateType } from '../../features/resume/types/state/resume';

export interface StateType {
  session: SessionStateType,
  resume: ResumeStateType,
}
