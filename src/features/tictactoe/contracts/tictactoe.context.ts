import { ReactNode, Reducer } from 'react';
import { ActionEnum, PlayerEnum, StatusEnum } from './tictactoe.enum';

type PlayersType = string[];
type GameType = string;
interface TicTacToeStateType {
  players: PlayersType,
  game: GameType,
  status: StatusEnum,
  turn: PlayerEnum,
  winner?: PlayerEnum,
}

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
  TicTacToeStateType, ProviderType, ContextType, ActionsType, ResetAction, TakeTurnAction, TakeTurnPayload, GameType,
};
