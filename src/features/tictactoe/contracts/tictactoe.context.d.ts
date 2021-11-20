import { ReactNode, Reducer } from 'react';
import { ActionEnum, PlayerEnum } from './tictactoe.enum';
import { TicTacToeStateType } from './tictactoe.models';

type GameType = string;

type ProviderType = {
  state?: TicTacToeStateType,
  reducer?: Reducer<unknown, unknown>,
  children: ReactNode,
}

interface TakeTurnPayload {
  position: number,
  player: PlayerEnum
}
type TakeTurnAction = {
  type: ActionEnum.takeTurn,
  payload: TakeTurnPayload,
};
type ResetAction = {
  type: ActionEnum.reset,
};
type ActionsType = TakeTurnAction | ResetAction;
type DispatchType = (action: ActionsType) => void;
type ContextType = {
  state: TicTacToeStateType,
  dispatch: DispatchType,
};

export type {
  ProviderType, ContextType, ActionsType, ResetAction, TakeTurnAction, TakeTurnPayload, GameType,
};
