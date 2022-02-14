import { GameStateEnum, PlayerEnum } from '../contracts/tictactoe.enum';
import { GameType } from '../contracts/tictactoe.context';
import { findWinner } from './find-winner';
import { isGameOver } from './is-game-over';

interface GameEvaluationReturn {
  gameState: GameStateEnum;
  winner?: PlayerEnum;
}
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

class WinEvaluator extends AbstractEvaluator<GameType, GameEvaluationReturn> {
  public evaluate(game: GameType): GameEvaluationReturn {
    const winner = findWinner(game);
    if (winner !== PlayerEnum.Neither) {
      return {
        gameState: GameStateEnum.Win,
        winner,
      };
    }
    return super.evaluate(game);
  }
}

class TieEvaluator extends AbstractEvaluator<GameType, GameEvaluationReturn> {
  public evaluate(game: GameType): GameEvaluationReturn {
    if (isGameOver(game)) {
      return {
        gameState: GameStateEnum.Tie,
      };
    }
    return super.evaluate(game);
  }
}

class ActiveTerminal extends AbstractEvaluator<GameType, GameEvaluationReturn> {
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

const evaluateGame = (game: GameType): GameEvaluationReturn => {
  return checkForWin.evaluate(game);
};

export { evaluateGame };
