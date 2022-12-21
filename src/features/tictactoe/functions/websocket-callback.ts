import { remote } from '../context/context.actions';
import { ActionsType } from '../contracts/tictactoe.context';

const websocketCallback = (dispatch: (action: ActionsType) => void) => (msg: { body: string; }): void => {
  dispatch(remote({
    message: msg.body,
  }));
};

export { websocketCallback };
