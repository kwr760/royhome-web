import { Group } from './tracker.model';

interface TrackerStateType {
  groups: [Group?],
  error?: string,
}

export type { TrackerStateType };
