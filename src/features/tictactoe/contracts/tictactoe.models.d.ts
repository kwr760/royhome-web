import { Client } from '@stomp/stompjs';
import { GameStateEnum, PlayerEnum, PlayerStateEnum, PlayerTypeEnum } from './tictactoe.enum';

type Board = string;
type Message = string;
type Player = {
  name: string,
  playerState: PlayerStateEnum,
  type: PlayerTypeEnum,
  piece: PlayerEnum,
}
type StateType = {
  sessionId: string,
  client: Client | null,
  board: Board,
  gameState: GameStateEnum,
  turn: PlayerEnum,
  playerOne: Player,
  playerTwo: Player,
  remote: boolean,
  message?: Message,
}

export type { Board, Player, StateType };
