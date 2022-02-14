import { GameStateEnum, PlayerTypeEnum } from '../contracts/tictactoe.enum';
import { TicTacToeStateType } from '../contracts/tictactoe.models';
import { getActivePlayer } from './get-active-player';
import { getWinner } from './get-winner';

const getStateMessage = (state: TicTacToeStateType): string => {
  let stateMessage = '';

  switch (state.gameState) {
    case GameStateEnum.Ready:
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
    case GameStateEnum.Win:
      {
        const player = getWinner(state);
        stateMessage = `${player?.name} won the game`;
      }
      break;
    case GameStateEnum.Tie:
      stateMessage = 'The game is a tie, there was no winner';
      break;
  }

  return stateMessage;
};

export { getStateMessage };
