import { SessionStateType } from './session';
import { ResumeStateType } from '../../feature/resume/type/state/resume';

export interface StateType {
  session: SessionStateType,
  resume: ResumeStateType,
}
