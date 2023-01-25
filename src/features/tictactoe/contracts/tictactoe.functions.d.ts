import { GameStateEnum, PieceEnum } from './tictactoe.enum';
import { Board } from './tictactoe.models';

type NextMove = {
  board: Board;
  player: PieceEnum;
}
type GameEvaluationReturn = {
  gameState: GameStateEnum;
  winner: PieceEnum;
}

export { NextMove, GameEvaluationReturn };
