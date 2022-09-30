interface UserApiType {
  userId?: string;
  email?: string;
  context?: string;
}
interface SessionApiType {
  sessionId?: string;
  browserId?: string;
  expiration?: number;
  darkMode?: string;
  user?: UserApiType;
}

export type { SessionApiType };
