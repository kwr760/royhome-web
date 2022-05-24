import { Client } from '@stomp/stompjs';
import { ReactNode, Reducer } from 'react';
import { ActionEnum, PlayerEnum } from './tictactoe.enum';
import { Player, StateType } from './tictactoe.models';

type BoardType = string;
type ProviderType = {
  sessionId?: string,
  state?: StateType,
  reducer?: Reducer<unknown, unknown>,
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
type MessagePayload = {
  message: string,
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
type UpdatePlayerAction = {
  type: ActionEnum.UpdatePlayer,
  payload: UpdatePlayerPayload,
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
type ActionsType = TakeTurnAction | ResetGameAction | StartGameAction | UpdatePlayerAction |
  RemoteAction | InitWebSocketAction;
type DispatchType = (action: ActionsType) => void;
type ContextType = {
  state: StateType,
  dispatch: DispatchType,
};

export type {
  ProviderType,
  ContextType,
  ActionsType,
  ResetGameAction,
  StartGameAction,
  TakeTurnAction,
  UpdatePlayerAction,
  RemoteAction,
  InitWebSocketAction,
  DispatchType,
  TakeTurnPayload,
  UpdatePlayerPayload,
  MessagePayload,
  InitWebSocketPayload,
  BoardType,
};
