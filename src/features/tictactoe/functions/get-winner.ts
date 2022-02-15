import { PlayerStateEnum } from '../contracts/tictactoe.enum';
import { Player, StateType } from '../contracts/tictactoe.models';

const getWinner = (state: StateType): Player | undefined => {
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
