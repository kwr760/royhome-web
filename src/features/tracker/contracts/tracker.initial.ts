import { TrackerActionEnum } from './tracker.enum';
import { type TrackerStateType } from './tracker.state';

const initialTrackerState: TrackerStateType = {
  groups: [],
  action: TrackerActionEnum.None,
};

export { initialTrackerState };
