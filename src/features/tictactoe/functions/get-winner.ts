import { PlayerStateEnum } from '../contracts/tictactoe.enum';
import { Player, TicTacToeStateType } from '../contracts/tictactoe.models';

const getWinner = (state: TicTacToeStateType): Player | undefined => {
  const { playerOne, playerTwo } = state;
  if (playerOne.playerState === PlayerStateEnum.Winner) {
    return playerOne;
  }
  if (playerTwo.playerState === PlayerStateEnum.Winner) {
    return playerTwo;
  }
  return undefined;
};

export { getWinner };
