import { PlayerStateEnum } from '../contracts/tictactoe.enum';
import { Player, StateType } from '../contracts/tictactoe.models';

const getWinner = (state: StateType): Player | undefined => {
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
