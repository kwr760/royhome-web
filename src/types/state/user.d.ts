import { ContextStateType } from './context';

export interface UserStateType {
  userId?: string,
  email?: string,
  context?: ContextStateType,
  nickname?: string,
  name?: string,
  picture?: string,
}
