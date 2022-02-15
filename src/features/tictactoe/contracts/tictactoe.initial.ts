import { GameStateEnum, PlayerEnum, PlayerStateEnum, PlayerTypeEnum } from './tictactoe.enum';
import { StateType } from './tictactoe.models';

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
const initialState: StateType = {
  board: '---------',
  gameState: GameStateEnum.Ready,
  turn: PlayerEnum.One,
  playerOne: initialPlayerOne,
  playerTwo: initialPlayerTwo,
};

export {
  initialState, initialPlayerOne, initialPlayerTwo,
};
