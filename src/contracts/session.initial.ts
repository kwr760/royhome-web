import { SessionStateType } from '../type/state/session';
import { DarkModes } from './session.constants';

const initialSessionState: SessionStateType = {
  authenticated: false,
  expiration: 0,
  isLoading: false,
  darkMode: DarkModes.CLEAR_MODE,
} as SessionStateType;

export { initialSessionState };
