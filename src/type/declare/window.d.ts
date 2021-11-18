import { StateType } from '../state/state';

declare global {
  interface Window {
    __PRELOADED_STATE__?: StateType;
  }
}

