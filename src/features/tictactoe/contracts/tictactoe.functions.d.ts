import { GameStateEnum, PlayerEnum } from './tictactoe.enum';
import { Board } from './tictactoe.models';

type SearchString = {
  str: string;
  include: string;
}
type NextMove = {
  board: Board;
  player: PlayerEnum;
}
type GameEvaluationReturn = {
  gameState: GameStateEnum;
  winner?: PlayerEnum;
}

export { SearchString, NextMove, GameEvaluationReturn };
