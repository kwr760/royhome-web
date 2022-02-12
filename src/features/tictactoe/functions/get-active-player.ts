import { Player, TicTacToeStateType } from '../contracts/tictactoe.models';

const getActivePlayer = (state: TicTacToeStateType): Player | undefined => {
  const { playerOne, playerTwo, turn } = state;
  if (playerOne.piece === turn) {
    return playerOne;
  }
  if (playerTwo.piece === turn) {
    return playerTwo;
  }
  return undefined;
};

export { getActivePlayer };
