import { Player, StateType } from '../contracts/tictactoe.models';
import { evaluateGame } from './evaluate-game';
import { getPlayer } from './get-player';

const getWinner = (state: StateType): Player | undefined => {
  const { board } = state;
  const newGame = evaluateGame(board);
  return getPlayer(state, newGame.winner);
};

export { getWinner };
