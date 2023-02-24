type Activity = {
  platform: string;
  activity: string;
  progress: string;
}
type Group = {
  name: string;
  activities: [Activity | undefined]
}

export type { Group, Activity };
