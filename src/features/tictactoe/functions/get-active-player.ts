import { Player, TicTacToeStateType } from '../contracts/tictactoe.models';

const getActivePlayer = (state: TicTacToeStateType): Player | undefined => {
  const { playerOne, playerTwo, turn } = state;
  switch (turn) {
    case playerOne.piece:
      return playerOne;
    case playerTwo.piece:
      return playerTwo;
    default:
      return undefined;
  }
};

export { getActivePlayer };
