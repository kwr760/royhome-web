import { GameStateEnum, PieceEnum, PlayerTypeEnum } from './tictactoe.enum';
import { StateType } from './tictactoe.models';

const initialPlayerOne = {
  name: 'Player #1',
  type: PlayerTypeEnum.Human,
  piece: PieceEnum.X,
};
const initialPlayerTwo = {
  name: 'Player #2',
  type: PlayerTypeEnum.Human,
  piece: PieceEnum.O,
};
const initialState: StateType = {
  sessionId: '',
  client: null,
  board: '---------',
  gameState: GameStateEnum.Welcome,
  playerOne: initialPlayerOne,
  playerTwo: initialPlayerTwo,
  remote: false,
};

export {
  initialState, initialPlayerOne, initialPlayerTwo,
};
