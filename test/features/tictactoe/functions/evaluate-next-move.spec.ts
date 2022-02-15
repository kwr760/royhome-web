import { PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { Board } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { evaluateNextMove } from '../../../../src/features/tictactoe/functions/evaluate-next-move';

type NextMove = {
  board: Board;
  player: PlayerEnum;
}
type TestTuple = {
  nextMove: NextMove,
  expected: number[],
};

describe('feature/tictactoe/functions/evaluate-next-move', () => {
  // Arrange
  const cases: TestTuple[] = [
    {
      nextMove: {
        board: 'XX-X-XX-X',
        player: PlayerEnum.Two,
      },
      expected: [2, 4, 7],
    },
    {
      nextMove: {
        board: '---------',
        player: PlayerEnum.Two,
      },
      expected: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    },
  ];

  cases.forEach(({ nextMove, expected }: TestTuple) => {
    it(`should get next move - ${JSON.stringify(nextMove)} : ${expected}`, () => {
      let count = 10;
      while (count--) {
        const move = evaluateNextMove(nextMove);
        expect(expected.includes(move)).toBeTruthy();
      }
    });
  });
});
