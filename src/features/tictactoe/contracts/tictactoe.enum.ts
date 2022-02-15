enum GameStateEnum {
  Ready = 'ready',
  Active = 'active',
  Win = 'win',
  Tie = 'tie',
  Think = 'think',
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
  UpdatePlayer = 'updatePlayer',
}

export { PlayerStateEnum, GameStateEnum, ActionEnum, PlayerTypeEnum, PlayerEnum };
