import { Client } from '@stomp/stompjs';
import { publishTakeTurnAction } from '../context/context.actions';
import { ActionTypes } from '../contracts/tictactoe.context';
import { ActionEnum, GameStateEnum } from '../contracts/tictactoe.enum';
import { StateType } from '../contracts/tictactoe.models';
import { isRemoteGame } from '../functions/is-remote-game';
import { replaceAt } from '../functions/replace-at';

const takeTurnMiddleware = (action: ActionTypes, state: StateType): StateType => {
  if (action.type === ActionEnum.TakeTurn) {
    const { position, player } = action.payload;
    const { client, sessionId, board } = state;
    const newBoard = replaceAt(board, position, player.toString());
    if (isRemoteGame(state)) {
      const publishAction = publishTakeTurnAction({
        sessionId,
        board: newBoard,
      });
      (client as Client).publish(publishAction);
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
