import { PlayerEnum } from '../contracts/tictactoe.enum';
import { findPositions } from './find-positions';
import { getRandomNumber } from './get-random-number';

type Board = string;
interface NextMoveType {
  board: Board;
  player: PlayerEnum;
}
interface IProcessor {
  setNext(processor: IProcessor): IProcessor;
  process(next: NextMoveType): number;
}

// abstract class AbstractProcessor implements IProcessor
// {
// private nextProcessor!: IProcessor;
//
// public setNext(processor: IProcessor): IProcessor {
//   this.nextProcessor = processor;
//   return processor;
// }
//
// public process(next: NextMoveType): number {
//   return this.nextProcessor.process(next);
// }
// }

class GuessTerminal {
  // class GuessTerminal extends AbstractProcessor {
  public process(next: NextMoveType): number {
    const possibleMoves = findPositions({ str: next.board, include: PlayerEnum.Neither });
    const index = getRandomNumber(possibleMoves.length);
    return possibleMoves[index];
  }
}

const getRandomMove = new GuessTerminal();

const evaluateNextMove = (next: NextMoveType): number=> {
  return getRandomMove.process(next);
};

export { evaluateNextMove };
