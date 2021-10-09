import { ReactNode, Reducer } from 'react';
import { ActionEnumType } from '../context/context.actions';
import { GameState } from '../context/tictactoe.constant';

export type PlayersType = string[];
export type PlayerType = 0 | 1;
export type SquareType = PlayerType | null;
export type GameType = SquareType[][];
export type StateEnumType = GameState.Active | GameState.Win | GameState.Tie;
export type RowIndexType = 0 | 1 | 2;
export type ColIndexType = 0 | 1 | 2;

export interface StatusType {
  state: StateEnumType,
  turn: PlayerType,
  winner?: PlayerType,
}
export interface StateType {
  players: PlayersType,
  game: GameType,
  status: StatusType,
}

export interface SquareProps {
  row: RowIndexType;
  col: ColIndexType;
}

export interface CheckGameReturn {
  state: StateEnumType,
  winner?: PlayerType,
}

export interface TakeTurnPayload {
  row: RowIndexType,
  col: ColIndexType,
  player: PlayerType
}

export type TakeTurnAction = {
  type: ActionEnumType.takeTurn,
  payload: TakeTurnPayload,
};
export type ResetAction = {
  type: ActionEnumType.reset,
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
