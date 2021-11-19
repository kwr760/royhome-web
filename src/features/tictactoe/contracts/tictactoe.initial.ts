import { PlayerEnum, StatusEnum } from './tictactoe.enum';
import { TicTacToeStateType } from './tictactoe.context';

const initialPlayers = ['Player #1', 'Player #2'];
const initialGame = '---------';
const initialStatus = StatusEnum.Active;
const initialTurn = PlayerEnum.One;
const initialTicTacToeState: TicTacToeStateType = {
  players: [...initialPlayers],
  game: initialGame,
  status: initialStatus,
  turn: initialTurn,
};

export { initialGame, initialPlayers, initialTurn, initialStatus, initialTicTacToeState };
