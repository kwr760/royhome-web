import { ActionsType } from '../contracts/tictactoe.context';
import { ActionEnum, GameStateEnum, PlayerEnum, PlayerStateEnum } from '../contracts/tictactoe.enum';
import { initialTicTacToeState } from '../contracts/tictactoe.initial';
import { TicTacToeStateType } from '../contracts/tictactoe.models';
import { evaluateGame } from '../functions/evaluate-game';
import { replaceAt } from '../functions/replace-at';

const ticTacToeReducer = (state: TicTacToeStateType, action: ActionsType): TicTacToeStateType => {
  switch (action.type) {
    case ActionEnum.TakeTurn: {
      const { position, player } = action.payload;
      const { board, gameState, playerOne, playerTwo } = state;
      if (gameState === GameStateEnum.Active) {
        const newBoard = replaceAt(board, position, player.toString());
        const { gameState, winner } = evaluateGame(newBoard);
        playerOne.playerState = (winner === PlayerEnum.One) ? PlayerStateEnum.Winner : PlayerStateEnum.Loser;
        playerTwo.playerState = (winner === PlayerEnum.Two) ? PlayerStateEnum.Winner : PlayerStateEnum.Loser;
        const turn = player === PlayerEnum.One ? PlayerEnum.Two : PlayerEnum.One;
        return {
          ...state,
          board: newBoard,
          gameState,
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
        board: initialTicTacToeState.board,
        gameState: initialTicTacToeState.gameState,
        turn: initialTicTacToeState.turn,
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
  }
  return state;
};

export { ticTacToeReducer };
