import { ResumeStateType } from './resume';
import { SessionStateType } from './session';

export interface StateType {
  session: SessionStateType,
  resume: ResumeStateType,
}
