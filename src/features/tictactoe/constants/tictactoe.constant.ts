import { StateType } from '../types/tictactoe';

export enum StatusEnum {
  Active = 'ACTIVE',
  Win = 'WIN',
  Tie = 'TIE',
}
export enum PlayerEnum {
  One = 'O',
  Two = 'X',
  None = '-',
}
export enum ActionEnum {
  reset = 'reset',
  takeTurn = 'takeTurn',
}

export const initialPlayers = ['Player #1', 'Player #2'];
export const initialGame = '---------';
export const initialStatus = StatusEnum.Active;
export const initialTurn = PlayerEnum.One;
export const initialState: StateType = {
  players: [...initialPlayers],
  game: initialGame,
  status: initialStatus,
  turn: initialTurn,
};

export const possibleWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
