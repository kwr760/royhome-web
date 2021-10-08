import { PlayerIndex, TicTacToeStateType } from '../type/tictactoe';

export enum GameState {
  Active = 'ACTIVE',
  Win = 'WIN',
  Tie = 'TIE',
}

export const initialStatus = {
  turn: 0 as PlayerIndex,
  state: GameState.Active,
};
export const initialPlayers = ['Player #1', 'Player #2'];
export const initialGame = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const initialState: TicTacToeStateType = {
  players: initialPlayers,
  game: initialGame,
  status: initialStatus,
};
