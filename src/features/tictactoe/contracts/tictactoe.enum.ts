enum GameStateEnum {
  Welcome = 'welcome',
  Setup = 'setup',
  Active = 'active',
  Completed = 'completed',
  Mismatch = 'mismatch',
  Wait = 'wait',
  Exit = 'exit',
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
  Completed = 'completed',
  Mismatch = 'mismatch',
}

export {
  GameStateEnum,
  ActionEnum,
  MessageActionEnum,
  PlayerTypeEnum,
  PieceEnum,
  PublishEnum,
  EndGameReasonEnum,
};
