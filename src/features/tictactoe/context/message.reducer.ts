import { RemoteAction } from '../contracts/tictactoe.context';
import {
  GameStateEnum,
  MessageActionEnum,
} from '../contracts/tictactoe.enum';
import { Player, StateType } from '../contracts/tictactoe.models';

const messageReducer = (state: StateType, action: RemoteAction): StateType => {
  const { message: messageString } = action.payload;
  const message = JSON.parse(messageString);
  const { action: messageAction } = message;
  let stateAfterAction = {};

  switch (messageAction) {
    case MessageActionEnum.SetPlayers: {
      const { sessionId, playerOne, playerTwo } = state;
      const {
        game: {
          players,
        },
      } = message;
      const newPlayerOne = players.find((player: Player) => player.sessionId == sessionId) || playerOne;
      const newPlayerTwo = players.find((player: Player) => player.sessionId != sessionId) || playerTwo;
      stateAfterAction = {
        playerOne: newPlayerOne,
        playerTwo: newPlayerTwo,
      };
      break;
    }
    case MessageActionEnum.TakeTurn: {
      const { board: oldBoard } = state;
      const {
        game: {
          board: newBoard = oldBoard,
        },
      } = message;
      stateAfterAction = {
        gameState: GameStateEnum.Active,
        board: newBoard,
      };
      break;
    }
    case MessageActionEnum.EndGame: {
      const { reason } = message;
      stateAfterAction = {
        gameState: reason,
      };
      break;
    }
  }
  return {
    ...state,
    ...stateAfterAction,
  };
};

export { messageReducer };
