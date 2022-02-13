import { PlayerStateEnum } from '../contracts/tictactoe.enum';
import { Player, TicTacToeStateType } from '../contracts/tictactoe.models';

const getWinner = (state: TicTacToeStateType): Player | undefined => {
  const { playerOne, playerTwo } = state;
  switch (PlayerStateEnum.Winner) {
    case playerOne.playerState:
      return playerOne;
    case playerTwo.playerState:
      return playerTwo;
    default:
      return undefined;
  }
};

export { getWinner };
