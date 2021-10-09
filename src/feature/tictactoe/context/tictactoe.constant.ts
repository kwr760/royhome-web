import { PlayerType, StateType } from '../type/tictactoe';

export enum GameState {
  Active = 'ACTIVE',
  Win = 'WIN',
  Tie = 'TIE',
}

export const initialStatus = {
  turn: 0 as PlayerType,
  state: GameState.Active,
};
export const initialPlayers = ['Player #1', 'Player #2'];
export const initialGame = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const initialState: StateType = {
  players: initialPlayers,
  game: initialGame,
  status: initialStatus,
};
