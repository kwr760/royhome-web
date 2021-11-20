import {
  GameStateEnum, GameTypeEnum,
  TurnEnum,
} from './tictactoe.enum';
import { TicTacToeStateType } from './tictactoe.models';

const initialPlayers = ['Player #1', 'Player #2'];
const initialBoard = '---------';
const initialGameState = GameStateEnum.Active;
const initialTurn = TurnEnum.One;
const initialType = GameTypeEnum.pvp;
const initialTicTacToeState: TicTacToeStateType = {
  players: [...initialPlayers],
  board: initialBoard,
  gameState: initialGameState,
  type: initialType,
  turn: initialTurn,
};

// const initialGameState2: Game = {
//   board: initialBoard,
//   gameState: initialGameState,
//   type: GameTypeEnum.pvp,
//   turn: TurnEnum.One,
//   one: {
//     name: 'Player #1',
//     state: PlayerStateEnum.Active,
//     type: PlayerTypeEnum.local,
//     piece: PieceEnum.one,
//   },
//   two: {
//     name: 'Player #2',
//     state: PlayerStateEnum.Wait,
//     type: PlayerTypeEnum.local,
//     piece: PieceEnum.one,
//   },
// };

export { initialBoard, initialPlayers, initialTurn, initialType, initialGameState, initialTicTacToeState };
