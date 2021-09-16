// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { UserApiType } from './user';

export interface SessionApiType {
  sessionId?: string;
  browserId?: string;
  expiration?: number;
  darkMode?: string;
  user?: UserApiType;
}
