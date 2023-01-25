import { remote } from '../context/context.actions';
import { ActionTypes } from '../contracts/tictactoe.context';

const websocketCallback = (dispatch: (action: ActionTypes) => void) => (msg: { body: string; }): void => {
  dispatch(remote({
    message: msg.body,
  }));
};

export { websocketCallback };
