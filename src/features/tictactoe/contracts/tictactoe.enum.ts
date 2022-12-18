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
enum PlayerEnum {
  Neither = '-',
  One = 'X',
  Two = 'O',
}
enum ActionEnum {
  Reset = 'reset',
  TakeTurn = 'takeTurn',
  Start = 'start',
  UpdateGameState = 'updateGameStatus',
  UpdatePlayer = 'updatePlayer',
  Remote = 'remote',
  InitializeWebSocket = 'initWebSocket',
}
enum PublishEnum {
  Start = '/start',
}
enum MessageTypeEnum {
  Unknown = 'unknown',
  Setup = 'setup',
  Winner = 'winner',
  Tie = 'tie',
}

export { PlayerStateEnum, GameStateEnum, ActionEnum, PlayerTypeEnum, PlayerEnum, MessageTypeEnum, PublishEnum };
