import {
  ResetGameAction,
  StartGameAction,
  TakeTurnAction,
  UpdatePlayerAction,
  TakeTurnPayload,
  UpdatePlayerPayload,
} from '../contracts/tictactoe.context';
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
const updatePlayer = ({position, player} : UpdatePlayerPayload): UpdatePlayerAction => ({
  type: ActionEnum.UpdatePlayer,
  payload: {
    position,
    player,
  },
});

export { resetGame, startGame, takeTurn, updatePlayer };
