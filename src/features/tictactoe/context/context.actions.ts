import { ResetAction, TakeTurnAction, TakeTurnPayload } from '../contracts/tictactoe.context';
import { ActionEnum } from '../contracts/tictactoe.enum';

const reset = (): ResetAction => ({
  type: ActionEnum.Reset,
});
const takeTurn = ({position, player} : TakeTurnPayload): TakeTurnAction => ({
  type: ActionEnum.TakeTurn,
  payload: {
    position,
    player,
  },
});

export { reset, takeTurn };
