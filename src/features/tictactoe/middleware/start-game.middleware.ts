import { publishStartAction } from '../context/context.actions';
import type { ActionTypes } from '../contracts/tictactoe.context';
import { ActionEnum, GameStateEnum } from '../contracts/tictactoe.enum';
import { StateType } from '../contracts/tictactoe.models';

const startGameMiddleware = (action: ActionTypes, state: StateType): StateType => {
  if (action.type === ActionEnum.Start) {
    const { client, sessionId, playerOne, remote } = state;
    if (remote && client && sessionId) {
      const publishAction = publishStartAction({
        sessionId,
        playerName: playerOne.name,
      });
      client.publish(publishAction);
    } else {
      action.payload = {
        gameState: GameStateEnum.Active,
      };
    }
  }

  return state;
};

export { startGameMiddleware };
