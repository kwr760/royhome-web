import { StateType } from '../contracts/tictactoe.models';

const isRemoteGame = (state: StateType): boolean => {
  const { client, remote, sessionId } = state;

  return !!(remote && sessionId && client);
};

export { isRemoteGame };
