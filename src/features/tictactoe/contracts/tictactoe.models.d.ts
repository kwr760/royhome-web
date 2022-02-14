import { GameStateEnum, PlayerEnum, PlayerStateEnum, PlayerTypeEnum } from './tictactoe.enum';

type Board = string;
interface Player {
  name: string,
  playerState: PlayerStateEnum,
  type: PlayerTypeEnum,
  piece: PlayerEnum,
}
interface TicTacToeStateType {
  board: Board,
  gameState: GameStateEnum,
  turn: PlayerEnum,
  playerOne: Player,
  playerTwo: Player,
}

export type { Player, TicTacToeStateType };
