import { Client } from '@stomp/stompjs';
import { publishEndAction } from '../context/context.actions';
import type { ActionTypes } from '../contracts/tictactoe.context';
import {
  ActionEnum,
  EndGameReasonEnum,
  MessageActionEnum,
  PieceEnum,
} from '../contracts/tictactoe.enum';
import { StateType } from '../contracts/tictactoe.models';
import { isRemoteGame } from '../functions/is-remote-game';

const validateGameMiddleware = (action: ActionTypes, state: StateType): StateType => {
  if (action.type === ActionEnum.Remote) {
    const { message: messageString } = action.payload;
    const message = JSON.parse(messageString);
    const { action: messageAction } = message;

    if (messageAction === MessageActionEnum.TakeTurn) {
      const { board, client, sessionId } = state;
      const {
        game: {
          board: newBoard = board,
        },
      } = message;
      let invalid = false;
      let difference = 0;
      for (let i = 0; i < 9; i ++) {
        if (board[i] != newBoard[i]) {
          difference++;
          if (board[i] != PieceEnum.Neither) {
            invalid = true;
          }
        }
      }
      if (isRemoteGame(state) && (invalid || difference > 1)) {
        const publishAction = publishEndAction({
          sessionId,
          reason: EndGameReasonEnum.Mismatch,
        });
        (client as Client).publish(publishAction);
      }
    }
  }

  return state;
};

export { validateGameMiddleware };
