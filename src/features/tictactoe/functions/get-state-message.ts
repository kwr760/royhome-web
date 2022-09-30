import { GameStateEnum, PlayerTypeEnum } from '../contracts/tictactoe.enum';
import { StateType } from '../contracts/tictactoe.models';
import { getActivePlayer } from './get-active-player';
import { getWinner } from './get-winner';

const getStateMessage = (state: StateType): string => {
  let stateMessage = '';

  switch (state.gameState) {
    case GameStateEnum.Setup:
      stateMessage = 'The game is ready to be played';
      break;
    case GameStateEnum.Active:
      {
        const player = getActivePlayer(state);
        if (player?.type === PlayerTypeEnum.Computer) {
          stateMessage = `${player.name} is thinking`;
        } else {
          stateMessage = `${player?.name} take your turn`;
        }
      }
      break;
    case GameStateEnum.Completed:
      {
        const player = getWinner(state);
        if (player) {
          stateMessage = `${player.name} won the game`;
        } else {
          stateMessage = 'The game is a tie, there was no winner';
        }
      }
      break;
  }

  return stateMessage;
};

export { getStateMessage };
