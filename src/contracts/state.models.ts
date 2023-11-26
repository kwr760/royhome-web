import { type ResumeStateType } from '../features/resume/contracts/resume.state';
import { type TrackerStateType } from '../features/tracker/contracts/tracker.state';
import { type Session } from './session.models';

interface State {
  session: Session,
  resume: ResumeStateType,
  tracker: TrackerStateType,
}

export { type State };
