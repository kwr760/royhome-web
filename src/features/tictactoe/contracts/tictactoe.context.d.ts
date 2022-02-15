import { ReactNode, Reducer } from 'react';
import { ActionEnum, PlayerEnum } from './tictactoe.enum';
import { Player, StateType } from './tictactoe.models';

type BoardType = string;

type ProviderType = {
  state?: StateType,
  reducer?: Reducer<unknown, unknown>,
  children: ReactNode,
}

interface TakeTurnPayload {
  position: number,
  player: PlayerEnum
}
interface UpdatePlayerPayload {
  position: PlayerEnum,
  player: Player,
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
type ActionsType = TakeTurnAction | ResetGameAction | StartGameAction | UpdatePlayerAction;
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
  TakeTurnPayload,
  UpdatePlayerPayload,
  BoardType,
};
