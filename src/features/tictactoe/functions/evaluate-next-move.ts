import { orderOne, orderThree, orderTwo, wins } from '../contracts/tictactoe.constant';
import { PlayerEnum } from '../contracts/tictactoe.enum';
import { Board } from '../contracts/tictactoe.models';
import { NextMove } from '../contracts/tictacttoe.functions';
import { findPositions } from './find-positions';
import { getRandomNumber } from './get-random-number';

interface IAnalyzer {
  setNext(analyzer: IAnalyzer): IAnalyzer;
  process(next: NextMove): number;
}
abstract class AbstractAnalyzer implements IAnalyzer
{
  private nextAnalyzer!: IAnalyzer;

  public setNext(analyzer: IAnalyzer): IAnalyzer {
    this.nextAnalyzer = analyzer;
    return analyzer;
  }

  public process(next: NextMove): number {
    return this.nextAnalyzer.process(next);
  }
}

type Position = {
  index: number;
  player: PlayerEnum;
};
const mapPositions = (board: Board, possibleWin: number[]): Position[] => {
  return possibleWin.map((index: number) => {
    return { index, player: board[index] } as Position;
  });
};
const findPlayer = (positions: Position[], player: PlayerEnum): Position[] => {
  return positions.filter((e) => e.player === player);
};

/** Terminal */
class OrderThreeMove extends AbstractAnalyzer {
  public process(next: NextMove): number {
    const { board } = next;

    const positions = mapPositions(board, orderThree);
    const openPositions = findPlayer(positions, PlayerEnum.Neither);
    const possibleMoves = openPositions.map((e) => e.index);

    const unique = [...new Set(possibleMoves)];
    const index = getRandomNumber(unique.length);
    return unique[index];
  }
}
class OrderTwoMove extends AbstractAnalyzer {
  public process(next: NextMove): number {
    const { board } = next;

    const positions = mapPositions(board, orderTwo);
    const openPositions = findPlayer(positions, PlayerEnum.Neither);
    const possibleMoves = openPositions.map((e) => e.index);

    if (possibleMoves.length) {
      const unique = [...new Set(possibleMoves)];
      const index = getRandomNumber(unique.length);
      return unique[index];
    }
    return super.process(next);
  }
}
class OrderOneMove extends AbstractAnalyzer {
  public process(next: NextMove): number {
    const { board } = next;

    const positions = mapPositions(board, orderOne);
    const openPositions = findPlayer(positions, PlayerEnum.Neither);
    const possibleMoves = openPositions.map((e) => e.index);

    if (possibleMoves.length) {
      const unique = [...new Set(possibleMoves)];
      const index = getRandomNumber(unique.length);
      return unique[index];
    }
    return super.process(next);
  }
}
class BlockingMove extends AbstractAnalyzer {
  public process(next: NextMove): number {
    const { board, player } = next;
    const opponent = player === PlayerEnum.One ? PlayerEnum.Two : PlayerEnum.One;
    const possibleMoves: number[] = [];

    wins.forEach((possibleWin: number[]) => {
      const positions = mapPositions(board, possibleWin);
      const opponentPositions = findPlayer(positions, opponent);
      if (opponentPositions.length === 2) {
        const openPosition = findPlayer(positions, PlayerEnum.Neither);
        if (openPosition.length) {
          possibleMoves.push(openPosition[0].index);
        }
      }
    });

    if (possibleMoves.length) {
      const unique = [...new Set(possibleMoves)];
      const index = getRandomNumber(unique.length);
      return unique[index];
    }
    return super.process(next);
  }
}
class WinningMove extends AbstractAnalyzer {
  public process(next: NextMove): number {
    const { board, player } = next;
    const possibleMoves: number[] = [];

    wins.forEach((possibleWin: number[]) => {
      const positions = mapPositions(board, possibleWin);
      const myPositions = findPlayer(positions, player);
      if (myPositions.length === 2) {
        const openPosition = findPlayer(positions, PlayerEnum.Neither);
        if (openPosition.length) {
          possibleMoves.push(openPosition[0].index);
        }
      }
    });

    if (possibleMoves.length) {
      const unique = [...new Set(possibleMoves)];
      const index = getRandomNumber(unique.length);
      return unique[index];
    }
    return super.process(next);
  }
}

const bestMove = new OrderOneMove();
const secondBestMove = new OrderTwoMove();
const thirdBestMove = new OrderThreeMove();
const blockTheEnemy = new BlockingMove();
const findTheBestMove = new WinningMove();
findTheBestMove
  .setNext(blockTheEnemy)
  .setNext(bestMove)
  .setNext(secondBestMove)
  .setNext(thirdBestMove);

const evaluateNextMove = (next: NextMove): number=> {
  return findTheBestMove.process(next);
};

export { evaluateNextMove };
