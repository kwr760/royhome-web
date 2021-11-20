enum GameStateEnum {
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
  pvp = 'pvp',
  pvc = 'pvc',
  remote = 'remote',
}
enum PlayerTypeEnum {
  local = 'local',
  computer = 'computer',
  remote = 'remote',
}
enum TurnEnum {
  One,
  Two,
}
enum PieceEnum {
  one = 'X',
  two = 'O',
}
enum ActionEnum {
  reset = 'reset',
  takeTurn = 'takeTurn',
}

enum PlayerEnum {
  One = 'O',
  Two = 'X',
  None = '-',
}
enum StatusEnum {
  Active = 'ACTIVE',
  Win = 'WIN',
  Tie = 'TIE',
  Think = 'THINK',
}
export { PlayerStateEnum, GameStateEnum, ActionEnum, GameTypeEnum, PlayerTypeEnum, TurnEnum, PieceEnum,
  PlayerEnum, StatusEnum,
};
