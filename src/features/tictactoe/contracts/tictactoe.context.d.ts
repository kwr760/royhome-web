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
  type: ActionEnum.TakeTurn,
  payload: TakeTurnPayload,
};
type ResetGameAction = {
  type: ActionEnum.Reset,
};
type StartGameAction = {
  type: ActionEnum.Start,
};
type ActionsType = TakeTurnAction | ResetGameAction | StartGameAction;
type DispatchType = (action: ActionsType) => void;
type ContextType = {
  state: TicTacToeStateType,
  dispatch: DispatchType,
};

export type {
  ProviderType, ContextType, ActionsType, ResetGameAction, StartGameAction, TakeTurnAction, TakeTurnPayload, GameType,
};
