import { GameState } from '../store/tictactoe.constant';

export type PlayersType = string[];
export type PlayerIndex = 0 | 1;
export type GameSquareType = PlayerIndex | null;
export type GameType = GameSquareType[][];
export type GameStateType = GameState.Active | GameState.Win | GameState.Tie;
export type RowIndexType = 0 | 1 | 2;
export type ColumnIndexType = 0 | 1 | 2;

export interface GameStatusType {
  state: GameStateType,
  turn: PlayerIndex,
  winner?: PlayerIndex,
}
export interface TicTacToeStateType {
  players: PlayersType,
  game: GameType,
  status: GameStatusType,
}

export interface GameSquarePropType {
  row: RowIndexType;
  col: ColumnIndexType;
}

export interface CheckGameReturnType {
  state: GameStateType,
  winner?: PlayerIndex,
}

export interface TakeTurnPayloadType {
  row: RowIndexType,
  col: ColumnIndexType,
  player: PlayerIndex
}

