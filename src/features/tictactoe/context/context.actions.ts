import {
  ResetGameAction,
  StartGameAction,
  TakeTurnAction,
  UpdatePlayerAction,
  RemoteAction,
  InitWebSocketAction,
  TakeTurnPayload,
  UpdatePlayerPayload,
  MessagePayload,
  InitWebSocketPayload,
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
const remote = ({message} : MessagePayload): RemoteAction => ({
  type: ActionEnum.Remote,
  payload: {
    message,
  },
});
const initWebSocket = ({ client, destination, callback } : InitWebSocketPayload): InitWebSocketAction => ({
  type: ActionEnum.InitializeWebSocket,
  payload: {
    client,
    destination,
    callback,
  },
});

export { resetGame, startGame, takeTurn, updatePlayer, remote, initWebSocket };
