import { ActionEnum } from '../constant/tictactoe.constant';
import {
  ResetAction,
  TakeTurnAction,
  TakeTurnPayload,
} from '../type/tictactoe';

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
