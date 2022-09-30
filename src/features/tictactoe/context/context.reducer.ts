import { ActionsType } from '../contracts/tictactoe.context';
import { ActionEnum, GameStateEnum, PlayerEnum, PlayerStateEnum } from '../contracts/tictactoe.enum';
import { initialState } from '../contracts/tictactoe.initial';
import { StateType } from '../contracts/tictactoe.models';
import { evaluateGame } from '../functions/evaluate-game';
import { replaceAt } from '../functions/replace-at';
import { connectStomp } from './context.stomp';

const ticTacToeReducer = (state: StateType, action: ActionsType): StateType => {
  switch (action.type) {
    case ActionEnum.TakeTurn: {
      const { position, player } = action.payload;
      const { board, gameState, playerOne, playerTwo } = state;
      if (gameState === GameStateEnum.Active) {
        const newBoard = replaceAt(board, position, player.toString());
        const newGame = evaluateGame(newBoard);
        playerOne.playerState = (newGame.winner === PlayerEnum.One) ? PlayerStateEnum.Winner : PlayerStateEnum.Loser;
        playerTwo.playerState = (newGame.winner === PlayerEnum.Two) ? PlayerStateEnum.Winner : PlayerStateEnum.Loser;
        const turn = player === PlayerEnum.One ? PlayerEnum.Two : PlayerEnum.One;
        return {
          ...state,
          board: newBoard,
          gameState: newGame.gameState,
          turn,
          playerOne,
          playerTwo,
        };
      }
      return { ...state };
    }
    case ActionEnum.Start: {
      return {
        ...state,
        gameState: GameStateEnum.Active,
      };
    }
    case ActionEnum.Reset: {
      return {
        ...state,
        board: initialState.board,
        gameState: initialState.gameState,
        turn: initialState.turn,
      };
    }
    case ActionEnum.UpdateGameState: {
      const { gameState } = action.payload;
      return {
        ...state,
        gameState,
      };
    }
    case ActionEnum.UpdatePlayer: {
      const { position, player } = action.payload;
      return position === PlayerEnum.One ? {
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
      const { message } = action.payload;
      return {
        ...state,
        message,
      };
    }
  }
  return state;
};

export { ticTacToeReducer };
