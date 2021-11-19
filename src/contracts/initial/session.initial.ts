import { DarkModes } from '../constants/session.constants';
import { Session } from '../session.models';

const initialSessionState: Session = {
  authenticated: false,
  expiration: 0,
  isLoading: false,
  darkMode: DarkModes.CLEAR_MODE,
} as Session;

export { initialSessionState };
