import { Player } from '../contracts/tictactoe.models';
import { getCurrentTurn } from './get-current-turn';

const getCurrentPlayer = (board: string, playerOne: Player, playerTwo: Player): Player => {
  const turn = getCurrentTurn(board);
  switch (turn) {
    case playerTwo.piece:
      return playerTwo;
    default:
      return playerOne;
  }
};

export { getCurrentPlayer };
