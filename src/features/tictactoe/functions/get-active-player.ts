import { Player, StateType } from '../contracts/tictactoe.models';

const getActivePlayer = (state: StateType): Player | undefined => {
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
