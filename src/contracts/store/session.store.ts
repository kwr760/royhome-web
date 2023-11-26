import { Auth0User } from '../auth0.models';

interface SaveSessionType {
  authenticated?: boolean;
  expiration?: number;
  email?: string;
  darkMode?: string;
  context?: string;
}

interface UpdateSessionType {
  session?: SaveSessionType;
  user?: Auth0User;
}

export type { SaveSessionType, UpdateSessionType};
