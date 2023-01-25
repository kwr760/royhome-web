import type { PieceEnum } from '../contracts/tictactoe.enum';
import { Player, StateType } from '../contracts/tictactoe.models';

const getPlayer = (state: StateType, piece: PieceEnum): Player | undefined => {
  const { playerOne, playerTwo } = state;

  switch (piece) {
    case playerOne.piece:
      return playerOne;
    case playerTwo.piece:
      return playerTwo;
    default:
      return undefined;
  }
};

export { getPlayer };
