import { ResumeStateType } from '../features/resume/contracts/resume.state';
import { Session } from './session.models';

interface State {
  session: Session,
  resume: ResumeStateType,
}

export type { State };
