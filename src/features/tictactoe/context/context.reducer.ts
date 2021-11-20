import { PlayerEnum, TurnEnum } from '../contracts/tictactoe.enum';
import { initialTicTacToeState } from '../contracts/tictactoe.initial';
import { ActionsType } from '../contracts/tictactoe.context';
import { TicTacToeStateType } from '../contracts/tictactoe.models';
import { checkGame } from '../functions/check-game';
import { replaceAt } from '../functions/replace-at';

const ticTacToeReducer = (state: TicTacToeStateType, action: ActionsType): TicTacToeStateType => {
  switch (action.type) {
    case 'takeTurn': {
      const { position, player } = action.payload;
      const { board } = state;
      const newGame = replaceAt(board, position, player.toString());
      const { gameState, winner } = checkGame(newGame);
      const turn = player === PlayerEnum.One ? TurnEnum.Two : TurnEnum.One;
      return {
        ...state,
        board: newGame,
        gameState,
        turn,
        winner,
      };
    }
    case 'reset': {
      return {
        ...initialTicTacToeState,
      };
    }
  }
  return state;
};

export { ticTacToeReducer };
