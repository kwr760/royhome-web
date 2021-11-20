import { PlayerEnum } from '../contracts/tictactoe.enum';
import { initialTicTacToeState } from '../contracts/tictactoe.initial';
import { ActionsType, TicTacToeStateType } from '../contracts/tictactoe.context';
import { checkGame } from '../functions/check-game';
import { replaceAt } from '../functions/replace-at';

const ticTacToeReducer = (state: TicTacToeStateType, action: ActionsType) => {
  switch (action.type) {
    case 'takeTurn': {
      const { position, player } = action.payload;
      const { game } = state;
      const newGame = replaceAt(game, position, player.toString());
      const { status, winner } = checkGame(newGame);
      const turn = player === PlayerEnum.One ? PlayerEnum.Two : PlayerEnum.One;
      return {
        ...state,
        game: newGame,
        status,
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
