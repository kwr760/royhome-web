import { State } from '../state.models';

declare global {
  interface Window {
    __PRELOADED_STATE__?: State;
  }
}

