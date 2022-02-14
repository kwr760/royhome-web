import { GameStateEnum, PlayerEnum, PlayerStateEnum, PlayerTypeEnum } from './tictactoe.enum';
import { TicTacToeStateType } from './tictactoe.models';

const initialBoard = '---------';
const initialGameState = GameStateEnum.Ready;
const initialTurn = PlayerEnum.One;
const initialPlayerOne = {
  name: 'Player #1',
  playerState: PlayerStateEnum.Active,
  type: PlayerTypeEnum.Human,
  piece: PlayerEnum.One,
};
const initialPlayerTwo = {
  name: 'Player #2',
  playerState: PlayerStateEnum.Wait,
  type: PlayerTypeEnum.Human,
  piece: PlayerEnum.Two,
};
const initialTicTacToeState: TicTacToeStateType = {
  board: initialBoard,
  gameState: initialGameState,
  turn: initialTurn,
  playerOne: initialPlayerOne,
  playerTwo: initialPlayerTwo,
};

export {
  initialBoard, initialTurn, initialGameState, initialTicTacToeState, initialPlayerOne, initialPlayerTwo,
};
