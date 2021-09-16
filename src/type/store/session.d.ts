import { UserStateType } from '../state/user';

export interface SaveSessionType {
  authenticated?: boolean,
  expiration?: number,
  email?: string,
  darkMode?: string,
  context?: string,
}

export interface UpdateSessionType {
  session?: SaveSessionType;
  user?: UserStateType;
}
