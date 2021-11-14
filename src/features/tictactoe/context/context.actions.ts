import { ActionEnum } from '../constants/tictactoe.constant';
import {
  ResetAction,
  TakeTurnAction,
  TakeTurnPayload,
} from '../types/tictactoe';

export const reset = (): ResetAction => ({
  type: ActionEnum.reset,
});
export const takeTurn = ({position, player} : TakeTurnPayload): TakeTurnAction => ({
  type: ActionEnum.takeTurn,
  payload: {
    position,
    player,
  },
});
