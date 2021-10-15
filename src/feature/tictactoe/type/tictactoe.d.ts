import React, { ReactNode, Reducer } from 'react';
import { ActionEnum, PlayerEnum, StatusEnum } from '../constant/tictactoe.constant';

export type PlayersType = string[];
export type GameType = string;
export interface StateType {
  players: PlayersType,
  game: GameType,
  status: StatusEnum,
  turn: PlayerEnum,
  winner?: PlayerEnum,
}

export interface SquareProps {
  position: number;
}
export interface PlayerDialogProps {
  player: PlayerEnum;
  openDialog: boolean,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CheckGameReturn {
  status: StatusEnum,
  winner?: PlayerEnum,
}

export interface TakeTurnPayload {
  position: number,
  player: PlayerEnum
}

export type TakeTurnAction = {
  type: ActionEnum.takeTurn,
  payload: TakeTurnPayload,
};
export type ResetAction = {
  type: ActionEnum.reset,
};
export type ActionsType = TakeTurnAction | ResetAction;
export type DispatchType = (action: ActionsType) => void;
export type ContextType = {
  state: StateType,
  dispatch: DispatchType,
};

export type ProviderType = {
  state?: StateType,
  reducer?: Reducer<unknown, unknown>,
  children: ReactNode,
}
