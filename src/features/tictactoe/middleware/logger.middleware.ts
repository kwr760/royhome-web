import type { Action } from '@reduxjs/toolkit';
import { StateType } from '../contracts/tictactoe.models';

const logger = (title?: string) => (action: Action | undefined, state: StateType): StateType => {
  let logHeader = 'action->state';
  if (title) {
    logHeader += ' ' + title;
  }
  console.log(logHeader, action, state);
  return state;
};

export { logger };

