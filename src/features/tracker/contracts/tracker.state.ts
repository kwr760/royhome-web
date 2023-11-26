import { TrackerActionEnum } from './tracker.enum';
import { type Group } from './tracker.model';

interface TrackerStateType {
  groups: Array<Group>;
  action: TrackerActionEnum;
  error?: string;
}

export { type TrackerStateType };
