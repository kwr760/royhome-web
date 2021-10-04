export type PlayersType = string[];
export type PlayerIndex = number | null;
export type GameType = PlayerIndex[][];

export interface TicTacToeStateType {
  playerTurn: number,
  winner?: PlayerIndex,
  players: PlayersType,
  game: GameType,
}
