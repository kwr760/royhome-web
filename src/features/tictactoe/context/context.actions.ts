import {
  InitWebSocketAction,
  InitWebSocketPayload,
  MessagePayload,
  PublishAction,
  PublishEndPayload,
  PublishStartPayload,
  PublishTurnPayload,
  RemoteAction,
  ResetGameAction,
  StartGameAction,
  TakeTurnAction,
  TakeTurnPayload,
  UpdateGameStateAction,
  UpdatePlayerAction,
  UpdatePlayerPayload,
  UpdateRemoteGameAction,
} from '../contracts/tictactoe.context';
import { ActionEnum, GameStateEnum, PublishEnum } from '../contracts/tictactoe.enum';

const resetGame = (): ResetGameAction => ({
  type: ActionEnum.Reset,
  payload: {},
});
const startGame = (): StartGameAction => ({
  type: ActionEnum.Start,
  payload: {
    gameState: GameStateEnum.Wait,
  },
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
const updateRemoteGame = (remote : boolean): UpdateRemoteGameAction => ({
  type: ActionEnum.UpdateRemoteGame,
  payload: {
    remote,
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
const publishStartAction = ({ sessionId, playerName } : PublishStartPayload ): PublishAction => ({
  destination: PublishEnum.Start,
  body: JSON.stringify({
    sessionId,
    name: playerName,
  }),
});
const publishTakeTurnAction = ({ sessionId, board } : PublishTurnPayload ): PublishAction => ({
  destination: PublishEnum.Turn,
  body: JSON.stringify({
    sessionId,
    board,
  }),
});
const publishEndAction = ({ sessionId, reason } : PublishEndPayload ): PublishAction => ({
  destination: PublishEnum.End,
  body: JSON.stringify({
    sessionId,
    reason,
  }),
});

export {
  resetGame,
  startGame,
  takeTurn,
  updateGameState,
  updatePlayer,
  remote,
  initWebSocket,
  publishStartAction,
  publishTakeTurnAction,
  publishEndAction,
  updateRemoteGame,
};
