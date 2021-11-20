enum StatusEnum {
  Active = 'ACTIVE',
  Win = 'WIN',
  Tie = 'TIE',
  Think = 'THINK',
}
enum PlayerEnum {
  One = 'O',
  Two = 'X',
  None = '-',
}
enum ActionEnum {
  reset = 'reset',
  takeTurn = 'takeTurn',
}
enum GameTypeEnum {
  pvp = 'pvp',
  pvc = 'pvc',
  remote = 'remote',
}

export { StatusEnum, PlayerEnum, ActionEnum, GameTypeEnum };
