import {
  InitWebSocketAction,
  InitWebSocketPayload,
  MessagePayload,
  PublishAction,
  RemoteAction,
  ResetGameAction,
  StartActionPayload,
  StartGameAction,
  TakeTurnAction,
  TakeTurnPayload,
  UpdateGameStateAction,
  UpdatePlayerAction,
  UpdatePlayerPayload,
} from '../contracts/tictactoe.context';
import { ActionEnum, GameStateEnum, PublishEnum } from '../contracts/tictactoe.enum';

const resetGame = (): ResetGameAction => ({
  type: ActionEnum.Reset,
});
const startGame = (): StartGameAction => ({
  type: ActionEnum.Start,
});
const updateGameState = (state: GameStateEnum): UpdateGameStateAction => ({
  type: ActionEnum.UpdateGameState,
  payload: {
    gameState: state,
  },
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
const startAction = ({ sessionId, playerName } : StartActionPayload ): PublishAction => ({
  destination: PublishEnum.Start,
  payload: JSON.stringify({
    sessionId,
    name: playerName,
  }),
});

export { resetGame, startGame, takeTurn, updateGameState, updatePlayer, remote, initWebSocket, startAction };
