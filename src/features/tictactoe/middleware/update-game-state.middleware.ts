import { Client } from '@stomp/stompjs';
import { publishEndAction } from '../context/context.actions';
import type { ActionTypes } from '../contracts/tictactoe.context';
import { ActionEnum, EndGameReasonEnum, GameStateEnum } from '../contracts/tictactoe.enum';
import { StateType } from '../contracts/tictactoe.models';
import { isRemoteGame } from '../functions/is-remote-game';

const updateGameStateMiddleware = (action: ActionTypes, state: StateType): StateType => {
  if (action.type === ActionEnum.UpdateGameState) {
    const { gameState } = action.payload;
    if (gameState === GameStateEnum.Closed) {
      const { client, sessionId } = state;
      if (isRemoteGame(state)) {
        const publishAction = publishEndAction({
          sessionId,
          reason: EndGameReasonEnum.Closed,
        });
        (client as Client).publish(publishAction);
      }
      action.payload = {
        gameState: GameStateEnum.Setup,
      };
    }
  }

  return state;
};

export { updateGameStateMiddleware };
