import { GameStateEnum, GameTypeEnum, PlayerEnum, PlayerStateEnum, PlayerTypeEnum } from './tictactoe.enum';
import { TicTacToeStateType } from './tictactoe.models';

const initialBoard = '---------';
const initialGameState = GameStateEnum.Active;
const initialTurn = PlayerEnum.One;
const initialType = GameTypeEnum.Pvp;
const initialPlayerOne = {
  name: 'Player #1',
  playerState: PlayerStateEnum.Active,
  type: PlayerTypeEnum.Local,
  piece: PlayerEnum.One,
};
const initialPlayerTwo = {
  name: 'Player #2',
  playerState: PlayerStateEnum.Wait,
  type: PlayerTypeEnum.Local,
  piece: PlayerEnum.Two,
};
const initialTicTacToeState: TicTacToeStateType = {
  board: initialBoard,
  gameState: initialGameState,
  type: initialType,
  turn: initialTurn,
  playerOne: initialPlayerOne,
  playerTwo: initialPlayerTwo,
};

export {
  initialBoard, initialTurn, initialType, initialGameState, initialTicTacToeState, initialPlayerOne, initialPlayerTwo,
};
