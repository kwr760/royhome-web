import { ResetAction, TakeTurnAction, TakeTurnPayload } from '../contracts/tictactoe.context';
import { ActionEnum } from '../contracts/tictactoe.enum';

const reset = (): ResetAction => ({
  type: ActionEnum.reset,
});
const takeTurn = ({position, player} : TakeTurnPayload): TakeTurnAction => ({
  type: ActionEnum.takeTurn,
  payload: {
    position,
    player,
  },
});

export { reset, takeTurn };
