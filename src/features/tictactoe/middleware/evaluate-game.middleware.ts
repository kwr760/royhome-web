import { publishEndAction } from '../context/context.actions';
import type { ActionTypes } from '../contracts/tictactoe.context';
import { ActionEnum, EndGameReasonEnum, GameStateEnum } from '../contracts/tictactoe.enum';
import { StateType } from '../contracts/tictactoe.models';
import { evaluateGame } from '../functions/evaluate-game';
import { replaceAt } from '../functions/replace-at';

const evaluateGameMiddleware = (action: ActionTypes, state: StateType): StateType => {
  if (action.type === ActionEnum.TakeTurn) {
    const { position, player } = action.payload;
    const { client, sessionId, remote, board } = state;
    const newBoard = replaceAt(board, position, player.toString());
    const gameResult = evaluateGame(newBoard);
    if (gameResult.gameState === GameStateEnum.Completed) {
      if (remote && client && sessionId) {
        const publishAction = publishEndAction({
          sessionId,
          reason: EndGameReasonEnum.Completed,
        });
        client.publish(publishAction);
      }
      state.gameState = GameStateEnum.Completed;
    }
  }

  return state;
};

export { evaluateGameMiddleware };
