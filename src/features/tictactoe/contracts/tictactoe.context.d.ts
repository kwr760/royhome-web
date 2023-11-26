import { Client } from '@stomp/stompjs';
import { ReactNode, Reducer } from 'react';
import { Auth0User } from '../../../contracts/auth0.models';
import { ActionEnum, GameStateEnum, PieceEnum, PublishEnum } from './tictactoe.enum';
import { Player, StateType } from './tictactoe.models';

type BoardType = string;
type MiddleWareFunction = (action: ActionTypes, state: StateType) => StateType;
type ProviderType = {
  sessionId: string,
  user?: Auth0User,
  state?: StateType,
  reducer?: Reducer<unknown, unknown>,
  beforeware?: MiddleWareFunction[],
  afterware?: MiddleWareFunction[],
  children: ReactNode,
}

type TakeTurnPayload = {
  position: number,
  player: PieceEnum,
  board?: string,
}
type UpdatePlayerPayload = {
  position: PieceEnum,
  player: Player,
}
type UpdateRemoteGamePayload = {
  remote: boolean,
}
type MessagePayload = {
  message: string,
}
type GameStatePayload = {
  gameState: GameStateEnum,
}
type InitWebSocketPayload = {
  client: Client | null,
  destination: string,
  callback: (msg: { body: string; }) => void,
}
type EmptyPayload = Record<string, never>

type TakeTurnAction = {
  type: ActionEnum.TakeTurn,
  payload: TakeTurnPayload,
};
type UpdateGameStateAction = {
  type: ActionEnum.UpdateGameState,
  payload: GameStatePayload,
};
type UpdatePlayerAction = {
  type: ActionEnum.UpdatePlayer,
  payload: UpdatePlayerPayload,
};
type UpdateRemoteGameAction = {
  type: ActionEnum.UpdateRemoteGame,
  payload: UpdateRemoteGamePayload,
};
type ResetGameAction = {
  type: ActionEnum.Reset,
  payload: EmptyPayload,
};
type StartGameAction = {
  type: ActionEnum.Start,
  payload: GameStatePayload,
};
type RemoteAction = {
  type: ActionEnum.Remote,
  payload: MessagePayload,
};
type InitWebSocketAction = {
  type: ActionEnum.InitializeWebSocket,
  payload: InitWebSocketPayload,
};

type ActionTypes = TakeTurnAction | ResetGameAction | StartGameAction | UpdateGameStateAction |
  UpdateRemoteGameAction | UpdatePlayerAction | RemoteAction | InitWebSocketAction;
type DispatchType = (action: ActionTypes) => void;

type ContextType = {
  state: StateType,
  dispatch: DispatchType,
};
type PublishStartPayload = {
  sessionId: string,
  playerName: string,
}
type PublishTurnPayload = {
  sessionId: string,
  board: string,
}
type PublishEndPayload = {
  sessionId: string,
  reason: string,
}
type PublishAction = {
  destination: PublishEnum.Start | PublishEnum.Turn | PublishEnum.End,
  body: string,
};

export type {
  BoardType,
  MiddleWareFunction,
  ProviderType,
  TakeTurnPayload,
  UpdatePlayerPayload,
  UpdateRemoteGamePayload,
  MessagePayload,
  GameStatePayload,
  InitWebSocketPayload,
  TakeTurnAction,
  UpdateGameStateAction,
  UpdatePlayerAction,
  UpdateRemoteGameAction,
  ResetGameAction,
  StartGameAction,
  RemoteAction,
  InitWebSocketAction,
  ActionTypes,
  DispatchType,
  ContextType,
  PublishStartPayload,
  PublishTurnPayload,
  PublishEndPayload,
  PublishAction,
};
