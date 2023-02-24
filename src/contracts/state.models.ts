import { ResumeStateType } from '../features/resume/contracts/resume.state';
import { TrackerStateType } from '../features/tracker/contracts/tracker.state';
import { Session } from './session.models';

interface State {
  session: Session,
  resume: ResumeStateType,
  tracker?: TrackerStateType,
}

export type { State };
