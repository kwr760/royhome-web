import { GameStateEnum, PlayerEnum, PlayerStateEnum, PlayerTypeEnum } from './tictactoe.enum';

type Board = string;
type Player = {
  name: string,
  playerState: PlayerStateEnum,
  type: PlayerTypeEnum,
  piece: PlayerEnum,
}
type StateType = {
  board: Board,
  gameState: GameStateEnum,
  turn: PlayerEnum,
  playerOne: Player,
  playerTwo: Player,
}

export type { Board, Player, StateType };
