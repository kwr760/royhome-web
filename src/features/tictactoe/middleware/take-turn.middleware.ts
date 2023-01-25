import { publishTakeTurnAction } from '../context/context.actions';
import { ActionTypes } from '../contracts/tictactoe.context';
import { ActionEnum, GameStateEnum } from '../contracts/tictactoe.enum';
import { StateType } from '../contracts/tictactoe.models';
import { replaceAt } from '../functions/replace-at';

const takeTurnMiddleware = (action: ActionTypes, state: StateType): StateType => {
  if (action.type === ActionEnum.TakeTurn) {
    const { position, player } = action.payload;
    const { client, sessionId, board, remote } = state;
    const newBoard = replaceAt(board, position, player.toString());
    if (remote && client && sessionId) {
      const publishAction = publishTakeTurnAction({
        sessionId,
        board: newBoard,
      });
      client.publish(publishAction);
      state.gameState = GameStateEnum.Wait;
    }
    action.payload = {
      ...action.payload,
      board: newBoard,
    };
  }
  return state;
};

export { takeTurnMiddleware };
