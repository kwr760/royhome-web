import { BoardType } from '../contracts/tictactoe.context';
import { GameStateEnum, PlayerEnum } from '../contracts/tictactoe.enum';
import { GameEvaluationReturn } from '../contracts/tictactoe.functions';
import { findWinner } from './find-winner';
import { isGameOver } from './is-game-over';

interface IEvaluator<Param, Return> {
  setNext(evaluator: IEvaluator<Param, Return>): IEvaluator<Param, Return>;
  evaluate(param?: Param): Return;
}

/**
 * Assumes that the evaluator is set up correctly
 * Meaning that the evaluator will terminate with a <Return> and not a null|undefined
 */
abstract class AbstractEvaluator<Param, Return> implements IEvaluator<Param, Return>
{
  private nextEvaluator!: IEvaluator<Param, Return>;

  public setNext(evaluator: IEvaluator<Param, Return>): IEvaluator<Param, Return> {
    this.nextEvaluator = evaluator;
    return evaluator;
  }

  public evaluate(param?: Param): Return {
    return this.nextEvaluator.evaluate(param);
  }
}

class WinEvaluator extends AbstractEvaluator<BoardType, GameEvaluationReturn> {
  public evaluate(board: BoardType): GameEvaluationReturn {
    const winner = findWinner(board);
    if (winner !== PlayerEnum.Neither) {
      return {
        gameState: GameStateEnum.Completed,
        winner,
      };
    }
    return super.evaluate(board);
  }
}

class TieEvaluator extends AbstractEvaluator<BoardType, GameEvaluationReturn> {
  public evaluate(board: BoardType): GameEvaluationReturn {
    if (isGameOver(board)) {
      return {
        gameState: GameStateEnum.Completed,
      };
    }
    return super.evaluate(board);
  }
}

class ActiveTerminal extends AbstractEvaluator<BoardType, GameEvaluationReturn> {
  public evaluate(): GameEvaluationReturn {
    return {
      gameState: GameStateEnum.Active,
    };
  }
}

const returnActive = new ActiveTerminal();
const checkForTie = new TieEvaluator();
const checkForWin = new WinEvaluator();
checkForWin.setNext(checkForTie).setNext(returnActive);

const evaluateGame = (board: BoardType): GameEvaluationReturn => {
  return checkForWin.evaluate(board);
};

export { evaluateGame };
