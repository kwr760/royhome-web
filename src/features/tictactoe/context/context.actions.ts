import { ResetGameAction, StartGameAction, TakeTurnAction, TakeTurnPayload } from '../contracts/tictactoe.context';
import { ActionEnum } from '../contracts/tictactoe.enum';

const resetGame = (): ResetGameAction => ({
  type: ActionEnum.Reset,
});
const startGame = (): StartGameAction => ({
  type: ActionEnum.Start,
});
const takeTurn = ({position, player} : TakeTurnPayload): TakeTurnAction => ({
  type: ActionEnum.TakeTurn,
  payload: {
    position,
    player,
  },
});

export { resetGame, startGame, takeTurn };
