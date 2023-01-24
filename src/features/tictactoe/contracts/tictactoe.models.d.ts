import { Client } from '@stomp/stompjs';
import { GameStateEnum, PieceEnum, PlayerTypeEnum } from './tictactoe.enum';

type Board = string;
type Message = string;
type Player = {
  name: string,
  type: PlayerTypeEnum,
  piece: PieceEnum,
  sessionId?: string,
}
type StateType = {
  sessionId?: string,
  client: Client | null,
  board: Board,
  gameState: GameStateEnum,
  playerOne: Player,
  playerTwo: Player,
  remote: boolean,
  message?: Message,
}

export type { Board, Player, StateType };
