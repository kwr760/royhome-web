import { ActionTypes } from '../contracts/tictactoe.context';
import { StateType } from '../contracts/tictactoe.models';

const logger = (title?: string) => (action: ActionTypes | undefined, state: StateType): StateType => {
  let logHeader = 'action->state';
  if (title) {
    logHeader += ' ' + title;
  }
  console.log(logHeader, action, state);
  return state;
};

export { logger };

