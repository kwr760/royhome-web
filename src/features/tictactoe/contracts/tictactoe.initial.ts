import { GameStateEnum, PlayerEnum, PlayerStateEnum, PlayerTypeEnum } from './tictactoe.enum';
import { StateType } from './tictactoe.models';

const initialPlayerOne = {
  name: 'Player #1',
  playerState: PlayerStateEnum.Active,
  type: PlayerTypeEnum.Human,
  piece: PlayerEnum.One,
  remote: false,
};
const initialPlayerTwo = {
  name: 'Player #2',
  playerState: PlayerStateEnum.Wait,
  type: PlayerTypeEnum.Human,
  piece: PlayerEnum.Two,
  remote: false,
};
const initialState: StateType = {
  sessionId: '',
  client: null,
  board: '---------',
  gameState: GameStateEnum.Setup,
  turn: PlayerEnum.One,
  playerOne: initialPlayerOne,
  playerTwo: initialPlayerTwo,
};

export {
  initialState, initialPlayerOne, initialPlayerTwo,
};
