import { UserStateType } from './user';

export interface SessionStateType  {
  sessionId?: string,
  browserId?: string,
  authenticated?: boolean,
  expiration?: number,
  isLoading?: boolean,
  darkMode?: string,
  user?: UserStateType,
}
