import { ResumeStateType } from '../../feature/resume/type/state/resume';
import { SessionStateType } from './session';

export interface StateType {
  session: SessionStateType,
  resume: ResumeStateType,
}
