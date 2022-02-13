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
  UpdatePlayer = 'updatePlayer',
}

export { PlayerStateEnum, GameStateEnum, ActionEnum, GameTypeEnum, PlayerTypeEnum, PlayerEnum };
