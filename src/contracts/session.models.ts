import { Auth0User } from './auth0.models';

interface Session {
  sessionId?: string,
  browserId?: string,
  authenticated: boolean,
  expiration: number,
  isLoading: boolean,
  darkMode: string,
  user: Auth0User,
}

export type { Session };
