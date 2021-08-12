import { ResumeStateType } from './resume';
import { SessionStateType } from './session';
import { UserStateType } from './user';

export interface StateType {
  session: SessionStateType,
  user: UserStateType,
  resume: ResumeStateType,
}
