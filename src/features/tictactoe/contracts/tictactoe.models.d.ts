
type Board = string;

import {
  GameStateEnum,
  GameTypeEnum,
  PlayerEnum,
  PlayerStateEnum,
  PlayerTypeEnum,
  TurnEnum,
} from './tictactoe.enum';

interface Player {
  name: string,
  playerState: PlayerStateEnum,
  type: PlayerTypeEnum,
  piece: string,
}

interface Game {
  board: Board,
  gameState: GameStateEnum,
  type: GameTypeEnum,
  turn: TurnEnum,
  one: Player,
  two: Player,
}

type PlayersType = string[];
interface TicTacToeStateType {
  board: Board,
  gameState: GameStateEnum,
  turn: TurnEnum,
  type: GameTypeEnum,
  players: PlayersType,
  winner?: PlayerEnum,
}

export type { Game, Player, TicTacToeStateType };
