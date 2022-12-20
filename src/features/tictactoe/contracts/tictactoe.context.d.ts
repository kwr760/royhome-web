import type { Action } from '@reduxjs/toolkit';
import { Client } from '@stomp/stompjs';
import { ReactNode, Reducer } from 'react';
import { Auth0User } from '../../../contracts/auth0.models';
import { ActionEnum, GameStateEnum, PlayerEnum, PublishEnum } from './tictactoe.enum';
import { Player, StateType } from './tictactoe.models';

type BoardType = string;
type MiddleWareFunction = (action: Action | undefined, state: StateType) => StateType;
type ProviderType = {
  sessionId: string,
  user: Auth0User,
  state?: StateType,
  reducer?: Reducer<unknown, unknown>,
  beforeware?: MiddleWareFunction[],
  afterware?: MiddleWareFunction[],
  children: ReactNode,
}
type TakeTurnPayload = {
  position: number,
  player: PlayerEnum
}
type UpdatePlayerPayload = {
  position: PlayerEnum,
  player: Player,
}
type UpdateRemoteGamePayload = {
  remote: boolean,
}
type MessagePayload = {
  message: string,
}
type UpdateGameStatePayload = {
  gameState: GameStateEnum,
}
type InitWebSocketPayload = {
  client: Client | null,
  destination: string,
  callback: (msg: { body: string; }) => void,
}
type TakeTurnAction = {
  type: ActionEnum.TakeTurn,
  payload: TakeTurnPayload,
};
type UpdateGameStateAction = {
  type: ActionEnum.UpdateGameState,
  payload: UpdateGameStatePayload,
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
};
type StartGameAction = {
  type: ActionEnum.Start,
};
type RemoteAction = {
  type: ActionEnum.Remote,
  payload: MessagePayload,
};
type InitWebSocketAction = {
  type: ActionEnum.InitializeWebSocket,
  payload: InitWebSocketPayload,
};
type ActionsType = TakeTurnAction | ResetGameAction | StartGameAction | UpdateGameStateAction |
  UpdateRemoteGameAction | UpdatePlayerAction | RemoteAction | InitWebSocketAction;
type DispatchType = (action: ActionsType) => void;
type ContextType = {
  state: StateType,
  dispatch: DispatchType,
};
type StartActionPayload = {
  sessionId: string,
  playerName: string,
}
type PublishAction = {
  destination: PublishEnum.Start,
  payload: string,
};

export type {
  ProviderType,
  MiddleWareFunction,
  ContextType,
  ActionsType,
  ResetGameAction,
  StartGameAction,
  TakeTurnAction,
  UpdateGameStateAction,
  UpdatePlayerAction,
  UpdateRemoteGameAction,
  RemoteAction,
  InitWebSocketAction,
  DispatchType,
  TakeTurnPayload,
  UpdateGameStatePayload,
  UpdatePlayerPayload,
  UpdateRemoteGamePayload,
  MessagePayload,
  InitWebSocketPayload,
  BoardType,
  StartActionPayload,
  PublishAction,
};
