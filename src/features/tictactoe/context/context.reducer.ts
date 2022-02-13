import { ActionsType } from '../contracts/tictactoe.context';
import { ActionEnum, GameStateEnum, PlayerEnum, PlayerStateEnum } from '../contracts/tictactoe.enum';
import { initialTicTacToeState } from '../contracts/tictactoe.initial';
import { TicTacToeStateType } from '../contracts/tictactoe.models';
import { checkGame } from '../functions/check-game';
import { replaceAt } from '../functions/replace-at';

const ticTacToeReducer = (state: TicTacToeStateType, action: ActionsType): TicTacToeStateType => {
  switch (action.type) {
    case ActionEnum.TakeTurn: {
      const { position, player } = action.payload;
      const { board, gameState, playerOne, playerTwo } = state;
      if (gameState === GameStateEnum.Active) {
        const newGame = replaceAt(board, position, player.toString());
        const { gameState, winner } = checkGame(newGame);
        if (winner === PlayerEnum.One) {
          playerOne.playerState = PlayerStateEnum.Winner;
          playerTwo.playerState = PlayerStateEnum.Loser;
        } else if (winner === PlayerEnum.Two) {
          playerTwo.playerState = PlayerStateEnum.Winner;
          playerOne.playerState = PlayerStateEnum.Loser;
        }
        const turn = player === PlayerEnum.One ? PlayerEnum.Two : PlayerEnum.One;
        return {
          ...state,
          board: newGame,
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
        ...initialTicTacToeState,
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
