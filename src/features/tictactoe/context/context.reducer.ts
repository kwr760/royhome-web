import { ActionsType } from '../contracts/tictactoe.context';
import { PlayerEnum, PlayerStateEnum } from '../contracts/tictactoe.enum';
import { initialTicTacToeState } from '../contracts/tictactoe.initial';
import { TicTacToeStateType } from '../contracts/tictactoe.models';
import { checkGame } from '../functions/check-game';
import { replaceAt } from '../functions/replace-at';

const ticTacToeReducer = (state: TicTacToeStateType, action: ActionsType): TicTacToeStateType => {
  switch (action.type) {
    case 'takeTurn': {
      const { position, player } = action.payload;
      const { board, playerOne, playerTwo } = state;
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
    case 'reset': {
      return {
        ...initialTicTacToeState,
      };
    }
  }
  return state;
};

export { ticTacToeReducer };
