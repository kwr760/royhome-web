import {
  ResetAction,
  TakeTurnAction,
  TakeTurnPayload,
} from '../type/tictactoe';

export enum ActionEnumType {
  reset = 'reset',
  takeTurn = 'takeTurn',
}

export const reset = (): ResetAction => ({
  type: ActionEnumType.reset,
});
export const takeTurn = ({row, col, player} : TakeTurnPayload): TakeTurnAction => ({
  type: ActionEnumType.takeTurn,
  payload: {
    row,
    col,
    player,
  },
});
