import { Client } from '@stomp/stompjs';
import { publishEndAction } from '../context/context.actions';
import type { ActionTypes } from '../contracts/tictactoe.context';
import { ActionEnum, EndGameReasonEnum, GameStateEnum } from '../contracts/tictactoe.enum';
import { StateType } from '../contracts/tictactoe.models';
import { evaluateGame } from '../functions/evaluate-game';
import { isRemoteGame } from '../functions/is-remote-game';
import { replaceAt } from '../functions/replace-at';

const evaluateGameMiddleware = (action: ActionTypes, state: StateType): StateType => {
  if (action.type === ActionEnum.TakeTurn) {
    const { position, player } = action.payload;
    const { client, sessionId, board } = state;
    const newBoard = replaceAt(board, position, player.toString());
    const gameResult = evaluateGame(newBoard);
    if (gameResult.gameState === GameStateEnum.Completed) {
      if (isRemoteGame(state)) {
        const publishAction = publishEndAction({
          sessionId,
          reason: EndGameReasonEnum.Completed,
        });
        (client as Client).publish(publishAction);
      }
      state.gameState = GameStateEnum.Completed;
    }
  }

  return state;
};

export { evaluateGameMiddleware };
