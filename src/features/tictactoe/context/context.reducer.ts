import { ActionTypes } from '../contracts/tictactoe.context';
import { ActionEnum, GameStateEnum, PieceEnum } from '../contracts/tictactoe.enum';
import { initialState } from '../contracts/tictactoe.initial';
import { StateType } from '../contracts/tictactoe.models';
import { replaceAt } from '../functions/replace-at';
import { connectStomp } from './context.stomp';
import { messageReducer } from './message.reducer';

const contextReducer = (state: StateType, action: ActionTypes): StateType => {
  switch (action.type) {
    case ActionEnum.TakeTurn: {
      const { position, player } = action.payload;
      const { board = initialState.board } = action.payload;
      const newBoard = replaceAt(board, position, player.toString());
      return {
        ...state,
        board: newBoard,
      };
    }
    case ActionEnum.Start: {
      const { gameState = GameStateEnum.Active } = action.payload  || {};
      return {
        ...state,
        gameState,
      };
    }
    case ActionEnum.Reset: {
      return {
        ...state,
        board: initialState.board,
        gameState: initialState.gameState,
      };
    }
    case ActionEnum.UpdateGameState: {
      const { gameState } = action.payload;
      return {
        ...state,
        gameState,
      };
    }
    case ActionEnum.UpdateRemoteGame: {
      const { remote } = action.payload;
      return {
        ...state,
        remote,
      };
    }
    case ActionEnum.UpdatePlayer: {
      const { position, player } = action.payload;
      return position === PieceEnum.X ? {
        ...state,
        playerOne: { ...player },
      } : {
        ...state,
        playerTwo: { ...player },
      };
    }
    case ActionEnum.InitializeWebSocket: {
      let { client } = action.payload;
      if (client === null) {
        const { destination, callback } = action.payload;
        client = connectStomp(destination, callback);
      }

      return {
        ...state,
        client,
      };
    }
    case ActionEnum.Remote: {
      return messageReducer(state, action);
    }
  }
  return state;
};

export { contextReducer };
