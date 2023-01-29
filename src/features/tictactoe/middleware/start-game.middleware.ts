import { Client } from '@stomp/stompjs';
import { publishStartAction } from '../context/context.actions';
import type { ActionTypes } from '../contracts/tictactoe.context';
import { ActionEnum, GameStateEnum } from '../contracts/tictactoe.enum';
import { StateType } from '../contracts/tictactoe.models';
import { isRemoteGame } from '../functions/is-remote-game';

const startGameMiddleware = (action: ActionTypes, state: StateType): StateType => {
  if (action.type === ActionEnum.Start) {
    const { client, sessionId, playerOne } = state;
    if (isRemoteGame(state)) {
      const publishAction = publishStartAction({
        sessionId,
        playerName: playerOne.name,
      });
      (client as Client).publish(publishAction);
    } else {
      action.payload = {
        gameState: GameStateEnum.Active,
      };
    }
  }

  return state;
};

export { startGameMiddleware };
