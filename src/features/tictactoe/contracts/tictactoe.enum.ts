enum GameStateEnum {
  Setup = 'setup',
  Active = 'active',
  Completed = 'completed',
  Message = 'message',
  Wait = 'wait',
  Exit = 'exit',
}
enum PlayerStateEnum {
  Active = 'active',
  Wait = 'wait',
  Winner = 'winner',
  Loser = 'loser',
}
enum PlayerTypeEnum {
  Human = 'human',
  Computer = 'computer',
  Remote = 'remote',
}
enum PieceEnum {
  Neither = '-',
  X = 'X',
  O = 'O',
}
enum ActionEnum {
  Reset = 'reset',
  TakeTurn = 'takeTurn',
  Start = 'start',
  UpdateGameState = 'updateGameStatus',
  UpdatePlayer = 'updatePlayer',
  UpdateRemoteGame = 'updateRemoteGame',
  Remote = 'remote',
  InitializeWebSocket = 'initWebSocket',
}
enum MessageActionEnum {
  SetPlayers = 'SetPlayers',
  TakeTurn = 'TakeTurn',
  EndGame = 'EndGame',
}
enum PublishEnum {
  Start = '/start',
  Turn = '/turn',
  End = '/end',
}
enum EndGameReasonEnum {
  Completed = 'Completed',
  Mismatch = 'Mismatch',
}

export {
  PlayerStateEnum,
  GameStateEnum,
  ActionEnum,
  MessageActionEnum,
  PlayerTypeEnum,
  PieceEnum,
  PublishEnum,
  EndGameReasonEnum,
};
