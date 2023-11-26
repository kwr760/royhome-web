type Activity = {
  activityId: string,
  platform: string,
  activity: string,
  progress: string,
  group?: Group,
}
type Group = {
  groupId: string,
  userId: string,
  name: string,
  activities: Array<Activity>,
}
export { type Group, type Activity };
