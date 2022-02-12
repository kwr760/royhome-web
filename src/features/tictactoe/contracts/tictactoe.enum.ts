enum GameStateEnum {
  Ready = 'READY',
  Active = 'ACTIVE',
  Win = 'WIN',
  Tie = 'TIE',
  Think = 'THINK',
}
enum PlayerStateEnum {
  Active = 'ACTIVE',
  Wait = 'WAIT',
  Winner = 'WINNER',
  Loser = 'LOSER',
}
enum GameTypeEnum {
  Pvp = 'pvp',
  Pvc = 'pvc',
  Remote = 'remote',
}
enum PlayerTypeEnum {
  Local = 'local',
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
}

export { PlayerStateEnum, GameStateEnum, ActionEnum, GameTypeEnum, PlayerTypeEnum, PlayerEnum };
